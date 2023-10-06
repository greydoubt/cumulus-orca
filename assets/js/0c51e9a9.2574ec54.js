"use strict";(self.webpackChunkorca_website=self.webpackChunkorca_website||[]).push([[9762],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>f});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),p=s(n),m=o,f=p["".concat(c,".").concat(m)]||p[m]||u[m]||a;return n?r.createElement(f,i(i({ref:t},d),{},{components:n})):r.createElement(f,i({ref:t},d))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[p]="string"==typeof e?e:o,i[1]=l;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7943:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>c,toc:()=>d});var r=n(7462),o=(n(7294),n(3905)),a=n(4996);const i={id:"best-practices",title:"Best Practices",description:"Best practices for coding in ORCA."},l=void 0,c={unversionedId:"developer/development-guide/code/best-practices",id:"developer/development-guide/code/best-practices",title:"Best Practices",description:"Best practices for coding in ORCA.",source:"@site/docs/developer/development-guide/code/best-practices.mdx",sourceDirName:"developer/development-guide/code",slug:"/developer/development-guide/code/best-practices",permalink:"/cumulus-orca/docs/developer/development-guide/code/best-practices",draft:!1,editUrl:"https://github.com/nasa/cumulus-orca/edit/develop/website/docs/developer/development-guide/code/best-practices.mdx",tags:[],version:"current",frontMatter:{id:"best-practices",title:"Best Practices",description:"Best practices for coding in ORCA."},sidebar:"dev_guide",previous:{title:"Setting Up a Dev Environment",permalink:"/cumulus-orca/docs/developer/development-guide/code/setup-dev-env"},next:{title:"Clean Architecture",permalink:"/cumulus-orca/docs/developer/development-guide/code/clean-architecture"}},s={},d=[{value:"Unit Testing",id:"unit-testing",level:2},{value:"Code Style",id:"code-style",level:2},{value:"Stop on Failure",id:"stop-on-failure",level:2}],p={toc:d},u="wrapper";function m(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"unit-testing"},"Unit Testing"),(0,o.kt)("p",null,"All code should reach minimum 80% coverage through ",(0,o.kt)("a",{parentName:"p",href:"/cumulus-orca/docs/developer/development-guide/code/unit-tests"},"Unit Tests"),"."),(0,o.kt)("h2",{id:"code-style"},"Code Style"),(0,o.kt)("p",null,"We use the ",(0,o.kt)("a",{parentName:"p",href:"https://google.github.io/styleguide/pyguide.html"},"Google Style Guide")," for style elements such as documentation, titling, and structure.\nWe also recommend reviewing ",(0,o.kt)("a",{parentName:"p",href:"/cumulus-orca/docs/developer/development-guide/code/clean-architecture"},"Clean Architecture")),(0,o.kt)("h2",{id:"stop-on-failure"},"Stop on Failure"),(0,o.kt)("p",null,"Failures within ORCA break through to the Cumulus workflow they are a part of.\nTo this end, raising an error is preferred over catching the error and returning a null value or error message.\nThe code examples below exemplify this idea by showing how to raise an error using python in different contexts."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"try:\n    value = function(param)\nexcept requests_db.DatabaseError as err:\n    logging.error(err)\n    raise\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},'if not success:\n    logging.error(f"You may log additional information if desired. "\n                  f"param: {param}")\n    raise DescriptiveErrorType(f\'Error message to be raised info Cumulus workflow.\')\n')),(0,o.kt)("p",null,"Retries can then be configured in the workflow json if desired. See\n",(0,o.kt)("a",{parentName:"p",href:"https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html"},"documentation"),"\nand\n",(0,o.kt)("a",{parentName:"p",href:"https://aws.amazon.com/getting-started/hands-on/handle-serverless-application-errors-step-functions-lambda/"},"tutorials"),"\nfor more information.\nThe following snippet from the copy_to_archive lambda demonstrates usage of retries for a lambda in an ingest workflow.\n",(0,o.kt)("inlineCode",{parentName:"p"},"MaxAttempts")," is set to 6, meaning that it will run the function a maximum of 7 times before transitioning to the ",(0,o.kt)("inlineCode",{parentName:"p"},"WorkflowFailed")," state.\n",(0,o.kt)("inlineCode",{parentName:"p"},"IntervalSeconds")," determines how many seconds the workflow will sleep between retries.\nA ",(0,o.kt)("inlineCode",{parentName:"p"},"BackOffRate")," of 2 means that the ",(0,o.kt)("inlineCode",{parentName:"p"},"IntervalSeconds")," will be doubled on each failure beyond the first."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'"CopyToArchive": {\n  ...\n  "Type": "Task",\n  "Resource": "${copy_to_archive_task_arn}",\n  "Retry": [\n    {\n      "ErrorEquals": [\n        "Lambda.ServiceException",\n        "Lambda.AWSLambdaException",\n        "Lambda.SdkClientException"\n      ],\n      "IntervalSeconds": 2,\n      "MaxAttempts": 6,\n      "BackoffRate": 2\n    }\n  ],\n  "Catch": [\n    {\n      "ErrorEquals": [\n        "States.ALL"\n      ],\n      "ResultPath": "$.exception",\n      "Next": "WorkflowFailed"\n    }\n  ],\n  "Next": "WorkflowSucceeded"\n},\n')),(0,o.kt)("p",null,"If the retries are exceeded and the error is caught, then the workflow will show that it jumped to the ",(0,o.kt)("inlineCode",{parentName:"p"},"WorkflowFailed")," state."),(0,o.kt)("img",{alt:"Workflow Failed",src:(0,a.Z)("img/Workflow Failed.png")}),(0,o.kt)("p",null,"If the 'WorkflowFailed' state was not triggered, then the workflow will move on to the step defined in ",(0,o.kt)("inlineCode",{parentName:"p"},"Next"),"."),(0,o.kt)("img",{alt:"Workflow Succeeded",src:(0,a.Z)("img/Workflow Succeeded.png")}),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("p",{parentName:"admonition"},"In the event that an error may be transient, and failing would cause a large amount of redundant work for other objects, retrying a failing operation in code is acceptable with a strictly limited number of retries.\nYou will likely want to log each individual error for analytics and debugging.")))}m.isMDXComponent=!0}}]);