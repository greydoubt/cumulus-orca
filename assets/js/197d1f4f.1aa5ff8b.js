"use strict";(self.webpackChunkorca_website=self.webpackChunkorca_website||[]).push([[7023],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>g});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=p(n),d=r,g=u["".concat(l,".").concat(d)]||u[d]||m[d]||s;return n?a.createElement(g,o(o({ref:t},c),{},{components:n})):a.createElement(g,o({ref:t},c))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,o=new Array(s);o[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[u]="string"==typeof e?e:r,o[1]=i;for(var p=2;p<s;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7311:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>s,metadata:()=>i,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const s={id:"unit-tests",title:"Unit Tests",description:"Instructions on running unit tests."},o=void 0,i={unversionedId:"developer/development-guide/code/unit-tests",id:"developer/development-guide/code/unit-tests",title:"Unit Tests",description:"Instructions on running unit tests.",source:"@site/docs/developer/development-guide/code/unit-tests.md",sourceDirName:"developer/development-guide/code",slug:"/developer/development-guide/code/unit-tests",permalink:"/cumulus-orca/docs/developer/development-guide/code/unit-tests",draft:!1,editUrl:"https://github.com/nasa/cumulus-orca/edit/develop/website/docs/developer/development-guide/code/unit-tests.md",tags:[],version:"current",frontMatter:{id:"unit-tests",title:"Unit Tests",description:"Instructions on running unit tests."},sidebar:"dev_guide",previous:{title:"Local Debugging with AWS Resources",permalink:"/cumulus-orca/docs/developer/development-guide/code/local-debugging"},next:{title:"Integration Tests",permalink:"/cumulus-orca/docs/developer/development-guide/code/integration-tests"}},l={},p=[{value:"Running Unit Tests and Coverage Checks",id:"running-unit-tests-and-coverage-checks",level:2},{value:"Writing Unit Tests",id:"writing-unit-tests",level:2},{value:"Unit Test Standards and Tips",id:"unit-test-standards-and-tips",level:3}],c={toc:p},u="wrapper";function m(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"Run through the steps in ",(0,r.kt)("a",{parentName:"p",href:"/cumulus-orca/docs/developer/development-guide/code/setup-dev-env"},"Setting Up a Dev Environment")," prior to modifying/testing code.")),(0,r.kt)("h2",{id:"running-unit-tests-and-coverage-checks"},"Running Unit Tests and Coverage Checks"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Navigate to the task's base folder.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Activate the virtual environment.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Run"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-commandline"},"coverage run --source [name of lambda] -m pytest\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Output the coverage results to the file system by running"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-commandline"},"coverage html\n")))),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"For error-free running of postgres tests, see ",(0,r.kt)("a",{parentName:"p",href:"postgres-tests"},"Postgres Tests"),".")),(0,r.kt)("h2",{id:"writing-unit-tests"},"Writing Unit Tests"),(0,r.kt)("p",null,"Any written code should have a minimum of 80% ",(0,r.kt)("a",{parentName:"p",href:"#coverage"},"coverage"),", with higher coverage ideal.\nThis is a requirement for any new code, and will apply retroactively to old code as we have time to create/update tests."),(0,r.kt)("p",null,"As described above, we use ",(0,r.kt)("a",{parentName:"p",href:"https://docs.pytest.org/en/stable/"},"pytest")," for running unit tests.\nIf pytest reports new or existing tests failing, then this must be resolved before a PR can be completed."),(0,r.kt)("p",null,"Familiarize yourself with ",(0,r.kt)("a",{parentName:"p",href:"https://docs.python.org/3/library/unittest.mock.html"},"Mock and Patch")," as they are vital for testing components in isolation."),(0,r.kt)("h3",{id:"unit-test-standards-and-tips"},"Unit Test Standards and Tips"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Title your testing class with the format"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-python"},"class Test[class name](unittest.TestCase):\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Test a single piece of functionality at a time, such as a single path through a function.\nThis will make tests more valuable as diagnostic tools.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Title tests with the format"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-python"},"def test_[function name]_[conditions]_[expected result](self):\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Avoid using assignments to mock functions and objects."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-python"},"class.func = Mock() # This is dangerous\n")),(0,r.kt)("p",{parentName:"li"},"These Mocks will persist between tests, potentially causing failures at best, and false-positives at worst.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Create mocks using ",(0,r.kt)("a",{parentName:"p",href:"https://docs.python.org/3/library/unittest.mock.html#patch"},"patch")),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-python"},"@patch('class.first_func')\n@patch('class.second_func')\ndef test_name(self,\n              second_func_mock: MagicMock,\n              first_func_mock: MagicMock):\n")),(0,r.kt)("admonition",{parentName:"li",type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Decorators reverse in order when passed to parameters.")),(0,r.kt)("admonition",{parentName:"li",type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"You can assign Mocks to Mock properties without your Mocks persisting between tests.\nThese Mocks will persist for the duration of the test, then will be removed."),(0,r.kt)("pre",{parentName:"admonition"},(0,r.kt)("code",{parentName:"pre",className:"language-python"},"func_mock = Mock()\nclass_mock.func = func_mock # This is fine\n")))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Tests should ",(0,r.kt)("a",{parentName:"p",href:"https://docs.python.org/3/library/unittest.mock.html#unittest.mock.Mock.assert_called"},"assert")," any effects that go outside the test's scope.\nDepending on the size of your test, this could be"),(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Calls to external classes"),(0,r.kt)("li",{parentName:"ul"},"Calls within the class to different functions"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Tests should ",(0,r.kt)("a",{parentName:"p",href:"https://docs.python.org/3/library/unittest.mock.html#unittest.mock.Mock.assert_called"},"assert")," that affects you DO NOT expect do not occur.\nFor example, if 2/3 values in an array are passed through to another function then your test should assert that only the two values in question were passed.\nSimilarly, if the conditions in your test bypass an external effect, Mock that effect and make sure it is not called.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Generally speaking, any Mock you create should have at least one ",(0,r.kt)("a",{parentName:"p",href:"https://docs.python.org/3/library/unittest.mock.html#unittest.mock.Mock.assert_called"},"assert")," statement.\nThe main exception is logging messages, particularly verbose or debug messages.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"A different group of ",(0,r.kt)("a",{parentName:"p",href:"https://docs.python.org/3/library/unittest.html#unittest.TestCase.assertEqual"},"asserts")," are used to check raw values, such as the return value of the function under test."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-python"},'self.assertEqual(expected_result, result, "Message to be displayed when assert fails.")\n')))))}m.isMDXComponent=!0}}]);