from sqlalchemy import text

from src.adapters.storage.rdbms import StorageAdapterRDBMS


class StorageAdapterPostgres(StorageAdapterRDBMS):

    def __init__(self, user_connection_uri: str):
        super(StorageAdapterPostgres, self).__init__(user_connection_uri)

    @staticmethod
    def get_schema_version_sql() -> text:  # pragma: no cover
        """
        SQL for getting the version number of the most up-to-date version of the DB structure
        deployed.
        """
        return text("""
SELECT
    version_id
FROM
    orca.schema_versions
WHERE
    is_latest = True"""
                    )

    @staticmethod
    def get_mismatch_page_sql() -> text:  # pragma: no cover
        """
        todo
        """
        return text(
            # todo: Allow for different orders
            """
SELECT
    job_id,
    collection_id,
    granule_id,
    filename,
    key_path,
    cumulus_archive_location,
    orca_etag,
    s3_etag,
    (EXTRACT(EPOCH FROM date_trunc('milliseconds', orca_last_update)
     AT TIME ZONE 'UTC') * 1000)::bigint as orca_last_update,
    (EXTRACT(EPOCH FROM date_trunc('milliseconds', s3_last_update)
     AT TIME ZONE 'UTC') * 1000)::bigint as s3_last_update,
    orca_size_in_bytes,
    s3_size_in_bytes,
    storage_class.value AS orca_storage_class,
    s3_storage_class,
    discrepancy_type,
    CASE
        WHEN (reconcile_job.inventory_creation_time <= orca_last_update)
            THEN 'Error may be due to race condition, and should be checked manually.'
        WHEN (reconcile_job.inventory_creation_time <= s3_last_update)
            THEN 'Error may be due to race condition, and should be checked manually.'
    END AS comment
    FROM reconcile_catalog_mismatch_report
    INNER JOIN reconcile_job ON
    (
        reconcile_job.id = reconcile_catalog_mismatch_report.job_id
    )
    INNER JOIN storage_class ON
    (
        orca_storage_class_id=storage_class.id
    )
    WHERE 
        job_id = :job_id
        AND
            /* One check to see if no cursor is specified */
            (:cursor_collection_id = NULL
            OR
                (collection_id >= :cursor_collection_id
                AND
                    (collection_id > :cursor_collection_id
                    OR
                        (granule_id >= :cursor_granule_id
                        AND
                            (granule_id > :cursor_granule_id
                            OR
                                (key_path > :cursor_key_path)
                            )
                        )
                    )
                )
            )
    ORDER BY 
        collection_id ASC, 
        granule_id ASC, 
        key_path ASC
    LIMIT :limit"""
        )
