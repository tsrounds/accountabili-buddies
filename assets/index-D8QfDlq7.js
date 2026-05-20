function ox(t,e){for(var n=0;n<e.length;n++){const r=e[n];if(typeof r!="string"&&!Array.isArray(r)){for(const i in r)if(i!=="default"&&!(i in t)){const s=Object.getOwnPropertyDescriptor(r,i);s&&Object.defineProperty(t,i,s.get?s:{enumerable:!0,get:()=>r[i]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function ax(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var q_={exports:{}},Wu={},G_={exports:{}},ie={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ya=Symbol.for("react.element"),lx=Symbol.for("react.portal"),ux=Symbol.for("react.fragment"),cx=Symbol.for("react.strict_mode"),hx=Symbol.for("react.profiler"),dx=Symbol.for("react.provider"),fx=Symbol.for("react.context"),px=Symbol.for("react.forward_ref"),mx=Symbol.for("react.suspense"),gx=Symbol.for("react.memo"),yx=Symbol.for("react.lazy"),Ag=Symbol.iterator;function vx(t){return t===null||typeof t!="object"?null:(t=Ag&&t[Ag]||t["@@iterator"],typeof t=="function"?t:null)}var K_={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Q_=Object.assign,Y_={};function Ds(t,e,n){this.props=t,this.context=e,this.refs=Y_,this.updater=n||K_}Ds.prototype.isReactComponent={};Ds.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Ds.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function J_(){}J_.prototype=Ds.prototype;function xf(t,e,n){this.props=t,this.context=e,this.refs=Y_,this.updater=n||K_}var kf=xf.prototype=new J_;kf.constructor=xf;Q_(kf,Ds.prototype);kf.isPureReactComponent=!0;var Rg=Array.isArray,X_=Object.prototype.hasOwnProperty,Sf={current:null},Z_={key:!0,ref:!0,__self:!0,__source:!0};function e0(t,e,n){var r,i={},s=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)X_.call(e,r)&&!Z_.hasOwnProperty(r)&&(i[r]=e[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var u=Array(l),c=0;c<l;c++)u[c]=arguments[c+2];i.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:ya,type:t,key:s,ref:o,props:i,_owner:Sf.current}}function _x(t,e){return{$$typeof:ya,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Cf(t){return typeof t=="object"&&t!==null&&t.$$typeof===ya}function wx(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Ng=/\/+/g;function oh(t,e){return typeof t=="object"&&t!==null&&t.key!=null?wx(""+t.key):e.toString(36)}function kl(t,e,n,r,i){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case ya:case lx:o=!0}}if(o)return o=t,i=i(o),t=r===""?"."+oh(o,0):r,Rg(i)?(n="",t!=null&&(n=t.replace(Ng,"$&/")+"/"),kl(i,e,n,"",function(c){return c})):i!=null&&(Cf(i)&&(i=_x(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(Ng,"$&/")+"/")+t)),e.push(i)),1;if(o=0,r=r===""?".":r+":",Rg(t))for(var l=0;l<t.length;l++){s=t[l];var u=r+oh(s,l);o+=kl(s,e,n,u,i)}else if(u=vx(t),typeof u=="function")for(t=u.call(t),l=0;!(s=t.next()).done;)s=s.value,u=r+oh(s,l++),o+=kl(s,e,n,u,i);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function tl(t,e,n){if(t==null)return t;var r=[],i=0;return kl(t,r,"","",function(s){return e.call(n,s,i++)}),r}function Ex(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Tt={current:null},Sl={transition:null},Tx={ReactCurrentDispatcher:Tt,ReactCurrentBatchConfig:Sl,ReactCurrentOwner:Sf};function t0(){throw Error("act(...) is not supported in production builds of React.")}ie.Children={map:tl,forEach:function(t,e,n){tl(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return tl(t,function(){e++}),e},toArray:function(t){return tl(t,function(e){return e})||[]},only:function(t){if(!Cf(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};ie.Component=Ds;ie.Fragment=ux;ie.Profiler=hx;ie.PureComponent=xf;ie.StrictMode=cx;ie.Suspense=mx;ie.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Tx;ie.act=t0;ie.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=Q_({},t.props),i=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Sf.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)X_.call(e,u)&&!Z_.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var c=0;c<u;c++)l[c]=arguments[c+2];r.children=l}return{$$typeof:ya,type:t.type,key:i,ref:s,props:r,_owner:o}};ie.createContext=function(t){return t={$$typeof:fx,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:dx,_context:t},t.Consumer=t};ie.createElement=e0;ie.createFactory=function(t){var e=e0.bind(null,t);return e.type=t,e};ie.createRef=function(){return{current:null}};ie.forwardRef=function(t){return{$$typeof:px,render:t}};ie.isValidElement=Cf;ie.lazy=function(t){return{$$typeof:yx,_payload:{_status:-1,_result:t},_init:Ex}};ie.memo=function(t,e){return{$$typeof:gx,type:t,compare:e===void 0?null:e}};ie.startTransition=function(t){var e=Sl.transition;Sl.transition={};try{t()}finally{Sl.transition=e}};ie.unstable_act=t0;ie.useCallback=function(t,e){return Tt.current.useCallback(t,e)};ie.useContext=function(t){return Tt.current.useContext(t)};ie.useDebugValue=function(){};ie.useDeferredValue=function(t){return Tt.current.useDeferredValue(t)};ie.useEffect=function(t,e){return Tt.current.useEffect(t,e)};ie.useId=function(){return Tt.current.useId()};ie.useImperativeHandle=function(t,e,n){return Tt.current.useImperativeHandle(t,e,n)};ie.useInsertionEffect=function(t,e){return Tt.current.useInsertionEffect(t,e)};ie.useLayoutEffect=function(t,e){return Tt.current.useLayoutEffect(t,e)};ie.useMemo=function(t,e){return Tt.current.useMemo(t,e)};ie.useReducer=function(t,e,n){return Tt.current.useReducer(t,e,n)};ie.useRef=function(t){return Tt.current.useRef(t)};ie.useState=function(t){return Tt.current.useState(t)};ie.useSyncExternalStore=function(t,e,n){return Tt.current.useSyncExternalStore(t,e,n)};ie.useTransition=function(){return Tt.current.useTransition()};ie.version="18.3.1";G_.exports=ie;var D=G_.exports;const Ix=ax(D),xx=ox({__proto__:null,default:Ix},[D]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var kx=D,Sx=Symbol.for("react.element"),Cx=Symbol.for("react.fragment"),Ax=Object.prototype.hasOwnProperty,Rx=kx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Nx={key:!0,ref:!0,__self:!0,__source:!0};function n0(t,e,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)Ax.call(e,r)&&!Nx.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:Sx,type:t,key:s,ref:o,props:i,_owner:Rx.current}}Wu.Fragment=Cx;Wu.jsx=n0;Wu.jsxs=n0;q_.exports=Wu;var h=q_.exports,r0={exports:{}},Ht={},i0={exports:{}},s0={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e($,z){var J=$.length;$.push(z);e:for(;0<J;){var ce=J-1>>>1,K=$[ce];if(0<i(K,z))$[ce]=z,$[J]=K,J=ce;else break e}}function n($){return $.length===0?null:$[0]}function r($){if($.length===0)return null;var z=$[0],J=$.pop();if(J!==z){$[0]=J;e:for(var ce=0,K=$.length,re=K>>>1;ce<re;){var mt=2*(ce+1)-1,Ke=$[mt],Vt=mt+1,Mn=$[Vt];if(0>i(Ke,J))Vt<K&&0>i(Mn,Ke)?($[ce]=Mn,$[Vt]=J,ce=Vt):($[ce]=Ke,$[mt]=J,ce=mt);else if(Vt<K&&0>i(Mn,J))$[ce]=Mn,$[Vt]=J,ce=Vt;else break e}}return z}function i($,z){var J=$.sortIndex-z.sortIndex;return J!==0?J:$.id-z.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var u=[],c=[],f=1,m=null,g=3,I=!1,C=!1,N=!1,P=typeof setTimeout=="function"?setTimeout:null,w=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function k($){for(var z=n(c);z!==null;){if(z.callback===null)r(c);else if(z.startTime<=$)r(c),z.sortIndex=z.expirationTime,e(u,z);else break;z=n(c)}}function b($){if(N=!1,k($),!C)if(n(u)!==null)C=!0,Ve(j);else{var z=n(c);z!==null&&rt(b,z.startTime-$)}}function j($,z){C=!1,N&&(N=!1,w(v),v=-1),I=!0;var J=g;try{for(k(z),m=n(u);m!==null&&(!(m.expirationTime>z)||$&&!R());){var ce=m.callback;if(typeof ce=="function"){m.callback=null,g=m.priorityLevel;var K=ce(m.expirationTime<=z);z=t.unstable_now(),typeof K=="function"?m.callback=K:m===n(u)&&r(u),k(z)}else r(u);m=n(u)}if(m!==null)var re=!0;else{var mt=n(c);mt!==null&&rt(b,mt.startTime-z),re=!1}return re}finally{m=null,g=J,I=!1}}var L=!1,T=null,v=-1,E=5,S=-1;function R(){return!(t.unstable_now()-S<E)}function A(){if(T!==null){var $=t.unstable_now();S=$;var z=!0;try{z=T(!0,$)}finally{z?x():(L=!1,T=null)}}else L=!1}var x;if(typeof _=="function")x=function(){_(A)};else if(typeof MessageChannel<"u"){var Y=new MessageChannel,ae=Y.port2;Y.port1.onmessage=A,x=function(){ae.postMessage(null)}}else x=function(){P(A,0)};function Ve($){T=$,L||(L=!0,x())}function rt($,z){v=P(function(){$(t.unstable_now())},z)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function($){$.callback=null},t.unstable_continueExecution=function(){C||I||(C=!0,Ve(j))},t.unstable_forceFrameRate=function($){0>$||125<$?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<$?Math.floor(1e3/$):5},t.unstable_getCurrentPriorityLevel=function(){return g},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function($){switch(g){case 1:case 2:case 3:var z=3;break;default:z=g}var J=g;g=z;try{return $()}finally{g=J}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function($,z){switch($){case 1:case 2:case 3:case 4:case 5:break;default:$=3}var J=g;g=$;try{return z()}finally{g=J}},t.unstable_scheduleCallback=function($,z,J){var ce=t.unstable_now();switch(typeof J=="object"&&J!==null?(J=J.delay,J=typeof J=="number"&&0<J?ce+J:ce):J=ce,$){case 1:var K=-1;break;case 2:K=250;break;case 5:K=1073741823;break;case 4:K=1e4;break;default:K=5e3}return K=J+K,$={id:f++,callback:z,priorityLevel:$,startTime:J,expirationTime:K,sortIndex:-1},J>ce?($.sortIndex=J,e(c,$),n(u)===null&&$===n(c)&&(N?(w(v),v=-1):N=!0,rt(b,J-ce))):($.sortIndex=K,e(u,$),C||I||(C=!0,Ve(j))),$},t.unstable_shouldYield=R,t.unstable_wrapCallback=function($){var z=g;return function(){var J=g;g=z;try{return $.apply(this,arguments)}finally{g=J}}}})(s0);i0.exports=s0;var Px=i0.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bx=D,Wt=Px;function U(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var o0=new Set,Fo={};function bi(t,e){_s(t,e),_s(t+"Capture",e)}function _s(t,e){for(Fo[t]=e,t=0;t<e.length;t++)o0.add(e[t])}var Qn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ed=Object.prototype.hasOwnProperty,Dx=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Pg={},bg={};function Ox(t){return ed.call(bg,t)?!0:ed.call(Pg,t)?!1:Dx.test(t)?bg[t]=!0:(Pg[t]=!0,!1)}function Vx(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function jx(t,e,n,r){if(e===null||typeof e>"u"||Vx(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function It(t,e,n,r,i,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var tt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){tt[t]=new It(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];tt[e]=new It(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){tt[t]=new It(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){tt[t]=new It(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){tt[t]=new It(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){tt[t]=new It(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){tt[t]=new It(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){tt[t]=new It(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){tt[t]=new It(t,5,!1,t.toLowerCase(),null,!1,!1)});var Af=/[\-:]([a-z])/g;function Rf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Af,Rf);tt[e]=new It(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Af,Rf);tt[e]=new It(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Af,Rf);tt[e]=new It(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){tt[t]=new It(t,1,!1,t.toLowerCase(),null,!1,!1)});tt.xlinkHref=new It("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){tt[t]=new It(t,1,!1,t.toLowerCase(),null,!0,!0)});function Nf(t,e,n,r){var i=tt.hasOwnProperty(e)?tt[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(jx(e,n,i,r)&&(n=null),r||i===null?Ox(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var sr=bx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,nl=Symbol.for("react.element"),Qi=Symbol.for("react.portal"),Yi=Symbol.for("react.fragment"),Pf=Symbol.for("react.strict_mode"),td=Symbol.for("react.profiler"),a0=Symbol.for("react.provider"),l0=Symbol.for("react.context"),bf=Symbol.for("react.forward_ref"),nd=Symbol.for("react.suspense"),rd=Symbol.for("react.suspense_list"),Df=Symbol.for("react.memo"),fr=Symbol.for("react.lazy"),u0=Symbol.for("react.offscreen"),Dg=Symbol.iterator;function no(t){return t===null||typeof t!="object"?null:(t=Dg&&t[Dg]||t["@@iterator"],typeof t=="function"?t:null)}var Ae=Object.assign,ah;function co(t){if(ah===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);ah=e&&e[1]||""}return`
`+ah+t}var lh=!1;function uh(t,e){if(!t||lh)return"";lh=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var r=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){r=c}t.call(e.prototype)}else{try{throw Error()}catch(c){r=c}t()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,l=s.length-1;1<=o&&0<=l&&i[o]!==s[l];)l--;for(;1<=o&&0<=l;o--,l--)if(i[o]!==s[l]){if(o!==1||l!==1)do if(o--,l--,0>l||i[o]!==s[l]){var u=`
`+i[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=l);break}}}finally{lh=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?co(t):""}function Mx(t){switch(t.tag){case 5:return co(t.type);case 16:return co("Lazy");case 13:return co("Suspense");case 19:return co("SuspenseList");case 0:case 2:case 15:return t=uh(t.type,!1),t;case 11:return t=uh(t.type.render,!1),t;case 1:return t=uh(t.type,!0),t;default:return""}}function id(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Yi:return"Fragment";case Qi:return"Portal";case td:return"Profiler";case Pf:return"StrictMode";case nd:return"Suspense";case rd:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case l0:return(t.displayName||"Context")+".Consumer";case a0:return(t._context.displayName||"Context")+".Provider";case bf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Df:return e=t.displayName||null,e!==null?e:id(t.type)||"Memo";case fr:e=t._payload,t=t._init;try{return id(t(e))}catch{}}return null}function Lx(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return id(e);case 8:return e===Pf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Ur(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function c0(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Fx(t){var e=c0(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function rl(t){t._valueTracker||(t._valueTracker=Fx(t))}function h0(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=c0(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function Gl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function sd(t,e){var n=e.checked;return Ae({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Og(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=Ur(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function d0(t,e){e=e.checked,e!=null&&Nf(t,"checked",e,!1)}function od(t,e){d0(t,e);var n=Ur(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?ad(t,e.type,n):e.hasOwnProperty("defaultValue")&&ad(t,e.type,Ur(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Vg(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function ad(t,e,n){(e!=="number"||Gl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var ho=Array.isArray;function ls(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+Ur(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function ld(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(U(91));return Ae({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function jg(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(U(92));if(ho(n)){if(1<n.length)throw Error(U(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Ur(n)}}function f0(t,e){var n=Ur(e.value),r=Ur(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Mg(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function p0(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ud(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?p0(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var il,m0=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(il=il||document.createElement("div"),il.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=il.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Uo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var wo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ux=["Webkit","ms","Moz","O"];Object.keys(wo).forEach(function(t){Ux.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),wo[e]=wo[t]})});function g0(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||wo.hasOwnProperty(t)&&wo[t]?(""+e).trim():e+"px"}function y0(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=g0(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var zx=Ae({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function cd(t,e){if(e){if(zx[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(U(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(U(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(U(61))}if(e.style!=null&&typeof e.style!="object")throw Error(U(62))}}function hd(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var dd=null;function Of(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var fd=null,us=null,cs=null;function Lg(t){if(t=wa(t)){if(typeof fd!="function")throw Error(U(280));var e=t.stateNode;e&&(e=Qu(e),fd(t.stateNode,t.type,e))}}function v0(t){us?cs?cs.push(t):cs=[t]:us=t}function _0(){if(us){var t=us,e=cs;if(cs=us=null,Lg(t),e)for(t=0;t<e.length;t++)Lg(e[t])}}function w0(t,e){return t(e)}function E0(){}var ch=!1;function T0(t,e,n){if(ch)return t(e,n);ch=!0;try{return w0(t,e,n)}finally{ch=!1,(us!==null||cs!==null)&&(E0(),_0())}}function zo(t,e){var n=t.stateNode;if(n===null)return null;var r=Qu(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(U(231,e,typeof n));return n}var pd=!1;if(Qn)try{var ro={};Object.defineProperty(ro,"passive",{get:function(){pd=!0}}),window.addEventListener("test",ro,ro),window.removeEventListener("test",ro,ro)}catch{pd=!1}function Bx(t,e,n,r,i,s,o,l,u){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(f){this.onError(f)}}var Eo=!1,Kl=null,Ql=!1,md=null,$x={onError:function(t){Eo=!0,Kl=t}};function Wx(t,e,n,r,i,s,o,l,u){Eo=!1,Kl=null,Bx.apply($x,arguments)}function Hx(t,e,n,r,i,s,o,l,u){if(Wx.apply(this,arguments),Eo){if(Eo){var c=Kl;Eo=!1,Kl=null}else throw Error(U(198));Ql||(Ql=!0,md=c)}}function Di(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function I0(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Fg(t){if(Di(t)!==t)throw Error(U(188))}function qx(t){var e=t.alternate;if(!e){if(e=Di(t),e===null)throw Error(U(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return Fg(i),t;if(s===r)return Fg(i),e;s=s.sibling}throw Error(U(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o){for(l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o)throw Error(U(189))}}if(n.alternate!==r)throw Error(U(190))}if(n.tag!==3)throw Error(U(188));return n.stateNode.current===n?t:e}function x0(t){return t=qx(t),t!==null?k0(t):null}function k0(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=k0(t);if(e!==null)return e;t=t.sibling}return null}var S0=Wt.unstable_scheduleCallback,Ug=Wt.unstable_cancelCallback,Gx=Wt.unstable_shouldYield,Kx=Wt.unstable_requestPaint,Oe=Wt.unstable_now,Qx=Wt.unstable_getCurrentPriorityLevel,Vf=Wt.unstable_ImmediatePriority,C0=Wt.unstable_UserBlockingPriority,Yl=Wt.unstable_NormalPriority,Yx=Wt.unstable_LowPriority,A0=Wt.unstable_IdlePriority,Hu=null,kn=null;function Jx(t){if(kn&&typeof kn.onCommitFiberRoot=="function")try{kn.onCommitFiberRoot(Hu,t,void 0,(t.current.flags&128)===128)}catch{}}var mn=Math.clz32?Math.clz32:ek,Xx=Math.log,Zx=Math.LN2;function ek(t){return t>>>=0,t===0?32:31-(Xx(t)/Zx|0)|0}var sl=64,ol=4194304;function fo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Jl(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~i;l!==0?r=fo(l):(s&=o,s!==0&&(r=fo(s)))}else o=n&~i,o!==0?r=fo(o):s!==0&&(r=fo(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-mn(e),i=1<<n,r|=t[n],e&=~i;return r}function tk(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function nk(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-mn(s),l=1<<o,u=i[o];u===-1?(!(l&n)||l&r)&&(i[o]=tk(l,e)):u<=e&&(t.expiredLanes|=l),s&=~l}}function gd(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function R0(){var t=sl;return sl<<=1,!(sl&4194240)&&(sl=64),t}function hh(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function va(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-mn(e),t[e]=n}function rk(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-mn(n),s=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~s}}function jf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-mn(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var pe=0;function N0(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var P0,Mf,b0,D0,O0,yd=!1,al=[],kr=null,Sr=null,Cr=null,Bo=new Map,$o=new Map,mr=[],ik="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function zg(t,e){switch(t){case"focusin":case"focusout":kr=null;break;case"dragenter":case"dragleave":Sr=null;break;case"mouseover":case"mouseout":Cr=null;break;case"pointerover":case"pointerout":Bo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":$o.delete(e.pointerId)}}function io(t,e,n,r,i,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=wa(e),e!==null&&Mf(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function sk(t,e,n,r,i){switch(e){case"focusin":return kr=io(kr,t,e,n,r,i),!0;case"dragenter":return Sr=io(Sr,t,e,n,r,i),!0;case"mouseover":return Cr=io(Cr,t,e,n,r,i),!0;case"pointerover":var s=i.pointerId;return Bo.set(s,io(Bo.get(s)||null,t,e,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,$o.set(s,io($o.get(s)||null,t,e,n,r,i)),!0}return!1}function V0(t){var e=hi(t.target);if(e!==null){var n=Di(e);if(n!==null){if(e=n.tag,e===13){if(e=I0(n),e!==null){t.blockedOn=e,O0(t.priority,function(){b0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Cl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=vd(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);dd=r,n.target.dispatchEvent(r),dd=null}else return e=wa(n),e!==null&&Mf(e),t.blockedOn=n,!1;e.shift()}return!0}function Bg(t,e,n){Cl(t)&&n.delete(e)}function ok(){yd=!1,kr!==null&&Cl(kr)&&(kr=null),Sr!==null&&Cl(Sr)&&(Sr=null),Cr!==null&&Cl(Cr)&&(Cr=null),Bo.forEach(Bg),$o.forEach(Bg)}function so(t,e){t.blockedOn===e&&(t.blockedOn=null,yd||(yd=!0,Wt.unstable_scheduleCallback(Wt.unstable_NormalPriority,ok)))}function Wo(t){function e(i){return so(i,t)}if(0<al.length){so(al[0],t);for(var n=1;n<al.length;n++){var r=al[n];r.blockedOn===t&&(r.blockedOn=null)}}for(kr!==null&&so(kr,t),Sr!==null&&so(Sr,t),Cr!==null&&so(Cr,t),Bo.forEach(e),$o.forEach(e),n=0;n<mr.length;n++)r=mr[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<mr.length&&(n=mr[0],n.blockedOn===null);)V0(n),n.blockedOn===null&&mr.shift()}var hs=sr.ReactCurrentBatchConfig,Xl=!0;function ak(t,e,n,r){var i=pe,s=hs.transition;hs.transition=null;try{pe=1,Lf(t,e,n,r)}finally{pe=i,hs.transition=s}}function lk(t,e,n,r){var i=pe,s=hs.transition;hs.transition=null;try{pe=4,Lf(t,e,n,r)}finally{pe=i,hs.transition=s}}function Lf(t,e,n,r){if(Xl){var i=vd(t,e,n,r);if(i===null)Eh(t,e,r,Zl,n),zg(t,r);else if(sk(i,t,e,n,r))r.stopPropagation();else if(zg(t,r),e&4&&-1<ik.indexOf(t)){for(;i!==null;){var s=wa(i);if(s!==null&&P0(s),s=vd(t,e,n,r),s===null&&Eh(t,e,r,Zl,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else Eh(t,e,r,null,n)}}var Zl=null;function vd(t,e,n,r){if(Zl=null,t=Of(r),t=hi(t),t!==null)if(e=Di(t),e===null)t=null;else if(n=e.tag,n===13){if(t=I0(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Zl=t,null}function j0(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Qx()){case Vf:return 1;case C0:return 4;case Yl:case Yx:return 16;case A0:return 536870912;default:return 16}default:return 16}}var Er=null,Ff=null,Al=null;function M0(){if(Al)return Al;var t,e=Ff,n=e.length,r,i="value"in Er?Er.value:Er.textContent,s=i.length;for(t=0;t<n&&e[t]===i[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===i[s-r];r++);return Al=i.slice(t,1<r?1-r:void 0)}function Rl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function ll(){return!0}function $g(){return!1}function qt(t){function e(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(s):s[l]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?ll:$g,this.isPropagationStopped=$g,this}return Ae(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ll)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ll)},persist:function(){},isPersistent:ll}),e}var Os={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Uf=qt(Os),_a=Ae({},Os,{view:0,detail:0}),uk=qt(_a),dh,fh,oo,qu=Ae({},_a,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==oo&&(oo&&t.type==="mousemove"?(dh=t.screenX-oo.screenX,fh=t.screenY-oo.screenY):fh=dh=0,oo=t),dh)},movementY:function(t){return"movementY"in t?t.movementY:fh}}),Wg=qt(qu),ck=Ae({},qu,{dataTransfer:0}),hk=qt(ck),dk=Ae({},_a,{relatedTarget:0}),ph=qt(dk),fk=Ae({},Os,{animationName:0,elapsedTime:0,pseudoElement:0}),pk=qt(fk),mk=Ae({},Os,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),gk=qt(mk),yk=Ae({},Os,{data:0}),Hg=qt(yk),vk={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},_k={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},wk={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ek(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=wk[t])?!!e[t]:!1}function zf(){return Ek}var Tk=Ae({},_a,{key:function(t){if(t.key){var e=vk[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Rl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?_k[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zf,charCode:function(t){return t.type==="keypress"?Rl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Rl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Ik=qt(Tk),xk=Ae({},qu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),qg=qt(xk),kk=Ae({},_a,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zf}),Sk=qt(kk),Ck=Ae({},Os,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ak=qt(Ck),Rk=Ae({},qu,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Nk=qt(Rk),Pk=[9,13,27,32],Bf=Qn&&"CompositionEvent"in window,To=null;Qn&&"documentMode"in document&&(To=document.documentMode);var bk=Qn&&"TextEvent"in window&&!To,L0=Qn&&(!Bf||To&&8<To&&11>=To),Gg=" ",Kg=!1;function F0(t,e){switch(t){case"keyup":return Pk.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function U0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Ji=!1;function Dk(t,e){switch(t){case"compositionend":return U0(e);case"keypress":return e.which!==32?null:(Kg=!0,Gg);case"textInput":return t=e.data,t===Gg&&Kg?null:t;default:return null}}function Ok(t,e){if(Ji)return t==="compositionend"||!Bf&&F0(t,e)?(t=M0(),Al=Ff=Er=null,Ji=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return L0&&e.locale!=="ko"?null:e.data;default:return null}}var Vk={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Qg(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Vk[t.type]:e==="textarea"}function z0(t,e,n,r){v0(r),e=eu(e,"onChange"),0<e.length&&(n=new Uf("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var Io=null,Ho=null;function jk(t){X0(t,0)}function Gu(t){var e=es(t);if(h0(e))return t}function Mk(t,e){if(t==="change")return e}var B0=!1;if(Qn){var mh;if(Qn){var gh="oninput"in document;if(!gh){var Yg=document.createElement("div");Yg.setAttribute("oninput","return;"),gh=typeof Yg.oninput=="function"}mh=gh}else mh=!1;B0=mh&&(!document.documentMode||9<document.documentMode)}function Jg(){Io&&(Io.detachEvent("onpropertychange",$0),Ho=Io=null)}function $0(t){if(t.propertyName==="value"&&Gu(Ho)){var e=[];z0(e,Ho,t,Of(t)),T0(jk,e)}}function Lk(t,e,n){t==="focusin"?(Jg(),Io=e,Ho=n,Io.attachEvent("onpropertychange",$0)):t==="focusout"&&Jg()}function Fk(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Gu(Ho)}function Uk(t,e){if(t==="click")return Gu(e)}function zk(t,e){if(t==="input"||t==="change")return Gu(e)}function Bk(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var yn=typeof Object.is=="function"?Object.is:Bk;function qo(t,e){if(yn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!ed.call(e,i)||!yn(t[i],e[i]))return!1}return!0}function Xg(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Zg(t,e){var n=Xg(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Xg(n)}}function W0(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?W0(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function H0(){for(var t=window,e=Gl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Gl(t.document)}return e}function $f(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function $k(t){var e=H0(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&W0(n.ownerDocument.documentElement,n)){if(r!==null&&$f(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!t.extend&&s>r&&(i=r,r=s,s=i),i=Zg(n,s);var o=Zg(n,r);i&&o&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),s>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Wk=Qn&&"documentMode"in document&&11>=document.documentMode,Xi=null,_d=null,xo=null,wd=!1;function ey(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;wd||Xi==null||Xi!==Gl(r)||(r=Xi,"selectionStart"in r&&$f(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),xo&&qo(xo,r)||(xo=r,r=eu(_d,"onSelect"),0<r.length&&(e=new Uf("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=Xi)))}function ul(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Zi={animationend:ul("Animation","AnimationEnd"),animationiteration:ul("Animation","AnimationIteration"),animationstart:ul("Animation","AnimationStart"),transitionend:ul("Transition","TransitionEnd")},yh={},q0={};Qn&&(q0=document.createElement("div").style,"AnimationEvent"in window||(delete Zi.animationend.animation,delete Zi.animationiteration.animation,delete Zi.animationstart.animation),"TransitionEvent"in window||delete Zi.transitionend.transition);function Ku(t){if(yh[t])return yh[t];if(!Zi[t])return t;var e=Zi[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in q0)return yh[t]=e[n];return t}var G0=Ku("animationend"),K0=Ku("animationiteration"),Q0=Ku("animationstart"),Y0=Ku("transitionend"),J0=new Map,ty="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Yr(t,e){J0.set(t,e),bi(e,[t])}for(var vh=0;vh<ty.length;vh++){var _h=ty[vh],Hk=_h.toLowerCase(),qk=_h[0].toUpperCase()+_h.slice(1);Yr(Hk,"on"+qk)}Yr(G0,"onAnimationEnd");Yr(K0,"onAnimationIteration");Yr(Q0,"onAnimationStart");Yr("dblclick","onDoubleClick");Yr("focusin","onFocus");Yr("focusout","onBlur");Yr(Y0,"onTransitionEnd");_s("onMouseEnter",["mouseout","mouseover"]);_s("onMouseLeave",["mouseout","mouseover"]);_s("onPointerEnter",["pointerout","pointerover"]);_s("onPointerLeave",["pointerout","pointerover"]);bi("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));bi("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));bi("onBeforeInput",["compositionend","keypress","textInput","paste"]);bi("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));bi("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));bi("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var po="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Gk=new Set("cancel close invalid load scroll toggle".split(" ").concat(po));function ny(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,Hx(r,e,void 0,t),t.currentTarget=null}function X0(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],u=l.instance,c=l.currentTarget;if(l=l.listener,u!==s&&i.isPropagationStopped())break e;ny(i,l,c),s=u}else for(o=0;o<r.length;o++){if(l=r[o],u=l.instance,c=l.currentTarget,l=l.listener,u!==s&&i.isPropagationStopped())break e;ny(i,l,c),s=u}}}if(Ql)throw t=md,Ql=!1,md=null,t}function we(t,e){var n=e[kd];n===void 0&&(n=e[kd]=new Set);var r=t+"__bubble";n.has(r)||(Z0(e,t,2,!1),n.add(r))}function wh(t,e,n){var r=0;e&&(r|=4),Z0(n,t,r,e)}var cl="_reactListening"+Math.random().toString(36).slice(2);function Go(t){if(!t[cl]){t[cl]=!0,o0.forEach(function(n){n!=="selectionchange"&&(Gk.has(n)||wh(n,!1,t),wh(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[cl]||(e[cl]=!0,wh("selectionchange",!1,e))}}function Z0(t,e,n,r){switch(j0(e)){case 1:var i=ak;break;case 4:i=lk;break;default:i=Lf}n=i.bind(null,e,n,t),i=void 0,!pd||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function Eh(t,e,n,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===i||u.nodeType===8&&u.parentNode===i))return;o=o.return}for(;l!==null;){if(o=hi(l),o===null)return;if(u=o.tag,u===5||u===6){r=s=o;continue e}l=l.parentNode}}r=r.return}T0(function(){var c=s,f=Of(n),m=[];e:{var g=J0.get(t);if(g!==void 0){var I=Uf,C=t;switch(t){case"keypress":if(Rl(n)===0)break e;case"keydown":case"keyup":I=Ik;break;case"focusin":C="focus",I=ph;break;case"focusout":C="blur",I=ph;break;case"beforeblur":case"afterblur":I=ph;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":I=Wg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":I=hk;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":I=Sk;break;case G0:case K0:case Q0:I=pk;break;case Y0:I=Ak;break;case"scroll":I=uk;break;case"wheel":I=Nk;break;case"copy":case"cut":case"paste":I=gk;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":I=qg}var N=(e&4)!==0,P=!N&&t==="scroll",w=N?g!==null?g+"Capture":null:g;N=[];for(var _=c,k;_!==null;){k=_;var b=k.stateNode;if(k.tag===5&&b!==null&&(k=b,w!==null&&(b=zo(_,w),b!=null&&N.push(Ko(_,b,k)))),P)break;_=_.return}0<N.length&&(g=new I(g,C,null,n,f),m.push({event:g,listeners:N}))}}if(!(e&7)){e:{if(g=t==="mouseover"||t==="pointerover",I=t==="mouseout"||t==="pointerout",g&&n!==dd&&(C=n.relatedTarget||n.fromElement)&&(hi(C)||C[Yn]))break e;if((I||g)&&(g=f.window===f?f:(g=f.ownerDocument)?g.defaultView||g.parentWindow:window,I?(C=n.relatedTarget||n.toElement,I=c,C=C?hi(C):null,C!==null&&(P=Di(C),C!==P||C.tag!==5&&C.tag!==6)&&(C=null)):(I=null,C=c),I!==C)){if(N=Wg,b="onMouseLeave",w="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(N=qg,b="onPointerLeave",w="onPointerEnter",_="pointer"),P=I==null?g:es(I),k=C==null?g:es(C),g=new N(b,_+"leave",I,n,f),g.target=P,g.relatedTarget=k,b=null,hi(f)===c&&(N=new N(w,_+"enter",C,n,f),N.target=k,N.relatedTarget=P,b=N),P=b,I&&C)t:{for(N=I,w=C,_=0,k=N;k;k=Wi(k))_++;for(k=0,b=w;b;b=Wi(b))k++;for(;0<_-k;)N=Wi(N),_--;for(;0<k-_;)w=Wi(w),k--;for(;_--;){if(N===w||w!==null&&N===w.alternate)break t;N=Wi(N),w=Wi(w)}N=null}else N=null;I!==null&&ry(m,g,I,N,!1),C!==null&&P!==null&&ry(m,P,C,N,!0)}}e:{if(g=c?es(c):window,I=g.nodeName&&g.nodeName.toLowerCase(),I==="select"||I==="input"&&g.type==="file")var j=Mk;else if(Qg(g))if(B0)j=zk;else{j=Fk;var L=Lk}else(I=g.nodeName)&&I.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(j=Uk);if(j&&(j=j(t,c))){z0(m,j,n,f);break e}L&&L(t,g,c),t==="focusout"&&(L=g._wrapperState)&&L.controlled&&g.type==="number"&&ad(g,"number",g.value)}switch(L=c?es(c):window,t){case"focusin":(Qg(L)||L.contentEditable==="true")&&(Xi=L,_d=c,xo=null);break;case"focusout":xo=_d=Xi=null;break;case"mousedown":wd=!0;break;case"contextmenu":case"mouseup":case"dragend":wd=!1,ey(m,n,f);break;case"selectionchange":if(Wk)break;case"keydown":case"keyup":ey(m,n,f)}var T;if(Bf)e:{switch(t){case"compositionstart":var v="onCompositionStart";break e;case"compositionend":v="onCompositionEnd";break e;case"compositionupdate":v="onCompositionUpdate";break e}v=void 0}else Ji?F0(t,n)&&(v="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(v="onCompositionStart");v&&(L0&&n.locale!=="ko"&&(Ji||v!=="onCompositionStart"?v==="onCompositionEnd"&&Ji&&(T=M0()):(Er=f,Ff="value"in Er?Er.value:Er.textContent,Ji=!0)),L=eu(c,v),0<L.length&&(v=new Hg(v,t,null,n,f),m.push({event:v,listeners:L}),T?v.data=T:(T=U0(n),T!==null&&(v.data=T)))),(T=bk?Dk(t,n):Ok(t,n))&&(c=eu(c,"onBeforeInput"),0<c.length&&(f=new Hg("onBeforeInput","beforeinput",null,n,f),m.push({event:f,listeners:c}),f.data=T))}X0(m,e)})}function Ko(t,e,n){return{instance:t,listener:e,currentTarget:n}}function eu(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=zo(t,n),s!=null&&r.unshift(Ko(t,s,i)),s=zo(t,e),s!=null&&r.push(Ko(t,s,i))),t=t.return}return r}function Wi(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function ry(t,e,n,r,i){for(var s=e._reactName,o=[];n!==null&&n!==r;){var l=n,u=l.alternate,c=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&c!==null&&(l=c,i?(u=zo(n,s),u!=null&&o.unshift(Ko(n,u,l))):i||(u=zo(n,s),u!=null&&o.push(Ko(n,u,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var Kk=/\r\n?/g,Qk=/\u0000|\uFFFD/g;function iy(t){return(typeof t=="string"?t:""+t).replace(Kk,`
`).replace(Qk,"")}function hl(t,e,n){if(e=iy(e),iy(t)!==e&&n)throw Error(U(425))}function tu(){}var Ed=null,Td=null;function Id(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var xd=typeof setTimeout=="function"?setTimeout:void 0,Yk=typeof clearTimeout=="function"?clearTimeout:void 0,sy=typeof Promise=="function"?Promise:void 0,Jk=typeof queueMicrotask=="function"?queueMicrotask:typeof sy<"u"?function(t){return sy.resolve(null).then(t).catch(Xk)}:xd;function Xk(t){setTimeout(function(){throw t})}function Th(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),Wo(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Wo(e)}function Ar(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function oy(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Vs=Math.random().toString(36).slice(2),xn="__reactFiber$"+Vs,Qo="__reactProps$"+Vs,Yn="__reactContainer$"+Vs,kd="__reactEvents$"+Vs,Zk="__reactListeners$"+Vs,eS="__reactHandles$"+Vs;function hi(t){var e=t[xn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Yn]||n[xn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=oy(t);t!==null;){if(n=t[xn])return n;t=oy(t)}return e}t=n,n=t.parentNode}return null}function wa(t){return t=t[xn]||t[Yn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function es(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(U(33))}function Qu(t){return t[Qo]||null}var Sd=[],ts=-1;function Jr(t){return{current:t}}function Te(t){0>ts||(t.current=Sd[ts],Sd[ts]=null,ts--)}function ve(t,e){ts++,Sd[ts]=t.current,t.current=e}var zr={},ft=Jr(zr),Rt=Jr(!1),wi=zr;function ws(t,e){var n=t.type.contextTypes;if(!n)return zr;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=e[s];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function Nt(t){return t=t.childContextTypes,t!=null}function nu(){Te(Rt),Te(ft)}function ay(t,e,n){if(ft.current!==zr)throw Error(U(168));ve(ft,e),ve(Rt,n)}function ew(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(U(108,Lx(t)||"Unknown",i));return Ae({},n,r)}function ru(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||zr,wi=ft.current,ve(ft,t),ve(Rt,Rt.current),!0}function ly(t,e,n){var r=t.stateNode;if(!r)throw Error(U(169));n?(t=ew(t,e,wi),r.__reactInternalMemoizedMergedChildContext=t,Te(Rt),Te(ft),ve(ft,t)):Te(Rt),ve(Rt,n)}var zn=null,Yu=!1,Ih=!1;function tw(t){zn===null?zn=[t]:zn.push(t)}function tS(t){Yu=!0,tw(t)}function Xr(){if(!Ih&&zn!==null){Ih=!0;var t=0,e=pe;try{var n=zn;for(pe=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}zn=null,Yu=!1}catch(i){throw zn!==null&&(zn=zn.slice(t+1)),S0(Vf,Xr),i}finally{pe=e,Ih=!1}}return null}var ns=[],rs=0,iu=null,su=0,Gt=[],Kt=0,Ei=null,Bn=1,$n="";function li(t,e){ns[rs++]=su,ns[rs++]=iu,iu=t,su=e}function nw(t,e,n){Gt[Kt++]=Bn,Gt[Kt++]=$n,Gt[Kt++]=Ei,Ei=t;var r=Bn;t=$n;var i=32-mn(r)-1;r&=~(1<<i),n+=1;var s=32-mn(e)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Bn=1<<32-mn(e)+i|n<<i|r,$n=s+t}else Bn=1<<s|n<<i|r,$n=t}function Wf(t){t.return!==null&&(li(t,1),nw(t,1,0))}function Hf(t){for(;t===iu;)iu=ns[--rs],ns[rs]=null,su=ns[--rs],ns[rs]=null;for(;t===Ei;)Ei=Gt[--Kt],Gt[Kt]=null,$n=Gt[--Kt],Gt[Kt]=null,Bn=Gt[--Kt],Gt[Kt]=null}var Ut=null,Lt=null,Ie=!1,hn=null;function rw(t,e){var n=Jt(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function uy(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Ut=t,Lt=Ar(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Ut=t,Lt=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Ei!==null?{id:Bn,overflow:$n}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Jt(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Ut=t,Lt=null,!0):!1;default:return!1}}function Cd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Ad(t){if(Ie){var e=Lt;if(e){var n=e;if(!uy(t,e)){if(Cd(t))throw Error(U(418));e=Ar(n.nextSibling);var r=Ut;e&&uy(t,e)?rw(r,n):(t.flags=t.flags&-4097|2,Ie=!1,Ut=t)}}else{if(Cd(t))throw Error(U(418));t.flags=t.flags&-4097|2,Ie=!1,Ut=t}}}function cy(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Ut=t}function dl(t){if(t!==Ut)return!1;if(!Ie)return cy(t),Ie=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Id(t.type,t.memoizedProps)),e&&(e=Lt)){if(Cd(t))throw iw(),Error(U(418));for(;e;)rw(t,e),e=Ar(e.nextSibling)}if(cy(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(U(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Lt=Ar(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Lt=null}}else Lt=Ut?Ar(t.stateNode.nextSibling):null;return!0}function iw(){for(var t=Lt;t;)t=Ar(t.nextSibling)}function Es(){Lt=Ut=null,Ie=!1}function qf(t){hn===null?hn=[t]:hn.push(t)}var nS=sr.ReactCurrentBatchConfig;function ao(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(U(309));var r=n.stateNode}if(!r)throw Error(U(147,t));var i=r,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var l=i.refs;o===null?delete l[s]:l[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(U(284));if(!n._owner)throw Error(U(290,t))}return t}function fl(t,e){throw t=Object.prototype.toString.call(e),Error(U(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function hy(t){var e=t._init;return e(t._payload)}function sw(t){function e(w,_){if(t){var k=w.deletions;k===null?(w.deletions=[_],w.flags|=16):k.push(_)}}function n(w,_){if(!t)return null;for(;_!==null;)e(w,_),_=_.sibling;return null}function r(w,_){for(w=new Map;_!==null;)_.key!==null?w.set(_.key,_):w.set(_.index,_),_=_.sibling;return w}function i(w,_){return w=br(w,_),w.index=0,w.sibling=null,w}function s(w,_,k){return w.index=k,t?(k=w.alternate,k!==null?(k=k.index,k<_?(w.flags|=2,_):k):(w.flags|=2,_)):(w.flags|=1048576,_)}function o(w){return t&&w.alternate===null&&(w.flags|=2),w}function l(w,_,k,b){return _===null||_.tag!==6?(_=Nh(k,w.mode,b),_.return=w,_):(_=i(_,k),_.return=w,_)}function u(w,_,k,b){var j=k.type;return j===Yi?f(w,_,k.props.children,b,k.key):_!==null&&(_.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===fr&&hy(j)===_.type)?(b=i(_,k.props),b.ref=ao(w,_,k),b.return=w,b):(b=jl(k.type,k.key,k.props,null,w.mode,b),b.ref=ao(w,_,k),b.return=w,b)}function c(w,_,k,b){return _===null||_.tag!==4||_.stateNode.containerInfo!==k.containerInfo||_.stateNode.implementation!==k.implementation?(_=Ph(k,w.mode,b),_.return=w,_):(_=i(_,k.children||[]),_.return=w,_)}function f(w,_,k,b,j){return _===null||_.tag!==7?(_=yi(k,w.mode,b,j),_.return=w,_):(_=i(_,k),_.return=w,_)}function m(w,_,k){if(typeof _=="string"&&_!==""||typeof _=="number")return _=Nh(""+_,w.mode,k),_.return=w,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case nl:return k=jl(_.type,_.key,_.props,null,w.mode,k),k.ref=ao(w,null,_),k.return=w,k;case Qi:return _=Ph(_,w.mode,k),_.return=w,_;case fr:var b=_._init;return m(w,b(_._payload),k)}if(ho(_)||no(_))return _=yi(_,w.mode,k,null),_.return=w,_;fl(w,_)}return null}function g(w,_,k,b){var j=_!==null?_.key:null;if(typeof k=="string"&&k!==""||typeof k=="number")return j!==null?null:l(w,_,""+k,b);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case nl:return k.key===j?u(w,_,k,b):null;case Qi:return k.key===j?c(w,_,k,b):null;case fr:return j=k._init,g(w,_,j(k._payload),b)}if(ho(k)||no(k))return j!==null?null:f(w,_,k,b,null);fl(w,k)}return null}function I(w,_,k,b,j){if(typeof b=="string"&&b!==""||typeof b=="number")return w=w.get(k)||null,l(_,w,""+b,j);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case nl:return w=w.get(b.key===null?k:b.key)||null,u(_,w,b,j);case Qi:return w=w.get(b.key===null?k:b.key)||null,c(_,w,b,j);case fr:var L=b._init;return I(w,_,k,L(b._payload),j)}if(ho(b)||no(b))return w=w.get(k)||null,f(_,w,b,j,null);fl(_,b)}return null}function C(w,_,k,b){for(var j=null,L=null,T=_,v=_=0,E=null;T!==null&&v<k.length;v++){T.index>v?(E=T,T=null):E=T.sibling;var S=g(w,T,k[v],b);if(S===null){T===null&&(T=E);break}t&&T&&S.alternate===null&&e(w,T),_=s(S,_,v),L===null?j=S:L.sibling=S,L=S,T=E}if(v===k.length)return n(w,T),Ie&&li(w,v),j;if(T===null){for(;v<k.length;v++)T=m(w,k[v],b),T!==null&&(_=s(T,_,v),L===null?j=T:L.sibling=T,L=T);return Ie&&li(w,v),j}for(T=r(w,T);v<k.length;v++)E=I(T,w,v,k[v],b),E!==null&&(t&&E.alternate!==null&&T.delete(E.key===null?v:E.key),_=s(E,_,v),L===null?j=E:L.sibling=E,L=E);return t&&T.forEach(function(R){return e(w,R)}),Ie&&li(w,v),j}function N(w,_,k,b){var j=no(k);if(typeof j!="function")throw Error(U(150));if(k=j.call(k),k==null)throw Error(U(151));for(var L=j=null,T=_,v=_=0,E=null,S=k.next();T!==null&&!S.done;v++,S=k.next()){T.index>v?(E=T,T=null):E=T.sibling;var R=g(w,T,S.value,b);if(R===null){T===null&&(T=E);break}t&&T&&R.alternate===null&&e(w,T),_=s(R,_,v),L===null?j=R:L.sibling=R,L=R,T=E}if(S.done)return n(w,T),Ie&&li(w,v),j;if(T===null){for(;!S.done;v++,S=k.next())S=m(w,S.value,b),S!==null&&(_=s(S,_,v),L===null?j=S:L.sibling=S,L=S);return Ie&&li(w,v),j}for(T=r(w,T);!S.done;v++,S=k.next())S=I(T,w,v,S.value,b),S!==null&&(t&&S.alternate!==null&&T.delete(S.key===null?v:S.key),_=s(S,_,v),L===null?j=S:L.sibling=S,L=S);return t&&T.forEach(function(A){return e(w,A)}),Ie&&li(w,v),j}function P(w,_,k,b){if(typeof k=="object"&&k!==null&&k.type===Yi&&k.key===null&&(k=k.props.children),typeof k=="object"&&k!==null){switch(k.$$typeof){case nl:e:{for(var j=k.key,L=_;L!==null;){if(L.key===j){if(j=k.type,j===Yi){if(L.tag===7){n(w,L.sibling),_=i(L,k.props.children),_.return=w,w=_;break e}}else if(L.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===fr&&hy(j)===L.type){n(w,L.sibling),_=i(L,k.props),_.ref=ao(w,L,k),_.return=w,w=_;break e}n(w,L);break}else e(w,L);L=L.sibling}k.type===Yi?(_=yi(k.props.children,w.mode,b,k.key),_.return=w,w=_):(b=jl(k.type,k.key,k.props,null,w.mode,b),b.ref=ao(w,_,k),b.return=w,w=b)}return o(w);case Qi:e:{for(L=k.key;_!==null;){if(_.key===L)if(_.tag===4&&_.stateNode.containerInfo===k.containerInfo&&_.stateNode.implementation===k.implementation){n(w,_.sibling),_=i(_,k.children||[]),_.return=w,w=_;break e}else{n(w,_);break}else e(w,_);_=_.sibling}_=Ph(k,w.mode,b),_.return=w,w=_}return o(w);case fr:return L=k._init,P(w,_,L(k._payload),b)}if(ho(k))return C(w,_,k,b);if(no(k))return N(w,_,k,b);fl(w,k)}return typeof k=="string"&&k!==""||typeof k=="number"?(k=""+k,_!==null&&_.tag===6?(n(w,_.sibling),_=i(_,k),_.return=w,w=_):(n(w,_),_=Nh(k,w.mode,b),_.return=w,w=_),o(w)):n(w,_)}return P}var Ts=sw(!0),ow=sw(!1),ou=Jr(null),au=null,is=null,Gf=null;function Kf(){Gf=is=au=null}function Qf(t){var e=ou.current;Te(ou),t._currentValue=e}function Rd(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function ds(t,e){au=t,Gf=is=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(At=!0),t.firstContext=null)}function en(t){var e=t._currentValue;if(Gf!==t)if(t={context:t,memoizedValue:e,next:null},is===null){if(au===null)throw Error(U(308));is=t,au.dependencies={lanes:0,firstContext:t}}else is=is.next=t;return e}var di=null;function Yf(t){di===null?di=[t]:di.push(t)}function aw(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,Yf(e)):(n.next=i.next,i.next=n),e.interleaved=n,Jn(t,r)}function Jn(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var pr=!1;function Jf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function lw(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function qn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Rr(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,ue&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,Jn(t,n)}return i=r.interleaved,i===null?(e.next=e,Yf(r)):(e.next=i.next,i.next=e),r.interleaved=e,Jn(t,n)}function Nl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,jf(t,n)}}function dy(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=e:s=s.next=e}else i=s=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function lu(t,e,n,r){var i=t.updateQueue;pr=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var u=l,c=u.next;u.next=null,o===null?s=c:o.next=c,o=u;var f=t.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==o&&(l===null?f.firstBaseUpdate=c:l.next=c,f.lastBaseUpdate=u))}if(s!==null){var m=i.baseState;o=0,f=c=u=null,l=s;do{var g=l.lane,I=l.eventTime;if((r&g)===g){f!==null&&(f=f.next={eventTime:I,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var C=t,N=l;switch(g=e,I=n,N.tag){case 1:if(C=N.payload,typeof C=="function"){m=C.call(I,m,g);break e}m=C;break e;case 3:C.flags=C.flags&-65537|128;case 0:if(C=N.payload,g=typeof C=="function"?C.call(I,m,g):C,g==null)break e;m=Ae({},m,g);break e;case 2:pr=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,g=i.effects,g===null?i.effects=[l]:g.push(l))}else I={eventTime:I,lane:g,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(c=f=I,u=m):f=f.next=I,o|=g;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;g=l,l=g.next,g.next=null,i.lastBaseUpdate=g,i.shared.pending=null}}while(!0);if(f===null&&(u=m),i.baseState=u,i.firstBaseUpdate=c,i.lastBaseUpdate=f,e=i.shared.interleaved,e!==null){i=e;do o|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);Ii|=o,t.lanes=o,t.memoizedState=m}}function fy(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(U(191,i));i.call(r)}}}var Ea={},Sn=Jr(Ea),Yo=Jr(Ea),Jo=Jr(Ea);function fi(t){if(t===Ea)throw Error(U(174));return t}function Xf(t,e){switch(ve(Jo,e),ve(Yo,t),ve(Sn,Ea),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:ud(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=ud(e,t)}Te(Sn),ve(Sn,e)}function Is(){Te(Sn),Te(Yo),Te(Jo)}function uw(t){fi(Jo.current);var e=fi(Sn.current),n=ud(e,t.type);e!==n&&(ve(Yo,t),ve(Sn,n))}function Zf(t){Yo.current===t&&(Te(Sn),Te(Yo))}var ke=Jr(0);function uu(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var xh=[];function ep(){for(var t=0;t<xh.length;t++)xh[t]._workInProgressVersionPrimary=null;xh.length=0}var Pl=sr.ReactCurrentDispatcher,kh=sr.ReactCurrentBatchConfig,Ti=0,Se=null,ze=null,qe=null,cu=!1,ko=!1,Xo=0,rS=0;function at(){throw Error(U(321))}function tp(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!yn(t[n],e[n]))return!1;return!0}function np(t,e,n,r,i,s){if(Ti=s,Se=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Pl.current=t===null||t.memoizedState===null?aS:lS,t=n(r,i),ko){s=0;do{if(ko=!1,Xo=0,25<=s)throw Error(U(301));s+=1,qe=ze=null,e.updateQueue=null,Pl.current=uS,t=n(r,i)}while(ko)}if(Pl.current=hu,e=ze!==null&&ze.next!==null,Ti=0,qe=ze=Se=null,cu=!1,e)throw Error(U(300));return t}function rp(){var t=Xo!==0;return Xo=0,t}function Tn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return qe===null?Se.memoizedState=qe=t:qe=qe.next=t,qe}function tn(){if(ze===null){var t=Se.alternate;t=t!==null?t.memoizedState:null}else t=ze.next;var e=qe===null?Se.memoizedState:qe.next;if(e!==null)qe=e,ze=t;else{if(t===null)throw Error(U(310));ze=t,t={memoizedState:ze.memoizedState,baseState:ze.baseState,baseQueue:ze.baseQueue,queue:ze.queue,next:null},qe===null?Se.memoizedState=qe=t:qe=qe.next=t}return qe}function Zo(t,e){return typeof e=="function"?e(t):e}function Sh(t){var e=tn(),n=e.queue;if(n===null)throw Error(U(311));n.lastRenderedReducer=t;var r=ze,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var l=o=null,u=null,c=s;do{var f=c.lane;if((Ti&f)===f)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:t(r,c.action);else{var m={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(l=u=m,o=r):u=u.next=m,Se.lanes|=f,Ii|=f}c=c.next}while(c!==null&&c!==s);u===null?o=r:u.next=l,yn(r,e.memoizedState)||(At=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do s=i.lane,Se.lanes|=s,Ii|=s,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Ch(t){var e=tn(),n=e.queue;if(n===null)throw Error(U(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,s=e.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=t(s,o.action),o=o.next;while(o!==i);yn(s,e.memoizedState)||(At=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,r]}function cw(){}function hw(t,e){var n=Se,r=tn(),i=e(),s=!yn(r.memoizedState,i);if(s&&(r.memoizedState=i,At=!0),r=r.queue,ip(pw.bind(null,n,r,t),[t]),r.getSnapshot!==e||s||qe!==null&&qe.memoizedState.tag&1){if(n.flags|=2048,ea(9,fw.bind(null,n,r,i,e),void 0,null),Ge===null)throw Error(U(349));Ti&30||dw(n,e,i)}return i}function dw(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Se.updateQueue,e===null?(e={lastEffect:null,stores:null},Se.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function fw(t,e,n,r){e.value=n,e.getSnapshot=r,mw(e)&&gw(t)}function pw(t,e,n){return n(function(){mw(e)&&gw(t)})}function mw(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!yn(t,n)}catch{return!0}}function gw(t){var e=Jn(t,1);e!==null&&gn(e,t,1,-1)}function py(t){var e=Tn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Zo,lastRenderedState:t},e.queue=t,t=t.dispatch=oS.bind(null,Se,t),[e.memoizedState,t]}function ea(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=Se.updateQueue,e===null?(e={lastEffect:null,stores:null},Se.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function yw(){return tn().memoizedState}function bl(t,e,n,r){var i=Tn();Se.flags|=t,i.memoizedState=ea(1|e,n,void 0,r===void 0?null:r)}function Ju(t,e,n,r){var i=tn();r=r===void 0?null:r;var s=void 0;if(ze!==null){var o=ze.memoizedState;if(s=o.destroy,r!==null&&tp(r,o.deps)){i.memoizedState=ea(e,n,s,r);return}}Se.flags|=t,i.memoizedState=ea(1|e,n,s,r)}function my(t,e){return bl(8390656,8,t,e)}function ip(t,e){return Ju(2048,8,t,e)}function vw(t,e){return Ju(4,2,t,e)}function _w(t,e){return Ju(4,4,t,e)}function ww(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Ew(t,e,n){return n=n!=null?n.concat([t]):null,Ju(4,4,ww.bind(null,e,t),n)}function sp(){}function Tw(t,e){var n=tn();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&tp(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function Iw(t,e){var n=tn();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&tp(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function xw(t,e,n){return Ti&21?(yn(n,e)||(n=R0(),Se.lanes|=n,Ii|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,At=!0),t.memoizedState=n)}function iS(t,e){var n=pe;pe=n!==0&&4>n?n:4,t(!0);var r=kh.transition;kh.transition={};try{t(!1),e()}finally{pe=n,kh.transition=r}}function kw(){return tn().memoizedState}function sS(t,e,n){var r=Pr(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Sw(t))Cw(e,n);else if(n=aw(t,e,n,r),n!==null){var i=_t();gn(n,t,r,i),Aw(n,e,r)}}function oS(t,e,n){var r=Pr(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Sw(t))Cw(e,i);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,l=s(o,n);if(i.hasEagerState=!0,i.eagerState=l,yn(l,o)){var u=e.interleaved;u===null?(i.next=i,Yf(e)):(i.next=u.next,u.next=i),e.interleaved=i;return}}catch{}finally{}n=aw(t,e,i,r),n!==null&&(i=_t(),gn(n,t,r,i),Aw(n,e,r))}}function Sw(t){var e=t.alternate;return t===Se||e!==null&&e===Se}function Cw(t,e){ko=cu=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Aw(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,jf(t,n)}}var hu={readContext:en,useCallback:at,useContext:at,useEffect:at,useImperativeHandle:at,useInsertionEffect:at,useLayoutEffect:at,useMemo:at,useReducer:at,useRef:at,useState:at,useDebugValue:at,useDeferredValue:at,useTransition:at,useMutableSource:at,useSyncExternalStore:at,useId:at,unstable_isNewReconciler:!1},aS={readContext:en,useCallback:function(t,e){return Tn().memoizedState=[t,e===void 0?null:e],t},useContext:en,useEffect:my,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,bl(4194308,4,ww.bind(null,e,t),n)},useLayoutEffect:function(t,e){return bl(4194308,4,t,e)},useInsertionEffect:function(t,e){return bl(4,2,t,e)},useMemo:function(t,e){var n=Tn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=Tn();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=sS.bind(null,Se,t),[r.memoizedState,t]},useRef:function(t){var e=Tn();return t={current:t},e.memoizedState=t},useState:py,useDebugValue:sp,useDeferredValue:function(t){return Tn().memoizedState=t},useTransition:function(){var t=py(!1),e=t[0];return t=iS.bind(null,t[1]),Tn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=Se,i=Tn();if(Ie){if(n===void 0)throw Error(U(407));n=n()}else{if(n=e(),Ge===null)throw Error(U(349));Ti&30||dw(r,e,n)}i.memoizedState=n;var s={value:n,getSnapshot:e};return i.queue=s,my(pw.bind(null,r,s,t),[t]),r.flags|=2048,ea(9,fw.bind(null,r,s,n,e),void 0,null),n},useId:function(){var t=Tn(),e=Ge.identifierPrefix;if(Ie){var n=$n,r=Bn;n=(r&~(1<<32-mn(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=Xo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=rS++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},lS={readContext:en,useCallback:Tw,useContext:en,useEffect:ip,useImperativeHandle:Ew,useInsertionEffect:vw,useLayoutEffect:_w,useMemo:Iw,useReducer:Sh,useRef:yw,useState:function(){return Sh(Zo)},useDebugValue:sp,useDeferredValue:function(t){var e=tn();return xw(e,ze.memoizedState,t)},useTransition:function(){var t=Sh(Zo)[0],e=tn().memoizedState;return[t,e]},useMutableSource:cw,useSyncExternalStore:hw,useId:kw,unstable_isNewReconciler:!1},uS={readContext:en,useCallback:Tw,useContext:en,useEffect:ip,useImperativeHandle:Ew,useInsertionEffect:vw,useLayoutEffect:_w,useMemo:Iw,useReducer:Ch,useRef:yw,useState:function(){return Ch(Zo)},useDebugValue:sp,useDeferredValue:function(t){var e=tn();return ze===null?e.memoizedState=t:xw(e,ze.memoizedState,t)},useTransition:function(){var t=Ch(Zo)[0],e=tn().memoizedState;return[t,e]},useMutableSource:cw,useSyncExternalStore:hw,useId:kw,unstable_isNewReconciler:!1};function ln(t,e){if(t&&t.defaultProps){e=Ae({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Nd(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:Ae({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Xu={isMounted:function(t){return(t=t._reactInternals)?Di(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=_t(),i=Pr(t),s=qn(r,i);s.payload=e,n!=null&&(s.callback=n),e=Rr(t,s,i),e!==null&&(gn(e,t,i,r),Nl(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=_t(),i=Pr(t),s=qn(r,i);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Rr(t,s,i),e!==null&&(gn(e,t,i,r),Nl(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=_t(),r=Pr(t),i=qn(n,r);i.tag=2,e!=null&&(i.callback=e),e=Rr(t,i,r),e!==null&&(gn(e,t,r,n),Nl(e,t,r))}};function gy(t,e,n,r,i,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,s,o):e.prototype&&e.prototype.isPureReactComponent?!qo(n,r)||!qo(i,s):!0}function Rw(t,e,n){var r=!1,i=zr,s=e.contextType;return typeof s=="object"&&s!==null?s=en(s):(i=Nt(e)?wi:ft.current,r=e.contextTypes,s=(r=r!=null)?ws(t,i):zr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Xu,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=s),e}function yy(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&Xu.enqueueReplaceState(e,e.state,null)}function Pd(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},Jf(t);var s=e.contextType;typeof s=="object"&&s!==null?i.context=en(s):(s=Nt(e)?wi:ft.current,i.context=ws(t,s)),i.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Nd(t,e,s,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&Xu.enqueueReplaceState(i,i.state,null),lu(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function xs(t,e){try{var n="",r=e;do n+=Mx(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:i,digest:null}}function Ah(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function bd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var cS=typeof WeakMap=="function"?WeakMap:Map;function Nw(t,e,n){n=qn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){fu||(fu=!0,Bd=r),bd(t,e)},n}function Pw(t,e,n){n=qn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){bd(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){bd(t,e),typeof r!="function"&&(Nr===null?Nr=new Set([this]):Nr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function vy(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new cS;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=xS.bind(null,t,e,n),e.then(t,t))}function _y(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function wy(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=qn(-1,1),e.tag=2,Rr(n,e,1))),n.lanes|=1),t)}var hS=sr.ReactCurrentOwner,At=!1;function vt(t,e,n,r){e.child=t===null?ow(e,null,n,r):Ts(e,t.child,n,r)}function Ey(t,e,n,r,i){n=n.render;var s=e.ref;return ds(e,i),r=np(t,e,n,r,s,i),n=rp(),t!==null&&!At?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Xn(t,e,i)):(Ie&&n&&Wf(e),e.flags|=1,vt(t,e,r,i),e.child)}function Ty(t,e,n,r,i){if(t===null){var s=n.type;return typeof s=="function"&&!fp(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,bw(t,e,s,r,i)):(t=jl(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:qo,n(o,r)&&t.ref===e.ref)return Xn(t,e,i)}return e.flags|=1,t=br(s,r),t.ref=e.ref,t.return=e,e.child=t}function bw(t,e,n,r,i){if(t!==null){var s=t.memoizedProps;if(qo(s,r)&&t.ref===e.ref)if(At=!1,e.pendingProps=r=s,(t.lanes&i)!==0)t.flags&131072&&(At=!0);else return e.lanes=t.lanes,Xn(t,e,i)}return Dd(t,e,n,r,i)}function Dw(t,e,n){var r=e.pendingProps,i=r.children,s=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ve(os,Mt),Mt|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ve(os,Mt),Mt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,ve(os,Mt),Mt|=r}else s!==null?(r=s.baseLanes|n,e.memoizedState=null):r=n,ve(os,Mt),Mt|=r;return vt(t,e,i,n),e.child}function Ow(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Dd(t,e,n,r,i){var s=Nt(n)?wi:ft.current;return s=ws(e,s),ds(e,i),n=np(t,e,n,r,s,i),r=rp(),t!==null&&!At?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Xn(t,e,i)):(Ie&&r&&Wf(e),e.flags|=1,vt(t,e,n,i),e.child)}function Iy(t,e,n,r,i){if(Nt(n)){var s=!0;ru(e)}else s=!1;if(ds(e,i),e.stateNode===null)Dl(t,e),Rw(e,n,r),Pd(e,n,r,i),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var u=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=en(c):(c=Nt(n)?wi:ft.current,c=ws(e,c));var f=n.getDerivedStateFromProps,m=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";m||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||u!==c)&&yy(e,o,r,c),pr=!1;var g=e.memoizedState;o.state=g,lu(e,r,o,i),u=e.memoizedState,l!==r||g!==u||Rt.current||pr?(typeof f=="function"&&(Nd(e,n,f,r),u=e.memoizedState),(l=pr||gy(e,n,l,r,g,u,c))?(m||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=c,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,lw(t,e),l=e.memoizedProps,c=e.type===e.elementType?l:ln(e.type,l),o.props=c,m=e.pendingProps,g=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=en(u):(u=Nt(n)?wi:ft.current,u=ws(e,u));var I=n.getDerivedStateFromProps;(f=typeof I=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==m||g!==u)&&yy(e,o,r,u),pr=!1,g=e.memoizedState,o.state=g,lu(e,r,o,i);var C=e.memoizedState;l!==m||g!==C||Rt.current||pr?(typeof I=="function"&&(Nd(e,n,I,r),C=e.memoizedState),(c=pr||gy(e,n,c,r,g,C,u)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,C,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,C,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=C),o.props=r,o.state=C,o.context=u,r=c):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),r=!1)}return Od(t,e,n,r,s,i)}function Od(t,e,n,r,i,s){Ow(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return i&&ly(e,n,!1),Xn(t,e,s);r=e.stateNode,hS.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=Ts(e,t.child,null,s),e.child=Ts(e,null,l,s)):vt(t,e,l,s),e.memoizedState=r.state,i&&ly(e,n,!0),e.child}function Vw(t){var e=t.stateNode;e.pendingContext?ay(t,e.pendingContext,e.pendingContext!==e.context):e.context&&ay(t,e.context,!1),Xf(t,e.containerInfo)}function xy(t,e,n,r,i){return Es(),qf(i),e.flags|=256,vt(t,e,n,r),e.child}var Vd={dehydrated:null,treeContext:null,retryLane:0};function jd(t){return{baseLanes:t,cachePool:null,transitions:null}}function jw(t,e,n){var r=e.pendingProps,i=ke.current,s=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(i&2)!==0),l?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),ve(ke,i&1),t===null)return Ad(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,s?(r=e.mode,s=e.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=tc(o,r,0,null),t=yi(t,r,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=jd(n),e.memoizedState=Vd,t):op(e,o));if(i=t.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return dS(t,e,o,r,l,i,n);if(s){s=r.fallback,o=e.mode,i=t.child,l=i.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=br(i,u),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?s=br(l,s):(s=yi(s,o,n,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,o=t.child.memoizedState,o=o===null?jd(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=Vd,r}return s=t.child,t=s.sibling,r=br(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function op(t,e){return e=tc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function pl(t,e,n,r){return r!==null&&qf(r),Ts(e,t.child,null,n),t=op(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function dS(t,e,n,r,i,s,o){if(n)return e.flags&256?(e.flags&=-257,r=Ah(Error(U(422))),pl(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=tc({mode:"visible",children:r.children},i,0,null),s=yi(s,i,o,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&Ts(e,t.child,null,o),e.child.memoizedState=jd(o),e.memoizedState=Vd,s);if(!(e.mode&1))return pl(t,e,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,s=Error(U(419)),r=Ah(s,r,void 0),pl(t,e,o,r)}if(l=(o&t.childLanes)!==0,At||l){if(r=Ge,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,Jn(t,i),gn(r,t,i,-1))}return dp(),r=Ah(Error(U(421))),pl(t,e,o,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=kS.bind(null,t),i._reactRetry=e,null):(t=s.treeContext,Lt=Ar(i.nextSibling),Ut=e,Ie=!0,hn=null,t!==null&&(Gt[Kt++]=Bn,Gt[Kt++]=$n,Gt[Kt++]=Ei,Bn=t.id,$n=t.overflow,Ei=e),e=op(e,r.children),e.flags|=4096,e)}function ky(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Rd(t.return,e,n)}function Rh(t,e,n,r,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function Mw(t,e,n){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(vt(t,e,r.children,n),r=ke.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&ky(t,n,e);else if(t.tag===19)ky(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(ve(ke,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&uu(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),Rh(e,!1,i,n,s);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&uu(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}Rh(e,!0,n,null,s);break;case"together":Rh(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Dl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Xn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Ii|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(U(153));if(e.child!==null){for(t=e.child,n=br(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=br(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function fS(t,e,n){switch(e.tag){case 3:Vw(e),Es();break;case 5:uw(e);break;case 1:Nt(e.type)&&ru(e);break;case 4:Xf(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;ve(ou,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(ve(ke,ke.current&1),e.flags|=128,null):n&e.child.childLanes?jw(t,e,n):(ve(ke,ke.current&1),t=Xn(t,e,n),t!==null?t.sibling:null);ve(ke,ke.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return Mw(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),ve(ke,ke.current),r)break;return null;case 22:case 23:return e.lanes=0,Dw(t,e,n)}return Xn(t,e,n)}var Lw,Md,Fw,Uw;Lw=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Md=function(){};Fw=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,fi(Sn.current);var s=null;switch(n){case"input":i=sd(t,i),r=sd(t,r),s=[];break;case"select":i=Ae({},i,{value:void 0}),r=Ae({},r,{value:void 0}),s=[];break;case"textarea":i=ld(t,i),r=ld(t,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=tu)}cd(n,r);var o;n=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var l=i[c];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Fo.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in r){var u=r[c];if(l=i!=null?i[c]:void 0,r.hasOwnProperty(c)&&u!==l&&(u!=null||l!=null))if(c==="style")if(l){for(o in l)!l.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&l[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(s||(s=[]),s.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(s=s||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(s=s||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Fo.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&we("scroll",t),s||l===u||(s=[])):(s=s||[]).push(c,u))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};Uw=function(t,e,n,r){n!==r&&(e.flags|=4)};function lo(t,e){if(!Ie)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function lt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function pS(t,e,n){var r=e.pendingProps;switch(Hf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return lt(e),null;case 1:return Nt(e.type)&&nu(),lt(e),null;case 3:return r=e.stateNode,Is(),Te(Rt),Te(ft),ep(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(dl(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,hn!==null&&(Hd(hn),hn=null))),Md(t,e),lt(e),null;case 5:Zf(e);var i=fi(Jo.current);if(n=e.type,t!==null&&e.stateNode!=null)Fw(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(U(166));return lt(e),null}if(t=fi(Sn.current),dl(e)){r=e.stateNode,n=e.type;var s=e.memoizedProps;switch(r[xn]=e,r[Qo]=s,t=(e.mode&1)!==0,n){case"dialog":we("cancel",r),we("close",r);break;case"iframe":case"object":case"embed":we("load",r);break;case"video":case"audio":for(i=0;i<po.length;i++)we(po[i],r);break;case"source":we("error",r);break;case"img":case"image":case"link":we("error",r),we("load",r);break;case"details":we("toggle",r);break;case"input":Og(r,s),we("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},we("invalid",r);break;case"textarea":jg(r,s),we("invalid",r)}cd(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var l=s[o];o==="children"?typeof l=="string"?r.textContent!==l&&(s.suppressHydrationWarning!==!0&&hl(r.textContent,l,t),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(s.suppressHydrationWarning!==!0&&hl(r.textContent,l,t),i=["children",""+l]):Fo.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&we("scroll",r)}switch(n){case"input":rl(r),Vg(r,s,!0);break;case"textarea":rl(r),Mg(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=tu)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=p0(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[xn]=e,t[Qo]=r,Lw(t,e,!1,!1),e.stateNode=t;e:{switch(o=hd(n,r),n){case"dialog":we("cancel",t),we("close",t),i=r;break;case"iframe":case"object":case"embed":we("load",t),i=r;break;case"video":case"audio":for(i=0;i<po.length;i++)we(po[i],t);i=r;break;case"source":we("error",t),i=r;break;case"img":case"image":case"link":we("error",t),we("load",t),i=r;break;case"details":we("toggle",t),i=r;break;case"input":Og(t,r),i=sd(t,r),we("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=Ae({},r,{value:void 0}),we("invalid",t);break;case"textarea":jg(t,r),i=ld(t,r),we("invalid",t);break;default:i=r}cd(n,i),l=i;for(s in l)if(l.hasOwnProperty(s)){var u=l[s];s==="style"?y0(t,u):s==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&m0(t,u)):s==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&Uo(t,u):typeof u=="number"&&Uo(t,""+u):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Fo.hasOwnProperty(s)?u!=null&&s==="onScroll"&&we("scroll",t):u!=null&&Nf(t,s,u,o))}switch(n){case"input":rl(t),Vg(t,r,!1);break;case"textarea":rl(t),Mg(t);break;case"option":r.value!=null&&t.setAttribute("value",""+Ur(r.value));break;case"select":t.multiple=!!r.multiple,s=r.value,s!=null?ls(t,!!r.multiple,s,!1):r.defaultValue!=null&&ls(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=tu)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return lt(e),null;case 6:if(t&&e.stateNode!=null)Uw(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(U(166));if(n=fi(Jo.current),fi(Sn.current),dl(e)){if(r=e.stateNode,n=e.memoizedProps,r[xn]=e,(s=r.nodeValue!==n)&&(t=Ut,t!==null))switch(t.tag){case 3:hl(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&hl(r.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[xn]=e,e.stateNode=r}return lt(e),null;case 13:if(Te(ke),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ie&&Lt!==null&&e.mode&1&&!(e.flags&128))iw(),Es(),e.flags|=98560,s=!1;else if(s=dl(e),r!==null&&r.dehydrated!==null){if(t===null){if(!s)throw Error(U(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(U(317));s[xn]=e}else Es(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;lt(e),s=!1}else hn!==null&&(Hd(hn),hn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||ke.current&1?Be===0&&(Be=3):dp())),e.updateQueue!==null&&(e.flags|=4),lt(e),null);case 4:return Is(),Md(t,e),t===null&&Go(e.stateNode.containerInfo),lt(e),null;case 10:return Qf(e.type._context),lt(e),null;case 17:return Nt(e.type)&&nu(),lt(e),null;case 19:if(Te(ke),s=e.memoizedState,s===null)return lt(e),null;if(r=(e.flags&128)!==0,o=s.rendering,o===null)if(r)lo(s,!1);else{if(Be!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=uu(t),o!==null){for(e.flags|=128,lo(s,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)s=n,t=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ve(ke,ke.current&1|2),e.child}t=t.sibling}s.tail!==null&&Oe()>ks&&(e.flags|=128,r=!0,lo(s,!1),e.lanes=4194304)}else{if(!r)if(t=uu(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),lo(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!Ie)return lt(e),null}else 2*Oe()-s.renderingStartTime>ks&&n!==1073741824&&(e.flags|=128,r=!0,lo(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Oe(),e.sibling=null,n=ke.current,ve(ke,r?n&1|2:n&1),e):(lt(e),null);case 22:case 23:return hp(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Mt&1073741824&&(lt(e),e.subtreeFlags&6&&(e.flags|=8192)):lt(e),null;case 24:return null;case 25:return null}throw Error(U(156,e.tag))}function mS(t,e){switch(Hf(e),e.tag){case 1:return Nt(e.type)&&nu(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Is(),Te(Rt),Te(ft),ep(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Zf(e),null;case 13:if(Te(ke),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(U(340));Es()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Te(ke),null;case 4:return Is(),null;case 10:return Qf(e.type._context),null;case 22:case 23:return hp(),null;case 24:return null;default:return null}}var ml=!1,ht=!1,gS=typeof WeakSet=="function"?WeakSet:Set,q=null;function ss(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Pe(t,e,r)}else n.current=null}function Ld(t,e,n){try{n()}catch(r){Pe(t,e,r)}}var Sy=!1;function yS(t,e){if(Ed=Xl,t=H0(),$f(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,l=-1,u=-1,c=0,f=0,m=t,g=null;t:for(;;){for(var I;m!==n||i!==0&&m.nodeType!==3||(l=o+i),m!==s||r!==0&&m.nodeType!==3||(u=o+r),m.nodeType===3&&(o+=m.nodeValue.length),(I=m.firstChild)!==null;)g=m,m=I;for(;;){if(m===t)break t;if(g===n&&++c===i&&(l=o),g===s&&++f===r&&(u=o),(I=m.nextSibling)!==null)break;m=g,g=m.parentNode}m=I}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Td={focusedElem:t,selectionRange:n},Xl=!1,q=e;q!==null;)if(e=q,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,q=t;else for(;q!==null;){e=q;try{var C=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(C!==null){var N=C.memoizedProps,P=C.memoizedState,w=e.stateNode,_=w.getSnapshotBeforeUpdate(e.elementType===e.type?N:ln(e.type,N),P);w.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var k=e.stateNode.containerInfo;k.nodeType===1?k.textContent="":k.nodeType===9&&k.documentElement&&k.removeChild(k.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(U(163))}}catch(b){Pe(e,e.return,b)}if(t=e.sibling,t!==null){t.return=e.return,q=t;break}q=e.return}return C=Sy,Sy=!1,C}function So(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var s=i.destroy;i.destroy=void 0,s!==void 0&&Ld(e,n,s)}i=i.next}while(i!==r)}}function Zu(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function Fd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function zw(t){var e=t.alternate;e!==null&&(t.alternate=null,zw(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[xn],delete e[Qo],delete e[kd],delete e[Zk],delete e[eS])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Bw(t){return t.tag===5||t.tag===3||t.tag===4}function Cy(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Bw(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Ud(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=tu));else if(r!==4&&(t=t.child,t!==null))for(Ud(t,e,n),t=t.sibling;t!==null;)Ud(t,e,n),t=t.sibling}function zd(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(zd(t,e,n),t=t.sibling;t!==null;)zd(t,e,n),t=t.sibling}var Ye=null,un=!1;function hr(t,e,n){for(n=n.child;n!==null;)$w(t,e,n),n=n.sibling}function $w(t,e,n){if(kn&&typeof kn.onCommitFiberUnmount=="function")try{kn.onCommitFiberUnmount(Hu,n)}catch{}switch(n.tag){case 5:ht||ss(n,e);case 6:var r=Ye,i=un;Ye=null,hr(t,e,n),Ye=r,un=i,Ye!==null&&(un?(t=Ye,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Ye.removeChild(n.stateNode));break;case 18:Ye!==null&&(un?(t=Ye,n=n.stateNode,t.nodeType===8?Th(t.parentNode,n):t.nodeType===1&&Th(t,n),Wo(t)):Th(Ye,n.stateNode));break;case 4:r=Ye,i=un,Ye=n.stateNode.containerInfo,un=!0,hr(t,e,n),Ye=r,un=i;break;case 0:case 11:case 14:case 15:if(!ht&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Ld(n,e,o),i=i.next}while(i!==r)}hr(t,e,n);break;case 1:if(!ht&&(ss(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){Pe(n,e,l)}hr(t,e,n);break;case 21:hr(t,e,n);break;case 22:n.mode&1?(ht=(r=ht)||n.memoizedState!==null,hr(t,e,n),ht=r):hr(t,e,n);break;default:hr(t,e,n)}}function Ay(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new gS),e.forEach(function(r){var i=SS.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function an(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:Ye=l.stateNode,un=!1;break e;case 3:Ye=l.stateNode.containerInfo,un=!0;break e;case 4:Ye=l.stateNode.containerInfo,un=!0;break e}l=l.return}if(Ye===null)throw Error(U(160));$w(s,o,i),Ye=null,un=!1;var u=i.alternate;u!==null&&(u.return=null),i.return=null}catch(c){Pe(i,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Ww(e,t),e=e.sibling}function Ww(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(an(e,t),En(t),r&4){try{So(3,t,t.return),Zu(3,t)}catch(N){Pe(t,t.return,N)}try{So(5,t,t.return)}catch(N){Pe(t,t.return,N)}}break;case 1:an(e,t),En(t),r&512&&n!==null&&ss(n,n.return);break;case 5:if(an(e,t),En(t),r&512&&n!==null&&ss(n,n.return),t.flags&32){var i=t.stateNode;try{Uo(i,"")}catch(N){Pe(t,t.return,N)}}if(r&4&&(i=t.stateNode,i!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&s.type==="radio"&&s.name!=null&&d0(i,s),hd(l,o);var c=hd(l,s);for(o=0;o<u.length;o+=2){var f=u[o],m=u[o+1];f==="style"?y0(i,m):f==="dangerouslySetInnerHTML"?m0(i,m):f==="children"?Uo(i,m):Nf(i,f,m,c)}switch(l){case"input":od(i,s);break;case"textarea":f0(i,s);break;case"select":var g=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var I=s.value;I!=null?ls(i,!!s.multiple,I,!1):g!==!!s.multiple&&(s.defaultValue!=null?ls(i,!!s.multiple,s.defaultValue,!0):ls(i,!!s.multiple,s.multiple?[]:"",!1))}i[Qo]=s}catch(N){Pe(t,t.return,N)}}break;case 6:if(an(e,t),En(t),r&4){if(t.stateNode===null)throw Error(U(162));i=t.stateNode,s=t.memoizedProps;try{i.nodeValue=s}catch(N){Pe(t,t.return,N)}}break;case 3:if(an(e,t),En(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Wo(e.containerInfo)}catch(N){Pe(t,t.return,N)}break;case 4:an(e,t),En(t);break;case 13:an(e,t),En(t),i=t.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(up=Oe())),r&4&&Ay(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(ht=(c=ht)||f,an(e,t),ht=c):an(e,t),En(t),r&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!f&&t.mode&1)for(q=t,f=t.child;f!==null;){for(m=q=f;q!==null;){switch(g=q,I=g.child,g.tag){case 0:case 11:case 14:case 15:So(4,g,g.return);break;case 1:ss(g,g.return);var C=g.stateNode;if(typeof C.componentWillUnmount=="function"){r=g,n=g.return;try{e=r,C.props=e.memoizedProps,C.state=e.memoizedState,C.componentWillUnmount()}catch(N){Pe(r,n,N)}}break;case 5:ss(g,g.return);break;case 22:if(g.memoizedState!==null){Ny(m);continue}}I!==null?(I.return=g,q=I):Ny(m)}f=f.sibling}e:for(f=null,m=t;;){if(m.tag===5){if(f===null){f=m;try{i=m.stateNode,c?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(l=m.stateNode,u=m.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=g0("display",o))}catch(N){Pe(t,t.return,N)}}}else if(m.tag===6){if(f===null)try{m.stateNode.nodeValue=c?"":m.memoizedProps}catch(N){Pe(t,t.return,N)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===t)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===t)break e;for(;m.sibling===null;){if(m.return===null||m.return===t)break e;f===m&&(f=null),m=m.return}f===m&&(f=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:an(e,t),En(t),r&4&&Ay(t);break;case 21:break;default:an(e,t),En(t)}}function En(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Bw(n)){var r=n;break e}n=n.return}throw Error(U(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Uo(i,""),r.flags&=-33);var s=Cy(t);zd(t,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,l=Cy(t);Ud(t,l,o);break;default:throw Error(U(161))}}catch(u){Pe(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function vS(t,e,n){q=t,Hw(t)}function Hw(t,e,n){for(var r=(t.mode&1)!==0;q!==null;){var i=q,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||ml;if(!o){var l=i.alternate,u=l!==null&&l.memoizedState!==null||ht;l=ml;var c=ht;if(ml=o,(ht=u)&&!c)for(q=i;q!==null;)o=q,u=o.child,o.tag===22&&o.memoizedState!==null?Py(i):u!==null?(u.return=o,q=u):Py(i);for(;s!==null;)q=s,Hw(s),s=s.sibling;q=i,ml=l,ht=c}Ry(t)}else i.subtreeFlags&8772&&s!==null?(s.return=i,q=s):Ry(t)}}function Ry(t){for(;q!==null;){var e=q;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:ht||Zu(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!ht)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:ln(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&fy(e,s,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}fy(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var m=f.dehydrated;m!==null&&Wo(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(U(163))}ht||e.flags&512&&Fd(e)}catch(g){Pe(e,e.return,g)}}if(e===t){q=null;break}if(n=e.sibling,n!==null){n.return=e.return,q=n;break}q=e.return}}function Ny(t){for(;q!==null;){var e=q;if(e===t){q=null;break}var n=e.sibling;if(n!==null){n.return=e.return,q=n;break}q=e.return}}function Py(t){for(;q!==null;){var e=q;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Zu(4,e)}catch(u){Pe(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(u){Pe(e,i,u)}}var s=e.return;try{Fd(e)}catch(u){Pe(e,s,u)}break;case 5:var o=e.return;try{Fd(e)}catch(u){Pe(e,o,u)}}}catch(u){Pe(e,e.return,u)}if(e===t){q=null;break}var l=e.sibling;if(l!==null){l.return=e.return,q=l;break}q=e.return}}var _S=Math.ceil,du=sr.ReactCurrentDispatcher,ap=sr.ReactCurrentOwner,Xt=sr.ReactCurrentBatchConfig,ue=0,Ge=null,Le=null,et=0,Mt=0,os=Jr(0),Be=0,ta=null,Ii=0,ec=0,lp=0,Co=null,St=null,up=0,ks=1/0,Un=null,fu=!1,Bd=null,Nr=null,gl=!1,Tr=null,pu=0,Ao=0,$d=null,Ol=-1,Vl=0;function _t(){return ue&6?Oe():Ol!==-1?Ol:Ol=Oe()}function Pr(t){return t.mode&1?ue&2&&et!==0?et&-et:nS.transition!==null?(Vl===0&&(Vl=R0()),Vl):(t=pe,t!==0||(t=window.event,t=t===void 0?16:j0(t.type)),t):1}function gn(t,e,n,r){if(50<Ao)throw Ao=0,$d=null,Error(U(185));va(t,n,r),(!(ue&2)||t!==Ge)&&(t===Ge&&(!(ue&2)&&(ec|=n),Be===4&&gr(t,et)),Pt(t,r),n===1&&ue===0&&!(e.mode&1)&&(ks=Oe()+500,Yu&&Xr()))}function Pt(t,e){var n=t.callbackNode;nk(t,e);var r=Jl(t,t===Ge?et:0);if(r===0)n!==null&&Ug(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&Ug(n),e===1)t.tag===0?tS(by.bind(null,t)):tw(by.bind(null,t)),Jk(function(){!(ue&6)&&Xr()}),n=null;else{switch(N0(r)){case 1:n=Vf;break;case 4:n=C0;break;case 16:n=Yl;break;case 536870912:n=A0;break;default:n=Yl}n=Zw(n,qw.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function qw(t,e){if(Ol=-1,Vl=0,ue&6)throw Error(U(327));var n=t.callbackNode;if(fs()&&t.callbackNode!==n)return null;var r=Jl(t,t===Ge?et:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=mu(t,r);else{e=r;var i=ue;ue|=2;var s=Kw();(Ge!==t||et!==e)&&(Un=null,ks=Oe()+500,gi(t,e));do try{TS();break}catch(l){Gw(t,l)}while(!0);Kf(),du.current=s,ue=i,Le!==null?e=0:(Ge=null,et=0,e=Be)}if(e!==0){if(e===2&&(i=gd(t),i!==0&&(r=i,e=Wd(t,i))),e===1)throw n=ta,gi(t,0),gr(t,r),Pt(t,Oe()),n;if(e===6)gr(t,r);else{if(i=t.current.alternate,!(r&30)&&!wS(i)&&(e=mu(t,r),e===2&&(s=gd(t),s!==0&&(r=s,e=Wd(t,s))),e===1))throw n=ta,gi(t,0),gr(t,r),Pt(t,Oe()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(U(345));case 2:ui(t,St,Un);break;case 3:if(gr(t,r),(r&130023424)===r&&(e=up+500-Oe(),10<e)){if(Jl(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){_t(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=xd(ui.bind(null,t,St,Un),e);break}ui(t,St,Un);break;case 4:if(gr(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var o=31-mn(r);s=1<<o,o=e[o],o>i&&(i=o),r&=~s}if(r=i,r=Oe()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*_S(r/1960))-r,10<r){t.timeoutHandle=xd(ui.bind(null,t,St,Un),r);break}ui(t,St,Un);break;case 5:ui(t,St,Un);break;default:throw Error(U(329))}}}return Pt(t,Oe()),t.callbackNode===n?qw.bind(null,t):null}function Wd(t,e){var n=Co;return t.current.memoizedState.isDehydrated&&(gi(t,e).flags|=256),t=mu(t,e),t!==2&&(e=St,St=n,e!==null&&Hd(e)),t}function Hd(t){St===null?St=t:St.push.apply(St,t)}function wS(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!yn(s(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function gr(t,e){for(e&=~lp,e&=~ec,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-mn(e),r=1<<n;t[n]=-1,e&=~r}}function by(t){if(ue&6)throw Error(U(327));fs();var e=Jl(t,0);if(!(e&1))return Pt(t,Oe()),null;var n=mu(t,e);if(t.tag!==0&&n===2){var r=gd(t);r!==0&&(e=r,n=Wd(t,r))}if(n===1)throw n=ta,gi(t,0),gr(t,e),Pt(t,Oe()),n;if(n===6)throw Error(U(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,ui(t,St,Un),Pt(t,Oe()),null}function cp(t,e){var n=ue;ue|=1;try{return t(e)}finally{ue=n,ue===0&&(ks=Oe()+500,Yu&&Xr())}}function xi(t){Tr!==null&&Tr.tag===0&&!(ue&6)&&fs();var e=ue;ue|=1;var n=Xt.transition,r=pe;try{if(Xt.transition=null,pe=1,t)return t()}finally{pe=r,Xt.transition=n,ue=e,!(ue&6)&&Xr()}}function hp(){Mt=os.current,Te(os)}function gi(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,Yk(n)),Le!==null)for(n=Le.return;n!==null;){var r=n;switch(Hf(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&nu();break;case 3:Is(),Te(Rt),Te(ft),ep();break;case 5:Zf(r);break;case 4:Is();break;case 13:Te(ke);break;case 19:Te(ke);break;case 10:Qf(r.type._context);break;case 22:case 23:hp()}n=n.return}if(Ge=t,Le=t=br(t.current,null),et=Mt=e,Be=0,ta=null,lp=ec=Ii=0,St=Co=null,di!==null){for(e=0;e<di.length;e++)if(n=di[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}di=null}return t}function Gw(t,e){do{var n=Le;try{if(Kf(),Pl.current=hu,cu){for(var r=Se.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}cu=!1}if(Ti=0,qe=ze=Se=null,ko=!1,Xo=0,ap.current=null,n===null||n.return===null){Be=1,ta=e,Le=null;break}e:{var s=t,o=n.return,l=n,u=e;if(e=et,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,f=l,m=f.tag;if(!(f.mode&1)&&(m===0||m===11||m===15)){var g=f.alternate;g?(f.updateQueue=g.updateQueue,f.memoizedState=g.memoizedState,f.lanes=g.lanes):(f.updateQueue=null,f.memoizedState=null)}var I=_y(o);if(I!==null){I.flags&=-257,wy(I,o,l,s,e),I.mode&1&&vy(s,c,e),e=I,u=c;var C=e.updateQueue;if(C===null){var N=new Set;N.add(u),e.updateQueue=N}else C.add(u);break e}else{if(!(e&1)){vy(s,c,e),dp();break e}u=Error(U(426))}}else if(Ie&&l.mode&1){var P=_y(o);if(P!==null){!(P.flags&65536)&&(P.flags|=256),wy(P,o,l,s,e),qf(xs(u,l));break e}}s=u=xs(u,l),Be!==4&&(Be=2),Co===null?Co=[s]:Co.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var w=Nw(s,u,e);dy(s,w);break e;case 1:l=u;var _=s.type,k=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||k!==null&&typeof k.componentDidCatch=="function"&&(Nr===null||!Nr.has(k)))){s.flags|=65536,e&=-e,s.lanes|=e;var b=Pw(s,l,e);dy(s,b);break e}}s=s.return}while(s!==null)}Yw(n)}catch(j){e=j,Le===n&&n!==null&&(Le=n=n.return);continue}break}while(!0)}function Kw(){var t=du.current;return du.current=hu,t===null?hu:t}function dp(){(Be===0||Be===3||Be===2)&&(Be=4),Ge===null||!(Ii&268435455)&&!(ec&268435455)||gr(Ge,et)}function mu(t,e){var n=ue;ue|=2;var r=Kw();(Ge!==t||et!==e)&&(Un=null,gi(t,e));do try{ES();break}catch(i){Gw(t,i)}while(!0);if(Kf(),ue=n,du.current=r,Le!==null)throw Error(U(261));return Ge=null,et=0,Be}function ES(){for(;Le!==null;)Qw(Le)}function TS(){for(;Le!==null&&!Gx();)Qw(Le)}function Qw(t){var e=Xw(t.alternate,t,Mt);t.memoizedProps=t.pendingProps,e===null?Yw(t):Le=e,ap.current=null}function Yw(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=mS(n,e),n!==null){n.flags&=32767,Le=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Be=6,Le=null;return}}else if(n=pS(n,e,Mt),n!==null){Le=n;return}if(e=e.sibling,e!==null){Le=e;return}Le=e=t}while(e!==null);Be===0&&(Be=5)}function ui(t,e,n){var r=pe,i=Xt.transition;try{Xt.transition=null,pe=1,IS(t,e,n,r)}finally{Xt.transition=i,pe=r}return null}function IS(t,e,n,r){do fs();while(Tr!==null);if(ue&6)throw Error(U(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(U(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(rk(t,s),t===Ge&&(Le=Ge=null,et=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||gl||(gl=!0,Zw(Yl,function(){return fs(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Xt.transition,Xt.transition=null;var o=pe;pe=1;var l=ue;ue|=4,ap.current=null,yS(t,n),Ww(n,t),$k(Td),Xl=!!Ed,Td=Ed=null,t.current=n,vS(n),Kx(),ue=l,pe=o,Xt.transition=s}else t.current=n;if(gl&&(gl=!1,Tr=t,pu=i),s=t.pendingLanes,s===0&&(Nr=null),Jx(n.stateNode),Pt(t,Oe()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(fu)throw fu=!1,t=Bd,Bd=null,t;return pu&1&&t.tag!==0&&fs(),s=t.pendingLanes,s&1?t===$d?Ao++:(Ao=0,$d=t):Ao=0,Xr(),null}function fs(){if(Tr!==null){var t=N0(pu),e=Xt.transition,n=pe;try{if(Xt.transition=null,pe=16>t?16:t,Tr===null)var r=!1;else{if(t=Tr,Tr=null,pu=0,ue&6)throw Error(U(331));var i=ue;for(ue|=4,q=t.current;q!==null;){var s=q,o=s.child;if(q.flags&16){var l=s.deletions;if(l!==null){for(var u=0;u<l.length;u++){var c=l[u];for(q=c;q!==null;){var f=q;switch(f.tag){case 0:case 11:case 15:So(8,f,s)}var m=f.child;if(m!==null)m.return=f,q=m;else for(;q!==null;){f=q;var g=f.sibling,I=f.return;if(zw(f),f===c){q=null;break}if(g!==null){g.return=I,q=g;break}q=I}}}var C=s.alternate;if(C!==null){var N=C.child;if(N!==null){C.child=null;do{var P=N.sibling;N.sibling=null,N=P}while(N!==null)}}q=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,q=o;else e:for(;q!==null;){if(s=q,s.flags&2048)switch(s.tag){case 0:case 11:case 15:So(9,s,s.return)}var w=s.sibling;if(w!==null){w.return=s.return,q=w;break e}q=s.return}}var _=t.current;for(q=_;q!==null;){o=q;var k=o.child;if(o.subtreeFlags&2064&&k!==null)k.return=o,q=k;else e:for(o=_;q!==null;){if(l=q,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Zu(9,l)}}catch(j){Pe(l,l.return,j)}if(l===o){q=null;break e}var b=l.sibling;if(b!==null){b.return=l.return,q=b;break e}q=l.return}}if(ue=i,Xr(),kn&&typeof kn.onPostCommitFiberRoot=="function")try{kn.onPostCommitFiberRoot(Hu,t)}catch{}r=!0}return r}finally{pe=n,Xt.transition=e}}return!1}function Dy(t,e,n){e=xs(n,e),e=Nw(t,e,1),t=Rr(t,e,1),e=_t(),t!==null&&(va(t,1,e),Pt(t,e))}function Pe(t,e,n){if(t.tag===3)Dy(t,t,n);else for(;e!==null;){if(e.tag===3){Dy(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Nr===null||!Nr.has(r))){t=xs(n,t),t=Pw(e,t,1),e=Rr(e,t,1),t=_t(),e!==null&&(va(e,1,t),Pt(e,t));break}}e=e.return}}function xS(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=_t(),t.pingedLanes|=t.suspendedLanes&n,Ge===t&&(et&n)===n&&(Be===4||Be===3&&(et&130023424)===et&&500>Oe()-up?gi(t,0):lp|=n),Pt(t,e)}function Jw(t,e){e===0&&(t.mode&1?(e=ol,ol<<=1,!(ol&130023424)&&(ol=4194304)):e=1);var n=_t();t=Jn(t,e),t!==null&&(va(t,e,n),Pt(t,n))}function kS(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Jw(t,n)}function SS(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(U(314))}r!==null&&r.delete(e),Jw(t,n)}var Xw;Xw=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Rt.current)At=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return At=!1,fS(t,e,n);At=!!(t.flags&131072)}else At=!1,Ie&&e.flags&1048576&&nw(e,su,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;Dl(t,e),t=e.pendingProps;var i=ws(e,ft.current);ds(e,n),i=np(null,e,r,t,i,n);var s=rp();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Nt(r)?(s=!0,ru(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Jf(e),i.updater=Xu,e.stateNode=i,i._reactInternals=e,Pd(e,r,t,n),e=Od(null,e,r,!0,s,n)):(e.tag=0,Ie&&s&&Wf(e),vt(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(Dl(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=AS(r),t=ln(r,t),i){case 0:e=Dd(null,e,r,t,n);break e;case 1:e=Iy(null,e,r,t,n);break e;case 11:e=Ey(null,e,r,t,n);break e;case 14:e=Ty(null,e,r,ln(r.type,t),n);break e}throw Error(U(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:ln(r,i),Dd(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:ln(r,i),Iy(t,e,r,i,n);case 3:e:{if(Vw(e),t===null)throw Error(U(387));r=e.pendingProps,s=e.memoizedState,i=s.element,lw(t,e),lu(e,r,null,n);var o=e.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=xs(Error(U(423)),e),e=xy(t,e,r,n,i);break e}else if(r!==i){i=xs(Error(U(424)),e),e=xy(t,e,r,n,i);break e}else for(Lt=Ar(e.stateNode.containerInfo.firstChild),Ut=e,Ie=!0,hn=null,n=ow(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Es(),r===i){e=Xn(t,e,n);break e}vt(t,e,r,n)}e=e.child}return e;case 5:return uw(e),t===null&&Ad(e),r=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,o=i.children,Id(r,i)?o=null:s!==null&&Id(r,s)&&(e.flags|=32),Ow(t,e),vt(t,e,o,n),e.child;case 6:return t===null&&Ad(e),null;case 13:return jw(t,e,n);case 4:return Xf(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=Ts(e,null,r,n):vt(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:ln(r,i),Ey(t,e,r,i,n);case 7:return vt(t,e,e.pendingProps,n),e.child;case 8:return vt(t,e,e.pendingProps.children,n),e.child;case 12:return vt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,o=i.value,ve(ou,r._currentValue),r._currentValue=o,s!==null)if(yn(s.value,o)){if(s.children===i.children&&!Rt.current){e=Xn(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var l=s.dependencies;if(l!==null){o=s.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(s.tag===1){u=qn(-1,n&-n),u.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?u.next=u:(u.next=f.next,f.next=u),c.pending=u}}s.lanes|=n,u=s.alternate,u!==null&&(u.lanes|=n),Rd(s.return,n,e),l.lanes|=n;break}u=u.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(U(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Rd(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}vt(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,ds(e,n),i=en(i),r=r(i),e.flags|=1,vt(t,e,r,n),e.child;case 14:return r=e.type,i=ln(r,e.pendingProps),i=ln(r.type,i),Ty(t,e,r,i,n);case 15:return bw(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:ln(r,i),Dl(t,e),e.tag=1,Nt(r)?(t=!0,ru(e)):t=!1,ds(e,n),Rw(e,r,i),Pd(e,r,i,n),Od(null,e,r,!0,t,n);case 19:return Mw(t,e,n);case 22:return Dw(t,e,n)}throw Error(U(156,e.tag))};function Zw(t,e){return S0(t,e)}function CS(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Jt(t,e,n,r){return new CS(t,e,n,r)}function fp(t){return t=t.prototype,!(!t||!t.isReactComponent)}function AS(t){if(typeof t=="function")return fp(t)?1:0;if(t!=null){if(t=t.$$typeof,t===bf)return 11;if(t===Df)return 14}return 2}function br(t,e){var n=t.alternate;return n===null?(n=Jt(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function jl(t,e,n,r,i,s){var o=2;if(r=t,typeof t=="function")fp(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Yi:return yi(n.children,i,s,e);case Pf:o=8,i|=8;break;case td:return t=Jt(12,n,e,i|2),t.elementType=td,t.lanes=s,t;case nd:return t=Jt(13,n,e,i),t.elementType=nd,t.lanes=s,t;case rd:return t=Jt(19,n,e,i),t.elementType=rd,t.lanes=s,t;case u0:return tc(n,i,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case a0:o=10;break e;case l0:o=9;break e;case bf:o=11;break e;case Df:o=14;break e;case fr:o=16,r=null;break e}throw Error(U(130,t==null?t:typeof t,""))}return e=Jt(o,n,e,i),e.elementType=t,e.type=r,e.lanes=s,e}function yi(t,e,n,r){return t=Jt(7,t,r,e),t.lanes=n,t}function tc(t,e,n,r){return t=Jt(22,t,r,e),t.elementType=u0,t.lanes=n,t.stateNode={isHidden:!1},t}function Nh(t,e,n){return t=Jt(6,t,null,e),t.lanes=n,t}function Ph(t,e,n){return e=Jt(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function RS(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=hh(0),this.expirationTimes=hh(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=hh(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function pp(t,e,n,r,i,s,o,l,u){return t=new RS(t,e,n,l,u),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Jt(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Jf(s),t}function NS(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Qi,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function eE(t){if(!t)return zr;t=t._reactInternals;e:{if(Di(t)!==t||t.tag!==1)throw Error(U(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Nt(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(U(171))}if(t.tag===1){var n=t.type;if(Nt(n))return ew(t,n,e)}return e}function tE(t,e,n,r,i,s,o,l,u){return t=pp(n,r,!0,t,i,s,o,l,u),t.context=eE(null),n=t.current,r=_t(),i=Pr(n),s=qn(r,i),s.callback=e??null,Rr(n,s,i),t.current.lanes=i,va(t,i,r),Pt(t,r),t}function nc(t,e,n,r){var i=e.current,s=_t(),o=Pr(i);return n=eE(n),e.context===null?e.context=n:e.pendingContext=n,e=qn(s,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=Rr(i,e,o),t!==null&&(gn(t,i,o,s),Nl(t,i,o)),o}function gu(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Oy(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function mp(t,e){Oy(t,e),(t=t.alternate)&&Oy(t,e)}function PS(){return null}var nE=typeof reportError=="function"?reportError:function(t){console.error(t)};function gp(t){this._internalRoot=t}rc.prototype.render=gp.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(U(409));nc(t,e,null,null)};rc.prototype.unmount=gp.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;xi(function(){nc(null,t,null,null)}),e[Yn]=null}};function rc(t){this._internalRoot=t}rc.prototype.unstable_scheduleHydration=function(t){if(t){var e=D0();t={blockedOn:null,target:t,priority:e};for(var n=0;n<mr.length&&e!==0&&e<mr[n].priority;n++);mr.splice(n,0,t),n===0&&V0(t)}};function yp(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function ic(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Vy(){}function bS(t,e,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var c=gu(o);s.call(c)}}var o=tE(e,r,t,0,null,!1,!1,"",Vy);return t._reactRootContainer=o,t[Yn]=o.current,Go(t.nodeType===8?t.parentNode:t),xi(),o}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var c=gu(u);l.call(c)}}var u=pp(t,0,!1,null,null,!1,!1,"",Vy);return t._reactRootContainer=u,t[Yn]=u.current,Go(t.nodeType===8?t.parentNode:t),xi(function(){nc(e,u,n,r)}),u}function sc(t,e,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var l=i;i=function(){var u=gu(o);l.call(u)}}nc(e,o,t,i)}else o=bS(n,e,t,i,r);return gu(o)}P0=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=fo(e.pendingLanes);n!==0&&(jf(e,n|1),Pt(e,Oe()),!(ue&6)&&(ks=Oe()+500,Xr()))}break;case 13:xi(function(){var r=Jn(t,1);if(r!==null){var i=_t();gn(r,t,1,i)}}),mp(t,1)}};Mf=function(t){if(t.tag===13){var e=Jn(t,134217728);if(e!==null){var n=_t();gn(e,t,134217728,n)}mp(t,134217728)}};b0=function(t){if(t.tag===13){var e=Pr(t),n=Jn(t,e);if(n!==null){var r=_t();gn(n,t,e,r)}mp(t,e)}};D0=function(){return pe};O0=function(t,e){var n=pe;try{return pe=t,e()}finally{pe=n}};fd=function(t,e,n){switch(e){case"input":if(od(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=Qu(r);if(!i)throw Error(U(90));h0(r),od(r,i)}}}break;case"textarea":f0(t,n);break;case"select":e=n.value,e!=null&&ls(t,!!n.multiple,e,!1)}};w0=cp;E0=xi;var DS={usingClientEntryPoint:!1,Events:[wa,es,Qu,v0,_0,cp]},uo={findFiberByHostInstance:hi,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},OS={bundleType:uo.bundleType,version:uo.version,rendererPackageName:uo.rendererPackageName,rendererConfig:uo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:sr.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=x0(t),t===null?null:t.stateNode},findFiberByHostInstance:uo.findFiberByHostInstance||PS,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var yl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!yl.isDisabled&&yl.supportsFiber)try{Hu=yl.inject(OS),kn=yl}catch{}}Ht.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=DS;Ht.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!yp(e))throw Error(U(200));return NS(t,e,null,n)};Ht.createRoot=function(t,e){if(!yp(t))throw Error(U(299));var n=!1,r="",i=nE;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=pp(t,1,!1,null,null,n,!1,r,i),t[Yn]=e.current,Go(t.nodeType===8?t.parentNode:t),new gp(e)};Ht.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(U(188)):(t=Object.keys(t).join(","),Error(U(268,t)));return t=x0(e),t=t===null?null:t.stateNode,t};Ht.flushSync=function(t){return xi(t)};Ht.hydrate=function(t,e,n){if(!ic(e))throw Error(U(200));return sc(null,t,e,!0,n)};Ht.hydrateRoot=function(t,e,n){if(!yp(t))throw Error(U(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=nE;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=tE(e,null,t,1,n??null,i,!1,s,o),t[Yn]=e.current,Go(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new rc(e)};Ht.render=function(t,e,n){if(!ic(e))throw Error(U(200));return sc(null,t,e,!1,n)};Ht.unmountComponentAtNode=function(t){if(!ic(t))throw Error(U(40));return t._reactRootContainer?(xi(function(){sc(null,null,t,!1,function(){t._reactRootContainer=null,t[Yn]=null})}),!0):!1};Ht.unstable_batchedUpdates=cp;Ht.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!ic(n))throw Error(U(200));if(t==null||t._reactInternals===void 0)throw Error(U(38));return sc(t,e,n,!1,r)};Ht.version="18.3.1-next-f1338f8080-20240426";function rE(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(rE)}catch(t){console.error(t)}}rE(),r0.exports=Ht;var VS=r0.exports,iE,jy=VS;iE=jy.createRoot,jy.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function na(){return na=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},na.apply(this,arguments)}var Ir;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(Ir||(Ir={}));const My="popstate";function jS(t){t===void 0&&(t={});function e(r,i){let{pathname:s,search:o,hash:l}=r.location;return qd("",{pathname:s,search:o,hash:l},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(r,i){return typeof i=="string"?i:yu(i)}return LS(e,n,null,t)}function Ce(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function vp(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function MS(){return Math.random().toString(36).substr(2,8)}function Ly(t,e){return{usr:t.state,key:t.key,idx:e}}function qd(t,e,n,r){return n===void 0&&(n=null),na({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?js(e):e,{state:n,key:e&&e.key||r||MS()})}function yu(t){let{pathname:e="/",search:n="",hash:r=""}=t;return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function js(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substr(n),t=t.substr(0,n));let r=t.indexOf("?");r>=0&&(e.search=t.substr(r),t=t.substr(0,r)),t&&(e.pathname=t)}return e}function LS(t,e,n,r){r===void 0&&(r={});let{window:i=document.defaultView,v5Compat:s=!1}=r,o=i.history,l=Ir.Pop,u=null,c=f();c==null&&(c=0,o.replaceState(na({},o.state,{idx:c}),""));function f(){return(o.state||{idx:null}).idx}function m(){l=Ir.Pop;let P=f(),w=P==null?null:P-c;c=P,u&&u({action:l,location:N.location,delta:w})}function g(P,w){l=Ir.Push;let _=qd(N.location,P,w);c=f()+1;let k=Ly(_,c),b=N.createHref(_);try{o.pushState(k,"",b)}catch(j){if(j instanceof DOMException&&j.name==="DataCloneError")throw j;i.location.assign(b)}s&&u&&u({action:l,location:N.location,delta:1})}function I(P,w){l=Ir.Replace;let _=qd(N.location,P,w);c=f();let k=Ly(_,c),b=N.createHref(_);o.replaceState(k,"",b),s&&u&&u({action:l,location:N.location,delta:0})}function C(P){let w=i.location.origin!=="null"?i.location.origin:i.location.href,_=typeof P=="string"?P:yu(P);return _=_.replace(/ $/,"%20"),Ce(w,"No window.location.(origin|href) available to create URL for href: "+_),new URL(_,w)}let N={get action(){return l},get location(){return t(i,o)},listen(P){if(u)throw new Error("A history only accepts one active listener");return i.addEventListener(My,m),u=P,()=>{i.removeEventListener(My,m),u=null}},createHref(P){return e(i,P)},createURL:C,encodeLocation(P){let w=C(P);return{pathname:w.pathname,search:w.search,hash:w.hash}},push:g,replace:I,go(P){return o.go(P)}};return N}var Fy;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(Fy||(Fy={}));function FS(t,e,n){return n===void 0&&(n="/"),US(t,e,n)}function US(t,e,n,r){let i=typeof e=="string"?js(e):e,s=Ss(i.pathname||"/",n);if(s==null)return null;let o=sE(t);zS(o);let l=null;for(let u=0;l==null&&u<o.length;++u){let c=XS(s);l=YS(o[u],c)}return l}function sE(t,e,n,r){e===void 0&&(e=[]),n===void 0&&(n=[]),r===void 0&&(r="");let i=(s,o,l)=>{let u={relativePath:l===void 0?s.path||"":l,caseSensitive:s.caseSensitive===!0,childrenIndex:o,route:s};u.relativePath.startsWith("/")&&(Ce(u.relativePath.startsWith(r),'Absolute route path "'+u.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),u.relativePath=u.relativePath.slice(r.length));let c=Dr([r,u.relativePath]),f=n.concat(u);s.children&&s.children.length>0&&(Ce(s.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),sE(s.children,e,f,c)),!(s.path==null&&!s.index)&&e.push({path:c,score:KS(c,s.index),routesMeta:f})};return t.forEach((s,o)=>{var l;if(s.path===""||!((l=s.path)!=null&&l.includes("?")))i(s,o);else for(let u of oE(s.path))i(s,o,u)}),e}function oE(t){let e=t.split("/");if(e.length===0)return[];let[n,...r]=e,i=n.endsWith("?"),s=n.replace(/\?$/,"");if(r.length===0)return i?[s,""]:[s];let o=oE(r.join("/")),l=[];return l.push(...o.map(u=>u===""?s:[s,u].join("/"))),i&&l.push(...o),l.map(u=>t.startsWith("/")&&u===""?"/":u)}function zS(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:QS(e.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const BS=/^:[\w-]+$/,$S=3,WS=2,HS=1,qS=10,GS=-2,Uy=t=>t==="*";function KS(t,e){let n=t.split("/"),r=n.length;return n.some(Uy)&&(r+=GS),e&&(r+=WS),n.filter(i=>!Uy(i)).reduce((i,s)=>i+(BS.test(s)?$S:s===""?HS:qS),r)}function QS(t,e){return t.length===e.length&&t.slice(0,-1).every((r,i)=>r===e[i])?t[t.length-1]-e[e.length-1]:0}function YS(t,e,n){let{routesMeta:r}=t,i={},s="/",o=[];for(let l=0;l<r.length;++l){let u=r[l],c=l===r.length-1,f=s==="/"?e:e.slice(s.length)||"/",m=Gd({path:u.relativePath,caseSensitive:u.caseSensitive,end:c},f),g=u.route;if(!m)return null;Object.assign(i,m.params),o.push({params:i,pathname:Dr([s,m.pathname]),pathnameBase:rC(Dr([s,m.pathnameBase])),route:g}),m.pathnameBase!=="/"&&(s=Dr([s,m.pathnameBase]))}return o}function Gd(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,r]=JS(t.path,t.caseSensitive,t.end),i=e.match(n);if(!i)return null;let s=i[0],o=s.replace(/(.)\/+$/,"$1"),l=i.slice(1);return{params:r.reduce((c,f,m)=>{let{paramName:g,isOptional:I}=f;if(g==="*"){let N=l[m]||"";o=s.slice(0,s.length-N.length).replace(/(.)\/+$/,"$1")}const C=l[m];return I&&!C?c[g]=void 0:c[g]=(C||"").replace(/%2F/g,"/"),c},{}),pathname:s,pathnameBase:o,pattern:t}}function JS(t,e,n){e===void 0&&(e=!1),n===void 0&&(n=!0),vp(t==="*"||!t.endsWith("*")||t.endsWith("/*"),'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".'));let r=[],i="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,u)=>(r.push({paramName:l,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(r.push({paramName:"*"}),i+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":t!==""&&t!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,e?void 0:"i"),r]}function XS(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return vp(!1,'The URL path "'+t+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),t}}function Ss(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,r=t.charAt(n);return r&&r!=="/"?null:t.slice(n)||"/"}const ZS=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,eC=t=>ZS.test(t);function tC(t,e){e===void 0&&(e="/");let{pathname:n,search:r="",hash:i=""}=typeof t=="string"?js(t):t,s;if(n)if(eC(n))s=n;else{if(n.includes("//")){let o=n;n=n.replace(/\/\/+/g,"/"),vp(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?s=zy(n.substring(1),"/"):s=zy(n,e)}else s=e;return{pathname:s,search:iC(r),hash:sC(i)}}function zy(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function bh(t,e,n,r){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function nC(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function _p(t,e){let n=nC(t);return e?n.map((r,i)=>i===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function wp(t,e,n,r){r===void 0&&(r=!1);let i;typeof t=="string"?i=js(t):(i=na({},t),Ce(!i.pathname||!i.pathname.includes("?"),bh("?","pathname","search",i)),Ce(!i.pathname||!i.pathname.includes("#"),bh("#","pathname","hash",i)),Ce(!i.search||!i.search.includes("#"),bh("#","search","hash",i)));let s=t===""||i.pathname==="",o=s?"/":i.pathname,l;if(o==null)l=n;else{let m=e.length-1;if(!r&&o.startsWith("..")){let g=o.split("/");for(;g[0]==="..";)g.shift(),m-=1;i.pathname=g.join("/")}l=m>=0?e[m]:"/"}let u=tC(i,l),c=o&&o!=="/"&&o.endsWith("/"),f=(s||o===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(c||f)&&(u.pathname+="/"),u}const Dr=t=>t.join("/").replace(/\/\/+/g,"/"),rC=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),iC=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,sC=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function oC(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}const aE=["post","put","patch","delete"];new Set(aE);const aC=["get",...aE];new Set(aC);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ra(){return ra=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},ra.apply(this,arguments)}const oc=D.createContext(null),lE=D.createContext(null),or=D.createContext(null),ac=D.createContext(null),Dn=D.createContext({outlet:null,matches:[],isDataRoute:!1}),uE=D.createContext(null);function lC(t,e){let{relative:n}=e===void 0?{}:e;Ms()||Ce(!1);let{basename:r,navigator:i}=D.useContext(or),{hash:s,pathname:o,search:l}=uc(t,{relative:n}),u=o;return r!=="/"&&(u=o==="/"?r:Dr([r,o])),i.createHref({pathname:u,search:l,hash:s})}function Ms(){return D.useContext(ac)!=null}function Zr(){return Ms()||Ce(!1),D.useContext(ac).location}function cE(t){D.useContext(or).static||D.useLayoutEffect(t)}function ar(){let{isDataRoute:t}=D.useContext(Dn);return t?IC():uC()}function uC(){Ms()||Ce(!1);let t=D.useContext(oc),{basename:e,future:n,navigator:r}=D.useContext(or),{matches:i}=D.useContext(Dn),{pathname:s}=Zr(),o=JSON.stringify(_p(i,n.v7_relativeSplatPath)),l=D.useRef(!1);return cE(()=>{l.current=!0}),D.useCallback(function(c,f){if(f===void 0&&(f={}),!l.current)return;if(typeof c=="number"){r.go(c);return}let m=wp(c,JSON.parse(o),s,f.relative==="path");t==null&&e!=="/"&&(m.pathname=m.pathname==="/"?e:Dr([e,m.pathname])),(f.replace?r.replace:r.push)(m,f.state,f)},[e,r,o,s,t])}const cC=D.createContext(null);function hC(t){let e=D.useContext(Dn).outlet;return e&&D.createElement(cC.Provider,{value:t},e)}function lc(){let{matches:t}=D.useContext(Dn),e=t[t.length-1];return e?e.params:{}}function uc(t,e){let{relative:n}=e===void 0?{}:e,{future:r}=D.useContext(or),{matches:i}=D.useContext(Dn),{pathname:s}=Zr(),o=JSON.stringify(_p(i,r.v7_relativeSplatPath));return D.useMemo(()=>wp(t,JSON.parse(o),s,n==="path"),[t,o,s,n])}function dC(t,e){return fC(t,e)}function fC(t,e,n,r){Ms()||Ce(!1);let{navigator:i}=D.useContext(or),{matches:s}=D.useContext(Dn),o=s[s.length-1],l=o?o.params:{};o&&o.pathname;let u=o?o.pathnameBase:"/";o&&o.route;let c=Zr(),f;if(e){var m;let P=typeof e=="string"?js(e):e;u==="/"||(m=P.pathname)!=null&&m.startsWith(u)||Ce(!1),f=P}else f=c;let g=f.pathname||"/",I=g;if(u!=="/"){let P=u.replace(/^\//,"").split("/");I="/"+g.replace(/^\//,"").split("/").slice(P.length).join("/")}let C=FS(t,{pathname:I}),N=vC(C&&C.map(P=>Object.assign({},P,{params:Object.assign({},l,P.params),pathname:Dr([u,i.encodeLocation?i.encodeLocation(P.pathname).pathname:P.pathname]),pathnameBase:P.pathnameBase==="/"?u:Dr([u,i.encodeLocation?i.encodeLocation(P.pathnameBase).pathname:P.pathnameBase])})),s,n,r);return e&&N?D.createElement(ac.Provider,{value:{location:ra({pathname:"/",search:"",hash:"",state:null,key:"default"},f),navigationType:Ir.Pop}},N):N}function pC(){let t=TC(),e=oC(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,i={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return D.createElement(D.Fragment,null,D.createElement("h2",null,"Unexpected Application Error!"),D.createElement("h3",{style:{fontStyle:"italic"}},e),n?D.createElement("pre",{style:i},n):null,null)}const mC=D.createElement(pC,null);class gC extends D.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){console.error("React Router caught the following error during render",e,n)}render(){return this.state.error!==void 0?D.createElement(Dn.Provider,{value:this.props.routeContext},D.createElement(uE.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function yC(t){let{routeContext:e,match:n,children:r}=t,i=D.useContext(oc);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),D.createElement(Dn.Provider,{value:e},r)}function vC(t,e,n,r){var i;if(e===void 0&&(e=[]),n===void 0&&(n=null),r===void 0&&(r=null),t==null){var s;if(!n)return null;if(n.errors)t=n.matches;else if((s=r)!=null&&s.v7_partialHydration&&e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let o=t,l=(i=n)==null?void 0:i.errors;if(l!=null){let f=o.findIndex(m=>m.route.id&&(l==null?void 0:l[m.route.id])!==void 0);f>=0||Ce(!1),o=o.slice(0,Math.min(o.length,f+1))}let u=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let f=0;f<o.length;f++){let m=o[f];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(c=f),m.route.id){let{loaderData:g,errors:I}=n,C=m.route.loader&&g[m.route.id]===void 0&&(!I||I[m.route.id]===void 0);if(m.route.lazy||C){u=!0,c>=0?o=o.slice(0,c+1):o=[o[0]];break}}}return o.reduceRight((f,m,g)=>{let I,C=!1,N=null,P=null;n&&(I=l&&m.route.id?l[m.route.id]:void 0,N=m.route.errorElement||mC,u&&(c<0&&g===0?(xC("route-fallback"),C=!0,P=null):c===g&&(C=!0,P=m.route.hydrateFallbackElement||null)));let w=e.concat(o.slice(0,g+1)),_=()=>{let k;return I?k=N:C?k=P:m.route.Component?k=D.createElement(m.route.Component,null):m.route.element?k=m.route.element:k=f,D.createElement(yC,{match:m,routeContext:{outlet:f,matches:w,isDataRoute:n!=null},children:k})};return n&&(m.route.ErrorBoundary||m.route.errorElement||g===0)?D.createElement(gC,{location:n.location,revalidation:n.revalidation,component:N,error:I,children:_(),routeContext:{outlet:null,matches:w,isDataRoute:!0}}):_()},null)}var hE=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(hE||{}),dE=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}(dE||{});function _C(t){let e=D.useContext(oc);return e||Ce(!1),e}function wC(t){let e=D.useContext(lE);return e||Ce(!1),e}function EC(t){let e=D.useContext(Dn);return e||Ce(!1),e}function fE(t){let e=EC(),n=e.matches[e.matches.length-1];return n.route.id||Ce(!1),n.route.id}function TC(){var t;let e=D.useContext(uE),n=wC(),r=fE();return e!==void 0?e:(t=n.errors)==null?void 0:t[r]}function IC(){let{router:t}=_C(hE.UseNavigateStable),e=fE(dE.UseNavigateStable),n=D.useRef(!1);return cE(()=>{n.current=!0}),D.useCallback(function(i,s){s===void 0&&(s={}),n.current&&(typeof i=="number"?t.navigate(i):t.navigate(i,ra({fromRouteId:e},s)))},[t,e])}const By={};function xC(t,e,n){By[t]||(By[t]=!0)}function kC(t,e){t==null||t.v7_startTransition,t==null||t.v7_relativeSplatPath}function SC(t){let{to:e,replace:n,state:r,relative:i}=t;Ms()||Ce(!1);let{future:s,static:o}=D.useContext(or),{matches:l}=D.useContext(Dn),{pathname:u}=Zr(),c=ar(),f=wp(e,_p(l,s.v7_relativeSplatPath),u,i==="path"),m=JSON.stringify(f);return D.useEffect(()=>c(JSON.parse(m),{replace:n,state:r,relative:i}),[c,m,i,n,r]),null}function pE(t){return hC(t.context)}function xt(t){Ce(!1)}function CC(t){let{basename:e="/",children:n=null,location:r,navigationType:i=Ir.Pop,navigator:s,static:o=!1,future:l}=t;Ms()&&Ce(!1);let u=e.replace(/^\/*/,"/"),c=D.useMemo(()=>({basename:u,navigator:s,static:o,future:ra({v7_relativeSplatPath:!1},l)}),[u,l,s,o]);typeof r=="string"&&(r=js(r));let{pathname:f="/",search:m="",hash:g="",state:I=null,key:C="default"}=r,N=D.useMemo(()=>{let P=Ss(f,u);return P==null?null:{location:{pathname:P,search:m,hash:g,state:I,key:C},navigationType:i}},[u,f,m,g,I,C,i]);return N==null?null:D.createElement(or.Provider,{value:c},D.createElement(ac.Provider,{children:n,value:N}))}function AC(t){let{children:e,location:n}=t;return dC(Kd(e),n)}new Promise(()=>{});function Kd(t,e){e===void 0&&(e=[]);let n=[];return D.Children.forEach(t,(r,i)=>{if(!D.isValidElement(r))return;let s=[...e,i];if(r.type===D.Fragment){n.push.apply(n,Kd(r.props.children,s));return}r.type!==xt&&Ce(!1),!r.props.index||!r.props.children||Ce(!1);let o={id:r.props.id||s.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=Kd(r.props.children,s)),n.push(o)}),n}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function vu(){return vu=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},vu.apply(this,arguments)}function mE(t,e){if(t==null)return{};var n={},r=Object.keys(t),i,s;for(s=0;s<r.length;s++)i=r[s],!(e.indexOf(i)>=0)&&(n[i]=t[i]);return n}function RC(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function NC(t,e){return t.button===0&&(!e||e==="_self")&&!RC(t)}const PC=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],bC=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],DC="6";try{window.__reactRouterVersion=DC}catch{}const OC=D.createContext({isTransitioning:!1}),VC="startTransition",$y=xx[VC];function jC(t){let{basename:e,children:n,future:r,window:i}=t,s=D.useRef();s.current==null&&(s.current=jS({window:i,v5Compat:!0}));let o=s.current,[l,u]=D.useState({action:o.action,location:o.location}),{v7_startTransition:c}=r||{},f=D.useCallback(m=>{c&&$y?$y(()=>u(m)):u(m)},[u,c]);return D.useLayoutEffect(()=>o.listen(f),[o,f]),D.useEffect(()=>kC(r),[r]),D.createElement(CC,{basename:e,children:n,location:l.location,navigationType:l.action,navigator:o,future:r})}const MC=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",LC=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,cn=D.forwardRef(function(e,n){let{onClick:r,relative:i,reloadDocument:s,replace:o,state:l,target:u,to:c,preventScrollReset:f,viewTransition:m}=e,g=mE(e,PC),{basename:I}=D.useContext(or),C,N=!1;if(typeof c=="string"&&LC.test(c)&&(C=c,MC))try{let k=new URL(window.location.href),b=c.startsWith("//")?new URL(k.protocol+c):new URL(c),j=Ss(b.pathname,I);b.origin===k.origin&&j!=null?c=j+b.search+b.hash:N=!0}catch{}let P=lC(c,{relative:i}),w=zC(c,{replace:o,state:l,target:u,preventScrollReset:f,relative:i,viewTransition:m});function _(k){r&&r(k),k.defaultPrevented||w(k)}return D.createElement("a",vu({},g,{href:C||P,onClick:N||s?r:_,ref:n,target:u}))}),FC=D.forwardRef(function(e,n){let{"aria-current":r="page",caseSensitive:i=!1,className:s="",end:o=!1,style:l,to:u,viewTransition:c,children:f}=e,m=mE(e,bC),g=uc(u,{relative:m.relative}),I=Zr(),C=D.useContext(lE),{navigator:N,basename:P}=D.useContext(or),w=C!=null&&BC(g)&&c===!0,_=N.encodeLocation?N.encodeLocation(g).pathname:g.pathname,k=I.pathname,b=C&&C.navigation&&C.navigation.location?C.navigation.location.pathname:null;i||(k=k.toLowerCase(),b=b?b.toLowerCase():null,_=_.toLowerCase()),b&&P&&(b=Ss(b,P)||b);const j=_!=="/"&&_.endsWith("/")?_.length-1:_.length;let L=k===_||!o&&k.startsWith(_)&&k.charAt(j)==="/",T=b!=null&&(b===_||!o&&b.startsWith(_)&&b.charAt(_.length)==="/"),v={isActive:L,isPending:T,isTransitioning:w},E=L?r:void 0,S;typeof s=="function"?S=s(v):S=[s,L?"active":null,T?"pending":null,w?"transitioning":null].filter(Boolean).join(" ");let R=typeof l=="function"?l(v):l;return D.createElement(cn,vu({},m,{"aria-current":E,className:S,ref:n,style:R,to:u,viewTransition:c}),typeof f=="function"?f(v):f)});var Qd;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(Qd||(Qd={}));var Wy;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(Wy||(Wy={}));function UC(t){let e=D.useContext(oc);return e||Ce(!1),e}function zC(t,e){let{target:n,replace:r,state:i,preventScrollReset:s,relative:o,viewTransition:l}=e===void 0?{}:e,u=ar(),c=Zr(),f=uc(t,{relative:o});return D.useCallback(m=>{if(NC(m,n)){m.preventDefault();let g=r!==void 0?r:yu(c)===yu(f);u(t,{replace:g,state:i,preventScrollReset:s,relative:o,viewTransition:l})}},[c,u,f,r,i,n,t,s,o,l])}function BC(t,e){e===void 0&&(e={});let n=D.useContext(OC);n==null&&Ce(!1);let{basename:r}=UC(Qd.useViewTransitionState),i=uc(t,{relative:e.relative});if(!n.isTransitioning)return!1;let s=Ss(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=Ss(n.nextLocation.pathname,r)||n.nextLocation.pathname;return Gd(i.pathname,o)!=null||Gd(i.pathname,s)!=null}const $C=()=>{};var Hy={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gE=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},WC=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],l=t[n++],u=((i&7)<<18|(s&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},yE={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,l=o?t[i+1]:0,u=i+2<t.length,c=u?t[i+2]:0,f=s>>2,m=(s&3)<<4|l>>4;let g=(l&15)<<2|c>>6,I=c&63;u||(I=64,o||(g=64)),r.push(n[f],n[m],n[g],n[I])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(gE(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):WC(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],l=i<t.length?n[t.charAt(i)]:0;++i;const c=i<t.length?n[t.charAt(i)]:64;++i;const m=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||l==null||c==null||m==null)throw new HC;const g=s<<2|l>>4;if(r.push(g),c!==64){const I=l<<4&240|c>>2;if(r.push(I),m!==64){const C=c<<6&192|m;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class HC extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const qC=function(t){const e=gE(t);return yE.encodeByteArray(e,!0)},_u=function(t){return qC(t).replace(/\./g,"")},vE=function(t){try{return yE.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GC(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KC=()=>GC().__FIREBASE_DEFAULTS__,QC=()=>{if(typeof process>"u"||typeof Hy>"u")return;const t=Hy.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},YC=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&vE(t[1]);return e&&JSON.parse(e)},cc=()=>{try{return $C()||KC()||QC()||YC()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},_E=t=>{var e,n;return(n=(e=cc())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},wE=t=>{const e=_E(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},EE=()=>{var t;return(t=cc())===null||t===void 0?void 0:t.config},TE=t=>{var e;return(e=cc())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JC{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oi(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ep(t){return(await fetch(t,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function IE(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[_u(JSON.stringify(n)),_u(JSON.stringify(o)),""].join(".")}const Ro={};function XC(){const t={prod:[],emulator:[]};for(const e of Object.keys(Ro))Ro[e]?t.emulator.push(e):t.prod.push(e);return t}function ZC(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let qy=!1;function Tp(t,e){if(typeof window>"u"||typeof document>"u"||!Oi(window.location.host)||Ro[t]===e||Ro[t]||qy)return;Ro[t]=e;function n(g){return`__firebase__banner__${g}`}const r="__firebase__banner",s=XC().prod.length>0;function o(){const g=document.getElementById(r);g&&g.remove()}function l(g){g.style.display="flex",g.style.background="#7faaf0",g.style.position="fixed",g.style.bottom="5px",g.style.left="5px",g.style.padding=".5em",g.style.borderRadius="5px",g.style.alignItems="center"}function u(g,I){g.setAttribute("width","24"),g.setAttribute("id",I),g.setAttribute("height","24"),g.setAttribute("viewBox","0 0 24 24"),g.setAttribute("fill","none"),g.style.marginLeft="-6px"}function c(){const g=document.createElement("span");return g.style.cursor="pointer",g.style.marginLeft="16px",g.style.fontSize="24px",g.innerHTML=" &times;",g.onclick=()=>{qy=!0,o()},g}function f(g,I){g.setAttribute("id",I),g.innerText="Learn more",g.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",g.setAttribute("target","__blank"),g.style.paddingLeft="5px",g.style.textDecoration="underline"}function m(){const g=ZC(r),I=n("text"),C=document.getElementById(I)||document.createElement("span"),N=n("learnmore"),P=document.getElementById(N)||document.createElement("a"),w=n("preprendIcon"),_=document.getElementById(w)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(g.created){const k=g.element;l(k),f(P,N);const b=c();u(_,w),k.append(_,C,P,b),document.body.appendChild(k)}s?(C.innerText="Preview backend disconnected.",_.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(_.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",I)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",m):m()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function eA(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(pt())}function tA(){var t;const e=(t=cc())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function nA(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function xE(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function rA(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function iA(){const t=pt();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function sA(){return!tA()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function kE(){try{return typeof indexedDB=="object"}catch{return!1}}function SE(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}function oA(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aA="FirebaseError";class rn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=aA,Object.setPrototypeOf(this,rn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Vi.prototype.create)}}class Vi{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?lA(s,r):"Error",l=`${this.serviceName}: ${o} (${i}).`;return new rn(i,l,r)}}function lA(t,e){return t.replace(uA,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const uA=/\{\$([^}]+)}/g;function cA(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Br(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(Gy(s)&&Gy(o)){if(!Br(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function Gy(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ls(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function hA(t,e){const n=new dA(t,e);return n.subscribe.bind(n)}class dA{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");fA(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=Dh),i.error===void 0&&(i.error=Dh),i.complete===void 0&&(i.complete=Dh);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function fA(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Dh(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pA=1e3,mA=2,gA=4*60*60*1e3,yA=.5;function Ky(t,e=pA,n=mA){const r=e*Math.pow(n,t),i=Math.round(yA*r*(Math.random()-.5)*2);return Math.min(gA,r+i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xe(t){return t&&t._delegate?t._delegate:t}class nn{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ci="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vA{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new JC;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(wA(e))try{this.getOrInitializeService({instanceIdentifier:ci})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=ci){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ci){return this.instances.has(e)}getOptions(e=ci){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);r===l&&o.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:_A(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=ci){return this.component?this.component.multipleInstances?e:ci:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function _A(t){return t===ci?void 0:t}function wA(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EA{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new vA(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var se;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(se||(se={}));const TA={debug:se.DEBUG,verbose:se.VERBOSE,info:se.INFO,warn:se.WARN,error:se.ERROR,silent:se.SILENT},IA=se.INFO,xA={[se.DEBUG]:"log",[se.VERBOSE]:"log",[se.INFO]:"info",[se.WARN]:"warn",[se.ERROR]:"error"},kA=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=xA[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class hc{constructor(e){this.name=e,this._logLevel=IA,this._logHandler=kA,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in se))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?TA[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,se.DEBUG,...e),this._logHandler(this,se.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,se.VERBOSE,...e),this._logHandler(this,se.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,se.INFO,...e),this._logHandler(this,se.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,se.WARN,...e),this._logHandler(this,se.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,se.ERROR,...e),this._logHandler(this,se.ERROR,...e)}}const SA=(t,e)=>e.some(n=>t instanceof n);let Qy,Yy;function CA(){return Qy||(Qy=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function AA(){return Yy||(Yy=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const CE=new WeakMap,Yd=new WeakMap,AE=new WeakMap,Oh=new WeakMap,Ip=new WeakMap;function RA(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(Or(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&CE.set(n,t)}).catch(()=>{}),Ip.set(e,t),e}function NA(t){if(Yd.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});Yd.set(t,e)}let Jd={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Yd.get(t);if(e==="objectStoreNames")return t.objectStoreNames||AE.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Or(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function PA(t){Jd=t(Jd)}function bA(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Vh(this),e,...n);return AE.set(r,e.sort?e.sort():[e]),Or(r)}:AA().includes(t)?function(...e){return t.apply(Vh(this),e),Or(CE.get(this))}:function(...e){return Or(t.apply(Vh(this),e))}}function DA(t){return typeof t=="function"?bA(t):(t instanceof IDBTransaction&&NA(t),SA(t,CA())?new Proxy(t,Jd):t)}function Or(t){if(t instanceof IDBRequest)return RA(t);if(Oh.has(t))return Oh.get(t);const e=DA(t);return e!==t&&(Oh.set(t,e),Ip.set(e,t)),e}const Vh=t=>Ip.get(t);function RE(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),l=Or(o);return r&&o.addEventListener("upgradeneeded",u=>{r(Or(o.result),u.oldVersion,u.newVersion,Or(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}const OA=["get","getKey","getAll","getAllKeys","count"],VA=["put","add","delete","clear"],jh=new Map;function Jy(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(jh.get(e))return jh.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=VA.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||OA.includes(n)))return;const s=async function(o,...l){const u=this.transaction(o,i?"readwrite":"readonly");let c=u.store;return r&&(c=c.index(l.shift())),(await Promise.all([c[n](...l),i&&u.done]))[0]};return jh.set(e,s),s}PA(t=>({...t,get:(e,n,r)=>Jy(e,n)||t.get(e,n,r),has:(e,n)=>!!Jy(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jA{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(MA(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function MA(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Xd="@firebase/app",Xy="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zn=new hc("@firebase/app"),LA="@firebase/app-compat",FA="@firebase/analytics-compat",UA="@firebase/analytics",zA="@firebase/app-check-compat",BA="@firebase/app-check",$A="@firebase/auth",WA="@firebase/auth-compat",HA="@firebase/database",qA="@firebase/data-connect",GA="@firebase/database-compat",KA="@firebase/functions",QA="@firebase/functions-compat",YA="@firebase/installations",JA="@firebase/installations-compat",XA="@firebase/messaging",ZA="@firebase/messaging-compat",eR="@firebase/performance",tR="@firebase/performance-compat",nR="@firebase/remote-config",rR="@firebase/remote-config-compat",iR="@firebase/storage",sR="@firebase/storage-compat",oR="@firebase/firestore",aR="@firebase/ai",lR="@firebase/firestore-compat",uR="firebase",cR="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zd="[DEFAULT]",hR={[Xd]:"fire-core",[LA]:"fire-core-compat",[UA]:"fire-analytics",[FA]:"fire-analytics-compat",[BA]:"fire-app-check",[zA]:"fire-app-check-compat",[$A]:"fire-auth",[WA]:"fire-auth-compat",[HA]:"fire-rtdb",[qA]:"fire-data-connect",[GA]:"fire-rtdb-compat",[KA]:"fire-fn",[QA]:"fire-fn-compat",[YA]:"fire-iid",[JA]:"fire-iid-compat",[XA]:"fire-fcm",[ZA]:"fire-fcm-compat",[eR]:"fire-perf",[tR]:"fire-perf-compat",[nR]:"fire-rc",[rR]:"fire-rc-compat",[iR]:"fire-gcs",[sR]:"fire-gcs-compat",[oR]:"fire-fst",[lR]:"fire-fst-compat",[aR]:"fire-vertex","fire-js":"fire-js",[uR]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wu=new Map,dR=new Map,ef=new Map;function Zy(t,e){try{t.container.addComponent(e)}catch(n){Zn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function vn(t){const e=t.name;if(ef.has(e))return Zn.debug(`There were multiple attempts to register component ${e}.`),!1;ef.set(e,t);for(const n of wu.values())Zy(n,t);for(const n of dR.values())Zy(n,t);return!0}function ei(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Qt(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fR={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Vr=new Vi("app","Firebase",fR);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pR{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new nn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Vr.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ji=cR;function NE(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Zd,automaticDataCollectionEnabled:!0},e),i=r.name;if(typeof i!="string"||!i)throw Vr.create("bad-app-name",{appName:String(i)});if(n||(n=EE()),!n)throw Vr.create("no-options");const s=wu.get(i);if(s){if(Br(n,s.options)&&Br(r,s.config))return s;throw Vr.create("duplicate-app",{appName:i})}const o=new EA(i);for(const u of ef.values())o.addComponent(u);const l=new pR(n,r,o);return wu.set(i,l),l}function dc(t=Zd){const e=wu.get(t);if(!e&&t===Zd&&EE())return NE();if(!e)throw Vr.create("no-app",{appName:t});return e}function bt(t,e,n){var r;let i=(r=hR[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const l=[`Unable to register library "${i}" with version "${e}":`];s&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Zn.warn(l.join(" "));return}vn(new nn(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mR="firebase-heartbeat-database",gR=1,ia="firebase-heartbeat-store";let Mh=null;function PE(){return Mh||(Mh=RE(mR,gR,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(ia)}catch(n){console.warn(n)}}}}).catch(t=>{throw Vr.create("idb-open",{originalErrorMessage:t.message})})),Mh}async function yR(t){try{const n=(await PE()).transaction(ia),r=await n.objectStore(ia).get(bE(t));return await n.done,r}catch(e){if(e instanceof rn)Zn.warn(e.message);else{const n=Vr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Zn.warn(n.message)}}}async function ev(t,e){try{const r=(await PE()).transaction(ia,"readwrite");await r.objectStore(ia).put(e,bE(t)),await r.done}catch(n){if(n instanceof rn)Zn.warn(n.message);else{const r=Vr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Zn.warn(r.message)}}}function bE(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vR=1024,_R=30;class wR{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new TR(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=tv();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>_R){const o=IR(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Zn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=tv(),{heartbeatsToSend:r,unsentEntries:i}=ER(this._heartbeatsCache.heartbeats),s=_u(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return Zn.warn(n),""}}}function tv(){return new Date().toISOString().substring(0,10)}function ER(t,e=vR){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),nv(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),nv(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class TR{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return kE()?SE().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await yR(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return ev(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return ev(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function nv(t){return _u(JSON.stringify({version:2,heartbeats:t})).length}function IR(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xR(t){vn(new nn("platform-logger",e=>new jA(e),"PRIVATE")),vn(new nn("heartbeat",e=>new wR(e),"PRIVATE")),bt(Xd,Xy,t),bt(Xd,Xy,"esm2017"),bt("fire-js","")}xR("");function xp(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);return n}function DE(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const kR=DE,OE=new Vi("auth","Firebase",DE());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eu=new hc("@firebase/auth");function SR(t,...e){Eu.logLevel<=se.WARN&&Eu.warn(`Auth (${ji}): ${t}`,...e)}function Ml(t,...e){Eu.logLevel<=se.ERROR&&Eu.error(`Auth (${ji}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function er(t,...e){throw kp(t,...e)}function zt(t,...e){return kp(t,...e)}function VE(t,e,n){const r=Object.assign(Object.assign({},kR()),{[e]:n});return new Vi("auth","Firebase",r).create(e,{appName:t.name})}function jr(t){return VE(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function kp(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return OE.create(t,...e)}function G(t,e,...n){if(!t)throw kp(e,...n)}function Wn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Ml(e),new Error(e)}function tr(t,e){t||Wn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tf(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function jE(){return rv()==="http:"||rv()==="https:"}function rv(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CR(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(jE()||xE()||"connection"in navigator)?navigator.onLine:!0}function AR(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ta{constructor(e,n){this.shortDelay=e,this.longDelay=n,tr(n>e,"Short delay should be less than long delay!"),this.isMobile=eA()||rA()}get(){return CR()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sp(t,e){tr(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ME{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Wn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Wn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Wn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RR={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NR=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],PR=new Ta(3e4,6e4);function On(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function wn(t,e,n,r,i={}){return LE(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const l=Ls(Object.assign({key:t.config.apiKey},o)).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const c=Object.assign({method:e,headers:u},s);return nA()||(c.referrerPolicy="no-referrer"),t.emulatorConfig&&Oi(t.emulatorConfig.host)&&(c.credentials="include"),ME.fetch()(await FE(t,t.config.apiHost,n,l),c)})}async function LE(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},RR),e);try{const i=new DR(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw mo(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const l=s.ok?o.errorMessage:o.error.message,[u,c]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw mo(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw mo(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw mo(t,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw VE(t,f,c);er(t,f)}}catch(i){if(i instanceof rn)throw i;er(t,"network-request-failed",{message:String(i)})}}async function fc(t,e,n,r,i={}){const s=await wn(t,e,n,r,i);return"mfaPendingCredential"in s&&er(t,"multi-factor-auth-required",{_serverResponse:s}),s}async function FE(t,e,n,r){const i=`${e}${n}?${r}`,s=t,o=s.config.emulator?Sp(t.config,i):`${t.config.apiScheme}://${i}`;return NR.includes(n)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}function bR(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class DR{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(zt(this.auth,"network-request-failed")),PR.get())})}}function mo(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=zt(t,e,r);return i.customData._tokenResponse=n,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iv(t){return t!==void 0&&t.getResponse!==void 0}function sv(t){return t!==void 0&&t.enterprise!==void 0}class UE{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return bR(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function OR(t){return(await wn(t,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function zE(t,e){return wn(t,"GET","/v2/recaptchaConfig",On(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function VR(t,e){return wn(t,"POST","/v1/accounts:delete",e)}async function Tu(t,e){return wn(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function No(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function jR(t,e=!1){const n=xe(t),r=await n.getIdToken(e),i=Cp(r);G(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:No(Lh(i.auth_time)),issuedAtTime:No(Lh(i.iat)),expirationTime:No(Lh(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Lh(t){return Number(t)*1e3}function Cp(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Ml("JWT malformed, contained fewer than 3 sections"),null;try{const i=vE(n);return i?JSON.parse(i):(Ml("Failed to decode base64 JWT payload"),null)}catch(i){return Ml("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function ov(t){const e=Cp(t);return G(e,"internal-error"),G(typeof e.exp<"u","internal-error"),G(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sa(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof rn&&MR(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function MR({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LR{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=No(this.lastLoginAt),this.creationTime=No(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Iu(t){var e;const n=t.auth,r=await t.getIdToken(),i=await sa(t,Tu(n,{idToken:r}));G(i==null?void 0:i.users.length,n,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?BE(s.providerUserInfo):[],l=UR(t.providerData,o),u=t.isAnonymous,c=!(t.email&&s.passwordHash)&&!(l!=null&&l.length),f=u?c:!1,m={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:l,metadata:new nf(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(t,m)}async function FR(t){const e=xe(t);await Iu(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function UR(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function BE(t){return t.map(e=>{var{providerId:n}=e,r=xp(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zR(t,e){const n=await LE(t,{},async()=>{const r=Ls({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=await FE(t,i,"/v1/token",`key=${s}`),l=await t._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:l,body:r};return t.emulatorConfig&&Oi(t.emulatorConfig.host)&&(u.credentials="include"),ME.fetch()(o,u)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function BR(t,e){return wn(t,"POST","/v2/accounts:revokeToken",On(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){G(e.idToken,"internal-error"),G(typeof e.idToken<"u","internal-error"),G(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ov(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){G(e.length!==0,"internal-error");const n=ov(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(G(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await zR(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new ps;return r&&(G(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(G(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(G(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ps,this.toJSON())}_performRefresh(){return Wn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dr(t,e){G(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class fn{constructor(e){var{uid:n,auth:r,stsTokenManager:i}=e,s=xp(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new LR(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new nf(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await sa(this,this.stsTokenManager.getToken(this.auth,e));return G(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return jR(this,e)}reload(){return FR(this)}_assign(e){this!==e&&(G(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new fn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){G(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Iu(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Qt(this.auth.app))return Promise.reject(jr(this.auth));const e=await this.getIdToken();return await sa(this,VR(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,i,s,o,l,u,c,f;const m=(r=n.displayName)!==null&&r!==void 0?r:void 0,g=(i=n.email)!==null&&i!==void 0?i:void 0,I=(s=n.phoneNumber)!==null&&s!==void 0?s:void 0,C=(o=n.photoURL)!==null&&o!==void 0?o:void 0,N=(l=n.tenantId)!==null&&l!==void 0?l:void 0,P=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,w=(c=n.createdAt)!==null&&c!==void 0?c:void 0,_=(f=n.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:k,emailVerified:b,isAnonymous:j,providerData:L,stsTokenManager:T}=n;G(k&&T,e,"internal-error");const v=ps.fromJSON(this.name,T);G(typeof k=="string",e,"internal-error"),dr(m,e.name),dr(g,e.name),G(typeof b=="boolean",e,"internal-error"),G(typeof j=="boolean",e,"internal-error"),dr(I,e.name),dr(C,e.name),dr(N,e.name),dr(P,e.name),dr(w,e.name),dr(_,e.name);const E=new fn({uid:k,auth:e,email:g,emailVerified:b,displayName:m,isAnonymous:j,photoURL:C,phoneNumber:I,tenantId:N,stsTokenManager:v,createdAt:w,lastLoginAt:_});return L&&Array.isArray(L)&&(E.providerData=L.map(S=>Object.assign({},S))),P&&(E._redirectEventId=P),E}static async _fromIdTokenResponse(e,n,r=!1){const i=new ps;i.updateFromServerResponse(n);const s=new fn({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Iu(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];G(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?BE(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),l=new ps;l.updateFromIdToken(r);const u=new fn({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:o}),c={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new nf(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,c),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const av=new Map;function Hn(t){tr(t instanceof Function,"Expected a class definition");let e=av.get(t);return e?(tr(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,av.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $E{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}$E.type="NONE";const lv=$E;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ll(t,e,n){return`firebase:${t}:${e}:${n}`}class ms{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Ll(this.userKey,i.apiKey,s),this.fullPersistenceKey=Ll("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Tu(this.auth,{idToken:e}).catch(()=>{});return n?fn._fromGetAccountInfoResponse(this.auth,n,e):null}return fn._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new ms(Hn(lv),e,r);const i=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let s=i[0]||Hn(lv);const o=Ll(r,e.config.apiKey,e.name);let l=null;for(const c of n)try{const f=await c._get(o);if(f){let m;if(typeof f=="string"){const g=await Tu(e,{idToken:f}).catch(()=>{});if(!g)break;m=await fn._fromGetAccountInfoResponse(e,g,f)}else m=fn._fromJSON(e,f);c!==s&&(l=m),s=c;break}}catch{}const u=i.filter(c=>c._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new ms(s,e,r):(s=u[0],l&&await s._set(o,l.toJSON()),await Promise.all(n.map(async c=>{if(c!==s)try{await c._remove(o)}catch{}})),new ms(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uv(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(GE(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(WE(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(QE(e))return"Blackberry";if(YE(e))return"Webos";if(HE(e))return"Safari";if((e.includes("chrome/")||qE(e))&&!e.includes("edge/"))return"Chrome";if(KE(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function WE(t=pt()){return/firefox\//i.test(t)}function HE(t=pt()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function qE(t=pt()){return/crios\//i.test(t)}function GE(t=pt()){return/iemobile/i.test(t)}function KE(t=pt()){return/android/i.test(t)}function QE(t=pt()){return/blackberry/i.test(t)}function YE(t=pt()){return/webos/i.test(t)}function Ap(t=pt()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function $R(t=pt()){var e;return Ap(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function WR(){return iA()&&document.documentMode===10}function JE(t=pt()){return Ap(t)||KE(t)||YE(t)||QE(t)||/windows phone/i.test(t)||GE(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function XE(t,e=[]){let n;switch(t){case"Browser":n=uv(pt());break;case"Worker":n=`${uv(pt())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${ji}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HR{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,l)=>{try{const u=e(s);o(u)}catch(u){l(u)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qR(t,e={}){return wn(t,"GET","/v2/passwordPolicy",On(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GR=6;class KR{constructor(e){var n,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:GR,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,i,s,o,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(n=u.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsUppercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QR{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new cv(this),this.idTokenSubscription=new cv(this),this.beforeStateQueue=new HR(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=OE,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Hn(n)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await ms.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Tu(this,{idToken:e}),r=await fn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Qt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=i==null?void 0:i._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===l)&&(u!=null&&u.user)&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return G(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Iu(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=AR()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Qt(this.app))return Promise.reject(jr(this));const n=e?xe(e):null;return n&&G(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&G(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Qt(this.app)?Promise.reject(jr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Qt(this.app)?Promise.reject(jr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Hn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await qR(this),n=new KR(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Vi("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await BR(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Hn(e)||this._popupRedirectResolver;G(n,this,"argument-error"),this.redirectPersistenceManager=await ms.create(this,[Hn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(G(l,this,"internal-error"),l.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,i);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return G(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=XE(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;if(Qt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&SR(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function ti(t){return xe(t)}class cv{constructor(e){this.auth=e,this.observer=null,this.addObserver=hA(n=>this.observer=n)}get next(){return G(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ia={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function YR(t){Ia=t}function Rp(t){return Ia.loadJS(t)}function JR(){return Ia.recaptchaV2Script}function XR(){return Ia.recaptchaEnterpriseScript}function ZR(){return Ia.gapiScript}function ZE(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const e2=500,t2=6e4,vl=1e12;class n2{constructor(e){this.auth=e,this.counter=vl,this._widgets=new Map}render(e,n){const r=this.counter;return this._widgets.set(r,new s2(e,this.auth.name,n||{})),this.counter++,r}reset(e){var n;const r=e||vl;(n=this._widgets.get(r))===null||n===void 0||n.delete(),this._widgets.delete(r)}getResponse(e){var n;const r=e||vl;return((n=this._widgets.get(r))===null||n===void 0?void 0:n.getResponse())||""}async execute(e){var n;const r=e||vl;return(n=this._widgets.get(r))===null||n===void 0||n.execute(),""}}class r2{constructor(){this.enterprise=new i2}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class i2{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class s2{constructor(e,n,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const i=typeof e=="string"?document.getElementById(e):e;G(i,"argument-error",{appName:n}),this.container=i,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=o2(50);const{callback:e,"expired-callback":n}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,n)try{n()}catch{}this.isVisible&&this.execute()},t2)},e2))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function o2(t){const e=[],n="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<t;r++)e.push(n.charAt(Math.floor(Math.random()*n.length)));return e.join("")}const a2="recaptcha-enterprise",Po="NO_RECAPTCHA";class e1{constructor(e){this.type=a2,this.auth=ti(e)}async verify(e="verify",n=!1){async function r(s){if(!n){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,l)=>{zE(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const c=new UE(u);return s.tenantId==null?s._agentRecaptchaConfig=c:s._tenantRecaptchaConfigs[s.tenantId]=c,o(c.siteKey)}}).catch(u=>{l(u)})})}function i(s,o,l){const u=window.grecaptcha;sv(u)?u.enterprise.ready(()=>{u.enterprise.execute(s,{action:e}).then(c=>{o(c)}).catch(()=>{o(Po)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new r2().execute("siteKey",{action:"verify"}):new Promise((s,o)=>{r(this.auth).then(l=>{if(!n&&sv(window.grecaptcha))i(l,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=XR();u.length!==0&&(u+=l),Rp(u).then(()=>{i(l,s,o)}).catch(c=>{o(c)})}}).catch(l=>{o(l)})})}}async function Fh(t,e,n,r=!1,i=!1){const s=new e1(t);let o;if(i)o=Po;else try{o=await s.verify(n)}catch{o=await s.verify(n,!0)}const l=Object.assign({},e);if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const u=l.phoneEnrollmentInfo.phoneNumber,c=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const u=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return r?Object.assign(l,{captchaResp:o}):Object.assign(l,{captchaResponse:o}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function Uh(t,e,n,r,i){var s;if(!((s=t._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("PHONE_PROVIDER")){const o=await Fh(t,e,n);return r(t,o).catch(async l=>{var u;if(((u=t._getRecaptchaConfig())===null||u===void 0?void 0:u.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(l.code==="auth/missing-recaptcha-token"||l.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`);const c=await Fh(t,e,n,!1,!0);return r(t,c)}return Promise.reject(l)})}else{const o=await Fh(t,e,n,!1,!0);return r(t,o)}}async function l2(t){const e=ti(t),n=await zE(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new UE(n);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new e1(e).verify()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function u2(t,e){const n=ei(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(Br(s,e??{}))return i;er(i,"already-initialized")}return n.initialize({options:e})}function c2(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Hn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function h2(t,e,n){const r=ti(t);G(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=t1(e),{host:o,port:l}=d2(e),u=l===null?"":`:${l}`,c={url:`${s}//${o}${u}/`},f=Object.freeze({host:o,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){G(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),G(Br(c,r.config.emulator)&&Br(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=c,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Oi(o)?(Ep(`${s}//${o}${u}`),Tp("Auth",!0)):f2()}function t1(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function d2(t){const e=t1(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:hv(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:hv(o)}}}function hv(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function f2(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Np{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Wn("not implemented")}_getIdTokenResponse(e){return Wn("not implemented")}_linkToIdToken(e,n){return Wn("not implemented")}_getReauthenticationResolver(e){return Wn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gs(t,e){return fc(t,"POST","/v1/accounts:signInWithIdp",On(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p2="http://localhost";class ki extends Np{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new ki(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):er("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=n,s=xp(n,["providerId","signInMethod"]);if(!r||!i)return null;const o=new ki(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return gs(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,gs(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,gs(e,n)}buildRequest(){const e={requestUri:p2,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Ls(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dv(t,e){return wn(t,"POST","/v1/accounts:sendVerificationCode",On(t,e))}async function m2(t,e){return fc(t,"POST","/v1/accounts:signInWithPhoneNumber",On(t,e))}async function g2(t,e){const n=await fc(t,"POST","/v1/accounts:signInWithPhoneNumber",On(t,e));if(n.temporaryProof)throw mo(t,"account-exists-with-different-credential",n);return n}const y2={USER_NOT_FOUND:"user-not-found"};async function v2(t,e){const n=Object.assign(Object.assign({},e),{operation:"REAUTH"});return fc(t,"POST","/v1/accounts:signInWithPhoneNumber",On(t,n),y2)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bo extends Np{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,n){return new bo({verificationId:e,verificationCode:n})}static _fromTokenResponse(e,n){return new bo({phoneNumber:e,temporaryProof:n})}_getIdTokenResponse(e){return m2(e,this._makeVerificationRequest())}_linkToIdToken(e,n){return g2(e,Object.assign({idToken:n},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return v2(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:n,verificationId:r,verificationCode:i}=this.params;return e&&n?{temporaryProof:e,phoneNumber:n}:{sessionInfo:r,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:n,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!n&&!i&&!s?null:new bo({verificationId:n,verificationCode:r,phoneNumber:i,temporaryProof:s})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n1{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xa extends n1{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr extends xa{constructor(){super("facebook.com")}static credential(e){return ki._fromParams({providerId:yr.PROVIDER_ID,signInMethod:yr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return yr.credentialFromTaggedObject(e)}static credentialFromError(e){return yr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return yr.credential(e.oauthAccessToken)}catch{return null}}}yr.FACEBOOK_SIGN_IN_METHOD="facebook.com";yr.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr extends xa{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return ki._fromParams({providerId:vr.PROVIDER_ID,signInMethod:vr.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return vr.credentialFromTaggedObject(e)}static credentialFromError(e){return vr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return vr.credential(n,r)}catch{return null}}}vr.GOOGLE_SIGN_IN_METHOD="google.com";vr.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r extends xa{constructor(){super("github.com")}static credential(e){return ki._fromParams({providerId:_r.PROVIDER_ID,signInMethod:_r.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return _r.credentialFromTaggedObject(e)}static credentialFromError(e){return _r.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return _r.credential(e.oauthAccessToken)}catch{return null}}}_r.GITHUB_SIGN_IN_METHOD="github.com";_r.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wr extends xa{constructor(){super("twitter.com")}static credential(e,n){return ki._fromParams({providerId:wr.PROVIDER_ID,signInMethod:wr.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return wr.credentialFromTaggedObject(e)}static credentialFromError(e){return wr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return wr.credential(n,r)}catch{return null}}}wr.TWITTER_SIGN_IN_METHOD="twitter.com";wr.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await fn._fromIdTokenResponse(e,r,i),o=fv(r);return new Cs({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=fv(r);return new Cs({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function fv(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xu extends rn{constructor(e,n,r,i){var s;super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,xu.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new xu(e,n,r,i)}}function r1(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?xu._fromErrorAndOperation(t,s,e,r):s})}async function _2(t,e,n=!1){const r=await sa(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Cs._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function w2(t,e,n=!1){const{auth:r}=t;if(Qt(r.app))return Promise.reject(jr(r));const i="reauthenticate";try{const s=await sa(t,r1(r,i,e,t),n);G(s.idToken,r,"internal-error");const o=Cp(s.idToken);G(o,r,"internal-error");const{sub:l}=o;return G(t.uid===l,r,"user-mismatch"),Cs._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&er(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function i1(t,e,n=!1){if(Qt(t.app))return Promise.reject(jr(t));const r="signIn",i=await r1(t,r,e),s=await Cs._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}async function E2(t,e){return i1(ti(t),e)}function T2(t,e,n,r){return xe(t).onIdTokenChanged(e,n,r)}function I2(t,e,n){return xe(t).beforeAuthStateChanged(e,n)}function x2(t,e,n,r){return xe(t).onAuthStateChanged(e,n,r)}function k2(t){return xe(t).signOut()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pv(t,e){return wn(t,"POST","/v2/accounts/mfaEnrollment:start",On(t,e))}const ku="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s1{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(ku,"1"),this.storage.removeItem(ku),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S2=1e3,C2=10;class o1 extends s1{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=JE(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);WR()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,C2):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},S2)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}o1.type="LOCAL";const A2=o1;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a1 extends s1{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}a1.type="SESSION";const l1=a1;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R2(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new pc(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const l=Array.from(o).map(async c=>c(n.origin,s)),u=await R2(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}pc.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pp(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N2{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((l,u)=>{const c=Pp("",20);i.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(m){const g=m;if(g.data.eventId===c)switch(g.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(g.data.response);break;default:clearTimeout(f),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Me(){return window}function P2(t){Me().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bp(){return typeof Me().WorkerGlobalScope<"u"&&typeof Me().importScripts=="function"}async function b2(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function D2(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function O2(){return bp()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u1="firebaseLocalStorageDb",V2=1,Su="firebaseLocalStorage",c1="fbase_key";class ka{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function mc(t,e){return t.transaction([Su],e?"readwrite":"readonly").objectStore(Su)}function j2(){const t=indexedDB.deleteDatabase(u1);return new ka(t).toPromise()}function rf(){const t=indexedDB.open(u1,V2);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Su,{keyPath:c1})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Su)?e(r):(r.close(),await j2(),e(await rf()))})})}async function mv(t,e,n){const r=mc(t,!0).put({[c1]:e,value:n});return new ka(r).toPromise()}async function M2(t,e){const n=mc(t,!1).get(e),r=await new ka(n).toPromise();return r===void 0?null:r.value}function gv(t,e){const n=mc(t,!0).delete(e);return new ka(n).toPromise()}const L2=800,F2=3;class h1{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await rf(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>F2)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return bp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=pc._getInstance(O2()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await b2(),!this.activeServiceWorker)return;this.sender=new N2(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||D2()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await rf();return await mv(e,ku,"1"),await gv(e,ku),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>mv(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>M2(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>gv(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=mc(i,!1).getAll();return new ka(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),L2)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}h1.type="LOCAL";const U2=h1;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yv(t,e){return wn(t,"POST","/v2/accounts/mfaSignIn:start",On(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zh=ZE("rcb"),z2=new Ta(3e4,6e4);class B2{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(!((e=Me().grecaptcha)===null||e===void 0)&&e.render)}load(e,n=""){return G($2(n),e,"argument-error"),this.shouldResolveImmediately(n)&&iv(Me().grecaptcha)?Promise.resolve(Me().grecaptcha):new Promise((r,i)=>{const s=Me().setTimeout(()=>{i(zt(e,"network-request-failed"))},z2.get());Me()[zh]=()=>{Me().clearTimeout(s),delete Me()[zh];const l=Me().grecaptcha;if(!l||!iv(l)){i(zt(e,"internal-error"));return}const u=l.render;l.render=(c,f)=>{const m=u(c,f);return this.counter++,m},this.hostLanguage=n,r(l)};const o=`${JR()}?${Ls({onload:zh,render:"explicit",hl:n})}`;Rp(o).catch(()=>{clearTimeout(s),i(zt(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var n;return!!(!((n=Me().grecaptcha)===null||n===void 0)&&n.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function $2(t){return t.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(t)}class W2{async load(e){return new n2(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Do="recaptcha",H2={theme:"light",type:"image"};class vv{constructor(e,n,r=Object.assign({},H2)){this.parameters=r,this.type=Do,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=ti(e),this.isInvisible=this.parameters.size==="invisible",G(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const i=typeof n=="string"?document.getElementById(n):n;G(i,this.auth,"argument-error"),this.container=i,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new W2:new B2,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),n=this.getAssertedRecaptcha(),r=n.getResponse(e);return r||new Promise(i=>{const s=o=>{o&&(this.tokenChangeListeners.delete(s),i(o))};this.tokenChangeListeners.add(s),this.isInvisible&&n.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){G(!this.parameters.sitekey,this.auth,"argument-error"),G(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),G(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return n=>{if(this.tokenChangeListeners.forEach(r=>r(n)),typeof e=="function")e(n);else if(typeof e=="string"){const r=Me()[e];typeof r=="function"&&r(n)}}}assertNotDestroyed(){G(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const n=document.createElement("div");e.appendChild(n),e=n}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){G(jE()&&!bp(),this.auth,"internal-error"),await q2(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await OR(this.auth);G(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return G(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function q2(){let t=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}t=()=>e(),window.addEventListener("load",t)}).catch(e=>{throw t&&window.removeEventListener("load",t),e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G2{constructor(e,n){this.verificationId=e,this.onConfirmation=n}confirm(e){const n=bo._fromVerification(this.verificationId,e);return this.onConfirmation(n)}}async function K2(t,e,n){if(Qt(t.app))return Promise.reject(jr(t));const r=ti(t),i=await Q2(r,e,xe(n));return new G2(i,s=>E2(r,s))}async function Q2(t,e,n){var r;if(!t._getRecaptchaConfig())try{await l2(t)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let i;if(typeof e=="string"?i={phoneNumber:e}:i=e,"session"in i){const s=i.session;if("phoneNumber"in i){G(s.type==="enroll",t,"internal-error");const o={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await Uh(t,o,"mfaSmsEnrollment",async(f,m)=>{if(m.phoneEnrollmentInfo.captchaResponse===Po){G((n==null?void 0:n.type)===Do,f,"argument-error");const g=await Bh(f,m,n);return pv(f,g)}return pv(f,m)},"PHONE_PROVIDER").catch(f=>Promise.reject(f))).phoneSessionInfo.sessionInfo}else{G(s.type==="signin",t,"internal-error");const o=((r=i.multiFactorHint)===null||r===void 0?void 0:r.uid)||i.multiFactorUid;G(o,t,"missing-multi-factor-info");const l={mfaPendingCredential:s.credential,mfaEnrollmentId:o,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await Uh(t,l,"mfaSmsSignIn",async(m,g)=>{if(g.phoneSignInInfo.captchaResponse===Po){G((n==null?void 0:n.type)===Do,m,"argument-error");const I=await Bh(m,g,n);return yv(m,I)}return yv(m,g)},"PHONE_PROVIDER").catch(m=>Promise.reject(m))).phoneResponseInfo.sessionInfo}}else{const s={phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await Uh(t,s,"sendVerificationCode",async(c,f)=>{if(f.captchaResponse===Po){G((n==null?void 0:n.type)===Do,c,"argument-error");const m=await Bh(c,f,n);return dv(c,m)}return dv(c,f)},"PHONE_PROVIDER").catch(c=>Promise.reject(c))).sessionInfo}}finally{n==null||n._reset()}}async function Bh(t,e,n){G(n.type===Do,t,"argument-error");const r=await n.verify();G(typeof r=="string",t,"argument-error");const i=Object.assign({},e);if("phoneEnrollmentInfo"in i){const s=i.phoneEnrollmentInfo.phoneNumber,o=i.phoneEnrollmentInfo.captchaResponse,l=i.phoneEnrollmentInfo.clientType,u=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:s,recaptchaToken:r,captchaResponse:o,clientType:l,recaptchaVersion:u}}),i}else if("phoneSignInInfo"in i){const s=i.phoneSignInInfo.captchaResponse,o=i.phoneSignInInfo.clientType,l=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:s,clientType:o,recaptchaVersion:l}}),i}else return Object.assign(i,{recaptchaToken:r}),i}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y2(t,e){return e?Hn(e):(G(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dp extends Np{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return gs(e,this._buildIdpRequest())}_linkToIdToken(e,n){return gs(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return gs(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function J2(t){return i1(t.auth,new Dp(t),t.bypassAuthState)}function X2(t){const{auth:e,user:n}=t;return G(n,e,"internal-error"),w2(n,new Dp(t),t.bypassAuthState)}async function Z2(t){const{auth:e,user:n}=t;return G(n,e,"internal-error"),_2(n,new Dp(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d1{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:l}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return J2;case"linkViaPopup":case"linkViaRedirect":return Z2;case"reauthViaPopup":case"reauthViaRedirect":return X2;default:er(this.auth,"internal-error")}}resolve(e){tr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){tr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eN=new Ta(2e3,1e4);class as extends d1{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,as.currentPopupAction&&as.currentPopupAction.cancel(),as.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return G(e,this.auth,"internal-error"),e}async onExecution(){tr(this.filter.length===1,"Popup operations only handle one event");const e=Pp();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(zt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(zt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,as.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(zt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,eN.get())};e()}}as.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tN="pendingRedirect",Fl=new Map;class nN extends d1{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Fl.get(this.auth._key());if(!e){try{const r=await rN(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Fl.set(this.auth._key(),e)}return this.bypassAuthState||Fl.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function rN(t,e){const n=oN(e),r=sN(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function iN(t,e){Fl.set(t._key(),e)}function sN(t){return Hn(t._redirectPersistence)}function oN(t){return Ll(tN,t.config.apiKey,t.name)}async function aN(t,e,n=!1){if(Qt(t.app))return Promise.reject(jr(t));const r=ti(t),i=Y2(r,e),o=await new nN(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lN=10*60*1e3;class uN{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!cN(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!f1(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(zt(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=lN&&this.cachedEventUids.clear(),this.cachedEventUids.has(_v(e))}saveEventToCache(e){this.cachedEventUids.add(_v(e)),this.lastProcessedEventTime=Date.now()}}function _v(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function f1({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function cN(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return f1(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hN(t,e={}){return wn(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dN=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,fN=/^https?/;async function pN(t){if(t.config.emulator)return;const{authorizedDomains:e}=await hN(t);for(const n of e)try{if(mN(n))return}catch{}er(t,"unauthorized-domain")}function mN(t){const e=tf(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!fN.test(n))return!1;if(dN.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gN=new Ta(3e4,6e4);function wv(){const t=Me().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function yN(t){return new Promise((e,n)=>{var r,i,s;function o(){wv(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{wv(),n(zt(t,"network-request-failed"))},timeout:gN.get()})}if(!((i=(r=Me().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=Me().gapi)===null||s===void 0)&&s.load)o();else{const l=ZE("iframefcb");return Me()[l]=()=>{gapi.load?o():n(zt(t,"network-request-failed"))},Rp(`${ZR()}?onload=${l}`).catch(u=>n(u))}}).catch(e=>{throw Ul=null,e})}let Ul=null;function vN(t){return Ul=Ul||yN(t),Ul}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _N=new Ta(5e3,15e3),wN="__/auth/iframe",EN="emulator/auth/iframe",TN={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},IN=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function xN(t){const e=t.config;G(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Sp(e,EN):`https://${t.config.authDomain}/${wN}`,r={apiKey:e.apiKey,appName:t.name,v:ji},i=IN.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${Ls(r).slice(1)}`}async function kN(t){const e=await vN(t),n=Me().gapi;return G(n,t,"internal-error"),e.open({where:document.body,url:xN(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:TN,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=zt(t,"network-request-failed"),l=Me().setTimeout(()=>{s(o)},_N.get());function u(){Me().clearTimeout(l),i(r)}r.ping(u).then(u,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SN={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},CN=500,AN=600,RN="_blank",NN="http://localhost";class Ev{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function PN(t,e,n,r=CN,i=AN){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},SN),{width:r.toString(),height:i.toString(),top:s,left:o}),c=pt().toLowerCase();n&&(l=qE(c)?RN:n),WE(c)&&(e=e||NN,u.scrollbars="yes");const f=Object.entries(u).reduce((g,[I,C])=>`${g}${I}=${C},`,"");if($R(c)&&l!=="_self")return bN(e||"",l),new Ev(null);const m=window.open(e||"",l,f);G(m,t,"popup-blocked");try{m.focus()}catch{}return new Ev(m)}function bN(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DN="__/auth/handler",ON="emulator/auth/handler",VN=encodeURIComponent("fac");async function Tv(t,e,n,r,i,s){G(t.config.authDomain,t,"auth-domain-config-required"),G(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:ji,eventId:i};if(e instanceof n1){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",cA(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))o[f]=m}if(e instanceof xa){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(o.scopes=f.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const u=await t._getAppCheckToken(),c=u?`#${VN}=${encodeURIComponent(u)}`:"";return`${jN(t)}?${Ls(l).slice(1)}${c}`}function jN({config:t}){return t.emulator?Sp(t,ON):`https://${t.authDomain}/${DN}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $h="webStorageSupport";class MN{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=l1,this._completeRedirectFn=aN,this._overrideRedirectResult=iN}async _openPopup(e,n,r,i){var s;tr((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await Tv(e,n,r,tf(),i);return PN(e,o,Pp())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await Tv(e,n,r,tf(),i);return P2(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(tr(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await kN(e),r=new uN(e);return n.register("authEvent",i=>(G(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send($h,{type:$h},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[$h];o!==void 0&&n(!!o),er(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=pN(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return JE()||HE()||Ap()}}const LN=MN;var Iv="@firebase/auth",xv="1.10.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FN{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){G(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function UN(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function zN(t){vn(new nn("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;G(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:XE(t)},c=new QR(r,i,s,u);return c2(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),vn(new nn("auth-internal",e=>{const n=ti(e.getProvider("auth").getImmediate());return(r=>new FN(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),bt(Iv,xv,UN(t)),bt(Iv,xv,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BN=5*60,$N=TE("authIdTokenMaxAge")||BN;let kv=null;const WN=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>$N)return;const i=n==null?void 0:n.token;kv!==i&&(kv=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function HN(t=dc()){const e=ei(t,"auth");if(e.isInitialized())return e.getImmediate();const n=u2(t,{popupRedirectResolver:LN,persistence:[U2,A2,l1]}),r=TE("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=WN(s.toString());I2(n,o,()=>o(n.currentUser)),T2(n,l=>o(l))}}const i=_E("auth");return i&&h2(n,`http://${i}`),n}function qN(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}YR({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=zt("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",qN().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});zN("Browser");var Sv=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Mr,p1;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,v){function E(){}E.prototype=v.prototype,T.D=v.prototype,T.prototype=new E,T.prototype.constructor=T,T.C=function(S,R,A){for(var x=Array(arguments.length-2),Y=2;Y<arguments.length;Y++)x[Y-2]=arguments[Y];return v.prototype[R].apply(S,x)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(T,v,E){E||(E=0);var S=Array(16);if(typeof v=="string")for(var R=0;16>R;++R)S[R]=v.charCodeAt(E++)|v.charCodeAt(E++)<<8|v.charCodeAt(E++)<<16|v.charCodeAt(E++)<<24;else for(R=0;16>R;++R)S[R]=v[E++]|v[E++]<<8|v[E++]<<16|v[E++]<<24;v=T.g[0],E=T.g[1],R=T.g[2];var A=T.g[3],x=v+(A^E&(R^A))+S[0]+3614090360&4294967295;v=E+(x<<7&4294967295|x>>>25),x=A+(R^v&(E^R))+S[1]+3905402710&4294967295,A=v+(x<<12&4294967295|x>>>20),x=R+(E^A&(v^E))+S[2]+606105819&4294967295,R=A+(x<<17&4294967295|x>>>15),x=E+(v^R&(A^v))+S[3]+3250441966&4294967295,E=R+(x<<22&4294967295|x>>>10),x=v+(A^E&(R^A))+S[4]+4118548399&4294967295,v=E+(x<<7&4294967295|x>>>25),x=A+(R^v&(E^R))+S[5]+1200080426&4294967295,A=v+(x<<12&4294967295|x>>>20),x=R+(E^A&(v^E))+S[6]+2821735955&4294967295,R=A+(x<<17&4294967295|x>>>15),x=E+(v^R&(A^v))+S[7]+4249261313&4294967295,E=R+(x<<22&4294967295|x>>>10),x=v+(A^E&(R^A))+S[8]+1770035416&4294967295,v=E+(x<<7&4294967295|x>>>25),x=A+(R^v&(E^R))+S[9]+2336552879&4294967295,A=v+(x<<12&4294967295|x>>>20),x=R+(E^A&(v^E))+S[10]+4294925233&4294967295,R=A+(x<<17&4294967295|x>>>15),x=E+(v^R&(A^v))+S[11]+2304563134&4294967295,E=R+(x<<22&4294967295|x>>>10),x=v+(A^E&(R^A))+S[12]+1804603682&4294967295,v=E+(x<<7&4294967295|x>>>25),x=A+(R^v&(E^R))+S[13]+4254626195&4294967295,A=v+(x<<12&4294967295|x>>>20),x=R+(E^A&(v^E))+S[14]+2792965006&4294967295,R=A+(x<<17&4294967295|x>>>15),x=E+(v^R&(A^v))+S[15]+1236535329&4294967295,E=R+(x<<22&4294967295|x>>>10),x=v+(R^A&(E^R))+S[1]+4129170786&4294967295,v=E+(x<<5&4294967295|x>>>27),x=A+(E^R&(v^E))+S[6]+3225465664&4294967295,A=v+(x<<9&4294967295|x>>>23),x=R+(v^E&(A^v))+S[11]+643717713&4294967295,R=A+(x<<14&4294967295|x>>>18),x=E+(A^v&(R^A))+S[0]+3921069994&4294967295,E=R+(x<<20&4294967295|x>>>12),x=v+(R^A&(E^R))+S[5]+3593408605&4294967295,v=E+(x<<5&4294967295|x>>>27),x=A+(E^R&(v^E))+S[10]+38016083&4294967295,A=v+(x<<9&4294967295|x>>>23),x=R+(v^E&(A^v))+S[15]+3634488961&4294967295,R=A+(x<<14&4294967295|x>>>18),x=E+(A^v&(R^A))+S[4]+3889429448&4294967295,E=R+(x<<20&4294967295|x>>>12),x=v+(R^A&(E^R))+S[9]+568446438&4294967295,v=E+(x<<5&4294967295|x>>>27),x=A+(E^R&(v^E))+S[14]+3275163606&4294967295,A=v+(x<<9&4294967295|x>>>23),x=R+(v^E&(A^v))+S[3]+4107603335&4294967295,R=A+(x<<14&4294967295|x>>>18),x=E+(A^v&(R^A))+S[8]+1163531501&4294967295,E=R+(x<<20&4294967295|x>>>12),x=v+(R^A&(E^R))+S[13]+2850285829&4294967295,v=E+(x<<5&4294967295|x>>>27),x=A+(E^R&(v^E))+S[2]+4243563512&4294967295,A=v+(x<<9&4294967295|x>>>23),x=R+(v^E&(A^v))+S[7]+1735328473&4294967295,R=A+(x<<14&4294967295|x>>>18),x=E+(A^v&(R^A))+S[12]+2368359562&4294967295,E=R+(x<<20&4294967295|x>>>12),x=v+(E^R^A)+S[5]+4294588738&4294967295,v=E+(x<<4&4294967295|x>>>28),x=A+(v^E^R)+S[8]+2272392833&4294967295,A=v+(x<<11&4294967295|x>>>21),x=R+(A^v^E)+S[11]+1839030562&4294967295,R=A+(x<<16&4294967295|x>>>16),x=E+(R^A^v)+S[14]+4259657740&4294967295,E=R+(x<<23&4294967295|x>>>9),x=v+(E^R^A)+S[1]+2763975236&4294967295,v=E+(x<<4&4294967295|x>>>28),x=A+(v^E^R)+S[4]+1272893353&4294967295,A=v+(x<<11&4294967295|x>>>21),x=R+(A^v^E)+S[7]+4139469664&4294967295,R=A+(x<<16&4294967295|x>>>16),x=E+(R^A^v)+S[10]+3200236656&4294967295,E=R+(x<<23&4294967295|x>>>9),x=v+(E^R^A)+S[13]+681279174&4294967295,v=E+(x<<4&4294967295|x>>>28),x=A+(v^E^R)+S[0]+3936430074&4294967295,A=v+(x<<11&4294967295|x>>>21),x=R+(A^v^E)+S[3]+3572445317&4294967295,R=A+(x<<16&4294967295|x>>>16),x=E+(R^A^v)+S[6]+76029189&4294967295,E=R+(x<<23&4294967295|x>>>9),x=v+(E^R^A)+S[9]+3654602809&4294967295,v=E+(x<<4&4294967295|x>>>28),x=A+(v^E^R)+S[12]+3873151461&4294967295,A=v+(x<<11&4294967295|x>>>21),x=R+(A^v^E)+S[15]+530742520&4294967295,R=A+(x<<16&4294967295|x>>>16),x=E+(R^A^v)+S[2]+3299628645&4294967295,E=R+(x<<23&4294967295|x>>>9),x=v+(R^(E|~A))+S[0]+4096336452&4294967295,v=E+(x<<6&4294967295|x>>>26),x=A+(E^(v|~R))+S[7]+1126891415&4294967295,A=v+(x<<10&4294967295|x>>>22),x=R+(v^(A|~E))+S[14]+2878612391&4294967295,R=A+(x<<15&4294967295|x>>>17),x=E+(A^(R|~v))+S[5]+4237533241&4294967295,E=R+(x<<21&4294967295|x>>>11),x=v+(R^(E|~A))+S[12]+1700485571&4294967295,v=E+(x<<6&4294967295|x>>>26),x=A+(E^(v|~R))+S[3]+2399980690&4294967295,A=v+(x<<10&4294967295|x>>>22),x=R+(v^(A|~E))+S[10]+4293915773&4294967295,R=A+(x<<15&4294967295|x>>>17),x=E+(A^(R|~v))+S[1]+2240044497&4294967295,E=R+(x<<21&4294967295|x>>>11),x=v+(R^(E|~A))+S[8]+1873313359&4294967295,v=E+(x<<6&4294967295|x>>>26),x=A+(E^(v|~R))+S[15]+4264355552&4294967295,A=v+(x<<10&4294967295|x>>>22),x=R+(v^(A|~E))+S[6]+2734768916&4294967295,R=A+(x<<15&4294967295|x>>>17),x=E+(A^(R|~v))+S[13]+1309151649&4294967295,E=R+(x<<21&4294967295|x>>>11),x=v+(R^(E|~A))+S[4]+4149444226&4294967295,v=E+(x<<6&4294967295|x>>>26),x=A+(E^(v|~R))+S[11]+3174756917&4294967295,A=v+(x<<10&4294967295|x>>>22),x=R+(v^(A|~E))+S[2]+718787259&4294967295,R=A+(x<<15&4294967295|x>>>17),x=E+(A^(R|~v))+S[9]+3951481745&4294967295,T.g[0]=T.g[0]+v&4294967295,T.g[1]=T.g[1]+(R+(x<<21&4294967295|x>>>11))&4294967295,T.g[2]=T.g[2]+R&4294967295,T.g[3]=T.g[3]+A&4294967295}r.prototype.u=function(T,v){v===void 0&&(v=T.length);for(var E=v-this.blockSize,S=this.B,R=this.h,A=0;A<v;){if(R==0)for(;A<=E;)i(this,T,A),A+=this.blockSize;if(typeof T=="string"){for(;A<v;)if(S[R++]=T.charCodeAt(A++),R==this.blockSize){i(this,S),R=0;break}}else for(;A<v;)if(S[R++]=T[A++],R==this.blockSize){i(this,S),R=0;break}}this.h=R,this.o+=v},r.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var v=1;v<T.length-8;++v)T[v]=0;var E=8*this.o;for(v=T.length-8;v<T.length;++v)T[v]=E&255,E/=256;for(this.u(T),T=Array(16),v=E=0;4>v;++v)for(var S=0;32>S;S+=8)T[E++]=this.g[v]>>>S&255;return T};function s(T,v){var E=l;return Object.prototype.hasOwnProperty.call(E,T)?E[T]:E[T]=v(T)}function o(T,v){this.h=v;for(var E=[],S=!0,R=T.length-1;0<=R;R--){var A=T[R]|0;S&&A==v||(E[R]=A,S=!1)}this.g=E}var l={};function u(T){return-128<=T&&128>T?s(T,function(v){return new o([v|0],0>v?-1:0)}):new o([T|0],0>T?-1:0)}function c(T){if(isNaN(T)||!isFinite(T))return m;if(0>T)return P(c(-T));for(var v=[],E=1,S=0;T>=E;S++)v[S]=T/E|0,E*=4294967296;return new o(v,0)}function f(T,v){if(T.length==0)throw Error("number format error: empty string");if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(T.charAt(0)=="-")return P(f(T.substring(1),v));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var E=c(Math.pow(v,8)),S=m,R=0;R<T.length;R+=8){var A=Math.min(8,T.length-R),x=parseInt(T.substring(R,R+A),v);8>A?(A=c(Math.pow(v,A)),S=S.j(A).add(c(x))):(S=S.j(E),S=S.add(c(x)))}return S}var m=u(0),g=u(1),I=u(16777216);t=o.prototype,t.m=function(){if(N(this))return-P(this).m();for(var T=0,v=1,E=0;E<this.g.length;E++){var S=this.i(E);T+=(0<=S?S:4294967296+S)*v,v*=4294967296}return T},t.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(C(this))return"0";if(N(this))return"-"+P(this).toString(T);for(var v=c(Math.pow(T,6)),E=this,S="";;){var R=b(E,v).g;E=w(E,R.j(v));var A=((0<E.g.length?E.g[0]:E.h)>>>0).toString(T);if(E=R,C(E))return A+S;for(;6>A.length;)A="0"+A;S=A+S}},t.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function C(T){if(T.h!=0)return!1;for(var v=0;v<T.g.length;v++)if(T.g[v]!=0)return!1;return!0}function N(T){return T.h==-1}t.l=function(T){return T=w(this,T),N(T)?-1:C(T)?0:1};function P(T){for(var v=T.g.length,E=[],S=0;S<v;S++)E[S]=~T.g[S];return new o(E,~T.h).add(g)}t.abs=function(){return N(this)?P(this):this},t.add=function(T){for(var v=Math.max(this.g.length,T.g.length),E=[],S=0,R=0;R<=v;R++){var A=S+(this.i(R)&65535)+(T.i(R)&65535),x=(A>>>16)+(this.i(R)>>>16)+(T.i(R)>>>16);S=x>>>16,A&=65535,x&=65535,E[R]=x<<16|A}return new o(E,E[E.length-1]&-2147483648?-1:0)};function w(T,v){return T.add(P(v))}t.j=function(T){if(C(this)||C(T))return m;if(N(this))return N(T)?P(this).j(P(T)):P(P(this).j(T));if(N(T))return P(this.j(P(T)));if(0>this.l(I)&&0>T.l(I))return c(this.m()*T.m());for(var v=this.g.length+T.g.length,E=[],S=0;S<2*v;S++)E[S]=0;for(S=0;S<this.g.length;S++)for(var R=0;R<T.g.length;R++){var A=this.i(S)>>>16,x=this.i(S)&65535,Y=T.i(R)>>>16,ae=T.i(R)&65535;E[2*S+2*R]+=x*ae,_(E,2*S+2*R),E[2*S+2*R+1]+=A*ae,_(E,2*S+2*R+1),E[2*S+2*R+1]+=x*Y,_(E,2*S+2*R+1),E[2*S+2*R+2]+=A*Y,_(E,2*S+2*R+2)}for(S=0;S<v;S++)E[S]=E[2*S+1]<<16|E[2*S];for(S=v;S<2*v;S++)E[S]=0;return new o(E,0)};function _(T,v){for(;(T[v]&65535)!=T[v];)T[v+1]+=T[v]>>>16,T[v]&=65535,v++}function k(T,v){this.g=T,this.h=v}function b(T,v){if(C(v))throw Error("division by zero");if(C(T))return new k(m,m);if(N(T))return v=b(P(T),v),new k(P(v.g),P(v.h));if(N(v))return v=b(T,P(v)),new k(P(v.g),v.h);if(30<T.g.length){if(N(T)||N(v))throw Error("slowDivide_ only works with positive integers.");for(var E=g,S=v;0>=S.l(T);)E=j(E),S=j(S);var R=L(E,1),A=L(S,1);for(S=L(S,2),E=L(E,2);!C(S);){var x=A.add(S);0>=x.l(T)&&(R=R.add(E),A=x),S=L(S,1),E=L(E,1)}return v=w(T,R.j(v)),new k(R,v)}for(R=m;0<=T.l(v);){for(E=Math.max(1,Math.floor(T.m()/v.m())),S=Math.ceil(Math.log(E)/Math.LN2),S=48>=S?1:Math.pow(2,S-48),A=c(E),x=A.j(v);N(x)||0<x.l(T);)E-=S,A=c(E),x=A.j(v);C(A)&&(A=g),R=R.add(A),T=w(T,x)}return new k(R,T)}t.A=function(T){return b(this,T).h},t.and=function(T){for(var v=Math.max(this.g.length,T.g.length),E=[],S=0;S<v;S++)E[S]=this.i(S)&T.i(S);return new o(E,this.h&T.h)},t.or=function(T){for(var v=Math.max(this.g.length,T.g.length),E=[],S=0;S<v;S++)E[S]=this.i(S)|T.i(S);return new o(E,this.h|T.h)},t.xor=function(T){for(var v=Math.max(this.g.length,T.g.length),E=[],S=0;S<v;S++)E[S]=this.i(S)^T.i(S);return new o(E,this.h^T.h)};function j(T){for(var v=T.g.length+1,E=[],S=0;S<v;S++)E[S]=T.i(S)<<1|T.i(S-1)>>>31;return new o(E,T.h)}function L(T,v){var E=v>>5;v%=32;for(var S=T.g.length-E,R=[],A=0;A<S;A++)R[A]=0<v?T.i(A+E)>>>v|T.i(A+E+1)<<32-v:T.i(A+E);return new o(R,T.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,p1=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=c,o.fromString=f,Mr=o}).apply(typeof Sv<"u"?Sv:typeof self<"u"?self:typeof window<"u"?window:{});var _l=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var m1,go,g1,zl,sf,y1,v1,_1;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,d,p){return a==Array.prototype||a==Object.prototype||(a[d]=p.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof _l=="object"&&_l];for(var d=0;d<a.length;++d){var p=a[d];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var r=n(this);function i(a,d){if(d)e:{var p=r;a=a.split(".");for(var y=0;y<a.length-1;y++){var O=a[y];if(!(O in p))break e;p=p[O]}a=a[a.length-1],y=p[a],d=d(y),d!=y&&d!=null&&e(p,a,{configurable:!0,writable:!0,value:d})}}function s(a,d){a instanceof String&&(a+="");var p=0,y=!1,O={next:function(){if(!y&&p<a.length){var V=p++;return{value:d(V,a[V]),done:!1}}return y=!0,{done:!0,value:void 0}}};return O[Symbol.iterator]=function(){return O},O}i("Array.prototype.values",function(a){return a||function(){return s(this,function(d,p){return p})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function u(a){var d=typeof a;return d=d!="object"?d:a?Array.isArray(a)?"array":d:"null",d=="array"||d=="object"&&typeof a.length=="number"}function c(a){var d=typeof a;return d=="object"&&a!=null||d=="function"}function f(a,d,p){return a.call.apply(a.bind,arguments)}function m(a,d,p){if(!a)throw Error();if(2<arguments.length){var y=Array.prototype.slice.call(arguments,2);return function(){var O=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(O,y),a.apply(d,O)}}return function(){return a.apply(d,arguments)}}function g(a,d,p){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,g.apply(null,arguments)}function I(a,d){var p=Array.prototype.slice.call(arguments,1);return function(){var y=p.slice();return y.push.apply(y,arguments),a.apply(this,y)}}function C(a,d){function p(){}p.prototype=d.prototype,a.aa=d.prototype,a.prototype=new p,a.prototype.constructor=a,a.Qb=function(y,O,V){for(var B=Array(arguments.length-2),ge=2;ge<arguments.length;ge++)B[ge-2]=arguments[ge];return d.prototype[O].apply(y,B)}}function N(a){const d=a.length;if(0<d){const p=Array(d);for(let y=0;y<d;y++)p[y]=a[y];return p}return[]}function P(a,d){for(let p=1;p<arguments.length;p++){const y=arguments[p];if(u(y)){const O=a.length||0,V=y.length||0;a.length=O+V;for(let B=0;B<V;B++)a[O+B]=y[B]}else a.push(y)}}class w{constructor(d,p){this.i=d,this.j=p,this.h=0,this.g=null}get(){let d;return 0<this.h?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function _(a){return/^[\s\xa0]*$/.test(a)}function k(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function b(a){return b[" "](a),a}b[" "]=function(){};var j=k().indexOf("Gecko")!=-1&&!(k().toLowerCase().indexOf("webkit")!=-1&&k().indexOf("Edge")==-1)&&!(k().indexOf("Trident")!=-1||k().indexOf("MSIE")!=-1)&&k().indexOf("Edge")==-1;function L(a,d,p){for(const y in a)d.call(p,a[y],y,a)}function T(a,d){for(const p in a)d.call(void 0,a[p],p,a)}function v(a){const d={};for(const p in a)d[p]=a[p];return d}const E="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function S(a,d){let p,y;for(let O=1;O<arguments.length;O++){y=arguments[O];for(p in y)a[p]=y[p];for(let V=0;V<E.length;V++)p=E[V],Object.prototype.hasOwnProperty.call(y,p)&&(a[p]=y[p])}}function R(a){var d=1;a=a.split(":");const p=[];for(;0<d&&a.length;)p.push(a.shift()),d--;return a.length&&p.push(a.join(":")),p}function A(a){l.setTimeout(()=>{throw a},0)}function x(){var a=z;let d=null;return a.g&&(d=a.g,a.g=a.g.next,a.g||(a.h=null),d.next=null),d}class Y{constructor(){this.h=this.g=null}add(d,p){const y=ae.get();y.set(d,p),this.h?this.h.next=y:this.g=y,this.h=y}}var ae=new w(()=>new Ve,a=>a.reset());class Ve{constructor(){this.next=this.g=this.h=null}set(d,p){this.h=d,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let rt,$=!1,z=new Y,J=()=>{const a=l.Promise.resolve(void 0);rt=()=>{a.then(ce)}};var ce=()=>{for(var a;a=x();){try{a.h.call(a.g)}catch(p){A(p)}var d=ae;d.j(a),100>d.h&&(d.h++,a.next=d.g,d.g=a)}$=!1};function K(){this.s=this.s,this.C=this.C}K.prototype.s=!1,K.prototype.ma=function(){this.s||(this.s=!0,this.N())},K.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function re(a,d){this.type=a,this.g=this.target=d,this.defaultPrevented=!1}re.prototype.h=function(){this.defaultPrevented=!0};var mt=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,d=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const p=()=>{};l.addEventListener("test",p,d),l.removeEventListener("test",p,d)}catch{}return a}();function Ke(a,d){if(re.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var p=this.type=a.type,y=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=d,d=a.relatedTarget){if(j){e:{try{b(d.nodeName);var O=!0;break e}catch{}O=!1}O||(d=null)}}else p=="mouseover"?d=a.fromElement:p=="mouseout"&&(d=a.toElement);this.relatedTarget=d,y?(this.clientX=y.clientX!==void 0?y.clientX:y.pageX,this.clientY=y.clientY!==void 0?y.clientY:y.pageY,this.screenX=y.screenX||0,this.screenY=y.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Vt[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Ke.aa.h.call(this)}}C(Ke,re);var Vt={2:"touch",3:"pen",4:"mouse"};Ke.prototype.h=function(){Ke.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Mn="closure_listenable_"+(1e6*Math.random()|0),RI=0;function NI(a,d,p,y,O){this.listener=a,this.proxy=null,this.src=d,this.type=p,this.capture=!!y,this.ha=O,this.key=++RI,this.da=this.fa=!1}function Ma(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function La(a){this.src=a,this.g={},this.h=0}La.prototype.add=function(a,d,p,y,O){var V=a.toString();a=this.g[V],a||(a=this.g[V]=[],this.h++);var B=Lc(a,d,y,O);return-1<B?(d=a[B],p||(d.fa=!1)):(d=new NI(d,this.src,V,!!y,O),d.fa=p,a.push(d)),d};function Mc(a,d){var p=d.type;if(p in a.g){var y=a.g[p],O=Array.prototype.indexOf.call(y,d,void 0),V;(V=0<=O)&&Array.prototype.splice.call(y,O,1),V&&(Ma(d),a.g[p].length==0&&(delete a.g[p],a.h--))}}function Lc(a,d,p,y){for(var O=0;O<a.length;++O){var V=a[O];if(!V.da&&V.listener==d&&V.capture==!!p&&V.ha==y)return O}return-1}var Fc="closure_lm_"+(1e6*Math.random()|0),Uc={};function Rm(a,d,p,y,O){if(Array.isArray(d)){for(var V=0;V<d.length;V++)Rm(a,d[V],p,y,O);return null}return p=bm(p),a&&a[Mn]?a.K(d,p,c(y)?!!y.capture:!1,O):PI(a,d,p,!1,y,O)}function PI(a,d,p,y,O,V){if(!d)throw Error("Invalid event type");var B=c(O)?!!O.capture:!!O,ge=Bc(a);if(ge||(a[Fc]=ge=new La(a)),p=ge.add(d,p,y,B,V),p.proxy)return p;if(y=bI(),p.proxy=y,y.src=a,y.listener=p,a.addEventListener)mt||(O=B),O===void 0&&(O=!1),a.addEventListener(d.toString(),y,O);else if(a.attachEvent)a.attachEvent(Pm(d.toString()),y);else if(a.addListener&&a.removeListener)a.addListener(y);else throw Error("addEventListener and attachEvent are unavailable.");return p}function bI(){function a(p){return d.call(a.src,a.listener,p)}const d=DI;return a}function Nm(a,d,p,y,O){if(Array.isArray(d))for(var V=0;V<d.length;V++)Nm(a,d[V],p,y,O);else y=c(y)?!!y.capture:!!y,p=bm(p),a&&a[Mn]?(a=a.i,d=String(d).toString(),d in a.g&&(V=a.g[d],p=Lc(V,p,y,O),-1<p&&(Ma(V[p]),Array.prototype.splice.call(V,p,1),V.length==0&&(delete a.g[d],a.h--)))):a&&(a=Bc(a))&&(d=a.g[d.toString()],a=-1,d&&(a=Lc(d,p,y,O)),(p=-1<a?d[a]:null)&&zc(p))}function zc(a){if(typeof a!="number"&&a&&!a.da){var d=a.src;if(d&&d[Mn])Mc(d.i,a);else{var p=a.type,y=a.proxy;d.removeEventListener?d.removeEventListener(p,y,a.capture):d.detachEvent?d.detachEvent(Pm(p),y):d.addListener&&d.removeListener&&d.removeListener(y),(p=Bc(d))?(Mc(p,a),p.h==0&&(p.src=null,d[Fc]=null)):Ma(a)}}}function Pm(a){return a in Uc?Uc[a]:Uc[a]="on"+a}function DI(a,d){if(a.da)a=!0;else{d=new Ke(d,this);var p=a.listener,y=a.ha||a.src;a.fa&&zc(a),a=p.call(y,d)}return a}function Bc(a){return a=a[Fc],a instanceof La?a:null}var $c="__closure_events_fn_"+(1e9*Math.random()>>>0);function bm(a){return typeof a=="function"?a:(a[$c]||(a[$c]=function(d){return a.handleEvent(d)}),a[$c])}function it(){K.call(this),this.i=new La(this),this.M=this,this.F=null}C(it,K),it.prototype[Mn]=!0,it.prototype.removeEventListener=function(a,d,p,y){Nm(this,a,d,p,y)};function gt(a,d){var p,y=a.F;if(y)for(p=[];y;y=y.F)p.push(y);if(a=a.M,y=d.type||d,typeof d=="string")d=new re(d,a);else if(d instanceof re)d.target=d.target||a;else{var O=d;d=new re(y,a),S(d,O)}if(O=!0,p)for(var V=p.length-1;0<=V;V--){var B=d.g=p[V];O=Fa(B,y,!0,d)&&O}if(B=d.g=a,O=Fa(B,y,!0,d)&&O,O=Fa(B,y,!1,d)&&O,p)for(V=0;V<p.length;V++)B=d.g=p[V],O=Fa(B,y,!1,d)&&O}it.prototype.N=function(){if(it.aa.N.call(this),this.i){var a=this.i,d;for(d in a.g){for(var p=a.g[d],y=0;y<p.length;y++)Ma(p[y]);delete a.g[d],a.h--}}this.F=null},it.prototype.K=function(a,d,p,y){return this.i.add(String(a),d,!1,p,y)},it.prototype.L=function(a,d,p,y){return this.i.add(String(a),d,!0,p,y)};function Fa(a,d,p,y){if(d=a.i.g[String(d)],!d)return!0;d=d.concat();for(var O=!0,V=0;V<d.length;++V){var B=d[V];if(B&&!B.da&&B.capture==p){var ge=B.listener,Qe=B.ha||B.src;B.fa&&Mc(a.i,B),O=ge.call(Qe,y)!==!1&&O}}return O&&!y.defaultPrevented}function Dm(a,d,p){if(typeof a=="function")p&&(a=g(a,p));else if(a&&typeof a.handleEvent=="function")a=g(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(d)?-1:l.setTimeout(a,d||0)}function Om(a){a.g=Dm(()=>{a.g=null,a.i&&(a.i=!1,Om(a))},a.l);const d=a.h;a.h=null,a.m.apply(null,d)}class OI extends K{constructor(d,p){super(),this.m=d,this.l=p,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:Om(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function $s(a){K.call(this),this.h=a,this.g={}}C($s,K);var Vm=[];function jm(a){L(a.g,function(d,p){this.g.hasOwnProperty(p)&&zc(d)},a),a.g={}}$s.prototype.N=function(){$s.aa.N.call(this),jm(this)},$s.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Wc=l.JSON.stringify,VI=l.JSON.parse,jI=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function Hc(){}Hc.prototype.h=null;function Mm(a){return a.h||(a.h=a.i())}function Lm(){}var Ws={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function qc(){re.call(this,"d")}C(qc,re);function Gc(){re.call(this,"c")}C(Gc,re);var ii={},Fm=null;function Ua(){return Fm=Fm||new it}ii.La="serverreachability";function Um(a){re.call(this,ii.La,a)}C(Um,re);function Hs(a){const d=Ua();gt(d,new Um(d))}ii.STAT_EVENT="statevent";function zm(a,d){re.call(this,ii.STAT_EVENT,a),this.stat=d}C(zm,re);function yt(a){const d=Ua();gt(d,new zm(d,a))}ii.Ma="timingevent";function Bm(a,d){re.call(this,ii.Ma,a),this.size=d}C(Bm,re);function qs(a,d){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},d)}function Gs(){this.g=!0}Gs.prototype.xa=function(){this.g=!1};function MI(a,d,p,y,O,V){a.info(function(){if(a.g)if(V)for(var B="",ge=V.split("&"),Qe=0;Qe<ge.length;Qe++){var he=ge[Qe].split("=");if(1<he.length){var st=he[0];he=he[1];var ot=st.split("_");B=2<=ot.length&&ot[1]=="type"?B+(st+"="+he+"&"):B+(st+"=redacted&")}}else B=null;else B=V;return"XMLHTTP REQ ("+y+") [attempt "+O+"]: "+d+`
`+p+`
`+B})}function LI(a,d,p,y,O,V,B){a.info(function(){return"XMLHTTP RESP ("+y+") [ attempt "+O+"]: "+d+`
`+p+`
`+V+" "+B})}function Ui(a,d,p,y){a.info(function(){return"XMLHTTP TEXT ("+d+"): "+UI(a,p)+(y?" "+y:"")})}function FI(a,d){a.info(function(){return"TIMEOUT: "+d})}Gs.prototype.info=function(){};function UI(a,d){if(!a.g)return d;if(!d)return null;try{var p=JSON.parse(d);if(p){for(a=0;a<p.length;a++)if(Array.isArray(p[a])){var y=p[a];if(!(2>y.length)){var O=y[1];if(Array.isArray(O)&&!(1>O.length)){var V=O[0];if(V!="noop"&&V!="stop"&&V!="close")for(var B=1;B<O.length;B++)O[B]=""}}}}return Wc(p)}catch{return d}}var za={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},$m={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Kc;function Ba(){}C(Ba,Hc),Ba.prototype.g=function(){return new XMLHttpRequest},Ba.prototype.i=function(){return{}},Kc=new Ba;function lr(a,d,p,y){this.j=a,this.i=d,this.l=p,this.R=y||1,this.U=new $s(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Wm}function Wm(){this.i=null,this.g="",this.h=!1}var Hm={},Qc={};function Yc(a,d,p){a.L=1,a.v=qa(Ln(d)),a.m=p,a.P=!0,qm(a,null)}function qm(a,d){a.F=Date.now(),$a(a),a.A=Ln(a.v);var p=a.A,y=a.R;Array.isArray(y)||(y=[String(y)]),og(p.i,"t",y),a.C=0,p=a.j.J,a.h=new Wm,a.g=xg(a.j,p?d:null,!a.m),0<a.O&&(a.M=new OI(g(a.Y,a,a.g),a.O)),d=a.U,p=a.g,y=a.ca;var O="readystatechange";Array.isArray(O)||(O&&(Vm[0]=O.toString()),O=Vm);for(var V=0;V<O.length;V++){var B=Rm(p,O[V],y||d.handleEvent,!1,d.h||d);if(!B)break;d.g[B.key]=B}d=a.H?v(a.H):{},a.m?(a.u||(a.u="POST"),d["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,d)):(a.u="GET",a.g.ea(a.A,a.u,null,d)),Hs(),MI(a.i,a.u,a.A,a.l,a.R,a.m)}lr.prototype.ca=function(a){a=a.target;const d=this.M;d&&Fn(a)==3?d.j():this.Y(a)},lr.prototype.Y=function(a){try{if(a==this.g)e:{const ot=Fn(this.g);var d=this.g.Ba();const $i=this.g.Z();if(!(3>ot)&&(ot!=3||this.g&&(this.h.h||this.g.oa()||fg(this.g)))){this.J||ot!=4||d==7||(d==8||0>=$i?Hs(3):Hs(2)),Jc(this);var p=this.g.Z();this.X=p;t:if(Gm(this)){var y=fg(this.g);a="";var O=y.length,V=Fn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){si(this),Ks(this);var B="";break t}this.h.i=new l.TextDecoder}for(d=0;d<O;d++)this.h.h=!0,a+=this.h.i.decode(y[d],{stream:!(V&&d==O-1)});y.length=0,this.h.g+=a,this.C=0,B=this.h.g}else B=this.g.oa();if(this.o=p==200,LI(this.i,this.u,this.A,this.l,this.R,ot,p),this.o){if(this.T&&!this.K){t:{if(this.g){var ge,Qe=this.g;if((ge=Qe.g?Qe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(ge)){var he=ge;break t}}he=null}if(p=he)Ui(this.i,this.l,p,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Xc(this,p);else{this.o=!1,this.s=3,yt(12),si(this),Ks(this);break e}}if(this.P){p=!0;let on;for(;!this.J&&this.C<B.length;)if(on=zI(this,B),on==Qc){ot==4&&(this.s=4,yt(14),p=!1),Ui(this.i,this.l,null,"[Incomplete Response]");break}else if(on==Hm){this.s=4,yt(15),Ui(this.i,this.l,B,"[Invalid Chunk]"),p=!1;break}else Ui(this.i,this.l,on,null),Xc(this,on);if(Gm(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ot!=4||B.length!=0||this.h.h||(this.s=1,yt(16),p=!1),this.o=this.o&&p,!p)Ui(this.i,this.l,B,"[Invalid Chunked Response]"),si(this),Ks(this);else if(0<B.length&&!this.W){this.W=!0;var st=this.j;st.g==this&&st.ba&&!st.M&&(st.j.info("Great, no buffering proxy detected. Bytes received: "+B.length),ih(st),st.M=!0,yt(11))}}else Ui(this.i,this.l,B,null),Xc(this,B);ot==4&&si(this),this.o&&!this.J&&(ot==4?wg(this.j,this):(this.o=!1,$a(this)))}else ix(this.g),p==400&&0<B.indexOf("Unknown SID")?(this.s=3,yt(12)):(this.s=0,yt(13)),si(this),Ks(this)}}}catch{}finally{}};function Gm(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function zI(a,d){var p=a.C,y=d.indexOf(`
`,p);return y==-1?Qc:(p=Number(d.substring(p,y)),isNaN(p)?Hm:(y+=1,y+p>d.length?Qc:(d=d.slice(y,y+p),a.C=y+p,d)))}lr.prototype.cancel=function(){this.J=!0,si(this)};function $a(a){a.S=Date.now()+a.I,Km(a,a.I)}function Km(a,d){if(a.B!=null)throw Error("WatchDog timer not null");a.B=qs(g(a.ba,a),d)}function Jc(a){a.B&&(l.clearTimeout(a.B),a.B=null)}lr.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(FI(this.i,this.A),this.L!=2&&(Hs(),yt(17)),si(this),this.s=2,Ks(this)):Km(this,this.S-a)};function Ks(a){a.j.G==0||a.J||wg(a.j,a)}function si(a){Jc(a);var d=a.M;d&&typeof d.ma=="function"&&d.ma(),a.M=null,jm(a.U),a.g&&(d=a.g,a.g=null,d.abort(),d.ma())}function Xc(a,d){try{var p=a.j;if(p.G!=0&&(p.g==a||Zc(p.h,a))){if(!a.K&&Zc(p.h,a)&&p.G==3){try{var y=p.Da.g.parse(d)}catch{y=null}if(Array.isArray(y)&&y.length==3){var O=y;if(O[0]==0){e:if(!p.u){if(p.g)if(p.g.F+3e3<a.F)Xa(p),Ya(p);else break e;rh(p),yt(18)}}else p.za=O[1],0<p.za-p.T&&37500>O[2]&&p.F&&p.v==0&&!p.C&&(p.C=qs(g(p.Za,p),6e3));if(1>=Jm(p.h)&&p.ca){try{p.ca()}catch{}p.ca=void 0}}else ai(p,11)}else if((a.K||p.g==a)&&Xa(p),!_(d))for(O=p.Da.g.parse(d),d=0;d<O.length;d++){let he=O[d];if(p.T=he[0],he=he[1],p.G==2)if(he[0]=="c"){p.K=he[1],p.ia=he[2];const st=he[3];st!=null&&(p.la=st,p.j.info("VER="+p.la));const ot=he[4];ot!=null&&(p.Aa=ot,p.j.info("SVER="+p.Aa));const $i=he[5];$i!=null&&typeof $i=="number"&&0<$i&&(y=1.5*$i,p.L=y,p.j.info("backChannelRequestTimeoutMs_="+y)),y=p;const on=a.g;if(on){const el=on.g?on.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(el){var V=y.h;V.g||el.indexOf("spdy")==-1&&el.indexOf("quic")==-1&&el.indexOf("h2")==-1||(V.j=V.l,V.g=new Set,V.h&&(eh(V,V.h),V.h=null))}if(y.D){const sh=on.g?on.g.getResponseHeader("X-HTTP-Session-Id"):null;sh&&(y.ya=sh,_e(y.I,y.D,sh))}}p.G=3,p.l&&p.l.ua(),p.ba&&(p.R=Date.now()-a.F,p.j.info("Handshake RTT: "+p.R+"ms")),y=p;var B=a;if(y.qa=Ig(y,y.J?y.ia:null,y.W),B.K){Xm(y.h,B);var ge=B,Qe=y.L;Qe&&(ge.I=Qe),ge.B&&(Jc(ge),$a(ge)),y.g=B}else vg(y);0<p.i.length&&Ja(p)}else he[0]!="stop"&&he[0]!="close"||ai(p,7);else p.G==3&&(he[0]=="stop"||he[0]=="close"?he[0]=="stop"?ai(p,7):nh(p):he[0]!="noop"&&p.l&&p.l.ta(he),p.v=0)}}Hs(4)}catch{}}var BI=class{constructor(a,d){this.g=a,this.map=d}};function Qm(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ym(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Jm(a){return a.h?1:a.g?a.g.size:0}function Zc(a,d){return a.h?a.h==d:a.g?a.g.has(d):!1}function eh(a,d){a.g?a.g.add(d):a.h=d}function Xm(a,d){a.h&&a.h==d?a.h=null:a.g&&a.g.has(d)&&a.g.delete(d)}Qm.prototype.cancel=function(){if(this.i=Zm(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Zm(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let d=a.i;for(const p of a.g.values())d=d.concat(p.D);return d}return N(a.i)}function $I(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var d=[],p=a.length,y=0;y<p;y++)d.push(a[y]);return d}d=[],p=0;for(y in a)d[p++]=a[y];return d}function WI(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var d=[];a=a.length;for(var p=0;p<a;p++)d.push(p);return d}d=[],p=0;for(const y in a)d[p++]=y;return d}}}function eg(a,d){if(a.forEach&&typeof a.forEach=="function")a.forEach(d,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,d,void 0);else for(var p=WI(a),y=$I(a),O=y.length,V=0;V<O;V++)d.call(void 0,y[V],p&&p[V],a)}var tg=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function HI(a,d){if(a){a=a.split("&");for(var p=0;p<a.length;p++){var y=a[p].indexOf("="),O=null;if(0<=y){var V=a[p].substring(0,y);O=a[p].substring(y+1)}else V=a[p];d(V,O?decodeURIComponent(O.replace(/\+/g," ")):"")}}}function oi(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof oi){this.h=a.h,Wa(this,a.j),this.o=a.o,this.g=a.g,Ha(this,a.s),this.l=a.l;var d=a.i,p=new Js;p.i=d.i,d.g&&(p.g=new Map(d.g),p.h=d.h),ng(this,p),this.m=a.m}else a&&(d=String(a).match(tg))?(this.h=!1,Wa(this,d[1]||"",!0),this.o=Qs(d[2]||""),this.g=Qs(d[3]||"",!0),Ha(this,d[4]),this.l=Qs(d[5]||"",!0),ng(this,d[6]||"",!0),this.m=Qs(d[7]||"")):(this.h=!1,this.i=new Js(null,this.h))}oi.prototype.toString=function(){var a=[],d=this.j;d&&a.push(Ys(d,rg,!0),":");var p=this.g;return(p||d=="file")&&(a.push("//"),(d=this.o)&&a.push(Ys(d,rg,!0),"@"),a.push(encodeURIComponent(String(p)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.s,p!=null&&a.push(":",String(p))),(p=this.l)&&(this.g&&p.charAt(0)!="/"&&a.push("/"),a.push(Ys(p,p.charAt(0)=="/"?KI:GI,!0))),(p=this.i.toString())&&a.push("?",p),(p=this.m)&&a.push("#",Ys(p,YI)),a.join("")};function Ln(a){return new oi(a)}function Wa(a,d,p){a.j=p?Qs(d,!0):d,a.j&&(a.j=a.j.replace(/:$/,""))}function Ha(a,d){if(d){if(d=Number(d),isNaN(d)||0>d)throw Error("Bad port number "+d);a.s=d}else a.s=null}function ng(a,d,p){d instanceof Js?(a.i=d,JI(a.i,a.h)):(p||(d=Ys(d,QI)),a.i=new Js(d,a.h))}function _e(a,d,p){a.i.set(d,p)}function qa(a){return _e(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Qs(a,d){return a?d?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Ys(a,d,p){return typeof a=="string"?(a=encodeURI(a).replace(d,qI),p&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function qI(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var rg=/[#\/\?@]/g,GI=/[#\?:]/g,KI=/[#\?]/g,QI=/[#\?@]/g,YI=/#/g;function Js(a,d){this.h=this.g=null,this.i=a||null,this.j=!!d}function ur(a){a.g||(a.g=new Map,a.h=0,a.i&&HI(a.i,function(d,p){a.add(decodeURIComponent(d.replace(/\+/g," ")),p)}))}t=Js.prototype,t.add=function(a,d){ur(this),this.i=null,a=zi(this,a);var p=this.g.get(a);return p||this.g.set(a,p=[]),p.push(d),this.h+=1,this};function ig(a,d){ur(a),d=zi(a,d),a.g.has(d)&&(a.i=null,a.h-=a.g.get(d).length,a.g.delete(d))}function sg(a,d){return ur(a),d=zi(a,d),a.g.has(d)}t.forEach=function(a,d){ur(this),this.g.forEach(function(p,y){p.forEach(function(O){a.call(d,O,y,this)},this)},this)},t.na=function(){ur(this);const a=Array.from(this.g.values()),d=Array.from(this.g.keys()),p=[];for(let y=0;y<d.length;y++){const O=a[y];for(let V=0;V<O.length;V++)p.push(d[y])}return p},t.V=function(a){ur(this);let d=[];if(typeof a=="string")sg(this,a)&&(d=d.concat(this.g.get(zi(this,a))));else{a=Array.from(this.g.values());for(let p=0;p<a.length;p++)d=d.concat(a[p])}return d},t.set=function(a,d){return ur(this),this.i=null,a=zi(this,a),sg(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[d]),this.h+=1,this},t.get=function(a,d){return a?(a=this.V(a),0<a.length?String(a[0]):d):d};function og(a,d,p){ig(a,d),0<p.length&&(a.i=null,a.g.set(zi(a,d),N(p)),a.h+=p.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],d=Array.from(this.g.keys());for(var p=0;p<d.length;p++){var y=d[p];const V=encodeURIComponent(String(y)),B=this.V(y);for(y=0;y<B.length;y++){var O=V;B[y]!==""&&(O+="="+encodeURIComponent(String(B[y]))),a.push(O)}}return this.i=a.join("&")};function zi(a,d){return d=String(d),a.j&&(d=d.toLowerCase()),d}function JI(a,d){d&&!a.j&&(ur(a),a.i=null,a.g.forEach(function(p,y){var O=y.toLowerCase();y!=O&&(ig(this,y),og(this,O,p))},a)),a.j=d}function XI(a,d){const p=new Gs;if(l.Image){const y=new Image;y.onload=I(cr,p,"TestLoadImage: loaded",!0,d,y),y.onerror=I(cr,p,"TestLoadImage: error",!1,d,y),y.onabort=I(cr,p,"TestLoadImage: abort",!1,d,y),y.ontimeout=I(cr,p,"TestLoadImage: timeout",!1,d,y),l.setTimeout(function(){y.ontimeout&&y.ontimeout()},1e4),y.src=a}else d(!1)}function ZI(a,d){const p=new Gs,y=new AbortController,O=setTimeout(()=>{y.abort(),cr(p,"TestPingServer: timeout",!1,d)},1e4);fetch(a,{signal:y.signal}).then(V=>{clearTimeout(O),V.ok?cr(p,"TestPingServer: ok",!0,d):cr(p,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(O),cr(p,"TestPingServer: error",!1,d)})}function cr(a,d,p,y,O){try{O&&(O.onload=null,O.onerror=null,O.onabort=null,O.ontimeout=null),y(p)}catch{}}function ex(){this.g=new jI}function tx(a,d,p){const y=p||"";try{eg(a,function(O,V){let B=O;c(O)&&(B=Wc(O)),d.push(y+V+"="+encodeURIComponent(B))})}catch(O){throw d.push(y+"type="+encodeURIComponent("_badmap")),O}}function Ga(a){this.l=a.Ub||null,this.j=a.eb||!1}C(Ga,Hc),Ga.prototype.g=function(){return new Ka(this.l,this.j)},Ga.prototype.i=function(a){return function(){return a}}({});function Ka(a,d){it.call(this),this.D=a,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(Ka,it),t=Ka.prototype,t.open=function(a,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=d,this.readyState=1,Zs(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const d={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(d.body=a),(this.D||l).fetch(new Request(this.A,d)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Xs(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Zs(this)),this.g&&(this.readyState=3,Zs(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;ag(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function ag(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var d=a.value?a.value:new Uint8Array(0);(d=this.v.decode(d,{stream:!a.done}))&&(this.response=this.responseText+=d)}a.done?Xs(this):Zs(this),this.readyState==3&&ag(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,Xs(this))},t.Qa=function(a){this.g&&(this.response=a,Xs(this))},t.ga=function(){this.g&&Xs(this)};function Xs(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Zs(a)}t.setRequestHeader=function(a,d){this.u.append(a,d)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],d=this.h.entries();for(var p=d.next();!p.done;)p=p.value,a.push(p[0]+": "+p[1]),p=d.next();return a.join(`\r
`)};function Zs(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Ka.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function lg(a){let d="";return L(a,function(p,y){d+=y,d+=":",d+=p,d+=`\r
`}),d}function th(a,d,p){e:{for(y in p){var y=!1;break e}y=!0}y||(p=lg(p),typeof a=="string"?p!=null&&encodeURIComponent(String(p)):_e(a,d,p))}function Ne(a){it.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(Ne,it);var nx=/^https?$/i,rx=["POST","PUT"];t=Ne.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,d,p,y){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);d=d?d.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Kc.g(),this.v=this.o?Mm(this.o):Mm(Kc),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(d,String(a),!0),this.B=!1}catch(V){ug(this,V);return}if(a=p||"",p=new Map(this.headers),y)if(Object.getPrototypeOf(y)===Object.prototype)for(var O in y)p.set(O,y[O]);else if(typeof y.keys=="function"&&typeof y.get=="function")for(const V of y.keys())p.set(V,y.get(V));else throw Error("Unknown input type for opt_headers: "+String(y));y=Array.from(p.keys()).find(V=>V.toLowerCase()=="content-type"),O=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(rx,d,void 0))||y||O||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[V,B]of p)this.g.setRequestHeader(V,B);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{dg(this),this.u=!0,this.g.send(a),this.u=!1}catch(V){ug(this,V)}};function ug(a,d){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=d,a.m=5,cg(a),Qa(a)}function cg(a){a.A||(a.A=!0,gt(a,"complete"),gt(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,gt(this,"complete"),gt(this,"abort"),Qa(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Qa(this,!0)),Ne.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?hg(this):this.bb())},t.bb=function(){hg(this)};function hg(a){if(a.h&&typeof o<"u"&&(!a.v[1]||Fn(a)!=4||a.Z()!=2)){if(a.u&&Fn(a)==4)Dm(a.Ea,0,a);else if(gt(a,"readystatechange"),Fn(a)==4){a.h=!1;try{const B=a.Z();e:switch(B){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var p;if(!(p=d)){var y;if(y=B===0){var O=String(a.D).match(tg)[1]||null;!O&&l.self&&l.self.location&&(O=l.self.location.protocol.slice(0,-1)),y=!nx.test(O?O.toLowerCase():"")}p=y}if(p)gt(a,"complete"),gt(a,"success");else{a.m=6;try{var V=2<Fn(a)?a.g.statusText:""}catch{V=""}a.l=V+" ["+a.Z()+"]",cg(a)}}finally{Qa(a)}}}}function Qa(a,d){if(a.g){dg(a);const p=a.g,y=a.v[0]?()=>{}:null;a.g=null,a.v=null,d||gt(a,"ready");try{p.onreadystatechange=y}catch{}}}function dg(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function Fn(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<Fn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var d=this.g.responseText;return a&&d.indexOf(a)==0&&(d=d.substring(a.length)),VI(d)}};function fg(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function ix(a){const d={};a=(a.g&&2<=Fn(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let y=0;y<a.length;y++){if(_(a[y]))continue;var p=R(a[y]);const O=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const V=d[O]||[];d[O]=V,V.push(p)}T(d,function(y){return y.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function eo(a,d,p){return p&&p.internalChannelParams&&p.internalChannelParams[a]||d}function pg(a){this.Aa=0,this.i=[],this.j=new Gs,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=eo("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=eo("baseRetryDelayMs",5e3,a),this.cb=eo("retryDelaySeedMs",1e4,a),this.Wa=eo("forwardChannelMaxRetries",2,a),this.wa=eo("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Qm(a&&a.concurrentRequestLimit),this.Da=new ex,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=pg.prototype,t.la=8,t.G=1,t.connect=function(a,d,p,y){yt(0),this.W=a,this.H=d||{},p&&y!==void 0&&(this.H.OSID=p,this.H.OAID=y),this.F=this.X,this.I=Ig(this,null,this.W),Ja(this)};function nh(a){if(mg(a),a.G==3){var d=a.U++,p=Ln(a.I);if(_e(p,"SID",a.K),_e(p,"RID",d),_e(p,"TYPE","terminate"),to(a,p),d=new lr(a,a.j,d),d.L=2,d.v=qa(Ln(p)),p=!1,l.navigator&&l.navigator.sendBeacon)try{p=l.navigator.sendBeacon(d.v.toString(),"")}catch{}!p&&l.Image&&(new Image().src=d.v,p=!0),p||(d.g=xg(d.j,null),d.g.ea(d.v)),d.F=Date.now(),$a(d)}Tg(a)}function Ya(a){a.g&&(ih(a),a.g.cancel(),a.g=null)}function mg(a){Ya(a),a.u&&(l.clearTimeout(a.u),a.u=null),Xa(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function Ja(a){if(!Ym(a.h)&&!a.s){a.s=!0;var d=a.Ga;rt||J(),$||(rt(),$=!0),z.add(d,a),a.B=0}}function sx(a,d){return Jm(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=d.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=qs(g(a.Ga,a,d),Eg(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const O=new lr(this,this.j,a);let V=this.o;if(this.S&&(V?(V=v(V),S(V,this.S)):V=this.S),this.m!==null||this.O||(O.H=V,V=null),this.P)e:{for(var d=0,p=0;p<this.i.length;p++){t:{var y=this.i[p];if("__data__"in y.map&&(y=y.map.__data__,typeof y=="string")){y=y.length;break t}y=void 0}if(y===void 0)break;if(d+=y,4096<d){d=p;break e}if(d===4096||p===this.i.length-1){d=p+1;break e}}d=1e3}else d=1e3;d=yg(this,O,d),p=Ln(this.I),_e(p,"RID",a),_e(p,"CVER",22),this.D&&_e(p,"X-HTTP-Session-Id",this.D),to(this,p),V&&(this.O?d="headers="+encodeURIComponent(String(lg(V)))+"&"+d:this.m&&th(p,this.m,V)),eh(this.h,O),this.Ua&&_e(p,"TYPE","init"),this.P?(_e(p,"$req",d),_e(p,"SID","null"),O.T=!0,Yc(O,p,null)):Yc(O,p,d),this.G=2}}else this.G==3&&(a?gg(this,a):this.i.length==0||Ym(this.h)||gg(this))};function gg(a,d){var p;d?p=d.l:p=a.U++;const y=Ln(a.I);_e(y,"SID",a.K),_e(y,"RID",p),_e(y,"AID",a.T),to(a,y),a.m&&a.o&&th(y,a.m,a.o),p=new lr(a,a.j,p,a.B+1),a.m===null&&(p.H=a.o),d&&(a.i=d.D.concat(a.i)),d=yg(a,p,1e3),p.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),eh(a.h,p),Yc(p,y,d)}function to(a,d){a.H&&L(a.H,function(p,y){_e(d,y,p)}),a.l&&eg({},function(p,y){_e(d,y,p)})}function yg(a,d,p){p=Math.min(a.i.length,p);var y=a.l?g(a.l.Na,a.l,a):null;e:{var O=a.i;let V=-1;for(;;){const B=["count="+p];V==-1?0<p?(V=O[0].g,B.push("ofs="+V)):V=0:B.push("ofs="+V);let ge=!0;for(let Qe=0;Qe<p;Qe++){let he=O[Qe].g;const st=O[Qe].map;if(he-=V,0>he)V=Math.max(0,O[Qe].g-100),ge=!1;else try{tx(st,B,"req"+he+"_")}catch{y&&y(st)}}if(ge){y=B.join("&");break e}}}return a=a.i.splice(0,p),d.D=a,y}function vg(a){if(!a.g&&!a.u){a.Y=1;var d=a.Fa;rt||J(),$||(rt(),$=!0),z.add(d,a),a.v=0}}function rh(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=qs(g(a.Fa,a),Eg(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,_g(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=qs(g(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,yt(10),Ya(this),_g(this))};function ih(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function _g(a){a.g=new lr(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var d=Ln(a.qa);_e(d,"RID","rpc"),_e(d,"SID",a.K),_e(d,"AID",a.T),_e(d,"CI",a.F?"0":"1"),!a.F&&a.ja&&_e(d,"TO",a.ja),_e(d,"TYPE","xmlhttp"),to(a,d),a.m&&a.o&&th(d,a.m,a.o),a.L&&(a.g.I=a.L);var p=a.g;a=a.ia,p.L=1,p.v=qa(Ln(d)),p.m=null,p.P=!0,qm(p,a)}t.Za=function(){this.C!=null&&(this.C=null,Ya(this),rh(this),yt(19))};function Xa(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function wg(a,d){var p=null;if(a.g==d){Xa(a),ih(a),a.g=null;var y=2}else if(Zc(a.h,d))p=d.D,Xm(a.h,d),y=1;else return;if(a.G!=0){if(d.o)if(y==1){p=d.m?d.m.length:0,d=Date.now()-d.F;var O=a.B;y=Ua(),gt(y,new Bm(y,p)),Ja(a)}else vg(a);else if(O=d.s,O==3||O==0&&0<d.X||!(y==1&&sx(a,d)||y==2&&rh(a)))switch(p&&0<p.length&&(d=a.h,d.i=d.i.concat(p)),O){case 1:ai(a,5);break;case 4:ai(a,10);break;case 3:ai(a,6);break;default:ai(a,2)}}}function Eg(a,d){let p=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(p*=2),p*d}function ai(a,d){if(a.j.info("Error code "+d),d==2){var p=g(a.fb,a),y=a.Xa;const O=!y;y=new oi(y||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Wa(y,"https"),qa(y),O?XI(y.toString(),p):ZI(y.toString(),p)}else yt(2);a.G=0,a.l&&a.l.sa(d),Tg(a),mg(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),yt(2)):(this.j.info("Failed to ping google.com"),yt(1))};function Tg(a){if(a.G=0,a.ka=[],a.l){const d=Zm(a.h);(d.length!=0||a.i.length!=0)&&(P(a.ka,d),P(a.ka,a.i),a.h.i.length=0,N(a.i),a.i.length=0),a.l.ra()}}function Ig(a,d,p){var y=p instanceof oi?Ln(p):new oi(p);if(y.g!="")d&&(y.g=d+"."+y.g),Ha(y,y.s);else{var O=l.location;y=O.protocol,d=d?d+"."+O.hostname:O.hostname,O=+O.port;var V=new oi(null);y&&Wa(V,y),d&&(V.g=d),O&&Ha(V,O),p&&(V.l=p),y=V}return p=a.D,d=a.ya,p&&d&&_e(y,p,d),_e(y,"VER",a.la),to(a,y),y}function xg(a,d,p){if(d&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return d=a.Ca&&!a.pa?new Ne(new Ga({eb:p})):new Ne(a.pa),d.Ha(a.J),d}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function kg(){}t=kg.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Za(){}Za.prototype.g=function(a,d){return new jt(a,d)};function jt(a,d){it.call(this),this.g=new pg(d),this.l=a,this.h=d&&d.messageUrlParams||null,a=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(a?a["X-WebChannel-Content-Type"]=d.messageContentType:a={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.va&&(a?a["X-WebChannel-Client-Profile"]=d.va:a={"X-WebChannel-Client-Profile":d.va}),this.g.S=a,(a=d&&d.Sb)&&!_(a)&&(this.g.m=a),this.v=d&&d.supportsCrossDomainXhr||!1,this.u=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!_(d)&&(this.g.D=d,a=this.h,a!==null&&d in a&&(a=this.h,d in a&&delete a[d])),this.j=new Bi(this)}C(jt,it),jt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},jt.prototype.close=function(){nh(this.g)},jt.prototype.o=function(a){var d=this.g;if(typeof a=="string"){var p={};p.__data__=a,a=p}else this.u&&(p={},p.__data__=Wc(a),a=p);d.i.push(new BI(d.Ya++,a)),d.G==3&&Ja(d)},jt.prototype.N=function(){this.g.l=null,delete this.j,nh(this.g),delete this.g,jt.aa.N.call(this)};function Sg(a){qc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var d=a.__sm__;if(d){e:{for(const p in d){a=p;break e}a=void 0}(this.i=a)&&(a=this.i,d=d!==null&&a in d?d[a]:void 0),this.data=d}else this.data=a}C(Sg,qc);function Cg(){Gc.call(this),this.status=1}C(Cg,Gc);function Bi(a){this.g=a}C(Bi,kg),Bi.prototype.ua=function(){gt(this.g,"a")},Bi.prototype.ta=function(a){gt(this.g,new Sg(a))},Bi.prototype.sa=function(a){gt(this.g,new Cg)},Bi.prototype.ra=function(){gt(this.g,"b")},Za.prototype.createWebChannel=Za.prototype.g,jt.prototype.send=jt.prototype.o,jt.prototype.open=jt.prototype.m,jt.prototype.close=jt.prototype.close,_1=function(){return new Za},v1=function(){return Ua()},y1=ii,sf={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},za.NO_ERROR=0,za.TIMEOUT=8,za.HTTP_ERROR=6,zl=za,$m.COMPLETE="complete",g1=$m,Lm.EventType=Ws,Ws.OPEN="a",Ws.CLOSE="b",Ws.ERROR="c",Ws.MESSAGE="d",it.prototype.listen=it.prototype.K,go=Lm,Ne.prototype.listenOnce=Ne.prototype.L,Ne.prototype.getLastError=Ne.prototype.Ka,Ne.prototype.getLastErrorCode=Ne.prototype.Ba,Ne.prototype.getStatus=Ne.prototype.Z,Ne.prototype.getResponseJson=Ne.prototype.Oa,Ne.prototype.getResponseText=Ne.prototype.oa,Ne.prototype.send=Ne.prototype.ea,Ne.prototype.setWithCredentials=Ne.prototype.Ha,m1=Ne}).apply(typeof _l<"u"?_l:typeof self<"u"?self:typeof window<"u"?window:{});const Cv="@firebase/firestore",Av="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ct.UNAUTHENTICATED=new ct(null),ct.GOOGLE_CREDENTIALS=new ct("google-credentials-uid"),ct.FIRST_PARTY=new ct("first-party-uid"),ct.MOCK_USER=new ct("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fs="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Si=new hc("@firebase/firestore");function Hi(){return Si.logLevel}function H(t,...e){if(Si.logLevel<=se.DEBUG){const n=e.map(Op);Si.debug(`Firestore (${Fs}): ${t}`,...n)}}function nr(t,...e){if(Si.logLevel<=se.ERROR){const n=e.map(Op);Si.error(`Firestore (${Fs}): ${t}`,...n)}}function $r(t,...e){if(Si.logLevel<=se.WARN){const n=e.map(Op);Si.warn(`Firestore (${Fs}): ${t}`,...n)}}function Op(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X(t,e,n){let r="Unexpected state";typeof e=="string"?r=e:n=e,w1(t,r,n)}function w1(t,e,n){let r=`FIRESTORE (${Fs}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{r+=" CONTEXT: "+JSON.stringify(n)}catch{r+=" CONTEXT: "+n}throw nr(r),new Error(r)}function fe(t,e,n,r){let i="Unexpected state";typeof n=="string"?i=n:r=n,t||w1(e,i,r)}function te(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class W extends rn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E1{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class GN{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(ct.UNAUTHENTICATED))}shutdown(){}}class KN{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class QN{constructor(e){this.t=e,this.currentUser=ct.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){fe(this.o===void 0,42304);let r=this.i;const i=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let s=new Gn;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Gn,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},l=u=>{H("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(H("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Gn)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(H("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(fe(typeof r.accessToken=="string",31837,{l:r}),new E1(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return fe(e===null||typeof e=="string",2055,{h:e}),new ct(e)}}class YN{constructor(e,n,r){this.P=e,this.T=n,this.I=r,this.type="FirstParty",this.user=ct.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class JN{constructor(e,n,r){this.P=e,this.T=n,this.I=r}getToken(){return Promise.resolve(new YN(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(ct.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Rv{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class XN{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Qt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){fe(this.o===void 0,3512);const r=s=>{s.error!=null&&H("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.m;return this.m=s.token,H("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{H("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):H("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Rv(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(fe(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new Rv(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZN(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T1(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vp{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=ZN(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<n&&(r+=e.charAt(i[s]%62))}return r}}function ne(t,e){return t<e?-1:t>e?1:0}function of(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=t.codePointAt(n),i=e.codePointAt(n);if(r!==i){if(r<128&&i<128)return ne(r,i);{const s=T1(),o=eP(s.encode(Nv(t,n)),s.encode(Nv(e,n)));return o!==0?o:ne(r,i)}}n+=r>65535?2:1}return ne(t.length,e.length)}function Nv(t,e){return t.codePointAt(e)>65535?t.substring(e,e+2):t.substring(e,e+1)}function eP(t,e){for(let n=0;n<t.length&&n<e.length;++n)if(t[n]!==e[n])return ne(t[n],e[n]);return ne(t.length,e.length)}function As(t,e,n){return t.length===e.length&&t.every((r,i)=>n(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pv="__name__";class In{constructor(e,n,r){n===void 0?n=0:n>e.length&&X(637,{offset:n,range:e.length}),r===void 0?r=e.length-n:r>e.length-n&&X(1746,{length:r,range:e.length-n}),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return In.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof In?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let i=0;i<r;i++){const s=In.compareSegments(e.get(i),n.get(i));if(s!==0)return s}return ne(e.length,n.length)}static compareSegments(e,n){const r=In.isNumericId(e),i=In.isNumericId(n);return r&&!i?-1:!r&&i?1:r&&i?In.extractNumericId(e).compare(In.extractNumericId(n)):of(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Mr.fromString(e.substring(4,e.length-2))}}class ye extends In{construct(e,n,r){return new ye(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new W(M.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(i=>i.length>0))}return new ye(n)}static emptyPath(){return new ye([])}}const tP=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Xe extends In{construct(e,n,r){return new Xe(e,n,r)}static isValidIdentifier(e){return tP.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Xe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Pv}static keyField(){return new Xe([Pv])}static fromServerFormat(e){const n=[];let r="",i=0;const s=()=>{if(r.length===0)throw new W(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;i<e.length;){const l=e[i];if(l==="\\"){if(i+1===e.length)throw new W(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new W(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else l==="`"?(o=!o,i++):l!=="."||o?(r+=l,i++):(s(),i++)}if(s(),o)throw new W(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Xe(n)}static emptyPath(){return new Xe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{constructor(e){this.path=e}static fromPath(e){return new Q(ye.fromString(e))}static fromName(e){return new Q(ye.fromString(e).popFirst(5))}static empty(){return new Q(ye.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ye.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return ye.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Q(new ye(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jp(t,e,n){if(!n)throw new W(M.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function nP(t,e,n,r){if(e===!0&&r===!0)throw new W(M.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function bv(t){if(!Q.isDocumentKey(t))throw new W(M.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Dv(t){if(Q.isDocumentKey(t))throw new W(M.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function I1(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function gc(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":X(12329,{type:typeof t})}function wt(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new W(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=gc(t);throw new W(M.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ue(t,e){const n={typeString:t};return e&&(n.value=e),n}function Sa(t,e){if(!I1(t))throw new W(M.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in e)if(e[r]){const i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in t)){n=`JSON missing required field: '${r}'`;break}const o=t[r];if(i&&typeof o!==i){n=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&o!==s.value){n=`Expected '${r}' field to equal '${s.value}'`;break}}if(n)throw new W(M.INVALID_ARGUMENT,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ov=-62135596800,Vv=1e6;class Ee{static now(){return Ee.fromMillis(Date.now())}static fromDate(e){return Ee.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor((e-1e3*n)*Vv);return new Ee(n,r)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new W(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new W(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<Ov)throw new W(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new W(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Vv}_compareTo(e){return this.seconds===e.seconds?ne(this.nanoseconds,e.nanoseconds):ne(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ee._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Sa(e,Ee._jsonSchema))return new Ee(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Ov;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ee._jsonSchemaVersion="firestore/timestamp/1.0",Ee._jsonSchema={type:Ue("string",Ee._jsonSchemaVersion),seconds:Ue("number"),nanoseconds:Ue("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{static fromTimestamp(e){return new Z(e)}static min(){return new Z(new Ee(0,0))}static max(){return new Z(new Ee(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oa=-1;function rP(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,i=Z.fromTimestamp(r===1e9?new Ee(n+1,0):new Ee(n,r));return new Wr(i,Q.empty(),e)}function iP(t){return new Wr(t.readTime,t.key,oa)}class Wr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Wr(Z.min(),Q.empty(),oa)}static max(){return new Wr(Z.max(),Q.empty(),oa)}}function sP(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=Q.comparator(t.documentKey,e.documentKey),n!==0?n:ne(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oP="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class aP{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Us(t){if(t.code!==M.FAILED_PRECONDITION||t.message!==oP)throw t;H("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&X(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new F((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(n,s).next(r,i)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof F?n:F.resolve(n)}catch(n){return F.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):F.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):F.reject(n)}static resolve(e){return new F((n,r)=>{n(e)})}static reject(e){return new F((n,r)=>{r(e)})}static waitFor(e){return new F((n,r)=>{let i=0,s=0,o=!1;e.forEach(l=>{++i,l.next(()=>{++s,o&&s===i&&n()},u=>r(u))}),o=!0,s===i&&n()})}static or(e){let n=F.resolve(!1);for(const r of e)n=n.next(i=>i?F.resolve(i):r());return n}static forEach(e,n){const r=[];return e.forEach((i,s)=>{r.push(n.call(this,i,s))}),this.waitFor(r)}static mapArray(e,n){return new F((r,i)=>{const s=e.length,o=new Array(s);let l=0;for(let u=0;u<s;u++){const c=u;n(e[c]).next(f=>{o[c]=f,++l,l===s&&r(o)},f=>i(f))}})}static doWhile(e,n){return new F((r,i)=>{const s=()=>{e()===!0?n().next(()=>{s()},i):r()};s()})}}function lP(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function zs(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yc{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this._e(r),this.ae=r=>n.writeSequenceNumber(r))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ae&&this.ae(e),e}}yc.ue=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mp=-1;function vc(t){return t==null}function Cu(t){return t===0&&1/t==-1/0}function uP(t){return typeof t=="number"&&Number.isInteger(t)&&!Cu(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x1="";function cP(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=jv(e)),e=hP(t.get(n),e);return jv(e)}function hP(t,e){let n=e;const r=t.length;for(let i=0;i<r;i++){const s=t.charAt(i);switch(s){case"\0":n+="";break;case x1:n+="";break;default:n+=s}}return n}function jv(t){return t+x1+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mv(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function ni(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function k1(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e,n){this.comparator=e,this.root=n||Je.EMPTY}insert(e,n){return new Re(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Je.BLACK,null,null))}remove(e){return new Re(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Je.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return n+r.left.size;i<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new wl(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new wl(this.root,e,this.comparator,!1)}getReverseIterator(){return new wl(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new wl(this.root,e,this.comparator,!0)}}class wl{constructor(e,n,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=n?r(e.key,n):1,n&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Je{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??Je.RED,this.left=i??Je.EMPTY,this.right=s??Je.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,i,s){return new Je(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i.copy(null,n,null,null,null):i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Je.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,i=this;if(n(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(e,i.key)===0){if(i.right.isEmpty())return Je.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Je.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Je.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw X(43730,{key:this.key,value:this.value});if(this.right.isRed())throw X(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw X(27949);return e+(this.isRed()?0:1)}}Je.EMPTY=null,Je.RED=!0,Je.BLACK=!1;Je.EMPTY=new class{constructor(){this.size=0}get key(){throw X(57766)}get value(){throw X(16141)}get color(){throw X(16727)}get left(){throw X(29726)}get right(){throw X(36894)}copy(e,n,r,i,s){return this}insert(e,n,r){return new Je(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e){this.comparator=e,this.data=new Re(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;n(i.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Lv(this.data.getIterator())}getIteratorFrom(e){return new Lv(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof We)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new We(this.comparator);return n.data=e,n}}class Lv{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(e){this.fields=e,e.sort(Xe.comparator)}static empty(){return new Ft([])}unionWith(e){let n=new We(Xe.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Ft(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return As(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S1 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new S1("Invalid base64 string: "+s):s}}(e);return new nt(n)}static fromUint8Array(e){const n=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new nt(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ne(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}nt.EMPTY_BYTE_STRING=new nt("");const dP=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Hr(t){if(fe(!!t,39018),typeof t=="string"){let e=0;const n=dP.exec(t);if(fe(!!n,46558,{timestamp:t}),n[1]){let i=n[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:De(t.seconds),nanos:De(t.nanos)}}function De(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function qr(t){return typeof t=="string"?nt.fromBase64String(t):nt.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C1="server_timestamp",A1="__type__",R1="__previous_value__",N1="__local_write_time__";function Lp(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{})[A1])===null||n===void 0?void 0:n.stringValue)===C1}function _c(t){const e=t.mapValue.fields[R1];return Lp(e)?_c(e):e}function aa(t){const e=Hr(t.mapValue.fields[N1].timestampValue);return new Ee(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fP{constructor(e,n,r,i,s,o,l,u,c,f){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=c,this.isUsingEmulator=f}}const Au="(default)";class la{constructor(e,n){this.projectId=e,this.database=n||Au}static empty(){return new la("","")}get isDefaultDatabase(){return this.database===Au}isEqual(e){return e instanceof la&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P1="__type__",pP="__max__",El={mapValue:{}},b1="__vector__",Ru="value";function Gr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Lp(t)?4:gP(t)?9007199254740991:mP(t)?10:11:X(28295,{value:t})}function Pn(t,e){if(t===e)return!0;const n=Gr(t);if(n!==Gr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return aa(t).isEqual(aa(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=Hr(i.timestampValue),l=Hr(s.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(i,s){return qr(i.bytesValue).isEqual(qr(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(i,s){return De(i.geoPointValue.latitude)===De(s.geoPointValue.latitude)&&De(i.geoPointValue.longitude)===De(s.geoPointValue.longitude)}(t,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return De(i.integerValue)===De(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=De(i.doubleValue),l=De(s.doubleValue);return o===l?Cu(o)===Cu(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return As(t.arrayValue.values||[],e.arrayValue.values||[],Pn);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},l=s.mapValue.fields||{};if(Mv(o)!==Mv(l))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(l[u]===void 0||!Pn(o[u],l[u])))return!1;return!0}(t,e);default:return X(52216,{left:t})}}function ua(t,e){return(t.values||[]).find(n=>Pn(n,e))!==void 0}function Rs(t,e){if(t===e)return 0;const n=Gr(t),r=Gr(e);if(n!==r)return ne(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return ne(t.booleanValue,e.booleanValue);case 2:return function(s,o){const l=De(s.integerValue||s.doubleValue),u=De(o.integerValue||o.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(t,e);case 3:return Fv(t.timestampValue,e.timestampValue);case 4:return Fv(aa(t),aa(e));case 5:return of(t.stringValue,e.stringValue);case 6:return function(s,o){const l=qr(s),u=qr(o);return l.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(s,o){const l=s.split("/"),u=o.split("/");for(let c=0;c<l.length&&c<u.length;c++){const f=ne(l[c],u[c]);if(f!==0)return f}return ne(l.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,o){const l=ne(De(s.latitude),De(o.latitude));return l!==0?l:ne(De(s.longitude),De(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Uv(t.arrayValue,e.arrayValue);case 10:return function(s,o){var l,u,c,f;const m=s.fields||{},g=o.fields||{},I=(l=m[Ru])===null||l===void 0?void 0:l.arrayValue,C=(u=g[Ru])===null||u===void 0?void 0:u.arrayValue,N=ne(((c=I==null?void 0:I.values)===null||c===void 0?void 0:c.length)||0,((f=C==null?void 0:C.values)===null||f===void 0?void 0:f.length)||0);return N!==0?N:Uv(I,C)}(t.mapValue,e.mapValue);case 11:return function(s,o){if(s===El.mapValue&&o===El.mapValue)return 0;if(s===El.mapValue)return 1;if(o===El.mapValue)return-1;const l=s.fields||{},u=Object.keys(l),c=o.fields||{},f=Object.keys(c);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){const g=of(u[m],f[m]);if(g!==0)return g;const I=Rs(l[u[m]],c[f[m]]);if(I!==0)return I}return ne(u.length,f.length)}(t.mapValue,e.mapValue);default:throw X(23264,{le:n})}}function Fv(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return ne(t,e);const n=Hr(t),r=Hr(e),i=ne(n.seconds,r.seconds);return i!==0?i:ne(n.nanos,r.nanos)}function Uv(t,e){const n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){const s=Rs(n[i],r[i]);if(s)return s}return ne(n.length,r.length)}function Ns(t){return af(t)}function af(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=Hr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return qr(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return Q.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",i=!0;for(const s of n.values||[])i?i=!1:r+=",",r+=af(s);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${af(n.fields[o])}`;return i+"}"}(t.mapValue):X(61005,{value:t})}function Bl(t){switch(Gr(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=_c(t);return e?16+Bl(e):16;case 5:return 2*t.stringValue.length;case 6:return qr(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+Bl(s),0)}(t.arrayValue);case 10:case 11:return function(r){let i=0;return ni(r.fields,(s,o)=>{i+=s.length+Bl(o)}),i}(t.mapValue);default:throw X(13486,{value:t})}}function zv(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function lf(t){return!!t&&"integerValue"in t}function Fp(t){return!!t&&"arrayValue"in t}function Bv(t){return!!t&&"nullValue"in t}function $v(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function $l(t){return!!t&&"mapValue"in t}function mP(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{})[P1])===null||n===void 0?void 0:n.stringValue)===b1}function Oo(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return ni(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=Oo(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Oo(t.arrayValue.values[n]);return e}return Object.assign({},t)}function gP(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===pP}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(e){this.value=e}static empty(){return new Ct({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!$l(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Oo(n)}setAll(e){let n=Xe.emptyPath(),r={},i=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const u=this.getFieldsMap(n);this.applyChanges(u,r,i),r={},i=[],n=l.popLast()}o?r[l.lastSegment()]=Oo(o):i.push(l.lastSegment())});const s=this.getFieldsMap(n);this.applyChanges(s,r,i)}delete(e){const n=this.field(e.popLast());$l(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Pn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=n.mapValue.fields[e.get(r)];$l(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=i),n=i}return n.mapValue.fields}applyChanges(e,n,r){ni(n,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new Ct(Oo(this.value))}}function D1(t){const e=[];return ni(t.fields,(n,r)=>{const i=new Xe([n]);if($l(r)){const s=D1(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new Ft(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(e,n,r,i,s,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=l}static newInvalidDocument(e){return new dt(e,0,Z.min(),Z.min(),Z.min(),Ct.empty(),0)}static newFoundDocument(e,n,r,i){return new dt(e,1,n,Z.min(),r,i,0)}static newNoDocument(e,n){return new dt(e,2,n,Z.min(),Z.min(),Ct.empty(),0)}static newUnknownDocument(e,n){return new dt(e,3,n,Z.min(),Z.min(),Ct.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(Z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ct.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ct.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Z.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof dt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new dt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nu{constructor(e,n){this.position=e,this.inclusive=n}}function Wv(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const s=e[i],o=t.position[i];if(s.field.isKeyField()?r=Q.comparator(Q.fromName(o.referenceValue),n.key):r=Rs(o,n.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Hv(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Pn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ca{constructor(e,n="asc"){this.field=e,this.dir=n}}function yP(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O1{}class Fe extends O1{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new _P(e,n,r):n==="array-contains"?new TP(e,r):n==="in"?new IP(e,r):n==="not-in"?new xP(e,r):n==="array-contains-any"?new kP(e,r):new Fe(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new wP(e,r):new EP(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(Rs(n,this.value)):n!==null&&Gr(this.value)===Gr(n)&&this.matchesComparison(Rs(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return X(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class _n extends O1{constructor(e,n){super(),this.filters=e,this.op=n,this.he=null}static create(e,n){return new _n(e,n)}matches(e){return V1(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function V1(t){return t.op==="and"}function j1(t){return vP(t)&&V1(t)}function vP(t){for(const e of t.filters)if(e instanceof _n)return!1;return!0}function uf(t){if(t instanceof Fe)return t.field.canonicalString()+t.op.toString()+Ns(t.value);if(j1(t))return t.filters.map(e=>uf(e)).join(",");{const e=t.filters.map(n=>uf(n)).join(",");return`${t.op}(${e})`}}function M1(t,e){return t instanceof Fe?function(r,i){return i instanceof Fe&&r.op===i.op&&r.field.isEqual(i.field)&&Pn(r.value,i.value)}(t,e):t instanceof _n?function(r,i){return i instanceof _n&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,l)=>s&&M1(o,i.filters[l]),!0):!1}(t,e):void X(19439)}function L1(t){return t instanceof Fe?function(n){return`${n.field.canonicalString()} ${n.op} ${Ns(n.value)}`}(t):t instanceof _n?function(n){return n.op.toString()+" {"+n.getFilters().map(L1).join(" ,")+"}"}(t):"Filter"}class _P extends Fe{constructor(e,n,r){super(e,n,r),this.key=Q.fromName(r.referenceValue)}matches(e){const n=Q.comparator(e.key,this.key);return this.matchesComparison(n)}}class wP extends Fe{constructor(e,n){super(e,"in",n),this.keys=F1("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class EP extends Fe{constructor(e,n){super(e,"not-in",n),this.keys=F1("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function F1(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>Q.fromName(r.referenceValue))}class TP extends Fe{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Fp(n)&&ua(n.arrayValue,this.value)}}class IP extends Fe{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&ua(this.value.arrayValue,n)}}class xP extends Fe{constructor(e,n){super(e,"not-in",n)}matches(e){if(ua(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!ua(this.value.arrayValue,n)}}class kP extends Fe{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Fp(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>ua(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SP{constructor(e,n=null,r=[],i=[],s=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=l,this.Pe=null}}function qv(t,e=null,n=[],r=[],i=null,s=null,o=null){return new SP(t,e,n,r,i,s,o)}function Up(t){const e=te(t);if(e.Pe===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>uf(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),vc(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>Ns(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>Ns(r)).join(",")),e.Pe=n}return e.Pe}function zp(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!yP(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!M1(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Hv(t.startAt,e.startAt)&&Hv(t.endAt,e.endAt)}function cf(t){return Q.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(e,n=null,r=[],i=[],s=null,o="F",l=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=l,this.endAt=u,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function CP(t,e,n,r,i,s,o,l){return new Mi(t,e,n,r,i,s,o,l)}function wc(t){return new Mi(t)}function Gv(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function U1(t){return t.collectionGroup!==null}function Vo(t){const e=te(t);if(e.Te===null){e.Te=[];const n=new Set;for(const s of e.explicitOrderBy)e.Te.push(s),n.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new We(Xe.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(c=>{c.isInequality()&&(l=l.add(c.field))})}),l})(e).forEach(s=>{n.has(s.canonicalString())||s.isKeyField()||e.Te.push(new ca(s,r))}),n.has(Xe.keyField().canonicalString())||e.Te.push(new ca(Xe.keyField(),r))}return e.Te}function Cn(t){const e=te(t);return e.Ie||(e.Ie=AP(e,Vo(t))),e.Ie}function AP(t,e){if(t.limitType==="F")return qv(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new ca(i.field,s)});const n=t.endAt?new Nu(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Nu(t.startAt.position,t.startAt.inclusive):null;return qv(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function hf(t,e){const n=t.filters.concat([e]);return new Mi(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Pu(t,e,n){return new Mi(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Ec(t,e){return zp(Cn(t),Cn(e))&&t.limitType===e.limitType}function z1(t){return`${Up(Cn(t))}|lt:${t.limitType}`}function qi(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(i=>L1(i)).join(", ")}]`),vc(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(i=>Ns(i)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(i=>Ns(i)).join(",")),`Target(${r})`}(Cn(t))}; limitType=${t.limitType})`}function Tc(t,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):Q.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(t,e)&&function(r,i){for(const s of Vo(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(t,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(t,e)&&function(r,i){return!(r.startAt&&!function(o,l,u){const c=Wv(o,l,u);return o.inclusive?c<=0:c<0}(r.startAt,Vo(r),i)||r.endAt&&!function(o,l,u){const c=Wv(o,l,u);return o.inclusive?c>=0:c>0}(r.endAt,Vo(r),i))}(t,e)}function RP(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function B1(t){return(e,n)=>{let r=!1;for(const i of Vo(t)){const s=NP(i,e,n);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function NP(t,e,n){const r=t.field.isKeyField()?Q.comparator(e.key,n.key):function(s,o,l){const u=o.data.field(s),c=l.data.field(s);return u!==null&&c!==null?Rs(u,c):X(42886)}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return X(19790,{direction:t.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Li{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,n]);i.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[n]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){ni(this.inner,(n,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return k1(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PP=new Re(Q.comparator);function rr(){return PP}const $1=new Re(Q.comparator);function yo(...t){let e=$1;for(const n of t)e=e.insert(n.key,n);return e}function W1(t){let e=$1;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function pi(){return jo()}function H1(){return jo()}function jo(){return new Li(t=>t.toString(),(t,e)=>t.isEqual(e))}const bP=new Re(Q.comparator),DP=new We(Q.comparator);function oe(...t){let e=DP;for(const n of t)e=e.add(n);return e}const OP=new We(ne);function VP(){return OP}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bp(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Cu(e)?"-0":e}}function q1(t){return{integerValue:""+t}}function G1(t,e){return uP(e)?q1(e):Bp(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ic{constructor(){this._=void 0}}function jP(t,e,n){return t instanceof ha?function(i,s){const o={fields:{[A1]:{stringValue:C1},[N1]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Lp(s)&&(s=_c(s)),s&&(o.fields[R1]=s),{mapValue:o}}(n,e):t instanceof da?Q1(t,e):t instanceof fa?Y1(t,e):function(i,s){const o=K1(i,s),l=Kv(o)+Kv(i.Ee);return lf(o)&&lf(i.Ee)?q1(l):Bp(i.serializer,l)}(t,e)}function MP(t,e,n){return t instanceof da?Q1(t,e):t instanceof fa?Y1(t,e):n}function K1(t,e){return t instanceof pa?function(r){return lf(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class ha extends Ic{}class da extends Ic{constructor(e){super(),this.elements=e}}function Q1(t,e){const n=J1(e);for(const r of t.elements)n.some(i=>Pn(i,r))||n.push(r);return{arrayValue:{values:n}}}class fa extends Ic{constructor(e){super(),this.elements=e}}function Y1(t,e){let n=J1(e);for(const r of t.elements)n=n.filter(i=>!Pn(i,r));return{arrayValue:{values:n}}}class pa extends Ic{constructor(e,n){super(),this.serializer=e,this.Ee=n}}function Kv(t){return De(t.integerValue||t.doubleValue)}function J1(t){return Fp(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X1{constructor(e,n){this.field=e,this.transform=n}}function LP(t,e){return t.field.isEqual(e.field)&&function(r,i){return r instanceof da&&i instanceof da||r instanceof fa&&i instanceof fa?As(r.elements,i.elements,Pn):r instanceof pa&&i instanceof pa?Pn(r.Ee,i.Ee):r instanceof ha&&i instanceof ha}(t.transform,e.transform)}class FP{constructor(e,n){this.version=e,this.transformResults=n}}class Dt{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Dt}static exists(e){return new Dt(void 0,e)}static updateTime(e){return new Dt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Wl(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class xc{}function Z1(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new $p(t.key,Dt.none()):new Ca(t.key,t.data,Dt.none());{const n=t.data,r=Ct.empty();let i=new We(Xe.comparator);for(let s of e.fields)if(!i.has(s)){let o=n.field(s);o===null&&s.length>1&&(s=s.popLast(),o=n.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new ri(t.key,r,new Ft(i.toArray()),Dt.none())}}function UP(t,e,n){t instanceof Ca?function(i,s,o){const l=i.value.clone(),u=Yv(i.fieldTransforms,s,o.transformResults);l.setAll(u),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof ri?function(i,s,o){if(!Wl(i.precondition,s))return void s.convertToUnknownDocument(o.version);const l=Yv(i.fieldTransforms,s,o.transformResults),u=s.data;u.setAll(eT(i)),u.setAll(l),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(t,e,n):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function Mo(t,e,n,r){return t instanceof Ca?function(s,o,l,u){if(!Wl(s.precondition,o))return l;const c=s.value.clone(),f=Jv(s.fieldTransforms,u,o);return c.setAll(f),o.convertToFoundDocument(o.version,c).setHasLocalMutations(),null}(t,e,n,r):t instanceof ri?function(s,o,l,u){if(!Wl(s.precondition,o))return l;const c=Jv(s.fieldTransforms,u,o),f=o.data;return f.setAll(eT(s)),f.setAll(c),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),l===null?null:l.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(m=>m.field))}(t,e,n,r):function(s,o,l){return Wl(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function zP(t,e){let n=null;for(const r of t.fieldTransforms){const i=e.data.field(r.field),s=K1(r.transform,i||null);s!=null&&(n===null&&(n=Ct.empty()),n.set(r.field,s))}return n||null}function Qv(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&As(r,i,(s,o)=>LP(s,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Ca extends xc{constructor(e,n,r,i=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class ri extends xc{constructor(e,n,r,i,s=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function eT(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function Yv(t,e,n){const r=new Map;fe(t.length===n.length,32656,{Ae:n.length,Re:t.length});for(let i=0;i<n.length;i++){const s=t[i],o=s.transform,l=e.data.field(s.field);r.set(s.field,MP(o,l,n[i]))}return r}function Jv(t,e,n){const r=new Map;for(const i of t){const s=i.transform,o=n.data.field(i.field);r.set(i.field,jP(s,o,e))}return r}class $p extends xc{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class BP extends xc{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $P{constructor(e,n,r,i){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&UP(s,e,r[i])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=Mo(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=Mo(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=H1();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let l=this.applyToLocalView(o,s.mutatedFields);l=n.has(i.key)?null:l;const u=Z1(o,l);u!==null&&r.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(Z.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),oe())}isEqual(e){return this.batchId===e.batchId&&As(this.mutations,e.mutations,(n,r)=>Qv(n,r))&&As(this.baseMutations,e.baseMutations,(n,r)=>Qv(n,r))}}class Wp{constructor(e,n,r,i){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=i}static from(e,n,r){fe(e.mutations.length===r.length,58842,{Ve:e.mutations.length,me:r.length});let i=function(){return bP}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new Wp(e,n,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WP{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HP{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var je,le;function qP(t){switch(t){case M.OK:return X(64938);case M.CANCELLED:case M.UNKNOWN:case M.DEADLINE_EXCEEDED:case M.RESOURCE_EXHAUSTED:case M.INTERNAL:case M.UNAVAILABLE:case M.UNAUTHENTICATED:return!1;case M.INVALID_ARGUMENT:case M.NOT_FOUND:case M.ALREADY_EXISTS:case M.PERMISSION_DENIED:case M.FAILED_PRECONDITION:case M.ABORTED:case M.OUT_OF_RANGE:case M.UNIMPLEMENTED:case M.DATA_LOSS:return!0;default:return X(15467,{code:t})}}function tT(t){if(t===void 0)return nr("GRPC error has no .code"),M.UNKNOWN;switch(t){case je.OK:return M.OK;case je.CANCELLED:return M.CANCELLED;case je.UNKNOWN:return M.UNKNOWN;case je.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case je.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case je.INTERNAL:return M.INTERNAL;case je.UNAVAILABLE:return M.UNAVAILABLE;case je.UNAUTHENTICATED:return M.UNAUTHENTICATED;case je.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case je.NOT_FOUND:return M.NOT_FOUND;case je.ALREADY_EXISTS:return M.ALREADY_EXISTS;case je.PERMISSION_DENIED:return M.PERMISSION_DENIED;case je.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case je.ABORTED:return M.ABORTED;case je.OUT_OF_RANGE:return M.OUT_OF_RANGE;case je.UNIMPLEMENTED:return M.UNIMPLEMENTED;case je.DATA_LOSS:return M.DATA_LOSS;default:return X(39323,{code:t})}}(le=je||(je={}))[le.OK=0]="OK",le[le.CANCELLED=1]="CANCELLED",le[le.UNKNOWN=2]="UNKNOWN",le[le.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",le[le.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",le[le.NOT_FOUND=5]="NOT_FOUND",le[le.ALREADY_EXISTS=6]="ALREADY_EXISTS",le[le.PERMISSION_DENIED=7]="PERMISSION_DENIED",le[le.UNAUTHENTICATED=16]="UNAUTHENTICATED",le[le.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",le[le.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",le[le.ABORTED=10]="ABORTED",le[le.OUT_OF_RANGE=11]="OUT_OF_RANGE",le[le.UNIMPLEMENTED=12]="UNIMPLEMENTED",le[le.INTERNAL=13]="INTERNAL",le[le.UNAVAILABLE=14]="UNAVAILABLE",le[le.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GP=new Mr([4294967295,4294967295],0);function Xv(t){const e=T1().encode(t),n=new p1;return n.update(e),new Uint8Array(n.digest())}function Zv(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Mr([n,r],0),new Mr([i,s],0)]}class Hp{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new vo(`Invalid padding: ${n}`);if(r<0)throw new vo(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new vo(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new vo(`Invalid padding when bitmap length is 0: ${n}`);this.fe=8*e.length-n,this.ge=Mr.fromNumber(this.fe)}pe(e,n,r){let i=e.add(n.multiply(Mr.fromNumber(r)));return i.compare(GP)===1&&(i=new Mr([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;const n=Xv(e),[r,i]=Zv(n);for(let s=0;s<this.hashCount;s++){const o=this.pe(r,i,s);if(!this.ye(o))return!1}return!0}static create(e,n,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new Hp(s,i,n);return r.forEach(l=>o.insert(l)),o}insert(e){if(this.fe===0)return;const n=Xv(e),[r,i]=Zv(n);for(let s=0;s<this.hashCount;s++){const o=this.pe(r,i,s);this.we(o)}}we(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class vo extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kc{constructor(e,n,r,i,s){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const i=new Map;return i.set(e,Aa.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new kc(Z.min(),i,new Re(ne),rr(),oe())}}class Aa{constructor(e,n,r,i,s){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Aa(r,n,oe(),oe(),oe())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hl{constructor(e,n,r,i){this.Se=e,this.removedTargetIds=n,this.key=r,this.be=i}}class nT{constructor(e,n){this.targetId=e,this.De=n}}class rT{constructor(e,n,r=nt.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=i}}class e_{constructor(){this.ve=0,this.Ce=t_(),this.Fe=nt.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=oe(),n=oe(),r=oe();return this.Ce.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:n=n.add(i);break;case 1:r=r.add(i);break;default:X(38017,{changeType:s})}}),new Aa(this.Fe,this.Me,e,n,r)}ke(){this.xe=!1,this.Ce=t_()}qe(e,n){this.xe=!0,this.Ce=this.Ce.insert(e,n)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,fe(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class KP{constructor(e){this.We=e,this.Ge=new Map,this.ze=rr(),this.je=Tl(),this.Je=Tl(),this.He=new Re(ne)}Ye(e){for(const n of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(n,e.be):this.Xe(n,e.key,e.be);for(const n of e.removedTargetIds)this.Xe(n,e.key,e.be)}et(e){this.forEachTarget(e,n=>{const r=this.tt(n);switch(e.state){case 0:this.nt(n)&&r.Be(e.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(e.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(n);break;case 3:this.nt(n)&&(r.Ke(),r.Be(e.resumeToken));break;case 4:this.nt(n)&&(this.rt(n),r.Be(e.resumeToken));break;default:X(56790,{state:e.state})}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Ge.forEach((r,i)=>{this.nt(i)&&n(i)})}it(e){const n=e.targetId,r=e.De.count,i=this.st(n);if(i){const s=i.target;if(cf(s))if(r===0){const o=new Q(s.path);this.Xe(n,o,dt.newNoDocument(o,Z.min()))}else fe(r===1,20013,{expectedCount:r});else{const o=this.ot(n);if(o!==r){const l=this._t(e),u=l?this.ut(l,e,o):1;if(u!==0){this.rt(n);const c=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(n,c)}}}}}_t(e){const n=e.De.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=n;let o,l;try{o=qr(r).toUint8Array()}catch(u){if(u instanceof S1)return $r("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Hp(o,i,s)}catch(u){return $r(u instanceof vo?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.fe===0?null:l}ut(e,n,r){return n.De.count===r-this.ht(e,n.targetId)?0:2}ht(e,n){const r=this.We.getRemoteKeysForTarget(n);let i=0;return r.forEach(s=>{const o=this.We.lt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(l)||(this.Xe(n,s,null),i++)}),i}Pt(e){const n=new Map;this.Ge.forEach((s,o)=>{const l=this.st(o);if(l){if(s.current&&cf(l.target)){const u=new Q(l.target.path);this.Tt(u).has(o)||this.It(o,u)||this.Xe(o,u,dt.newNoDocument(u,e))}s.Ne&&(n.set(o,s.Le()),s.ke())}});let r=oe();this.Je.forEach((s,o)=>{let l=!0;o.forEachWhile(u=>{const c=this.st(u);return!c||c.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(s))}),this.ze.forEach((s,o)=>o.setReadTime(e));const i=new kc(e,n,this.He,this.ze,r);return this.ze=rr(),this.je=Tl(),this.Je=Tl(),this.He=new Re(ne),i}Ze(e,n){if(!this.nt(e))return;const r=this.It(e,n.key)?2:0;this.tt(e).qe(n.key,r),this.ze=this.ze.insert(n.key,n),this.je=this.je.insert(n.key,this.Tt(n.key).add(e)),this.Je=this.Je.insert(n.key,this.dt(n.key).add(e))}Xe(e,n,r){if(!this.nt(e))return;const i=this.tt(e);this.It(e,n)?i.qe(n,1):i.Qe(n),this.Je=this.Je.insert(n,this.dt(n).delete(e)),this.Je=this.Je.insert(n,this.dt(n).add(e)),r&&(this.ze=this.ze.insert(n,r))}removeTarget(e){this.Ge.delete(e)}ot(e){const n=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let n=this.Ge.get(e);return n||(n=new e_,this.Ge.set(e,n)),n}dt(e){let n=this.Je.get(e);return n||(n=new We(ne),this.Je=this.Je.insert(e,n)),n}Tt(e){let n=this.je.get(e);return n||(n=new We(ne),this.je=this.je.insert(e,n)),n}nt(e){const n=this.st(e)!==null;return n||H("WatchChangeAggregator","Detected inactive target",e),n}st(e){const n=this.Ge.get(e);return n&&n.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new e_),this.We.getRemoteKeysForTarget(e).forEach(n=>{this.Xe(e,n,null)})}It(e,n){return this.We.getRemoteKeysForTarget(e).has(n)}}function Tl(){return new Re(Q.comparator)}function t_(){return new Re(Q.comparator)}const QP={asc:"ASCENDING",desc:"DESCENDING"},YP={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},JP={and:"AND",or:"OR"};class XP{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function df(t,e){return t.useProto3Json||vc(e)?e:{value:e}}function bu(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function iT(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function ZP(t,e){return bu(t,e.toTimestamp())}function An(t){return fe(!!t,49232),Z.fromTimestamp(function(n){const r=Hr(n);return new Ee(r.seconds,r.nanos)}(t))}function qp(t,e){return ff(t,e).canonicalString()}function ff(t,e){const n=function(i){return new ye(["projects",i.projectId,"databases",i.database])}(t).child("documents");return e===void 0?n:n.child(e)}function sT(t){const e=ye.fromString(t);return fe(cT(e),10190,{key:e.toString()}),e}function pf(t,e){return qp(t.databaseId,e.path)}function Wh(t,e){const n=sT(e);if(n.get(1)!==t.databaseId.projectId)throw new W(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new W(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Q(aT(n))}function oT(t,e){return qp(t.databaseId,e)}function eb(t){const e=sT(t);return e.length===4?ye.emptyPath():aT(e)}function mf(t){return new ye(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function aT(t){return fe(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function n_(t,e,n){return{name:pf(t,e),fields:n.value.mapValue.fields}}function tb(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:X(39313,{state:c})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(c,f){return c.useProto3Json?(fe(f===void 0||typeof f=="string",58123),nt.fromBase64String(f||"")):(fe(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),nt.fromUint8Array(f||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(c){const f=c.code===void 0?M.UNKNOWN:tT(c.code);return new W(f,c.message||"")}(o);n=new rT(r,i,s,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Wh(t,r.document.name),s=An(r.document.updateTime),o=r.document.createTime?An(r.document.createTime):Z.min(),l=new Ct({mapValue:{fields:r.document.fields}}),u=dt.newFoundDocument(i,s,o,l),c=r.targetIds||[],f=r.removedTargetIds||[];n=new Hl(c,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Wh(t,r.document),s=r.readTime?An(r.readTime):Z.min(),o=dt.newNoDocument(i,s),l=r.removedTargetIds||[];n=new Hl([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Wh(t,r.document),s=r.removedTargetIds||[];n=new Hl([],s,i,null)}else{if(!("filter"in e))return X(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new HP(i,s),l=r.targetId;n=new nT(l,o)}}return n}function nb(t,e){let n;if(e instanceof Ca)n={update:n_(t,e.key,e.value)};else if(e instanceof $p)n={delete:pf(t,e.key)};else if(e instanceof ri)n={update:n_(t,e.key,e.data),updateMask:hb(e.fieldMask)};else{if(!(e instanceof BP))return X(16599,{Rt:e.type});n={verify:pf(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const l=o.transform;if(l instanceof ha)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof da)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof fa)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof pa)return{fieldPath:o.field.canonicalString(),increment:l.Ee};throw X(20930,{transform:o.transform})}(0,r))),e.precondition.isNone||(n.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:ZP(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:X(27497)}(t,e.precondition)),n}function rb(t,e){return t&&t.length>0?(fe(e!==void 0,14353),t.map(n=>function(i,s){let o=i.updateTime?An(i.updateTime):An(s);return o.isEqual(Z.min())&&(o=An(s)),new FP(o,i.transformResults||[])}(n,e))):[]}function ib(t,e){return{documents:[oT(t,e.path)]}}function sb(t,e){const n={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=oT(t,i);const s=function(c){if(c.length!==0)return uT(_n.create(c,"and"))}(e.filters);s&&(n.structuredQuery.where=s);const o=function(c){if(c.length!==0)return c.map(f=>function(g){return{field:Gi(g.field),direction:lb(g.dir)}}(f))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=df(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),{Vt:n,parent:i}}function ob(t){let e=eb(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){fe(r===1,65062);const f=n.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];n.where&&(s=function(m){const g=lT(m);return g instanceof _n&&j1(g)?g.getFilters():[g]}(n.where));let o=[];n.orderBy&&(o=function(m){return m.map(g=>function(C){return new ca(Ki(C.field),function(P){switch(P){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(g))}(n.orderBy));let l=null;n.limit&&(l=function(m){let g;return g=typeof m=="object"?m.value:m,vc(g)?null:g}(n.limit));let u=null;n.startAt&&(u=function(m){const g=!!m.before,I=m.values||[];return new Nu(I,g)}(n.startAt));let c=null;return n.endAt&&(c=function(m){const g=!m.before,I=m.values||[];return new Nu(I,g)}(n.endAt)),CP(e,i,o,s,l,"F",u,c)}function ab(t,e){const n=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return X(28987,{purpose:i})}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function lT(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=Ki(n.unaryFilter.field);return Fe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Ki(n.unaryFilter.field);return Fe.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Ki(n.unaryFilter.field);return Fe.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Ki(n.unaryFilter.field);return Fe.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return X(61313);default:return X(60726)}}(t):t.fieldFilter!==void 0?function(n){return Fe.create(Ki(n.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return X(58110);default:return X(50506)}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return _n.create(n.compositeFilter.filters.map(r=>lT(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return X(1026)}}(n.compositeFilter.op))}(t):X(30097,{filter:t})}function lb(t){return QP[t]}function ub(t){return YP[t]}function cb(t){return JP[t]}function Gi(t){return{fieldPath:t.canonicalString()}}function Ki(t){return Xe.fromServerFormat(t.fieldPath)}function uT(t){return t instanceof Fe?function(n){if(n.op==="=="){if($v(n.value))return{unaryFilter:{field:Gi(n.field),op:"IS_NAN"}};if(Bv(n.value))return{unaryFilter:{field:Gi(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if($v(n.value))return{unaryFilter:{field:Gi(n.field),op:"IS_NOT_NAN"}};if(Bv(n.value))return{unaryFilter:{field:Gi(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Gi(n.field),op:ub(n.op),value:n.value}}}(t):t instanceof _n?function(n){const r=n.getFilters().map(i=>uT(i));return r.length===1?r[0]:{compositeFilter:{op:cb(n.op),filters:r}}}(t):X(54877,{filter:t})}function hb(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function cT(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr{constructor(e,n,r,i,s=Z.min(),o=Z.min(),l=nt.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new xr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new xr(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new xr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new xr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class db{constructor(e){this.gt=e}}function fb(t){const e=ob({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Pu(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pb{constructor(){this.Dn=new mb}addToCollectionParentIndex(e,n){return this.Dn.add(n),F.resolve()}getCollectionParents(e,n){return F.resolve(this.Dn.getEntries(n))}addFieldIndex(e,n){return F.resolve()}deleteFieldIndex(e,n){return F.resolve()}deleteAllFieldIndexes(e){return F.resolve()}createTargetIndexes(e,n){return F.resolve()}getDocumentsMatchingTarget(e,n){return F.resolve(null)}getIndexType(e,n){return F.resolve(0)}getFieldIndexes(e,n){return F.resolve([])}getNextCollectionGroupToUpdate(e){return F.resolve(null)}getMinOffset(e,n){return F.resolve(Wr.min())}getMinOffsetFromCollectionGroup(e,n){return F.resolve(Wr.min())}updateCollectionGroup(e,n,r){return F.resolve()}updateIndexEntries(e,n){return F.resolve()}}class mb{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n]||new We(ye.comparator),s=!i.has(r);return this.index[n]=i.add(r),s}has(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n];return i&&i.has(r)}getEntries(e){return(this.index[e]||new We(ye.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r_={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},hT=41943040;class kt{static withCacheSize(e){return new kt(e,kt.DEFAULT_COLLECTION_PERCENTILE,kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */kt.DEFAULT_COLLECTION_PERCENTILE=10,kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,kt.DEFAULT=new kt(hT,kt.DEFAULT_COLLECTION_PERCENTILE,kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),kt.DISABLED=new kt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new Ps(0)}static ur(){return new Ps(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const i_="LruGarbageCollector",gb=1048576;function s_([t,e],[n,r]){const i=ne(t,n);return i===0?ne(e,r):i}class yb{constructor(e){this.Tr=e,this.buffer=new We(s_),this.Ir=0}dr(){return++this.Ir}Er(e){const n=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();s_(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class vb{constructor(e,n,r){this.garbageCollector=e,this.asyncQueue=n,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){H(i_,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){zs(n)?H(i_,"Ignoring IndexedDB error during garbage collection: ",n):await Us(n)}await this.Rr(3e5)})}}class _b{constructor(e,n){this.Vr=e,this.params=n}calculateTargetCount(e,n){return this.Vr.mr(e).next(r=>Math.floor(n/100*r))}nthSequenceNumber(e,n){if(n===0)return F.resolve(yc.ue);const r=new yb(n);return this.Vr.forEachTarget(e,i=>r.Er(i.sequenceNumber)).next(()=>this.Vr.gr(e,i=>r.Er(i))).next(()=>r.maxValue)}removeTargets(e,n,r){return this.Vr.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.Vr.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(H("LruGarbageCollector","Garbage collection skipped; disabled"),F.resolve(r_)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(H("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),r_):this.pr(e,n))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,n){let r,i,s,o,l,u,c;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(H("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),i=this.params.maximumSequenceNumbersToCollect):i=m,o=Date.now(),this.nthSequenceNumber(e,i))).next(m=>(r=m,l=Date.now(),this.removeTargets(e,r,n))).next(m=>(s=m,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(m=>(c=Date.now(),Hi()<=se.DEBUG&&H("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${i} in `+(l-o)+`ms
	Removed ${s} targets in `+(u-l)+`ms
	Removed ${m} documents in `+(c-u)+`ms
Total Duration: ${c-f}ms`),F.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:m})))}}function wb(t,e){return new _b(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eb{constructor(){this.changes=new Li(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,dt.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?F.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tb{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ib{constructor(e,n,r,i){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,n))).next(i=>(r!==null&&Mo(r.mutation,i,Ft.empty(),Ee.now()),i))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,oe()).next(()=>r))}getLocalViewOfDocuments(e,n,r=oe()){const i=pi();return this.populateOverlays(e,i,n).next(()=>this.computeViews(e,n,i,r).next(s=>{let o=yo();return s.forEach((l,u)=>{o=o.insert(l,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=pi();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,oe()))}populateOverlays(e,n,r){const i=[];return r.forEach(s=>{n.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,r,i){let s=rr();const o=jo(),l=function(){return jo()}();return n.forEach((u,c)=>{const f=r.get(c.key);i.has(c.key)&&(f===void 0||f.mutation instanceof ri)?s=s.insert(c.key,c):f!==void 0?(o.set(c.key,f.mutation.getFieldMask()),Mo(f.mutation,c,f.mutation.getFieldMask(),Ee.now())):o.set(c.key,Ft.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((c,f)=>o.set(c,f)),n.forEach((c,f)=>{var m;return l.set(c,new Tb(f,(m=o.get(c))!==null&&m!==void 0?m:null))}),l))}recalculateAndSaveOverlays(e,n){const r=jo();let i=new Re((o,l)=>o-l),s=oe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(u=>{const c=n.get(u);if(c===null)return;let f=r.get(u)||Ft.empty();f=l.applyToLocalView(c,f),r.set(u,f);const m=(i.get(l.batchId)||oe()).add(u);i=i.insert(l.batchId,m)})}).next(()=>{const o=[],l=i.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),c=u.key,f=u.value,m=H1();f.forEach(g=>{if(!s.has(g)){const I=Z1(n.get(g),r.get(g));I!==null&&m.set(g,I),s=s.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,c,m))}return F.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,i){return function(o){return Q.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):U1(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,i):this.getDocumentsMatchingCollectionQuery(e,n,r,i)}getNextDocuments(e,n,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,i-s.size):F.resolve(pi());let l=oa,u=s;return o.next(c=>F.forEach(c,(f,m)=>(l<m.largestBatchId&&(l=m.largestBatchId),s.get(f)?F.resolve():this.remoteDocumentCache.getEntry(e,f).next(g=>{u=u.insert(f,g)}))).next(()=>this.populateOverlays(e,c,s)).next(()=>this.computeViews(e,u,c,oe())).next(f=>({batchId:l,changes:W1(f)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new Q(n)).next(r=>{let i=yo();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,n,r,i){const s=n.collectionGroup;let o=yo();return this.indexManager.getCollectionParents(e,s).next(l=>F.forEach(l,u=>{const c=function(m,g){return new Mi(g,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(n,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,c,r,i).next(f=>{f.forEach((m,g)=>{o=o.insert(m,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,s,i))).next(o=>{s.forEach((u,c)=>{const f=c.getKey();o.get(f)===null&&(o=o.insert(f,dt.newInvalidDocument(f)))});let l=yo();return o.forEach((u,c)=>{const f=s.get(u);f!==void 0&&Mo(f.mutation,c,Ft.empty(),Ee.now()),Tc(n,c)&&(l=l.insert(u,c))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xb{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,n){return F.resolve(this.Br.get(n))}saveBundleMetadata(e,n){return this.Br.set(n.id,function(i){return{id:i.id,version:i.version,createTime:An(i.createTime)}}(n)),F.resolve()}getNamedQuery(e,n){return F.resolve(this.Lr.get(n))}saveNamedQuery(e,n){return this.Lr.set(n.name,function(i){return{name:i.name,query:fb(i.bundledQuery),readTime:An(i.readTime)}}(n)),F.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kb{constructor(){this.overlays=new Re(Q.comparator),this.kr=new Map}getOverlay(e,n){return F.resolve(this.overlays.get(n))}getOverlays(e,n){const r=pi();return F.forEach(n,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((i,s)=>{this.wt(e,n,s)}),F.resolve()}removeOverlaysForBatchId(e,n,r){const i=this.kr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.kr.delete(r)),F.resolve()}getOverlaysForCollection(e,n,r){const i=pi(),s=n.length+1,o=new Q(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const u=l.getNext().value,c=u.getKey();if(!n.isPrefixOf(c.path))break;c.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return F.resolve(i)}getOverlaysForCollectionGroup(e,n,r,i){let s=new Re((c,f)=>c-f);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===n&&c.largestBatchId>r){let f=s.get(c.largestBatchId);f===null&&(f=pi(),s=s.insert(c.largestBatchId,f)),f.set(c.getKey(),c)}}const l=pi(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((c,f)=>l.set(c,f)),!(l.size()>=i)););return F.resolve(l)}wt(e,n,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.kr.get(i.largestBatchId).delete(r.key);this.kr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new WP(n,r));let s=this.kr.get(n);s===void 0&&(s=oe(),this.kr.set(n,s)),this.kr.set(n,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sb{constructor(){this.sessionToken=nt.EMPTY_BYTE_STRING}getSessionToken(e){return F.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,F.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gp{constructor(){this.qr=new We(He.Qr),this.$r=new We(He.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,n){const r=new He(e,n);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Wr(new He(e,n))}Gr(e,n){e.forEach(r=>this.removeReference(r,n))}zr(e){const n=new Q(new ye([])),r=new He(n,e),i=new He(n,e+1),s=[];return this.$r.forEachInRange([r,i],o=>{this.Wr(o),s.push(o.key)}),s}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const n=new Q(new ye([])),r=new He(n,e),i=new He(n,e+1);let s=oe();return this.$r.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const n=new He(e,0),r=this.qr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class He{constructor(e,n){this.key=e,this.Hr=n}static Qr(e,n){return Q.comparator(e.key,n.key)||ne(e.Hr,n.Hr)}static Ur(e,n){return ne(e.Hr,n.Hr)||Q.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cb{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.er=1,this.Yr=new We(He.Qr)}checkEmpty(e){return F.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,i){const s=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new $P(s,n,r,i);this.mutationQueue.push(o);for(const l of i)this.Yr=this.Yr.add(new He(l.key,s)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return F.resolve(o)}lookupMutationBatch(e,n){return F.resolve(this.Zr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,i=this.Xr(r),s=i<0?0:i;return F.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return F.resolve(this.mutationQueue.length===0?Mp:this.er-1)}getAllMutationBatches(e){return F.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new He(n,0),i=new He(n,Number.POSITIVE_INFINITY),s=[];return this.Yr.forEachInRange([r,i],o=>{const l=this.Zr(o.Hr);s.push(l)}),F.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new We(ne);return n.forEach(i=>{const s=new He(i,0),o=new He(i,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([s,o],l=>{r=r.add(l.Hr)})}),F.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,i=r.length+1;let s=r;Q.isDocumentKey(s)||(s=s.child(""));const o=new He(new Q(s),0);let l=new We(ne);return this.Yr.forEachWhile(u=>{const c=u.key.path;return!!r.isPrefixOf(c)&&(c.length===i&&(l=l.add(u.Hr)),!0)},o),F.resolve(this.ei(l))}ei(e){const n=[];return e.forEach(r=>{const i=this.Zr(r);i!==null&&n.push(i)}),n}removeMutationBatch(e,n){fe(this.ti(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return F.forEach(n.mutations,i=>{const s=new He(i.key,n.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Yr=r})}rr(e){}containsKey(e,n){const r=new He(n,0),i=this.Yr.firstAfterOrEqual(r);return F.resolve(n.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,F.resolve()}ti(e,n){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const n=this.Xr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ab{constructor(e){this.ni=e,this.docs=function(){return new Re(Q.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,i=this.docs.get(r),s=i?i.size:0,o=this.ni(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return F.resolve(r?r.document.mutableCopy():dt.newInvalidDocument(n))}getEntries(e,n){let r=rr();return n.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():dt.newInvalidDocument(i))}),F.resolve(r)}getDocumentsMatchingQuery(e,n,r,i){let s=rr();const o=n.path,l=new Q(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:c,value:{document:f}}=u.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||sP(iP(f),r)<=0||(i.has(f.key)||Tc(n,f))&&(s=s.insert(f.key,f.mutableCopy()))}return F.resolve(s)}getAllFromCollectionGroup(e,n,r,i){X(9500)}ri(e,n){return F.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new Rb(this)}getSize(e){return F.resolve(this.size)}}class Rb extends Eb{constructor(e){super(),this.Or=e}applyChanges(e){const n=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?n.push(this.Or.addEntry(e,i)):this.Or.removeEntry(r)}),F.waitFor(n)}getFromCache(e,n){return this.Or.getEntry(e,n)}getAllFromCache(e,n){return this.Or.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nb{constructor(e){this.persistence=e,this.ii=new Li(n=>Up(n),zp),this.lastRemoteSnapshotVersion=Z.min(),this.highestTargetId=0,this.si=0,this.oi=new Gp,this.targetCount=0,this._i=Ps.ar()}forEachTarget(e,n){return this.ii.forEach((r,i)=>n(i)),F.resolve()}getLastRemoteSnapshotVersion(e){return F.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return F.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),F.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.si&&(this.si=n),F.resolve()}hr(e){this.ii.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this._i=new Ps(n),this.highestTargetId=n),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,n){return this.hr(n),this.targetCount+=1,F.resolve()}updateTargetData(e,n){return this.hr(n),F.resolve()}removeTargetData(e,n){return this.ii.delete(n.target),this.oi.zr(n.targetId),this.targetCount-=1,F.resolve()}removeTargets(e,n,r){let i=0;const s=[];return this.ii.forEach((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.ii.delete(o),s.push(this.removeMatchingKeysForTargetId(e,l.targetId)),i++)}),F.waitFor(s).next(()=>i)}getTargetCount(e){return F.resolve(this.targetCount)}getTargetData(e,n){const r=this.ii.get(n)||null;return F.resolve(r)}addMatchingKeys(e,n,r){return this.oi.Kr(n,r),F.resolve()}removeMatchingKeys(e,n,r){this.oi.Gr(n,r);const i=this.persistence.referenceDelegate,s=[];return i&&n.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),F.waitFor(s)}removeMatchingKeysForTargetId(e,n){return this.oi.zr(n),F.resolve()}getMatchingKeysForTargetId(e,n){const r=this.oi.Jr(n);return F.resolve(r)}containsKey(e,n){return F.resolve(this.oi.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dT{constructor(e,n){this.ai={},this.overlays={},this.ui=new yc(0),this.ci=!1,this.ci=!0,this.li=new Sb,this.referenceDelegate=e(this),this.hi=new Nb(this),this.indexManager=new pb,this.remoteDocumentCache=function(i){return new Ab(i)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new db(n),this.Ti=new xb(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new kb,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.ai[e.toKey()];return r||(r=new Cb(n,this.referenceDelegate),this.ai[e.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,n,r){H("MemoryPersistence","Starting transaction:",e);const i=new Pb(this.ui.next());return this.referenceDelegate.Ii(),r(i).next(s=>this.referenceDelegate.di(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Ei(e,n){return F.or(Object.values(this.ai).map(r=>()=>r.containsKey(e,n)))}}class Pb extends aP{constructor(e){super(),this.currentSequenceNumber=e}}class Kp{constructor(e){this.persistence=e,this.Ai=new Gp,this.Ri=null}static Vi(e){return new Kp(e)}get mi(){if(this.Ri)return this.Ri;throw X(60996)}addReference(e,n,r){return this.Ai.addReference(r,n),this.mi.delete(r.toString()),F.resolve()}removeReference(e,n,r){return this.Ai.removeReference(r,n),this.mi.add(r.toString()),F.resolve()}markPotentiallyOrphaned(e,n){return this.mi.add(n.toString()),F.resolve()}removeTarget(e,n){this.Ai.zr(n.targetId).forEach(i=>this.mi.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(i=>{i.forEach(s=>this.mi.add(s.toString()))}).next(()=>r.removeTargetData(e,n))}Ii(){this.Ri=new Set}di(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return F.forEach(this.mi,r=>{const i=Q.fromPath(r);return this.fi(e,i).next(s=>{s||n.removeEntry(i,Z.min())})}).next(()=>(this.Ri=null,n.apply(e)))}updateLimboDocument(e,n){return this.fi(e,n).next(r=>{r?this.mi.delete(n.toString()):this.mi.add(n.toString())})}Pi(e){return 0}fi(e,n){return F.or([()=>F.resolve(this.Ai.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ei(e,n)])}}class Du{constructor(e,n){this.persistence=e,this.gi=new Li(r=>cP(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=wb(this,n)}static Vi(e,n){return new Du(e,n)}Ii(){}di(e){return F.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}mr(e){const n=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>n.next(i=>r+i))}yr(e){let n=0;return this.gr(e,r=>{n++}).next(()=>n)}gr(e,n){return F.forEach(this.gi,(r,i)=>this.Sr(e,r,i).next(s=>s?F.resolve():n(i)))}removeTargets(e,n,r){return this.persistence.getTargetCache().removeTargets(e,n,r)}removeOrphanedDocuments(e,n){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ri(e,o=>this.Sr(e,o,n).next(l=>{l||(r++,s.removeEntry(o,Z.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,n){return this.gi.set(n,e.currentSequenceNumber),F.resolve()}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,n,r){return this.gi.set(r,e.currentSequenceNumber),F.resolve()}removeReference(e,n,r){return this.gi.set(r,e.currentSequenceNumber),F.resolve()}updateLimboDocument(e,n){return this.gi.set(n,e.currentSequenceNumber),F.resolve()}Pi(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=Bl(e.data.value)),n}Sr(e,n,r){return F.or([()=>this.persistence.Ei(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const i=this.gi.get(n);return F.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qp{constructor(e,n,r,i){this.targetId=e,this.fromCache=n,this.Is=r,this.ds=i}static Es(e,n){let r=oe(),i=oe();for(const s of n.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Qp(e,n.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bb{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Db{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return sA()?8:lP(pt())>0?6:4}()}initialize(e,n){this.gs=e,this.indexManager=n,this.As=!0}getDocumentsMatchingQuery(e,n,r,i){const s={result:null};return this.ps(e,n).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.ys(e,n,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new bb;return this.ws(e,n,o).next(l=>{if(s.result=l,this.Rs)return this.Ss(e,n,o,l.size)})}).next(()=>s.result)}Ss(e,n,r,i){return r.documentReadCount<this.Vs?(Hi()<=se.DEBUG&&H("QueryEngine","SDK will not create cache indexes for query:",qi(n),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),F.resolve()):(Hi()<=se.DEBUG&&H("QueryEngine","Query:",qi(n),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.fs*i?(Hi()<=se.DEBUG&&H("QueryEngine","The SDK decides to create cache indexes for query:",qi(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Cn(n))):F.resolve())}ps(e,n){if(Gv(n))return F.resolve(null);let r=Cn(n);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(n.limit!==null&&i===1&&(n=Pu(n,null,"F"),r=Cn(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=oe(...s);return this.gs.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const c=this.bs(n,l);return this.Ds(n,c,o,u.readTime)?this.ps(e,Pu(n,null,"F")):this.vs(e,c,n,u)}))})))}ys(e,n,r,i){return Gv(n)||i.isEqual(Z.min())?F.resolve(null):this.gs.getDocuments(e,r).next(s=>{const o=this.bs(n,s);return this.Ds(n,o,r,i)?F.resolve(null):(Hi()<=se.DEBUG&&H("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),qi(n)),this.vs(e,o,n,rP(i,oa)).next(l=>l))})}bs(e,n){let r=new We(B1(e));return n.forEach((i,s)=>{Tc(e,s)&&(r=r.add(s))}),r}Ds(e,n,r,i){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const s=e.limitType==="F"?n.last():n.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ws(e,n,r){return Hi()<=se.DEBUG&&H("QueryEngine","Using full collection scan to execute query:",qi(n)),this.gs.getDocumentsMatchingQuery(e,n,Wr.min(),r)}vs(e,n,r,i){return this.gs.getDocumentsMatchingQuery(e,r,i).next(s=>(n.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yp="LocalStore",Ob=3e8;class Vb{constructor(e,n,r,i){this.persistence=e,this.Cs=n,this.serializer=i,this.Fs=new Re(ne),this.Ms=new Li(s=>Up(s),zp),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(r)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Ib(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Fs))}}function jb(t,e,n,r){return new Vb(t,e,n,r)}async function fT(t,e){const n=te(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let i;return n.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,n.Ns(e),n.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],l=[];let u=oe();for(const c of i){o.push(c.batchId);for(const f of c.mutations)u=u.add(f.key)}for(const c of s){l.push(c.batchId);for(const f of c.mutations)u=u.add(f.key)}return n.localDocuments.getDocuments(r,u).next(c=>({Bs:c,removedBatchIds:o,addedBatchIds:l}))})})}function Mb(t,e){const n=te(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=n.Os.newChangeBuffer({trackRemovals:!0});return function(l,u,c,f){const m=c.batch,g=m.keys();let I=F.resolve();return g.forEach(C=>{I=I.next(()=>f.getEntry(u,C)).next(N=>{const P=c.docVersions.get(C);fe(P!==null,48541),N.version.compareTo(P)<0&&(m.applyToRemoteDocument(N,c),N.isValidDocument()&&(N.setReadTime(c.commitVersion),f.addEntry(N)))})}),I.next(()=>l.mutationQueue.removeMutationBatch(u,m))}(n,r,e,s).next(()=>s.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=oe();for(let c=0;c<l.mutationResults.length;++c)l.mutationResults[c].transformResults.length>0&&(u=u.add(l.batch.mutations[c].key));return u}(e))).next(()=>n.localDocuments.getDocuments(r,i))})}function pT(t){const e=te(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.hi.getLastRemoteSnapshotVersion(n))}function Lb(t,e){const n=te(t),r=e.snapshotVersion;let i=n.Fs;return n.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=n.Os.newChangeBuffer({trackRemovals:!0});i=n.Fs;const l=[];e.targetChanges.forEach((f,m)=>{const g=i.get(m);if(!g)return;l.push(n.hi.removeMatchingKeys(s,f.removedDocuments,m).next(()=>n.hi.addMatchingKeys(s,f.addedDocuments,m)));let I=g.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(m)!==null?I=I.withResumeToken(nt.EMPTY_BYTE_STRING,Z.min()).withLastLimboFreeSnapshotVersion(Z.min()):f.resumeToken.approximateByteSize()>0&&(I=I.withResumeToken(f.resumeToken,r)),i=i.insert(m,I),function(N,P,w){return N.resumeToken.approximateByteSize()===0||P.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=Ob?!0:w.addedDocuments.size+w.modifiedDocuments.size+w.removedDocuments.size>0}(g,I,f)&&l.push(n.hi.updateTargetData(s,I))});let u=rr(),c=oe();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(s,f))}),l.push(Fb(s,o,e.documentUpdates).next(f=>{u=f.Ls,c=f.ks})),!r.isEqual(Z.min())){const f=n.hi.getLastRemoteSnapshotVersion(s).next(m=>n.hi.setTargetsMetadata(s,s.currentSequenceNumber,r));l.push(f)}return F.waitFor(l).next(()=>o.apply(s)).next(()=>n.localDocuments.getLocalViewOfDocuments(s,u,c)).next(()=>u)}).then(s=>(n.Fs=i,s))}function Fb(t,e,n){let r=oe(),i=oe();return n.forEach(s=>r=r.add(s)),e.getEntries(t,r).next(s=>{let o=rr();return n.forEach((l,u)=>{const c=s.get(l);u.isFoundDocument()!==c.isFoundDocument()&&(i=i.add(l)),u.isNoDocument()&&u.version.isEqual(Z.min())?(e.removeEntry(l,u.readTime),o=o.insert(l,u)):!c.isValidDocument()||u.version.compareTo(c.version)>0||u.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(u),o=o.insert(l,u)):H(Yp,"Ignoring outdated watch update for ",l,". Current version:",c.version," Watch version:",u.version)}),{Ls:o,ks:i}})}function Ub(t,e){const n=te(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Mp),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function zb(t,e){const n=te(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return n.hi.getTargetData(r,e).next(s=>s?(i=s,F.resolve(i)):n.hi.allocateTargetId(r).next(o=>(i=new xr(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.hi.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=n.Fs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(n.Fs=n.Fs.insert(r.targetId,r),n.Ms.set(e,r.targetId)),r})}async function gf(t,e,n){const r=te(t),i=r.Fs.get(e),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!zs(o))throw o;H(Yp,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Fs=r.Fs.remove(e),r.Ms.delete(i.target)}function o_(t,e,n){const r=te(t);let i=Z.min(),s=oe();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,c,f){const m=te(u),g=m.Ms.get(f);return g!==void 0?F.resolve(m.Fs.get(g)):m.hi.getTargetData(c,f)}(r,o,Cn(e)).next(l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(o,l.targetId).next(u=>{s=u})}).next(()=>r.Cs.getDocumentsMatchingQuery(o,e,n?i:Z.min(),n?s:oe())).next(l=>(Bb(r,RP(e),l),{documents:l,qs:s})))}function Bb(t,e,n){let r=t.xs.get(e)||Z.min();n.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),t.xs.set(e,r)}class a_{constructor(){this.activeTargetIds=VP()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class $b{constructor(){this.Fo=new a_,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,n,r){this.Mo[e]=n}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new a_,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wb{xo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const l_="ConnectivityMonitor";class u_{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){H(l_,"Network connectivity changed: AVAILABLE");for(const e of this.ko)e(0)}Lo(){H(l_,"Network connectivity changed: UNAVAILABLE");for(const e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Il=null;function yf(){return Il===null?Il=function(){return 268435456+Math.round(2147483648*Math.random())}():Il++,"0x"+Il.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hh="RestConnection",Hb={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class qb{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.$o=n+"://"+e.host,this.Uo=`projects/${r}/databases/${i}`,this.Ko=this.databaseId.database===Au?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(e,n,r,i,s){const o=yf(),l=this.Go(e,n.toUriEncodedString());H(Hh,`Sending RPC '${e}' ${o}:`,l,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(u,i,s);const{host:c}=new URL(l),f=Oi(c);return this.jo(e,l,u,r,f).then(m=>(H(Hh,`Received RPC '${e}' ${o}: `,m),m),m=>{throw $r(Hh,`RPC '${e}' ${o} failed with error: `,m,"url: ",l,"request:",r),m})}Jo(e,n,r,i,s,o){return this.Wo(e,n,r,i,s)}zo(e,n,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Fs}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}Go(e,n){const r=Hb[e];return`${this.$o}/v1/${n}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gb{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ut="WebChannelConnection";class Kb extends qb{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,n,r,i,s){const o=yf();return new Promise((l,u)=>{const c=new m1;c.setWithCredentials(!0),c.listenOnce(g1.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case zl.NO_ERROR:const m=c.getResponseJson();H(ut,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(m)),l(m);break;case zl.TIMEOUT:H(ut,`RPC '${e}' ${o} timed out`),u(new W(M.DEADLINE_EXCEEDED,"Request time out"));break;case zl.HTTP_ERROR:const g=c.getStatus();if(H(ut,`RPC '${e}' ${o} failed with status:`,g,"response text:",c.getResponseText()),g>0){let I=c.getResponseJson();Array.isArray(I)&&(I=I[0]);const C=I==null?void 0:I.error;if(C&&C.status&&C.message){const N=function(w){const _=w.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(_)>=0?_:M.UNKNOWN}(C.status);u(new W(N,C.message))}else u(new W(M.UNKNOWN,"Server responded with status "+c.getStatus()))}else u(new W(M.UNAVAILABLE,"Connection failed."));break;default:X(9055,{c_:e,streamId:o,l_:c.getLastErrorCode(),h_:c.getLastError()})}}finally{H(ut,`RPC '${e}' ${o} completed.`)}});const f=JSON.stringify(i);H(ut,`RPC '${e}' ${o} sending request:`,i),c.send(n,"POST",f,r,15)})}P_(e,n,r){const i=yf(),s=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=_1(),l=v1(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(u.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(u.useFetchStreams=!0),this.zo(u.initMessageHeaders,n,r),u.encodeInitMessageHeaders=!0;const f=s.join("");H(ut,`Creating RPC '${e}' stream ${i}: ${f}`,u);const m=o.createWebChannel(f,u);this.T_(m);let g=!1,I=!1;const C=new Gb({Ho:P=>{I?H(ut,`Not sending because RPC '${e}' stream ${i} is closed:`,P):(g||(H(ut,`Opening RPC '${e}' stream ${i} transport.`),m.open(),g=!0),H(ut,`RPC '${e}' stream ${i} sending:`,P),m.send(P))},Yo:()=>m.close()}),N=(P,w,_)=>{P.listen(w,k=>{try{_(k)}catch(b){setTimeout(()=>{throw b},0)}})};return N(m,go.EventType.OPEN,()=>{I||(H(ut,`RPC '${e}' stream ${i} transport opened.`),C.s_())}),N(m,go.EventType.CLOSE,()=>{I||(I=!0,H(ut,`RPC '${e}' stream ${i} transport closed`),C.__(),this.I_(m))}),N(m,go.EventType.ERROR,P=>{I||(I=!0,$r(ut,`RPC '${e}' stream ${i} transport errored. Name:`,P.name,"Message:",P.message),C.__(new W(M.UNAVAILABLE,"The operation could not be completed")))}),N(m,go.EventType.MESSAGE,P=>{var w;if(!I){const _=P.data[0];fe(!!_,16349);const k=_,b=(k==null?void 0:k.error)||((w=k[0])===null||w===void 0?void 0:w.error);if(b){H(ut,`RPC '${e}' stream ${i} received error:`,b);const j=b.status;let L=function(E){const S=je[E];if(S!==void 0)return tT(S)}(j),T=b.message;L===void 0&&(L=M.INTERNAL,T="Unknown error status: "+j+" with message "+b.message),I=!0,C.__(new W(L,T)),m.close()}else H(ut,`RPC '${e}' stream ${i} received:`,_),C.a_(_)}}),N(l,y1.STAT_EVENT,P=>{P.stat===sf.PROXY?H(ut,`RPC '${e}' stream ${i} detected buffering proxy`):P.stat===sf.NOPROXY&&H(ut,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{C.o_()},0),C}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(n=>n===e)}}function qh(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sc(t){return new XP(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mT{constructor(e,n,r=1e3,i=1.5,s=6e4){this.Fi=e,this.timerId=n,this.d_=r,this.E_=i,this.A_=s,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const n=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),i=Math.max(0,n-r);i>0&&H("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.R_} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,i,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const c_="PersistentStream";class gT{constructor(e,n,r,i,s,o,l,u){this.Fi=e,this.w_=r,this.S_=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new mT(e,n)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,n){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():n&&n.code===M.RESOURCE_EXHAUSTED?(nr(n.toString()),nr("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):n&&n.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(n)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),n=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.b_===n&&this.W_(r,i)},r=>{e(()=>{const i=new W(M.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(i)})})}W_(e,n){const r=this.K_(this.b_);this.stream=this.z_(e,n),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(i=>{r(()=>this.G_(i))}),this.stream.onMessage(i=>{r(()=>++this.C_==1?this.j_(i):this.onNext(i))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return H(c_,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return n=>{this.Fi.enqueueAndForget(()=>this.b_===e?n():(H(c_,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Qb extends gT{constructor(e,n,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}z_(e,n){return this.connection.P_("Listen",e,n)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const n=tb(this.serializer,e),r=function(s){if(!("targetChange"in s))return Z.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?Z.min():o.readTime?An(o.readTime):Z.min()}(e);return this.listener.J_(n,r)}H_(e){const n={};n.database=mf(this.serializer),n.addTarget=function(s,o){let l;const u=o.target;if(l=cf(u)?{documents:ib(s,u)}:{query:sb(s,u).Vt},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=iT(s,o.resumeToken);const c=df(s,o.expectedCount);c!==null&&(l.expectedCount=c)}else if(o.snapshotVersion.compareTo(Z.min())>0){l.readTime=bu(s,o.snapshotVersion.toTimestamp());const c=df(s,o.expectedCount);c!==null&&(l.expectedCount=c)}return l}(this.serializer,e);const r=ab(this.serializer,e);r&&(n.labels=r),this.k_(n)}Y_(e){const n={};n.database=mf(this.serializer),n.removeTarget=e,this.k_(n)}}class Yb extends gT{constructor(e,n,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,n){return this.connection.P_("Write",e,n)}j_(e){return fe(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,fe(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){fe(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const n=rb(e.writeResults,e.commitTime),r=An(e.commitTime);return this.listener.ta(r,n)}na(){const e={};e.database=mf(this.serializer),this.k_(e)}X_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>nb(this.serializer,r))};this.k_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jb{}class Xb extends Jb{constructor(e,n,r,i){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=i,this.ra=!1}ia(){if(this.ra)throw new W(M.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,n,r,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Wo(e,ff(n,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new W(M.UNKNOWN,s.toString())})}Jo(e,n,r,i,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Jo(e,ff(n,r),i,o,l,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new W(M.UNKNOWN,o.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}class Zb{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(nr(n),this._a=!1):H("OnlineStateTracker",n)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ci="RemoteStore";class eD{constructor(e,n,r,i,s){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=s,this.Ea.xo(o=>{r.enqueueAndForget(async()=>{Fi(this)&&(H(Ci,"Restarting streams for network reachability change."),await async function(u){const c=te(u);c.Ia.add(4),await Ra(c),c.Aa.set("Unknown"),c.Ia.delete(4),await Cc(c)}(this))})}),this.Aa=new Zb(r,i)}}async function Cc(t){if(Fi(t))for(const e of t.da)await e(!0)}async function Ra(t){for(const e of t.da)await e(!1)}function yT(t,e){const n=te(t);n.Ta.has(e.targetId)||(n.Ta.set(e.targetId,e),em(n)?Zp(n):Bs(n).x_()&&Xp(n,e))}function Jp(t,e){const n=te(t),r=Bs(n);n.Ta.delete(e),r.x_()&&vT(n,e),n.Ta.size===0&&(r.x_()?r.B_():Fi(n)&&n.Aa.set("Unknown"))}function Xp(t,e){if(t.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Z.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Bs(t).H_(e)}function vT(t,e){t.Ra.$e(e),Bs(t).Y_(e)}function Zp(t){t.Ra=new KP({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>t.Ta.get(e)||null,lt:()=>t.datastore.serializer.databaseId}),Bs(t).start(),t.Aa.aa()}function em(t){return Fi(t)&&!Bs(t).M_()&&t.Ta.size>0}function Fi(t){return te(t).Ia.size===0}function _T(t){t.Ra=void 0}async function tD(t){t.Aa.set("Online")}async function nD(t){t.Ta.forEach((e,n)=>{Xp(t,e)})}async function rD(t,e){_T(t),em(t)?(t.Aa.la(e),Zp(t)):t.Aa.set("Unknown")}async function iD(t,e,n){if(t.Aa.set("Online"),e instanceof rT&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const l of s.targetIds)i.Ta.has(l)&&(await i.remoteSyncer.rejectListen(l,o),i.Ta.delete(l),i.Ra.removeTarget(l))}(t,e)}catch(r){H(Ci,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ou(t,r)}else if(e instanceof Hl?t.Ra.Ye(e):e instanceof nT?t.Ra.it(e):t.Ra.et(e),!n.isEqual(Z.min()))try{const r=await pT(t.localStore);n.compareTo(r)>=0&&await function(s,o){const l=s.Ra.Pt(o);return l.targetChanges.forEach((u,c)=>{if(u.resumeToken.approximateByteSize()>0){const f=s.Ta.get(c);f&&s.Ta.set(c,f.withResumeToken(u.resumeToken,o))}}),l.targetMismatches.forEach((u,c)=>{const f=s.Ta.get(u);if(!f)return;s.Ta.set(u,f.withResumeToken(nt.EMPTY_BYTE_STRING,f.snapshotVersion)),vT(s,u);const m=new xr(f.target,u,c,f.sequenceNumber);Xp(s,m)}),s.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(r){H(Ci,"Failed to raise snapshot:",r),await Ou(t,r)}}async function Ou(t,e,n){if(!zs(e))throw e;t.Ia.add(1),await Ra(t),t.Aa.set("Offline"),n||(n=()=>pT(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{H(Ci,"Retrying IndexedDB access"),await n(),t.Ia.delete(1),await Cc(t)})}function wT(t,e){return e().catch(n=>Ou(t,n,e))}async function Ac(t){const e=te(t),n=Kr(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:Mp;for(;sD(e);)try{const i=await Ub(e.localStore,r);if(i===null){e.Pa.length===0&&n.B_();break}r=i.batchId,oD(e,i)}catch(i){await Ou(e,i)}ET(e)&&TT(e)}function sD(t){return Fi(t)&&t.Pa.length<10}function oD(t,e){t.Pa.push(e);const n=Kr(t);n.x_()&&n.Z_&&n.X_(e.mutations)}function ET(t){return Fi(t)&&!Kr(t).M_()&&t.Pa.length>0}function TT(t){Kr(t).start()}async function aD(t){Kr(t).na()}async function lD(t){const e=Kr(t);for(const n of t.Pa)e.X_(n.mutations)}async function uD(t,e,n){const r=t.Pa.shift(),i=Wp.from(r,e,n);await wT(t,()=>t.remoteSyncer.applySuccessfulWrite(i)),await Ac(t)}async function cD(t,e){e&&Kr(t).Z_&&await async function(r,i){if(function(o){return qP(o)&&o!==M.ABORTED}(i.code)){const s=r.Pa.shift();Kr(r).N_(),await wT(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await Ac(r)}}(t,e),ET(t)&&TT(t)}async function h_(t,e){const n=te(t);n.asyncQueue.verifyOperationInProgress(),H(Ci,"RemoteStore received new credentials");const r=Fi(n);n.Ia.add(3),await Ra(n),r&&n.Aa.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Ia.delete(3),await Cc(n)}async function hD(t,e){const n=te(t);e?(n.Ia.delete(2),await Cc(n)):e||(n.Ia.add(2),await Ra(n),n.Aa.set("Unknown"))}function Bs(t){return t.Va||(t.Va=function(n,r,i){const s=te(n);return s.ia(),new Qb(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Zo:tD.bind(null,t),e_:nD.bind(null,t),n_:rD.bind(null,t),J_:iD.bind(null,t)}),t.da.push(async e=>{e?(t.Va.N_(),em(t)?Zp(t):t.Aa.set("Unknown")):(await t.Va.stop(),_T(t))})),t.Va}function Kr(t){return t.ma||(t.ma=function(n,r,i){const s=te(n);return s.ia(),new Yb(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Zo:()=>Promise.resolve(),e_:aD.bind(null,t),n_:cD.bind(null,t),ea:lD.bind(null,t),ta:uD.bind(null,t)}),t.da.push(async e=>{e?(t.ma.N_(),await Ac(t)):(await t.ma.stop(),t.Pa.length>0&&(H(Ci,`Stopping write stream with ${t.Pa.length} pending writes`),t.Pa=[]))})),t.ma}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tm{constructor(e,n,r,i,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Gn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,i,s){const o=Date.now()+r,l=new tm(e,n,o,i,s);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new W(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function nm(t,e){if(nr("AsyncQueue",`${e}: ${t}`),zs(t))return new W(M.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{static emptySet(e){return new ys(e.comparator)}constructor(e){this.comparator=e?(n,r)=>e(n,r)||Q.comparator(n.key,r.key):(n,r)=>Q.comparator(n.key,r.key),this.keyedMap=yo(),this.sortedSet=new Re(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof ys)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new ys;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d_{constructor(){this.fa=new Re(Q.comparator)}track(e){const n=e.doc.key,r=this.fa.get(n);r?e.type!==0&&r.type===3?this.fa=this.fa.insert(n,e):e.type===3&&r.type!==1?this.fa=this.fa.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.fa=this.fa.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.fa=this.fa.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.fa=this.fa.remove(n):e.type===1&&r.type===2?this.fa=this.fa.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.fa=this.fa.insert(n,{type:2,doc:e.doc}):X(63341,{At:e,ga:r}):this.fa=this.fa.insert(n,e)}pa(){const e=[];return this.fa.inorderTraversal((n,r)=>{e.push(r)}),e}}class bs{constructor(e,n,r,i,s,o,l,u,c){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=c}static fromInitialDocuments(e,n,r,i,s){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new bs(e,n,ys.emptySet(n),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ec(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let i=0;i<n.length;i++)if(n[i].type!==r[i].type||!n[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dD{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}}class fD{constructor(){this.queries=f_(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(n,r){const i=te(n),s=i.queries;i.queries=f_(),s.forEach((o,l)=>{for(const u of l.wa)u.onError(r)})})(this,new W(M.ABORTED,"Firestore shutting down"))}}function f_(){return new Li(t=>z1(t),Ec)}async function rm(t,e){const n=te(t);let r=3;const i=e.query;let s=n.queries.get(i);s?!s.Sa()&&e.ba()&&(r=2):(s=new dD,r=e.ba()?0:1);try{switch(r){case 0:s.ya=await n.onListen(i,!0);break;case 1:s.ya=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(o){const l=nm(o,`Initialization of query '${qi(e.query)}' failed`);return void e.onError(l)}n.queries.set(i,s),s.wa.push(e),e.va(n.onlineState),s.ya&&e.Ca(s.ya)&&sm(n)}async function im(t,e){const n=te(t),r=e.query;let i=3;const s=n.queries.get(r);if(s){const o=s.wa.indexOf(e);o>=0&&(s.wa.splice(o,1),s.wa.length===0?i=e.ba()?0:1:!s.Sa()&&e.ba()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function pD(t,e){const n=te(t);let r=!1;for(const i of e){const s=i.query,o=n.queries.get(s);if(o){for(const l of o.wa)l.Ca(i)&&(r=!0);o.ya=i}}r&&sm(n)}function mD(t,e,n){const r=te(t),i=r.queries.get(e);if(i)for(const s of i.wa)s.onError(n);r.queries.delete(e)}function sm(t){t.Da.forEach(e=>{e.next()})}var vf,p_;(p_=vf||(vf={})).Fa="default",p_.Cache="cache";class om{constructor(e,n,r){this.query=e,this.Ma=n,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new bs(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),n=!0):this.Ba(e,this.onlineState)&&(this.La(e),n=!0),this.Oa=e,n}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let n=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),n=!0),n}Ba(e,n){if(!e.fromCache||!this.ba())return!0;const r=n!=="Offline";return(!this.options.ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Na(e){if(e.docChanges.length>0)return!0;const n=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}La(e){e=bs.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==vf.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IT{constructor(e){this.key=e}}class xT{constructor(e){this.key=e}}class gD{constructor(e,n){this.query=e,this.Ha=n,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=oe(),this.mutatedKeys=oe(),this.Xa=B1(e),this.eu=new ys(this.Xa)}get tu(){return this.Ha}nu(e,n){const r=n?n.ru:new d_,i=n?n.eu:this.eu;let s=n?n.mutatedKeys:this.mutatedKeys,o=i,l=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,c=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,m)=>{const g=i.get(f),I=Tc(this.query,m)?m:null,C=!!g&&this.mutatedKeys.has(g.key),N=!!I&&(I.hasLocalMutations||this.mutatedKeys.has(I.key)&&I.hasCommittedMutations);let P=!1;g&&I?g.data.isEqual(I.data)?C!==N&&(r.track({type:3,doc:I}),P=!0):this.iu(g,I)||(r.track({type:2,doc:I}),P=!0,(u&&this.Xa(I,u)>0||c&&this.Xa(I,c)<0)&&(l=!0)):!g&&I?(r.track({type:0,doc:I}),P=!0):g&&!I&&(r.track({type:1,doc:g}),P=!0,(u||c)&&(l=!0)),P&&(I?(o=o.add(I),s=N?s.add(f):s.delete(f)):(o=o.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),s=s.delete(f.key),r.track({type:1,doc:f})}return{eu:o,ru:r,Ds:l,mutatedKeys:s}}iu(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,i){const s=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;const o=e.ru.pa();o.sort((f,m)=>function(I,C){const N=P=>{switch(P){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return X(20277,{At:P})}};return N(I)-N(C)}(f.type,m.type)||this.Xa(f.doc,m.doc)),this.su(r),i=i!=null&&i;const l=n&&!i?this.ou():[],u=this.Za.size===0&&this.current&&!i?1:0,c=u!==this.Ya;return this.Ya=u,o.length!==0||c?{snapshot:new bs(this.query,e.eu,s,o,e.mutatedKeys,u===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:l}:{_u:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new d_,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(n=>this.Ha=this.Ha.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ha=this.Ha.delete(n)),this.current=e.current)}ou(){if(!this.current)return[];const e=this.Za;this.Za=oe(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});const n=[];return e.forEach(r=>{this.Za.has(r)||n.push(new xT(r))}),this.Za.forEach(r=>{e.has(r)||n.push(new IT(r))}),n}uu(e){this.Ha=e.qs,this.Za=oe();const n=this.nu(e.documents);return this.applyChanges(n,!0)}cu(){return bs.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const am="SyncEngine";class yD{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class vD{constructor(e){this.key=e,this.lu=!1}}class _D{constructor(e,n,r,i,s,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.hu={},this.Pu=new Li(l=>z1(l),Ec),this.Tu=new Map,this.Iu=new Set,this.du=new Re(Q.comparator),this.Eu=new Map,this.Au=new Gp,this.Ru={},this.Vu=new Map,this.mu=Ps.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function wD(t,e,n=!0){const r=NT(t);let i;const s=r.Pu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.cu()):i=await kT(r,e,n,!0),i}async function ED(t,e){const n=NT(t);await kT(n,e,!0,!1)}async function kT(t,e,n,r){const i=await zb(t.localStore,Cn(e)),s=i.targetId,o=t.sharedClientState.addLocalQueryTarget(s,n);let l;return r&&(l=await TD(t,e,s,o==="current",i.resumeToken)),t.isPrimaryClient&&n&&yT(t.remoteStore,i),l}async function TD(t,e,n,r,i){t.gu=(m,g,I)=>async function(N,P,w,_){let k=P.view.nu(w);k.Ds&&(k=await o_(N.localStore,P.query,!1).then(({documents:T})=>P.view.nu(T,k)));const b=_&&_.targetChanges.get(P.targetId),j=_&&_.targetMismatches.get(P.targetId)!=null,L=P.view.applyChanges(k,N.isPrimaryClient,b,j);return g_(N,P.targetId,L._u),L.snapshot}(t,m,g,I);const s=await o_(t.localStore,e,!0),o=new gD(e,s.qs),l=o.nu(s.documents),u=Aa.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",i),c=o.applyChanges(l,t.isPrimaryClient,u);g_(t,n,c._u);const f=new yD(e,n,o);return t.Pu.set(e,f),t.Tu.has(n)?t.Tu.get(n).push(e):t.Tu.set(n,[e]),c.snapshot}async function ID(t,e,n){const r=te(t),i=r.Pu.get(e),s=r.Tu.get(i.targetId);if(s.length>1)return r.Tu.set(i.targetId,s.filter(o=>!Ec(o,e))),void r.Pu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await gf(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),n&&Jp(r.remoteStore,i.targetId),_f(r,i.targetId)}).catch(Us)):(_f(r,i.targetId),await gf(r.localStore,i.targetId,!0))}async function xD(t,e){const n=te(t),r=n.Pu.get(e),i=n.Tu.get(r.targetId);n.isPrimaryClient&&i.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Jp(n.remoteStore,r.targetId))}async function kD(t,e,n){const r=bD(t);try{const i=await function(o,l){const u=te(o),c=Ee.now(),f=l.reduce((I,C)=>I.add(C.key),oe());let m,g;return u.persistence.runTransaction("Locally write mutations","readwrite",I=>{let C=rr(),N=oe();return u.Os.getEntries(I,f).next(P=>{C=P,C.forEach((w,_)=>{_.isValidDocument()||(N=N.add(w))})}).next(()=>u.localDocuments.getOverlayedDocuments(I,C)).next(P=>{m=P;const w=[];for(const _ of l){const k=zP(_,m.get(_.key).overlayedDocument);k!=null&&w.push(new ri(_.key,k,D1(k.value.mapValue),Dt.exists(!0)))}return u.mutationQueue.addMutationBatch(I,c,w,l)}).next(P=>{g=P;const w=P.applyToLocalDocumentSet(m,N);return u.documentOverlayCache.saveOverlays(I,P.batchId,w)})}).then(()=>({batchId:g.batchId,changes:W1(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,l,u){let c=o.Ru[o.currentUser.toKey()];c||(c=new Re(ne)),c=c.insert(l,u),o.Ru[o.currentUser.toKey()]=c}(r,i.batchId,n),await Na(r,i.changes),await Ac(r.remoteStore)}catch(i){const s=nm(i,"Failed to persist write");n.reject(s)}}async function ST(t,e){const n=te(t);try{const r=await Lb(n.localStore,e);e.targetChanges.forEach((i,s)=>{const o=n.Eu.get(s);o&&(fe(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?o.lu=!0:i.modifiedDocuments.size>0?fe(o.lu,14607):i.removedDocuments.size>0&&(fe(o.lu,42227),o.lu=!1))}),await Na(n,r,e)}catch(r){await Us(r)}}function m_(t,e,n){const r=te(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const i=[];r.Pu.forEach((s,o)=>{const l=o.view.va(e);l.snapshot&&i.push(l.snapshot)}),function(o,l){const u=te(o);u.onlineState=l;let c=!1;u.queries.forEach((f,m)=>{for(const g of m.wa)g.va(l)&&(c=!0)}),c&&sm(u)}(r.eventManager,e),i.length&&r.hu.J_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function SD(t,e,n){const r=te(t);r.sharedClientState.updateQueryState(e,"rejected",n);const i=r.Eu.get(e),s=i&&i.key;if(s){let o=new Re(Q.comparator);o=o.insert(s,dt.newNoDocument(s,Z.min()));const l=oe().add(s),u=new kc(Z.min(),new Map,new Re(ne),o,l);await ST(r,u),r.du=r.du.remove(s),r.Eu.delete(e),lm(r)}else await gf(r.localStore,e,!1).then(()=>_f(r,e,n)).catch(Us)}async function CD(t,e){const n=te(t),r=e.batch.batchId;try{const i=await Mb(n.localStore,e);AT(n,r,null),CT(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Na(n,i)}catch(i){await Us(i)}}async function AD(t,e,n){const r=te(t);try{const i=await function(o,l){const u=te(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let f;return u.mutationQueue.lookupMutationBatch(c,l).next(m=>(fe(m!==null,37113),f=m.keys(),u.mutationQueue.removeMutationBatch(c,m))).next(()=>u.mutationQueue.performConsistencyCheck(c)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(c,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,f)).next(()=>u.localDocuments.getDocuments(c,f))})}(r.localStore,e);AT(r,e,n),CT(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Na(r,i)}catch(i){await Us(i)}}function CT(t,e){(t.Vu.get(e)||[]).forEach(n=>{n.resolve()}),t.Vu.delete(e)}function AT(t,e,n){const r=te(t);let i=r.Ru[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(n?s.reject(n):s.resolve(),i=i.remove(e)),r.Ru[r.currentUser.toKey()]=i}}function _f(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Tu.get(e))t.Pu.delete(r),n&&t.hu.pu(r,n);t.Tu.delete(e),t.isPrimaryClient&&t.Au.zr(e).forEach(r=>{t.Au.containsKey(r)||RT(t,r)})}function RT(t,e){t.Iu.delete(e.path.canonicalString());const n=t.du.get(e);n!==null&&(Jp(t.remoteStore,n),t.du=t.du.remove(e),t.Eu.delete(n),lm(t))}function g_(t,e,n){for(const r of n)r instanceof IT?(t.Au.addReference(r.key,e),RD(t,r)):r instanceof xT?(H(am,"Document no longer in limbo: "+r.key),t.Au.removeReference(r.key,e),t.Au.containsKey(r.key)||RT(t,r.key)):X(19791,{yu:r})}function RD(t,e){const n=e.key,r=n.path.canonicalString();t.du.get(n)||t.Iu.has(r)||(H(am,"New document in limbo: "+n),t.Iu.add(r),lm(t))}function lm(t){for(;t.Iu.size>0&&t.du.size<t.maxConcurrentLimboResolutions;){const e=t.Iu.values().next().value;t.Iu.delete(e);const n=new Q(ye.fromString(e)),r=t.mu.next();t.Eu.set(r,new vD(n)),t.du=t.du.insert(n,r),yT(t.remoteStore,new xr(Cn(wc(n.path)),r,"TargetPurposeLimboResolution",yc.ue))}}async function Na(t,e,n){const r=te(t),i=[],s=[],o=[];r.Pu.isEmpty()||(r.Pu.forEach((l,u)=>{o.push(r.gu(u,e,n).then(c=>{var f;if((c||n)&&r.isPrimaryClient){const m=c?!c.fromCache:(f=n==null?void 0:n.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(c){i.push(c);const m=Qp.Es(u.targetId,c);s.push(m)}}))}),await Promise.all(o),r.hu.J_(i),await async function(u,c){const f=te(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>F.forEach(c,g=>F.forEach(g.Is,I=>f.persistence.referenceDelegate.addReference(m,g.targetId,I)).next(()=>F.forEach(g.ds,I=>f.persistence.referenceDelegate.removeReference(m,g.targetId,I)))))}catch(m){if(!zs(m))throw m;H(Yp,"Failed to update sequence numbers: "+m)}for(const m of c){const g=m.targetId;if(!m.fromCache){const I=f.Fs.get(g),C=I.snapshotVersion,N=I.withLastLimboFreeSnapshotVersion(C);f.Fs=f.Fs.insert(g,N)}}}(r.localStore,s))}async function ND(t,e){const n=te(t);if(!n.currentUser.isEqual(e)){H(am,"User change. New user:",e.toKey());const r=await fT(n.localStore,e);n.currentUser=e,function(s,o){s.Vu.forEach(l=>{l.forEach(u=>{u.reject(new W(M.CANCELLED,o))})}),s.Vu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Na(n,r.Bs)}}function PD(t,e){const n=te(t),r=n.Eu.get(e);if(r&&r.lu)return oe().add(r.key);{let i=oe();const s=n.Tu.get(e);if(!s)return i;for(const o of s){const l=n.Pu.get(o);i=i.unionWith(l.view.tu)}return i}}function NT(t){const e=te(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=ST.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=PD.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=SD.bind(null,e),e.hu.J_=pD.bind(null,e.eventManager),e.hu.pu=mD.bind(null,e.eventManager),e}function bD(t){const e=te(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=CD.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=AD.bind(null,e),e}class Vu{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Sc(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,n){return null}Fu(e,n){return null}vu(e){return jb(this.persistence,new Db,e.initialUser,this.serializer)}Du(e){return new dT(Kp.Vi,this.serializer)}bu(e){return new $b}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Vu.provider={build:()=>new Vu};class DD extends Vu{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,n){fe(this.persistence.referenceDelegate instanceof Du,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new vb(r,e.asyncQueue,n)}Du(e){const n=this.cacheSizeBytes!==void 0?kt.withCacheSize(this.cacheSizeBytes):kt.DEFAULT;return new dT(r=>Du.Vi(r,n),this.serializer)}}class wf{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>m_(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=ND.bind(null,this.syncEngine),await hD(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new fD}()}createDatastore(e){const n=Sc(e.databaseInfo.databaseId),r=function(s){return new Kb(s)}(e.databaseInfo);return function(s,o,l,u){return new Xb(s,o,l,u)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,i,s,o,l){return new eD(r,i,s,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>m_(this.syncEngine,n,0),function(){return u_.C()?new u_:new Wb}())}createSyncEngine(e,n){return function(i,s,o,l,u,c,f){const m=new _D(i,s,o,l,u,c);return f&&(m.fu=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(i){const s=te(i);H(Ci,"RemoteStore shutting down."),s.Ia.add(5),await Ra(s),s.Ea.shutdown(),s.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}wf.provider={build:()=>new wf};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class um{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):nr("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qr="FirestoreClient";class OD{constructor(e,n,r,i,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=i,this.user=ct.UNAUTHENTICATED,this.clientId=Vp.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{H(Qr,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(H(Qr,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Gn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=nm(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Gh(t,e){t.asyncQueue.verifyOperationInProgress(),H(Qr,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async i=>{r.isEqual(i)||(await fT(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>{$r("Terminating Firestore due to IndexedDb database deletion"),t.terminate().then(()=>{H("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(i=>{$r("Terminating Firestore due to IndexedDb database deletion failed",i)})}),t._offlineComponents=e}async function y_(t,e){t.asyncQueue.verifyOperationInProgress();const n=await VD(t);H(Qr,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>h_(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,i)=>h_(e.remoteStore,i)),t._onlineComponents=e}async function VD(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){H(Qr,"Using user provided OfflineComponentProvider");try{await Gh(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(i){return i.name==="FirebaseError"?i.code===M.FAILED_PRECONDITION||i.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(n))throw n;$r("Error using user provided cache. Falling back to memory cache: "+n),await Gh(t,new Vu)}}else H(Qr,"Using default OfflineComponentProvider"),await Gh(t,new DD(void 0));return t._offlineComponents}async function PT(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(H(Qr,"Using user provided OnlineComponentProvider"),await y_(t,t._uninitializedComponentsProvider._online)):(H(Qr,"Using default OnlineComponentProvider"),await y_(t,new wf))),t._onlineComponents}function jD(t){return PT(t).then(e=>e.syncEngine)}async function ju(t){const e=await PT(t),n=e.eventManager;return n.onListen=wD.bind(null,e.syncEngine),n.onUnlisten=ID.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=ED.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=xD.bind(null,e.syncEngine),n}function MD(t,e,n={}){const r=new Gn;return t.asyncQueue.enqueueAndForget(async()=>function(s,o,l,u,c){const f=new um({next:g=>{f.Ou(),o.enqueueAndForget(()=>im(s,m));const I=g.docs.has(l);!I&&g.fromCache?c.reject(new W(M.UNAVAILABLE,"Failed to get document because the client is offline.")):I&&g.fromCache&&u&&u.source==="server"?c.reject(new W(M.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(g)},error:g=>c.reject(g)}),m=new om(wc(l.path),f,{includeMetadataChanges:!0,ka:!0});return rm(s,m)}(await ju(t),t.asyncQueue,e,n,r)),r.promise}function LD(t,e,n={}){const r=new Gn;return t.asyncQueue.enqueueAndForget(async()=>function(s,o,l,u,c){const f=new um({next:g=>{f.Ou(),o.enqueueAndForget(()=>im(s,m)),g.fromCache&&u.source==="server"?c.reject(new W(M.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(g)},error:g=>c.reject(g)}),m=new om(l,f,{includeMetadataChanges:!0,ka:!0});return rm(s,m)}(await ju(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bT(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const v_=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DT="firestore.googleapis.com",__=!0;class w_{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new W(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=DT,this.ssl=__}else this.host=e.host,this.ssl=(n=e.ssl)!==null&&n!==void 0?n:__;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=hT;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<gb)throw new W(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}nP("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=bT((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new W(M.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new W(M.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new W(M.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Pa{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new w_({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new W(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new W(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new w_(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new GN;switch(r.type){case"firstParty":return new JN(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new W(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=v_.get(n);r&&(H("ComponentProvider","Removing Datastore"),v_.delete(n),r.terminate())}(this),Promise.resolve()}}function FD(t,e,n,r={}){var i;t=wt(t,Pa);const s=Oi(e),o=t._getSettings(),l=Object.assign(Object.assign({},o),{emulatorOptions:t._getEmulatorOptions()}),u=`${e}:${n}`;s&&(Ep(`https://${u}`),Tp("Firestore",!0)),o.host!==DT&&o.host!==u&&$r("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c=Object.assign(Object.assign({},o),{host:u,ssl:s,emulatorOptions:r});if(!Br(c,l)&&(t._setSettings(c),r.mockUserToken)){let f,m;if(typeof r.mockUserToken=="string")f=r.mockUserToken,m=ct.MOCK_USER;else{f=IE(r.mockUserToken,(i=t._app)===null||i===void 0?void 0:i.options.projectId);const g=r.mockUserToken.sub||r.mockUserToken.user_id;if(!g)throw new W(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new ct(g)}t._authCredentials=new KN(new E1(f,m))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Vn(this.firestore,e,this._query)}}class be{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Lr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new be(this.firestore,e,this._key)}toJSON(){return{type:be._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,r){if(Sa(n,be._jsonSchema))return new be(e,r||null,new Q(ye.fromString(n.referencePath)))}}be._jsonSchemaVersion="firestore/documentReference/1.0",be._jsonSchema={type:Ue("string",be._jsonSchemaVersion),referencePath:Ue("string")};class Lr extends Vn{constructor(e,n,r){super(e,n,wc(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new be(this.firestore,null,new Q(e))}withConverter(e){return new Lr(this.firestore,e,this._path)}}function Bt(t,e,...n){if(t=xe(t),jp("collection","path",e),t instanceof Pa){const r=ye.fromString(e,...n);return Dv(r),new Lr(t,null,r)}{if(!(t instanceof be||t instanceof Lr))throw new W(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(ye.fromString(e,...n));return Dv(r),new Lr(t.firestore,null,r)}}function OT(t,e){if(t=wt(t,Pa),jp("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new W(M.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Vn(t,null,function(r){return new Mi(ye.emptyPath(),r)}(e))}function me(t,e,...n){if(t=xe(t),arguments.length===1&&(e=Vp.newId()),jp("doc","path",e),t instanceof Pa){const r=ye.fromString(e,...n);return bv(r),new be(t,null,new Q(r))}{if(!(t instanceof be||t instanceof Lr))throw new W(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(ye.fromString(e,...n));return bv(r),new be(t.firestore,t instanceof Lr?t.converter:null,new Q(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E_="AsyncQueue";class T_{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new mT(this,"async_queue_retry"),this.oc=()=>{const r=qh();r&&H(E_,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;const n=qh();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const n=qh();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});const n=new Gn;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!zs(e))throw e;H(E_,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){const n=this._c.then(()=>(this.nc=!0,e().catch(r=>{throw this.tc=r,this.nc=!1,nr("INTERNAL UNHANDLED ERROR: ",I_(r)),r}).then(r=>(this.nc=!1,r))));return this._c=n,n}enqueueAfterDelay(e,n,r){this.ac(),this.sc.indexOf(e)>-1&&(n=0);const i=tm.createAndSchedule(this,e,n,r,s=>this.lc(s));return this.ec.push(i),i}ac(){this.tc&&X(47125,{hc:I_(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const n of this.ec)if(n.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.ec)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){const n=this.ec.indexOf(e);this.ec.splice(n,1)}}function I_(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x_(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const i=n;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(t,["next","error","complete"])}class ir extends Pa{constructor(e,n,r,i){super(e,n,r,i),this.type="firestore",this._queue=new T_,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new T_(e),this._firestoreClient=void 0,await e}}}function UD(t,e){const n=typeof t=="object"?t:dc(),r=typeof t=="string"?t:Au,i=ei(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=wE("firestore");s&&FD(i,...s)}return i}function ba(t){if(t._terminated)throw new W(M.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||zD(t),t._firestoreClient}function zD(t){var e,n,r;const i=t._freezeSettings(),s=function(l,u,c,f){return new fP(l,u,c,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,bT(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,i);t._componentsProvider||!((n=i.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),t._firestoreClient=new OD(t._authCredentials,t._appCheckCredentials,t._queue,s,t._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Yt(nt.fromBase64String(e))}catch(n){throw new W(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Yt(nt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Yt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Sa(e,Yt._jsonSchema))return Yt.fromBase64String(e.bytes)}}Yt._jsonSchemaVersion="firestore/bytes/1.0",Yt._jsonSchema={type:Ue("string",Yt._jsonSchemaVersion),bytes:Ue("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new W(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Xe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new W(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new W(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ne(this._lat,e._lat)||ne(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Rn._jsonSchemaVersion}}static fromJSON(e){if(Sa(e,Rn._jsonSchema))return new Rn(e.latitude,e.longitude)}}Rn._jsonSchemaVersion="firestore/geoPoint/1.0",Rn._jsonSchema={type:Ue("string",Rn._jsonSchemaVersion),latitude:Ue("number"),longitude:Ue("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Nn._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Sa(e,Nn._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new Nn(e.vectorValues);throw new W(M.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Nn._jsonSchemaVersion="firestore/vectorValue/1.0",Nn._jsonSchema={type:Ue("string",Nn._jsonSchemaVersion),vectorValues:Ue("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BD=/^__.*__$/;class $D{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new ri(e,this.data,this.fieldMask,n,this.fieldTransforms):new Ca(e,this.data,n,this.fieldTransforms)}}class VT{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new ri(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function jT(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw X(40011,{Ec:t})}}class cm{constructor(e,n,r,i,s,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.Ac(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new cm(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Rc({path:r,mc:!1});return i.fc(e),i}gc(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Rc({path:r,mc:!1});return i.Ac(),i}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return Mu(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(jT(this.Ec)&&BD.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class WD{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||Sc(e)}Dc(e,n,r,i=!1){return new cm({Ec:e,methodName:n,bc:r,path:Xe.emptyPath(),mc:!1,Sc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Va(t){const e=t._freezeSettings(),n=Sc(t._databaseId);return new WD(t._databaseId,!!e.ignoreUndefinedProperties,n)}function hm(t,e,n,r,i,s={}){const o=t.Dc(s.merge||s.mergeFields?2:0,e,n,i);pm("Data must be an object, but it was:",o,r);const l=FT(r,o);let u,c;if(s.merge)u=new Ft(o.fieldMask),c=o.fieldTransforms;else if(s.mergeFields){const f=[];for(const m of s.mergeFields){const g=Ef(e,m,n);if(!o.contains(g))throw new W(M.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);zT(f,g)||f.push(g)}u=new Ft(f),c=o.fieldTransforms.filter(m=>u.covers(m.field))}else u=null,c=o.fieldTransforms;return new $D(new Ct(l),u,c)}class Rc extends Oa{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Rc}}class dm extends Oa{_toFieldTransform(e){return new X1(e.path,new ha)}isEqual(e){return e instanceof dm}}class fm extends Oa{constructor(e,n){super(e),this.Cc=n}_toFieldTransform(e){const n=new pa(e.serializer,G1(e.serializer,this.Cc));return new X1(e.path,n)}isEqual(e){return e instanceof fm&&this.Cc===e.Cc}}function MT(t,e,n,r){const i=t.Dc(1,e,n);pm("Data must be an object, but it was:",i,r);const s=[],o=Ct.empty();ni(r,(u,c)=>{const f=mm(e,u,n);c=xe(c);const m=i.gc(f);if(c instanceof Rc)s.push(f);else{const g=ja(c,m);g!=null&&(s.push(f),o.set(f,g))}});const l=new Ft(s);return new VT(o,l,i.fieldTransforms)}function LT(t,e,n,r,i,s){const o=t.Dc(1,e,n),l=[Ef(e,r,n)],u=[i];if(s.length%2!=0)throw new W(M.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<s.length;g+=2)l.push(Ef(e,s[g])),u.push(s[g+1]);const c=[],f=Ct.empty();for(let g=l.length-1;g>=0;--g)if(!zT(c,l[g])){const I=l[g];let C=u[g];C=xe(C);const N=o.gc(I);if(C instanceof Rc)c.push(I);else{const P=ja(C,N);P!=null&&(c.push(I),f.set(I,P))}}const m=new Ft(c);return new VT(f,m,o.fieldTransforms)}function HD(t,e,n,r=!1){return ja(n,t.Dc(r?4:3,e))}function ja(t,e){if(UT(t=xe(t)))return pm("Unsupported field value:",e,t),FT(t,e);if(t instanceof Oa)return function(r,i){if(!jT(i.Ec))throw i.wc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.wc(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const l of r){let u=ja(l,i.yc(o));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),o++}return{arrayValue:{values:s}}}(t,e)}return function(r,i){if((r=xe(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return G1(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=Ee.fromDate(r);return{timestampValue:bu(i.serializer,s)}}if(r instanceof Ee){const s=new Ee(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:bu(i.serializer,s)}}if(r instanceof Rn)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Yt)return{bytesValue:iT(i.serializer,r._byteString)};if(r instanceof be){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.wc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:qp(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Nn)return function(o,l){return{mapValue:{fields:{[P1]:{stringValue:b1},[Ru]:{arrayValue:{values:o.toArray().map(c=>{if(typeof c!="number")throw l.wc("VectorValues must only contain numeric values.");return Bp(l.serializer,c)})}}}}}}(r,i);throw i.wc(`Unsupported field value: ${gc(r)}`)}(t,e)}function FT(t,e){const n={};return k1(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):ni(t,(r,i)=>{const s=ja(i,e.Vc(r));s!=null&&(n[r]=s)}),{mapValue:{fields:n}}}function UT(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Ee||t instanceof Rn||t instanceof Yt||t instanceof be||t instanceof Oa||t instanceof Nn)}function pm(t,e,n){if(!UT(n)||!I1(n)){const r=gc(n);throw r==="an object"?e.wc(t+" a custom object"):e.wc(t+" "+r)}}function Ef(t,e,n){if((e=xe(e))instanceof Da)return e._internalPath;if(typeof e=="string")return mm(t,e);throw Mu("Field path arguments must be of type string or ",t,!1,void 0,n)}const qD=new RegExp("[~\\*/\\[\\]]");function mm(t,e,n){if(e.search(qD)>=0)throw Mu(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Da(...e.split("."))._internalPath}catch{throw Mu(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Mu(t,e,n,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(s||o)&&(u+=" (found",s&&(u+=` in field ${r}`),o&&(u+=` in document ${i}`),u+=")"),new W(M.INVALID_ARGUMENT,l+t+u)}function zT(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BT{constructor(e,n,r,i,s){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new be(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new GD(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Nc("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class GD extends BT{data(){return super.data()}}function Nc(t,e){return typeof e=="string"?mm(t,e):e instanceof Da?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $T(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new W(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class gm{}class ym extends gm{}function Fr(t,e,...n){let r=[];e instanceof gm&&r.push(e),r=r.concat(n),function(s){const o=s.filter(u=>u instanceof vm).length,l=s.filter(u=>u instanceof Pc).length;if(o>1||o>0&&l>0)throw new W(M.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)t=i._apply(t);return t}class Pc extends ym{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new Pc(e,n,r)}_apply(e){const n=this._parse(e);return HT(e._query,n),new Vn(e.firestore,e.converter,hf(e._query,n))}_parse(e){const n=Va(e.firestore);return function(s,o,l,u,c,f,m){let g;if(c.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new W(M.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){S_(m,f);const C=[];for(const N of m)C.push(k_(u,s,N));g={arrayValue:{values:C}}}else g=k_(u,s,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||S_(m,f),g=HD(l,o,m,f==="in"||f==="not-in");return Fe.create(c,f,g)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function dn(t,e,n){const r=e,i=Nc("where",t);return Pc._create(i,r,n)}class vm extends gm{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new vm(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:_n.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(i,s){let o=i;const l=s.getFlattenedFilters();for(const u of l)HT(o,u),o=hf(o,u)}(e._query,n),new Vn(e.firestore,e.converter,hf(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class _m extends ym{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new _m(e,n)}_apply(e){const n=function(i,s,o){if(i.startAt!==null)throw new W(M.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new W(M.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new ca(s,o)}(e._query,this._field,this._direction);return new Vn(e.firestore,e.converter,function(i,s){const o=i.explicitOrderBy.concat([s]);return new Mi(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,n))}}function WT(t,e="asc"){const n=e,r=Nc("orderBy",t);return _m._create(r,n)}class wm extends ym{constructor(e,n,r){super(),this.type=e,this._limit=n,this._limitType=r}static _create(e,n,r){return new wm(e,n,r)}_apply(e){return new Vn(e.firestore,e.converter,Pu(e._query,this._limit,this._limitType))}}function KD(t){return wm._create("limit",t,"F")}function k_(t,e,n){if(typeof(n=xe(n))=="string"){if(n==="")throw new W(M.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!U1(e)&&n.indexOf("/")!==-1)throw new W(M.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(ye.fromString(n));if(!Q.isDocumentKey(r))throw new W(M.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return zv(t,new Q(r))}if(n instanceof be)return zv(t,n._key);throw new W(M.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${gc(n)}.`)}function S_(t,e){if(!Array.isArray(t)||t.length===0)throw new W(M.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function HT(t,e){const n=function(i,s){for(const o of i)for(const l of o.getFlattenedFilters())if(s.indexOf(l.op)>=0)return l.op;return null}(t.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new W(M.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new W(M.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class QD{convertValue(e,n="none"){switch(Gr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return De(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(qr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw X(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return ni(e,(i,s)=>{r[i]=this.convertValue(s,n)}),r}convertVectorValue(e){var n,r,i;const s=(i=(r=(n=e.fields)===null||n===void 0?void 0:n[Ru].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(o=>De(o.doubleValue));return new Nn(s)}convertGeoPoint(e){return new Rn(De(e.latitude),De(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=_c(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(aa(e));default:return null}}convertTimestamp(e){const n=Hr(e);return new Ee(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=ye.fromString(e);fe(cT(r),9688,{name:e});const i=new la(r.get(1),r.get(3)),s=new Q(r.popFirst(5));return i.isEqual(n)||nr(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Em(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}class _o{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class vi extends BT{constructor(e,n,r,i,s,o){super(e,n,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new ql(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Nc("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new W(M.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=vi._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}vi._jsonSchemaVersion="firestore/documentSnapshot/1.0",vi._jsonSchema={type:Ue("string",vi._jsonSchemaVersion),bundleSource:Ue("string","DocumentSnapshot"),bundleName:Ue("string"),bundle:Ue("string")};class ql extends vi{data(e={}){return super.data(e)}}class _i{constructor(e,n,r,i){this._firestore=e,this._userDataWriter=n,this._snapshot=i,this.metadata=new _o(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new ql(this._firestore,this._userDataWriter,r.key,r,new _o(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new W(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(l=>{const u=new ql(i._firestore,i._userDataWriter,l.doc.key,l.doc,new _o(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(l=>s||l.type!==3).map(l=>{const u=new ql(i._firestore,i._userDataWriter,l.doc.key,l.doc,new _o(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);let c=-1,f=-1;return l.type!==0&&(c=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),f=o.indexOf(l.doc.key)),{type:YD(l.type),doc:u,oldIndex:c,newIndex:f}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new W(M.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=_i._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Vp.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],r=[],i=[];return this.docs.forEach(s=>{s._document!==null&&(n.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function YD(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return X(61501,{type:t})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ze(t){t=wt(t,be);const e=wt(t.firestore,ir);return MD(ba(e),t._key).then(n=>GT(e,t,n))}_i._jsonSchemaVersion="firestore/querySnapshot/1.0",_i._jsonSchema={type:Ue("string",_i._jsonSchemaVersion),bundleSource:Ue("string","QuerySnapshot"),bundleName:Ue("string"),bundle:Ue("string")};class Tm extends QD{constructor(e){super(),this.firestore=e}convertBytes(e){return new Yt(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new be(this.firestore,null,n)}}function Zt(t){t=wt(t,Vn);const e=wt(t.firestore,ir),n=ba(e),r=new Tm(e);return $T(t._query),LD(n,t._query).then(i=>new _i(e,r,t,i))}function Ai(t,e,n){t=wt(t,be);const r=wt(t.firestore,ir),i=Em(t.converter,e,n);return Dc(r,[hm(Va(r),"setDoc",t._key,i,t.converter!==null,n).toMutation(t._key,Dt.none())])}function bc(t,e,n,...r){t=wt(t,be);const i=wt(t.firestore,ir),s=Va(i);let o;return o=typeof(e=xe(e))=="string"||e instanceof Da?LT(s,"updateDoc",t._key,e,n,r):MT(s,"updateDoc",t._key,e),Dc(i,[o.toMutation(t._key,Dt.exists(!0))])}function qT(t,e){const n=wt(t.firestore,ir),r=me(t),i=Em(t.converter,e);return Dc(n,[hm(Va(t.firestore),"addDoc",r._key,i,t.converter!==null,{}).toMutation(r._key,Dt.exists(!1))]).then(()=>r)}function JD(t,...e){var n,r,i;t=xe(t);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||x_(e[o])||(s=e[o++]);const l={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(x_(e[o])){const m=e[o];e[o]=(n=m.next)===null||n===void 0?void 0:n.bind(m),e[o+1]=(r=m.error)===null||r===void 0?void 0:r.bind(m),e[o+2]=(i=m.complete)===null||i===void 0?void 0:i.bind(m)}let u,c,f;if(t instanceof be)c=wt(t.firestore,ir),f=wc(t._key.path),u={next:m=>{e[o]&&e[o](GT(c,t,m))},error:e[o+1],complete:e[o+2]};else{const m=wt(t,Vn);c=wt(m.firestore,ir),f=m._query;const g=new Tm(c);u={next:I=>{e[o]&&e[o](new _i(c,g,m,I))},error:e[o+1],complete:e[o+2]},$T(t._query)}return function(g,I,C,N){const P=new um(N),w=new om(I,P,C);return g.asyncQueue.enqueueAndForget(async()=>rm(await ju(g),w)),()=>{P.Ou(),g.asyncQueue.enqueueAndForget(async()=>im(await ju(g),w))}}(ba(c),f,l,u)}function Dc(t,e){return function(r,i){const s=new Gn;return r.asyncQueue.enqueueAndForget(async()=>kD(await jD(r),i,s)),s.promise}(ba(t),e)}function GT(t,e,n){const r=n.docs.get(e._key),i=new Tm(t);return new vi(t,i,e._key,r,new _o(n.hasPendingWrites,n.fromCache),e.converter)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XD{constructor(e,n){this._firestore=e,this._commitHandler=n,this._mutations=[],this._committed=!1,this._dataReader=Va(e)}set(e,n,r){this._verifyNotCommitted();const i=Kh(e,this._firestore),s=Em(i.converter,n,r),o=hm(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(o.toMutation(i._key,Dt.none())),this}update(e,n,r,...i){this._verifyNotCommitted();const s=Kh(e,this._firestore);let o;return o=typeof(n=xe(n))=="string"||n instanceof Da?LT(this._dataReader,"WriteBatch.update",s._key,n,r,i):MT(this._dataReader,"WriteBatch.update",s._key,n),this._mutations.push(o.toMutation(s._key,Dt.exists(!0))),this}delete(e){this._verifyNotCommitted();const n=Kh(e,this._firestore);return this._mutations=this._mutations.concat(new $p(n._key,Dt.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new W(M.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Kh(t,e){if((t=xe(t)).firestore!==e)throw new W(M.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return t}function Kn(){return new dm("serverTimestamp")}function ZD(t){return new fm("increment",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KT(t){return ba(t=wt(t,ir)),new XD(t,e=>Dc(t,e))}(function(e,n=!0){(function(i){Fs=i})(ji),vn(new nn("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),l=new ir(new QN(r.getProvider("auth-internal")),new XN(o,r.getProvider("app-check-internal")),function(c,f){if(!Object.prototype.hasOwnProperty.apply(c.options,["projectId"]))throw new W(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new la(c.options.projectId,f)}(o,i),o);return s=Object.assign({useFetchStreams:n},s),l._setSettings(s),l},"PUBLIC").setMultipleInstances(!0)),bt(Cv,Av,e),bt(Cv,Av,"esm2017")})();var e4="firebase",t4="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */bt(e4,t4,"app");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QT="firebasestorage.googleapis.com",n4="storageBucket",r4=2*60*1e3,i4=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jn extends rn{constructor(e,n,r=0){super(Qh(e),`Firebase Storage: ${n} (${Qh(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,jn.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Qh(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var bn;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(bn||(bn={}));function Qh(t){return"storage/"+t}function s4(){const t="An unknown error occurred, please check the error payload for server response.";return new jn(bn.UNKNOWN,t)}function o4(){return new jn(bn.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function a4(){return new jn(bn.CANCELED,"User canceled the upload/download.")}function l4(t){return new jn(bn.INVALID_URL,"Invalid URL '"+t+"'.")}function u4(t){return new jn(bn.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function C_(t){return new jn(bn.INVALID_ARGUMENT,t)}function YT(){return new jn(bn.APP_DELETED,"The Firebase app was deleted.")}function c4(t){return new jn(bn.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let r;try{r=pn.makeFromUrl(e,n)}catch{return new pn(e,"")}if(r.path==="")return r;throw u4(e)}static makeFromUrl(e,n){let r=null;const i="([A-Za-z0-9.\\-_]+)";function s(b){b.path.charAt(b.path.length-1)==="/"&&(b.path_=b.path_.slice(0,-1))}const o="(/(.*))?$",l=new RegExp("^gs://"+i+o,"i"),u={bucket:1,path:3};function c(b){b.path_=decodeURIComponent(b.path)}const f="v[A-Za-z0-9_]+",m=n.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",I=new RegExp(`^https?://${m}/${f}/b/${i}/o${g}`,"i"),C={bucket:1,path:3},N=n===QT?"(?:storage.googleapis.com|storage.cloud.google.com)":n,P="([^?#]*)",w=new RegExp(`^https?://${N}/${i}/${P}`,"i"),k=[{regex:l,indices:u,postModify:s},{regex:I,indices:C,postModify:c},{regex:w,indices:{bucket:1,path:2},postModify:c}];for(let b=0;b<k.length;b++){const j=k[b],L=j.regex.exec(e);if(L){const T=L[j.indices.bucket];let v=L[j.indices.path];v||(v=""),r=new pn(T,v),j.postModify(r);break}}if(r==null)throw l4(e);return r}}class h4{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d4(t,e,n){let r=1,i=null,s=null,o=!1,l=0;function u(){return l===2}let c=!1;function f(...P){c||(c=!0,e.apply(null,P))}function m(P){i=setTimeout(()=>{i=null,t(I,u())},P)}function g(){s&&clearTimeout(s)}function I(P,...w){if(c){g();return}if(P){g(),f.call(null,P,...w);return}if(u()||o){g(),f.call(null,P,...w);return}r<64&&(r*=2);let k;l===1?(l=2,k=0):k=(r+Math.random())*1e3,m(k)}let C=!1;function N(P){C||(C=!0,g(),!c&&(i!==null?(P||(l=2),clearTimeout(i),m(0)):P||(l=1)))}return m(0),s=setTimeout(()=>{o=!0,N(!0)},n),N}function f4(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function p4(t){return t!==void 0}function A_(t,e,n,r){if(r<e)throw C_(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw C_(`Invalid value for '${t}'. Expected ${n} or less.`)}function m4(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){const i=e(r)+"="+e(t[r]);n=n+i+"&"}return n=n.slice(0,-1),n}var Lu;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(Lu||(Lu={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g4(t,e){const n=t>=500&&t<600,i=[408,429].indexOf(t)!==-1,s=e.indexOf(t)!==-1;return n||i||s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y4{constructor(e,n,r,i,s,o,l,u,c,f,m,g=!0,I=!1){this.url_=e,this.method_=n,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=l,this.errorCallback_=u,this.timeout_=c,this.progressCallback_=f,this.connectionFactory_=m,this.retry=g,this.isUsingEmulator=I,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((C,N)=>{this.resolve_=C,this.reject_=N,this.start_()})}start_(){const e=(r,i)=>{if(i){r(!1,new xl(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=l=>{const u=l.loaded,c=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,c)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const l=s.getErrorCode()===Lu.NO_ERROR,u=s.getStatus();if(!l||g4(u,this.additionalRetryCodes_)&&this.retry){const f=s.getErrorCode()===Lu.ABORT;r(!1,new xl(!1,null,f));return}const c=this.successCodes_.indexOf(u)!==-1;r(!0,new xl(c,s))})},n=(r,i)=>{const s=this.resolve_,o=this.reject_,l=i.connection;if(i.wasSuccessCode)try{const u=this.callback_(l,l.getResponse());p4(u)?s(u):s()}catch(u){o(u)}else if(l!==null){const u=s4();u.serverResponse=l.getErrorText(),this.errorCallback_?o(this.errorCallback_(l,u)):o(u)}else if(i.canceled){const u=this.appDelete_?YT():a4();o(u)}else{const u=o4();o(u)}};this.canceled_?n(!1,new xl(!1,null,!0)):this.backoffId_=d4(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&f4(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class xl{constructor(e,n,r){this.wasSuccessCode=e,this.connection=n,this.canceled=!!r}}function v4(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function _4(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function w4(t,e){e&&(t["X-Firebase-GMPID"]=e)}function E4(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function T4(t,e,n,r,i,s,o=!0,l=!1){const u=m4(t.urlParams),c=t.url+u,f=Object.assign({},t.headers);return w4(f,e),v4(f,n),_4(f,s),E4(f,r),new y4(c,t.method,f,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,i,o,l)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function I4(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function x4(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fu{constructor(e,n){this._service=e,n instanceof pn?this._location=n:this._location=pn.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new Fu(e,n)}get root(){const e=new pn(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return x4(this._location.path)}get storage(){return this._service}get parent(){const e=I4(this._location.path);if(e===null)return null;const n=new pn(this._location.bucket,e);return new Fu(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw c4(e)}}function R_(t,e){const n=e==null?void 0:e[n4];return n==null?null:pn.makeFromBucketSpec(n,t)}function k4(t,e,n,r={}){t.host=`${e}:${n}`;const i=Oi(e);i&&(Ep(`https://${t.host}/b`),Tp("Storage",!0)),t._isUsingEmulator=!0,t._protocol=i?"https":"http";const{mockUserToken:s}=r;s&&(t._overrideAuthToken=typeof s=="string"?s:IE(s,t.app.options.projectId))}class S4{constructor(e,n,r,i,s,o=!1){this.app=e,this._authProvider=n,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._isUsingEmulator=o,this._bucket=null,this._host=QT,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=r4,this._maxUploadRetryTime=i4,this._requests=new Set,i!=null?this._bucket=pn.makeFromBucketSpec(i,this._host):this._bucket=R_(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=pn.makeFromBucketSpec(this._url,e):this._bucket=R_(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){A_("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){A_("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){if(Qt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Fu(this,e)}_makeRequest(e,n,r,i,s=!0){if(this._deleted)return new h4(YT());{const o=T4(e,this._appId,r,i,n,this._firebaseVersion,s,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,r,i).getPromise()}}const N_="@firebase/storage",P_="0.13.14";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JT="storage";function C4(t=dc(),e){t=xe(t);const r=ei(t,JT).getImmediate({identifier:e}),i=wE("storage");return i&&A4(r,...i),r}function A4(t,e,n,r={}){k4(t,e,n,r)}function R4(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),i=t.getProvider("app-check-internal");return new S4(n,r,i,e,ji)}function N4(){vn(new nn(JT,R4,"PUBLIC").setMultipleInstances(!0)),bt(N_,P_,""),bt(N_,P_,"esm2017")}N4();const XT="@firebase/installations",Im="0.6.18";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZT=1e4,eI=`w:${Im}`,tI="FIS_v2",P4="https://firebaseinstallations.googleapis.com/v1",b4=60*60*1e3,D4="installations",O4="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V4={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Ri=new Vi(D4,O4,V4);function nI(t){return t instanceof rn&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rI({projectId:t}){return`${P4}/projects/${t}/installations`}function iI(t){return{token:t.token,requestStatus:2,expiresIn:M4(t.expiresIn),creationTime:Date.now()}}async function sI(t,e){const r=(await e.json()).error;return Ri.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function oI({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function j4(t,{refreshToken:e}){const n=oI(t);return n.append("Authorization",L4(e)),n}async function aI(t){const e=await t();return e.status>=500&&e.status<600?t():e}function M4(t){return Number(t.replace("s","000"))}function L4(t){return`${tI} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function F4({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=rI(t),i=oI(t),s=e.getImmediate({optional:!0});if(s){const c=await s.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const o={fid:n,authVersion:tI,appId:t.appId,sdkVersion:eI},l={method:"POST",headers:i,body:JSON.stringify(o)},u=await aI(()=>fetch(r,l));if(u.ok){const c=await u.json();return{fid:c.fid||n,registrationStatus:2,refreshToken:c.refreshToken,authToken:iI(c.authToken)}}else throw await sI("Create Installation",u)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lI(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U4(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const z4=/^[cdef][\w-]{21}$/,Tf="";function B4(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=$4(t);return z4.test(n)?n:Tf}catch{return Tf}}function $4(t){return U4(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oc(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uI=new Map;function cI(t,e){const n=Oc(t);hI(n,e),W4(n,e)}function hI(t,e){const n=uI.get(t);if(n)for(const r of n)r(e)}function W4(t,e){const n=H4();n&&n.postMessage({key:t,fid:e}),q4()}let mi=null;function H4(){return!mi&&"BroadcastChannel"in self&&(mi=new BroadcastChannel("[Firebase] FID Change"),mi.onmessage=t=>{hI(t.data.key,t.data.fid)}),mi}function q4(){uI.size===0&&mi&&(mi.close(),mi=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G4="firebase-installations-database",K4=1,Ni="firebase-installations-store";let Yh=null;function xm(){return Yh||(Yh=RE(G4,K4,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Ni)}}})),Yh}async function Uu(t,e){const n=Oc(t),i=(await xm()).transaction(Ni,"readwrite"),s=i.objectStore(Ni),o=await s.get(n);return await s.put(e,n),await i.done,(!o||o.fid!==e.fid)&&cI(t,e.fid),e}async function dI(t){const e=Oc(t),r=(await xm()).transaction(Ni,"readwrite");await r.objectStore(Ni).delete(e),await r.done}async function Vc(t,e){const n=Oc(t),i=(await xm()).transaction(Ni,"readwrite"),s=i.objectStore(Ni),o=await s.get(n),l=e(o);return l===void 0?await s.delete(n):await s.put(l,n),await i.done,l&&(!o||o.fid!==l.fid)&&cI(t,l.fid),l}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function km(t){let e;const n=await Vc(t.appConfig,r=>{const i=Q4(r),s=Y4(t,i);return e=s.registrationPromise,s.installationEntry});return n.fid===Tf?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function Q4(t){const e=t||{fid:B4(),registrationStatus:0};return fI(e)}function Y4(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(Ri.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=J4(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:X4(t)}:{installationEntry:e}}async function J4(t,e){try{const n=await F4(t,e);return Uu(t.appConfig,n)}catch(n){throw nI(n)&&n.customData.serverCode===409?await dI(t.appConfig):await Uu(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function X4(t){let e=await b_(t.appConfig);for(;e.registrationStatus===1;)await lI(100),e=await b_(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await km(t);return r||n}return e}function b_(t){return Vc(t,e=>{if(!e)throw Ri.create("installation-not-found");return fI(e)})}function fI(t){return Z4(t)?{fid:t.fid,registrationStatus:0}:t}function Z4(t){return t.registrationStatus===1&&t.registrationTime+ZT<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eO({appConfig:t,heartbeatServiceProvider:e},n){const r=tO(t,n),i=j4(t,n),s=e.getImmediate({optional:!0});if(s){const c=await s.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const o={installation:{sdkVersion:eI,appId:t.appId}},l={method:"POST",headers:i,body:JSON.stringify(o)},u=await aI(()=>fetch(r,l));if(u.ok){const c=await u.json();return iI(c)}else throw await sI("Generate Auth Token",u)}function tO(t,{fid:e}){return`${rI(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sm(t,e=!1){let n;const r=await Vc(t.appConfig,s=>{if(!pI(s))throw Ri.create("not-registered");const o=s.authToken;if(!e&&iO(o))return s;if(o.requestStatus===1)return n=nO(t,e),s;{if(!navigator.onLine)throw Ri.create("app-offline");const l=oO(s);return n=rO(t,l),l}});return n?await n:r.authToken}async function nO(t,e){let n=await D_(t.appConfig);for(;n.authToken.requestStatus===1;)await lI(100),n=await D_(t.appConfig);const r=n.authToken;return r.requestStatus===0?Sm(t,e):r}function D_(t){return Vc(t,e=>{if(!pI(e))throw Ri.create("not-registered");const n=e.authToken;return aO(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function rO(t,e){try{const n=await eO(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await Uu(t.appConfig,r),n}catch(n){if(nI(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await dI(t.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Uu(t.appConfig,r)}throw n}}function pI(t){return t!==void 0&&t.registrationStatus===2}function iO(t){return t.requestStatus===2&&!sO(t)}function sO(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+b4}function oO(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function aO(t){return t.requestStatus===1&&t.requestTime+ZT<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lO(t){const e=t,{installationEntry:n,registrationPromise:r}=await km(e);return r?r.catch(console.error):Sm(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uO(t,e=!1){const n=t;return await cO(n),(await Sm(n,e)).token}async function cO(t){const{registrationPromise:e}=await km(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hO(t){if(!t||!t.options)throw Jh("App Configuration");if(!t.name)throw Jh("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Jh(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Jh(t){return Ri.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mI="installations",dO="installations-internal",fO=t=>{const e=t.getProvider("app").getImmediate(),n=hO(e),r=ei(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},pO=t=>{const e=t.getProvider("app").getImmediate(),n=ei(e,mI).getImmediate();return{getId:()=>lO(n),getToken:i=>uO(n,i)}};function mO(){vn(new nn(mI,fO,"PUBLIC")),vn(new nn(dO,pO,"PRIVATE"))}mO();bt(XT,Im);bt(XT,Im,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zu="analytics",gO="firebase_id",yO="origin",vO=60*1e3,_O="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Cm="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ot=new hc("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wO={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},$t=new Vi("analytics","Analytics",wO);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EO(t){if(!t.startsWith(Cm)){const e=$t.create("invalid-gtag-resource",{gtagURL:t});return Ot.warn(e.message),""}return t}function gI(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function TO(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function IO(t,e){const n=TO("firebase-js-sdk-policy",{createScriptURL:EO}),r=document.createElement("script"),i=`${Cm}?l=${t}&id=${e}`;r.src=n?n==null?void 0:n.createScriptURL(i):i,r.async=!0,document.head.appendChild(r)}function xO(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function kO(t,e,n,r,i,s){const o=r[i];try{if(o)await e[o];else{const u=(await gI(n)).find(c=>c.measurementId===i);u&&await e[u.appId]}}catch(l){Ot.error(l)}t("config",i,s)}async function SO(t,e,n,r,i){try{let s=[];if(i&&i.send_to){let o=i.send_to;Array.isArray(o)||(o=[o]);const l=await gI(n);for(const u of o){const c=l.find(m=>m.measurementId===u),f=c&&e[c.appId];if(f)s.push(f);else{s=[];break}}}s.length===0&&(s=Object.values(e)),await Promise.all(s),t("event",r,i||{})}catch(s){Ot.error(s)}}function CO(t,e,n,r){async function i(s,...o){try{if(s==="event"){const[l,u]=o;await SO(t,e,n,l,u)}else if(s==="config"){const[l,u]=o;await kO(t,e,n,r,l,u)}else if(s==="consent"){const[l,u]=o;t("consent",l,u)}else if(s==="get"){const[l,u,c]=o;t("get",l,u,c)}else if(s==="set"){const[l]=o;t("set",l)}else t(s,...o)}catch(l){Ot.error(l)}}return i}function AO(t,e,n,r,i){let s=function(...o){window[r].push(arguments)};return window[i]&&typeof window[i]=="function"&&(s=window[i]),window[i]=CO(s,t,e,n),{gtagCore:s,wrappedGtag:window[i]}}function RO(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(Cm)&&n.src.includes(t))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NO=30,PO=1e3;class bO{constructor(e={},n=PO){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const yI=new bO;function DO(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function OO(t){var e;const{appId:n,apiKey:r}=t,i={method:"GET",headers:DO(r)},s=_O.replace("{app-id}",n),o=await fetch(s,i);if(o.status!==200&&o.status!==304){let l="";try{const u=await o.json();!((e=u.error)===null||e===void 0)&&e.message&&(l=u.error.message)}catch{}throw $t.create("config-fetch-failed",{httpStatus:o.status,responseMessage:l})}return o.json()}async function VO(t,e=yI,n){const{appId:r,apiKey:i,measurementId:s}=t.options;if(!r)throw $t.create("no-app-id");if(!i){if(s)return{measurementId:s,appId:r};throw $t.create("no-api-key")}const o=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},l=new LO;return setTimeout(async()=>{l.abort()},vO),vI({appId:r,apiKey:i,measurementId:s},o,l,e)}async function vI(t,{throttleEndTimeMillis:e,backoffCount:n},r,i=yI){var s;const{appId:o,measurementId:l}=t;try{await jO(r,e)}catch(u){if(l)return Ot.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:o,measurementId:l};throw u}try{const u=await OO(t);return i.deleteThrottleMetadata(o),u}catch(u){const c=u;if(!MO(c)){if(i.deleteThrottleMetadata(o),l)return Ot.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:o,measurementId:l};throw u}const f=Number((s=c==null?void 0:c.customData)===null||s===void 0?void 0:s.httpStatus)===503?Ky(n,i.intervalMillis,NO):Ky(n,i.intervalMillis),m={throttleEndTimeMillis:Date.now()+f,backoffCount:n+1};return i.setThrottleMetadata(o,m),Ot.debug(`Calling attemptFetch again in ${f} millis`),vI(t,m,r,i)}}function jO(t,e){return new Promise((n,r)=>{const i=Math.max(e-Date.now(),0),s=setTimeout(n,i);t.addEventListener(()=>{clearTimeout(s),r($t.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function MO(t){if(!(t instanceof rn)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class LO{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function FO(t,e,n,r,i){if(i&&i.global){t("event",n,r);return}else{const s=await e,o=Object.assign(Object.assign({},r),{send_to:s});t("event",n,o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function UO(){if(kE())try{await SE()}catch(t){return Ot.warn($t.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return Ot.warn($t.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function zO(t,e,n,r,i,s,o){var l;const u=VO(t);u.then(I=>{n[I.measurementId]=I.appId,t.options.measurementId&&I.measurementId!==t.options.measurementId&&Ot.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${I.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(I=>Ot.error(I)),e.push(u);const c=UO().then(I=>{if(I)return r.getId()}),[f,m]=await Promise.all([u,c]);RO(s)||IO(s,f.measurementId),i("js",new Date);const g=(l=o==null?void 0:o.config)!==null&&l!==void 0?l:{};return g[yO]="firebase",g.update=!0,m!=null&&(g[gO]=m),i("config",f.measurementId,g),f.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BO{constructor(e){this.app=e}_delete(){return delete Lo[this.app.options.appId],Promise.resolve()}}let Lo={},O_=[];const V_={};let Xh="dataLayer",$O="gtag",j_,_I,M_=!1;function WO(){const t=[];if(xE()&&t.push("This is a browser extension environment."),oA()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,i)=>`(${i+1}) ${r}`).join(" "),n=$t.create("invalid-analytics-context",{errorInfo:e});Ot.warn(n.message)}}function HO(t,e,n){WO();const r=t.options.appId;if(!r)throw $t.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)Ot.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw $t.create("no-api-key");if(Lo[r]!=null)throw $t.create("already-exists",{id:r});if(!M_){xO(Xh);const{wrappedGtag:s,gtagCore:o}=AO(Lo,O_,V_,Xh,$O);_I=s,j_=o,M_=!0}return Lo[r]=zO(t,O_,V_,e,j_,Xh,n),new BO(t)}function qO(t=dc()){t=xe(t);const e=ei(t,zu);return e.isInitialized()?e.getImmediate():GO(t)}function GO(t,e={}){const n=ei(t,zu);if(n.isInitialized()){const i=n.getImmediate();if(Br(e,n.getOptions()))return i;throw $t.create("already-initialized")}return n.initialize({options:e})}function KO(t,e,n,r){t=xe(t),FO(_I,Lo[t.app.options.appId],e,n,r).catch(i=>Ot.error(i))}const L_="@firebase/analytics",F_="0.10.17";function QO(){vn(new nn(zu,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("installations-internal").getImmediate();return HO(r,i,n)},"PUBLIC")),vn(new nn("analytics-internal",t,"PRIVATE")),bt(L_,F_),bt(L_,F_,"esm2017");function t(e){try{const n=e.getProvider(zu).getImmediate();return{logEvent:(r,i,s)=>KO(n,r,i,s)}}catch(n){throw $t.create("interop-component-reg-failed",{reason:n})}}}QO();const YO={apiKey:"AIzaSyChMQGS-CLl9vp-SysXFFbXIdWlgK_kCqU",authDomain:"bracket-anything.firebaseapp.com",projectId:"bracket-anything",storageBucket:"bracket-anything.firebasestorage.app",messagingSenderId:"2568511991",appId:"1:2568511991:web:7d07a72a2d634df2e1cef2",measurementId:"G-ZMKQCSK02D"},jc=NE(YO),vs=HN(jc),ee=UD(jc);C4(jc);qO(jc);const wI=D.createContext(null);function sn(){const t=D.useContext(wI);if(!t)throw new Error("useAuthContext must be inside AuthProvider");return t}function JO({children:t}){const[e,n]=D.useState(null),[r,i]=D.useState(!0),s=D.useCallback(async()=>{const l=vs.currentUser;if(!l)return;const u=await Ze(me(ee,"ab_users",l.uid));u.exists()&&n(u.data())},[]);D.useEffect(()=>x2(vs,async u=>{if(!u){n(null),i(!1);return}try{const c=await Ze(me(ee,"ab_users",u.uid));c.exists()?n(c.data()):n(null)}catch(c){console.error("[AuthContext] Firestore fetch error:",c),n(null)}finally{i(!1)}}),[]);async function o(){await k2(vs)}return h.jsx(wI.Provider,{value:{currentUser:e,loading:r,signOut:o,refreshUser:s},children:t})}function XO(){const{currentUser:t,loading:e}=sn(),n=Zr();return e?h.jsx("div",{className:"paper-bg min-h-screen flex items-center justify-center",children:h.jsx("p",{className:"font-display text-slate/50 uppercase tracking-widest text-sm animate-pulse",children:"Authenticating..."})}):t?h.jsx(pE,{}):h.jsx(SC,{to:"/login",state:{from:n},replace:!0})}/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZO=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),EI=(...t)=>t.filter((e,n,r)=>!!e&&r.indexOf(e)===n).join(" ");/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var eV={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tV=D.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:i="",children:s,iconNode:o,...l},u)=>D.createElement("svg",{ref:u,...eV,width:e,height:e,stroke:t,strokeWidth:r?Number(n)*24/Number(e):n,className:EI("lucide",i),...l},[...o.map(([c,f])=>D.createElement(c,f)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de=(t,e)=>{const n=D.forwardRef(({className:r,...i},s)=>D.createElement(tV,{ref:s,iconNode:e,className:EI(`lucide-${ZO(t)}`,r),...i}));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U_=de("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pi=de("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Am=de("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nV=de("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rV=de("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TI=de("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z_=de("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bu=de("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ma=de("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const If=de("CirclePlus",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iV=de("CircleUser",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662",key:"154egf"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const II=de("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sV=de("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oV=de("Dumbbell",[["path",{d:"M14.4 14.4 9.6 9.6",key:"ic80wn"}],["path",{d:"M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z",key:"nnl7wr"}],["path",{d:"m21.5 21.5-1.4-1.4",key:"1f1ice"}],["path",{d:"M3.9 3.9 2.5 2.5",key:"1evmna"}],["path",{d:"M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z",key:"yhosts"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aV=de("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lV=de("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uV=de("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cV=de("Leaf",[["path",{d:"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",key:"nnexq3"}],["path",{d:"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12",key:"mt58a7"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hV=de("Link2",[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dV=de("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fV=de("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pV=de("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xI=de("Newspaper",[["path",{d:"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2",key:"7pis2x"}],["path",{d:"M18 14h-8",key:"sponae"}],["path",{d:"M15 18h-5",key:"95g1m2"}],["path",{d:"M10 6h8v4h-8V6Z",key:"smlsk5"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mV=de("Rocket",[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",key:"m3kijz"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",key:"1fmvmk"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",key:"1f8sc4"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gV=de("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kI=de("Share2",[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yV=de("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const SI=de("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ga=de("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vV=de("Utensils",[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _V=de("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $u=de("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]),wV=[{to:"/",label:"Home",Icon:uV,end:!0},{to:"/create",label:"Create",Icon:If},{to:"/join",label:"Join",Icon:ga},{to:"/profile",label:"Profile",Icon:iV}];function EV(){return h.jsx("nav",{className:"fixed bottom-0 left-0 right-0 z-50 pointer-events-none pb-4 px-4",children:h.jsx("ul",{className:"pointer-events-auto flex items-stretch max-w-lg mx-auto bg-dark-teal rounded-full shadow-float border border-cream/10 px-2",children:wV.map(({to:t,label:e,Icon:n,end:r})=>h.jsx("li",{className:"flex-1",children:h.jsx(FC,{to:t,end:r,className:({isActive:i})=>["relative flex flex-col items-center justify-center gap-1 py-3 w-full min-h-[56px] rounded-full","transition-colors duration-150",i?"text-dark":"text-cream/50 hover:text-cream/80"].join(" "),children:({isActive:i})=>h.jsxs(h.Fragment,{children:[i&&h.jsx("span",{className:"absolute inset-1 rounded-full bg-neon animate-fade-in","aria-hidden":"true"}),h.jsx(n,{size:20,strokeWidth:i?2.5:1.8,"aria-hidden":"true",className:"relative z-10 transition-transform duration-150 active:scale-90"}),h.jsx("span",{className:"relative z-10 text-[10px] font-display uppercase tracking-wider leading-none",children:e})]})})},t))})})}function TV(){const{currentUser:t}=sn(),[e,n]=D.useState([]),[r,i]=D.useState(!1),s=D.useRef(null);D.useEffect(()=>{if(!t)return;const u=Fr(Bt(ee,"ab_notifications"),dn("recipientUid","==",t.uid),WT("createdAt","desc"),KD(20));return JD(u,f=>{n(f.docs.map(m=>({id:m.id,...m.data()})))})},[t]),D.useEffect(()=>{if(!r||!t)return;const u=e.filter(f=>!f.read);if(u.length===0)return;const c=KT(ee);u.forEach(f=>c.update(me(ee,"ab_notifications",f.id),{read:!0})),c.commit()},[r,t,e]),D.useEffect(()=>{if(!r)return;function u(c){s.current&&!s.current.contains(c.target)&&i(!1)}return document.addEventListener("mousedown",u),()=>document.removeEventListener("mousedown",u)},[r]);const o=e.filter(u=>!u.read).length;function l(u){if(!u)return"";const c=u.toDate(),m=new Date().getTime()-c.getTime(),g=Math.floor(m/6e4);if(g<1)return"just now";if(g<60)return`${g}m ago`;const I=Math.floor(g/60);return I<24?`${I}h ago`:`${Math.floor(I/24)}d ago`}return h.jsxs("div",{className:"relative",ref:s,children:[h.jsxs("button",{onClick:()=>i(u=>!u),className:"relative p-1 text-cream hover:text-neon transition-colors","aria-label":"Notifications",children:[h.jsx(Am,{size:20,strokeWidth:1.8}),o>0&&h.jsx("span",{className:"absolute -top-1 -right-1 w-4 h-4 bg-retro-red border border-cream rounded-full flex items-center justify-center",children:h.jsx("span",{className:"font-display text-[9px] text-cream leading-none",children:o>9?"9+":o})})]}),r&&h.jsxs("div",{className:"absolute right-0 top-8 w-80 max-h-96 overflow-y-auto bg-dark-teal border border-cream/15 rounded-2xl shadow-float z-50",children:[h.jsxs("div",{className:"flex items-center justify-between px-3 py-2 border-b border-cream/10 sticky top-0 bg-dark-teal rounded-t-2xl",children:[h.jsx("span",{className:"font-display text-xs text-cream/60 uppercase tracking-wider",children:"Dispatches"}),h.jsx("button",{onClick:()=>i(!1),className:"text-cream/40 hover:text-cream",children:h.jsx(_V,{size:14,strokeWidth:2})})]}),e.length===0?h.jsx("div",{className:"px-3 py-6 text-center",children:h.jsx("p",{className:"font-body text-cream/40 text-xs",children:"No dispatches yet. Stay active."})}):h.jsx("ul",{children:e.map(u=>h.jsx("li",{className:["px-3 py-3 border-b border-cream/10 last:border-0",u.read?"":"bg-neon/10"].join(" "),children:h.jsxs(cn,{to:`/challenge/${u.challengeId}`,onClick:()=>i(!1),className:"block",children:[h.jsxs("p",{className:"font-display text-[10px] text-cream/40 uppercase tracking-wider mb-1",children:[u.challengeName," · ",l(u.createdAt),!u.read&&h.jsx("span",{className:"ml-1 inline-block w-1.5 h-1.5 rounded-full bg-retro-red align-middle"})]}),h.jsx("p",{className:"font-body text-cream text-xs leading-relaxed",children:u.message})]})},u.id))}),h.jsx("div",{className:"px-3 py-2 border-t border-cream/10 sticky bottom-0 bg-dark-teal rounded-b-2xl",children:h.jsx(cn,{to:"/notifications",onClick:()=>i(!1),className:"font-display text-[10px] uppercase tracking-wider text-cream/50 hover:text-cream",children:"View all →"})})]})]})}function IV(){return h.jsxs("div",{className:"bg-dark min-h-screen flex flex-col font-body",children:[h.jsxs("header",{className:"sticky top-0 z-40 w-full bg-dark border-b border-cream/8 px-5 py-4 flex items-center justify-between max-w-lg mx-auto w-full",children:[h.jsx("div",{className:"w-8"}),h.jsx("h1",{className:"font-display text-cream text-base tracking-[0.2em] uppercase leading-none",children:"Accountabili-Buddies"}),h.jsx(TV,{})]}),h.jsx("main",{className:"flex-1 overflow-y-auto w-full max-w-lg mx-auto",children:h.jsx(pE,{})}),h.jsx(EV,{})]})}function xV({mood:t}){const e={idle:{leftBrow:"M 100,80 L 124,82",rightBrow:"M 136,82 L 160,80",mouth:"M 117,110 L 143,110"},proud:{leftBrow:"M 100,78 Q 112,73 124,77",rightBrow:"M 136,77 Q 148,73 160,78",mouth:"M 114,109 Q 130,119 146,109"},lagging:{leftBrow:"M 100,82 Q 112,78 124,80",rightBrow:"M 136,80 Q 148,78 160,82",mouth:"M 115,112 Q 130,105 145,112"},celebrate:{leftBrow:"M 100,76 Q 112,70 124,74",rightBrow:"M 136,74 Q 148,70 160,76",mouth:"M 112,107 Q 130,123 148,107"}},{leftBrow:n,rightBrow:r,mouth:i}=e[t];return h.jsxs("svg",{viewBox:"0 0 260 262",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",className:"w-full h-full",children:[h.jsx("path",{d:"M 76,114 C 54,98 28,90 20,100 C 14,112 20,126 32,130 C 48,136 66,134 76,132 Z",fill:"#FCF1E4",stroke:"#1F211F",strokeWidth:"2.5",strokeLinejoin:"round"}),h.jsx("path",{d:"M 75,116 C 52,102 30,94 22,102",stroke:"#1F211F",strokeWidth:"1.5",strokeLinecap:"round",fill:"none"}),h.jsx("path",{d:"M 75,123 C 50,113 26,110 18,116",stroke:"#1F211F",strokeWidth:"1.5",strokeLinecap:"round",fill:"none"}),h.jsx("path",{d:"M 75,130 C 52,124 30,124 22,120",stroke:"#1F211F",strokeWidth:"1.5",strokeLinecap:"round",fill:"none"}),h.jsx("path",{d:"M 184,114 C 206,98 232,90 240,100 C 246,112 240,126 228,130 C 212,136 194,134 184,132 Z",fill:"#FCF1E4",stroke:"#1F211F",strokeWidth:"2.5",strokeLinejoin:"round"}),h.jsx("path",{d:"M 185,116 C 208,102 230,94 238,102",stroke:"#1F211F",strokeWidth:"1.5",strokeLinecap:"round",fill:"none"}),h.jsx("path",{d:"M 185,123 C 210,113 234,110 242,116",stroke:"#1F211F",strokeWidth:"1.5",strokeLinecap:"round",fill:"none"}),h.jsx("path",{d:"M 185,130 C 208,124 230,124 238,120",stroke:"#1F211F",strokeWidth:"1.5",strokeLinecap:"round",fill:"none"}),h.jsx("ellipse",{cx:"130",cy:"152",rx:"54",ry:"88",fill:"#FCF1E4",stroke:"#1F211F",strokeWidth:"3"}),h.jsx("path",{d:"M 78,116 Q 130,127 182,116",stroke:"#1F211F",strokeWidth:"2.5",fill:"none",strokeLinecap:"round"}),h.jsx("path",{d:"M 78,180 Q 130,191 182,180",stroke:"#1F211F",strokeWidth:"2",fill:"none",strokeLinecap:"round"}),h.jsx("path",{d:"M 110,70 C 107,59 97,53 100,46 C 107,55 116,65 113,70 Z",fill:"#FCF1E4",stroke:"#1F211F",strokeWidth:"2.5",strokeLinejoin:"round"}),h.jsx("path",{d:"M 150,70 C 153,59 163,53 160,46 C 153,55 144,65 147,70 Z",fill:"#FCF1E4",stroke:"#1F211F",strokeWidth:"2.5",strokeLinejoin:"round"}),h.jsx("ellipse",{cx:"113",cy:"90",rx:"13",ry:"13",fill:"white",stroke:"#1F211F",strokeWidth:"2"}),h.jsx("ellipse",{cx:"113",cy:"94",rx:"10",ry:"10",fill:"#1F211F"}),h.jsx("path",{d:"M 100,90 Q 113,83 126,90 L 126,77 Q 113,75 100,77 Z",fill:"#FCF1E4"}),h.jsx("path",{d:"M 100,90 Q 113,83 126,90",stroke:"#1F211F",strokeWidth:"2.5",fill:"none",strokeLinecap:"round"}),h.jsx("circle",{cx:"119",cy:"94",r:"2.5",fill:"white"}),h.jsx("ellipse",{cx:"147",cy:"90",rx:"13",ry:"13",fill:"white",stroke:"#1F211F",strokeWidth:"2"}),h.jsx("ellipse",{cx:"147",cy:"94",rx:"10",ry:"10",fill:"#1F211F"}),h.jsx("path",{d:"M 134,90 Q 147,83 160,90 L 160,77 Q 147,75 134,77 Z",fill:"#FCF1E4"}),h.jsx("path",{d:"M 134,90 Q 147,83 160,90",stroke:"#1F211F",strokeWidth:"2.5",fill:"none",strokeLinecap:"round"}),h.jsx("circle",{cx:"153",cy:"94",r:"2.5",fill:"white"}),h.jsx("path",{d:n,stroke:"#1F211F",strokeWidth:"3",strokeLinecap:"round",fill:"none"}),h.jsx("path",{d:r,stroke:"#1F211F",strokeWidth:"3",strokeLinecap:"round",fill:"none"}),h.jsx("path",{d:i,stroke:"#1F211F",strokeWidth:"2.5",strokeLinecap:"round",fill:"none"}),h.jsx("rect",{x:"107",y:"234",width:"20",height:"16",rx:"9",fill:"#1F211F"}),h.jsx("rect",{x:"133",y:"234",width:"20",height:"16",rx:"9",fill:"#1F211F"}),h.jsx("ellipse",{cx:"130",cy:"247",rx:"66",ry:"9",fill:"#B7C8E9",opacity:"0.45"})]})}const kV={idle:"YOU'RE JUST STANDING THERE",proud:"YOU'RE CRUSHING IT",lagging:"OOPS, YOU'RE BEHIND",celebrate:"MISSION COMPLETE!"};function Et({mood:t="idle",size:e="md",headline:n,className:r=""}){const i=e==="sm"?"w-24 h-24":"w-44 h-44",s=e==="sm"?"font-display text-cream text-xl uppercase tracking-wide text-center leading-tight mt-1 animate-slide-up":"font-display text-cream text-3xl uppercase tracking-wide text-center leading-tight mt-1 animate-slide-up";return h.jsxs("div",{className:`flex flex-col items-center ${r}`,children:[h.jsx("div",{className:`${i} animate-fade-in`,children:h.jsx(xV,{mood:t})}),h.jsx("p",{className:s,children:n??kV[t]})]})}function $e(){return h.jsx("svg",{viewBox:"0 0 375 40",className:"zone-divider",fill:"#B7C8E9","aria-hidden":"true",children:h.jsx("path",{d:"M0,22 Q93,2 187,22 Q281,42 375,22 L375,40 L0,40 Z"})})}const SV={"auth/invalid-phone-number":"Invalid phone number. Include your country code (e.g. +1).","auth/too-many-requests":"Too many attempts. Please try again later.","auth/invalid-verification-code":"Incorrect code. Check your message and try again.","auth/code-expired":"Code expired. Go back and request a new one.","auth/missing-phone-number":"Please enter your phone number."};function Zh(t){if(t&&typeof t=="object"&&"code"in t){const e=t.code;return SV[e]??(t instanceof Error?t.message:"Something went wrong. Try again.")}return"Something went wrong. Try again."}function CV(){var S,R;const{currentUser:t,refreshUser:e}=sn(),n=ar(),i=((R=(S=Zr().state)==null?void 0:S.from)==null?void 0:R.pathname)??"/";D.useEffect(()=>{t&&n(i,{replace:!0})},[t,i,n]);const[s,o]=D.useState({name:"phone"}),[l,u]=D.useState("+1"),[c,f]=D.useState(["","","","","",""]),[m,g]=D.useState(""),[I,C]=D.useState(null),[N,P]=D.useState(!1),w=D.useRef(null),_=D.useRef(Array(6).fill(null));D.useEffect(()=>{if(s.name==="phone"&&!w.current)return w.current=new vv(vs,"recaptcha-container",{size:"invisible",callback:()=>{}}),()=>{var A;(A=w.current)==null||A.clear(),w.current=null}},[s.name]);async function k(A){var x;A.preventDefault(),C(null),P(!0);try{if(!w.current)throw new Error("reCAPTCHA not ready");const Y=await K2(vs,l,w.current);o({name:"otp",confirmationResult:Y,phone:l})}catch(Y){console.error("[LoginPage] signInWithPhoneNumber error:",Y),C(Zh(Y));try{(x=w.current)==null||x.clear(),w.current=null,w.current=new vv(vs,"recaptcha-container",{size:"invisible",callback:()=>{}})}catch(ae){console.error("[LoginPage] reCAPTCHA recreate error:",ae)}}finally{P(!1)}}async function b(A){if(A.preventDefault(),s.name!=="otp")return;const x=c.join("");if(x.length===6){C(null),P(!0);try{const ae=(await s.confirmationResult.confirm(x)).user.uid;(await Ze(me(ee,"ab_users",ae))).exists()?(await e(),n(i,{replace:!0})):o({name:"name",uid:ae,phone:s.phone})}catch(Y){C(Zh(Y))}finally{P(!1)}}}async function j(A){if(A.preventDefault(),s.name!=="name")return;const x=m.trim();if(x){C(null),P(!0);try{await Ai(me(ee,"ab_users",s.uid),{uid:s.uid,firstName:x,phone:s.phone,createdAt:Kn(),avatarUrl:null}),await e(),n(i,{replace:!0})}catch(Y){C(Zh(Y))}finally{P(!1)}}}function L(A,x){var Ve;const Y=x.replace(/\D/g,"").slice(-1),ae=[...c];ae[A]=Y,f(ae),Y&&A<5&&((Ve=_.current[A+1])==null||Ve.focus())}function T(A,x){var Y;x.key==="Backspace"&&!c[A]&&A>0&&((Y=_.current[A-1])==null||Y.focus())}function v(A){var Ve;A.preventDefault();const x=A.clipboardData.getData("text").replace(/\D/g,"").slice(0,6),Y=[...c];x.split("").forEach((rt,$)=>{Y[$]=rt}),f(Y);const ae=Math.min(x.length,5);(Ve=_.current[ae])==null||Ve.focus()}const E={phone:"ENLISTMENT",otp:"VERIFICATION",name:"IDENTIFICATION"}[s.name];return h.jsxs("div",{className:"bg-dark min-h-screen flex flex-col font-body",children:[h.jsxs("div",{className:"flex-1 flex flex-col items-center justify-end px-5 pb-8 pt-12",children:[h.jsx(Et,{mood:"idle"}),h.jsx("p",{className:"mt-4 font-display text-cream/40 text-xs uppercase tracking-[0.25em] animate-slide-up-1",children:E}),h.jsxs("h1",{className:"font-display text-cream text-5xl uppercase tracking-wide text-center leading-none mt-1 animate-slide-up-2",children:["Accountabili-",h.jsx("br",{}),"Buddies"]})]}),h.jsx($e,{}),h.jsx("div",{className:"zone-content pb-10",children:h.jsxs("div",{className:"w-full max-w-sm mx-auto space-y-4",children:[I&&h.jsx("div",{className:"flex items-start gap-2 bg-retro-red/15 border border-retro-red/30 rounded-2xl px-4 py-3 animate-fade-in",children:h.jsx("p",{className:"font-body text-dark text-sm leading-relaxed",children:I})}),s.name==="phone"&&h.jsxs("form",{onSubmit:k,className:"space-y-4 animate-slide-up",children:[h.jsxs("div",{children:[h.jsx("label",{htmlFor:"phone",className:"block font-body text-xs text-dark/60 uppercase tracking-wider mb-1.5",children:"Mobile Number"}),h.jsx("input",{id:"phone",type:"tel",value:l,onChange:A=>u(A.target.value),placeholder:"+1 555 000 0000",required:!0,className:`w-full border border-dark/15 bg-white/60 px-4 py-3
                             font-body text-dark placeholder-dark/30 rounded-2xl
                             focus:outline-none focus:border-dark/40 transition-colors duration-150
                             min-h-[44px] tracking-wider`,autoComplete:"tel",inputMode:"tel"}),h.jsx("p",{className:"font-body text-dark/50 text-xs mt-1.5 leading-relaxed",children:"Include your country code (e.g. +1 for US/Canada)"})]}),h.jsx("div",{id:"recaptcha-container"}),h.jsx("button",{type:"submit",disabled:N,className:"btn-retro-xl w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed",children:N?"Sending Code…":h.jsxs(h.Fragment,{children:["Send Code ",h.jsx(Pi,{size:16,"aria-hidden":"true"})]})})]}),s.name==="otp"&&h.jsxs("form",{onSubmit:b,className:"space-y-4 animate-slide-up",children:[h.jsxs("p",{className:"font-body text-dark/60 text-sm text-center leading-relaxed",children:["Code dispatched to"," ",h.jsx("span",{className:"text-dark font-semibold",children:s.phone})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block font-body text-xs text-dark/60 uppercase tracking-wider mb-2 text-center",children:"Clearance Code"}),h.jsx("div",{className:"flex gap-2 justify-center",onPaste:v,children:c.map((A,x)=>h.jsx("input",{ref:Y=>{_.current[x]=Y},type:"text",inputMode:"numeric",maxLength:1,value:A,onChange:Y=>L(x,Y.target.value),onKeyDown:Y=>T(x,Y),className:`w-12 h-14 text-center border border-dark/15 bg-white/60
                                 text-dark text-xl font-display rounded-2xl
                                 focus:outline-none focus:border-dark/40 transition-colors duration-150`,autoComplete:"one-time-code",autoFocus:x===0},x))})]}),h.jsx("button",{type:"submit",disabled:N||c.join("").length!==6,className:"btn-retro-xl w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed",children:N?"Verifying…":h.jsxs(h.Fragment,{children:["Confirm Code ",h.jsx(dV,{size:16,"aria-hidden":"true"})]})}),h.jsx("button",{type:"button",className:"w-full text-center font-body text-dark/40 text-sm underline underline-offset-2 cursor-pointer min-h-[44px]",onClick:()=>{o({name:"phone"}),f(Array(6).fill("")),C(null)},children:"Wrong number? Start over"})]}),s.name==="name"&&h.jsxs("form",{onSubmit:j,className:"space-y-4 animate-slide-up",children:[h.jsx("p",{className:"font-body text-dark/60 text-sm leading-relaxed text-center",children:"What should we call you, recruit?"}),h.jsxs("div",{children:[h.jsx("label",{htmlFor:"firstName",className:"block font-body text-xs text-dark/60 uppercase tracking-wider mb-1.5",children:"First Name"}),h.jsx("input",{id:"firstName",type:"text",value:m,onChange:A=>g(A.target.value),placeholder:"e.g. Theodore",required:!0,autoFocus:!0,className:`w-full border border-dark/15 bg-white/60 px-4 py-3
                             font-body text-dark placeholder-dark/30 rounded-2xl
                             focus:outline-none focus:border-dark/40 transition-colors duration-150
                             min-h-[44px]`,autoComplete:"given-name"})]}),h.jsx("button",{type:"submit",disabled:N||!m.trim(),className:"btn-retro-xl w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed",children:N?"Reporting for duty…":h.jsxs(h.Fragment,{children:["Report for Duty ",h.jsx(Pi,{size:16,"aria-hidden":"true"})]})})]}),h.jsx("p",{className:"text-center font-body text-dark/30 text-xs pt-2 leading-relaxed",children:"Your data is used only for this app. No spam. Ever."})]})})]})}const AV=["{checkinName} just checked in. While you were busy doing absolutely nothing, they were out here conquering {checkinGoal}. Just saying.","BULLETIN: {checkinName} completed {checkinGoal}. Your excuse of '{goToExcuse}' is looking weaker by the minute, {recipientName}.","Intelligence report: {checkinName} checked in. Meanwhile, {recipientName} was last seen in the vicinity of their couch. Unconfirmed.","{checkinName} didn't wait for motivation — they just did {checkinGoal}. A concept that may be foreign to you, {recipientName}.","Breaking: {checkinName} has completed today's mission. The gap between you and them grows ever wider, {recipientName}.","Your buddy {checkinName} just logged {checkinGoal}. We know you saw this notification. We're watching.","{checkinName}: checked in. {recipientName}: has not checked in. One of these people will regret their choices.","Field report: {checkinName} crushed {checkinGoal} today. Sources suggest your biggest weakness is '{biggestWeakness}'. Interesting timing.","DISPATCH FROM HQ: {checkinName} has completed the mission. Waiting on your report, {recipientName}. Don't make us come looking.","Not to make this weird, but {checkinName} checked in today and you didn't, {recipientName}. We have the data. We always have the data."],RV=["Still here, {recipientName}. Your '{goToExcuse}' excuse isn't going to check in for you.","Friendly reminder that '{biggestWeakness}' will still be there AFTER you check in. Priorities.","HQ calling {recipientName}. You haven't logged today. Is everything alright? (We know it is. Log in.)","Your mission awaits, {recipientName}. The day is not yet over. Neither are our expectations.","We're not mad, {recipientName}. We're just... disappointed. Check in.","Your buddies are watching the board. Your slot is conspicuously empty. Do with that information what you will.","Today's excuse forecast for {recipientName}: '{goToExcuse}'. Today's acceptable outcome: checking in anyway.","Every day you skip, a small part of your credibility vanishes into the ether. Just a thought. Check in.","An open letter to {recipientName}: It's not too late. It's never too late. But it's getting late. Check in.","The mission doesn't complete itself, {recipientName}. Neither does your reputation. Log your check-in."];function CI(t,e){return t.replace(/\{(\w+)\}/g,(n,r)=>e[r]??`{${r}}`)}function AI(t){return t[Math.floor(Math.random()*t.length)]}function NV(t){const e=new Date(t);e.setUTCHours(0,0,0,0),e.setUTCDate(e.getUTCDate()+3-(e.getUTCDay()+6)%7);const n=new Date(Date.UTC(e.getUTCFullYear(),0,4)),r=1+Math.round(((e.getTime()-n.getTime())/864e5-3+(n.getUTCDay()+6)%7)/7);return`${e.getUTCFullYear()}-W${String(r).padStart(2,"0")}`}function PV(){const t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}const B_=["animate-slide-up","animate-slide-up-1","animate-slide-up-2","animate-slide-up-3","animate-slide-up-4"];function bV(){const{currentUser:t}=sn(),[e,n]=D.useState([]),[r,i]=D.useState(!0),[s,o]=D.useState(!1),[l,u]=D.useState(!1),c=PV();D.useEffect(()=>{if(!t)return;async function w(){try{const _=await Zt(Fr(OT(ee,"members"),dn("uid","==",t.uid))),k=_.docs.map(j=>j.ref.parent.parent.id),b=await Promise.all(_.docs.map(async j=>{const L=j.ref.parent.parent,[T,v,E]=await Promise.all([Ze(L),Ze(me(ee,L.path,"leaderboard",t.uid)),Ze(me(ee,L.path,"dossiers",t.uid))]);if(!T.exists())return null;const S=T.data(),R=v.exists()?v.data():null,A=E.exists()?E.data():null;return{id:T.id,name:S.name,status:S.status,durationType:S.durationType,duration:S.duration,personalGoal:j.data().personalGoal??"",checkedInToday:(R==null?void 0:R.lastCheckinDate)===c,goToExcuse:A==null?void 0:A.goToExcuse}}));if(n(b.filter(j=>j!==null)),k.length>0){const j=NV(new Date),L=await Zt(Fr(Bt(ee,"ab_dispatches"),dn("weekId","==",j),dn("challengeId","in",k.slice(0,30))));u(!L.empty)}}catch(_){console.error("Failed to load missions",_)}finally{i(!1)}}w()},[t,c]);const f=w=>w.durationType==="ongoing"?"Ongoing":`${w.duration}d`,m=e.find(w=>w.status==="active"&&!w.checkedInToday),g=m&&t?CI(AI(RV),{recipientName:t.firstName,goToExcuse:m.goToExcuse??"I was too busy",biggestWeakness:"procrastination"}):null,I=e.filter(w=>w.status==="active"),C=I.length>0&&I.every(w=>w.checkedInToday),N=e.length>0&&e.every(w=>w.status==="complete"),P=r?"idle":N?"celebrate":C?"proud":m?"lagging":"idle";return r?h.jsxs("div",{className:"flex flex-col",children:[h.jsxs("div",{className:"zone-hero pb-6 flex flex-col items-center gap-4",children:[h.jsx("div",{className:"skeleton w-44 h-44 rounded-full"}),h.jsx("div",{className:"skeleton w-56 h-8 rounded-xl"})]}),h.jsx($e,{}),h.jsxs("div",{className:"zone-content space-y-3",children:[h.jsx("div",{className:"skeleton h-20 rounded-2xl"}),h.jsx("div",{className:"skeleton h-20 rounded-2xl"}),h.jsx("div",{className:"skeleton h-20 rounded-2xl"})]})]}):h.jsxs("div",{className:"flex flex-col",children:[h.jsxs("div",{className:"zone-hero pb-8 flex flex-col items-center gap-2",children:[h.jsx(Et,{mood:P}),g&&!s&&h.jsxs("div",{className:"mt-3 w-full max-w-xs bg-retro-red/15 border border-retro-red/30 rounded-2xl px-4 py-3 flex items-start gap-2 animate-slide-up",children:[h.jsx(Am,{size:14,className:"text-retro-red flex-shrink-0 mt-0.5",strokeWidth:2,"aria-hidden":"true"}),h.jsxs("div",{className:"flex-1 min-w-0",children:[h.jsx("p",{className:"font-body text-cream text-sm leading-relaxed",children:g}),h.jsx(cn,{to:`/challenge/${m.id}`,className:"inline-block mt-1.5 font-display text-xs uppercase tracking-wider text-retro-red",children:"Log Check-In →"})]}),h.jsx("button",{onClick:()=>o(!0),className:"text-cream/30 hover:text-cream/60 text-sm flex-shrink-0 cursor-pointer","aria-label":"Dismiss reminder",children:"✕"})]}),l&&h.jsxs(cn,{to:"/dispatch",className:"mt-2 flex items-center gap-2 px-4 py-2.5 bg-cream/10 rounded-full border border-cream/15 animate-slide-up-1 cursor-pointer",children:[h.jsx(xI,{size:14,className:"text-neon flex-shrink-0",strokeWidth:1.5,"aria-hidden":"true"}),h.jsx("span",{className:"font-display text-xs uppercase tracking-wider text-cream",children:"Weekly Dispatch — Read Now →"})]})]}),h.jsx($e,{}),h.jsx("div",{className:"zone-content",children:e.length>0?h.jsxs(h.Fragment,{children:[h.jsx("ul",{className:"space-y-3",children:e.map((w,_)=>h.jsx("li",{className:B_[Math.min(_,B_.length-1)],children:h.jsx(cn,{to:`/challenge/${w.id}`,className:"block card-light cursor-pointer hover:bg-white/50 transition-colors duration-150",children:h.jsxs("div",{className:"flex items-center justify-between gap-3",children:[h.jsxs("div",{className:"min-w-0 flex-1",children:[h.jsx("h3",{className:"font-display text-dark text-lg leading-snug",children:w.name}),w.personalGoal&&h.jsx("p",{className:"font-body text-dark/60 text-sm mt-1 truncate leading-relaxed",children:w.personalGoal}),h.jsxs("p",{className:"font-body text-dark/40 text-xs mt-1 uppercase tracking-wider",children:[f(w)," · ",w.status]})]}),h.jsxs("div",{className:"flex-shrink-0 flex flex-col items-center gap-1 min-w-[40px]",children:[h.jsx($u,{size:24,strokeWidth:1.5,"aria-hidden":"true",className:w.status==="active"&&w.checkedInToday?"text-neon":w.status==="active"?"text-dark/30":"text-dark/15",fill:w.status==="active"&&w.checkedInToday?"#E7F53C":"none"}),h.jsx("span",{className:"font-display text-[10px] uppercase tracking-wide text-dark/40",children:w.status==="active"?w.checkedInToday?"Done":"To-do":w.status})]})]})})},w.id))}),h.jsxs("div",{className:"flex gap-3 mt-5 animate-slide-up-4",children:[h.jsxs(cn,{to:"/create",className:"btn-retro gap-2 flex-1 justify-center min-h-[44px]",children:[h.jsx(If,{size:15,strokeWidth:1.8,"aria-hidden":"true"}),"New Mission"]}),h.jsxs(cn,{to:"/join",className:`inline-flex items-center justify-center gap-2 flex-1 px-5 py-3
                           bg-dark text-cream font-body text-base uppercase tracking-wider
                           rounded-full min-h-[44px] cursor-pointer
                           border-2 border-dark/20 transition-all duration-150 hover:bg-dark/80`,children:[h.jsx(ga,{size:15,strokeWidth:1.8,"aria-hidden":"true"}),"Join One"]})]})]}):h.jsxs("div",{className:"flex flex-col items-center text-center py-8 gap-5 animate-fade-in",children:[h.jsxs("p",{className:"font-display text-dark text-3xl uppercase leading-tight tracking-wide",children:["No missions.",h.jsx("br",{}),"Bold choice."]}),h.jsx("p",{className:"font-body text-dark/60 text-base leading-relaxed max-w-xs",children:"Create a challenge or join your crew — accountability starts here."}),h.jsxs("div",{className:"flex gap-3",children:[h.jsxs(cn,{to:"/create",className:"btn-retro gap-2 min-h-[44px]",children:[h.jsx(If,{size:15,strokeWidth:1.8,"aria-hidden":"true"}),"Create One"]}),h.jsxs(cn,{to:"/join",className:`inline-flex items-center gap-2 px-6 py-3
                           bg-dark text-cream font-body text-base uppercase tracking-wider
                           rounded-full min-h-[44px] cursor-pointer border-2 border-dark/20
                           transition-all duration-150 hover:bg-dark/80`,children:[h.jsx(ga,{size:15,strokeWidth:1.8,"aria-hidden":"true"}),"Join One"]})]})]})})]})}function DV(){const t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}const $_=["animate-slide-up","animate-slide-up-1","animate-slide-up-2","animate-slide-up-3","animate-slide-up-4"];function OV(){const{id:t}=lc(),e=ar(),{currentUser:n}=sn(),[r,i]=D.useState(null),[s,o]=D.useState([]),[l,u]=D.useState([]),[c,f]=D.useState(!0),[m,g]=D.useState(null),[I,C]=D.useState(!1),[N,P]=D.useState(!1),[w,_]=D.useState(null),k=DV();async function b(){if(t)try{const[z,J,ce]=await Promise.all([Ze(me(ee,"ab_challenges",t)),Zt(Bt(ee,"ab_challenges",t,"members")),Zt(Bt(ee,"ab_challenges",t,"leaderboard"))]);if(!z.exists()){g("Mission not found.");return}i(z.data()),o(J.docs.map(re=>re.data()));const K=ce.docs.map(re=>re.data()).sort((re,mt)=>mt.totalCheckins-re.totalCheckins);u(K)}catch{g("Failed to load mission.")}finally{f(!1)}}D.useEffect(()=>{b()},[t]),D.useEffect(()=>{!t||!r||r.status!=="lobby"||Zt(Fr(Bt(ee,"ab_invites"),dn("challengeId","==",t))).then(z=>{z.empty||_(z.docs[0].id)}).catch(()=>{})},[t,r]);async function j(){w&&(await navigator.clipboard.writeText(`${window.location.origin}/join/${w}`),P(!0),setTimeout(()=>P(!1),2e3))}async function L(){if(t){C(!0);try{await bc(me(ee,"ab_challenges",t),{status:"active",startDate:Kn()}),i(z=>z&&{...z,status:"active"})}catch{}finally{C(!1)}}}if(c)return h.jsxs("div",{className:"flex flex-col",children:[h.jsxs("div",{className:"zone-hero pb-8 flex flex-col items-center gap-3",children:[h.jsx("div",{className:"skeleton w-44 h-44 rounded-full"}),h.jsx("div",{className:"skeleton w-64 h-10 rounded-xl"}),h.jsx("div",{className:"skeleton w-24 h-5 rounded-full"})]}),h.jsx($e,{}),h.jsxs("div",{className:"zone-content space-y-3",children:[h.jsx("div",{className:"skeleton h-14 rounded-full"}),h.jsx("div",{className:"skeleton h-28 rounded-2xl"}),h.jsx("div",{className:"skeleton h-20 rounded-2xl"})]})]});if(m||!r)return h.jsx("div",{className:"px-4 py-10 text-center",children:h.jsx("p",{className:"font-body text-retro-red text-base",children:m??"Mission not found."})});const T=s.find(z=>z.uid===(n==null?void 0:n.uid)),v=r.creatorUid===(n==null?void 0:n.uid),E=r.durationType==="ongoing"?"Ongoing":`${r.duration} days`,S=z=>z.replace("per_","per "),R=s.length>0&&s.every(z=>z.dossierComplete),A=s.filter(z=>z.personalGoal&&z.personalGoal.trim()!=="").length,x=s.length>0&&A===s.length,Y=l.find(z=>z.uid===(n==null?void 0:n.uid)),ae=(Y==null?void 0:Y.lastCheckinDate)===k,Ve=l.findIndex(z=>z.uid===(n==null?void 0:n.uid))+1,rt=r.status==="complete"?"celebrate":r.status==="lobby"?"idle":ae?"proud":"lagging",$=r.status==="complete"?"MISSION COMPLETE":r.status==="lobby"?"AWAITING DEPLOYMENT":ae?`RANK #${Ve>0?Ve:"?"} — CRUSHED IT`:`RANK #${Ve>0?Ve:"?"} — GET MOVING`;return h.jsxs("div",{className:"flex flex-col",children:[h.jsxs("div",{className:"zone-hero pb-8 flex flex-col items-center",children:[h.jsx(Et,{mood:rt}),h.jsx("span",{className:"mt-3 inline-flex items-center px-3 py-1 rounded-full bg-cream/10 border border-cream/15 animate-slide-up-1",children:h.jsx("span",{className:"font-display text-xs uppercase tracking-widest text-cream/70",children:$})}),h.jsx("h2",{className:"mt-2 font-display text-4xl text-cream uppercase text-center leading-tight px-4 tracking-wide animate-slide-up-2",children:r.name}),h.jsxs("div",{className:"flex items-center gap-3 mt-3 animate-slide-up-3",children:[h.jsxs("span",{className:"flex items-center gap-1.5 px-3 py-1.5 bg-cream/10 rounded-full",children:[h.jsx(ga,{size:13,className:"text-teal",strokeWidth:1.5,"aria-hidden":"true"}),h.jsxs("span",{className:"font-body text-xs text-cream/70",children:[s.length," buddies"]})]}),h.jsxs("span",{className:"flex items-center gap-1.5 px-3 py-1.5 bg-cream/10 rounded-full",children:[h.jsx(rV,{size:13,className:"text-teal",strokeWidth:1.5,"aria-hidden":"true"}),h.jsx("span",{className:"font-body text-xs text-cream/70",children:E})]}),r.category&&h.jsx("span",{className:"px-3 py-1.5 bg-cream/10 rounded-full font-body text-xs text-cream/70 uppercase",children:r.category})]})]}),h.jsx("svg",{viewBox:"0 0 375 40",className:"zone-divider",fill:"#B7C8E9","aria-hidden":"true",children:h.jsx("path",{d:"M0,22 Q93,2 187,22 Q281,42 375,22 L375,40 L0,40 Z"})}),h.jsxs("div",{className:"zone-content space-y-4",children:[r.status==="active"&&h.jsx("button",{className:["w-full gap-3 font-display text-xl tracking-widest min-h-[56px] animate-slide-up",ae?"inline-flex items-center justify-center px-7 py-5 bg-dark text-cream uppercase rounded-full border-2 border-dark/20 cursor-pointer transition-all duration-150 hover:bg-dark/90":"btn-retro-xl"].join(" "),onClick:()=>e(`/challenge/${t}/checkin`),children:ae?h.jsxs(h.Fragment,{children:[h.jsx(ma,{size:20,strokeWidth:2,"aria-hidden":"true"})," Checked In"]}):h.jsxs(h.Fragment,{children:[h.jsx($u,{size:20,strokeWidth:2,"aria-hidden":"true"})," Log Check-In"]})}),(r.status==="active"||r.status==="complete")&&h.jsxs("div",{className:"card-light space-y-3 animate-slide-up-1",children:[h.jsxs("div",{className:"flex items-center gap-2 border-b border-dark/10 pb-2",children:[h.jsx(SI,{size:14,className:"text-neon",strokeWidth:1.8,"aria-hidden":"true"}),h.jsx("p",{className:"font-display text-xs text-dark/50 uppercase tracking-wider",children:"Leaderboard"})]}),l.length===0?h.jsx("p",{className:"font-body text-dark/40 text-sm leading-relaxed",children:"No check-ins yet. Be the first."}):h.jsx("ol",{className:"space-y-2",children:l.map((z,J)=>{const ce=z.uid===(n==null?void 0:n.uid),K=z.lastCheckinDate===k;return h.jsxs("li",{className:["flex items-center gap-3 py-1.5",$_[Math.min(J,$_.length-1)],ce?"opacity-100":"opacity-75"].join(" "),children:[h.jsx("span",{className:["font-display text-sm w-5 text-center flex-shrink-0",J===0?"text-neon":"text-dark/40"].join(" "),children:J+1}),h.jsx("div",{className:["w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0",ce?"bg-neon/20 border-neon/40":"bg-dark/10 border-dark/15"].join(" "),children:h.jsx("span",{className:"font-display text-xs text-dark",children:z.firstName[0]})}),h.jsx("div",{className:"min-w-0 flex-1",children:h.jsxs("p",{className:"font-body text-dark text-sm leading-none",children:[z.firstName,ce&&h.jsx("span",{className:"ml-1.5 text-neon text-xs",children:"(you)"})]})}),h.jsxs("div",{className:"flex items-center gap-1.5 flex-shrink-0",children:[h.jsx($u,{size:13,strokeWidth:1.5,"aria-hidden":"true",className:K?"text-neon":"text-dark/20",fill:K?"#E7F53C":"none"}),h.jsx("span",{className:"font-display text-sm text-dark/70",children:z.totalCheckins})]})]},z.uid)})}),s.filter(z=>!l.find(J=>J.uid===z.uid)).map(z=>h.jsxs("div",{className:"flex items-center gap-3 py-1 opacity-40",children:[h.jsx("span",{className:"font-display text-sm w-5 text-center flex-shrink-0 text-dark/30",children:"—"}),h.jsx("div",{className:"w-8 h-8 rounded-full bg-dark/10 border border-dark/15 flex items-center justify-center flex-shrink-0",children:h.jsx("span",{className:"font-display text-xs text-dark",children:z.firstName[0]})}),h.jsx("div",{className:"min-w-0 flex-1",children:h.jsxs("p",{className:"font-body text-dark text-sm",children:[z.firstName,z.uid===(n==null?void 0:n.uid)&&h.jsx("span",{className:"ml-1.5 text-neon text-xs",children:"(you)"})]})}),h.jsx("span",{className:"font-display text-sm text-dark/30",children:"0"})]},z.uid))]}),(T||r.description)&&h.jsxs("div",{className:"space-y-3 animate-slide-up-2 px-1",children:[T&&h.jsxs("div",{children:[h.jsx("p",{className:"label-light",children:"Your Mission"}),h.jsx("p",{className:"font-body text-dark text-base leading-relaxed",children:T.personalGoal||"—"}),T.personalGoal&&h.jsxs("p",{className:"font-body text-dark/40 text-sm mt-0.5",children:[T.targetFrequency,"× ",S(T.frequencyPeriod)]})]}),r.description&&h.jsxs("div",{className:T?"border-t border-dark/10 pt-3":"",children:[h.jsx("p",{className:"label-light",children:"Mission Brief"}),h.jsx("p",{className:"font-body text-dark/70 text-sm leading-relaxed",children:r.description})]})]}),r.status==="lobby"&&h.jsxs("div",{className:"space-y-3 animate-slide-up-1",children:[T&&!T.dossierComplete&&h.jsxs("button",{className:"btn-retro-xl w-full gap-2",onClick:()=>e(`/challenge/${t}/dossier`),children:[h.jsx(aV,{size:18,strokeWidth:1.8,"aria-hidden":"true"}),"File Your Roast Dossier"]}),(T==null?void 0:T.dossierComplete)&&h.jsxs("div",{className:"flex items-center justify-center gap-2 py-2",children:[h.jsx(ma,{size:15,className:"text-teal",strokeWidth:2,"aria-hidden":"true"}),h.jsx("span",{className:"font-display text-sm text-teal uppercase tracking-wider",children:"Dossier Filed"})]}),w&&h.jsxs("div",{className:"card-light space-y-3",children:[h.jsxs("div",{className:"flex items-center justify-between",children:[h.jsx("p",{className:"label-light",children:"Invite Code"}),h.jsx("span",{className:"font-display text-dark tracking-[0.3em] text-lg",children:w})]}),h.jsxs("div",{className:"flex gap-2",children:[h.jsxs("button",{className:`inline-flex items-center justify-center gap-2 flex-1 px-4 py-3
                               bg-dark text-cream font-body text-sm uppercase tracking-wider
                               rounded-full min-h-[44px] cursor-pointer
                               border-2 border-dark/20 transition-all duration-150 hover:bg-dark/80`,onClick:()=>void j(),children:[N?h.jsx(TI,{size:14,strokeWidth:2,"aria-hidden":"true"}):h.jsx(II,{size:14,strokeWidth:1.8,"aria-hidden":"true"}),N?"Copied!":"Copy Link"]}),h.jsxs("button",{className:`inline-flex items-center justify-center gap-2 flex-1 px-4 py-3
                               bg-dark text-cream font-body text-sm uppercase tracking-wider
                               rounded-full min-h-[44px] cursor-pointer
                               border-2 border-dark/20 transition-all duration-150 hover:bg-dark/80`,onClick:async()=>{try{await navigator.share({title:`Join my mission: ${r.name}`,text:"I'm starting a challenge on Accountabili-Buddies. Join me!",url:`${window.location.origin}/join/${w}`})}catch{j()}},children:[h.jsx(kI,{size:14,strokeWidth:1.8,"aria-hidden":"true"}),"Share"]})]})]}),h.jsxs("div",{className:"px-1 space-y-2",children:[h.jsxs("div",{className:"flex items-center gap-2",children:[h.jsx(ga,{size:14,className:"text-teal",strokeWidth:1.5,"aria-hidden":"true"}),h.jsxs("p",{className:"label-light mb-0",children:["Enlisted Recruits — ",s.length]})]}),s.length===0?h.jsx("p",{className:"font-body text-dark/40 text-sm",children:"No recruits yet."}):h.jsx("ul",{className:"divide-y divide-dark/8",children:s.map(z=>h.jsxs("li",{className:"flex items-center gap-3 py-2.5",children:[h.jsx("div",{className:"w-8 h-8 rounded-full bg-dark/10 border border-dark/15 flex items-center justify-center flex-shrink-0",children:h.jsx("span",{className:"font-display text-xs text-dark",children:z.firstName[0]})}),h.jsxs("div",{className:"min-w-0 flex-1",children:[h.jsxs("p",{className:"font-body text-dark text-sm",children:[z.firstName,z.uid===(n==null?void 0:n.uid)&&h.jsx("span",{className:"ml-1.5 text-neon text-xs",children:"(you)"})]}),z.personalGoal&&h.jsx("p",{className:"font-body text-dark/40 text-xs truncate leading-relaxed",children:z.personalGoal})]}),z.dossierComplete&&h.jsx(hV,{size:13,className:"flex-shrink-0 text-teal",strokeWidth:1.8,"aria-hidden":"true"})]},z.uid))})]}),v&&h.jsxs("div",{className:"space-y-2",children:[!x&&h.jsxs("p",{className:"font-body text-dark/50 text-sm text-center leading-relaxed",children:[A,"/",s.length," goals set before deploying"]}),!R&&x&&h.jsx("p",{className:"font-body text-dark/40 text-xs text-center",children:"You can deploy before all dossiers are filed."}),h.jsxs("button",{className:"btn-retro-xl w-full gap-3 disabled:opacity-40 disabled:cursor-not-allowed",onClick:()=>void L(),disabled:I||!x,children:[h.jsx(mV,{size:18,strokeWidth:1.8,"aria-hidden":"true"}),I?"Deploying…":"Deploy Mission"]})]})]})]})]})}const VV=[{key:"Fitness",label:"Fitness",Icon:oV},{key:"Finance",label:"Finance",Icon:sV},{key:"Health",label:"Health",Icon:lV},{key:"Reading",label:"Reading",Icon:nV},{key:"Mindfulness",label:"Mindfulness",Icon:cV},{key:"Nutrition",label:"Nutrition",Icon:vV},{key:"Sleep",label:"Sleep",Icon:pV},{key:"Habit",label:"Habit",Icon:yV}];function jV(){const t="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";return Array.from({length:6},()=>t[Math.floor(Math.random()*t.length)]).join("")}function MV(){const{currentUser:t}=sn(),e=ar(),[n,r]=D.useState(""),[i,s]=D.useState(""),[o,l]=D.useState("honor"),[u,c]=D.useState("private"),[f,m]=D.useState(""),[g,I]=D.useState(""),[C,N]=D.useState(!1),[P,w]=D.useState(null),[_,k]=D.useState(null),[b,j]=D.useState(!1),[L,T]=D.useState(!0),[v,E]=D.useState(""),[S,R]=D.useState("1"),[A,x]=D.useState("per_week"),[Y,ae]=D.useState(!1),[Ve,rt]=D.useState(null);async function $(K){if(K.preventDefault(),!!t){w(null),N(!0);try{const re=i==="ongoing",mt=re?null:parseInt(i,10),Ke=await qT(Bt(ee,"ab_challenges"),{name:n.trim(),creatorUid:t.uid,creatorFirstName:t.firstName,duration:mt,durationType:re?"ongoing":"fixed",visibility:u,proofType:o,category:g.trim(),description:f.trim(),status:"lobby",createdAt:Kn(),startDate:null}),Vt=jV();await Ai(me(ee,"ab_invites",Vt),{challengeId:Ke.id,createdAt:Kn()}),await Ai(me(ee,"ab_challenges",Ke.id,"members",t.uid),{uid:t.uid,firstName:t.firstName,personalGoal:"",targetFrequency:1,frequencyPeriod:"per_week",joinedAt:Kn(),dossierComplete:!1,friendIntelComplete:!1}),k({challengeId:Ke.id,code:Vt,inviteUrl:`${window.location.origin}/join/${Vt}`,challengeName:n.trim()})}catch(re){w(re instanceof Error?re.message:"Failed to create mission. Try again.")}finally{N(!1)}}}async function z(K){if(K.preventDefault(),!(!_||!t)){rt(null),ae(!0);try{await bc(me(ee,"ab_challenges",_.challengeId,"members",t.uid),{personalGoal:v.trim(),targetFrequency:parseInt(S,10),frequencyPeriod:A}),T(!1)}catch(re){rt(re instanceof Error?re.message:"Failed to save goal. Try again.")}finally{ae(!1)}}}async function J(){if(_)try{await navigator.share({title:`Join my mission: ${_.challengeName}`,text:"I'm starting a challenge on Accountabili-Buddies. Join me!",url:_.inviteUrl})}catch{await ce()}}async function ce(){_&&(await navigator.clipboard.writeText(_.inviteUrl),j(!0),setTimeout(()=>j(!1),2e3))}return _&&L?h.jsxs("div",{className:"flex flex-col",children:[h.jsx("div",{className:"zone-hero-compact pb-4 flex flex-col items-center",children:h.jsx(Et,{mood:"idle",size:"sm",headline:"SET YOUR GOAL"})}),h.jsx($e,{}),h.jsxs("div",{className:"zone-content space-y-4",children:[h.jsxs("p",{className:"font-body text-dark/60 text-sm leading-relaxed",children:["Before sharing the invite, set your own goal for"," ",h.jsx("span",{className:"font-semibold text-dark",children:_.challengeName}),"."]}),Ve&&h.jsx("p",{className:"font-body text-retro-red text-sm border border-retro-red/30 bg-retro-red/5 px-3 py-2 rounded-2xl",children:Ve}),h.jsxs("form",{onSubmit:K=>void z(K),className:"space-y-4",children:[h.jsxs("div",{children:[h.jsx("label",{htmlFor:"personalGoal",className:"label-light",children:"Your Goal"}),h.jsx("input",{id:"personalGoal",type:"text",value:v,onChange:K=>E(K.target.value),placeholder:"e.g. Run 3 times per week",required:!0,autoFocus:!0,className:"input-light"})]}),h.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[h.jsxs("div",{children:[h.jsx("label",{htmlFor:"targetFrequency",className:"label-light",children:"Target"}),h.jsx("input",{id:"targetFrequency",type:"number",min:"1",max:"99",value:S,onChange:K=>R(K.target.value),required:!0,className:"input-light"})]}),h.jsxs("div",{children:[h.jsx("label",{htmlFor:"frequencyPeriod",className:"label-light",children:"Period"}),h.jsxs("select",{id:"frequencyPeriod",value:A,onChange:K=>x(K.target.value),className:"input-light",children:[h.jsx("option",{value:"per_day",children:"Per Day"}),h.jsx("option",{value:"per_week",children:"Per Week"}),h.jsx("option",{value:"per_month",children:"Per Month"})]})]})]}),h.jsx("button",{type:"submit",disabled:Y||!v.trim(),className:"btn-retro w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed",children:Y?"Saving...":h.jsxs(h.Fragment,{children:["Save Goal & Get Invite Code ",h.jsx(Pi,{size:14})]})})]})]})]}):_?h.jsxs("div",{className:"flex flex-col",children:[h.jsx("div",{className:"zone-hero-compact pb-4 flex flex-col items-center",children:h.jsx(Et,{mood:"celebrate",size:"sm",headline:"MISSION CREATED"})}),h.jsx($e,{}),h.jsxs("div",{className:"zone-content space-y-4",children:[h.jsx("p",{className:"font-body text-dark/60 text-sm leading-relaxed text-center",children:"Your mission is ready. Enlist your buddies with this invite code."}),h.jsxs("div",{className:"card-light text-center py-5 space-y-2",children:[h.jsx("p",{className:"font-display text-3xl text-dark tracking-[0.4em] uppercase",children:_.code}),h.jsx("p",{className:"font-body text-dark/40 text-xs break-all px-4",children:_.inviteUrl})]}),h.jsxs("div",{className:"space-y-3",children:[h.jsxs("button",{className:"btn-retro w-full gap-2",onClick:()=>void J(),children:[h.jsx(kI,{size:16,strokeWidth:1.8}),"Share Invite Link"]}),h.jsxs("button",{className:`inline-flex items-center justify-center gap-2 w-full px-7 py-3.5
                         bg-dark text-cream font-body text-base uppercase tracking-wider
                         rounded-full min-h-[44px] cursor-pointer border-2 border-dark/20
                         transition-all duration-150 hover:bg-dark/80`,onClick:()=>void ce(),children:[b?h.jsx(TI,{size:16,strokeWidth:2}):h.jsx(II,{size:16,strokeWidth:1.8}),b?"Copied!":"Copy Link"]})]}),h.jsxs("button",{className:`inline-flex items-center justify-center gap-2 w-full px-7 py-3.5
                       bg-dark text-cream font-body text-base uppercase tracking-wider
                       rounded-full min-h-[44px] cursor-pointer border-2 border-dark/20
                       transition-all duration-150 hover:bg-dark/80`,onClick:()=>e(`/challenge/${_.challengeId}`),children:[h.jsx(Pi,{size:16,strokeWidth:1.8}),"View Mission Briefing"]})]})]}):h.jsxs("div",{className:"flex flex-col",children:[h.jsx("div",{className:"zone-hero-compact pb-4 flex flex-col items-center",children:h.jsx(Et,{mood:"idle",size:"sm",headline:"BUILD YOUR MISSION"})}),h.jsx($e,{}),h.jsxs("div",{className:"zone-content",children:[P&&h.jsx("p",{className:"font-body text-retro-red text-sm border border-retro-red/30 bg-retro-red/5 px-3 py-2 rounded-2xl mb-4",children:P}),h.jsxs("form",{onSubmit:K=>void $(K),className:"space-y-4",children:[h.jsxs("div",{children:[h.jsx("label",{htmlFor:"name",className:"label-light",children:"Mission Name"}),h.jsx("input",{id:"name",type:"text",value:n,onChange:K=>r(K.target.value),placeholder:"e.g. 30-Day Push-Up Challenge",required:!0,className:"input-light"})]}),h.jsxs("div",{children:[h.jsx("label",{htmlFor:"description",className:"label-light",children:"Description (optional)"}),h.jsx("textarea",{id:"description",rows:3,value:f,onChange:K=>m(K.target.value),placeholder:"Describe the rules and goal...",className:"input-light resize-none"})]}),h.jsxs("div",{children:[h.jsx("p",{className:"label-light",children:"Challenge Type"}),h.jsx("div",{className:"grid grid-cols-4 gap-2 mt-1",children:VV.map(({key:K,label:re,Icon:mt})=>{const Ke=g===K;return h.jsxs("button",{type:"button",onClick:()=>I(Ke?"":K),className:["flex flex-col items-center gap-1.5 py-3 border-2 rounded-2xl transition-colors duration-100",Ke?"border-neon bg-neon/15 text-dark":"border-dark/12 bg-white/50 text-dark/50 hover:border-dark/25"].join(" "),children:[h.jsx(mt,{size:20,strokeWidth:1.5,className:Ke?"text-neon":void 0}),h.jsx("span",{className:"font-display text-[9px] uppercase tracking-wide leading-none",children:re})]},K)})})]}),h.jsxs("div",{children:[h.jsx("label",{htmlFor:"duration",className:"label-light",children:"Duration"}),h.jsxs("select",{id:"duration",value:i,onChange:K=>s(K.target.value),required:!0,className:"input-light",children:[h.jsx("option",{value:"",children:"Select duration..."}),h.jsx("option",{value:"7",children:"7 days"}),h.jsx("option",{value:"14",children:"14 days"}),h.jsx("option",{value:"30",children:"30 days"}),h.jsx("option",{value:"60",children:"60 days"}),h.jsx("option",{value:"90",children:"90 days"}),h.jsx("option",{value:"ongoing",children:"Ongoing"})]})]}),h.jsxs("div",{children:[h.jsx("p",{className:"label-light",children:"Proof Required"}),h.jsxs("div",{className:"flex gap-3",children:[h.jsxs("label",{className:"flex items-center gap-2 cursor-pointer",children:[h.jsx("input",{type:"radio",name:"proofType",value:"honor",checked:o==="honor",onChange:()=>l("honor"),className:"accent-neon"}),h.jsx("span",{className:"font-body text-sm text-dark",children:"Honor System"})]}),h.jsxs("label",{className:"flex items-center gap-2 cursor-pointer",children:[h.jsx("input",{type:"radio",name:"proofType",value:"photo",checked:o==="photo",onChange:()=>l("photo"),className:"accent-neon"}),h.jsx("span",{className:"font-body text-sm text-dark",children:"Photo Required"})]})]})]}),h.jsxs("div",{children:[h.jsx("p",{className:"label-light",children:"Visibility"}),h.jsxs("div",{className:"flex gap-3",children:[h.jsxs("label",{className:"flex items-center gap-2 cursor-pointer",children:[h.jsx("input",{type:"radio",name:"visibility",value:"private",checked:u==="private",onChange:()=>c("private"),className:"accent-neon"}),h.jsx("span",{className:"font-body text-sm text-dark",children:"Private"})]}),h.jsxs("label",{className:"flex items-center gap-2 cursor-pointer",children:[h.jsx("input",{type:"radio",name:"visibility",value:"public",checked:u==="public",onChange:()=>c("public"),className:"accent-neon"}),h.jsx("span",{className:"font-body text-sm text-dark",children:"Public"})]})]})]}),h.jsx("button",{type:"submit",disabled:C,className:"btn-retro w-full disabled:opacity-50 disabled:cursor-not-allowed",children:C?"Creating Mission...":"Create Mission"})]})]})]})}function W_(){const{code:t}=lc(),e=ar(),{currentUser:n}=sn(),[r,i]=D.useState((t==null?void 0:t.toUpperCase())??""),[s,o]=D.useState({status:"idle"}),[l,u]=D.useState(""),[c,f]=D.useState("1"),[m,g]=D.useState("per_week"),[I,C]=D.useState(!1),[N,P]=D.useState(null);async function w(b){o({status:"loading"});try{const j=await Ze(me(ee,"ab_invites",b.toUpperCase()));if(!j.exists()){o({status:"not_found"});return}const{challengeId:L}=j.data();if(n&&(await Ze(me(ee,"ab_challenges",L,"members",n.uid))).exists()){o({status:"already_member",challengeId:L});return}const[T,v]=await Promise.all([Ze(me(ee,"ab_challenges",L)),Zt(Bt(ee,"ab_challenges",L,"members"))]);if(!T.exists()){o({status:"not_found"});return}const E=T.data();o({status:"found",challenge:{challengeId:L,name:E.name,creatorFirstName:E.creatorFirstName,duration:E.duration,durationType:E.durationType,proofType:E.proofType,description:E.description,memberCount:v.size}})}catch{o({status:"error",message:"Failed to look up invite code. Try again."})}}D.useEffect(()=>{t&&w(t)},[t]);function _(b){b.preventDefault(),r.length===6&&w(r)}async function k(b){if(b.preventDefault(),!(s.status!=="found"||!n)){P(null),C(!0);try{await Ai(me(ee,"ab_challenges",s.challenge.challengeId,"members",n.uid),{uid:n.uid,firstName:n.firstName,personalGoal:l.trim(),targetFrequency:parseInt(c,10),frequencyPeriod:m,joinedAt:Kn(),dossierComplete:!1,friendIntelComplete:!1}),e(`/challenge/${s.challenge.challengeId}`,{replace:!0})}catch{P("Failed to join mission. Try again.")}finally{C(!1)}}}return s.status==="already_member"?h.jsxs("div",{className:"flex flex-col",children:[h.jsx("div",{className:"zone-hero-compact pb-4 flex flex-col items-center",children:h.jsx(Et,{mood:"proud",size:"sm",headline:"ALREADY ENLISTED"})}),h.jsx($e,{}),h.jsxs("div",{className:"zone-content flex flex-col items-center text-center space-y-4 py-4",children:[h.jsx("p",{className:"font-body text-dark/60 text-sm",children:"You're already enlisted in this mission."}),h.jsxs("button",{className:"btn-retro gap-2",onClick:()=>e(`/challenge/${s.challengeId}`),children:[h.jsx(Pi,{size:16,strokeWidth:1.8}),"View Mission"]})]})]}):h.jsxs("div",{className:"flex flex-col",children:[h.jsx("div",{className:"zone-hero-compact pb-4 flex flex-col items-center",children:h.jsx(Et,{mood:s.status==="found"?"proud":"idle",size:"sm",headline:s.status==="found"?"MISSION FOUND":"JOIN THE FIGHT"})}),h.jsx($e,{}),h.jsxs("div",{className:"zone-content space-y-4",children:[s.status!=="found"&&h.jsxs("div",{className:"space-y-4",children:[h.jsx("p",{className:"font-body text-dark/60 text-sm leading-relaxed",children:"Got an invite code from a buddy? Enter it below to view the challenge briefing."}),h.jsxs("form",{onSubmit:_,className:"space-y-4",children:[h.jsxs("div",{children:[h.jsx("label",{htmlFor:"inviteCode",className:"label-light",children:"Invite Code"}),h.jsx("input",{id:"inviteCode",type:"text",value:r,onChange:b=>i(b.target.value.toUpperCase()),placeholder:"e.g. AB1X4Z",required:!0,maxLength:6,className:"input-light uppercase tracking-[0.3em] text-center text-lg"})]}),s.status==="not_found"&&h.jsxs("p",{className:"font-body text-retro-red text-sm border border-retro-red/30 bg-retro-red/5 px-3 py-2 rounded-2xl flex items-center gap-2",children:[h.jsx(Bu,{size:14,strokeWidth:2}),"Invite code not found. Check the code and try again."]}),s.status==="error"&&h.jsxs("p",{className:"font-body text-retro-red text-sm border border-retro-red/30 bg-retro-red/5 px-3 py-2 rounded-2xl flex items-center gap-2",children:[h.jsx(Bu,{size:14,strokeWidth:2}),s.message]}),h.jsx("button",{type:"submit",disabled:r.length!==6||s.status==="loading",className:"btn-retro w-full disabled:opacity-50 disabled:cursor-not-allowed",children:s.status==="loading"?"Looking up...":"Look Up Challenge"})]})]}),s.status==="found"&&h.jsxs(h.Fragment,{children:[h.jsxs("div",{className:"space-y-2",children:[h.jsx("h3",{className:"font-display text-xl text-dark uppercase leading-tight",children:s.challenge.name}),s.challenge.description&&h.jsx("p",{className:"font-body text-dark/60 text-sm leading-relaxed",children:s.challenge.description}),h.jsxs("div",{className:"grid grid-cols-2 gap-x-4 gap-y-2 pt-1",children:[h.jsxs("div",{children:[h.jsx("p",{className:"label-light",children:"Commander"}),h.jsx("p",{className:"font-body text-dark text-sm",children:s.challenge.creatorFirstName})]}),h.jsxs("div",{children:[h.jsx("p",{className:"label-light",children:"Duration"}),h.jsx("p",{className:"font-body text-dark text-sm",children:s.challenge.durationType==="ongoing"?"Ongoing":`${s.challenge.duration} days`})]}),h.jsxs("div",{children:[h.jsx("p",{className:"label-light",children:"Proof"}),h.jsx("p",{className:"font-body text-dark text-sm",children:s.challenge.proofType==="honor"?"Honor System":"Photo Required"})]}),h.jsxs("div",{children:[h.jsx("p",{className:"label-light",children:"Recruits"}),h.jsx("p",{className:"font-body text-dark text-sm",children:s.challenge.memberCount})]})]})]}),h.jsxs("form",{onSubmit:b=>void k(b),className:"space-y-4 border-t border-dark/10 pt-4",children:[h.jsx("p",{className:"label-light mb-0",children:"Set Your Mission"}),N&&h.jsx("p",{className:"font-body text-retro-red text-sm border border-retro-red/30 bg-retro-red/5 px-3 py-2 rounded-2xl",children:N}),h.jsxs("div",{children:[h.jsx("label",{htmlFor:"personalGoal",className:"label-light",children:"Your Goal"}),h.jsx("input",{id:"personalGoal",type:"text",value:l,onChange:b=>u(b.target.value),placeholder:"e.g. Run 3 times per week",required:!0,autoFocus:!0,className:"input-light"})]}),h.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[h.jsxs("div",{children:[h.jsx("label",{htmlFor:"targetFrequency",className:"label-light",children:"Target"}),h.jsx("input",{id:"targetFrequency",type:"number",min:"1",max:"99",value:c,onChange:b=>f(b.target.value),required:!0,className:"input-light"})]}),h.jsxs("div",{children:[h.jsx("label",{htmlFor:"frequencyPeriod",className:"label-light",children:"Period"}),h.jsxs("select",{id:"frequencyPeriod",value:m,onChange:b=>g(b.target.value),className:"input-light",children:[h.jsx("option",{value:"per_day",children:"Per Day"}),h.jsx("option",{value:"per_week",children:"Per Week"}),h.jsx("option",{value:"per_month",children:"Per Month"})]})]})]}),h.jsx("button",{type:"submit",disabled:I||!l.trim(),className:"btn-retro w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed",children:I?"Enlisting...":h.jsxs(h.Fragment,{children:["Enlist in Mission ",h.jsx(Pi,{size:14})]})})]})]})]})]})}function LV(){const{currentUser:t,signOut:e}=sn(),n=ar();async function r(){await e(),n("/login",{replace:!0})}const i=((t==null?void 0:t.firstName)??"R")[0].toUpperCase();return h.jsxs("div",{className:"flex flex-col",children:[h.jsxs("div",{className:"zone-hero pb-10 flex flex-col items-center gap-3",children:[h.jsx("div",{className:"w-28 h-28 rounded-full bg-dark-teal border-4 border-neon flex items-center justify-center animate-fade-in shadow-glow",children:h.jsx("span",{className:"font-display text-5xl text-cream leading-none",children:i})}),h.jsxs("div",{className:"text-center animate-slide-up",children:[h.jsx("p",{className:"font-body text-cream/40 text-xs uppercase tracking-[0.25em]",children:"Agent"}),h.jsx("h2",{className:"font-display text-4xl text-cream uppercase tracking-wide leading-tight",children:(t==null?void 0:t.firstName)??"Recruit"}),(t==null?void 0:t.phone)&&h.jsx("p",{className:"font-body text-cream/40 text-sm mt-1",children:t.phone})]})]}),h.jsx($e,{}),h.jsxs("div",{className:"zone-content space-y-4",children:[h.jsx("div",{className:"grid grid-cols-3 gap-3 animate-slide-up",children:[{label:"Missions",value:"—"},{label:"Completed",value:"—"},{label:"Best Streak",value:"—"}].map(({label:s,value:o},l)=>h.jsxs("div",{className:"card-light text-center py-4",style:{animationDelay:`${l*50}ms`},children:[h.jsx("p",{className:"font-display text-2xl text-neon",children:o}),h.jsx("p",{className:"font-body text-dark/50 text-xs uppercase tracking-wide mt-1 leading-relaxed",children:s})]},s))}),h.jsxs("div",{className:"space-y-3 animate-slide-up-2",children:[h.jsxs("button",{className:`inline-flex items-center justify-center gap-2 w-full px-7 py-4
                       bg-dark text-cream font-body text-base uppercase tracking-wider
                       rounded-full min-h-[44px] cursor-pointer border-2 border-dark/20
                       transition-all duration-150 hover:bg-dark/90`,children:[h.jsx(gV,{size:16,strokeWidth:1.8,"aria-hidden":"true"}),"Settings"]}),h.jsxs("button",{className:`inline-flex items-center justify-center gap-2 w-full px-7 py-4
                       bg-retro-red text-cream font-body text-base uppercase tracking-wider
                       rounded-full min-h-[44px] cursor-pointer
                       transition-all duration-150 hover:brightness-110 active:scale-[0.97]`,style:{boxShadow:"inset 0 -3px 0 rgba(0,0,0,0.22)"},onClick:()=>void r(),children:[h.jsx(fV,{size:16,strokeWidth:1.8,"aria-hidden":"true"}),"Sign Out"]})]})]})]})}function FV(){const{id:t}=lc(),e=ar(),{currentUser:n}=sn(),[r,i]=D.useState(!0),[s,o]=D.useState(null),[l,u]=D.useState(""),[c,f]=D.useState([]),[m,g]=D.useState(!1),[I,C]=D.useState(""),[N,P]=D.useState(""),[w,_]=D.useState({}),[k,b]=D.useState(!1),[j,L]=D.useState(null);D.useEffect(()=>{if(!t||!n)return;async function E(){try{const[S,R]=await Promise.all([Ze(me(ee,"ab_challenges",t)),Zt(Bt(ee,"ab_challenges",t,"members"))]);if(!S.exists()){o("Mission not found.");return}u(S.data().name);const A=R.docs.find(ae=>ae.id===n.uid);if(A!=null&&A.data().dossierComplete){g(!0);return}const x=R.docs.filter(ae=>ae.id!==n.uid).map(ae=>({uid:ae.id,firstName:ae.data().firstName}));f(x);const Y={};x.forEach(ae=>{Y[ae.uid]=""}),_(Y)}catch{o("Failed to load mission data.")}finally{i(!1)}}E()},[t,n]);async function T(E){if(E.preventDefault(),!(!t||!n)){L(null),b(!0);try{await Ai(me(ee,"ab_challenges",t,"dossiers",n.uid),{uid:n.uid,firstName:n.firstName,goToExcuse:I.trim(),biggestWeakness:N.trim(),friendIntel:Object.fromEntries(Object.entries(w).map(([S,R])=>[S,R.trim()])),completedAt:Kn()}),await bc(me(ee,"ab_challenges",t,"members",n.uid),{dossierComplete:!0,friendIntelComplete:!0}),e(`/challenge/${t}`,{replace:!0})}catch{L("Failed to save dossier. Try again.")}finally{b(!1)}}}if(r)return h.jsxs("div",{className:"flex flex-col",children:[h.jsxs("div",{className:"zone-hero-compact pb-4 flex flex-col items-center gap-3",children:[h.jsx("div",{className:"skeleton w-24 h-24 rounded-full"}),h.jsx("div",{className:"skeleton w-48 h-6 rounded-xl"})]}),h.jsx($e,{}),h.jsxs("div",{className:"zone-content space-y-3",children:[h.jsx("div",{className:"skeleton h-20 rounded-2xl"}),h.jsx("div",{className:"skeleton h-20 rounded-2xl"})]})]});if(s)return h.jsxs("div",{className:"flex flex-col",children:[h.jsx("div",{className:"zone-hero-compact pb-4 flex flex-col items-center",children:h.jsx(Et,{mood:"idle",size:"sm",headline:"SPILL THE BEANS"})}),h.jsx($e,{}),h.jsx("div",{className:"zone-content",children:h.jsx("div",{className:"card-light text-center py-8",children:h.jsx("p",{className:"font-body text-retro-red text-sm",children:s})})})]});if(m)return h.jsxs("div",{className:"flex flex-col",children:[h.jsx("div",{className:"zone-hero-compact pb-4 flex flex-col items-center",children:h.jsx(Et,{mood:"proud",size:"sm",headline:"DOSSIER ON FILE"})}),h.jsx($e,{}),h.jsxs("div",{className:"zone-content flex flex-col items-center text-center space-y-4 py-4",children:[h.jsx(ma,{size:32,className:"text-teal",strokeWidth:1.5}),h.jsx("p",{className:"font-body text-dark/50 text-sm",children:"Your intel has been recorded."}),h.jsxs("button",{className:`inline-flex items-center justify-center gap-2 px-7 py-3.5
                       bg-dark text-cream font-body text-base uppercase tracking-wider
                       rounded-full min-h-[44px] cursor-pointer border-2 border-dark/20
                       transition-all duration-150 hover:bg-dark/80`,onClick:()=>e(`/challenge/${t}`),children:[h.jsx(z_,{size:15,strokeWidth:1.8}),"Back to Mission"]})]})]});const v=c.length>0;return h.jsxs("div",{className:"flex flex-col",children:[h.jsxs("div",{className:"zone-hero-compact pb-4 flex flex-col items-center",children:[h.jsx(Et,{mood:"idle",size:"sm",headline:"SPILL THE BEANS"}),h.jsxs("p",{className:"font-body text-cream/40 text-xs uppercase tracking-wider mt-1",children:["Mission: ",l]})]}),h.jsx($e,{}),h.jsxs("div",{className:"zone-content space-y-4",children:[h.jsxs("p",{className:"font-body text-dark/60 text-sm leading-relaxed",children:["This intel will be used to keep your squad honest."," ",h.jsx("span",{className:"font-semibold text-dark",children:"Your buddies will see it."})]}),j&&h.jsxs("p",{className:"font-body text-retro-red text-sm border border-retro-red/30 bg-retro-red/5 px-3 py-2 rounded-2xl flex items-center gap-2",children:[h.jsx(Bu,{size:14,strokeWidth:2}),j]}),h.jsxs("form",{onSubmit:E=>void T(E),className:"space-y-4",children:[h.jsxs("div",{className:"space-y-3",children:[h.jsxs("div",{children:[h.jsx("p",{className:"label-light",children:"Your Self-Dossier"}),h.jsx("p",{className:"font-body text-dark/40 text-xs",children:"Dirt on yourself — your buddies will use this."})]}),h.jsxs("div",{children:[h.jsx("label",{htmlFor:"goToExcuse",className:"label-light",children:"Your Go-To Excuse"}),h.jsx("input",{id:"goToExcuse",type:"text",value:I,onChange:E=>C(E.target.value),placeholder:'e.g. "I was too tired from work"',required:!0,className:"input-light"})]}),h.jsxs("div",{children:[h.jsx("label",{htmlFor:"biggestWeakness",className:"label-light",children:"Biggest Weakness / Distraction"}),h.jsx("input",{id:"biggestWeakness",type:"text",value:N,onChange:E=>P(E.target.value),placeholder:'e.g. "Late-night Netflix binges"',required:!0,className:"input-light"})]})]}),v&&h.jsxs("div",{className:"space-y-3 border-t border-dark/10 pt-4",children:[h.jsxs("div",{children:[h.jsx("p",{className:"label-light",children:"Intel on Your Buddies"}),h.jsx("p",{className:"font-body text-dark/40 text-xs",children:"One juicy fact per person — the more specific, the better."})]}),c.map(E=>h.jsxs("div",{children:[h.jsx("label",{htmlFor:`intel-${E.uid}`,className:"label-light",children:E.firstName}),h.jsx("input",{id:`intel-${E.uid}`,type:"text",value:w[E.uid]??"",onChange:S=>_(R=>({...R,[E.uid]:S.target.value})),placeholder:`Something embarrassing about ${E.firstName}...`,required:!0,className:"input-light"})]},E.uid))]}),h.jsx("button",{type:"submit",disabled:k,className:"btn-retro w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed",children:k?"Filing Dossier...":h.jsxs(h.Fragment,{children:["File Dossier ",h.jsx(z_,{size:15,strokeWidth:2})]})})]})]})]})}async function UV(t){await qT(Bt(ee,"ab_notifications"),{...t,read:!1,createdAt:Kn()})}async function zV(t){const{checkinName:e,checkinGoal:n,challengeId:r,challengeName:i,otherMembers:s}=t;await Promise.all(s.map(o=>{const l=CI(AI(AV),{recipientName:o.firstName,checkinName:e,checkinGoal:n,goToExcuse:o.goToExcuse??"I was too tired",biggestWeakness:o.biggestWeakness??"procrastination"});return UV({recipientUid:o.uid,type:"checkin_blast",message:l,challengeId:r,challengeName:i})}))}function BV(){const t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}function $V(){const{id:t}=lc(),e=ar(),{currentUser:n}=sn(),[r,i]=D.useState(!0),[s,o]=D.useState(!1),[l,u]=D.useState(""),[c,f]=D.useState(""),[m,g]=D.useState([]),[I,C]=D.useState(""),[N,P]=D.useState(!1),[w,_]=D.useState(null),k=BV();D.useEffect(()=>{if(!t||!n)return;async function j(){try{const[L,T,v,E]=await Promise.all([Ze(me(ee,"ab_challenges",t)),Ze(me(ee,"ab_challenges",t,"checkins",`${n.uid}_${k}`)),Ze(me(ee,"ab_challenges",t,"members",n.uid)),Zt(Bt(ee,"ab_challenges",t,"members"))]);if(L.exists()&&u(L.data().name),v.exists()&&f(v.data().personalGoal??""),T.exists()){o(!0);return}const S=E.docs.filter(A=>A.id!==n.uid),R=await Promise.all(S.map(async A=>{const x=await Ze(me(ee,"ab_challenges",t,"dossiers",A.id)),Y=x.exists()?x.data():null;return{uid:A.id,firstName:A.data().firstName,personalGoal:A.data().personalGoal,goToExcuse:Y==null?void 0:Y.goToExcuse,biggestWeakness:Y==null?void 0:Y.biggestWeakness}}));g(R)}catch{_("Failed to load check-in data.")}finally{i(!1)}}j()},[t,n,k]);async function b(j){if(j.preventDefault(),!(!t||!n)){_(null),P(!0);try{const L=me(ee,"ab_challenges",t,"checkins",`${n.uid}_${k}`),T=me(ee,"ab_challenges",t,"leaderboard",n.uid);await Ai(L,{uid:n.uid,firstName:n.firstName,date:k,note:I.trim(),createdAt:Kn()}),(await Ze(T)).exists()?await bc(T,{totalCheckins:ZD(1),lastCheckinDate:k}):await Ai(T,{uid:n.uid,firstName:n.firstName,totalCheckins:1,lastCheckinDate:k}),m.length>0&&zV({checkinUid:n.uid,checkinName:n.firstName,checkinGoal:c||"their mission goal",challengeId:t,challengeName:l,otherMembers:m}),e(`/challenge/${t}`,{replace:!0})}catch{_("Failed to log check-in. Try again.")}finally{P(!1)}}}return r?h.jsxs("div",{className:"flex flex-col",children:[h.jsxs("div",{className:"zone-hero-compact pb-4 flex flex-col items-center gap-3",children:[h.jsx("div",{className:"skeleton w-24 h-24 rounded-full"}),h.jsx("div",{className:"skeleton w-48 h-6 rounded-xl"})]}),h.jsx($e,{}),h.jsxs("div",{className:"zone-content space-y-3",children:[h.jsx("div",{className:"skeleton h-20 rounded-2xl"}),h.jsx("div",{className:"skeleton h-12 rounded-full"})]})]}):s?h.jsxs("div",{className:"flex flex-col",children:[h.jsx("div",{className:"zone-hero-compact pb-4 flex flex-col items-center",children:h.jsx(Et,{mood:"proud",size:"sm",headline:"MISSION LOGGED"})}),h.jsx($e,{}),h.jsxs("div",{className:"zone-content flex flex-col items-center text-center space-y-4 py-4",children:[h.jsx(ma,{size:36,className:"text-teal",strokeWidth:1.5}),h.jsx("p",{className:"font-body text-dark/50 text-sm",children:"Come back tomorrow, soldier."}),h.jsxs("button",{className:`inline-flex items-center justify-center gap-2 px-7 py-3.5
                       bg-dark text-cream font-body text-base uppercase tracking-wider
                       rounded-full min-h-[44px] cursor-pointer border-2 border-dark/20
                       transition-all duration-150 hover:bg-dark/80`,onClick:()=>e(`/challenge/${t}`),children:[h.jsx(U_,{size:15,strokeWidth:1.8}),"Back to Mission"]})]})]}):h.jsxs("div",{className:"flex flex-col",children:[h.jsxs("div",{className:"zone-hero-compact pb-4 flex flex-col items-center",children:[h.jsx(Et,{mood:"lagging",size:"sm",headline:"TIME TO SHOW UP"}),l&&h.jsx("p",{className:"font-body text-cream/50 text-sm mt-1",children:l}),c&&h.jsx("p",{className:"font-body text-cream/30 text-xs mt-0.5",children:c})]}),h.jsx($e,{}),h.jsxs("div",{className:"zone-content space-y-4",children:[w&&h.jsxs("p",{className:"font-body text-retro-red text-sm border border-retro-red/30 bg-retro-red/5 px-3 py-2 rounded-2xl flex items-center gap-2",children:[h.jsx(Bu,{size:14,strokeWidth:2}),w]}),h.jsxs("form",{onSubmit:j=>void b(j),className:"space-y-4",children:[h.jsxs("div",{children:[h.jsx("label",{htmlFor:"note",className:"label-light",children:"Note (optional)"}),h.jsx("textarea",{id:"note",rows:3,value:I,onChange:j=>C(j.target.value),placeholder:"What did you do? Any victories or struggles to report...",className:"input-light resize-none"})]}),h.jsxs("button",{type:"submit",disabled:N,className:"btn-retro w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed",children:[h.jsx(ma,{size:15,strokeWidth:2}),N?"Logging...":"Log Check-In"]}),h.jsxs("button",{type:"button",className:`inline-flex items-center justify-center gap-2 w-full px-7 py-3.5
                       bg-dark text-cream font-body text-base uppercase tracking-wider
                       rounded-full min-h-[44px] cursor-pointer border-2 border-dark/20
                       transition-all duration-150 hover:bg-dark/80`,onClick:()=>e(`/challenge/${t}`),children:[h.jsx(U_,{size:15,strokeWidth:1.8}),"Cancel"]})]})]})]})}function WV(t){if(!t)return"";const e=t.toDate(),r=new Date().getTime()-e.getTime(),i=Math.floor(r/6e4);if(i<1)return"just now";if(i<60)return`${i}m ago`;const s=Math.floor(i/60);if(s<24)return`${s}h ago`;const o=Math.floor(s/24);return o===1?"yesterday":`${o}d ago`}function HV(){const{currentUser:t}=sn(),[e,n]=D.useState([]),[r,i]=D.useState(!0);return D.useEffect(()=>{if(!t)return;async function s(){try{const l=(await Zt(Fr(Bt(ee,"ab_notifications"),dn("recipientUid","==",t.uid),WT("createdAt","desc")))).docs.map(c=>({id:c.id,...c.data()}));n(l);const u=l.filter(c=>!c.read);if(u.length>0){const c=KT(ee);u.forEach(f=>c.update(me(ee,"ab_notifications",f.id),{read:!0})),c.commit()}}catch(o){console.error("Failed to load notifications",o)}finally{i(!1)}}s()},[t]),h.jsxs("div",{className:"flex flex-col",children:[h.jsx("div",{className:"zone-hero-compact pb-4 flex flex-col items-center",children:h.jsx(Et,{mood:"idle",size:"sm",headline:"YOUR DISPATCHES"})}),h.jsx($e,{}),h.jsx("div",{className:"zone-content",children:r?h.jsx("div",{className:"flex items-center justify-center py-16",children:h.jsx("p",{className:"font-display text-dark/50 uppercase tracking-widest text-sm animate-pulse",children:"Loading..."})}):e.length===0?h.jsxs("div",{className:"flex flex-col items-center text-center py-12 space-y-2",children:[h.jsx(Am,{size:28,className:"text-dark/20",strokeWidth:1.5}),h.jsx("p",{className:"font-display text-dark/40 uppercase tracking-wider text-sm",children:"No dispatches yet."}),h.jsx("p",{className:"font-body text-dark/30 text-xs",children:"Check in to a mission and your buddies will hear about it."})]}):h.jsx("ul",{className:"space-y-2",children:e.map(s=>h.jsx("li",{children:h.jsx(cn,{to:`/challenge/${s.challengeId}`,className:["block card-light hover:bg-white/50 transition-colors duration-150",s.read?"":"border-l-4 border-l-neon"].join(" "),children:h.jsxs("div",{className:"flex items-start gap-3",children:[h.jsxs("div",{className:"flex-1 min-w-0",children:[h.jsxs("p",{className:"font-display text-[10px] text-dark/40 uppercase tracking-wider mb-1",children:[s.challengeName," · ",WV(s.createdAt)]}),h.jsx("p",{className:"font-body text-dark text-sm leading-relaxed",children:s.message})]}),h.jsx(Pi,{size:14,className:"flex-shrink-0 text-dark/20 mt-1",strokeWidth:1.5})]})})},s.id))})})]})}function H_(t){const e=new Date(t);e.setUTCHours(0,0,0,0),e.setUTCDate(e.getUTCDate()+3-(e.getUTCDay()+6)%7);const n=new Date(Date.UTC(e.getUTCFullYear(),0,4)),r=1+Math.round(((e.getTime()-n.getTime())/864e5-3+(n.getUTCDay()+6)%7)/7);return`${e.getUTCFullYear()}-W${String(r).padStart(2,"0")}`}function qV(t,e){const n=new Date(t+"T00:00:00Z"),r=new Date(e+"T00:00:00Z"),i=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${i[n.getUTCMonth()]} ${n.getUTCDate()} – ${i[r.getUTCMonth()]} ${r.getUTCDate()}, ${r.getUTCFullYear()}`}function GV(){const{currentUser:t}=sn(),[e,n]=D.useState([]),[r,i]=D.useState(!0),[s,o]=D.useState("");return D.useEffect(()=>{if(!t)return;const l=H_(new Date);o(l);async function u(){try{const f=(await Zt(Fr(OT(ee,"members"),dn("uid","==",t.uid)))).docs.map(I=>I.ref.parent.parent.id);if(f.length===0){n([]);return}const m=[];for(let I=0;I<f.length;I+=30)m.push(f.slice(I,I+30));const g=[];for(const I of m)(await Zt(Fr(Bt(ee,"ab_dispatches"),dn("weekId","==",l),dn("challengeId","in",I)))).docs.forEach(N=>g.push({dispatchId:N.id,...N.data()}));if(g.length===0){const I=new Date;I.setUTCDate(I.getUTCDate()-7);const C=H_(I);for(const N of m)(await Zt(Fr(Bt(ee,"ab_dispatches"),dn("weekId","==",C),dn("challengeId","in",N)))).docs.forEach(w=>g.push({dispatchId:w.id,...w.data()}));g.length>0&&o(C)}for(const I of g)for(const C of I.leaderboard)if(!C.firstName){const N=await Ze(me(ee,"ab_users",C.uid));N.exists()&&(C.firstName=N.data().firstName??"Recruit")}n(g)}catch(c){console.error("Failed to load dispatches",c)}finally{i(!1)}}u()},[t]),h.jsxs("div",{className:"flex flex-col",children:[h.jsxs("div",{className:"zone-hero-compact pb-4 flex flex-col items-center",children:[h.jsx(Et,{mood:"idle",size:"sm",headline:"WEEKLY DISPATCH"}),s&&h.jsx("p",{className:"font-body text-cream/50 text-xs uppercase tracking-wider mt-1",children:s})]}),h.jsx($e,{}),h.jsx("div",{className:"zone-content",children:r?h.jsx("div",{className:"flex items-center justify-center py-16",children:h.jsx("p",{className:"font-display text-dark/50 uppercase tracking-widest text-sm animate-pulse",children:"Decrypting..."})}):e.length===0?h.jsxs("div",{className:"flex flex-col items-center text-center py-12 space-y-3",children:[h.jsx(xI,{size:32,className:"text-dark/20",strokeWidth:1.5}),h.jsx("p",{className:"font-display text-dark/40 uppercase tracking-wider text-sm",children:"No dispatches yet."}),h.jsx("p",{className:"font-body text-dark/30 text-xs max-w-xs",children:"Dispatches are generated Sunday evening. Check back after your first full week of missions."})]}):h.jsx("div",{className:"space-y-6",children:e.map(l=>{const u=l.leaderboard.find(m=>m.uid===(t==null?void 0:t.uid)),c=l.leaderboard.findIndex(m=>m.uid===(t==null?void 0:t.uid))+1,f=l.leaderboard[0];return h.jsxs("article",{className:"space-y-3",children:[h.jsxs("div",{className:"border-b border-dark/15 pb-2",children:[h.jsx("p",{className:"font-display text-[9px] text-dark/30 uppercase tracking-widest",children:"Mission Report"}),h.jsx("h3",{className:"font-display text-xl text-dark uppercase tracking-wide leading-tight",children:l.challengeName}),l.weekStart&&l.weekEnd&&h.jsx("p",{className:"font-body text-[10px] text-dark/40 mt-0.5",children:qV(l.weekStart,l.weekEnd)})]}),u&&h.jsxs("div",{className:"card-light",children:[h.jsx("p",{className:"font-display text-[9px] text-dark/40 uppercase tracking-widest mb-1",children:"Your Standing"}),h.jsxs("div",{className:"flex items-center justify-between",children:[h.jsxs("div",{children:[h.jsxs("span",{className:"font-display text-dark text-base",children:["#",c," of ",l.totalMembers]}),h.jsx("span",{className:"font-body text-dark/50 text-xs ml-2",children:u.weekCheckins>0?`${u.weekCheckins} check-in${u.weekCheckins!==1?"s":""} this week`:"No check-ins this week"})]}),h.jsx(SI,{size:18,strokeWidth:1.5,className:c===1?"text-neon":"text-dark/20",fill:c===1?"#E7F53C":"none"})]}),c>1&&f&&h.jsxs("p",{className:"font-body text-xs text-dark/40 mt-1",children:[f.firstName," leads with ",f.totalCheckins," total."," ",u.totalCheckins<f.totalCheckins?`You're ${f.totalCheckins-u.totalCheckins} behind.`:""]})]}),h.jsxs("div",{className:"card-light p-0 overflow-hidden",children:[h.jsx("div",{className:"px-3 py-2 border-b border-dark/8",children:h.jsx("p",{className:"font-display text-[9px] text-dark/40 uppercase tracking-widest",children:"Full Rankings"})}),h.jsx("ul",{className:"divide-y divide-dark/5",children:l.leaderboard.map((m,g)=>h.jsxs("li",{className:["flex items-center gap-3 px-3 py-2.5",m.uid===(t==null?void 0:t.uid)?"bg-neon/10":""].join(" "),children:[h.jsx("span",{className:"font-display text-xs text-dark/30 w-5 text-right flex-shrink-0",children:g+1}),h.jsx($u,{size:14,strokeWidth:1.5,className:m.weekCheckins>0?"text-neon flex-shrink-0":"text-dark/20 flex-shrink-0",fill:m.weekCheckins>0?"#E7F53C":"none"}),h.jsx("div",{className:"flex-1 min-w-0",children:h.jsxs("span",{className:"font-display text-dark text-sm",children:[m.firstName,m.uid===(t==null?void 0:t.uid)&&h.jsx("span",{className:"ml-1 font-body text-[9px] text-neon uppercase tracking-wider",children:"(you)"})]})}),h.jsxs("div",{className:"text-right flex-shrink-0",children:[h.jsx("span",{className:"font-display text-dark text-sm",children:m.totalCheckins}),h.jsx("span",{className:"font-body text-dark/30 text-[10px] ml-1",children:"total"}),m.weekCheckins>0&&h.jsxs("span",{className:"block font-body text-[9px] text-neon",children:["+",m.weekCheckins," this week"]})]})]},m.uid))})]})]},l.dispatchId)})})})]})}function KV(){return h.jsx(JO,{children:h.jsxs(AC,{children:[h.jsx(xt,{path:"/login",element:h.jsx(CV,{})}),h.jsx(xt,{element:h.jsx(XO,{}),children:h.jsxs(xt,{element:h.jsx(IV,{}),children:[h.jsx(xt,{path:"/",element:h.jsx(bV,{})}),h.jsx(xt,{path:"/challenge/:id",element:h.jsx(OV,{})}),h.jsx(xt,{path:"/challenge/:id/dossier",element:h.jsx(FV,{})}),h.jsx(xt,{path:"/challenge/:id/checkin",element:h.jsx($V,{})}),h.jsx(xt,{path:"/create",element:h.jsx(MV,{})}),h.jsx(xt,{path:"/join",element:h.jsx(W_,{})}),h.jsx(xt,{path:"/join/:code",element:h.jsx(W_,{})}),h.jsx(xt,{path:"/notifications",element:h.jsx(HV,{})}),h.jsx(xt,{path:"/dispatch",element:h.jsx(GV,{})}),h.jsx(xt,{path:"/profile",element:h.jsx(LV,{})})]})})]})})}iE(document.getElementById("root")).render(h.jsx(D.StrictMode,{children:h.jsx(jC,{basename:"/accountabili-buddies/",children:h.jsx(KV,{})})}));
