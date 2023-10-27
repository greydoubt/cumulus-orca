import json
import os
from http import HTTPStatus
from typing import Any, Dict, List, Union

import fastjsonschema
from aws_lambda_powertools import Logger
from aws_lambda_powertools.utilities.typing import LambdaContext
from fastjsonschema import JsonSchemaException
from orca_shared.database import shared_db
from sqlalchemy import text
from sqlalchemy.future import Engine

INPUT_COLLECTION_ID_KEY = "collectionId"
INPUT_GRANULE_ID_KEY = "granuleId"
INPUT_JOB_ID_KEY = "asyncOperationId"

OUTPUT_COLLECTION_ID_KEY = "collectionId"
OUTPUT_GRANULE_ID_KEY = "granuleId"
OUTPUT_JOB_ID_KEY = "asyncOperationId"
OUTPUT_FILES_KEY = "files"
OUTPUT_FILENAME_KEY = "fileName"
OUTPUT_RESTORE_DESTINATION_KEY = "restoreDestination"
OUTPUT_STATUS_KEY = "status"
OUTPUT_ERROR_MESSAGE_KEY = "errorMessage"
OUTPUT_REQUEST_TIME_KEY = "requestTime"
OUTPUT_COMPLETION_TIME_KEY = "completionTime"


class JobNotFoundException(Exception):
    def __init__(self, collection_id: str, granule_id: str):
        self.collection_id = collection_id
        self.granule_id = granule_id


class JobGranuleCombinationNotFoundException(Exception):
    def __init__(self, job_id: str, collection_id: str, granule_id: str):
        self.job_id = job_id
        self.collection_id = collection_id
        self.granule_id = granule_id


with open("schemas/input.json", "r") as raw_schema:
    _VALIDATE_INPUT = fastjsonschema.compile(json.loads(raw_schema.read()))

with open("schemas/output.json", "r") as raw_schema:
    _VALIDATE_OUTPUT = fastjsonschema.compile(json.loads(raw_schema.read()))

# Set AWS powertools logger
LOGGER = Logger()


def task(
    collection_id: str, granule_id: str, db_connect_info: Dict, job_id: str = None
) -> Dict[str, Any]:
    # noinspection SpellCheckingInspection
    """
    Args:
        collection_id: The ID of the collection containing the granule.
        granule_id: The ID of the granule to retrieve status for.
        db_connect_info: The {database}.py defined db_connect_info.
        job_id: An optional additional filter to get a specific job's entry.
    Returns: See output.json
    """
    engine = shared_db.get_user_connection(db_connect_info)

    if job_id is None or len(job_id) == 0:
        job_id = get_most_recent_job_id_for_granule(collection_id, granule_id, engine)
        if job_id is None:
            raise JobNotFoundException(collection_id, granule_id)

    job_entry = get_job_entry_for_granule(collection_id, granule_id, job_id, engine)
    if job_entry is None:
        raise JobGranuleCombinationNotFoundException(job_id, collection_id, granule_id)

    if job_entry[OUTPUT_COMPLETION_TIME_KEY] is None:
        del job_entry[OUTPUT_COMPLETION_TIME_KEY]

    file_entries = get_file_entries_for_granule_in_job(
        collection_id, granule_id, job_id, engine
    )
    for file_entry in file_entries:
        if file_entry[OUTPUT_ERROR_MESSAGE_KEY] is None:
            del file_entry[OUTPUT_ERROR_MESSAGE_KEY]

    job_entry[OUTPUT_FILES_KEY] = file_entries
    return job_entry


@shared_db.retry_operational_error()
def get_most_recent_job_id_for_granule(
    collection_id: str, granule_id: str, engine: Engine
) -> Union[str, None]:
    """
    Gets the job_id for the most recent job that restores the given granule.

    Args:
        collection_id: The ID of the collection containing the granule.
        granule_id: The ID of the granule to retrieve status for.
        engine: The sqlalchemy engine to use for contacting the database.

    Returns: The job_id for the given granule's restore job.
    """
    try:
        with engine.begin() as connection:
            results = connection.execute(
                get_most_recent_job_id_for_granule_sql(),
                [
                    {
                        "collection_id": collection_id,
                        "granule_id": granule_id,
                    }
                ],
            )
    except Exception as err:
        LOGGER.error(f"DbError: {err}")
        raise

    row = None
    for row in results.mappings():
        break

    if row is None:
        return None
    return row["job_id"]


def get_most_recent_job_id_for_granule_sql() -> text:  # pragma: no cover
    return text(
        """
            SELECT
                job_id
            FROM
                recovery_job
            WHERE
                collection_id = :collection_id
                AND granule_id = :granule_id
            ORDER BY
                 request_time DESC
            LIMIT 1"""
    )


@shared_db.retry_operational_error()
def get_job_entry_for_granule(
    collection_id: str, granule_id: str, job_id: str, engine: Engine
) -> Union[Dict[str, Any], None]:
    # noinspection SpellCheckingInspection
    """
    Gets the recovery_file status entries for the associated granule_id.
    If async_operation_id is non-None, then it will be used to filter results.
    Otherwise, only the item with the most recent request_time will be returned.

    Args:
        collection_id: The ID of the collection containing the granule.
        granule_id: The ID of the granule to retrieve status for.
        job_id: An optional additional filter to get a specific job's entry.
        engine: The sqlalchemy engine to use for contacting the database.
    Returns: A Dict with the following keys:
        'collection_id' (str): The ID of the collection containing the granule retrieved.
        'granule_id' (str): The ID of the granule retrieved.
        'job_id' (str): The unique ID of the asyncOperation.
        'request_time' (int): The time, in milliseconds since 1 January 1970 UTC,
            when the request to restore the granule was initiated.
        'completion_time' (int, Null): The time, in milliseconds since 1 January 1970 UTC,
            when all granule_files were no longer 'pending'/'staged'.
    """
    try:
        with engine.begin() as connection:
            results = connection.execute(
                get_job_entry_for_granule_sql(),
                [
                    {
                        "collection_id": collection_id,
                        "granule_id": granule_id,
                        "job_id": job_id,
                    }
                ],
            )
    except Exception as err:
        LOGGER.error(f"DbError: {err}")
        raise

    row = None
    for row in results.mappings():
        break

    if row is None:
        return None
    return {
        OUTPUT_COLLECTION_ID_KEY: row[OUTPUT_COLLECTION_ID_KEY],
        OUTPUT_GRANULE_ID_KEY: row[OUTPUT_GRANULE_ID_KEY],
        OUTPUT_JOB_ID_KEY: row[OUTPUT_JOB_ID_KEY],
        OUTPUT_REQUEST_TIME_KEY: row[OUTPUT_REQUEST_TIME_KEY],
        OUTPUT_COMPLETION_TIME_KEY: row[OUTPUT_COMPLETION_TIME_KEY],
    }


def get_job_entry_for_granule_sql() -> text:  # pragma: no cover
    return text(
        f"""
                SELECT
                    collection_id as "{OUTPUT_COLLECTION_ID_KEY}",
                    granule_id as "{OUTPUT_GRANULE_ID_KEY}",
                    job_id as "{OUTPUT_JOB_ID_KEY}",
                    (EXTRACT(EPOCH FROM date_trunc('milliseconds', request_time)
                    AT TIME ZONE 'UTC') * 1000)::bigint as "{OUTPUT_REQUEST_TIME_KEY}",
                    (EXTRACT(EPOCH FROM date_trunc('milliseconds', completion_time)
                    AT TIME ZONE 'UTC') * 1000)::bigint as "{OUTPUT_COMPLETION_TIME_KEY}"
                FROM
                    recovery_job
                WHERE
                    collection_id = :collection_id
                    AND granule_id = :granule_id
                    AND job_id = :job_id"""  # nosec
    )


@shared_db.retry_operational_error()
def get_file_entries_for_granule_in_job(
    collection_id: str, granule_id: str, job_id: str, engine: Engine
) -> List[Dict]:
    """
    Gets the individual status entries for the files for the given job+granule.

    Args:
        collection_id: The id of the collection containing the granule.
        granule_id: The id of the granule to get file statuses for.
        job_id: The id of the job to get file statuses for.
        engine: The sqlalchemy engine to use for contacting the database.

    Returns: A Dict with the following keys:
        'file_name' (str): The name and extension of the file.
        'restore_destination' (str): The name of the archive bucket the file is being copied to.
        'status' (str): The status of the restoration of the file.
            May be 'pending', 'staged', 'success', or 'error'.
        'error_message' (str): If the restoration of the file errored,
            the error will be stored here. Otherwise, None.
    """
    try:
        with engine.begin() as connection:
            results = connection.execute(
                get_file_entries_for_granule_in_job_sql(),
                [
                    {
                        "collection_id": collection_id,
                        "granule_id": granule_id,
                        "job_id": job_id,
                    }
                ],
            )
    except Exception as err:
        LOGGER.error(f"DbError: {err}")
        raise

    rows = []
    for row in results.mappings():
        rows.append(
            {
                OUTPUT_FILENAME_KEY: row[OUTPUT_FILENAME_KEY],
                OUTPUT_RESTORE_DESTINATION_KEY: row[OUTPUT_RESTORE_DESTINATION_KEY],
                OUTPUT_STATUS_KEY: row[OUTPUT_STATUS_KEY],
                OUTPUT_ERROR_MESSAGE_KEY: row[OUTPUT_ERROR_MESSAGE_KEY],
            }
        )

    return rows


def get_file_entries_for_granule_in_job_sql() -> text:  # pragma: no cover
    return text(
        f"""
            SELECT
                recovery_file.filename AS "{OUTPUT_FILENAME_KEY}",
                recovery_file.restore_destination AS "{OUTPUT_RESTORE_DESTINATION_KEY}",
                recovery_status.value AS "{OUTPUT_STATUS_KEY}",
                recovery_file.error_message as "{OUTPUT_ERROR_MESSAGE_KEY}"
            FROM
                recovery_file
            JOIN recovery_status ON recovery_file.status_id=recovery_status.id
            WHERE
                collection_id = :collection_id AND granule_id = :granule_id AND job_id = :job_id
            ORDER BY filename desc"""  # nosec
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
    # noinspection SpellCheckingInspection
    """
    Entry point for the request_status_for_granule Lambda.
    Args:
        event: A dict with the following keys:
            granule_id: The unique ID of the granule to retrieve status for.
            asyncOperationId (Optional): The unique ID of the asyncOperation.
                May apply to a request that covers multiple granules.
        context: This object provides information about the lambda invocation, function,
            and execution env.
    Environment Vars:
        DB_CONNECT_INFO_SECRET_ARN (string):
            Secret ARN of the AWS secretsmanager secret for connecting to the database.
        See shared_db.py's get_configuration for further details.

    Returns: A Dict with the following keys:
        'granule_id' (str): The unique ID of the granule to retrieve status for.
        'asyncOperationId' (str): The unique ID of the asyncOperation.
        'files' (List): Description and status of the files within the given granule.
            List of Dicts with keys:
                'file_name' (str): The name and extension of the file.
                'restore_destination' (str): The name of the archive bucket
                    the file is being copied to.
                'status' (str): The status of the restoration of the file.
                    May be 'pending', 'staged', 'success', or 'error'.
                'error_message' (str, Optional): If the restoration of the file errored,
                    the error will be stored here.
        'request_time' (DateTime): The time, in UTC isoformat,
            when the request to restore the granule was initiated.
        'completion_time' (DateTime, Optional): The time, in UTC isoformat,
            when all granule_files were no longer 'pending'/'staged'.

        Or, if an error occurs, see create_http_error_dict
            400 if granule_id is missing.
            400 if input.json schema is not matched.
            500 if an error occurs when querying the database.
            404 if not found.
    """

    # get the secret ARN from the env variable
    try:
        db_connect_info_secret_arn = os.environ["DB_CONNECT_INFO_SECRET_ARN"]
    except KeyError:
        LOGGER.error("DB_CONNECT_INFO_SECRET_ARN environment value not found.")
        raise

    db_connect_info = shared_db.get_configuration(db_connect_info_secret_arn)

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

        collection_id = event[INPUT_COLLECTION_ID_KEY]
        granule_id = event[INPUT_GRANULE_ID_KEY]

        result = task(
            collection_id,
            granule_id,
            db_connect_info,
            event.get(INPUT_JOB_ID_KEY, None),
        )

        _VALIDATE_OUTPUT(result)

        return result
    except JobNotFoundException as error:
        return create_http_error_dict(
            "NotFound",
            HTTPStatus.NOT_FOUND,
            context.aws_request_id,
            f"No job for collection '{error.collection_id}' granule '{error.granule_id}'.",
        )
    except JobGranuleCombinationNotFoundException as error:
        return create_http_error_dict(
            "NotFound",
            HTTPStatus.NOT_FOUND,
            context.aws_request_id,
            f"No job found for collection '{error.collection_id}' granule '{error.granule_id}' "
            f"job '{error.job_id}'.",
        )
    except Exception as error:
        return create_http_error_dict(
            "InternalServerError",
            HTTPStatus.INTERNAL_SERVER_ERROR,
            context.aws_request_id,
            error.__str__(),
        )
