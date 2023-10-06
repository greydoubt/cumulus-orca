"use strict";(self.webpackChunkorca_website=self.webpackChunkorca_website||[]).push([[2550],{3905:(e,a,t)=>{t.d(a,{Zo:()=>p,kt:()=>h});var n=t(7294);function o(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function r(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?r(Object(t),!0).forEach((function(a){o(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function s(e,a){if(null==e)return{};var t,n,o=function(e,a){if(null==e)return{};var t,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)t=r[n],a.indexOf(t)>=0||(o[t]=e[t]);return o}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)t=r[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=n.createContext({}),c=function(e){var a=n.useContext(l),t=a;return e&&(t="function"==typeof e?e(a):i(i({},a),e)),t},p=function(e){var a=c(e.components);return n.createElement(l.Provider,{value:a},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},u=n.forwardRef((function(e,a){var t=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=c(t),u=o,h=m["".concat(l,".").concat(u)]||m[u]||d[u]||r;return t?n.createElement(h,i(i({ref:a},p),{},{components:t})):n.createElement(h,i({ref:a},p))}));function h(e,a){var t=arguments,o=a&&a.mdxType;if("string"==typeof e||o){var r=t.length,i=new Array(r);i[0]=u;var s={};for(var l in a)hasOwnProperty.call(a,l)&&(s[l]=a[l]);s.originalType=e,s[m]="string"==typeof e?e:o,i[1]=s;for(var c=2;c<r;c++)i[c]=t[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}u.displayName="MDXCreateElement"},1642:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var n=t(7462),o=(t(7294),t(3905));const r={id:"research-lambda-container",title:"Using Lambda functions as container research Notes",description:"Research Notes on Containerizing Lambdas"},i=void 0,s={unversionedId:"developer/research/research-lambda-container",id:"developer/research/research-lambda-container",title:"Using Lambda functions as container research Notes",description:"Research Notes on Containerizing Lambdas",source:"@site/docs/developer/research/research-lambda-container.md",sourceDirName:"developer/research",slug:"/developer/research/research-lambda-container",permalink:"/cumulus-orca/docs/developer/research/research-lambda-container",draft:!1,editUrl:"https://github.com/nasa/cumulus-orca/edit/develop/website/docs/developer/research/research-lambda-container.md",tags:[],version:"current",frontMatter:{id:"research-lambda-container",title:"Using Lambda functions as container research Notes",description:"Research Notes on Containerizing Lambdas"},sidebar:"dev_guide",previous:{title:"Research Notes on running integration tests in bamboo CI/CD",permalink:"/cumulus-orca/docs/developer/research/research-bamboo-integration-tests"},next:{title:"Notes on pushing and deploying docker images.",permalink:"/cumulus-orca/docs/developer/research/research-pushing-docker-image"}},l={},c=[{value:"Overview",id:"overview",level:2},{value:"Elastic Container Registry (ECR)",id:"elastic-container-registry-ecr",level:2},{value:"Pros and Cons of using container for lambdas",id:"pros-and-cons-of-using-container-for-lambdas",level:2},{value:"Pros",id:"pros",level:3},{value:"Cons",id:"cons",level:3},{value:"New configuration for lambda container",id:"new-configuration-for-lambda-container",level:2},{value:"Creating a prototype",id:"creating-a-prototype",level:2},{value:"Future directions",id:"future-directions",level:2},{value:"Modifying get_current_archive_list and perform_orca_reconcile",id:"modifying-get_current_archive_list-and-perform_orca_reconcile",level:3},{value:"Recommendation",id:"recommendation",level:4},{value:"References",id:"references",level:5}],p={toc:c},m="wrapper";function d(e){let{components:a,...t}=e;return(0,o.kt)(m,(0,n.Z)({},p,t,{components:a,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"overview"},"Overview"),(0,o.kt)("p",null,"Lambda functions can now be deployed as container images using Docker instead of zip files. This research webpage discusses how lambda functions can be prototyped as container and its pros and cons."),(0,o.kt)("h2",{id:"elastic-container-registry-ecr"},"Elastic Container Registry (ECR)"),(0,o.kt)("p",null,"AWS Elastic Container Registry(ECR) is used to store container images for lambdas and is fully managed by AWS. It hosts the images in a highly available and scalable architecture, allowing developers to reliably deploy containers for their applications. See this ",(0,o.kt)("a",{parentName:"p",href:"https://aws.amazon.com/ecr/"},"link")," for additional information on ECR. Currently, you have to use ECR to store container images for lambdas as it does not support other storage options such as Github, Dockerhub, etc."),(0,o.kt)("h2",{id:"pros-and-cons-of-using-container-for-lambdas"},"Pros and Cons of using container for lambdas"),(0,o.kt)("h3",{id:"pros"},"Pros"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Defining runtime environment in a container image gives developers more control over their environment compared to what they get with predefined runtimes and zipping dependencies. "),(0,o.kt)("li",{parentName:"ul"},"you can now package and deploy Lambda functions as container images of up to 10 GB in size compared to only 250MB in case of lambda deployment package size. "),(0,o.kt)("li",{parentName:"ul"},"preferable for data-heavy or dependency-heavy applications."),(0,o.kt)("li",{parentName:"ul"},"The Lambda service provides a variety of base image options with pre-installed runtimes that will be patched and maintained by AWS."),(0,o.kt)("li",{parentName:"ul"},"Once deployed, containerized lambdas have no additional cost compared to zipped lambdas except the cost of using ECR repository.")),(0,o.kt)("h3",{id:"cons"},"Cons"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Container support requires your Lambda function code point to an ECR Repo URI which means that repo also has to be maintained."),(0,o.kt)("li",{parentName:"ul"},"need additional work to create the Dockerfile, tag and push the image to ECR repo."),(0,o.kt)("li",{parentName:"ul"},"Need additional work for deleting older images under the ECR repository.")),(0,o.kt)("admonition",{type:"warning"},(0,o.kt)("p",{parentName:"admonition"},"Currently NGAP only allows ",(0,o.kt)("inlineCode",{parentName:"p"},"private")," ECR repository which could bring possible risk and challenges in using a public repository for storing container image for lambdas. More discussion is needed with NGAP on allowing a public repository.")),(0,o.kt)("h2",{id:"new-configuration-for-lambda-container"},"New configuration for lambda container"),(0,o.kt)("p",null,"There are a few configuration that needs to be added if the lambda is deployed from docker image."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Architecture- This  determines the type of computer processor that Lambda uses to run the function. Lambda provides a choice of instruction set architectures which is either ",(0,o.kt)("inlineCode",{parentName:"li"},"arm64")," or ",(0,o.kt)("inlineCode",{parentName:"li"},"x86_64"),". The ",(0,o.kt)("inlineCode",{parentName:"li"},"arm64")," architecture offer lower cost per Gb/s compared to the other one. Check this ",(0,o.kt)("a",{parentName:"li",href:"https://docs.aws.amazon.com/lambda/latest/dg/foundation-arch.html?icmpid=docs_lambda_help"},"link")," for additional information."),(0,o.kt)("li",{parentName:"ul"},"Image configuration- These are values that can be used to override the container image settings for ",(0,o.kt)("inlineCode",{parentName:"li"},"ENTRYPOINT"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"CMD"),", ",(0,o.kt)("inlineCode",{parentName:"li"},"WORKDIR")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"ENV"),".")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"  ENTRYPOINT \u2013 Specifies the absolute path of the entry point to the application.\n\n  CMD \u2013 Specifies parameters that you want to pass in with ENTRYPOINT.\n\n  WORKDIR \u2013 Specifies the absolute path of the working directory.\n\n  ENV \u2013 Specifies an environment variable for the Lambda function.\n")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Image URI- The location of the container image to use for your function.")),(0,o.kt)("h2",{id:"creating-a-prototype"},"Creating a prototype"),(0,o.kt)("p",null,"Creating or updating the function is done by building a Docker image, uploading the new version to ECR and deploying/updating the Lambda function to point to the newly uploaded image using terraform. Docker CLI has been used to build, tag and push the container image to ECR."),(0,o.kt)("p",null,"The steps for prototyping lambda container are as follows:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Create or locate an AWS ECR repository for storing the Docker images. "),(0,o.kt)("li",{parentName:"ul"},"Create the Dockerfile and then build, tag and push the image to the above ECR repository."),(0,o.kt)("li",{parentName:"ul"},"Update terraform configuration of the lambda function to deploy it as container.")),(0,o.kt)("admonition",{type:"warning"},(0,o.kt)("p",{parentName:"admonition"},"Currently NGAP only allows developers to create a ",(0,o.kt)("inlineCode",{parentName:"p"},"private")," ECR repository which was used here to create the prototype. Using a ",(0,o.kt)("inlineCode",{parentName:"p"},"public")," ECR repository will need approval from NGAP first which could bring security concerns.")),(0,o.kt)("p",null,"Details on creating the prototype are shown below:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Create an ",(0,o.kt)("a",{parentName:"li",href:"https://us-west-2.console.aws.amazon.com/ecr/repositories"},"ECR")," repository from AWS CLI if needed as shown. Check ",(0,o.kt)("a",{parentName:"li",href:"https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html#cli-create-repository"},"here")," for additional details on this.")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"aws ecr create-repository \\\n    --repository-name <YOUR_REPOSITORY_NAME>\n")),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"Create a project directory. Under that directory, add  your script (",(0,o.kt)("inlineCode",{parentName:"li"},"test.py")," in this case) and ",(0,o.kt)("inlineCode",{parentName:"li"},"requirements.txt"),"to install any dependencies. Then create a ",(0,o.kt)("inlineCode",{parentName:"li"},"Dockerfile")," that creates the image. ")),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"  You should use the AWS lambda base image specific to the language you are using to write the lambda function.")),(0,o.kt)("p",null,"An example of a Dockerfile used for prototying a lambda having ",(0,o.kt)("inlineCode",{parentName:"p"},"test.py")," file is shown below."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'FROM public.ecr.aws/lambda/python:3.8\n\n# Copy function code\nCOPY test.py ${LAMBDA_TASK_ROOT}\n\n# Install the function\'s dependencies using file requirements.txt\n# from your project folder.\n\nCOPY requirements.txt  .\nRUN  pip3 install -r requirements.txt --target "${LAMBDA_TASK_ROOT}"\n\n# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)\nCMD [ "test.lambda_handler" ]\n\n')),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"The next steps are to build, tag and push the image to the ECR repo. You can build a new image named ",(0,o.kt)("inlineCode",{parentName:"li"},"prototype-lambda-image")," in this case using:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"docker build -t prototype-lambda-image .\n")),(0,o.kt)("p",null,"Once build is successful, tag the image"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"docker tag prototype-lambda-image:<IMAGE_TAG> <YOUR_ECR_REPO_URI>:<IMAGE_TAG>\n")),(0,o.kt)("p",null,"Next, login to the ECR repo using:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"aws ecr get-login-password --region <YOUR_REGION> | docker login --username AWS --password-stdin <YOUR_AWS_ACCOUNT_ID>.dkr.ecr.<YOUR_REGION>.amazonaws.com\n")),(0,o.kt)("p",null,"Check this ",(0,o.kt)("a",{parentName:"p",href:"https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html"},"link")," for additional information on pushing image to ECR using Docker CLI."),(0,o.kt)("p",null,"Finally, push the image to ECR using:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"docker push <YOUR_ECR_REPO_URI>:<IMAGE_TAG>\n")),(0,o.kt)("ol",{start:4},(0,o.kt)("li",{parentName:"ol"},"The next step is to deploy the lambda using terraform. Use the following example code to deploy the lambda container:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-terraform"},'\nresource "aws_lambda_function" "prototype_lambda" {\n  image_uri     = "<YOUR_ECR_REPO_URI>:<IMAGE_TAG>"  # repo and tag\n  package_type  = "Image"\n  function_name = "prototype-lambda"\n  role          = "<YOUR_IAM_ROLE_ARN>"\n  image_config {\n    command = ["test.lambda_handler"]\n  }\n}\n')),(0,o.kt)("p",null,"Using the steps above, a prototype has been created in NGAP AWS sandbox account which can be seen under the lambda function console. The lambda function is named as ",(0,o.kt)("inlineCode",{parentName:"p"},"prototype-lambda-container")," and uses the ",(0,o.kt)("inlineCode",{parentName:"p"},"test:latest")," private ECR repo image."),(0,o.kt)("h2",{id:"future-directions"},"Future directions"),(0,o.kt)("p",null,"Currently, the only option to store the Docker image for lambda containers is AWS ECR repository. Github package could be an option to store the image but in order to deploy the lambda, the image has to be stored into an ECR."),(0,o.kt)("p",null,"The above example Dockerfile does not follow best practices. See example in section on Fargate."),(0,o.kt)("p",null,"A few possible discussion items:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Discuss with NGAP team if the docker images can be stored in a public ECR repo."),(0,o.kt)("li",{parentName:"ul"},"If github packages are supported to store and deploy the lambda, then we have to contact NASA github admins to enable this feature in our repository.")),(0,o.kt)("p",null,"Based on this research, it looks like using lambda as containers is possible when using a private ECR to store the image which is not ideal in our case. There are some concerns which include:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Discussing with NGAP on allowing to store container images on a public ECR repository. If that is not possible, another option is to have an ECR setup for the end user via terraform and build images. This will require additional work."),(0,o.kt)("li",{parentName:"ul"},"If github package is used to store the image, deploying lambda as container will be an issue since the terraform only supports deploying the image from ECR. Moreover, this feature for the github repository has to be approved by NASA Github admins.")),(0,o.kt)("p",null,"If the above issues are solved, then implementing lambda as container is recommended. One way to use private ECR repo is to use a script or terraform code if possible that will create the ECR repo and then build, tag and push the container image to that repo. One that is done, update the terraform lambda modules and deploy the lambda. An additional ",(0,o.kt)("a",{parentName:"p",href:"https://bugs.earthdata.nasa.gov/browse/ORCA-375"},"card")," has been created to look into this way."),(0,o.kt)("h3",{id:"modifying-get_current_archive_list-and-perform_orca_reconcile"},"Modifying get_current_archive_list and perform_orca_reconcile"),(0,o.kt)("p",null,"The Orca Internal Reconciliation workflow lambdas require an alternative approach."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"The maximum time limit for lambdas is 15 minutes. These lambdas may take a significant amount of time, and should not be subject to this limitation.")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Code changes"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Merge ",(0,o.kt)("inlineCode",{parentName:"li"},"get_current_archive_list")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"perform_orca_reconcile")," into one codebase."),(0,o.kt)("li",{parentName:"ul"},"Wrap functionality in a loop that will process the internal-report queue until no entries remain."),(0,o.kt)("li",{parentName:"ul"},"Since ECS does not support timeout, create an overarching timing mechanic that exits if an infinite loop occurs while processing a queue entry.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Alternatively, a side-program could manually stop the task if it exceeds its' time limit."),(0,o.kt)("li",{parentName:"ul"},"Remember that in addition to processing time, Aurora Serverless can take up to 5 minutes to spin up."))),(0,o.kt)("li",{parentName:"ul"},"Raise the internal-report queue's ",(0,o.kt)("inlineCode",{parentName:"li"},"visibility_timeout_seconds")," to the expected timeout."),(0,o.kt)("li",{parentName:"ul"},"Environment variables can be passed in at task definition, or when the task is run. The former should be sufficient."))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Use an alternative Dockerfile. The example below packages two code files into a lightweight python container with a ",(0,o.kt)("inlineCode",{parentName:"p"},"CMD")," to run the main file."),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'# Build Stage - Here we can bring dev libraries and compile the wheels for the python libs\n# =============================================================================\nFROM python:3.8-slim as builder\n\nWORKDIR /app\n\nENV PYTHONDONTWRITEBYTECODE 1\nENV PYTHONUNBUFFERED 1\n\n# Install the function\'s dependencies using file requirements.txt\n# from your project folder.\nCOPY requirements.txt  .\nRUN pip wheel --no-cache-dir --no-deps --wheel-dir /app/wheels -r requirements.txt\n\n# Run Stage - Contains everything needed to run code with entry point\n# ===================================================================\nFROM python:3.8-slim\n\n# CREATE Non-Privileged User\nRUN mkdir -p /app \\\n    && groupadd -r appuser \\\n    && useradd -r -s /bin/false -g appuser appuser \\\n    && chown -R appuser:appuser /app\n\n# Copy compiled wheels and install the requirements\nCOPY --from=builder /app/wheels /wheels\nRUN pip install --no-cache /wheels/*\n\n# Set the work directory for our application\nWORKDIR /app\n\n# Copy function code\nCOPY main.py main.py\nCOPY sqs_library.py sqs_library.py\n\n# Set the User that the app will run as\nUSER appuser\n\n# Set the entry point for the container\nENTRYPOINT ["python", "main.py"]\n'))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"Follow prior instructions up to the Terraform deployment. Use the following Terraform instead of the previous example."))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-terraform"},'data "aws_iam_policy_document" "sqs_task_policy_document" {\n  statement {\n    actions   = ["sts:AssumeRole"]\n    resources = ["*"]\n  }\n  statement {\n    actions = [\n      "sqs:ReceiveMessage",\n      "sqs:SendMessage",\n      "sqs:DeleteMessage",\n      "sqs:GetQueueAttributes"\n    ]\n    resources = ["*"]\n  }\n}\n\ndata "aws_iam_policy_document" "assume_ecs_tasks_role_policy_document" {\n  statement {\n    principals {\n      type        = "Service"\n      identifiers = ["ecs-tasks.amazonaws.com"]\n    }\n    actions = ["sts:AssumeRole"]\n  }\n}\n\n# IAM role that tasks can use to make API requests to authorized AWS services.\nresource "aws_iam_role" "orca_ecs_tasks_role" {\n  name                 = "${var.prefix}_orca_ecs_tasks_role"\n  assume_role_policy   = data.aws_iam_policy_document.assume_ecs_tasks_role_policy_document.json\n  permissions_boundary = var.permissions_boundary_arn\n  tags                 = var.tags\n}\n\nresource "aws_iam_role_policy" "sqs_task_role_policy" {\n  name   = "${var.prefix}_orca_sqs_task_role_policy"\n  role   = aws_iam_role.orca_ecs_tasks_role.id\n  policy = data.aws_iam_policy_document.sqs_task_policy_document.json\n}\n\n# This role is required by tasks to pull container images and publish container logs to Amazon CloudWatch on your behalf.\nresource "aws_iam_role" "orca_ecs_task_execution_role" {\n  name                 = "${var.prefix}_orca_ecs_task_execution_role"\n  assume_role_policy   = data.aws_iam_policy_document.assume_ecs_tasks_role_policy_document.json\n  permissions_boundary = var.permissions_boundary_arn\n  tags                 = var.tags\n}\n\n\nresource "aws_iam_role_policy_attachment" "ecs_role_policy" {\n  role       = aws_iam_role.orca_ecs_task_execution_role.name\n  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"\n}\n\nresource "aws_ecs_cluster" "test-cluster" {\n  name = "${var.prefix}_orca_ecs_cluster"\n  capacity_providers = ["FARGATE"]\n  default_capacity_provider_strategy {\n    capacity_provider = "FARGATE"\n    weight            = 100\n  }\n}\n\n# Defines how the image will be run. container_definitions can be replaced by data element.\nresource "aws_ecs_task_definition" "task" {\n  family                   = "${var.prefix}_orca_sqs_task"\n  network_mode             = "awsvpc"\n  requires_compatibilities = ["FARGATE"]\n  cpu                      = "4096"\n  memory                   = "8192"\n  task_role_arn            = aws_iam_role.orca_ecs_tasks_role.arn\n  execution_role_arn       = aws_iam_role.orca_ecs_task_execution_role.arn\n  container_definitions    = <<DEFINITION\n[\n  {\n    "name": "sqs_task_container",\n    "image": "999999999999.dkr.ecr.us-west-2.amazonaws.com/adorn-test-repo:latest",\n    "cpu": 4096,\n    "memory": 256,\n    "networkMode": "awsvpc",\n    "environment": [\n      {\n        "name": "TARGET_QUEUE_URL",\n        "value": "https://sqs.us-west-2.amazonaws.com/999999999999/doctest-orca-internal-report-queue.fifo"\n      }\n    ],\n    "logConfiguration": {\n      "logDriver": "awslogs",\n      "options": {\n        "awslogs-create-group": "true",\n        "awslogs-region": "us-west-2",\n        "awslogs-group": "${var.prefix}_orca_sqs_task",\n        "awslogs-stream-prefix": "ecs"\n      }\n    }\n  }\n]\nDEFINITION\n}\n')),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"The above example was developed for deploying a simple task that posts to an sqs queue. Names and values should be changed to match new use cases.\nValues such as ",(0,o.kt)("inlineCode",{parentName:"p"},"cpu")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"memory")," should similarly be reevaluated.")),(0,o.kt)("admonition",{type:"warning"},(0,o.kt)("p",{parentName:"admonition"},"Applying admin permissions to orca_ecs_task_execution_role is likely overly permissive.")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The Fargate task can now be run in the ECS cluster.\nThis can be done through ",(0,o.kt)("a",{parentName:"li",href:"https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/ecs.html#ECS.Client.run_task"},"boto3")," or the GUI,\nthough the former is presently untested."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://aws.amazon.com/ecs/pricing/?trk=2f064982-4fad-4e1f-ab75-e1df26258a60&sc_channel=ps&sc_campaign=acquisition&sc_medium=GC-PMM%7CPS-GO%7CBrand%7CAll%7CPA%7CDatabase%7CECS%7CProduct%7CUS%7CEN%7CText%7Cxx%7CSEM%7CPMO22-13405&s_kwcid=AL!4422!3!547620651289!e!!g!!amazon%20ecs%20pricing&ef_id=EAIaIQobChMIsO-ehu2l9wIVCfrICh0gOQ5OEAAYASABEgIZmfD_BwE:G:s&s_kwcid=AL!4422!3!547620651289!e!!g!!amazon%20ecs%20pricing"},"Pricing")," only applies to what is used in the moment, and can auto-scale down.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Minimum compute time is one minute, so this architecture should not be used for small, frequent tasks.")))),(0,o.kt)("h4",{id:"recommendation"},"Recommendation"),(0,o.kt)("p",null,"Recommend use of the above architecture to resolve concerns with timeouts when handling large inventories.\nget_current_archive_list and perform_orca_reconcile can be merged into one codebase, with an overarching loop. ",(0,o.kt)("a",{parentName:"p",href:"https://bugs.earthdata.nasa.gov/browse/ORCA-428"},"https://bugs.earthdata.nasa.gov/browse/ORCA-428"),"\nThis script can be built into a Docker container and deployed to the result of ",(0,o.kt)("a",{parentName:"p",href:"https://bugs.earthdata.nasa.gov/browse/ORCA-375"},"ECR reserach"),". ",(0,o.kt)("a",{parentName:"p",href:"https://bugs.earthdata.nasa.gov/browse/ORCA-429"},"https://bugs.earthdata.nasa.gov/browse/ORCA-429"),"\nThis new script can then be deployed as a task definition in AWS. ",(0,o.kt)("a",{parentName:"p",href:"https://bugs.earthdata.nasa.gov/browse/ORCA-432"},"https://bugs.earthdata.nasa.gov/browse/ORCA-432"),"\nWe should also create our own ECS cluster to decouple from Cumulus. ",(0,o.kt)("a",{parentName:"p",href:"https://bugs.earthdata.nasa.gov/browse/ORCA-433"},"https://bugs.earthdata.nasa.gov/browse/ORCA-433"),"\nThe task definition can be run periodically in the ECS cluster to empty the queue of any internal reconciliation jobs. ",(0,o.kt)("a",{parentName:"p",href:"https://bugs.earthdata.nasa.gov/browse/ORCA-430"},"https://bugs.earthdata.nasa.gov/browse/ORCA-430"),"\nWe can either remove triggering from post_to_queue_and_trigger_step_function or update it to trigger the Fargate task when called.\nIn either case, the old workflow can be removed. ",(0,o.kt)("a",{parentName:"p",href:"https://bugs.earthdata.nasa.gov/browse/ORCA-431"},"https://bugs.earthdata.nasa.gov/browse/ORCA-431")),(0,o.kt)("h5",{id:"references"},"References"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://aws.amazon.com/blogs/aws/new-for-aws-lambda-container-image-support/"},"https://aws.amazon.com/blogs/aws/new-for-aws-lambda-container-image-support/")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://aws.amazon.com/blogs/compute/optimizing-lambda-functions-packaged-as-container-images/"},"https://aws.amazon.com/blogs/compute/optimizing-lambda-functions-packaged-as-container-images/")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://dashbird.io/blog/deploying-aws-lambda-with-docker/"},"https://dashbird.io/blog/deploying-aws-lambda-with-docker/")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://docs.aws.amazon.com/lambda/latest/dg/images-create.html"},"https://docs.aws.amazon.com/lambda/latest/dg/images-create.html")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://docs.aws.amazon.com/lambda/latest/dg/python-image.html"},"https://docs.aws.amazon.com/lambda/latest/dg/python-image.html")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://acloudguru.com/blog/engineering/packaging-aws-lambda-functions-as-container-images"},"https://acloudguru.com/blog/engineering/packaging-aws-lambda-functions-as-container-images"))))}d.isMDXComponent=!0}}]);