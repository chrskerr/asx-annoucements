(this["webpackJsonpasx-annoucements"]=this["webpackJsonpasx-annoucements"]||[]).push([[0],{44:function(e,a,t){e.exports=t(67)},49:function(e,a,t){},67:function(e,a,t){"use strict";t.r(a);var n=t(1),c=t.n(n),r=t(35),i=t.n(r),l=(t(49),t(23)),s=t(19),o=t(21),u=t(36),m=(t(50),t(29)),d=t(17),E=t(18),b=t(11),v=t.n(b),p=t(37),f=t.n(p),h=t(69),O=t(72),j=t(73),S=t(70),_=t(71);function x(){var e=Object(u.a)(["\nsubscription SubcribeAnnouncements ( $time_before: timestamptz!, $is_price_sensitive: Boolean!, $is_asx_300: Boolean!, $exchange: [String!] ) {\n\tannouncements( \n\t\twhere: { \n\t\t\ttime: { _gte: $time_before },\n\t\t\tis_price_sensitive: { _eq: $is_price_sensitive }, \n\t\t\tstock: { is_asx_300: { _eq: $is_asx_300 }, exchange: { _in: $exchange }}\n\t\t},\n\t\torder_by: { time: desc }\n\t) {\n\t\tann_download_url\n\t\tdescription\n\t\thotcopper_url\n\t\tid time\n\t\tis_price_sensitive\n\t\tstock {\n\t\t\tname ticker\n\t\t\tis_asx_300 GICS\n            exchange\n\t\t}\n\t}\n}"]);return x=function(){return e},e}var k=f()(x()),y={both:["ASX","NSX"],nsx:["NSX"],asx:["ASX"]},g=[{value:"both",label:"Both"},{value:"asx",label:"ASX"},{value:"nsx",label:"NSX"}];function N(){var e=Object(n.useState)(JSON.parse(localStorage.getItem("savedData"))),a=Object(o.a)(e,2),t=a[0],r=a[1],i=Object(n.useState)(!0),l=Object(o.a)(i,2),u=l[0],b=l[1],p=Object(n.useState)(!0),f=Object(o.a)(p,2),S=f[0],_=f[1],x=Object(n.useState)(!0),N=Object(o.a)(x,2),w=N[0],A=N[1],C=Object(n.useState)("asx"),q=Object(o.a)(C,2),z=q[0],$=q[1],M=w?Object(h.a)(Object(O.a)(Object(j.a)(new Date,1),{hours:16,minutes:0,seconds:0})):Object(h.a)(0),I=Object(m.a)(k,{variables:{is_price_sensitive:u,is_asx_300:S,time_before:M,exchange:y[z]}}),B=I.data,J=I.loading,R=v.a.get(B,"announcements"),F=v.a.map(R,(function(e){var a=e.id;return Object(s.a)(Object(s.a)({},e),{},{read:v.a.get(t,[a,"read"],!1),saved:v.a.get(t,[a,"saved"],!1)})})),G=v.a.filter(F,{read:!1,saved:!1}),P=v.a.filter(F,{saved:!0}),U=v.a.filter(F,{read:!0,saved:!1});return Object(n.useEffect)((function(){t||r({}),localStorage.setItem("savedData",JSON.stringify(t))}),[t]),Object(n.useEffect)((function(){document.title="ASX/NSX Ann Feed (".concat(v.a.size(G)," unread)")}),[G]),Object(n.useEffect)((function(){"asx"!==z&&_(!1)}),[z]),c.a.createElement("div",{className:"body"},c.a.createElement("div",{className:"header"},c.a.createElement(X,null),c.a.createElement("h2",null,"ASX & NSX Recent Announcement Feed"),c.a.createElement("p",null,"A scraped collection of ASX and NSX announcements, data updated every 10 mins.")),c.a.createElement("div",{className:"inputs-box-row"},c.a.createElement("div",{onClick:function(){return b(!u)}},c.a.createElement("p",null,"Price sensitive only?"),u?c.a.createElement(d.a,{icon:E.a}):c.a.createElement(d.a,{icon:E.d,className:"unchecked"})),c.a.createElement("div",{onClick:function(){"asx"===z&&_(!S)}},c.a.createElement("p",null,"ASX 300 only?"),S?c.a.createElement(d.a,{className:"asx"!==z?"disabled":"",icon:E.a,disabled:!0}):c.a.createElement(d.a,{className:"unchecked ".concat("asx"!==z?"disabled":""),icon:E.d})),c.a.createElement("div",{onClick:function(){return A(!w)}},c.a.createElement("p",null,"After 4pm yesterday only?"),w?c.a.createElement(d.a,{icon:E.a}):c.a.createElement(d.a,{icon:E.d,className:"unchecked"})),c.a.createElement("div",null,c.a.createElement("p",null,"Exchange:"),c.a.createElement("select",{value:z,onChange:function(e){return $(e.target.value)}},!v.a.isEmpty(g)&&v.a.map(g,(function(e){var a=e.value,t=e.label;return c.a.createElement("option",{key:a,value:a},t)}))))),J&&c.a.createElement("div",{className:"loader"},c.a.createElement(d.a,{icon:E.c,spin:!0,size:"3x"})),!J&&v.a.isEmpty(G)&&v.a.isEmpty(P)&&v.a.isEmpty(G)&&c.a.createElement("p",{className:"-colour-tertiary"},"No matching announcements"),!v.a.isEmpty(G)&&c.a.createElement("h5",null,"Unread (",v.a.size(G),"):"),!v.a.isEmpty(G)&&v.a.map(G,(function(e){return c.a.createElement(D,{data:e,key:e.id,savedData:t,setSavedData:r})})),!v.a.isEmpty(P)&&c.a.createElement("h5",null,"Saved (",v.a.size(P),"):"),!v.a.isEmpty(P)&&v.a.map(P,(function(e){return c.a.createElement(D,{data:e,key:e.id,savedData:t,setSavedData:r})})),!v.a.isEmpty(U)&&c.a.createElement("h5",null,"Read (",v.a.size(U),"):"),!v.a.isEmpty(U)&&v.a.map(U,(function(e){return c.a.createElement(D,{data:e,key:e.id,savedData:t,setSavedData:r})})))}var D=function(e){var a=e.data,t=e.savedData,n=e.setSavedData,r=a.id,i=a.description,o=a.hotcopper_url,u=a.stock,m=a.time,b=a.read,v=a.saved,p=u.name,f=u.ticker,h=u.GICS,O=u.exchange,j=Object(S.a)(m);return c.a.createElement("div",{className:"card"},c.a.createElement("div",{className:"card-header"},c.a.createElement("div",null,c.a.createElement("a",{href:"https://finance.yahoo.com/quote/".concat(f,".AX"),target:"_blank",rel:"noopener noreferrer"},O,":",f,p&&" - ".concat(p),c.a.createElement(d.a,{icon:E.b,size:"xs"})),c.a.createElement("p",null,h)),c.a.createElement("p",null,Object(_.a)(j,"h:mm aaa '-' EE do MMM"))),c.a.createElement("div",{className:"card-body"},c.a.createElement("a",{href:o,target:"_blank",rel:"noopener noreferrer",onClick:function(){return n(Object(s.a)(Object(s.a)({},t),{},Object(l.a)({},r,{saved:v,read:!0})))}},i,c.a.createElement(d.a,{icon:E.b,size:"xs"})),c.a.createElement("div",{className:"inputs-box-column"},c.a.createElement("div",{onClick:function(){return n(Object(s.a)(Object(s.a)({},t),{},Object(l.a)({},r,{read:b,saved:!v})))}},c.a.createElement("label",null,"Saved"),v?c.a.createElement(d.a,{icon:E.a}):c.a.createElement(d.a,{icon:E.d,className:"unchecked"})),c.a.createElement("div",{onClick:function(){return n(Object(s.a)(Object(s.a)({},t),{},Object(l.a)({},r,{saved:v,read:!b})))}},c.a.createElement("label",null,"Read"),b?c.a.createElement(d.a,{icon:E.a}):c.a.createElement(d.a,{icon:E.d,className:"unchecked"})))))},X=function(){var e=Object(n.useState)(new Date),a=Object(o.a)(e,2),t=a[0],r=a[1],i=Object(n.useState)(!1),l=Object(o.a)(i,2),s=l[0],u=l[1];return Object(n.useEffect)((function(){s||u(setInterval((function(){return r(new Date)}),1e3))}),[s]),c.a.createElement("h3",null,Object(_.a)(t,"h:mm:ss aaa '-' EE do MMM"))},w=t(14),A=t(20),C=t(41),q=t(43),z=t(15),$=t(2),M=t(42);function I(){var e=new q.a({uri:"https://quiet-river-86309.herokuapp.com/v1/graphql"}),a=new C.a({uri:"wss://quiet-river-86309.herokuapp.com/v1/graphql",options:{reconnect:!0,timeout:3e4}}),t=Object(z.d)((function(e){var a=e.query,t=Object($.l)(a),n=t.kind,c=t.operation;return"OperationDefinition"===n&&"subscription"===c}),a,e),n=new A.c({link:t,cache:new M.a});return c.a.createElement(w.a,{client:n},c.a.createElement(N,null))}i.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(I,null)),document.getElementById("root"))}},[[44,1,2]]]);
//# sourceMappingURL=main.f815a6ea.chunk.js.map