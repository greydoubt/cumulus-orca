# Local Variables
locals {
  vpc_endpoint_id = var.vpc_endpoint_id != null ? var.vpc_endpoint_id : data.aws_vpc_endpoint.vpc_endpoint_id.id
}

data "aws_vpc_endpoint" "vpc_endpoint_id" {
  vpc_id       = var.vpc_id
  service_name = "com.amazonaws.us-west-2.execute-api"
}

# API Gateway- API for ORCA cumulus reconciliation
resource "aws_api_gateway_rest_api" "orca_api" {
  name        = "${var.prefix}_orca_api"
  description = "API for catalog reporting, request_status_for_job and request_status_for_file lambda functions"
  endpoint_configuration {
    types = ["PRIVATE"]
    vpc_endpoint_ids = [local.vpc_endpoint_id]
  }
}

resource "aws_api_gateway_rest_api_policy" "orca_api_resource_policy" {
  rest_api_id = aws_api_gateway_rest_api.orca_api.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "execute-api:Invoke",
      "Resource": "${aws_api_gateway_rest_api.orca_api.execution_arn}"
    },
    {
      "Effect": "Deny",
      "Principal": {
        "AWS": "*"
      },
      "Action": "execute-api:Invoke",
      "Resource": "${aws_api_gateway_rest_api.orca_api.execution_arn}",
      "Condition": {
        "StringNotEquals": {
          "aws:SourceVpc": "${var.vpc_id}"
        }
      }
    }
  ]
}
EOF
}

#API details for orca_catalog_reporting lambda
resource "aws_api_gateway_resource" "orca_catalog_reporting_api_resource_catalog" {
  path_part   = "catalog"
  parent_id   = aws_api_gateway_rest_api.orca_api.root_resource_id
  rest_api_id = aws_api_gateway_rest_api.orca_api.id
}

resource "aws_api_gateway_resource" "orca_catalog_reporting_api_resource_catalog_reconcile" {
  path_part   = "reconcile"
  parent_id   = aws_api_gateway_resource.orca_catalog_reporting_api_resource_catalog.id
  rest_api_id = aws_api_gateway_rest_api.orca_api.id
}

resource "aws_api_gateway_method" "orca_catalog_reporting_api_method" {
  rest_api_id = aws_api_gateway_rest_api.orca_api.id
  resource_id = aws_api_gateway_resource.orca_catalog_reporting_api_resource_catalog_reconcile.id
  http_method = "POST"
  # todo: Make sure this is locked down against external access.
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "orca_catalog_reporting_api_integration" {
  rest_api_id             = aws_api_gateway_rest_api.orca_api.id
  resource_id             = aws_api_gateway_resource.orca_catalog_reporting_api_resource_catalog_reconcile.id
  http_method             = aws_api_gateway_method.orca_catalog_reporting_api_method.http_method
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = var.orca_catalog_reporting_invoke_arn
}

resource "aws_api_gateway_method_response" "orca_catalog_reporting_response_200" {
  rest_api_id = aws_api_gateway_rest_api.orca_api.id
  resource_id = aws_api_gateway_resource.orca_catalog_reporting_api_resource_catalog_reconcile.id
  http_method = aws_api_gateway_method.orca_catalog_reporting_api_method.http_method
  status_code = "200"
}

resource "aws_api_gateway_integration_response" "orca_catalog_reporting_api_response" {
  depends_on  = [aws_api_gateway_integration.orca_catalog_reporting_api_integration]
  rest_api_id = aws_api_gateway_rest_api.orca_api.id
  resource_id = aws_api_gateway_resource.orca_catalog_reporting_api_resource_catalog_reconcile.id
  http_method = aws_api_gateway_method.orca_catalog_reporting_api_method.http_method
  status_code = aws_api_gateway_method_response.orca_catalog_reporting_response_200.status_code
  # Transforms the backend JSON response to XML. Currently being used by create_http_error_dict() function in orca_catalog_reporting.py
  response_templates = {
    "application/json" = <<EOF
    #set($inputRoot = $input.path('$'))
    $input.json("$")
    #if($input.path("stackTrace") != '')
    #set($context.responseOverride.status = 500)
    #elseif($input.path("httpStatus") != '')
    #set($context.responseOverride.status = $input.path('httpStatus'))
    #end
    EOF
  }
}

resource "aws_lambda_permission" "orca_catalog_reporting_api_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "${var.prefix}_orca_catalog_reporting"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.orca_api.execution_arn}/*/${aws_api_gateway_method.orca_catalog_reporting_api_method.http_method}${aws_api_gateway_resource.orca_catalog_reporting_api_resource_catalog_reconcile.path}"
}

# API details for  for request_status_for_granule lambda function
resource "aws_api_gateway_resource" "request_status_for_granule_api_resource_recovery" {
  path_part   = "recovery"
  parent_id   = aws_api_gateway_rest_api.orca_api.root_resource_id
  rest_api_id = aws_api_gateway_rest_api.orca_api.id
}

resource "aws_api_gateway_resource" "request_status_for_granule_api_resource_recovery_granules" {
  path_part   = "granules"
  parent_id   = aws_api_gateway_resource.request_status_for_granule_api_resource_recovery.id
  rest_api_id = aws_api_gateway_rest_api.orca_api.id
}

resource "aws_api_gateway_method" "request_status_for_granule_api_method" {
  rest_api_id = aws_api_gateway_rest_api.orca_api.id
  resource_id = aws_api_gateway_resource.request_status_for_granule_api_resource_recovery_granules.id
  http_method = "POST"
  # todo: Make sure this is locked down against external access.
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "request_status_for_granule_api_integration" {
  rest_api_id             = aws_api_gateway_rest_api.orca_api.id
  resource_id             = aws_api_gateway_resource.request_status_for_granule_api_resource_recovery_granules.id
  http_method             = aws_api_gateway_method.request_status_for_granule_api_method.http_method
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = var.request_status_for_granule_invoke_arn
}

resource "aws_api_gateway_method_response" "request_status_for_granule_response_200" {
  rest_api_id = aws_api_gateway_rest_api.orca_api.id
  resource_id = aws_api_gateway_resource.request_status_for_granule_api_resource_recovery_granules.id
  http_method = aws_api_gateway_method.request_status_for_granule_api_method.http_method
  status_code = "200"
}

resource "aws_api_gateway_integration_response" "request_status_for_granule_api_response" {
  depends_on  = [aws_api_gateway_integration.request_status_for_granule_api_integration]
  rest_api_id = aws_api_gateway_rest_api.orca_api.id
  resource_id = aws_api_gateway_resource.request_status_for_granule_api_resource_recovery_granules.id
  http_method = aws_api_gateway_method.request_status_for_granule_api_method.http_method
  status_code = aws_api_gateway_method_response.request_status_for_granule_response_200.status_code
  # Transforms the backend JSON response to XML. Currently being used by create_http_error_dict() function in request_status_for_granule.py
  response_templates = {
    "application/json" = <<EOF
    #set($inputRoot = $input.path('$'))
    $input.json("$")
    #if($input.path("stackTrace") != '')
    #set($context.responseOverride.status = 500)
    #elseif($input.path("httpStatus") != '')
    #set($context.responseOverride.status = $input.path('httpStatus'))
    #end
    EOF
  }
}

resource "aws_lambda_permission" "request_status_for_granule_api_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "${var.prefix}_request_status_for_granule"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.orca_api.execution_arn}/*/${aws_api_gateway_method.request_status_for_granule_api_method.http_method}${aws_api_gateway_resource.request_status_for_granule_api_resource_recovery_granules.path}"
}

# API details for request_status_for_job lambda function
resource "aws_api_gateway_resource" "request_status_for_job_api_resource_recovery_jobs" {
  path_part   = "jobs"
  parent_id   = aws_api_gateway_resource.request_status_for_granule_api_resource_recovery.id
  rest_api_id = aws_api_gateway_rest_api.orca_api.id
}

resource "aws_api_gateway_method" "request_status_for_job_api_method" {
  rest_api_id = aws_api_gateway_rest_api.orca_api.id
  resource_id = aws_api_gateway_resource.request_status_for_job_api_resource_recovery_jobs.id
  http_method = "POST"
  # todo: Make sure this is locked down against external access.
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "request_status_for_job_api_integration" {
  rest_api_id             = aws_api_gateway_rest_api.orca_api.id
  resource_id             = aws_api_gateway_resource.request_status_for_job_api_resource_recovery_jobs.id
  http_method             = aws_api_gateway_method.request_status_for_job_api_method.http_method
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = var.request_status_for_job_invoke_arn
}

resource "aws_api_gateway_method_response" "request_status_for_job_response_200" {
  rest_api_id = aws_api_gateway_rest_api.orca_api.id
  resource_id = aws_api_gateway_resource.request_status_for_job_api_resource_recovery_jobs.id
  http_method = aws_api_gateway_method.request_status_for_job_api_method.http_method
  status_code = "200"
}

resource "aws_api_gateway_integration_response" "request_status_for_job_api_response" {
  depends_on  = [aws_api_gateway_integration.request_status_for_job_api_integration]
  rest_api_id = aws_api_gateway_rest_api.orca_api.id
  resource_id = aws_api_gateway_resource.request_status_for_job_api_resource_recovery_jobs.id
  http_method = aws_api_gateway_method.request_status_for_job_api_method.http_method
  status_code = aws_api_gateway_method_response.request_status_for_job_response_200.status_code
  # Transforms the backend JSON response to XML. Currently being used by create_http_error_dict() function in request_status_for_job.py
  response_templates = {
    "application/json" = <<EOF
    #set($inputRoot = $input.path('$'))
    $input.json("$")
    #if($input.path("stackTrace") != '')
    #set($context.responseOverride.status = 500)
    #elseif($input.path("httpStatus") != '')
    #set($context.responseOverride.status = $input.path('httpStatus'))
    #end
    EOF
  }
}

resource "aws_lambda_permission" "request_status_for_job_api_permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "${var.prefix}_request_status_for_job"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.orca_api.execution_arn}/*/${aws_api_gateway_method.request_status_for_job_api_method.http_method}${aws_api_gateway_resource.request_status_for_job_api_resource_recovery_jobs.path}"
}

#deployment for the API
resource "aws_api_gateway_deployment" "orca_api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.orca_api.id
  stage_name  = var.api_gateway_stage_name
  depends_on  = [aws_api_gateway_integration.orca_catalog_reporting_api_integration, aws_api_gateway_integration.request_status_for_job_api_integration, aws_api_gateway_integration.request_status_for_granule_api_integration]
}