"use strict";(self.webpackChunkorca_website=self.webpackChunkorca_website||[]).push([[6615,2083],{1932:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>c,default:()=>p,frontMatter:()=>s,metadata:()=>m,toc:()=>u});var o=a(7462),i=(a(7294),a(3905)),n=a(4079),r=a(4996);const s={id:"architecture-database-container",title:"Database Container Architecture",description:"ORCA database schema information."},c=void 0,m={unversionedId:"about/architecture/architecture-database-container",id:"about/architecture/architecture-database-container",title:"Database Container Architecture",description:"ORCA database schema information.",source:"@site/docs/about/architecture/architecture-database-container.mdx",sourceDirName:"about/architecture",slug:"/about/architecture/architecture-database-container",permalink:"/cumulus-orca/docs/about/architecture/architecture-database-container",draft:!1,editUrl:"https://github.com/nasa/cumulus-orca/edit/develop/website/docs/about/architecture/architecture-database-container.mdx",tags:[],version:"current",frontMatter:{id:"architecture-database-container",title:"Database Container Architecture",description:"ORCA database schema information."},sidebar:"about_orca",previous:{title:"API Container Architecture",permalink:"/cumulus-orca/docs/about/architecture/architecture-api-container"},next:{title:"ORCA Team",permalink:"/cumulus-orca/docs/about/team"}},d={},u=[],l={toc:u},h="wrapper";function p(e){let{components:t,...a}=e;return(0,i.kt)(h,(0,o.Z)({},l,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"ORCA utilizes a PostgreSQL compatible database instance in AWS. The ORCA database\nis used to order to track and manage the status of a recovery in a typical recover\ndata workflow and to maintain a catalog of ORCA data stored in the S3\narchive. The diagram below provides details on the tables and the services that\naccess them. The data within the ORCA Recovery Status tables is considered transient\nand is typically no longer useful after a recovery has reached completion in a\nsuccessful state. The data within the ORCA Metadata Catalog tables points to the\nlatest version of the data stored in ORCA and provides a files association to a\ngranule, collection, and provider objects information. The ORCA Metadata Catalog\ntables data are also used by ORCA services to perform vital ORCA data management\nfunctions like reconciliation. The Schema Version Tracking table is used internally\nby ORCA to know if any schema migrations are needed for the ORCA code to function\nand provides an audit record of the installed ORCA schema."),(0,i.kt)(n.default,{imageSource:(0,r.Z)("img/ORCA-Architecture-Database-Container-Component.svg"),imageAlt:"ORCA Database Container Context",zoomInPic:(0,r.Z)("img/zoom-in.svg"),zoomOutPic:(0,r.Z)("img/zoom-out.svg"),resetPic:(0,r.Z)("img/zoom-pan-reset.svg"),mdxType:"MyImage"}))}p.isMDXComponent=!0},4079:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>c,default:()=>p,frontMatter:()=>s,metadata:()=>m,toc:()=>u});var o=a(7462),i=a(7294),n=a(3905),r=a(6126);const s={},c=void 0,m={unversionedId:"templates/pan-zoom-image",id:"templates/pan-zoom-image",title:"pan-zoom-image",description:"The image below can be panned and zoomed using your mouse or the provided buttons.",source:"@site/docs/templates/pan-zoom-image.mdx",sourceDirName:"templates",slug:"/templates/pan-zoom-image",permalink:"/cumulus-orca/docs/templates/pan-zoom-image",draft:!1,editUrl:"https://github.com/nasa/cumulus-orca/edit/develop/website/docs/templates/pan-zoom-image.mdx",tags:[],version:"current",frontMatter:{}},d={},u=[],l={toc:u},h="wrapper";function p(e){let{components:t,...a}=e;return(0,n.kt)(h,(0,o.Z)({},l,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("admonition",{title:"Interactive Image",type:"note"},(0,n.kt)("p",{parentName:"admonition"},"The image below can be panned and zoomed using your mouse or the provided buttons.\nTo reset the image to the original size on the page click ",(0,n.kt)("img",{width:"12px",height:"12px",src:a.resetPic,alt:"Reset Image"}),".\nIf you wish to view the full image on a separate page, click this ",(0,n.kt)("a",{href:a.imageSource,target:"_blank",rel:"noopener noreferrer"},"link"),".")),(0,n.kt)(r.d$,{defaultScale:1,mdxType:"TransformWrapper"},(e=>{let{zoomIn:t,zoomOut:o,resetTransform:s,...c}=e;return(0,n.kt)(i.Fragment,null,(0,n.kt)("div",{className:"tools"},(0,n.kt)("button",{onClick:()=>t()},(0,n.kt)("img",{width:"15px",height:"15px",src:a.zoomInPic,alt:"Zoom In"})),(0,n.kt)("button",{onClick:()=>o()},(0,n.kt)("img",{width:"15px",height:"15px",src:a.zoomOutPic,alt:"Zoom Out"})),(0,n.kt)("button",{onClick:()=>s()},(0,n.kt)("img",{width:"15px",height:"15px",src:a.resetPic,alt:"Reset Image"}))),(0,n.kt)(r.Uv,{mdxType:"TransformComponent"},(0,n.kt)("img",{src:a.imageSource,alt:a.imageAlt})))})))}p.isMDXComponent=!0}}]);