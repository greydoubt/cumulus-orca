"use strict";(self.webpackChunkorca_website=self.webpackChunkorca_website||[]).push([[511],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>y});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(r),m=o,y=d["".concat(s,".").concat(m)]||d[m]||u[m]||a;return r?n.createElement(y,i(i({ref:t},p),{},{components:r})):n.createElement(y,i({ref:t},p))}));function y(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},6487:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var n=r(7462),o=(r(7294),r(3905));const a={id:"deployment-s3-credentials",title:"Generating S3 credentials",description:"Provides developer with information on archive storage solutions."},i=void 0,l={unversionedId:"developer/deployment-guide/deployment-s3-credentials",id:"developer/deployment-guide/deployment-s3-credentials",title:"Generating S3 credentials",description:"Provides developer with information on archive storage solutions.",source:"@site/docs/developer/deployment-guide/s3-credentials.md",sourceDirName:"developer/deployment-guide",slug:"/developer/deployment-guide/deployment-s3-credentials",permalink:"/cumulus-orca/docs/developer/deployment-guide/deployment-s3-credentials",draft:!1,editUrl:"https://github.com/nasa/cumulus-orca/edit/develop/website/docs/developer/deployment-guide/s3-credentials.md",tags:[],version:"current",frontMatter:{id:"deployment-s3-credentials",title:"Generating S3 credentials",description:"Provides developer with information on archive storage solutions."},sidebar:"dev_guide",previous:{title:"Creating the Archive Bucket",permalink:"/cumulus-orca/docs/developer/deployment-guide/deployment-s3-bucket"},next:{title:"Deploying ORCA with Cumulus",permalink:"/cumulus-orca/docs/developer/deployment-guide/deployment-with-cumulus"}},s={},c=[],p={toc:c},d="wrapper";function u(e){let{components:t,...r}=e;return(0,o.kt)(d,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Postgres requires access to the ",(0,o.kt)("a",{parentName:"p",href:"/cumulus-orca/docs/developer/deployment-guide/deployment-s3-bucket#reports-bucket"},"ORCA Reports bucket")," to pull in s3 inventory information.\nThese values are stored in the ",(0,o.kt)("a",{parentName:"p",href:"/cumulus-orca/docs/developer/deployment-guide/deployment-with-cumulus#orca-required-variables"},"Required Variables")," ",(0,o.kt)("inlineCode",{parentName:"p"},"s3_access_key")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"s3_secret_key"),".\nNote that this only impacts ",(0,o.kt)("a",{parentName:"p",href:"/cumulus-orca/docs/developer/api/#internal-reconcile-report-jobs-api"},"Internal Reconciliation reports"),", which is not required for ingest or recovery, but is helpful for verifying data integrity.\nIf you are unable to follow these instructions, or wish to avoid generating/managing credentials, blank values may be used and the impact will be isolated to Internal Reconciliation."),(0,o.kt)("p",null,"To generate an access key:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Connect to the NASA VPN."),(0,o.kt)("li",{parentName:"ol"},"Go to ",(0,o.kt)("a",{parentName:"li",href:"https://cloud.earthdata.nasa.gov/portal/project"},"https://cloud.earthdata.nasa.gov/portal/project")),(0,o.kt)("li",{parentName:"ol"},"Click the account containing your ORCA Reports bucket"),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("inlineCode",{parentName:"li"},"CLOUD MANAGEMENT")," -> ",(0,o.kt)("inlineCode",{parentName:"li"},"AWS Long-Term Access Keys")),(0,o.kt)("li",{parentName:"ol"},"Under the revealed ",(0,o.kt)("inlineCode",{parentName:"li"},"AWS Long-Term Access Keys")," sections, click the three dots, followed by ",(0,o.kt)("inlineCode",{parentName:"li"},"Create AWS long-term access keys")),(0,o.kt)("li",{parentName:"ol"},"Select an account and role that can access the bucket"),(0,o.kt)("li",{parentName:"ol"},"Click ",(0,o.kt)("inlineCode",{parentName:"li"},"Generate API Key")),(0,o.kt)("li",{parentName:"ol"},"Make sure to copy the secret value from this screen. This is your ",(0,o.kt)("inlineCode",{parentName:"li"},"s3_secret_key"),". The ",(0,o.kt)("inlineCode",{parentName:"li"},"Key ID")," is your ",(0,o.kt)("inlineCode",{parentName:"li"},"s3_access_key")),(0,o.kt)("li",{parentName:"ol"},"Note that these keys will eventually expire and will need to be regenerated and redeployed")),(0,o.kt)("p",null,"We are looking into alternatives to this system to remove these manual steps and eliminate the need for manual redeployment of expired keys.\nOnce Cumulus updates their RDS instance (or we decouple) IAM roles may be an option. Details in ",(0,o.kt)("a",{parentName:"p",href:"https://bugs.earthdata.nasa.gov/browse/ORCA-667"},"backlog card"),"."))}u.isMDXComponent=!0}}]);