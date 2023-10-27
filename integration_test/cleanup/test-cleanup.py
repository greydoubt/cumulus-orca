import boto3
import os
from orca_shared.database import shared_db
from sqlalchemy import text
from aws_lambda_powertools import Logger
from botocore.exceptions import ClientError


LOGGER = Logger()

# os.env keys
recovery_bucket_name = os.environ["orca_RECOVERY_BUCKET_NAME"]
source_bucket_name = os.environ["SOURCE_BUCKET_NAME"]
db_connect_info_secret_arn = os.environ["DB_CONNECT_INFO_SECRET_ARN"]

# grab the objects to be deleted from source bucket
s3 = boto3.client('s3')
source_object_results = s3.list_objects_v2(
    Bucket=source_bucket_name,
    Prefix='test'
)
source_filenames = []
for item in source_object_results['Contents']:
    file_key = item['Key']
    source_filenames.append(file_key)
LOGGER.info(source_filenames)

# grab the objects to be deleted from recovery bucket
recovery_object_results = s3.list_objects_v2(
    Bucket=recovery_bucket_name,
    # Prefix='test'  # Large file PODAAC/SWOT/ancillary_data_input_forcing_ECCO_V4r4.tar.gz is stored outside of the 'test' directory.
)
recovery_filenames = []
for item in recovery_object_results['Contents']:
    file_key = item['Key']
    recovery_filenames.append(file_key)
LOGGER.info(recovery_filenames)

# Delete objects from source and recovery buckets
for object in source_filenames:
    response_source = s3.delete_object(
        Bucket=source_bucket_name,
        Key=object,
    )
for object in recovery_filenames:
    response_destination = s3.delete_object(
        Bucket=recovery_bucket_name,
        Key=object,
    )

# verify objects are deleted from buckets
for object in source_filenames:
    try:
        head_source_object_output = s3.head_object(
        Bucket=source_bucket_name,Key=object)
        raise Exception(f"{object} still exists in {source_bucket_name}")
    except ClientError as error:
        if error.response['Error']['Code'] == '404':
            LOGGER.info(f"{object} deleted from {source_bucket_name}. Test passed!")
        else:
            raise error
for object in recovery_filenames:
    try:
        head_recovery_object_output = s3.head_object(
        Bucket=recovery_bucket_name,Key=object
        )
        raise Exception(f"{object} still exists in {recovery_bucket_name}")    
    except ClientError as error:
        if error.response['Error']['Code'] == '404':
            LOGGER.info(f"{object} deleted from {recovery_bucket_name}. Test passed!")
        else:
            raise error
#delete from ORCA catalog
db_connect_info = shared_db.get_configuration(db_connect_info_secret_arn)
db_connect_info["host"] = "localhost"  # this is needed when running locally
engine = shared_db.get_user_connection(db_connect_info)

def delete_from_catalog_sql() -> text:
    return text(
        """
        DELETE FROM orca.files;
        DELETE FROM orca.granules;
        DELETE FROM orca.collections;
        DELETE FROM orca.providers;
        """
    )

with engine.begin() as connection:
    results = connection.execute(
        delete_from_catalog_sql()
    )
connection.commit()
LOGGER.info("Objects deleted from ORCA catalog")