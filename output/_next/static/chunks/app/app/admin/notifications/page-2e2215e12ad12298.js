(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8927],{35206:function(e,t,s){Promise.resolve().then(s.bind(s,48695))},48695:function(e,t,s){"use strict";s.r(t);var l=s(57437),a=s(72027),r=s(58910),n=s(2265);t.default=()=>{let[e,t]=(0,n.useState)(a.N9),s=e=>{t(t=>t.map(t=>t.id===e?{...t,read:!0}:t))};return(0,l.jsx)("div",{className:"w-full h-[90%] flex items-center justify-between mt-4",children:(0,l.jsxs)("div",{className:"w-full h-full",children:[(0,l.jsxs)("div",{className:"w-full flex items-center justify-between",children:[(0,l.jsx)("h1",{className:"text-[1.5rem] font-extrabold",children:"Notifications"}),(0,l.jsxs)("button",{type:"button",className:"text-[90%] bg-gradient-to-r from-gray-400 to-gray-300 flex items-center gap-2 text-white font-bold py-2 px-4 rounded-md",onClick:()=>{t(e.map(e=>({...e,read:!0})))},children:[(0,l.jsx)(r.LHg,{}),"Mark All As Read"]})]}),(0,l.jsx)("div",{className:"w-full h-[90%] overflow-y-auto my-4 nofications-container",children:e.map((e,t)=>(0,l.jsxs)("div",{className:"w-[99%] px-2 py-3 border-l-5 rounded-r-lg ".concat(e.read?"bg-[#e5eef9] border-l-[#8a8c8a5b]":"bg-white border-l-[#00FF00]"," my-2"),children:[(0,l.jsxs)("header",{className:"w-full flex justify-between pb-2",children:[(0,l.jsx)("h4",{className:"text-[80%]",children:e.title}),(0,l.jsxs)("h6",{className:"text-[80%]",children:[e.date," at ",e.time]})]}),(0,l.jsxs)("p",{className:"text-[90%] relative w-full",children:[e.description,!e.read&&(0,l.jsxs)("button",{onClick:()=>s(e.id),className:"p-2 text-[80%] rounded-xl absolute right-0 bottom-[-0.5rem] bg-gradient-to-tl from-gray-500  to-gray-200 hover:from-blue-500  flex items-center gap-2",children:[(0,l.jsx)(r.LHg,{}),"Mark as Read"]})]})]},t))})]})})}}},function(e){e.O(0,[1582,5812,2173,2027,2971,4938,1744],function(){return e(e.s=35206)}),_N_E=e.O()}]);