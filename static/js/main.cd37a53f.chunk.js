(this["webpackJsonpasx-annoucements"]=this["webpackJsonpasx-annoucements"]||[]).push([[0],{46:function(e,a,t){e.exports=t(69)},51:function(e,a,t){},69:function(e,a,t){"use strict";t.r(a);var n=t(2),c=t.n(n),r=t(37),l=t.n(r),i=(t(51),t(20)),s=t(18),o=t(23),d=t(38),u=(t(52),t(31)),m=t(28),b=t(29),p=t(17),v=t.n(p),E=t(39),h=t.n(E),O=t(71),_=t(76),f=t(75),j=t(72),k=t(74),g=t(73);function y(){var e=Object(d.a)(["\nsubscription SubcribeAnnouncements ( $time_before: timestamptz!, $is_price_sensitive: Boolean!, $is_asx_300: Boolean! ) {\n    announcements( where: { \n        time: { _gte: $time_before },\n        is_price_sensitive: { _eq: $is_price_sensitive }, \n        stock: { is_asx_300: { _eq: $is_asx_300 }}\n    }) {\n        ann_download_url\n        description\n        hotcopper_url\n        id time\n        is_price_sensitive\n        stock {\n            name ticker\n            is_asx_300 GICS\n        }\n    }\n}"]);return y=function(){return e},e}var S=h()(y());function x(){var e=Object(n.useState)(JSON.parse(localStorage.getItem("savedData"))),a=Object(o.a)(e,2),t=a[0],r=a[1],l=Object(n.useState)(!0),i=Object(o.a)(l,2),d=i[0],p=i[1],E=Object(n.useState)(!0),h=Object(o.a)(E,2),j=h[0],k=h[1],g=Object(n.useState)(!0),y=Object(o.a)(g,2),x=y[0],C=y[1],N=x?Object(O.a)(Object(_.a)(Object(f.a)(new Date,1),{hours:16,minutes:0,seconds:0})):Object(O.a)(0),D=Object(u.a)(S,{variables:{is_price_sensitive:d,is_asx_300:j,time_before:N}}),q=D.data,A=D.loading,$=v.a.get(q,"announcements"),I=v.a.map($,(function(e){var a=e.id;return Object(s.a)(Object(s.a)({},e),{},{read:v.a.get(t,[a,"read"],!1),saved:v.a.get(t,[a,"saved"],!1)})})),B=v.a.orderBy(I,["read","saved","id"],["asc","asc","desc"]);return Object(n.useEffect)((function(){t||r({}),localStorage.setItem("savedData",JSON.stringify(t))}),[t]),c.a.createElement("div",{className:"body"},c.a.createElement("div",{className:"header"},c.a.createElement("h2",null,"ASX Recent Announcement Feed"),c.a.createElement("p",null,"A scraped collection of ASX announcements, data updated every 10 mins.")),c.a.createElement("div",{className:"flex-box"},c.a.createElement("div",null,c.a.createElement("label",null,"Price sensitive only?"),c.a.createElement("input",{type:"checkbox",checked:d,onChange:function(){return p(!d)},disabled:A})),c.a.createElement("div",null,c.a.createElement("label",null,"ASX 300 only?"),c.a.createElement("input",{type:"checkbox",checked:j,onChange:function(){return k(!j)},disabled:A})),c.a.createElement("div",null,c.a.createElement("label",null,"After 4pm yesterday only?"),c.a.createElement("input",{type:"checkbox",checked:x,onChange:function(){return C(!x)},disabled:A})),c.a.createElement("div",{className:"".concat(A?"loading":"loaded")},A?c.a.createElement(c.a.Fragment,null,c.a.createElement("p",null,"Connecting"),c.a.createElement(m.a,{icon:b.c,spin:!0,size:"2x"})):c.a.createElement(c.a.Fragment,null,c.a.createElement("p",null,"Connected"),c.a.createElement(m.a,{icon:b.a})))),!v.a.isEmpty(B)&&v.a.map(B,(function(e){return c.a.createElement(w,{data:e,key:e.id,savedData:t,setSavedData:r})})))}var w=function(e){var a=e.data,t=e.savedData,n=e.setSavedData,r=a.id,l=a.description,o=a.hotcopper_url,d=a.stock,u=a.time,p=a.read,v=a.saved,E=d.name,h=d.ticker,O=d.GICS,_=function(){v||n(Object(s.a)(Object(s.a)({},t),{},Object(i.a)({},r,{saved:v,read:!p})))},f=Object(j.a)(u);return c.a.createElement("div",{className:"card"},c.a.createElement("div",{className:"card-header"},c.a.createElement("p",null,h," - ",E," - ",O),c.a.createElement("p",null,Object(k.a)(f)," ago - ",Object(g.a)(f,"d LLL @ hh:mm bbb")," ")),c.a.createElement("div",{className:"card-body"},c.a.createElement("a",{href:o,target:"_blank",rel:"noopener noreferrer",onClick:_},l,c.a.createElement(m.a,{icon:b.b,size:"xs"})),c.a.createElement("div",{className:"read-saved"},c.a.createElement("div",null,c.a.createElement("label",null,"Saved"),c.a.createElement("input",{type:"checkbox",checked:v,onChange:function(){return n(Object(s.a)(Object(s.a)({},t),{},Object(i.a)({},r,{read:!1,saved:!v})))}})),c.a.createElement("div",null,c.a.createElement("label",null,"Read"),c.a.createElement("input",{type:"checkbox",checked:p,onChange:_,disabled:v})))))},C=t(13),N=t(16),D=t(43),q=t(45),A=t(14),$=t(1),I=t(44);function B(){var e=new q.a({uri:"https://quiet-river-86309.herokuapp.com/v1/graphql"}),a=new D.a({uri:"wss://quiet-river-86309.herokuapp.com/v1/graphql",options:{reconnect:!0,timeout:3e4}}),t=Object(A.d)((function(e){var a=e.query,t=Object($.l)(a),n=t.kind,c=t.operation;return"OperationDefinition"===n&&"subscription"===c}),a,e),n=new N.c({link:t,cache:new I.a});return c.a.createElement(C.a,{client:n},c.a.createElement(x,null))}l.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(B,null)),document.getElementById("root"))}},[[46,1,2]]]);
//# sourceMappingURL=main.cd37a53f.chunk.js.map