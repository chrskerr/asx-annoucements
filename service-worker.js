if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let i=Promise.resolve();return r[e]||(i=new Promise((async i=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=i}else importScripts(e),i()}))),i.then((()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]}))},i=(i,r)=>{Promise.all(i.map(e)).then((e=>r(1===e.length?e[0]:e)))},r={require:Promise.resolve(i)};self.define=(i,s,a)=>{r[i]||(r[i]=Promise.resolve().then((()=>{let r={};const c={uri:location.origin+i.slice(1)};return Promise.all(s.map((i=>{switch(i){case"exports":return r;case"module":return c;default:return e(i)}}))).then((e=>{const i=a(...e);return r.default||(r.default=i),r}))})))}}define("./service-worker.js",["./workbox-322fe734"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"200.html",revision:"4b05fccc0ad6636109f47adddb5517f9"},{url:"android-chrome-192x192.png",revision:"bc8798e01facd4a4fe2d39d119d65107"},{url:"android-chrome-512x512.png",revision:"349ea33ed077506845aa1c13844ab96f"},{url:"apple-touch-icon.png",revision:"f6c5ea81196f12ea135a550713cc4eb4"},{url:"asset-manifest.json",revision:"256f5abd9751ed60f71e86b31c5503e6"},{url:"browserconfig.xml",revision:"287419f7ecaf619dce044c60c9df248e"},{url:"favicon-16x16.png",revision:"129ce127564f9c3b76ccfe577e68a8a7"},{url:"favicon-32x32.png",revision:"c4b171f208aa87cad8429289c8e6d351"},{url:"favicon.ico",revision:"38c54ed395f8e729e85091d419121b6d"},{url:"index.html",revision:"9efee9823c206f889b9999ac5f9a7ca6"},{url:"mstile-150x150.png",revision:"eaaf2e43c983e9bc70106daf4b38b932"},{url:"robots.txt",revision:"fa1ded1ed7c11438a9b0385b1e112850"},{url:"safari-pinned-tab.svg",revision:"fdd2fb936e0607b0d9b8c919513f337a"},{url:"site.webmanifest",revision:"28f79ef8c97d728c209ade70a3e1afd3"},{url:"static/css/main.4b41ad31.chunk.css",revision:"ea6528ea37be3532202e7292b615a1ea"},{url:"static/js/2.4fa1a715.chunk.js",revision:"ab7689cd5b1491f7d7571a6f13eda653"},{url:"static/js/2.4fa1a715.chunk.js.LICENSE.txt",revision:"759a3f7c8e458fcc52437d4ccc03a959"},{url:"static/js/main.e82e4feb.chunk.js",revision:"4fada411b0a09e3bdfa6e6a1814f38de"},{url:"static/js/runtime-main.32ef3c0e.js",revision:"250ab8f7609832319715ce492134e0a1"}],{})}));
//# sourceMappingURL=service-worker.js.map