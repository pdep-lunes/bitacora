(self.webpackChunkpdep_lunes_bitacora=self.webpackChunkpdep_lunes_bitacora||[]).push([[678],{661:function(e,t,n){"use strict";var a=n(7294),r=n(5444),l=n(5713),o=n(2963),i=n(1621);t.Z=function(e){var t=e.node,n=t.excerpt,s=t.fields.slug,c=t.frontmatter,u=c.tags,m=c.date,d=c.description,f=t.frontmatter.title||t.fields.slug;return a.createElement("div",{key:s},a.createElement("h3",{style:{fontFamily:"Montserrat, sans-serif",fontSize:"1.75rem",marginBottom:(0,l.qZ)(1/4)}},a.createElement(r.Link,{style:{boxShadow:"none",color:"#2b2b2b"},to:s},f)),u?a.createElement("div",{className:"tags-container"},u.map((function(e,t){return a.createElement(i.Z,{tag:e,key:t})}))):null,a.createElement("small",{style:{color:"#929292"}},(0,o.R)(m)),a.createElement("p",{style:{color:"#929292"},dangerouslySetInnerHTML:{__html:d||n}}))}},7704:function(e,t,n){"use strict";n.r(t);var a=n(7294),r=n(9535),l=n(7198),o=n(3751),i=n(661);t.default=function(e){var t=e.data,n=t.site.siteMetadata.title,s=t.allMarkdownRemark.edges,c=(new Date).getFullYear(),u=a.useMemo((function(){return s.filter((function(e){var t=e.node.frontmatter.date.split("-"),n=(t[0],t[1],t[2]);return parseInt(n)===c}))}),[c,s]);return a.createElement(l.Z,{location:e.location,title:n},a.createElement(o.Z,{title:"PDEP",keywords:["pdep","paradigmas","funcional","haskell","utn","logico","prolog","oop","objetos","wollok"]}),a.createElement(r.Z,null),u.map((function(e){var t=e.node;return a.createElement(i.Z,{key:t.id,node:t})})))}}}]);
//# sourceMappingURL=component---src-pages-index-js-9b144f827f9749306577.js.map