DROP SCHEMA IF EXISTS orca CASCADE;
DROP ROLE IF EXISTS orcauser;
REVOKE CREATE ON DATABASE disaster_recovery FROM GROUP orca_dbo;
REVOKE CONNECT ON DATABASE disaster_recovery FROM GROUP orca_dbo;
DROP GROUP IF EXISTS orca_dbo;
REVOKE CONNECT ON DATABASE disaster_recovery FROM GROUP orca_app;
DROP GROUP IF EXISTS orca_app;
COMMIT;
