import{r as f,R as h,j as o,L as me}from"./index-_saJSwc8.js";import{u as re}from"./useTranslation-hp8AIAw2.js";const xe="/assets/image-BGHUfekZ.webp",Ee="/assets/image-CzE0CHVg.webp",Te="/assets/site-CLZnKfcb.webp",Ne="/assets/forum-DLyqyfGv.webp",ke="/assets/result-B_U0M8KV.webp",Ce="/assets/digitalpuz-C2TPxAHn.webp",je="/assets/puzzle-aHJbCoRF.webp",te="/assets/puzzleforcom-Bg_29nn7.webp",we="/assets/image-y45fyKcu.svg";function fe(e){var t,s,a="";if(typeof e=="string"||typeof e=="number")a+=e;else if(typeof e=="object")if(Array.isArray(e)){var r=e.length;for(t=0;t<r;t++)e[t]&&(s=fe(e[t]))&&(a&&(a+=" "),a+=s)}else for(s in e)e[s]&&(a&&(a+=" "),a+=s);return a}function F(){for(var e,t,s=0,a="",r=arguments.length;s<r;s++)(e=arguments[s])&&(t=fe(e))&&(a&&(a+=" "),a+=t);return a}const J=e=>typeof e=="number"&&!isNaN(e),W=e=>typeof e=="string",S=e=>typeof e=="function",ne=e=>W(e)||S(e)?e:null,de=e=>f.isValidElement(e)||W(e)||S(e)||J(e);function Ie(e,t,s){s===void 0&&(s=300);const{scrollHeight:a,style:r}=e;requestAnimationFrame(()=>{r.minHeight="initial",r.height=a+"px",r.transition=`all ${s}ms`,requestAnimationFrame(()=>{r.height="0",r.padding="0",r.margin="0",setTimeout(t,s)})})}function ie(e){let{enter:t,exit:s,appendPosition:a=!1,collapse:r=!0,collapseDuration:c=300}=e;return function(n){let{children:b,position:m,preventExitTransition:k,done:g,nodeRef:E,isIn:N,playToast:C}=n;const y=a?`${t}--${m}`:t,p=a?`${s}--${m}`:s,x=f.useRef(0);return f.useLayoutEffect(()=>{const v=E.current,l=y.split(" "),i=u=>{u.target===E.current&&(C(),v.removeEventListener("animationend",i),v.removeEventListener("animationcancel",i),x.current===0&&u.type!=="animationcancel"&&v.classList.remove(...l))};v.classList.add(...l),v.addEventListener("animationend",i),v.addEventListener("animationcancel",i)},[]),f.useEffect(()=>{const v=E.current,l=()=>{v.removeEventListener("animationend",l),r?Ie(v,g,c):g()};N||(k?l():(x.current=1,v.className+=` ${p}`,v.addEventListener("animationend",l)))},[N]),h.createElement(h.Fragment,null,b)}}function pe(e,t){return e!=null?{content:e.content,containerId:e.props.containerId,id:e.props.toastId,theme:e.props.theme,type:e.props.type,data:e.props.data||{},isLoading:e.props.isLoading,icon:e.props.icon,status:t}:{}}const I=new Map;let Z=[];const ue=new Set,Le=e=>ue.forEach(t=>t(e)),he=()=>I.size>0;function ye(e,t){var s;if(t)return!((s=I.get(t))==null||!s.isToastActive(e));let a=!1;return I.forEach(r=>{r.isToastActive(e)&&(a=!0)}),a}function ve(e,t){de(e)&&(he()||Z.push({content:e,options:t}),I.forEach(s=>{s.buildToast(e,t)}))}function ge(e,t){I.forEach(s=>{t!=null&&t!=null&&t.containerId?(t==null?void 0:t.containerId)===s.id&&s.toggle(e,t==null?void 0:t.id):s.toggle(e,t==null?void 0:t.id)})}function Se(e){const{subscribe:t,getSnapshot:s,setProps:a}=f.useRef(function(c){const n=c.containerId||1;return{subscribe(b){const m=function(g,E,N){let C=1,y=0,p=[],x=[],v=[],l=E;const i=new Map,u=new Set,w=()=>{v=Array.from(i.values()),u.forEach(d=>d())},M=d=>{x=d==null?[]:x.filter(T=>T!==d),w()},j=d=>{const{toastId:T,onOpen:L,updateId:D,children:O}=d.props,X=D==null;d.staleId&&i.delete(d.staleId),i.set(T,d),x=[...x,d.props.toastId].filter(B=>B!==d.staleId),w(),N(pe(d,X?"added":"updated")),X&&S(L)&&L(f.isValidElement(O)&&O.props)};return{id:g,props:l,observe:d=>(u.add(d),()=>u.delete(d)),toggle:(d,T)=>{i.forEach(L=>{T!=null&&T!==L.props.toastId||S(L.toggle)&&L.toggle(d)})},removeToast:M,toasts:i,clearQueue:()=>{y-=p.length,p=[]},buildToast:(d,T)=>{if((A=>{let{containerId:z,toastId:$,updateId:P}=A;const V=z?z!==g:g!==1,K=i.has($)&&P==null;return V||K})(T))return;const{toastId:L,updateId:D,data:O,staleId:X,delay:B}=T,Q=()=>{M(L)},ee=D==null;ee&&y++;const R={...l,style:l.toastStyle,key:C++,...Object.fromEntries(Object.entries(T).filter(A=>{let[z,$]=A;return $!=null})),toastId:L,updateId:D,data:O,closeToast:Q,isIn:!1,className:ne(T.className||l.toastClassName),bodyClassName:ne(T.bodyClassName||l.bodyClassName),progressClassName:ne(T.progressClassName||l.progressClassName),autoClose:!T.isLoading&&(H=T.autoClose,Y=l.autoClose,H===!1||J(H)&&H>0?H:Y),deleteToast(){const A=i.get(L),{onClose:z,children:$}=A.props;S(z)&&z(f.isValidElement($)&&$.props),N(pe(A,"removed")),i.delete(L),y--,y<0&&(y=0),p.length>0?j(p.shift()):w()}};var H,Y;R.closeButton=l.closeButton,T.closeButton===!1||de(T.closeButton)?R.closeButton=T.closeButton:T.closeButton===!0&&(R.closeButton=!de(l.closeButton)||l.closeButton);let G=d;f.isValidElement(d)&&!W(d.type)?G=f.cloneElement(d,{closeToast:Q,toastProps:R,data:O}):S(d)&&(G=d({closeToast:Q,toastProps:R,data:O}));const q={content:G,props:R,staleId:X};l.limit&&l.limit>0&&y>l.limit&&ee?p.push(q):J(B)?setTimeout(()=>{j(q)},B):j(q)},setProps(d){l=d},setToggle:(d,T)=>{i.get(d).toggle=T},isToastActive:d=>x.some(T=>T===d),getSnapshot:()=>v}}(n,c,Le);I.set(n,m);const k=m.observe(b);return Z.forEach(g=>ve(g.content,g.options)),Z=[],()=>{k(),I.delete(n)}},setProps(b){var m;(m=I.get(n))==null||m.setProps(b)},getSnapshot(){var b;return(b=I.get(n))==null?void 0:b.getSnapshot()}}}(e)).current;a(e);const r=f.useSyncExternalStore(t,s,s);return{getToastToRender:function(c){if(!r)return[];const n=new Map;return e.newestOnTop&&r.reverse(),r.forEach(b=>{const{position:m}=b.props;n.has(m)||n.set(m,[]),n.get(m).push(b)}),Array.from(n,b=>c(b[0],b[1]))},isToastActive:ye,count:r==null?void 0:r.length}}function ze(e){const[t,s]=f.useState(!1),[a,r]=f.useState(!1),c=f.useRef(null),n=f.useRef({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:b,pauseOnHover:m,closeToast:k,onClick:g,closeOnClick:E}=e;var N,C;function y(){s(!0)}function p(){s(!1)}function x(i){const u=c.current;n.canDrag&&u&&(n.didMove=!0,t&&p(),n.delta=e.draggableDirection==="x"?i.clientX-n.start:i.clientY-n.start,n.start!==i.clientX&&(n.canCloseOnClick=!1),u.style.transform=`translate3d(${e.draggableDirection==="x"?`${n.delta}px, var(--y)`:`0, calc(${n.delta}px + var(--y))`},0)`,u.style.opacity=""+(1-Math.abs(n.delta/n.removalDistance)))}function v(){document.removeEventListener("pointermove",x),document.removeEventListener("pointerup",v);const i=c.current;if(n.canDrag&&n.didMove&&i){if(n.canDrag=!1,Math.abs(n.delta)>n.removalDistance)return r(!0),e.closeToast(),void e.collapseAll();i.style.transition="transform 0.2s, opacity 0.2s",i.style.removeProperty("transform"),i.style.removeProperty("opacity")}}(C=I.get((N={id:e.toastId,containerId:e.containerId,fn:s}).containerId||1))==null||C.setToggle(N.id,N.fn),f.useEffect(()=>{if(e.pauseOnFocusLoss)return document.hasFocus()||p(),window.addEventListener("focus",y),window.addEventListener("blur",p),()=>{window.removeEventListener("focus",y),window.removeEventListener("blur",p)}},[e.pauseOnFocusLoss]);const l={onPointerDown:function(i){if(e.draggable===!0||e.draggable===i.pointerType){n.didMove=!1,document.addEventListener("pointermove",x),document.addEventListener("pointerup",v);const u=c.current;n.canCloseOnClick=!0,n.canDrag=!0,u.style.transition="none",e.draggableDirection==="x"?(n.start=i.clientX,n.removalDistance=u.offsetWidth*(e.draggablePercent/100)):(n.start=i.clientY,n.removalDistance=u.offsetHeight*(e.draggablePercent===80?1.5*e.draggablePercent:e.draggablePercent)/100)}},onPointerUp:function(i){const{top:u,bottom:w,left:M,right:j}=c.current.getBoundingClientRect();i.nativeEvent.type!=="touchend"&&e.pauseOnHover&&i.clientX>=M&&i.clientX<=j&&i.clientY>=u&&i.clientY<=w?p():y()}};return b&&m&&(l.onMouseEnter=p,e.stacked||(l.onMouseLeave=y)),E&&(l.onClick=i=>{g&&g(i),n.canCloseOnClick&&k()}),{playToast:y,pauseToast:p,isRunning:t,preventExitTransition:a,toastRef:c,eventHandlers:l}}function $e(e){let{delay:t,isRunning:s,closeToast:a,type:r="default",hide:c,className:n,style:b,controlledProgress:m,progress:k,rtl:g,isIn:E,theme:N}=e;const C=c||m&&k===0,y={...b,animationDuration:`${t}ms`,animationPlayState:s?"running":"paused"};m&&(y.transform=`scaleX(${k})`);const p=F("Toastify__progress-bar",m?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${N}`,`Toastify__progress-bar--${r}`,{"Toastify__progress-bar--rtl":g}),x=S(n)?n({rtl:g,type:r,defaultClassName:p}):F(p,n),v={[m&&k>=1?"onTransitionEnd":"onAnimationEnd"]:m&&k<1?null:()=>{E&&a()}};return h.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":C},h.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${N} Toastify__progress-bar--${r}`}),h.createElement("div",{role:"progressbar","aria-hidden":C?"true":"false","aria-label":"notification timer",className:x,style:y,...v}))}let Ae=1;const _e=()=>""+Ae++;function Pe(e){return e&&(W(e.toastId)||J(e.toastId))?e.toastId:_e()}function U(e,t){return ve(e,t),t.toastId}function oe(e,t){return{...t,type:t&&t.type||e,toastId:Pe(t)}}function se(e){return(t,s)=>U(t,oe(e,s))}function _(e,t){return U(e,oe("default",t))}_.loading=(e,t)=>U(e,oe("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...t})),_.promise=function(e,t,s){let a,{pending:r,error:c,success:n}=t;r&&(a=W(r)?_.loading(r,s):_.loading(r.render,{...s,...r}));const b={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},m=(g,E,N)=>{if(E==null)return void _.dismiss(a);const C={type:g,...b,...s,data:N},y=W(E)?{render:E}:E;return a?_.update(a,{...C,...y}):_(y.render,{...C,...y}),N},k=S(e)?e():e;return k.then(g=>m("success",n,g)).catch(g=>m("error",c,g)),k},_.success=se("success"),_.info=se("info"),_.error=se("error"),_.warning=se("warning"),_.warn=_.warning,_.dark=(e,t)=>U(e,oe("default",{theme:"dark",...t})),_.dismiss=function(e){(function(t){var s;if(he()){if(t==null||W(s=t)||J(s))I.forEach(a=>{a.removeToast(t)});else if(t&&("containerId"in t||"id"in t)){const a=I.get(t.containerId);a?a.removeToast(t.id):I.forEach(r=>{r.removeToast(t.id)})}}else Z=Z.filter(a=>t!=null&&a.options.toastId!==t)})(e)},_.clearWaitingQueue=function(e){e===void 0&&(e={}),I.forEach(t=>{!t.props.limit||e.containerId&&t.id!==e.containerId||t.clearQueue()})},_.isActive=ye,_.update=function(e,t){t===void 0&&(t={});const s=((a,r)=>{var c;let{containerId:n}=r;return(c=I.get(n||1))==null?void 0:c.toasts.get(a)})(e,t);if(s){const{props:a,content:r}=s,c={delay:100,...a,...t,toastId:t.toastId||e,updateId:_e()};c.toastId!==e&&(c.staleId=e);const n=c.render||r;delete c.render,U(n,c)}},_.done=e=>{_.update(e,{progress:1})},_.onChange=function(e){return ue.add(e),()=>{ue.delete(e)}},_.play=e=>ge(!0,e),_.pause=e=>ge(!1,e);const Me=typeof window<"u"?f.useLayoutEffect:f.useEffect,ae=e=>{let{theme:t,type:s,isLoading:a,...r}=e;return h.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:t==="colored"?"currentColor":`var(--toastify-icon-color-${s})`,...r})},ce={info:function(e){return h.createElement(ae,{...e},h.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(e){return h.createElement(ae,{...e},h.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(e){return h.createElement(ae,{...e},h.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(e){return h.createElement(ae,{...e},h.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return h.createElement("div",{className:"Toastify__spinner"})}},De=e=>{const{isRunning:t,preventExitTransition:s,toastRef:a,eventHandlers:r,playToast:c}=ze(e),{closeButton:n,children:b,autoClose:m,onClick:k,type:g,hideProgressBar:E,closeToast:N,transition:C,position:y,className:p,style:x,bodyClassName:v,bodyStyle:l,progressClassName:i,progressStyle:u,updateId:w,role:M,progress:j,rtl:d,toastId:T,deleteToast:L,isIn:D,isLoading:O,closeOnClick:X,theme:B}=e,Q=F("Toastify__toast",`Toastify__toast-theme--${B}`,`Toastify__toast--${g}`,{"Toastify__toast--rtl":d},{"Toastify__toast--close-on-click":X}),ee=S(p)?p({rtl:d,position:y,type:g,defaultClassName:Q}):F(Q,p),R=function(q){let{theme:A,type:z,isLoading:$,icon:P}=q,V=null;const K={theme:A,type:z};return P===!1||(S(P)?V=P({...K,isLoading:$}):f.isValidElement(P)?V=f.cloneElement(P,K):$?V=ce.spinner():(be=>be in ce)(z)&&(V=ce[z](K))),V}(e),H=!!j||!m,Y={closeToast:N,type:g,theme:B};let G=null;return n===!1||(G=S(n)?n(Y):f.isValidElement(n)?f.cloneElement(n,Y):function(q){let{closeToast:A,theme:z,ariaLabel:$="close"}=q;return h.createElement("button",{className:`Toastify__close-button Toastify__close-button--${z}`,type:"button",onClick:P=>{P.stopPropagation(),A(P)},"aria-label":$},h.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},h.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}(Y)),h.createElement(C,{isIn:D,done:L,position:y,preventExitTransition:s,nodeRef:a,playToast:c},h.createElement("div",{id:T,onClick:k,"data-in":D,className:ee,...r,style:x,ref:a},h.createElement("div",{...D&&{role:M},className:S(v)?v({type:g}):F("Toastify__toast-body",v),style:l},R!=null&&h.createElement("div",{className:F("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!O})},R),h.createElement("div",null,b)),G,h.createElement($e,{...w&&!H?{key:`pb-${w}`}:{},rtl:d,theme:B,delay:m,isRunning:t,isIn:D,closeToast:N,hide:E,type:g,style:u,className:i,controlledProgress:H,progress:j||0})))},le=function(e,t){return t===void 0&&(t=!1),{enter:`Toastify--animate Toastify__${e}-enter`,exit:`Toastify--animate Toastify__${e}-exit`,appendPosition:t}},Re=ie(le("bounce",!0));ie(le("slide",!0));ie(le("zoom"));ie(le("flip"));const Oe={position:"top-right",transition:Re,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};function Be(e){let t={...Oe,...e};const s=e.stacked,[a,r]=f.useState(!0),c=f.useRef(null),{getToastToRender:n,isToastActive:b,count:m}=Se(t),{className:k,style:g,rtl:E,containerId:N}=t;function C(p){const x=F("Toastify__toast-container",`Toastify__toast-container--${p}`,{"Toastify__toast-container--rtl":E});return S(k)?k({position:p,rtl:E,defaultClassName:x}):F(x,ne(k))}function y(){s&&(r(!0),_.play())}return Me(()=>{if(s){var p;const x=c.current.querySelectorAll('[data-in="true"]'),v=12,l=(p=t.position)==null?void 0:p.includes("top");let i=0,u=0;Array.from(x).reverse().forEach((w,M)=>{const j=w;j.classList.add("Toastify__toast--stacked"),M>0&&(j.dataset.collapsed=`${a}`),j.dataset.pos||(j.dataset.pos=l?"top":"bot");const d=i*(a?.2:1)+(a?0:v*M);j.style.setProperty("--y",`${l?d:-1*d}px`),j.style.setProperty("--g",`${v}`),j.style.setProperty("--s",""+(1-(a?u:0))),i+=j.offsetHeight,u+=.025})}},[a,m,s]),h.createElement("div",{ref:c,className:"Toastify",id:N,onMouseEnter:()=>{s&&(r(!1),_.pause())},onMouseLeave:y},n((p,x)=>{const v=x.length?{...g}:{...g,pointerEvents:"none"};return h.createElement("div",{className:C(p),style:v,key:`container-${p}`},x.map(l=>{let{content:i,props:u}=l;return h.createElement(De,{...u,stacked:s,collapseAll:y,isIn:b(u.toastId,u.containerId),style:u.style,key:`toast-${u.key}`},i)}))}))}const qe=h.memo(()=>{const{t:e}=re();return o.jsx("section",{className:"page__main main",id:"main",children:o.jsxs("div",{className:"main__container",children:[o.jsxs("div",{className:"main__content",children:[o.jsxs("h1",{className:"main__title",children:[e("tasks")," ",o.jsx("span",{children:e("life")})]}),o.jsxs("div",{className:"main__buttons",children:[o.jsx(me,{to:"/",className:"main__hire-button button",children:e("puzzles")}),o.jsx(me,{to:"/",className:"main__hire-button button button_dark",children:o.jsx("span",{children:e("summary")})})]})]}),o.jsx("div",{className:"main__image",children:o.jsx("img",{src:xe,alt:"People and PC",width:"517px",height:"597px"})})]})})}),Ve=h.memo(()=>{const{t:e}=re();return o.jsx("section",{className:"page__about about",id:"about",children:o.jsxs("div",{className:"about__container",children:[o.jsxs("div",{className:"about__content",children:[o.jsxs("h2",{className:"about__title title",children:[e("about")," ",o.jsx("span",{children:e("project")})]}),o.jsx("div",{className:"about__text",children:o.jsx("p",{children:e("projectdesc")})})]}),o.jsx("div",{className:"about__image",children:o.jsx("img",{src:Ee,alt:"Around digital",loading:"lazy",width:"656px",height:"597px"})})]})})}),We=h.memo(()=>{const{t:e}=re(),[t,s]=h.useState(""),a=c=>{s(c)},r=[{type:"digital",imageSrc:Te,imageAlt:"SiteDigital",text:e("sitefornew"),link:"/"},{type:"digital",imageSrc:Ne,imageAlt:"Interactive puzzles",text:e("interactivePuzzles"),link:"/"},{type:"test",imageSrc:ke,imageAlt:"Test and answers",text:e("testResults"),link:"/"},{type:"digital",imageSrc:Ce,imageAlt:"Generator for puzzles",text:e("puzzleGenerator"),link:"/"},{type:"life",imageSrc:je,imageAlt:"Real Life Puzzles",text:e("realLifePuzzles"),link:"/"},{type:"digital",imageSrc:te,imageAlt:"Visualisation of solutions",text:e("visualisationOfSolutions"),link:"/"},{type:"educate",imageSrc:te,imageAlt:"Maths resources",text:e("mathResources"),link:"/"},{type:"test",imageSrc:te,imageAlt:"Commission`s puzzles",text:e("commissionPuzzles"),link:"/"},{type:"digital",imageSrc:te,imageAlt:"Challenges and sources",text:e("challengesAndSources"),link:"/"}];return o.jsx("section",{className:"page__works works",id:"practice",children:o.jsxs("div",{className:"works__container",children:[o.jsx("h2",{className:"works__title title",children:e("practicework")}),o.jsxs("div",{className:"works__items items-works",children:[o.jsxs("nav",{className:"items-works__navigation",children:[o.jsx("button",{"data-work-type":"",className:`items-works__type button button_dark ${t===""?"active":""}`,onClick:()=>a(""),children:e("all")}),o.jsx("button",{"data-work-type":"digital",className:`items-works__type button button_dark ${t==="digital"?"active":""}`,onClick:()=>a("digital"),children:e("digital")}),o.jsx("button",{"data-work-type":"test",className:`items-works__type button button_dark ${t==="test"?"active":""}`,onClick:()=>a("test"),children:e("tests")}),o.jsx("button",{"data-work-type":"life",className:`items-works__type button button_dark ${t==="life"?"active":""}`,onClick:()=>a("life"),children:e("alive")}),o.jsx("button",{"data-work-type":"educate",className:`items-works__type button button_dark ${t==="educate"?"active":""}`,onClick:()=>a("educate"),children:e("educate")})]}),o.jsx("div",{className:"items-works__body",children:r.filter(c=>c.type===t||t==="").map((c,n)=>o.jsxs("a",{"data-work-type":c.type,href:c.link,className:"items-works__item",children:[o.jsx("div",{className:"item-works__image",children:o.jsxs("picture",{children:[o.jsx("source",{srcSet:c.imageSrc,type:"image/webp"}),o.jsx("img",{src:c.imageSrc.replace(".webp",".jpg"),alt:c.imageAlt,loading:"lazy"})]})}),c.text]},n))})]})]})})}),Xe=h.memo(()=>{const{t:e}=re(),[t,s]=f.useState(""),[a,r]=f.useState(""),[c,n]=f.useState(""),[b,m]=f.useState(""),[k,g]=f.useState(""),[E,N]=f.useState(!1),[C,y]=f.useState(5),[p,x]=f.useState(!1);f.useEffect(()=>{let l;return E&&(l=setInterval(()=>{y(i=>i<=1?(clearInterval(l),N(!1),5):i-1)},1e3)),()=>clearInterval(l)},[E]);const v=async l=>{if(l.preventDefault(),k){m(e("formAuto"));return}if(E){_.info(`${e("pleaseWait")} ${C} ${e("lastWait")}.`);return}const i=new FormData;i.append("Имя",t),i.append("Email",a),i.append("Обращение",c),x(!0);try{const u=await fetch("https://script.google.com/macros/s/AKfycbxkLlixjPn2qSDzPLqq2jcrDonsh6M8PrADyJrpvs-3_dSOrfr348Agr9RM2AXryeOQ6Q/exec",{method:"POST",body:i});if(!u.ok)throw new Error("Сервер вернул ошибку. Статус: "+u.status);const w=await u.json();w.result==="Success"?(_.success(`${e("thanksForSubmit")} + ${t}! ${e("contactWithUser")}`,{autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!0}),m(""),s(""),r(""),n(""),g(""),N(!0),y(5)):w.error?(m(w.error),_.error(w.error,{autoClose:5e3})):(m("Произошла ошибка при отправке формы."),_.error(`${e("error")}`,{autoClose:5e3}))}catch(u){m("Произошла ошибка при отправке формы: "+u.message),_.error(`${e("error")}`+u.message),console.error("Ошибка:",u)}finally{x(!1)}};return o.jsx("section",{className:"page__contacts contacts",id:"contacts",children:o.jsxs("div",{className:"contacts__container",children:[o.jsxs("div",{className:"contacts__content",children:[o.jsxs("h2",{className:"contacts__title title",children:[e("uCanHelp")," ",o.jsx("span",{children:e("forProject")})]}),o.jsx("div",{className:"contacts__image",children:o.jsx("img",{src:we,alt:"Contact Photo"})}),b&&o.jsx("div",{className:"error-message",children:b})," "]}),o.jsxs("form",{onSubmit:v,autoComplete:"off",className:"contacts__form form",children:[o.jsxs("div",{className:"form__item",children:[o.jsx("label",{htmlFor:"i-1",className:"form__label",children:e("urName")}),o.jsx("input",{name:"Имя",required:!0,id:"i-1",type:"text",className:"form__input",placeholder:e("justName"),value:t,onChange:l=>s(l.target.value)})]}),o.jsxs("div",{className:"form__item",children:[o.jsx("label",{htmlFor:"i-2",className:"form__label",children:e("urEmail")}),o.jsx("input",{name:"Email",required:!0,id:"i-2",type:"email",className:"form__input",placeholder:e("justEmail"),value:a,onChange:l=>r(l.target.value)})]}),o.jsxs("div",{className:"form__item",children:[o.jsx("label",{htmlFor:"i-3",className:"form__label",children:e("urMessage")}),o.jsx("textarea",{name:"Обращение",required:!0,id:"i-3",className:"form__input",placeholder:e("justMessage"),value:c,onChange:l=>n(l.target.value)})]}),o.jsx("div",{className:"form__item",children:o.jsx("input",{type:"text",name:"honeypot",style:{display:"none"},value:k,onChange:l=>g(l.target.value)})}),o.jsx("div",{className:"form__item",children:o.jsx("button",{type:"submit",className:"form__button button button_dark",disabled:E||p,children:o.jsx("span",{children:p?`${e("submitting")}`:E?`${e("pleaseWait")} ${C} ${e("lastWait")}.`:`${e("submit")}`})})})]}),o.jsx(Be,{})," "]})})});export{Ve as AboutSection,Xe as ContactSection,qe as MainSection,We as PracticeWork};
