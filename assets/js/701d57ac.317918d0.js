"use strict";(self.webpackChunkorca_website=self.webpackChunkorca_website||[]).push([[8695],{3905:function(e,t,a){a.d(t,{Zo:function(){return c},kt:function(){return d}});var n=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var l=n.createContext({}),u=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},c=function(e){var t=u(e.components);return n.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),m=u(a),d=o,b=m["".concat(l,".").concat(d)]||m[d]||p[d]||r;return a?n.createElement(b,s(s({ref:t},c),{},{components:a})):n.createElement(b,s({ref:t},c))}));function d(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=a.length,s=new Array(r);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:o,s[1]=i;for(var u=2;u<r;u++)s[u]=a[u];return n.createElement.apply(null,s)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},4720:function(e,t,a){a.r(t),a.d(t,{assets:function(){return c},contentTitle:function(){return l},default:function(){return d},frontMatter:function(){return i},metadata:function(){return u},toc:function(){return p}});var n=a(7462),o=a(3366),r=(a(7294),a(3905)),s=["components"],i={id:"research-bamboo-integration-tests",title:"Research Notes on running integration tests in bamboo CI/CD.",description:"Research Notes on deploying Cumulus and ORCA in bamboo CI/CD and running integration tests."},l=void 0,u={unversionedId:"developer/research/research-bamboo-integration-tests",id:"developer/research/research-bamboo-integration-tests",title:"Research Notes on running integration tests in bamboo CI/CD.",description:"Research Notes on deploying Cumulus and ORCA in bamboo CI/CD and running integration tests.",source:"@site/docs/developer/research/research-bamboo-integration-tests.md",sourceDirName:"developer/research",slug:"/developer/research/research-bamboo-integration-tests",permalink:"/cumulus-orca/docs/developer/research/research-bamboo-integration-tests",draft:!1,editUrl:"https://github.com/nasa/cumulus-orca/edit/develop/website/docs/developer/research/research-bamboo-integration-tests.md",tags:[],version:"current",frontMatter:{id:"research-bamboo-integration-tests",title:"Research Notes on running integration tests in bamboo CI/CD.",description:"Research Notes on deploying Cumulus and ORCA in bamboo CI/CD and running integration tests."},sidebar:"dev_guide",previous:{title:"Research Notes on ORCA delete functionality.",permalink:"/cumulus-orca/docs/developer/research/research-orca-delete-functionality"},next:{title:"Using Lambda functions as container research Notes",permalink:"/cumulus-orca/docs/developer/research/research-lambda-container"}},c={},p=[{value:"Deploying terraform modules via bamboo",id:"deploying-terraform-modules-via-bamboo",level:2},{value:"Future directions",id:"future-directions",level:2},{value:"References",id:"references",level:5}],m={toc:p};function d(e){var t=e.components,a=(0,o.Z)(e,s);return(0,r.kt)("wrapper",(0,n.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"deploying-terraform-modules-via-bamboo"},"Deploying terraform modules via bamboo"),(0,r.kt)("p",null,"AWS resources can be deployed via Bamboo pipeline by first adding the following to a script and running that in a Bamboo task."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"#configure aws\nexport AWS_ACCESS_KEY_ID=$bamboo_AWS_ACCESS_KEY_ID\nexport AWS_SECRET_ACCESS_KEY=$bamboo_AWS_SECRET_ACCESS_KEY\nexport AWS_DEFAULT_REGION=$bamboo_AWS_DEFAULT_REGION\n")),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"In order to use a user-defined bamboo environment variable inside a script, ",(0,r.kt)("inlineCode",{parentName:"p"},"$bamboo_")," must be added as a prefix to the variable. For example, use ",(0,r.kt)("inlineCode",{parentName:"p"},"$bamboo_AWS_DEFAULT_REGION")," in your script to use the variable AWS_DEFAULT_REGION."))),(0,r.kt)("p",null,"Details of some of the initial work done are added in the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/nasa/cumulus-orca/tree/feature/ORCA-test-bamboo"},"ORCA-test-bamboo")," branch of ",(0,r.kt)("inlineCode",{parentName:"p"},"cumulus-orca")," repo.\nThe ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/nasa/cumulus-orca/blob/feature/ORCA-test-bamboo/bamboo-specs/bamboo.yaml#L22"},"bamboo spec file")," has been modified to add two new stages named ",(0,r.kt)("inlineCode",{parentName:"p"},"Deploy Dev RDS Stack")," stage which deploys the RDS cluster in sandbox and the ",(0,r.kt)("inlineCode",{parentName:"p"},"Deploy Dev Cumulus and ORCA Stack")," stage which deploys the data persistence module as well as cumulus and orca modules. The stages in bamboo spec are shown below."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"#deploy RDS cluster for integration test\n- Deploy Dev RDS Stack:\n    manual: true\n    final: false\n    jobs:\n    - Deploy RDS cluster\n\n#deploy orca and cumulus for integration test\n- Deploy Dev Cumulus and ORCA Stack:\n    manual: true\n    final: false\n    jobs:\n    - Deploy cumulus and orca\n")),(0,r.kt)("p",null,"The ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/nasa/cumulus-orca/blob/feature/ORCA-test-bamboo/bin/deployment-rds.sh"},(0,r.kt)("inlineCode",{parentName:"a"},"deployment-rds.sh"))," script is an initial working script that was used to deploy the RDS cluster. The ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/nasa/cumulus-orca/blob/feature/ORCA-test-bamboo/bin/deployment-cumulus-orca.sh"},(0,r.kt)("inlineCode",{parentName:"a"},"deployment-cumulus-orca.sh"))," script was used to deploy the data-persistence-tf module. Some changes still need to be made in these scripts to make it more functional and handle errors. A successful bamboo build can be seen ",(0,r.kt)("a",{parentName:"p",href:"https://ci.earthdata.nasa.gov/browse/ORCA-PP-108"},"here"),".\nA snippet of the script to deploy RDS cluster via terraform is shown below."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'# Deploy drds-cluster-tf via terraform\necho "Deploying rds-cluster-tf  module to $bamboo_DEPLOYMENT"\nterraform apply \\\n  -auto-approve \\\n  -lock=false \\\n  -input=false \\\n  -var-file="terraform.tfvars" \\\n  -var "prefix=$bamboo_PREFIX" \\\n  -var "region=$bamboo_AWS_DEFAULT_REGION" \\\n  -var "subnets=[\\"$bamboo_AWS_SUBNET_ID1\\", \\"$bamboo_AWS_SUBNET_ID2\\"]" \\\n  -var "db_admin_username=$bamboo_DB_ADMIN_USERNAME" \\\n  -var "db_admin_password=$bamboo_DB_ADMIN_PASSWORD" \\\n  -var "vpc_id=$bamboo_VPC_ID" \\\n  -var "cluster_identifier=$bamboo_RDS_CLUSTER_ID" \\\n  -var "deletion_protection=false"\\\n  -var "provision_user_database=false"\\\n  -var "engine_version=10.14"\\\n  -var "permissions_boundary_arn=arn:aws:iam::$bamboo_AWS_ACCOUNT_ID:policy/$bamboo_ROLE_BOUNDARY"\n')),(0,r.kt)("p",null,"Variables in terraform.tfvars can be overwritten by the ",(0,r.kt)("inlineCode",{parentName:"p"},"-var")," field as seen above. "),(0,r.kt)("p",null,"Some of the sensitive bamboo variables such as ",(0,r.kt)("inlineCode",{parentName:"p"},"AWS_ACCESS_KEY_ID"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"AWS_SECRET_ACCESS_KEY"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"RDS_USER_ACCESS_SECRET_ARN")," have been encrypted using bamboo encryption service. While running the pipeline, those variables have to be replaced manually with the real values since bamboo does not automatically decrypt the values while running the pipeline. Make sure all sensitive variables are encrypted before pushing the changes to the repo. "),(0,r.kt)("p",null,"The bamboo spec for running the two scripts under tasks is shown below."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"#job for deploying cumulus and orca\nDeploy RDS cluster:\n  key: DRC\n  other:\n    clean-working-dir: true\n    # Some plugin configurations are not supported by YAML Specs\n  docker:\n    image: amazonlinux:2\n    volumes:\n      ${bamboo.working.directory}: ${bamboo.working.directory}\n      ${bamboo.tmp.directory}: ${bamboo.tmp.directory}\n  tasks:\n  - checkout:\n      force-clean-build: 'true'\n      description: Checkout Default Repository\n\n  - script:\n      interpreter: SHELL\n      scripts:\n      - |-\n        #!/bin/bash\n        chmod +x bin/deployment-rds.sh\n        bin/deployment-rds.sh\n#job for deploying cumulus and orca\nDeploy cumulus and orca:\n  key: DCO\n  other:\n    clean-working-dir: true\n    # Some plugin configurations are not supported by YAML Specs\n  docker:\n    image: amazonlinux:2\n    volumes:\n      ${bamboo.working.directory}: ${bamboo.working.directory}\n      ${bamboo.tmp.directory}: ${bamboo.tmp.directory}\n  tasks:\n  - checkout:\n      force-clean-build: 'true'\n      description: Checkout Default Repository\n\n  - script:\n      interpreter: SHELL\n      scripts:\n      - |-\n        #!/bin/bash\n        chmod +x bin/deployment-cumulus-orca.sh\n        bin/deployment-cumulus-orca.sh\n")),(0,r.kt)("h2",{id:"future-directions"},"Future directions"),(0,r.kt)("p",null,"The first step will be to finish deploying all cumulus tf modules via Bamboo into sandbox account. Once that is completed, automation scripts for running the integrations tests need to be created. The original plan ",(0,r.kt)("inlineCode",{parentName:"p"},"ORCA Integrator")," in bamboo will need to be updated with the same changes made in ",(0,r.kt)("inlineCode",{parentName:"p"},"prototype-demo")," plan's ",(0,r.kt)("inlineCode",{parentName:"p"},"feature/ORCA-test-bamboo")," branch so that the ",(0,r.kt)("inlineCode",{parentName:"p"},"develop")," branch is updated. In addition, older resources should be deleted from AWS once tests are validated. "),(0,r.kt)("p",null,"The details of the DockerFile as well as the scripts currently used by GHRC to deploy their repository to Bamboo CI/CD can be found ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/ghrcdaac/GHRC-TF-CICD"},"here")," which will be useful to look into later on. Moreover, the environment variables in bamboo can be exported using env files to better manage terraform variables needed for deployment. See ",(0,r.kt)("a",{parentName:"p",href:"https://bugs.earthdata.nasa.gov/browse/ORCA-393"},"ORCA-393")," for more information on this."),(0,r.kt)("p",null,"Some of the cards created to finish the task include:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://bugs.earthdata.nasa.gov/browse/ORCA-388-"},"https://bugs.earthdata.nasa.gov/browse/ORCA-388-")," Create Docker image for running ORCA integration tests"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://bugs.earthdata.nasa.gov/browse/ORCA-389-"},"https://bugs.earthdata.nasa.gov/browse/ORCA-389-")," Finish up the remaining work on deploying cumulus-tf module in bamboo. Update ORCA-integrator plan in bamboo."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://bugs.earthdata.nasa.gov/browse/ORCA-390-"},"https://bugs.earthdata.nasa.gov/browse/ORCA-390-")," Cleanup deployment of old integration test files/resources from bamboo"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://bugs.earthdata.nasa.gov/browse/ORCA-391-"},"https://bugs.earthdata.nasa.gov/browse/ORCA-391-")," Research and create a list of integration tests needed for ORCA once all tf modules are deployed and successful"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://bugs.earthdata.nasa.gov/browse/ORCA-392-"},"https://bugs.earthdata.nasa.gov/browse/ORCA-392-")," Create the actual integration test scripts for bamboo."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://bugs.earthdata.nasa.gov/browse/ORCA-393-"},"https://bugs.earthdata.nasa.gov/browse/ORCA-393-")," Convert bamboo env variables to a script.")),(0,r.kt)("h5",{id:"references"},"References"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/nasa/cumulus/tree/master/bamboo"},"https://github.com/nasa/cumulus/tree/master/bamboo")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/nasa/cumulus/blob/master/bamboo/bootstrap-tf-deployment.sh"},"https://github.com/nasa/cumulus/blob/master/bamboo/bootstrap-tf-deployment.sh")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/ghrcdaac/GHRC-TF-CICD"},"https://github.com/ghrcdaac/GHRC-TF-CICD")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://eosdis.slack.com/archives/C76M787MZ/p1646247174655179"},"https://eosdis.slack.com/archives/C76M787MZ/p1646247174655179")," (chat history with cumulus on some of the issues faced during deployment)")))}d.isMDXComponent=!0}}]);