"use strict";(self.webpackChunkorca_website=self.webpackChunkorca_website||[]).push([[3586],{3905:function(e,r,t){t.d(r,{Zo:function(){return s},kt:function(){return f}});var o=t(7294);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r){if(null==e)return{};var t,o,n=function(e,r){if(null==e)return{};var t,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var p=o.createContext({}),u=function(e){var r=o.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},s=function(e){var r=u(e.components);return o.createElement(p.Provider,{value:r},e.children)},l={inlineCode:"code",wrapper:function(e){var r=e.children;return o.createElement(o.Fragment,{},r)}},d=o.forwardRef((function(e,r){var t=e.components,n=e.mdxType,a=e.originalType,p=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),d=u(t),f=n,m=d["".concat(p,".").concat(f)]||d[f]||l[f]||a;return t?o.createElement(m,i(i({ref:r},s),{},{components:t})):o.createElement(m,i({ref:r},s))}));function f(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var a=t.length,i=new Array(a);i[0]=d;var c={};for(var p in r)hasOwnProperty.call(r,p)&&(c[p]=r[p]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var u=2;u<a;u++)i[u]=t[u];return o.createElement.apply(null,i)}return o.createElement.apply(null,t)}d.displayName="MDXCreateElement"},21:function(e,r,t){t.r(r),t.d(r,{frontMatter:function(){return c},contentTitle:function(){return p},metadata:function(){return u},toc:function(){return s},default:function(){return d}});var o=t(7462),n=t(3366),a=(t(7294),t(3905)),i=["components"],c={id:"operator-intro",title:"Operator Introduction",description:"Provides ORCA documentation for Operators and Data Managers."},p=void 0,u={unversionedId:"operator/operator-intro",id:"operator/operator-intro",title:"Operator Introduction",description:"Provides ORCA documentation for Operators and Data Managers.",source:"@site/docs/operator/operator-intro.md",sourceDirName:"operator",slug:"/operator/operator-intro",permalink:"/cumulus-orca/docs/operator/operator-intro",editUrl:"https://github.com/nasa/cumulus-orca/edit/develop/website/docs/operator/operator-intro.md",tags:[],version:"current",frontMatter:{id:"operator-intro",title:"Operator Introduction",description:"Provides ORCA documentation for Operators and Data Managers."},sidebar:"ops_guide",next:{title:"Data Recovery",permalink:"/cumulus-orca/docs/operator/data-recovery"}},s=[{value:"Purpose",id:"purpose",children:[],level:2},{value:"What Is an Operator",id:"what-is-an-operator",children:[],level:2}],l={toc:s};function d(e){var r=e.components,t=(0,n.Z)(e,i);return(0,a.kt)("wrapper",(0,o.Z)({},l,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"purpose"},"Purpose"),(0,a.kt)("p",null,"Operator Docs are an augmentation to Cumulus documentation and Data\nCookbooks. These documents will walk step-by-step through common ORCA\nactivities."),(0,a.kt)("h2",{id:"what-is-an-operator"},"What Is an Operator"),(0,a.kt)("p",null,"ORCA operators are those whose work includes restoring data and configuring\ncollections. Operators may perform the following functions via the operator\ndashboard:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"* Configure collections\n* Monitor workflow executions\n* Monitor data recovery\n* Monitor system metrics\n")))}d.isMDXComponent=!0}}]);