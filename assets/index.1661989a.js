(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const L of s.addedNodes)L.tagName==="LINK"&&L.rel==="modulepreload"&&a(L)}).observe(document,{childList:!0,subtree:!0});function c(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=c(e);fetch(e.href,s)}})();const p="data:text/csv;base64,77u/cm91bmQsbmFtZSxzY29yZSxzY29yZV9zdW0NCjEsYW5keSwxMSwxMQ0KMSxkYXZpZCwxMSwxMQ0KMSxqYWtlLDE0LDE0DQoxLGphbWVzLDgsOA0KMSxqb25uaWUsNiw2DQoxLGpvc2gsMCwwDQoxLHNhbSwwLDANCjIsYW5keSw3LDE4DQoyLGRhdmlkLDExLDIyDQoyLGpha2UsNCwxOA0KMixqYW1lcyw1LDEzDQoyLGpvbm5pZSw2LDEyDQoyLGpvc2gsOSw5DQoyLHNhbSw2LDYNCjMsYW5keSwyLDIwDQozLGRhdmlkLDcsMjkNCjMsamFrZSw3LDI1DQozLGphbWVzLDcsMjANCjMsam9ubmllLDEwLDIyDQozLGpvc2gsMiwxMQ0KMyxzYW0sMiw4DQo0LGFuZHksMTQsMzQNCjQsZGF2aWQsMTQsNDMNCjQsamFrZSwxMywzOA0KNCxqYW1lcywxMywzMw0KNCxqb25uaWUsMTAsMzINCjQsam9zaCwxMCwyMQ0KNCxzYW0sMTMsMjENCjUsYW5keSwxMSw0NQ0KNSxkYXZpZCw4LDUxDQo1LGpha2UsOCw0Ng0KNSxqYW1lcywxNCw0Nw0KNSxqb25uaWUsMTEsNDMNCjUsam9zaCwwLDIxDQo1LHNhbSw2LDI3DQo2LGFuZHksNiw1MQ0KNixkYXZpZCw3LDU4DQo2LGpha2UsOSw1NQ0KNixqYW1lcyw4LDU1DQo2LGpvbm5pZSw5LDUyDQo2LGpvc2gsNiwyNw0KNixzYW0sOSwzNg0KNyxhbmR5LDExLDYyDQo3LGRhdmlkLDExLDY5DQo3LGpha2UsMTksNzQNCjcsamFtZXMsMTMsNjgNCjcsam9ubmllLDEzLDY1DQo3LGpvc2gsMCwyNw0KNyxzYW0sMTMsNDkNCjgsYW5keSw5LDcxDQo4LGRhdmlkLDExLDgwDQo4LGpha2UsOCw4Mg0KOCxqYW1lcywxNCw4Mg0KOCxqb25uaWUsOCw3Mw0KOCxqb3NoLDAsMjcNCjgsc2FtLDExLDYwDQo5LGFuZHksMTQsODUNCjksZGF2aWQsNCw4NA0KOSxqYWtlLDIsODQNCjksamFtZXMsNiw4OA0KOSxqb25uaWUsOSw4Mg0KOSxqb3NoLDksMzYNCjksc2FtLDQsNjQNCjEwLGFuZHksOCw5Mw0KMTAsZGF2aWQsMTQsOTgNCjEwLGpha2UsMiw4Ng0KMTAsamFtZXMsMTYsMTA0DQoxMCxqb25uaWUsNCw4Ng0KMTAsam9zaCwwLDM2DQoxMCxzYW0sOSw3Mw0KMTEsYW5keSw3LDEwMA0KMTEsZGF2aWQsOSwxMDcNCjExLGpha2UsMTEsOTcNCjExLGphbWVzLDYsMTEwDQoxMSxqb25uaWUsMTEsOTcNCjExLGpvc2gsNiw0Mg0KMTEsc2FtLDEyLDg1";document.querySelector("#app").innerHTML=`
    <h1>&#9917 Super 6 League Tracker</h1>
    <h2>QUE SERA SERA, WE'RE GOING TO WORMBELLY</h2>
    <div id=graph><div>`;const o={top:50,right:90,bottom:50,left:100},m=800-o.left-o.right,D=500-o.top-o.bottom,w=m/D;let u=null,i=null;function N(n,r){const c=window.innerWidth,a=window.innerHeight;return c/a>w?(r=D,n=m):(n=c,r=n/w),[n,r]}[u,i]=N();console.log(u,i);const l=d3.select("#graph").append("svg").attr("width",u+o.left+o.right).attr("height",i+o.top+o.bottom).append("g").attr("transform",`translate(${o.left}, ${o.top})`);d3.csv(p).then(function(n){console.log(n);const r=["andy","david","jake","james","jonnie","josh","sam"],c=r.map(function(t){return{name:t,values:n.filter(function(d){return d.name===t}).map(function(d){return{round:+d.round,score:+d.score_sum}})}}),a=d3.scaleLinear().domain([d3.min(n,function(t){return+t.round}),d3.max(n,function(t){return+t.round})]).range([0,u]);l.append("g").attr("transform",`translate(0, ${i})`).style("font-size","12px").call(d3.axisBottom(a));function e(){return d3.axisBottom(a).ticks()}l.append("g").attr("class","grid").attr("transform","translate(0,"+i+")").call(e().tickSize(-i).tickFormat("")),l.append("text").attr("text-anchor","center").attr("x",(u-50)/2).attr("y",i+o.bottom).text("Round");const s=d3.scaleLinear().domain([0,d3.max(n,function(t){return+t.score_sum})]).range([i,0]);l.append("g").style("font-size","12px").call(d3.axisLeft(s));function L(){return d3.axisLeft(s).ticks()}l.append("g").attr("class","grid").call(L().tickSize(-u).tickFormat("")),l.append("text").attr("text-anchor","center").attr("x",-o.left).attr("y",i/2).text("Score");const x=d3.scaleOrdinal().domain(r).range(d3.schemeDark2),M=d3.line().x(t=>a(+t.round)).y(t=>s(+t.score));l.selectAll("myLines").data(c).join("path").attr("d",t=>M(t.values)).attr("stroke",t=>x(t.name)).style("stroke-width",2).style("fill","none"),l.selectAll("myDots").data(c).join("g").style("fill",t=>x(t.name)).selectAll("myPoints").data(t=>t.values).join("circle").attr("cx",t=>a(t.round)).attr("cy",t=>s(t.score)).attr("r",3).attr("stroke","white"),l.selectAll("myLabels").data(c).join("g").append("text").datum(t=>({name:t.name,value:t.values[t.values.length-1]})).attr("transform",t=>`translate(${a(t.value.round)},${s(t.value.score)})`).attr("x",t=>t.name==="jake"?55:12).text(t=>t.name).style("fill",t=>x(t.name)).style("font-size",15)});
