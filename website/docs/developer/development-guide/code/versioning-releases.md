
---
id: versioning-releases
title:  ORCA Versioning and Releases
description: Provides information to developers on semantic versioning and the release process.
---

## Versioning

The ORCA team uses semantic versioning. More information about semantic
versioning can be found [here](https://semver.org/).

## Release Process

### Create a release branch

From develop, create a new release branch from develop following the
`release-MAJOR.MINOR.x`. For example, `release-1.14.1`. Push this branch
to github if you created it locally.

### Update CHANGELOG.md

Update the [CHANGELOG.md](https://github.com/nasa/cumulus-orca/blob/master/CHANGELOG.md).
Put a header under the 'Unreleased' section with the new version number and
the date.

### Create a git tag for the release

Make sure you're on the latest commit of the release branch.

Create and push a new git tag:

```
    git tag -a vx.y.z -m "Release x.y.z"
    git push origin vx.y.z
```

### Running the deployment

Publishing of new releases is handled by a Bamboo release plan and is manually
triggered.

If you created a new release branch in step one, you will need to create a new
bamboo deployment plan.

#### Creating a Bamboo deployment plan branch

1. The deployment plan is already created in Bamboo using [Bamboo Specs](https://github.com/nasa/cumulus-orca/tree/develop/bamboo-specs).
1. If you have updated the `bamboo.yaml` config file, you will need to import the updated spec file from Bamboo specs UI. Under `Specs` section, click on the `Set up Specs Repository`. On the `Project Type`, select `Build Project` and then `ORCA`. On the Specs repository, select the repository host as `orca-develop`. Note that choosing the wrong repository branch will cause issues in deployment. `ORCA repo` repository host is for `master` branch and `orca test branch` host is for `feature/ORCA-test-bamboo` branch used for testing and prototyping. Contact `Venku Jayanti` from CI/CD team for additional support.
1. In the ORCA project (https://ci.earthdata.nasa.gov/browse/ORCA-OI), scroll to the top left of the page where it indicates `Plan branch`. From the `Plan branch` dropdown menu, select the release branch you created for the release which should be in the format `release-X.X.X`.
1. Once inside the release branch page, scroll to the top right of the page and click `Actions`-> `Configure branch`.
1. On the `Plan branch configuration` page, under `Plan branch configuration`, enable 'Change Trigger'. Set the
   Trigger type to manual, and this will prevent commits to the branch from triggering the build plan.
1. Click on the `Variables` tab.
Ensure that you are on your branch plan and not the master plan. Click on the `Choose from inherited variables` dropdown menu.
   except in special cases such as incompatible backport branches. Then add and set the following variables:
     * ORCA_VERSION: `<version number>`
     * RELEASE_FLAG: true
     * SECRET_GITHUB_EMAIL: `<secret github email>`
     * SECRET_GITHUB_TOKEN: `<secret github token>`
     * SECRET_GITHUB_USER: `<secret github user>`

   Contact ORCA team to know values of the three github variables.
1. Run the branch using the 'Run' button in the top right.

Bamboo will build and run unit tests against that tagged release.

## Publish Documentation

1. Go to the [`Release ORCA Documentation` plan under ORCA](https://ci.earthdata.nasa.gov/browse/ORCA-ROD)
1. Click the `Create plan branch` button next to the `Plan branch` selector.
1. Choose your release branch and click `Create`.
Make sure to replace your bamboo github variables before running the pipeline.
1. Click on the `Variables` tab.
Ensure that you are on your branch plan and not the master plan. Click on the `Choose from inherited variables` dropdown menu.
   except in special cases such as incompatible backport branches. Then add and set the following variables:
     * SECRET_GITHUB_EMAIL: `<secret github email>`
     * SECRET_GITHUB_TOKEN: `<secret github token>`
     * SECRET_GITHUB_USER: `<secret github user>`

   Contact ORCA team to know values of the three github variables.
1. Run the branch using the 'Run' button in the top right.
1. Click on the `Tests` tab, followed by the `Release ORCA Documentation.` link.
1. Hit the play button next to the `Release Stage` and run the stage.

## Finalizing ORCA release on github

The release is automated in Bamboo, but the step must be manually started. If
you set the `RELEASE_FLAG` to `true` and the build steps passed, you will
be able to run the manual 'Release' step in Bamboo. Make sure to use the `ORCA Integrator` plan under ORCA on bamboo website for performing a code release.

The CI release scripts will create a release based on the release version tag,
as well as uploading release artifacts to the Github release for the Terraform
modules provided by Cumulus. The Terraform release artifacts include:

* A multi-module Terraform .zip artifact containing filtered copies of the
  tf-modules, packages, and tasks directories for use as Terraform module sources.

Just make sure to verify the appropriate .zip files are present on Github after
the release process is complete.

## Merge the base branch back into develop and master

If this is the latest version, you need to merge the version update changes back into master, then synchronize master and develop.

1. Create a PR to merge the release branch into master.
1. Once complete, create a PR to merge master into develop.
   This should only contain changes from the release process.

:::note Note:

Do not squash this merge. Doing so will make the "compare" view from step 4
show an incorrect diff, because the tag is linked to a specific commit on the
base branch.

:::

## Troubleshooting

### Delete and regenerate the tag

To delete a published tag to re-tag, follow these steps:

```
    git tag -d vx.y.z
    git push -d origin vx.y.z
```

## Deploying ORCA buckets, RDS cluster and Cumulus ORCA modules via bamboo

For testing purposes, you should use your feature branch in cumulus-orca github repo and [`Test ORCA Deploy Plan`](https://ci.earthdata.nasa.gov/browse/ORCA-TODP) bamboo plan so that it does not affect the ORCA github `develop` branch. The `Test ORCA Deploy Plan` bamboo plan is linked to `feature/ORCA-test-bamboo` github branch as the default branch under cumulus-orca repo.

:::warning
You should reset `feature/ORCA-test-bamboo` before using it.
1. Rename `feature/ORCA-test-bamboo` to `feature/ORCA-test-bamboo-old`
1. Create a new branch based off of your branch named `feature/ORCA-test-bamboo`
1. In the new branch's `bamboo.yaml`:
   Delete all but one of the plans and the `ORCA-ODP` plan.
   Change plan's `name` to `Test ORCA Deploy Plan`.
   In each `repositories` element, change `orca-develop` to `orca test branch`.
   In each `plan` element, change `OI`/`ODP` in `key` values to `TODP`.
:::

From the `feature/ORCA-test-bamboo` plan branch in bamboo, click on `Create plan branch` and enter your branch name which should appear in the dropdown menu. Select your branch and click `Create`. Make sure the branch is enabled. Finally, save the plan configuration and run your feature branch for testing. If you are updating your bamboo spec yaml file, note that the change will not be accepted by bamboo if you are in your feature branch. You must checkout to the `feature/ORCA-test-bamboo` branch first, merge develop branch into this branch to make sure it is up to date, commit your yaml file changes and then import from Bamboo Specs UI for that change to occur. This is because the spec file change can only be done in the default branch which is `feature/ORCA-test-bamboo` in this case. However, any other code changes can be done in your feature branch and bamboo will accept that.


You will use the `ORCA Deploy Plan` bamboo plan for deploying the resources.

After hitting the play button on `Deploy DR ORCA Buckets` stage in bamboo plan, but before hitting `Run` in the popup, replace the following variables with yours:
- PREFIX
- DR_AWS_ACCESS_KEY_ID
- DR_AWS_SECRET_ACCESS_KEY

:::tip
Hitting 'play' next to `Deploy DR ORCA buckets`, `Deploy Dev RDS Stack` and `Deploy Dev Cumulus and ORCA Stack` brings up a checkbox list to run multiple jobs at once. Note that none of the checkboxes should be checked. This is because some variables are sensitive and some will vary depending upon the user running the pipeline.
:::

:::tip
If you are targeting your personal feature branch, you may set these and future variables on the Plan Branch under `variables`.
Otherwise, keep personalized/sensitive values out of the main build.
:::

These are the ORCA buckets that will be created in the disaster recovery AWS account:

- `<PREFIX>-orca-primary`
- `<PREFIX>-orca-archive-worm`
- `<PREFIX>-orca-reports`
- `<PREFIX>-dr-tf-state` (for storing the terraform state file in DR account)

Some of these buckets have cross-account IAM policies attached so that they can be accessed from the other cumulus sandbox.

The Cumulus and TF buckets as well as dynamoDB table in cumulus OU account are created automatically in the Bamboo `Deploy Cumulus buckets and Cumulus and Orca modules` stage.
These are the buckets that will be created in cumulus OU account:

- `<PREFIX>-internal`
- `<PREFIX>-level0`
- `<PREFIX>-public`
- `<PREFIX>-private`
- `<PREFIX>-protected`
- `<PREFIX>-tf-state` (for storing the terraform state file in cumulus OU account)

The above buckets can also be created manually if desired by the user. Make sure to use the proper AWS access keys for configuration before running the commands.

Buckets can be created using the following CLI command:
```bash
aws s3api create-bucket --bucket <BUCKET_NAME>  --region us-west-2 --create-bucket-configuration LocationConstraint=us-west-2
```
The dynamodb table and bucket versioning can be created manually as well.
```bash
   aws dynamodb create-table \
      --table-name <PREFIX>-tf-locks \
      --attribute-definitions AttributeName=LockID,AttributeType=S \
      --key-schema AttributeName=LockID,KeyType=HASH \
      --billing-mode PAY_PER_REQUEST \
      --region us-west-2
```

```bash
      aws s3api put-bucket-versioning \
    --bucket <PREFIX>-tf-state \
    --versioning-configuration Status=Enabled
```

:::tip
The `*-tf-state` buckets and dynamoDB tables will not be automatically removed by cleanup scripts.
Once you are done with your testing, and you have verified that cleanup is actually successful, manually delete these resources.
:::

After hitting the play button on `Deploy Cumulus buckets and Cumulus and Orca modules`, but before hitting `Run` in the popup, replace the following variables with yours:
- CUMULUS_AWS_ACCESS_KEY_ID
- CUMULUS_AWS_SECRET_ACCESS_KEY
- PREFIX
- DB_ADMIN_PASSWORD
- DB_USER_PASSWORD
- CUMULUS_ORCA_DEPLOY_TEMPLATE_VERSION

`CUMULUS_ORCA_DEPLOY_TEMPLATE_VERSION` is the branch you want to check out in the [deployment repo](https://git.earthdata.nasa.gov/projects/ORCA/repos/cumulus-orca-deploy-template/browse) such as `v11.1.1-v4.0.1`.

Note that the jobs may need to be run multiple times to get past deployment errors if there is one. If an error is raised saying `Cloudwatch log groups already exist`, then manually delete all the cloudwatch log groups and corresponding lambdas having the same name as the log groups from the AWS console and retry running the job. If the deployment is successful, the pipeline will run ingest integration tests automatically in the next step.

<<<<<<< HEAD
The `ORCA Cleanup Plan` in bamboo has two stages named `Clean up ORCA buckets and modules` and `Clean up DR ORCA buckets` which can be run in sequence to remove most of the resources created by the deployment stages. Choose your feature branch and then run the pipeline. Remember to add the following AWS secrets keys for both Cumulus and DR accounts while running the pipeline.
=======
The `ORCA Cleanup Plan` has two stages named `Clean up ORCA buckets and modules` and `Clean up DR ORCA buckets` which can be run in sequence to remove most of the resources created by the deployment stages. Remember to add the following variables before running the pipeline.
>>>>>>> develop

- PREFIX
- CUMULUS_AWS_ACCESS_KEY_ID
- CUMULUS_AWS_SECRET_ACCESS_KEY
- DR_AWS_ACCESS_KEY_ID
- DR_AWS_SECRET_ACCESS_KEY
- CUMULUS_ORCA_DEPLOY_TEMPLATE_VERSION

State buckets and lock tables will be left intact to aid in any cleanup issues/debugging.
To verify cleanup, check the stage logs for errors, and [check the AWS environment for additional resources](https://docs.aws.amazon.com/ARG/latest/userguide/find-resources-to-tag.html) with the tag `Deployment=PREFIX`.