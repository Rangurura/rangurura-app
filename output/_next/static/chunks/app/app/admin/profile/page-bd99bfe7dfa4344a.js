(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1963],{34078:function(e,t,n){Promise.resolve().then(n.bind(n,46864))},67447:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{unstable_getImgProps:function(){return s},default:function(){return u}});let l=n(70817),i=n(38630),a=n(76184),r=n(81749),o=l._(n(10536)),s=e=>{(0,a.warnOnce)("Warning: unstable_getImgProps() is experimental and may change or be removed at any time. Use at your own risk.");let{props:t}=(0,i.getImgProps)(e,{defaultLoader:o.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[e,n]of Object.entries(t))void 0===n&&delete t[e];return{props:t}},u=r.Image},46864:function(e,t,n){"use strict";n.r(t);var l=n(57437),i=n(2265),a=n(16691),r=n.n(a),o=n(58910),s=n(61060),u=n(66097),c=n(72027),d=n(86655),m=n(53159),f=n(40311),p=n(51696);t.default=()=>{let[e,t]=(0,i.useState)(null),[n,a]=(0,i.useState)(""),[h,v]=(0,i.useState)(!1),{data:x,loading:g}=(0,u.X)({src:"/users/me"}),{profile:b}=x;(0,i.useEffect)(()=>{if(!g&&x){var e,t,n,l,i,r,o,s,u;console.log(x),N({cell:(null==x?void 0:null===(e=x.data)||void 0===e?void 0:e.cell)||"",district:(null==x?void 0:null===(t=x.data)||void 0===t?void 0:t.district)||"",name:(null==x?void 0:null===(n=x.data)||void 0===n?void 0:n.name)||"",nationalId:(null==x?void 0:null===(l=x.data)||void 0===l?void 0:l.nationalId)||"",phoneNumber:(null==x?void 0:null===(i=x.data)||void 0===i?void 0:i.phoneNumber)||"",province:(null==x?void 0:null===(r=x.data)||void 0===r?void 0:r.province)||"",sector:(null==x?void 0:null===(o=x.data)||void 0===o?void 0:o.sector)||"",village:(null==x?void 0:null===(s=x.data)||void 0===s?void 0:s.village)||""}),a((null==x?void 0:null===(u=x.data)||void 0===u?void 0:u.imageUrl)||"")}},[x,g]);let[j,N]=(0,i.useState)({cell:"",district:"",name:"",nationalId:"",phoneNumber:"",province:"",sector:"",village:""}),y=e=>{let{name:t,value:n}=e.target;N(e=>({...e,[t]:n}))};return(0,l.jsxs)("div",{className:"bg-white w-full h-[90%] mt-5 rounded-2xl pb-20 float-center",children:[(0,l.jsx)("div",{className:"title text-center",children:(0,l.jsx)("h2",{className:"text-2xl font-bold py-4 text-center",children:"Hindura Umwirondoro"})}),(0,l.jsxs)("div",{className:"lg:flex md:flex block lg:ml-16 mx-10 lg:mx-0 mt-3",children:[n&&(null==n?void 0:n.length)>0&&null==e?(0,l.jsx)(r(),{src:n,alt:"upload",id:"profile",className:" w-4/12 h-64 rounded-2xl bg-contain",width:"270",height:"100"}):e?(0,l.jsx)(r(),{src:e,alt:"upload",id:"profile",className:" w-4/12 h-64 rounded-2xl bg-contain",width:"270",height:"100"}):(0,l.jsx)(r(),{src:s.Z,alt:"upload"}),(0,l.jsxs)("div",{className:"lg:ml-20 ml-10 w-56 lg:space-y-6",children:[(0,l.jsx)("h1",{className:"text-xl font-bold mt-16",children:"Hindura ifoto"}),(0,l.jsxs)("label",{htmlFor:"profile_b",className:" flex bg-[#20603D] py-2 rounded-md px-10 text-white",children:[(0,l.jsx)(o.hU2,{className:"w-4 m-1"}),"Change photo"]}),(0,l.jsx)("input",{type:"file",id:"profile_b",style:{display:"none"},accept:"image/*",onChange:e=>{var n;let l=null===(n=e.target.files)||void 0===n?void 0:n[0];if(l){let e=new FileReader;e.onload=()=>{t(e.result)},e.readAsDataURL(l)}}})]})]}),(0,l.jsxs)("form",{className:"w-full flex flex-col gap-y- justify-center ml-6 md:px-10 px-10 pt-6",onSubmit:t=>{t.preventDefault(),v(!0);let n=encodeURIComponent(JSON.stringify(j)),i=new FormData;i.append("profile",e),c.N$.post("/users/updateprofile".concat("?details=".concat(n)),i).then(e=>{v(!1),d.N9.show({title:"Edit Profile",message:"Successfully Edited Profile!",autoClose:5e3,icon:(0,l.jsx)(m.wO,{})})}).catch(e=>{v(!1),d.N9.show({title:"Edit Profile",message:"Error occurred when editing profile!",color:"#FF555D",autoClose:5e3,icon:(0,l.jsx)(f.toq,{})})})},children:[(0,l.jsxs)("div",{className:"main_input",children:[(0,l.jsxs)("div",{className:"flex-col flex-1",children:[(0,l.jsx)("label",{htmlFor:"amazina",children:"Amazina"}),(0,l.jsx)("input",{type:"text",className:"sub_input ",placeholder:"Isamaza sylvain",id:"amazina",name:"name",value:j.name,onChange:y})]}),(0,l.jsxs)("div",{className:"flex-col flex-1",children:[(0,l.jsx)("label",{htmlFor:"numero_indangamuntu",children:"Numero y'indangamuntu"}),(0,l.jsx)("input",{type:"text",className:"sub_input ",placeholder:"2345678",id:"nationalId",value:j.nationalId,onChange:y})]})]}),(0,l.jsxs)("div",{className:"main_input",children:[(0,l.jsxs)("div",{className:"flex-col flex-1 ",children:[(0,l.jsx)("label",{htmlFor:"numero_telefone",children:"Numero ya telefone"}),(0,l.jsx)("input",{type:"text",className:"sub_input ",placeholder:"Isamaza sylvain",id:"numero_telefone",name:"phoneNumber",value:j.phoneNumber,onChange:y})]}),(0,l.jsxs)("div",{className:"flex-col flex-1 ",children:[(0,l.jsx)("label",{htmlFor:"intara",children:"Intara"}),(0,l.jsx)("input",{name:"province",id:"intara",className:"sub_input ",value:j.province,onChange:y})]})]}),(0,l.jsxs)("div",{className:"main_input",children:[(0,l.jsxs)("div",{className:"flex-col flex-1 ",children:[(0,l.jsx)("label",{htmlFor:"akarere",children:"Akarere"}),(0,l.jsx)("input",{name:"district",id:"akarere",className:"sub_input ",value:j.district,onChange:y})]}),(0,l.jsxs)("div",{className:"flex-col flex-1 ",children:[(0,l.jsx)("label",{htmlFor:"umurenge",children:"Umurenge"}),(0,l.jsx)("input",{name:"sector",id:"umurenge",className:"sub_input ",value:j.sector,onChange:y})]})]}),(0,l.jsxs)("div",{className:"main_input",children:[(0,l.jsxs)("div",{className:"flex-col flex-1 ",children:[(0,l.jsx)("label",{htmlFor:"akagari",children:"Akagari"}),(0,l.jsx)("input",{name:"cell",id:"akagari",className:"sub_input ",value:j.cell,onChange:y})]}),(0,l.jsxs)("div",{className:"flex-col flex-1 ",children:[(0,l.jsx)("label",{htmlFor:"umudugudu",children:"Umudugudu"}),(0,l.jsx)("input",{name:"village",id:"umudugudu",className:"sub_input ",value:j.village,onChange:y})]})]}),(0,l.jsx)("div",{className:"flex items-center justify-center mt-10",children:(0,l.jsx)("button",{type:"submit",className:"bg-[#20603D] text-white p-2 px-10 rounded-md",children:h?(0,l.jsx)("div",{className:"w-full h-full flex justify-center items-center",children:(0,l.jsx)(p.Z,{size:18,color:"white"})}):"Update profile"})})]})]})}},66097:function(e,t,n){"use strict";n.d(t,{X:function(){return a}});var l=n(72027),i=n(2265);let a=e=>{let{src:t}=e,[n,a]=i.useState([]),[r,o]=i.useState(!0),[s,u]=i.useState(""),[c,d]=i.useState(!1);return i.useEffect(()=>{l.N$.get(t).then(e=>{console.log(e.data),a(e.data)}).catch(e=>{console.log(e),d(!0),u(e.message)}).finally(()=>o(!1))},[]),{data:n,setData:a,loading:r,setLoading:o,error:s,setError:u}}},16691:function(e,t,n){e.exports=n(67447)},51696:function(e,t,n){"use strict";n.d(t,{Z:function(){return u}});var l=n(2265),i={cm:!0,mm:!0,in:!0,px:!0,pt:!0,pc:!0,em:!0,ex:!0,ch:!0,rem:!0,vw:!0,vh:!0,vmin:!0,vmax:!0,"%":!0};function a(e){var t=function(e){if("number"==typeof e)return{value:e,unit:"px"};var t,n=(e.match(/^[0-9.]*/)||"").toString();t=n.includes(".")?parseFloat(n):parseInt(n,10);var l=(e.match(/[^0-9]*$/)||"").toString();return i[l]?{value:t,unit:l}:(console.warn("React Spinners: ".concat(e," is not a valid css value. Defaulting to ").concat(t,"px.")),{value:t,unit:"px"})}(e);return"".concat(t.value).concat(t.unit)}var r=function(){return(r=Object.assign||function(e){for(var t,n=1,l=arguments.length;n<l;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},o=function(e,t){var n={};for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&0>t.indexOf(l)&&(n[l]=e[l]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,l=Object.getOwnPropertySymbols(e);i<l.length;i++)0>t.indexOf(l[i])&&Object.prototype.propertyIsEnumerable.call(e,l[i])&&(n[l[i]]=e[l[i]]);return n},s=function(e,t,n){var l="react-spinners-".concat(e,"-").concat(n);if("undefined"==typeof window||!window.document)return l;var i=document.createElement("style");document.head.appendChild(i);var a=i.sheet,r="\n    @keyframes ".concat(l," {\n      ").concat(t,"\n    }\n  ");return a&&a.insertRule(r,0),l}("ClipLoader","0% {transform: rotate(0deg) scale(1)} 50% {transform: rotate(180deg) scale(0.8)} 100% {transform: rotate(360deg) scale(1)}","clip"),u=function(e){var t=e.loading,n=e.color,i=void 0===n?"#000000":n,u=e.speedMultiplier,c=e.cssOverride,d=e.size,m=void 0===d?35:d,f=o(e,["loading","color","speedMultiplier","cssOverride","size"]),p=r({background:"transparent !important",width:a(m),height:a(m),borderRadius:"100%",border:"2px solid",borderTopColor:i,borderBottomColor:"transparent",borderLeftColor:i,borderRightColor:i,display:"inline-block",animation:"".concat(s," ").concat(.75/(void 0===u?1:u),"s 0s infinite linear"),animationFillMode:"both"},void 0===c?{}:c);return void 0===t||t?l.createElement("span",r({style:p},f)):null}},77499:function(e,t,n){"use strict";function l(){return`mantine-${Math.random().toString(36).slice(2,11)}`}n.d(t,{k:function(){return l}})},86655:function(e,t,n){"use strict";n.d(t,{N9:function(){return u},Ps:function(){return a},yK:function(){return s},zn:function(){return r}});var l=n(77499),i=n(57178);let a=(0,i.M)({notifications:[],queue:[],limit:5}),r=(e=a)=>(0,i.o)(e);function o(e,t){let n=e.getState(),l=t([...n.notifications,...n.queue]);e.setState({notifications:l.slice(0,n.limit),queue:l.slice(n.limit),limit:n.limit})}function s(e,t=a){return o(t,t=>t.filter(t=>t.id!==e||(t.onClose?.(t),!1))),e}let u={show:function(e,t=a){let n=e.id||(0,l.k)();return o(t,t=>e.id&&t.some(t=>t.id===e.id)?t:[...t,{...e,id:n}]),n},hide:s,update:function(e,t=a){return o(t,t=>t.map(t=>t.id===e.id?{...t,...e}:t)),e.id},clean:function(e=a){o(e,()=>[])},cleanQueue:function(e=a){o(e,t=>t.slice(0,e.getState().limit))},updateState:o}},57178:function(e,t,n){"use strict";n.d(t,{M:function(){return i},o:function(){return a}});var l=n(2265);function i(e){let t=e,n=!1,l=new Set;return{getState:()=>t,updateState(e){t="function"==typeof e?e(t):e},setState(e){this.updateState(e),l.forEach(e=>e(t))},initialize(e){n||(t=e,n=!0)},subscribe:e=>(l.add(e),()=>l.delete(e))}}function a(e){return(0,l.useSyncExternalStore)(e.subscribe,()=>e.getState(),()=>e.getState())}}},function(e){e.O(0,[2420,1582,1787,5812,1749,2173,2027,2971,4938,1744],function(){return e(e.s=34078)}),_N_E=e.O()}]);