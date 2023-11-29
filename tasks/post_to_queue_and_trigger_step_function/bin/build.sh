#!/bin/bash
## =============================================================================
## NAME: build.sh
##
##
## DESCRIPTION
## -----------------------------------------------------------------------------
## Builds the lambda (task) zip file for post_to_queue_and_trigger_step_function.
##
##
## USAGE
## -----------------------------------------------------------------------------
## bin/build.sh
##
## This must be called from the (root) lambda directory /tasks/post_to_queue_and_trigger_step_function
## =============================================================================

## Set this for Debugging only
#set -ex

## Make sure we are calling the script the correct way.
BASEDIR=$(dirname $0)
if [ "$BASEDIR" != "bin" ]; then
  >&2 echo "ERROR: This script must be called from the root directory of the task lambda [bin/build.sh]."
  exit 1
fi


source ../../bin/common/check_returncode.sh
source ../../bin/common/venv_management.sh

## MAIN
## -----------------------------------------------------------------------------
## Create the build directory. Remove it if it exists.
echo "INFO: Creating build directory ..."
if [ -d build18 ]; then
    rm -rf build18
fi

run_and_check_returncode "mkdir build18"
trap 'rm -rf build18' EXIT

run_and_check_returncode "create_and_activate_venv"
trap 'deactivate_and_delete_venv;rm -rf build18;' EXIT
run_and_check_returncode "pip install -q --upgrade pip --trusted-host pypi.org --trusted-host files.pythonhosted.org"

## Install the requirements
pip install -q -t build18 -r requirements.txt --trusted-host pypi.org --trusted-host files.pythonhosted.org
check_returncode $? "ERROR: pip install encountered an error."

# Install the aws-lambda psycopg2 libraries
mkdir -p build18/psycopg2

##TODO: Adjust build scripts to put shared packages needed under a task/build/packages directory.
##      and copy the packages from there.
if [ ! -d "../package" ]; then
    run_and_check_returncode "mkdir -p ../package"
fi

if [ ! -d "../package/awslambda-psycopg2/psycopg2-3.9" ]; then
  rm -d -f -r "../package/awslambda-psycopg2"
fi
if [ ! -d "../package/awslambda-psycopg2" ]; then
    ## TODO: This should be pulling based on a release version instead of latest
    run_and_check_returncode "git clone https://github.com/jkehler/awslambda-psycopg2.git ../package/awslambda-psycopg2"
fi

cp ../package/awslambda-psycopg2/psycopg2-3.9/* build18/psycopg2/
check_returncode $? "ERROR: Unable to install psycopg2."


## Copy the lambda files to build
echo "INFO: Creating the Lambda package ..."
cp *.py build18/
check_returncode $? "ERROR: Failed to copy lambda files to build directory."

## Copy the schema files to build
echo "INFO: Copying schema files ..."
cp -r schemas/ build18/
check_returncode $? "ERROR: Failed to copy schema files to build directory."

## Create the zip archive
cd build18
trap 'cd -;deactivate_and_delete_venv;rm -rf build18;' EXIT
run_and_check_returncode "zip -qr ../post_to_queue_and_trigger_step_function.zip ."
