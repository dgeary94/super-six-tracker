(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const M of s.addedNodes)M.tagName==="LINK"&&M.rel==="modulepreload"&&n(M)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();const N="data:text/csv;base64,77u/cm91bmQsbmFtZSxzY29yZSxzY29yZV9zdW0NCjEsYW5keSwxMSwxMQ0KMSxkYXZpZCwxMSwxMQ0KMSxqYWtlLDE0LDE0DQoxLGphbWVzLDgsOA0KMSxqb25uaWUsNiw2DQoxLGpvc2gsMCwwDQoxLHNhbSwwLDANCjIsYW5keSw3LDE4DQoyLGRhdmlkLDExLDIyDQoyLGpha2UsNCwxOA0KMixqYW1lcyw1LDEzDQoyLGpvbm5pZSw2LDEyDQoyLGpvc2gsOSw5DQoyLHNhbSw2LDYNCjMsYW5keSwyLDIwDQozLGRhdmlkLDcsMjkNCjMsamFrZSw3LDI1DQozLGphbWVzLDcsMjANCjMsam9ubmllLDEwLDIyDQozLGpvc2gsMiwxMQ0KMyxzYW0sMiw4DQo0LGFuZHksMTQsMzQNCjQsZGF2aWQsMTQsNDMNCjQsamFrZSwxMywzOA0KNCxqYW1lcywxMywzMw0KNCxqb25uaWUsMTAsMzINCjQsam9zaCwxMCwyMQ0KNCxzYW0sMTMsMjENCjUsYW5keSwxMSw0NQ0KNSxkYXZpZCw4LDUxDQo1LGpha2UsOCw0Ng0KNSxqYW1lcywxNCw0Nw0KNSxqb25uaWUsMTEsNDMNCjUsam9zaCwwLDIxDQo1LHNhbSw2LDI3DQo2LGFuZHksNiw1MQ0KNixkYXZpZCw3LDU4DQo2LGpha2UsOSw1NQ0KNixqYW1lcyw4LDU1DQo2LGpvbm5pZSw5LDUyDQo2LGpvc2gsNiwyNw0KNixzYW0sOSwzNg0KNyxhbmR5LDExLDYyDQo3LGRhdmlkLDExLDY5DQo3LGpha2UsMTksNzQNCjcsamFtZXMsMTMsNjgNCjcsam9ubmllLDEzLDY1DQo3LGpvc2gsMCwyNw0KNyxzYW0sMTMsNDkNCjgsYW5keSw5LDcxDQo4LGRhdmlkLDExLDgwDQo4LGpha2UsOCw4Mg0KOCxqYW1lcywxNCw4Mg0KOCxqb25uaWUsOCw3Mw0KOCxqb3NoLDAsMjcNCjgsc2FtLDExLDYwDQo5LGFuZHksMTQsODUNCjksZGF2aWQsNCw4NA0KOSxqYWtlLDIsODQNCjksamFtZXMsNiw4OA0KOSxqb25uaWUsOSw4Mg0KOSxqb3NoLDksMzYNCjksc2FtLDQsNjQNCjEwLGFuZHksOCw5Mw0KMTAsZGF2aWQsMTQsOTgNCjEwLGpha2UsMiw4Ng0KMTAsamFtZXMsMTYsMTA0DQoxMCxqb25uaWUsNCw4Ng0KMTAsam9zaCwwLDM2DQoxMCxzYW0sOSw3Mw0KMTEsYW5keSw3LDEwMA0KMTEsZGF2aWQsOSwxMDcNCjExLGpha2UsMTEsOTcNCjExLGphbWVzLDYsMTEwDQoxMSxqb25uaWUsMTEsOTcNCjExLGpvc2gsNiw0Mg0KMTEsc2FtLDEyLDg1DQoxMixhbmR5LDEzLDExMw0KMTIsZGF2aWQsOCwxMTUNCjEyLGpha2UsMTYsMTEzDQoxMixqYW1lcywxNSwxMjUNCjEyLGpvbm5pZSwxMSwxMDgNCjEyLGpvc2gsMCw0Mg0KMTIsc2FtLDksOTQNCjEzLGFuZHksNiwxMTkNCjEzLGRhdmlkLDYsMTIxDQoxMyxqYWtlLDYsMTE5DQoxMyxqYW1lcyw2LDEzMQ0KMTMsam9ubmllLDgsMTE2DQoxMyxqb3NoLDEzLDU1DQoxMyxzYW0sOSwxMDM=";document.querySelector("#app").innerHTML=`
    <h1>&#9917 Super 6 League Tracker</h1>
    <h2>QUE SERA SERA, WE'RE GOING TO WORMBELLY</h2>
    <div id=graph><div>`;const o={top:50,right:90,bottom:50,left:80},w=800-o.left-o.right,d=500-o.top-o.bottom,D=w/d;let x=null,c=null;function p(a,r){const i=window.innerWidth,n=window.innerHeight;return i/n>D?(r=d,a=w):(a=i,r=a/D),[a,r]}[x,c]=p();const l=d3.select("#graph").append("svg").attr("width",x+o.left+o.right).attr("height",c+o.top+o.bottom).append("g").attr("transform",`translate(${o.left}, ${o.top})`);d3.csv(N).then(function(a){const r=["andy","david","jake","james","jonnie","josh","sam"],i=r.map(function(t){return{name:t,values:a.filter(function(L){return L.name===t}).map(function(L){return{round:+L.round,score:+L.score_sum}})}}),n=d3.scaleLinear().domain([d3.min(a,function(t){return+t.round}),d3.max(a,function(t){return+t.round})]).range([0,x]);l.append("g").attr("transform",`translate(0, ${c})`).style("font-size","12px").call(d3.axisBottom(n));function e(){return d3.axisBottom(n).ticks()}l.append("g").attr("class","grid").attr("transform","translate(0,"+c+")").call(e().tickSize(-c).tickFormat("")),l.append("text").attr("text-anchor","center").attr("x",(x-50)/2).attr("y",c+o.bottom).text("Round");const s=d3.scaleLinear().domain([0,Math.ceil(d3.max(a,function(t){return+t.score_sum})/10)*10]).range([c,0]);l.append("g").style("font-size","12px").call(d3.axisLeft(s));function M(){return d3.axisLeft(s).ticks()}l.append("g").attr("class","grid").call(M().tickSize(-x).tickFormat("")),l.append("text").attr("text-anchor","center").attr("x",-o.left).attr("y",c/2).text("Score");const u=d3.scaleOrdinal().domain(r).range(d3.schemeDark2),m=d3.line().x(t=>n(+t.round)).y(t=>s(+t.score));l.selectAll("myLines").data(i).join("path").attr("d",t=>m(t.values)).attr("stroke",t=>u(t.name)).style("stroke-width",2).style("fill","none"),l.selectAll("myDots").data(i).join("g").style("fill",t=>u(t.name)).selectAll("myPoints").data(t=>t.values).join("circle").attr("cx",t=>n(t.round)).attr("cy",t=>s(t.score)).attr("r",3).attr("stroke","white"),l.selectAll("myLabels").data(i).join("g").append("text").datum(t=>({name:t.name,value:t.values[t.values.length-1]})).attr("transform",t=>`translate(${n(t.value.round)},${s(t.value.score)})`).attr("x",t=>t.name==="jake"?55:12).text(t=>t.name).style("fill",t=>u(t.name)).style("font-size",15)});