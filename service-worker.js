if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let i=Promise.resolve();return c[e]||(i=new Promise((async i=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=i}else importScripts(e),i()}))),i.then((()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]}))},i=(i,c)=>{Promise.all(i.map(e)).then((e=>c(1===e.length?e[0]:e)))},c={require:Promise.resolve(i)};self.define=(i,r,s)=>{c[i]||(c[i]=Promise.resolve().then((()=>{let c={};const a={uri:location.origin+i.slice(1)};return Promise.all(r.map((i=>{switch(i){case"exports":return c;case"module":return a;default:return e(i)}}))).then((e=>{const i=s(...e);return c.default||(c.default=i),c}))})))}}define("./service-worker.js",["./workbox-322fe734"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"android-chrome-192x192.png",revision:"bc8798e01facd4a4fe2d39d119d65107"},{url:"android-chrome-512x512.png",revision:"349ea33ed077506845aa1c13844ab96f"},{url:"apple-touch-icon.png",revision:"f6c5ea81196f12ea135a550713cc4eb4"},{url:"asset-manifest.json",revision:"36731dc2eaa592c1aa237229aa558534"},{url:"browserconfig.xml",revision:"287419f7ecaf619dce044c60c9df248e"},{url:"favicon-16x16.png",revision:"129ce127564f9c3b76ccfe577e68a8a7"},{url:"favicon-32x32.png",revision:"c4b171f208aa87cad8429289c8e6d351"},{url:"favicon.ico",revision:"38c54ed395f8e729e85091d419121b6d"},{url:"index.html",revision:"71cfdee5862ce6fa17704186182757a8"},{url:"mstile-150x150.png",revision:"eaaf2e43c983e9bc70106daf4b38b932"},{url:"robots.txt",revision:"fa1ded1ed7c11438a9b0385b1e112850"},{url:"safari-pinned-tab.svg",revision:"fdd2fb936e0607b0d9b8c919513f337a"},{url:"site.webmanifest",revision:"28f79ef8c97d728c209ade70a3e1afd3"},{url:"static/css/main.2824dccf.chunk.css",revision:"9e7187591576f1696d74a8ee44fa638d"},{url:"static/js/2.d591db9f.chunk.js",revision:"805f71b675cd53b52bc21746ecd9909e"},{url:"static/js/2.d591db9f.chunk.js.LICENSE.txt",revision:"f0a3f3b3c74dc5cc664156ab7d78aedb"},{url:"static/js/3.41a9cb97.chunk.js",revision:"12986dd777134d8283a65f9911c920ee"},{url:"static/js/3.41a9cb97.chunk.js.LICENSE.txt",revision:"d38d125ad2a6111830c14c1d5e1347e8"},{url:"static/js/4.5f5b6a6e.chunk.js",revision:"877e8ecb206fe765aec27bd8cc5d83f7"},{url:"static/js/main.f1f99b1a.chunk.js",revision:"9b8cad5b947b38d3f9ec52353540a5e4"},{url:"static/js/runtime-main.3b49a227.js",revision:"d248abe92a850e2f9d80b63fb8e385c2"}],{})}));
//# sourceMappingURL=service-worker.js.map
