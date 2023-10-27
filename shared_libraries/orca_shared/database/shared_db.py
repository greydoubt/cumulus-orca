"""
Name: shared_db.py

Description: Shared library for database objects needed by the various libraries.
"""

import functools
import json
import os
import random
import time
from typing import Any, Callable, Dict, TypeVar

import boto3
from aws_lambda_powertools import Logger
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.exc import OperationalError
from sqlalchemy.future import Engine

# Set AWS powertools logger
LOGGER = Logger()

MAX_RETRIES = 3  # number of times to retry.
BACKOFF_FACTOR = 2  # Value of the factor used to backoff
INITIAL_BACKOFF_IN_SECONDS = 1  # Number of seconds to sleep the first time through.
RT = TypeVar("RT")  # return type


def get_configuration(db_connect_info_secret_arn: str) -> Dict[str, str]:
    """
    Create a dictionary of configuration values based on environment variables
    and secret information items needed to create ORCA database connections.

    ```
    Environment Variables:
        AWS_REGION (str): AWS reserved runtime variable used to set boto3 client region.
    ```

    Args:
        db_connect_info_secret_arn (str): The secret ARN of the secret in AWS secretsmanager.

    Returns:
        Configuration (Dict): Dictionary with all of the configuration information.
                              The schema for the output is available [here](schemas/output.json).

    Raises:
        Exception (Exception): When variables or secrets are not available.
    """

    # Get the AWS_REGION defined runtime environment reserved variable
    LOGGER.debug("Getting environment variable AWS_REGION value.")
    aws_region = os.getenv("AWS_REGION", None)

    if aws_region is None or len(aws_region) == 0:
        message = "Runtime environment variable AWS_REGION is not set."
        LOGGER.critical(message)
        raise Exception(message)

    try:
        LOGGER.debug("Creating secretsmanager resource.")
        secretsmanager = boto3.client("secretsmanager", region_name=aws_region)

        LOGGER.debug(
            "Retrieving db login info for both user and admin as a dictionary."
        )
        config = json.loads(
            secretsmanager.get_secret_value(SecretId=db_connect_info_secret_arn)[
                "SecretString"
            ]
        )
        LOGGER.debug(
            "Successfully retrieved db login info for both user and admin as a dictionary."
        )
    except Exception:
        LOGGER.critical("Failed to retrieve secret.", exc_info=True)
        raise Exception("Failed to retrieve secret manager value.")

    # return the config dict
    return config


def _create_connection(**kwargs: Any) -> Engine:
    """
    Base function for creating a connection engine that can connect to a database.

    Args:
        host (str): Database host to connect to
        port (str): Database port to connect to
        database (str): Database name to connect to
        username (str): Database user to connect as
        password (str): Database password for the user

    Returns
        Engine (sqlalchemy.future.Engine): engine object for creating database connections.
    """
    LOGGER.debug("Creating URL object to connect to the database.")
    connection_url = URL.create(drivername="postgresql", **kwargs)
    return create_engine(connection_url, future=True)


def get_admin_connection(config: Dict[str, str], database: str = None) -> Engine:
    """
    Creates a connection engine to a database as a superuser.

    Args:
        config (Dict): Configuration containing connection information.
        database (str): Database for the admin user to connect to. Defaults to admin_database.

    Returns
        Engine (sqlalchemy.future.Engine): engine object for creating database connections.
    """
    # Determine database to use
    if database is None or len(database) == 0:
        admin_database = config["admin_database"]
    else:
        admin_database = database

    LOGGER.debug("Creating admin user connection object.")
    LOGGER.debug(f"Database set to {admin_database} for the connection.")
    connection = _create_connection(
        host=config["host"],
        port=config["port"],
        database=admin_database,
        username=config["admin_username"],
        password=config["admin_password"],
    )

    return connection


def get_user_connection(config: Dict[str, str]) -> Engine:
    """
    Creates a connection engine to the application database as the application
    database user.

    Args:
        config (Dict): Configuration containing connection information.

    Returns
        Engine (sqlalchemy.future.Engine): engine object for creating database connections.
    """

    LOGGER.debug("Creating application user connection object.")
    connection = _create_connection(
        host=config["host"],
        port=config["port"],
        database=config["user_database"],
        username=config["user_username"],
        password=config["user_password"],
    )

    return connection


# Retry decorator for functions
def retry_operational_error(
    max_retries: int = MAX_RETRIES,
    backoff_in_seconds: int = INITIAL_BACKOFF_IN_SECONDS,
    backoff_factor: int = BACKOFF_FACTOR,
) -> Callable[[Callable[[], RT]], Callable[[], RT]]:
    """
    Decorator takes arguments to adjust number of retries and backoff strategy.
    Args:
        max_retries (int): number of times to retry in case of failure.
        backoff_in_seconds (int): Number of seconds to sleep the first time through.
        backoff_factor (int): Value of the factor used for backoff.
    """

    def decorator_retry_operational_error(func: Callable[[], RT]) -> Callable[[], RT]:
        """
        Main Decorator that takes our function as an argument
        """

        @functools.wraps(func)  # Use built in for decorators
        def wrapper_retry_operational_error(*args, **kwargs) -> RT:
            """
            Wrapper that performs our extra tasks on the function
            """
            # Initialize the retry loop
            total_retries = 0

            # Enter loop
            while True:
                # Try the function and catch the expected error
                try:
                    return func(*args, **kwargs)
                except OperationalError:
                    if total_retries == max_retries:
                        # Log it and re-raise if we maxed our retries + initial attempt
                        LOGGER.error(
                            f"Encountered Errors {total_retries} times. Reached max retry limit.",
                        )
                        raise
                    else:
                        # perform exponential delay
                        backoff_time = (
                            backoff_in_seconds * backoff_factor**total_retries
                            + random.uniform(0, 1)  # nosec
                        )
                        LOGGER.error(
                            f"Encountered OperationalError on attempt {total_retries}. "
                            f"Sleeping {backoff_time} seconds.",
                        )
                        time.sleep(backoff_time)
                        total_retries += 1
                except Exception as ex:
                    LOGGER.error(f"Encountered a non-retriable error: {ex}")
                    raise ex

        # Return our wrapper
        return wrapper_retry_operational_error

    # Return our decorator
    return decorator_retry_operational_error
