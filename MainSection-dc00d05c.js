import { r as reactExports, R as React, L as Link } from './bundle.js';

var mainImage = "18f433af20f28734.webp";

function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

const c=e=>"number"==typeof e&&!isNaN(e),d=e=>"string"==typeof e,u=e=>"function"==typeof e,p=e=>d(e)||u(e)?e:null,m=e=>reactExports.isValidElement(e)||d(e)||u(e)||c(e);function f(e,t,n){void 0===n&&(n=300);const{scrollHeight:o,style:s}=e;requestAnimationFrame(()=>{s.minHeight="initial",s.height=o+"px",s.transition=`all ${n}ms`,requestAnimationFrame(()=>{s.height="0",s.padding="0",s.margin="0",setTimeout(t,n);});});}function g(t){let{enter:a,exit:r,appendPosition:i=!1,collapse:l=!0,collapseDuration:c=300}=t;return function(t){let{children:d,position:u,preventExitTransition:p,done:m,nodeRef:g,isIn:y,playToast:v}=t;const h=i?`${a}--${u}`:a,T=i?`${r}--${u}`:r,E=reactExports.useRef(0);return reactExports.useLayoutEffect(()=>{const e=g.current,t=h.split(" "),n=o=>{o.target===g.current&&(v(),e.removeEventListener("animationend",n),e.removeEventListener("animationcancel",n),0===E.current&&"animationcancel"!==o.type&&e.classList.remove(...t));};e.classList.add(...t),e.addEventListener("animationend",n),e.addEventListener("animationcancel",n);},[]),reactExports.useEffect(()=>{const e=g.current,t=()=>{e.removeEventListener("animationend",t),l?f(e,m,c):m();};y||(p?t():(E.current=1,e.className+=` ${T}`,e.addEventListener("animationend",t)));},[y]),React.createElement(React.Fragment,null,d)}}function y(e,t){return null!=e?{content:e.content,containerId:e.props.containerId,id:e.props.toastId,theme:e.props.theme,type:e.props.type,data:e.props.data||{},isLoading:e.props.isLoading,icon:e.props.icon,status:t}:{}}const v=new Map;let h=[];const T=new Set,E=e=>T.forEach(t=>t(e)),b=()=>v.size>0;function I(e,t){var n;if(t)return !(null==(n=v.get(t))||!n.isToastActive(e));let o=!1;return v.forEach(t=>{t.isToastActive(e)&&(o=!0);}),o}function _(e,t){m(e)&&(b()||h.push({content:e,options:t}),v.forEach(n=>{n.buildToast(e,t);}));}function C(e,t){v.forEach(n=>{null!=t&&null!=t&&t.containerId?(null==t?void 0:t.containerId)===n.id&&n.toggle(e,null==t?void 0:t.id):n.toggle(e,null==t?void 0:t.id);});}function L(e){const{subscribe:o,getSnapshot:s,setProps:i}=reactExports.useRef(function(e){const n=e.containerId||1;return {subscribe(o){const s=function(e,n,o){let s=1,r=0,i=[],l=[],f=[],g=n;const v=new Map,h=new Set,T=()=>{f=Array.from(v.values()),h.forEach(e=>e());},E=e=>{l=null==e?[]:l.filter(t=>t!==e),T();},b=e=>{const{toastId:n,onOpen:s,updateId:a,children:r}=e.props,i=null==a;e.staleId&&v.delete(e.staleId),v.set(n,e),l=[...l,e.props.toastId].filter(t=>t!==e.staleId),T(),o(y(e,i?"added":"updated")),i&&u(s)&&s(reactExports.isValidElement(r)&&r.props);};return {id:e,props:g,observe:e=>(h.add(e),()=>h.delete(e)),toggle:(e,t)=>{v.forEach(n=>{null!=t&&t!==n.props.toastId||u(n.toggle)&&n.toggle(e);});},removeToast:E,toasts:v,clearQueue:()=>{r-=i.length,i=[];},buildToast:(n,l)=>{if((t=>{let{containerId:n,toastId:o,updateId:s}=t;const a=n?n!==e:1!==e,r=v.has(o)&&null==s;return a||r})(l))return;const{toastId:f,updateId:h,data:I,staleId:_,delay:C}=l,L=()=>{E(f);},N=null==h;N&&r++;const $={...g,style:g.toastStyle,key:s++,...Object.fromEntries(Object.entries(l).filter(e=>{let[t,n]=e;return null!=n})),toastId:f,updateId:h,data:I,closeToast:L,isIn:!1,className:p(l.className||g.toastClassName),bodyClassName:p(l.bodyClassName||g.bodyClassName),progressClassName:p(l.progressClassName||g.progressClassName),autoClose:!l.isLoading&&(w=l.autoClose,k=g.autoClose,!1===w||c(w)&&w>0?w:k),deleteToast(){const e=v.get(f),{onClose:n,children:s}=e.props;u(n)&&n(reactExports.isValidElement(s)&&s.props),o(y(e,"removed")),v.delete(f),r--,r<0&&(r=0),i.length>0?b(i.shift()):T();}};var w,k;$.closeButton=g.closeButton,!1===l.closeButton||m(l.closeButton)?$.closeButton=l.closeButton:!0===l.closeButton&&($.closeButton=!m(g.closeButton)||g.closeButton);let P=n;reactExports.isValidElement(n)&&!d(n.type)?P=reactExports.cloneElement(n,{closeToast:L,toastProps:$,data:I}):u(n)&&(P=n({closeToast:L,toastProps:$,data:I}));const M={content:P,props:$,staleId:_};g.limit&&g.limit>0&&r>g.limit&&N?i.push(M):c(C)?setTimeout(()=>{b(M);},C):b(M);},setProps(e){g=e;},setToggle:(e,t)=>{v.get(e).toggle=t;},isToastActive:e=>l.some(t=>t===e),getSnapshot:()=>f}}(n,e,E);v.set(n,s);const r=s.observe(o);return h.forEach(e=>_(e.content,e.options)),h=[],()=>{r(),v.delete(n);}},setProps(e){var t;null==(t=v.get(n))||t.setProps(e);},getSnapshot(){var e;return null==(e=v.get(n))?void 0:e.getSnapshot()}}}(e)).current;i(e);const l=reactExports.useSyncExternalStore(o,s,s);return {getToastToRender:function(t){if(!l)return [];const n=new Map;return e.newestOnTop&&l.reverse(),l.forEach(e=>{const{position:t}=e.props;n.has(t)||n.set(t,[]),n.get(t).push(e);}),Array.from(n,e=>t(e[0],e[1]))},isToastActive:I,count:null==l?void 0:l.length}}function N(e){const[t,o]=reactExports.useState(!1),[a,r]=reactExports.useState(!1),l=reactExports.useRef(null),c=reactExports.useRef({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:d,pauseOnHover:u,closeToast:p,onClick:m,closeOnClick:f}=e;var g,y;function h(){o(!0);}function T(){o(!1);}function E(n){const o=l.current;c.canDrag&&o&&(c.didMove=!0,t&&T(),c.delta="x"===e.draggableDirection?n.clientX-c.start:n.clientY-c.start,c.start!==n.clientX&&(c.canCloseOnClick=!1),o.style.transform=`translate3d(${"x"===e.draggableDirection?`${c.delta}px, var(--y)`:`0, calc(${c.delta}px + var(--y))`},0)`,o.style.opacity=""+(1-Math.abs(c.delta/c.removalDistance)));}function b(){document.removeEventListener("pointermove",E),document.removeEventListener("pointerup",b);const t=l.current;if(c.canDrag&&c.didMove&&t){if(c.canDrag=!1,Math.abs(c.delta)>c.removalDistance)return r(!0),e.closeToast(),void e.collapseAll();t.style.transition="transform 0.2s, opacity 0.2s",t.style.removeProperty("transform"),t.style.removeProperty("opacity");}}null==(y=v.get((g={id:e.toastId,containerId:e.containerId,fn:o}).containerId||1))||y.setToggle(g.id,g.fn),reactExports.useEffect(()=>{if(e.pauseOnFocusLoss)return document.hasFocus()||T(),window.addEventListener("focus",h),window.addEventListener("blur",T),()=>{window.removeEventListener("focus",h),window.removeEventListener("blur",T);}},[e.pauseOnFocusLoss]);const I={onPointerDown:function(t){if(!0===e.draggable||e.draggable===t.pointerType){c.didMove=!1,document.addEventListener("pointermove",E),document.addEventListener("pointerup",b);const n=l.current;c.canCloseOnClick=!0,c.canDrag=!0,n.style.transition="none","x"===e.draggableDirection?(c.start=t.clientX,c.removalDistance=n.offsetWidth*(e.draggablePercent/100)):(c.start=t.clientY,c.removalDistance=n.offsetHeight*(80===e.draggablePercent?1.5*e.draggablePercent:e.draggablePercent)/100);}},onPointerUp:function(t){const{top:n,bottom:o,left:s,right:a}=l.current.getBoundingClientRect();"touchend"!==t.nativeEvent.type&&e.pauseOnHover&&t.clientX>=s&&t.clientX<=a&&t.clientY>=n&&t.clientY<=o?T():h();}};return d&&u&&(I.onMouseEnter=T,e.stacked||(I.onMouseLeave=h)),f&&(I.onClick=e=>{m&&m(e),c.canCloseOnClick&&p();}),{playToast:h,pauseToast:T,isRunning:t,preventExitTransition:a,toastRef:l,eventHandlers:I}}function $(t){let{delay:n,isRunning:o,closeToast:s,type:a="default",hide:r,className:i,style:c,controlledProgress:d,progress:p,rtl:m,isIn:f,theme:g}=t;const y=r||d&&0===p,v={...c,animationDuration:`${n}ms`,animationPlayState:o?"running":"paused"};d&&(v.transform=`scaleX(${p})`);const h=clsx("Toastify__progress-bar",d?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${g}`,`Toastify__progress-bar--${a}`,{"Toastify__progress-bar--rtl":m}),T=u(i)?i({rtl:m,type:a,defaultClassName:h}):clsx(h,i),E={[d&&p>=1?"onTransitionEnd":"onAnimationEnd"]:d&&p<1?null:()=>{f&&s();}};return React.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":y},React.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${g} Toastify__progress-bar--${a}`}),React.createElement("div",{role:"progressbar","aria-hidden":y?"true":"false","aria-label":"notification timer",className:T,style:v,...E}))}let w=1;const k=()=>""+w++;function P(e){return e&&(d(e.toastId)||c(e.toastId))?e.toastId:k()}function M(e,t){return _(e,t),t.toastId}function x(e,t){return {...t,type:t&&t.type||e,toastId:P(t)}}function A(e){return (t,n)=>M(t,x(e,n))}function B(e,t){return M(e,x("default",t))}B.loading=(e,t)=>M(e,x("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...t})),B.promise=function(e,t,n){let o,{pending:s,error:a,success:r}=t;s&&(o=d(s)?B.loading(s,n):B.loading(s.render,{...n,...s}));const i={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},l=(e,t,s)=>{if(null==t)return void B.dismiss(o);const a={type:e,...i,...n,data:s},r=d(t)?{render:t}:t;return o?B.update(o,{...a,...r}):B(r.render,{...a,...r}),s},c=u(e)?e():e;return c.then(e=>l("success",r,e)).catch(e=>l("error",a,e)),c},B.success=A("success"),B.info=A("info"),B.error=A("error"),B.warning=A("warning"),B.warn=B.warning,B.dark=(e,t)=>M(e,x("default",{theme:"dark",...t})),B.dismiss=function(e){!function(e){var t;if(b()){if(null==e||d(t=e)||c(t))v.forEach(t=>{t.removeToast(e);});else if(e&&("containerId"in e||"id"in e)){const t=v.get(e.containerId);t?t.removeToast(e.id):v.forEach(t=>{t.removeToast(e.id);});}}else h=h.filter(t=>null!=e&&t.options.toastId!==e);}(e);},B.clearWaitingQueue=function(e){void 0===e&&(e={}),v.forEach(t=>{!t.props.limit||e.containerId&&t.id!==e.containerId||t.clearQueue();});},B.isActive=I,B.update=function(e,t){void 0===t&&(t={});const n=((e,t)=>{var n;let{containerId:o}=t;return null==(n=v.get(o||1))?void 0:n.toasts.get(e)})(e,t);if(n){const{props:o,content:s}=n,a={delay:100,...o,...t,toastId:t.toastId||e,updateId:k()};a.toastId!==e&&(a.staleId=e);const r=a.render||s;delete a.render,M(r,a);}},B.done=e=>{B.update(e,{progress:1});},B.onChange=function(e){return T.add(e),()=>{T.delete(e);}},B.play=e=>C(!0,e),B.pause=e=>C(!1,e);const O="undefined"!=typeof window?reactExports.useLayoutEffect:reactExports.useEffect,D=t=>{let{theme:n,type:o,isLoading:s,...a}=t;return React.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:"colored"===n?"currentColor":`var(--toastify-icon-color-${o})`,...a})},z={info:function(t){return React.createElement(D,{...t},React.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(t){return React.createElement(D,{...t},React.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(t){return React.createElement(D,{...t},React.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(t){return React.createElement(D,{...t},React.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return React.createElement("div",{className:"Toastify__spinner"})}},R=n=>{const{isRunning:o,preventExitTransition:s,toastRef:r,eventHandlers:i,playToast:c}=N(n),{closeButton:d,children:p,autoClose:m,onClick:f,type:g,hideProgressBar:y,closeToast:v,transition:h,position:T,className:E,style:b,bodyClassName:I,bodyStyle:_,progressClassName:C,progressStyle:L,updateId:w,role:k,progress:P,rtl:M,toastId:x,deleteToast:A,isIn:B,isLoading:O,closeOnClick:D,theme:R}=n,S=clsx("Toastify__toast",`Toastify__toast-theme--${R}`,`Toastify__toast--${g}`,{"Toastify__toast--rtl":M},{"Toastify__toast--close-on-click":D}),H=u(E)?E({rtl:M,position:T,type:g,defaultClassName:S}):clsx(S,E),F=function(e){let{theme:n,type:o,isLoading:s,icon:r}=e,i=null;const l={theme:n,type:o};return !1===r||(u(r)?i=r({...l,isLoading:s}):reactExports.isValidElement(r)?i=reactExports.cloneElement(r,l):s?i=z.spinner():(e=>e in z)(o)&&(i=z[o](l))),i}(n),X=!!P||!m,Y={closeToast:v,type:g,theme:R};let q=null;return !1===d||(q=u(d)?d(Y):reactExports.isValidElement(d)?reactExports.cloneElement(d,Y):function(t){let{closeToast:n,theme:o,ariaLabel:s="close"}=t;return React.createElement("button",{className:`Toastify__close-button Toastify__close-button--${o}`,type:"button",onClick:e=>{e.stopPropagation(),n(e);},"aria-label":s},React.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},React.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}(Y)),React.createElement(h,{isIn:B,done:A,position:T,preventExitTransition:s,nodeRef:r,playToast:c},React.createElement("div",{id:x,onClick:f,"data-in":B,className:H,...i,style:b,ref:r},React.createElement("div",{...B&&{role:k},className:u(I)?I({type:g}):clsx("Toastify__toast-body",I),style:_},null!=F&&React.createElement("div",{className:clsx("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!O})},F),React.createElement("div",null,p)),q,React.createElement($,{...w&&!X?{key:`pb-${w}`}:{},rtl:M,theme:R,delay:m,isRunning:o,isIn:B,closeToast:v,hide:y,type:g,style:L,className:C,controlledProgress:X,progress:P||0})))},S=function(e,t){return void 0===t&&(t=!1),{enter:`Toastify--animate Toastify__${e}-enter`,exit:`Toastify--animate Toastify__${e}-exit`,appendPosition:t}},H=g(S("bounce",!0));g(S("slide",!0));g(S("zoom"));g(S("flip"));const q={position:"top-right",transition:H,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};function Q(t){let o={...q,...t};const s=t.stacked,[a,r]=reactExports.useState(!0),c=reactExports.useRef(null),{getToastToRender:d,isToastActive:m,count:f}=L(o),{className:g,style:y,rtl:v,containerId:h}=o;function T(e){const t=clsx("Toastify__toast-container",`Toastify__toast-container--${e}`,{"Toastify__toast-container--rtl":v});return u(g)?g({position:e,rtl:v,defaultClassName:t}):clsx(t,p(g))}function E(){s&&(r(!0),B.play());}return O(()=>{if(s){var e;const t=c.current.querySelectorAll('[data-in="true"]'),n=12,s=null==(e=o.position)?void 0:e.includes("top");let r=0,i=0;Array.from(t).reverse().forEach((e,t)=>{const o=e;o.classList.add("Toastify__toast--stacked"),t>0&&(o.dataset.collapsed=`${a}`),o.dataset.pos||(o.dataset.pos=s?"top":"bot");const l=r*(a?.2:1)+(a?0:n*t);o.style.setProperty("--y",`${s?l:-1*l}px`),o.style.setProperty("--g",`${n}`),o.style.setProperty("--s",""+(1-(a?i:0))),r+=o.offsetHeight,i+=.025;});}},[a,f,s]),React.createElement("div",{ref:c,className:"Toastify",id:h,onMouseEnter:()=>{s&&(r(!1),B.pause());},onMouseLeave:E},d((t,n)=>{const o=n.length?{...y}:{...y,pointerEvents:"none"};return React.createElement("div",{className:T(t),style:o,key:`container-${t}`},n.map(t=>{let{content:n,props:o}=t;return React.createElement(R,{...o,stacked:s,collapseAll:E,isIn:m(o.toastId,o.containerId),style:o.style,key:`toast-${o.key}`},n)}))}))}

const MainSection = /*#__PURE__*/React.memo(() => /*#__PURE__*/React.createElement("section", {
  className: "page__main main",
  id: "main"
}, /*#__PURE__*/React.createElement("div", {
  className: "main__container"
}, /*#__PURE__*/React.createElement("div", {
  className: "main__content"
}, /*#__PURE__*/React.createElement("h1", {
  className: "main__title"
}, "\u0417\u0410\u0414\u0410\u0427\u0418 ", /*#__PURE__*/React.createElement("span", null, "\u0416\u0418\u0417\u041D\u0418")), /*#__PURE__*/React.createElement("div", {
  className: "main__buttons"
}, /*#__PURE__*/React.createElement(Link, {
  to: "/",
  className: "main__hire-button button"
}, "\u0413\u043E\u043B\u043E\u0432\u043E\u043B\u043E\u043C\u043A\u0438"), /*#__PURE__*/React.createElement(Link, {
  to: "/",
  className: "main__hire-button button button_dark"
}, /*#__PURE__*/React.createElement("span", null, "\u0421\u0432\u043E\u0434\u043A\u0430 \u043F\u043E \u0430\u043D\u043A\u0435\u0442\u0435")))), /*#__PURE__*/React.createElement("div", {
  className: "main__image"
}, /*#__PURE__*/React.createElement("img", {
  src: mainImage,
  alt: "People and PC",
  width: "517px",
  height: "597px"
})))));
const AboutSection = /*#__PURE__*/React.memo(() => /*#__PURE__*/React.createElement("section", {
  className: "page__about about",
  id: "about"
}, /*#__PURE__*/React.createElement("div", {
  className: "about__container"
}, /*#__PURE__*/React.createElement("div", {
  className: "about__content"
}, /*#__PURE__*/React.createElement("h2", {
  className: "about__title title"
}, "\u041E ", /*#__PURE__*/React.createElement("span", null, "\u043F\u0440\u043E\u0435\u043A\u0442\u0435")), /*#__PURE__*/React.createElement("div", {
  className: "about__text"
}, /*#__PURE__*/React.createElement("p", null, "\u041F\u0440\u043E\u0435\u043A\u0442 \u0441\u043E\u0437\u0434\u0430\u043D \u0441 \u0446\u0435\u043B\u044C\u044E \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u044C, \u043A\u0430\u043A \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0432\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u043D\u043E\u0432\u0448\u0435\u0441\u0442\u0432 \u0432 \u043F\u043B\u0430\u043D\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u0433\u043E\u043B\u043E\u0432\u043E\u043B\u043E\u043C\u043E\u043A \u0438 \u0437\u0430\u0434\u0430\u0447. \u041C\u044B \u0445\u043E\u0442\u0438\u043C \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u044C, \u043A\u0430\u043A \u043D\u0435\u0439\u0440\u043E\u0441\u0435\u0442\u0438 \u0432 \u0441\u043A\u043E\u0440\u043E\u043C \u043F\u043B\u043E\u0442\u043D\u043E \u0432\u043E\u0439\u0434\u0443\u0442 \u0432 \u043D\u0430\u0448\u0443 \u0436\u0438\u0437\u043D\u044C, \u043A\u0430\u043A \u043E\u043D\u0438 \u043F\u043E\u043C\u043E\u0433\u0430\u044E\u0442 \u043D\u0430\u043C \u0440\u0435\u0448\u0430\u0442\u044C \u043F\u043E\u0432\u0441\u0435\u0434\u043D\u0435\u0432\u043D\u044B\u0435 \u0437\u0430\u0434\u0430\u0447\u0438, \u043A\u0430\u043A\u0438\u0435 \u0433\u043E\u043B\u043E\u0432\u043E\u043B\u043E\u043C\u043A\u0438 \u0440\u0430\u0437\u0432\u0438\u0432\u0430\u044E\u0442 \u043D\u0430\u043C \u043C\u043E\u0437\u0433 \u0438 \u0441 \u043A\u0430\u043A\u0438\u043C\u0438 \u0437\u0430\u0434\u0430\u0447\u0430\u043C\u0438 \u043C\u044B \u0432\u0441\u0442\u0440\u0435\u0447\u0430\u0435\u043C\u0441\u044F \u0432 \u043F\u043E\u0432\u0441\u0435\u0434\u043D\u0435\u0432\u043D\u043E\u0439 \u0436\u0438\u0437\u043D\u0438. \u042D\u0442\u0438\u043C \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u043C \u043C\u044B \u0445\u043E\u0442\u0438\u043C \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0446\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u043C\u0430\u0442\u0435\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u0433\u043E\u043B\u043E\u0432\u043E\u043B\u043E\u043C\u043E\u043A \u0438 \u0446\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u043D\u0435\u0439\u0440\u043E\u0441\u0435\u0442\u0435\u0439 \u0432 \u043D\u0430\u0448\u0435\u0439 \u0436\u0438\u0437\u043D\u0438, \u043F\u0440\u043E\u0433\u043D\u043E\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043D\u0430 \u0431\u0443\u0434\u0443\u0449\u0443\u044E \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u043E\u0441\u0442\u044C \u043D\u0435\u0439\u0440\u043E\u0441\u0435\u0442\u0435\u0439 \u0441\u0440\u0435\u0434\u0438 \u043B\u044E\u0434\u0435\u0439."))), /*#__PURE__*/React.createElement("div", {
  className: "about__image"
}, /*#__PURE__*/React.createElement("img", {
  src: "/assets/about/image.webp",
  alt: "Around digital",
  loading: "lazy",
  width: "656px",
  height: "597px"
})))));
const workItems = [{
  type: 'digital',
  imageSrc: '/assets/works/items/site.webp',
  imageAlt: 'SiteDigital',
  text: 'Сайт для новейшего подхода в обучение',
  link: 'http://dailyfes.beget.tech/'
}, {
  type: 'digital',
  imageSrc: '/assets/works/items/forum.webp',
  imageAlt: 'Forum for Digital',
  text: 'Тематический форум для помощи в решении головоломок',
  link: '/'
}, {
  type: 'test',
  imageSrc: '/assets/works/items/result.webp',
  imageAlt: 'Test and answers',
  text: 'Вопросы и результаты анкетирования',
  link: '/'
}, {
  type: 'digital',
  imageSrc: '/assets/works/items/digitalpuz.webp',
  imageAlt: 'Digital Puzzles for practice',
  text: 'Цифровые головоломки и решения их',
  link: '/'
}, {
  type: 'life',
  imageSrc: '/assets/works/items/puzzle.webp',
  imageAlt: 'Real Life Puzzles',
  text: 'Головоломки вживую',
  link: '/'
}, {
  type: 'test',
  imageSrc: '/assets/works/items/puzzleforcom.webp',
  imageAlt: 'Commision`s puzzles',
  text: 'Головоломки и задачи для комиссии',
  link: '/'
}];
const PracticeWork = /*#__PURE__*/React.memo(() => {
  const [activeType, setActiveType] = React.useState('');
  const handleTypeChange = type => {
    setActiveType(type);
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "page__works works",
    id: "practice"
  }, /*#__PURE__*/React.createElement("div", {
    className: "works__container"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "works__title title"
  }, "\u041F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0440\u0430\u0431\u043E\u0442\u0430"), /*#__PURE__*/React.createElement("div", {
    className: "works__items items-works"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "items-works__navigation"
  }, /*#__PURE__*/React.createElement("button", {
    "data-work-type": "",
    className: `items-works__type button button_dark ${activeType === '' ? 'active' : ''}`,
    onClick: () => handleTypeChange('')
  }, "\u0412\u0441\u0435"), /*#__PURE__*/React.createElement("button", {
    "data-work-type": "digital",
    className: `items-works__type button button_dark ${activeType === 'digital' ? 'active' : ''}`,
    onClick: () => handleTypeChange('digital')
  }, "\u0426\u0438\u0444\u0440\u043E\u0432\u043E\u0435"), /*#__PURE__*/React.createElement("button", {
    "data-work-type": "test",
    className: `items-works__type button button_dark ${activeType === 'test' ? 'active' : ''}`,
    onClick: () => handleTypeChange('test')
  }, "\u0410\u043D\u043A\u0435\u0442\u044B"), /*#__PURE__*/React.createElement("button", {
    "data-work-type": "life",
    className: `items-works__type button button_dark ${activeType === 'life' ? 'active' : ''}`,
    onClick: () => handleTypeChange('life')
  }, "\u0416\u0438\u0432\u043E\u0435")), /*#__PURE__*/React.createElement("div", {
    className: "items-works__body"
  }, workItems.filter(item => item.type === activeType || activeType === '').map((item, index) => /*#__PURE__*/React.createElement("a", {
    key: index,
    "data-work-type": item.type,
    href: item.link,
    className: "items-works__item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "item-works__image"
  }, /*#__PURE__*/React.createElement("picture", null, /*#__PURE__*/React.createElement("source", {
    srcSet: item.imageSrc,
    type: "image/webp"
  }), /*#__PURE__*/React.createElement("img", {
    src: item.imageSrc.replace('.webp', '.jpg'),
    alt: item.imageAlt,
    loading: "lazy"
  }))), item.text))))));
});
const ContactSection = /*#__PURE__*/React.memo(() => {
  const [name, setName] = reactExports.useState('');
  const [email, setEmail] = reactExports.useState('');
  const [message, setMessage] = reactExports.useState('');
  const [error, setError] = reactExports.useState('');
  const handleSubmit = async event => {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    const formData = new FormData();
    formData.append('Имя', name);
    formData.append('Email', email);
    formData.append('Обращение', message);
    console.log('Отправка данных:', {
      name,
      email,
      message
    }); // Отладка

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxkLlixjPn2qSDzPLqq2jcrDonsh6M8PrADyJrpvs-3_dSOrfr348Agr9RM2AXryeOQ6Q/exec', {
        method: 'POST',
        body: formData
      });

      // Проверяем, был ли запрос успешным
      if (!response.ok) {
        // Если статус ответа не 2xx, выбрасываем ошибку
        throw new Error('Сервер вернул ошибку. Статус: ' + response.status);
      }
      const data = await response.json(); // Получаем JSON-ответ
      console.log('Ответ от сервера:', data); // Отладка

      // Проверяем, является ли результат успешным
      if (data.result === "Success") {
        B.success(`Спасибо за ваше обращение, ${name}! Мы свяжемся с вами в ближайшее время.`, {
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        setError('');
        setName('');
        setEmail('');
        setMessage('');
      } else if (data.error) {
        // Если есть ошибка, выведем сообщение об ошибке
        B.error(data.error, {
          autoClose: 5000
        });
      } else {
        // Если ответ не содержит ошибки, но не был успешным
        B.error('Произошла ошибка при отправке формы.', {
          autoClose: 5000
        });
      }
    } catch (error) {
      B.error('Произошла ошибка при отправке формы: ' + error.message);
      console.error('Ошибка:', error); // Отладка
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "page__contacts contacts"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contacts__container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "contacts__content"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "contacts__title title"
  }, "\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u043E\u043C\u043E\u0447\u044C ", /*#__PURE__*/React.createElement("span", null, "\u043F\u0440\u043E\u0435\u043A\u0442\u0443!"))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    autoComplete: "off",
    className: "contacts__form form"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form__item"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "i-1",
    className: "form__label"
  }, "\u0412\u0430\u0448\u0435 \u0438\u043C\u044F"), /*#__PURE__*/React.createElement("input", {
    name: "\u0418\u043C\u044F",
    required: true,
    id: "i-1",
    type: "text",
    className: "form__input",
    placeholder: "\u0418\u043C\u044F",
    value: name,
    onChange: e => setName(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "form__item"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "i-2",
    className: "form__label"
  }, "\u0412\u0430\u0448\u0430 \u043F\u043E\u0447\u0442\u0430"), /*#__PURE__*/React.createElement("input", {
    name: "Email",
    required: true,
    id: "i-2",
    type: "email",
    className: "form__input",
    placeholder: "\u041F\u043E\u0447\u0442\u0430",
    value: email,
    onChange: e => setEmail(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "form__item"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "i-3",
    className: "form__label"
  }, "\u0412\u0430\u0448\u0435 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435"), /*#__PURE__*/React.createElement("textarea", {
    name: "\u041E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435",
    required: true,
    id: "i-3",
    className: "form__input",
    placeholder: "\u041E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435",
    value: message,
    onChange: e => setMessage(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "form__item"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "form__button button button_dark"
  }, /*#__PURE__*/React.createElement("span", null, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C")))), /*#__PURE__*/React.createElement(Q, null), " "));
});
var MainSection$1 = {
  MainSection,
  AboutSection,
  PracticeWork,
  ContactSection
};

export { MainSection$1 as default };
