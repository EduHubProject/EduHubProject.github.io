import{r as l,I as P,a as $,g as A,b as G}from"./index-_saJSwc8.js";const J=(...e)=>{console!=null&&console.warn&&(g(e[0])&&(e[0]=`react-i18next:: ${e[0]}`),console.warn(...e))},M={},T=(...e)=>{g(e[0])&&M[e[0]]||(g(e[0])&&(M[e[0]]=new Date),J(...e))},k=(e,n)=>()=>{if(e.isInitialized)n();else{const s=()=>{setTimeout(()=>{e.off("initialized",s)},0),n()};e.on("initialized",s)}},S=(e,n,s)=>{e.loadNamespaces(n,k(e,s))},j=(e,n,s,a)=>{if(g(s)&&(s=[s]),e.options.preload&&e.options.preload.indexOf(n)>-1)return S(e,s,a);s.forEach(m=>{e.options.ns.indexOf(m)<0&&e.options.ns.push(m)}),e.loadLanguages(n,k(e,a))},U=(e,n,s={})=>!n.languages||!n.languages.length?(T("i18n.languages were undefined or empty",n.languages),!0):n.hasLoadedNamespace(e,{lng:s.lng,precheck:(a,m)=>{var t;if(((t=s.bindI18n)==null?void 0:t.indexOf("languageChanging"))>-1&&a.services.backendConnector.backend&&a.isLanguageChangingTo&&!m(a.isLanguageChangingTo,e))return!1}}),g=e=>typeof e=="string",W=e=>typeof e=="object"&&e!==null,Y=(e,n)=>{const s=l.useRef();return l.useEffect(()=>{s.current=e},[e,n]),s.current},v=(e,n,s,a)=>e.getFixedT(n,s,a),q=(e,n,s,a)=>l.useCallback(v(e,n,s,a),[e,n,s,a]),H=(e,n={})=>{var R,I,L,F;const{i18n:s}=n,{i18n:a,defaultNS:m}=l.useContext(P)||{},t=s||a||G();if(t&&!t.reportNamespaces&&(t.reportNamespaces=new $),!t){T("You will need to pass in an i18next instance by using initReactI18next");const i=(c,u)=>g(u)?u:W(u)&&g(u.defaultValue)?u.defaultValue:Array.isArray(c)?c[c.length-1]:c,r=[i,{},!1];return r.t=i,r.i18n={},r.ready=!1,r}(R=t.options.react)!=null&&R.wait&&T("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");const y={...A(),...t.options.react,...n},{useSuspense:b,keyPrefix:x}=y;let o=m||((I=t.options)==null?void 0:I.defaultNS);o=g(o)?[o]:o||["translation"],(F=(L=t.reportNamespaces).addUsedNamespaces)==null||F.call(L,o);const f=(t.isInitialized||t.initializedStoreOnce)&&o.every(i=>U(i,t,y)),O=q(t,n.lng||null,y.nsMode==="fallback"?o:o[0],x),C=()=>O,w=()=>v(t,n.lng||null,y.nsMode==="fallback"?o:o[0],x),[z,N]=l.useState(C);let h=o.join();n.lng&&(h=`${n.lng}${h}`);const E=Y(h),d=l.useRef(!0);l.useEffect(()=>{const{bindI18n:i,bindI18nStore:r}=y;d.current=!0,!f&&!b&&(n.lng?j(t,n.lng,o,()=>{d.current&&N(w)}):S(t,o,()=>{d.current&&N(w)})),f&&E&&E!==h&&d.current&&N(w);const c=()=>{d.current&&N(w)};return i&&(t==null||t.on(i,c)),r&&(t==null||t.store.on(r,c)),()=>{d.current=!1,t&&(i==null||i.split(" ").forEach(u=>t.off(u,c))),r&&t&&r.split(" ").forEach(u=>t.store.off(u,c))}},[t,h]),l.useEffect(()=>{d.current&&f&&N(C)},[t,x,f]);const p=[z,t,f];if(p.t=z,p.i18n=t,p.ready=f,f||!f&&!b)return p;throw new Promise(i=>{n.lng?j(t,n.lng,o,()=>i()):S(t,o,()=>i())})};export{H as u};