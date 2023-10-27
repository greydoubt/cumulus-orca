import json
import os
from http import HTTPStatus
from typing import Any, Dict, List

import fastjsonschema
from aws_lambda_powertools import Logger
from aws_lambda_powertools.utilities.typing import LambdaContext
from fastjsonschema import JsonSchemaException
from orca_shared.database import shared_db
from sqlalchemy import text
from sqlalchemy.future import Engine

INPUT_JOB_ID_KEY = "asyncOperationId"

OUTPUT_JOB_ID_KEY = "asyncOperationId"
OUTPUT_JOB_STATUS_TOTALS_KEY = "jobStatusTotals"
OUTPUT_GRANULES_KEY = "granules"
OUTPUT_STATUS_KEY = "status"
OUTPUT_COLLECTION_ID_KEY = "collectionId"
OUTPUT_GRANULE_ID_KEY = "granuleId"


class StatusNotFoundException(Exception):
    def __init__(self, job_id):
        self.job_id = job_id


with open("schemas/input.json", "r") as raw_schema:
    _VALIDATE_INPUT = fastjsonschema.compile(json.loads(raw_schema.read()))

with open("schemas/output.json", "r") as raw_schema:
    _VALIDATE_OUTPUT = fastjsonschema.compile(json.loads(raw_schema.read()))

# Set AWS powertools logger
LOGGER = Logger()


def task(job_id: str, db_connect_info: Dict) -> Dict[str, Any]:
    """

    Args:
        job_id: The unique asyncOperationId of the recovery job.
        db_connect_info: The database.py defined db_connect_info.
    Returns:
        A dictionary with the following keys:
            'asyncOperationId' (str): The job_id.
            'job_status_totals' (Dict): A dictionary with the following keys:
                'pending' (int)
                'staged' (int)
                'success' (int)
                'failed' (int)
            'granules' (List): A list of dicts with the following keys:
                'granule_id' (str)
                'status' (str): pending|staged|success|failed
    """
    if job_id is None or len(job_id) == 0:
        raise ValueError("job_id must be set to a non-empty value.")

    engine = shared_db.get_user_connection(db_connect_info)

    status_entries = get_granule_status_entries_for_job(job_id, engine)
    if len(status_entries) == 0:
        raise StatusNotFoundException(job_id)

    status_totals = get_status_totals_for_job(job_id, engine)
    return {
        OUTPUT_JOB_ID_KEY: job_id,
        OUTPUT_JOB_STATUS_TOTALS_KEY: status_totals,
        OUTPUT_GRANULES_KEY: status_entries,
    }


@shared_db.retry_operational_error()
def get_granule_status_entries_for_job(
    job_id: str, engine: Engine
) -> List[Dict[str, Any]]:
    """
    Gets the recovery_job status entry for the associated job_id.

    Args:
        job_id: The unique asyncOperationId of the recovery job to retrieve status for.
        engine: The sqlalchemy engine to use for contacting the database.

    Returns: A list of dicts with the following keys:
        'granule_id' (str)
        'status' (str): pending|staged|success|failed

    """
    try:
        with engine.begin() as connection:
            results = connection.execute(
                get_granule_status_entries_for_job_sql(),
                [{"job_id": job_id}],
            )
    except Exception as err:
        LOGGER.error(f"DbError: {err}")
        raise

    rows = []
    for row in results.mappings():
        rows.append(
            {
                OUTPUT_COLLECTION_ID_KEY: row[OUTPUT_COLLECTION_ID_KEY],
                OUTPUT_GRANULE_ID_KEY: row[OUTPUT_GRANULE_ID_KEY],
                OUTPUT_STATUS_KEY: row[OUTPUT_STATUS_KEY],
            }
        )
    return rows


def get_granule_status_entries_for_job_sql() -> text:  # pragma: no cover
    return text(
        f"""
                SELECT
                    collection_id as "{OUTPUT_COLLECTION_ID_KEY}",
                    granule_id as "{OUTPUT_GRANULE_ID_KEY}",
                    recovery_status.value AS "{OUTPUT_STATUS_KEY}"
                FROM
                    recovery_job
                JOIN recovery_status ON recovery_job.status_id=recovery_status.id
                WHERE
                    job_id = :job_id
                """  # nosec
    )


@shared_db.retry_operational_error()
def get_status_totals_for_job(job_id: str, engine: Engine) -> Dict[str, int]:
    # noinspection SpellCheckingInspection
    """
    Gets the number of recovery_job for the given job_id for each possible status value.

    Args:
        job_id: The unique id of the recovery job to retrieve status for.
        engine: The sqlalchemy engine to use for contacting the database.

    Returns: A dictionary with the following keys:
        'pending' (int)
        'staged' (int)
        'success' (int)
        'failed' (int)
    """
    try:
        with engine.begin() as connection:
            results = connection.execute(
                get_status_totals_for_job_sql(),
                [{"job_id": job_id}],
            )
    except Exception as err:
        LOGGER.error(f"DbError: {err}")
        raise

    totals = {row["value"]: row["total"] for row in results.mappings()}
    return totals


def get_status_totals_for_job_sql() -> text:  # pragma: no cover
    return text(  # nosec
        """
                with granule_status_count AS (
                    SELECT status_id
                        , count(*) as total
                    FROM recovery_job
                    WHERE job_id = :job_id
                    GROUP BY status_id
                )
                SELECT value
                    , coalesce(total, 0) as total
                FROM recovery_status os
                LEFT JOIN granule_status_count gsc ON (gsc.status_id = os.id)"""  # noqa
    )


def create_http_error_dict(
    error_type: str, http_status_code: int, request_id: str, message: str
) -> Dict[str, Any]:
    """
    Creates a standardized dictionary for error reporting.
    Args:
        error_type: The string representation of http_status_code.
        http_status_code: The integer representation of the http error.
        request_id: The incoming request's id.
        message: The message to display to the user and to record for debugging.
    Returns:
        A dict with the following keys:
            'errorType' (str)
            'httpStatus' (int)
            'requestId' (str)
            'message' (str)
    """
    LOGGER.error(message)
    return {
        "errorType": error_type,
        "httpStatus": http_status_code,
        "requestId": request_id,
        "message": message,
    }


@LOGGER.inject_lambda_context
def handler(event: Dict[str, Any], context: LambdaContext) -> Dict[str, Any]:
    """
    Entry point for the request_status_for_job Lambda.
    Args:
        event: A dict with the following keys:
            asyncOperationId: The unique asyncOperationId of the recovery job.
        context: This object provides information about the lambda invocation, function,
            and execution env.
    Environment Vars:
        DB_CONNECT_INFO_SECRET_ARN (string):
            Secret ARN of the AWS secretsmanager secret for connecting to the database.
        See shared_db.py's get_configuration for further details.

    Returns: A Dict with the following keys:
        asyncOperationId (str): The unique ID of the asyncOperation.
        job_status_totals (Dict[str, int]): Sums of how many granules are in each
            particular restoration status.
                pending (int): The number of granules that still need to be copied.
                staged (int): Currently unimplemented.
                success (int): The number of granules that have been successfully copied.
                failed (int): The number of granules that did not copy
                              and will not copy due to an error.
        granules (Array[Dict]): An array of Dicts representing each granule
            being copied as part of the job.
                granule_id (str): The unique ID of the granule.
                status (str): The status of the restoration of the file.
                    May be 'pending', 'staged', 'success', or 'failed'.

        Or, if an error occurs, see create_http_error_dict
            400 if input.json schema is not matched.
            404 if no status found.
            500 if an error occurs when querying the database.
    """
    # get the secret ARN from the env variable
    try:
        db_connect_info_secret_arn = os.environ["DB_CONNECT_INFO_SECRET_ARN"]
    except KeyError:
        LOGGER.error("DB_CONNECT_INFO_SECRET_ARN environment value not found.")
        raise

    try:

        try:
            _VALIDATE_INPUT(event)
        except JsonSchemaException as json_schema_exception:
            return create_http_error_dict(
                "BadRequest",
                HTTPStatus.BAD_REQUEST,
                context.aws_request_id,
                json_schema_exception.__str__(),
            )

        job_id = event.get(INPUT_JOB_ID_KEY, None)
        if job_id is None or len(job_id) == 0:
            return create_http_error_dict(
                "BadRequest",
                HTTPStatus.BAD_REQUEST,
                context.aws_request_id,
                f"{INPUT_JOB_ID_KEY} must be set to a non-empty value.",
            )
        db_connect_info = shared_db.get_configuration(db_connect_info_secret_arn)
        result = task(job_id, db_connect_info)

        _VALIDATE_OUTPUT(result)

        return result
    except StatusNotFoundException as error:
        return create_http_error_dict(
            "NotFound",
            HTTPStatus.NOT_FOUND,
            context.aws_request_id,
            f"No granules found for job id '{error.job_id}'.",
        )
    except Exception as error:
        return create_http_error_dict(
            "InternalServerError",
            HTTPStatus.INTERNAL_SERVER_ERROR,
            context.aws_request_id,
            error.__str__(),
        )
