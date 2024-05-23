"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4699],{38647:function(e,l,a){var t=a(33968),n=a(20251),i=a(10904);let s=(0,a(47713).getCookie)("lang");t.ZP.use(i.Z).use(n.Db).init({lng:s,fallbackLng:"ki",backend:{loadPath:"/locales/{{lng}}/{{ns}}.json"},react:{useSuspense:!0}}),l.Z=t.ZP},44584:function(e,l,a){var t=a(57437),n=a(82157),i=a(10519),s=a(16691),r=a.n(s),o=a(2265),d=a(85686),c=a(60227);l.Z=e=>{var l,a;let{profile:s,leader:u}=e,m=(0,n.uE)(null!==(l=null==u?void 0:u.organizationLevel)&&void 0!==l?l:""),[h,v]=(0,o.useState)(!1);return(0,t.jsxs)("div",{className:"w-full h-[250px] rounded-lg flex flex-col items-center gap-2 bg-white justify-start px-3",children:[(0,t.jsx)(r(),{src:s.imageUrl,width:100,height:100,alt:"",className:"w-[50%] h-[50%] mt-3 rounded-lg bg-center items-center self-center align-center"}),(0,t.jsx)("h6",{className:"text-left w-full font-extrabold text-black",children:null!==(a=null==s?void 0:s.username)&&void 0!==a?a:"Name Not Set"}),(0,t.jsxs)("h6",{className:"text-left text-[90%] w-full font-extrabold text-black flex gap-3 items-center",children:[(0,t.jsx)(d.Lqe,{size:13}),m]}),(0,t.jsxs)("h6",{className:"text-left text-[90%] w-full font-extrabold text-black flex gap-3 mt-[-0.5rem] items-center",children:[(0,t.jsx)(c.OxZ,{size:13}),s.district+" - "+s.sector+" - "+s.cell]}),(0,t.jsxs)("div",{className:"w-full flex justify-between items-center",children:[(0,t.jsx)("button",{type:"button",className:"text-[80%] self-start bg-[#0075FF] rounded-md py-2 px-3 text-white",children:"Message"}),(0,t.jsx)("button",{type:"button",className:"text-[80%] self-start bg-[#20603D] rounded-md py-2 px-4 text-white",onClick:()=>{v(!0)},children:"Profile"})]}),(0,t.jsxs)(i.u,{opened:h,onClose:()=>v(!1),size:"lg",children:[(0,t.jsx)("h3",{className:"text-center text-[#20603D] font-bold my-4 text-xl",children:"Leader's profile"}),(0,t.jsxs)("div",{className:"w-full h-full flex flex-col gap-4 pb-5 pl-5",children:[(0,t.jsx)(r(),{src:s.imageUrl,width:50,height:50,alt:"",className:"w-[30%] h-[30%] rounded-lg bg-center items-center self-center align-center"}),(0,t.jsxs)("h6",{className:"mt-[10px]",children:[(0,t.jsx)("span",{className:"font-extrabold text-md",children:"Name:"})," ",null==s?void 0:s.realName]}),(0,t.jsxs)("h6",{className:"mt-[10px]",children:[(0,t.jsx)("span",{className:"text-md font-extrabold",children:" National ID:"})," ",null==s?void 0:s.username]}),(0,t.jsxs)("h6",{className:"mt-[10px]",children:[(0,t.jsx)("span",{className:"text-md font-extrabold",children:" Phone Number:"})," ",null==s?void 0:s.phone]}),(0,t.jsxs)("h6",{className:"mt-[10px]",children:[(0,t.jsx)("span",{className:"text-md font-extrabold",children:" Role :"})," ",m]}),(0,t.jsxs)("h6",{className:"mt-[10px]",children:[(0,t.jsx)("span",{className:"font-extrabold text-md",children:"Location :"})," ",s.district+" - "+s.sector+" - "+s.cell]}),(0,t.jsx)("p",{children:(0,t.jsx)("span",{className:"font-extrabold font-italic text-justify"})})]})]})]})}},57374:function(e,l,a){var t=a(57437),n=a(2265),i=a(64267),s=a(61396),r=a.n(s),o=a(16691),d=a.n(o),c=a(72027),u=a(86655),m=a(60236),h=a(20577),v=a(26743),x=a(51696),f=a(53159),g=a(53771),p=a(5925),b=a(47713);l.Z=e=>{var l,a,s,o;let{close:N}=e,[j,A]=(0,n.useState)(""),[w,U]=(0,n.useState)(""),[y,I]=(0,n.useState)(""),[k,S]=(0,n.useState)(""),[C,R]=(0,n.useState)(""),[_,E]=(0,n.useState)(""),[L,B]=(0,n.useState)(""),[O,P]=(0,n.useState)(""),[M,z]=(0,n.useState)([]),[Z,D]=(0,n.useState)(""),[F,G]=(0,n.useState)(""),[Y,q]=(0,n.useState)(""),[T,J]=(0,n.useState)(""),[W,K]=(0,n.useState)(!1),[$,Q]=(0,n.useState)(""),[H,V]=(0,n.useState)(!1);(0,n.useEffect)(()=>{let{token:e}=(0,b.getCookies)();if(e){let l=(0,g.o)(e);if(Q(l.role),"ADMIN"===l.role){D("INTARA");let e=(0,v.Rb)();z([...new Set(e)])}else"UMUYOBOZI"===l.role?c.N$.get("/leaders/my_profile").then(e=>{var l,a;let t=null==e?void 0:null===(a=e.data)||void 0===a?void 0:null===(l=a.data)||void 0===l?void 0:l.leader;if(t){let{organizationLevel:e,location:l}=t;D(e),J(l),console.log(e),console.log(l);let a=[];switch(e){case"INTARA":a=(0,v.Ww)(l);break;case"AKARERE":a=(0,v.jB)(l);break;case"UMURENGE":a=(0,v.n1)(l);break;case"AKAGARI":a=(0,v.Bm)(l);break;case"UMUDUGUDU":p.ZP.error("You are not allowed to perform this action")}z([...new Set(a)])}}).catch(e=>{console.error("Error fetching UMUYOBOZI data:",e)}):p.ZP.error("You are not allowed to perform this action")}},[]);let X=async e=>{let l=e.target.value;try{let e=await c.N$.post("users/get_user_by_national_id",{nationalId:l});if(console.log("API response:",e),null==e?void 0:e.data){var a,t,n,i,s,r,o,d,u,m,h,v,x,f,g,p,b,N,j,w,y,k,C,_,L,O;(null==e?void 0:null===(t=e.data)||void 0===t?void 0:null===(a=t.data)||void 0===a?void 0:a.role)==="UMUTURAGE"?(console.log("I'm umuturage"),I(l),A(null===(r=e.data)||void 0===r?void 0:null===(s=r.data)||void 0===s?void 0:s.phone),B(null==e?void 0:null===(d=e.data)||void 0===d?void 0:null===(o=d.data)||void 0===o?void 0:o.cell),R(null==e?void 0:null===(m=e.data)||void 0===m?void 0:null===(u=m.data)||void 0===u?void 0:u.district),U(null==e?void 0:null===(v=e.data)||void 0===v?void 0:null===(h=v.data)||void 0===h?void 0:h.realName),S(null==e?void 0:null===(x=e.data)||void 0===x?void 0:x.data.province),E(null==e?void 0:null===(f=e.data)||void 0===f?void 0:f.data.sector),P(null==e?void 0:null===(g=e.data)||void 0===g?void 0:g.data.village)):(null==e?void 0:null===(i=e.data)||void 0===i?void 0:null===(n=i.data)||void 0===n?void 0:n.role)==="UMUYOBOZI"?(console.log("Already a leader, let's update"),I(l),A(null===(b=e.data)||void 0===b?void 0:null===(p=b.data)||void 0===p?void 0:p.phone),B(null==e?void 0:null===(j=e.data)||void 0===j?void 0:null===(N=j.data)||void 0===N?void 0:N.cell),R(null==e?void 0:null===(y=e.data)||void 0===y?void 0:null===(w=y.data)||void 0===w?void 0:w.district),U(null==e?void 0:null===(C=e.data)||void 0===C?void 0:null===(k=C.data)||void 0===k?void 0:k.realName),S(null==e?void 0:null===(_=e.data)||void 0===_?void 0:_.data.province),E(null==e?void 0:null===(L=e.data)||void 0===L?void 0:L.data.sector),P(null==e?void 0:null===(O=e.data)||void 0===O?void 0:O.data.village)):(console.log("Do not have an account"),I(l),V(!0))}else console.log("No user found with the provided national ID")}catch(e){console.log("An error occurred",e)}finally{K(!1)}},ee=async e=>{e.preventDefault(),K(!0),c.N$.post("/leaders/addLeader",{category:F,cell:L,district:C,location:T,name:w,nationalId:y,organizationLevel:Z,phoneNumber:j,province:k,role:Y,sector:_,village:O}).then(e=>{u.N9.show({title:"Assign Leader",message:"Leader Assigned successfully!",autoClose:5e3,icon:(0,t.jsx)(f.wO,{})}),K(!1),G(""),q(""),J(""),N()}).catch(e=>{p.ZP.error(e.message),console.log(e),K(!1)}).finally(()=>K(!1))};return(0,t.jsxs)("div",{className:"bg-white rounded-xl h-full w-full mt-[-2rem]",children:[(0,t.jsx)("div",{className:"flex justify-center cursor-pointer",children:(0,t.jsx)(r(),{href:"/",children:(0,t.jsx)(d(),{src:i.default,alt:"Logo",width:40,height:40,className:"mt-8"})})}),(0,t.jsx)("h3",{className:"text-[#001833] font-bold text-2xl text-center",children:"Register Leader"}),(0,t.jsx)("div",{className:"w-full flex-col flex justify-center items-center",children:(0,t.jsxs)("form",{onSubmit:ee,className:"w-full flex flex-col gap-5 justify-center md:px-10 px-6 pt-4",children:[(0,t.jsx)("div",{className:"main_input",children:(0,t.jsxs)("div",{className:"flex-col flex-1",children:[(0,t.jsx)("label",{htmlFor:"nationalId",className:"font-bold",children:"National ID"}),(0,t.jsx)("input",{type:"text",name:"nationalId",placeholder:"123456789123457",className:"sub_input rounded-lg px-3",required:!0,onChange:X})]})}),(0,t.jsx)("div",{className:"main_input",children:(0,t.jsxs)("div",{className:"flex-col flex-1",children:[(0,t.jsx)("label",{htmlFor:"organisationLevel",className:"font-bold",children:"Organisation Level"}),(0,t.jsx)("input",{type:"text",name:"organisationLevel",placeholder:"Akagari",value:Z,className:"sub_input rounded-lg px-3",required:!0,disabled:!0})]})}),(0,t.jsx)("div",{className:"main_input",children:(0,t.jsxs)("div",{className:"flex-col flex-1",children:[(0,t.jsx)("label",{htmlFor:"category",className:"font-bold",children:"Categories"}),(0,t.jsx)(m.P,{data:h.bd,value:F,onChange:G})]})}),(0,t.jsx)("div",{className:"main_input",children:(0,t.jsxs)("div",{className:"flex-col flex-1",children:[(0,t.jsx)("label",{htmlFor:"role",className:"font-bold",children:"Role"}),(0,t.jsx)(m.P,{data:h.rH,value:Y,onChange:q})]})}),(0,t.jsx)("div",{className:"main_input",children:(0,t.jsxs)("div",{className:"flex-col flex-1",children:[(0,t.jsx)("label",{htmlFor:"location",className:"font-bold",children:"Location"}),(0,t.jsx)(m.P,{data:M,value:T,onChange:J})]})}),H&&(0,t.jsxs)("div",{children:[(0,t.jsx)("h2",{className:"",children:"The user has no account in Rangurura so you will have to fill in additional information"}),(0,t.jsx)("div",{className:"main_input",children:(0,t.jsxs)("div",{className:"flex-col flex-1",children:[(0,t.jsx)("label",{htmlFor:"name",className:"font-bold",children:"Phone number"}),(0,t.jsx)("input",{type:"text",name:"name",placeholder:"Isamaza Sylvin",className:"sub_input rounded-lg px-3",required:!0,onChange:e=>U(e.target.value)})]})}),(0,t.jsx)("div",{className:"main_input",children:(0,t.jsxs)("div",{className:"flex-col flex-1",children:[(0,t.jsx)("label",{htmlFor:"phone",className:"font-bold",children:"Phone number"}),(0,t.jsx)("input",{type:"number",name:"phone",placeholder:"+250788006677",className:"sub_input rounded-lg px-3",required:!0,onChange:e=>A(e.target.value)})]})}),(0,t.jsx)("div",{className:"main_input",children:(0,t.jsxs)("div",{className:"flex-col flex-1 ",children:[(0,t.jsx)("label",{htmlFor:"intara",children:"Province"}),(0,t.jsx)("select",{name:"province",id:"intara",className:"sub_input",onChange:e=>S(e.target.value),required:!0,children:(0,v.Rb)().map(e=>(0,t.jsx)("option",{value:e,children:e}))})]})}),(0,t.jsx)("div",{className:"main_input",children:(0,t.jsxs)("div",{className:"flex-col flex-1 ",children:[(0,t.jsx)("label",{htmlFor:"akarere",children:"District"}),(0,t.jsx)("select",{name:"district",id:"akarere",className:"sub_input",onChange:e=>R(e.target.value),required:!0,children:null===(l=(0,v.Ww)(k))||void 0===l?void 0:l.map(e=>(0,t.jsx)("option",{value:e,children:e}))})]})}),(0,t.jsx)("div",{className:"main_input",children:(0,t.jsxs)("div",{className:"flex-col flex-1 ",children:[(0,t.jsx)("label",{htmlFor:"umurenge",children:"Sector"}),(0,t.jsx)("select",{name:"sector",id:"umurenge",className:"sub_input",onChange:e=>E(e.target.value),required:!0,children:null===(a=(0,v.jB)(k,C))||void 0===a?void 0:a.map(e=>(0,t.jsx)("option",{value:e,children:e}))})]})}),(0,t.jsx)("div",{className:"main_input",children:(0,t.jsxs)("div",{className:"flex-col flex-1 ",children:[(0,t.jsx)("label",{htmlFor:"akagari",children:"Cell"}),(0,t.jsx)("select",{name:"cell",id:"akagari",className:"sub_input",onChange:e=>B(e.target.value),required:!0,children:null===(s=(0,v.n1)(k,C,_))||void 0===s?void 0:s.map(e=>(0,t.jsx)("option",{value:e,children:e}))})]})}),(0,t.jsx)("div",{className:"main_input",children:(0,t.jsxs)("div",{className:"flex-col flex-1 ",children:[(0,t.jsx)("label",{htmlFor:"umudugudu",children:"Villages"}),(0,t.jsx)("select",{name:"village",id:"umudugudu",className:"sub_input",onChange:e=>P(e.target.value),required:!0,children:null===(o=(0,v.Bm)(k,C,_,L))||void 0===o?void 0:o.map(e=>(0,t.jsx)("option",{value:e,children:e}))})]})})]}),(0,t.jsx)("div",{className:"flex items-center justify-center",children:(0,t.jsx)("button",{type:"submit",className:"btn_primary py-2 rounded-md px-10 text-white",children:W?(0,t.jsx)("div",{className:"w-full h-full flex items-center justify-center",children:(0,t.jsx)(x.Z,{size:20,color:"white"})}):"Grant"})})]})})]})}},20577:function(e,l,a){a.d(l,{Cx:function(){return i},DA:function(){return s},_J:function(){return t},bd:function(){return n},rH:function(){return r}});let t=[{label:"Akagari",value:"AKAGARI"},{label:"Umurenge",value:"UMURENGE"},{label:"Akarere",value:"AKARERE"},{label:"Intara",value:"INTARA"}],n=[{label:"Ubuzima",value:"UBUZIMA"},{label:"Uburezi",value:"UBUREZI"},{label:"Imibereho Myiza",value:"IMIBEREHOMYIZA"},{label:"Imyidagaduro",value:"IMYIDAGADURO"},{label:"Umurekano",value:"UMUTEKANO"},{label:"Ubutaka",value:"UBUTAKA"}];JSON.stringify({name:"David NYIRINGABO",phoneNumber:"0788460119"}),JSON.stringify({name:"Anne UHIRIWE",phoneNumber:"0783457998"}),JSON.stringify({name:"MUGABO Peter ",phoneNumber:"0783475989"});let i=[{label:"Urwego Rw'Ibanze",value:"Urwego Rw'Ibanze"},{label:"Ikigo cya Leta",value:"Ikigo cya Leta"}],s=[{label:"POLICE",value:"POLICE"},{label:"RIB",value:"RIB"},{label:"RGB",value:"RGB"},{label:"MINISANTE",value:"MINISANTE"}],r=[{label:"Umuyobozi mukuru",value:" UMUYOBOZI_MUKURU"},{label:"Umuyobozi w'uburezi",value:" UMUYOBOZI_W_UBUREZI"}]},82157:function(e,l,a){a.d(l,{B2:function(){return i},US:function(){return n},uE:function(){return s}}),a(47713),a(38647);var t=a(72027);let n=async()=>(await t.N$.get("/users/me")).data,i=async()=>(await t.N$.get("/leaders/all")).data,s=e=>{switch(null==e?void 0:e.toLowerCase()){case"district":return"Mayor";case"intara":return"Governor";case"umurenge":return"Executive Secretary of Sector";case"akagari":return"Executive Secretary of Cell";default:return"No Role Set"}}},64267:function(e,l,a){a.r(l),l.default={src:"/_next/static/media/logo-dark (1).dd93cfad.png",height:66,width:68,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAl0lEQVR42k3PoQrCUBjF8aNBzGLzCUzCvQaLTUQwLuhrKILV5BP4Er6EYBezTW0mm6gr25/tDDb4sbOz73L5JAVhijsyu2Gi8gmJyyvmUkzwdLeQFL64SP0G7zWW0oAcX+SPPLmj6KC6Yoxt8U14IMUQJw9tsMJbFCPCHxl+8t3YYyZv0WPw4NNntMldbxFbtVWP/il3zRxRyC10qeQ2VQAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:8}},79330:function(e,l){l.Z={src:"/_next/static/media/no_leader.f978616f.gif",height:102,width:150,blurWidth:0,blurHeight:0}},22444:function(e,l,a){a.d(l,{q:function(){return n}});var t=a(2265);function n(e=!1,l){let{onOpen:a,onClose:n}=l||{},[i,s]=(0,t.useState)(e),r=(0,t.useCallback)(()=>{s(e=>e||(a?.(),!0))},[a]),o=(0,t.useCallback)(()=>{s(e=>e?(n?.(),!1):e)},[n]),d=(0,t.useCallback)(()=>{i?o():r()},[o,r,i]);return[i,{open:r,close:o,toggle:d}]}},53771:function(e,l,a){a.d(l,{o:function(){return n}});class t extends Error{}function n(e,l){let a;if("string"!=typeof e)throw new t("Invalid token specified: must be a string");l||(l={});let n=!0===l.header?0:1,i=e.split(".")[n];if("string"!=typeof i)throw new t(`Invalid token specified: missing part #${n+1}`);try{a=function(e){let l=e.replace(/-/g,"+").replace(/_/g,"/");switch(l.length%4){case 0:break;case 2:l+="==";break;case 3:l+="=";break;default:throw Error("base64 string is not of the correct length")}try{var a;return a=l,decodeURIComponent(atob(a).replace(/(.)/g,(e,l)=>{let a=l.charCodeAt(0).toString(16).toUpperCase();return a.length<2&&(a="0"+a),"%"+a}))}catch(e){return atob(l)}}(i)}catch(e){throw new t(`Invalid token specified: invalid base64 for part #${n+1} (${e.message})`)}try{return JSON.parse(a)}catch(e){throw new t(`Invalid token specified: invalid json for part #${n+1} (${e.message})`)}}t.prototype.name="InvalidTokenError"}}]);