(function(){const L=document.createElement("link").relList;if(L&&L.supports&&L.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const n of e.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function D(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?e.credentials="include":t.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function c(t){if(t.ep)return;t.ep=!0;const e=D(t);fetch(t.href,e)}})();const S="data:text/csv;base64,77u/cm91bmQsbmFtZSxzY29yZSxzY29yZV9zdW0NCjEsYW5keSwxMSwxMQ0KMSxkYXZpZCwxMSwxMQ0KMSxqYWtlLDE0LDE0DQoxLGphbWVzLDgsOA0KMSxqb25uaWUsNiw2DQoxLGpvc2gsMCwwDQoxLHNhbSwwLDANCjIsYW5keSw3LDE4DQoyLGRhdmlkLDExLDIyDQoyLGpha2UsNCwxOA0KMixqYW1lcyw1LDEzDQoyLGpvbm5pZSw2LDEyDQoyLGpvc2gsOSw5DQoyLHNhbSw2LDYNCjMsYW5keSwyLDIwDQozLGRhdmlkLDcsMjkNCjMsamFrZSw3LDI1DQozLGphbWVzLDcsMjANCjMsam9ubmllLDEwLDIyDQozLGpvc2gsMiwxMQ0KMyxzYW0sMiw4DQo0LGFuZHksMTQsMzQNCjQsZGF2aWQsMTQsNDMNCjQsamFrZSwxMywzOA0KNCxqYW1lcywxMywzMw0KNCxqb25uaWUsMTAsMzINCjQsam9zaCwxMCwyMQ0KNCxzYW0sMTMsMjENCjUsYW5keSwxMSw0NQ0KNSxkYXZpZCw4LDUxDQo1LGpha2UsOCw0Ng0KNSxqYW1lcywxNCw0Nw0KNSxqb25uaWUsMTEsNDMNCjUsam9zaCwwLDIxDQo1LHNhbSw2LDI3DQo2LGFuZHksNiw1MQ0KNixkYXZpZCw3LDU4DQo2LGpha2UsOSw1NQ0KNixqYW1lcyw4LDU1DQo2LGpvbm5pZSw5LDUyDQo2LGpvc2gsNiwyNw0KNixzYW0sOSwzNg0KNyxhbmR5LDExLDYyDQo3LGRhdmlkLDExLDY5DQo3LGpha2UsMTksNzQNCjcsamFtZXMsMTMsNjgNCjcsam9ubmllLDEzLDY1DQo3LGpvc2gsMCwyNw0KNyxzYW0sMTMsNDkNCjgsYW5keSw5LDcxDQo4LGRhdmlkLDExLDgwDQo4LGpha2UsOCw4Mg0KOCxqYW1lcywxNCw4Mg0KOCxqb25uaWUsOCw3Mw0KOCxqb3NoLDAsMjcNCjgsc2FtLDExLDYwDQo5LGFuZHksMTQsODUNCjksZGF2aWQsNCw4NA0KOSxqYWtlLDIsODQNCjksamFtZXMsNiw4OA0KOSxqb25uaWUsOSw4Mg0KOSxqb3NoLDksMzYNCjksc2FtLDQsNjQNCjEwLGFuZHksOCw5Mw0KMTAsZGF2aWQsMTQsOTgNCjEwLGpha2UsMiw4Ng0KMTAsamFtZXMsMTYsMTA0DQoxMCxqb25uaWUsNCw4Ng0KMTAsam9zaCwwLDM2DQoxMCxzYW0sOSw3Mw0KMTEsYW5keSw3LDEwMA0KMTEsZGF2aWQsOSwxMDcNCjExLGpha2UsMTEsOTcNCjExLGphbWVzLDYsMTEwDQoxMSxqb25uaWUsMTEsOTcNCjExLGpvc2gsNiw0Mg0KMTEsc2FtLDEyLDg1DQoxMixhbmR5LDEzLDExMw0KMTIsZGF2aWQsOCwxMTUNCjEyLGpha2UsMTYsMTEzDQoxMixqYW1lcywxNSwxMjUNCjEyLGpvbm5pZSwxMSwxMDgNCjEyLGpvc2gsMCw0Mg0KMTIsc2FtLDksOTQNCjEzLGFuZHksNiwxMTkNCjEzLGRhdmlkLDYsMTIxDQoxMyxqYWtlLDYsMTE5DQoxMyxqYW1lcyw2LDEzMQ0KMTMsam9ubmllLDgsMTE2DQoxMyxqb3NoLDEzLDU1DQoxMyxzYW0sOSwxMDMNCjE0LGFuZHksMTcsMTM2DQoxNCxkYXZpZCwxMCwxMzENCjE0LGpha2UsNywxMjYNCjE0LGphbWVzLDE0LDE0NQ0KMTQsam9ubmllLDcsMTIzDQoxNCxqb3NoLDYsNjENCjE0LHNhbSw5LDExMg0KMTUsYW5keSw5LDE0NQ0KMTUsZGF2aWQsNCwxMzUNCjE1LGpha2UsNCwxMzANCjE1LGphbWVzLDYsMTUxDQoxNSxqb25uaWUsNiwxMjkNCjE1LGpvc2gsNCw2NQ0KMTUsc2FtLDQsMTE2DQoxNixhbmR5LDQsMTQ5DQoxNixkYXZpZCw3LDE0Mg0KMTYsamFrZSw0LDEzNA0KMTYsamFtZXMsNCwxNTUNCjE2LGpvbm5pZSw0LDEzMw0KMTYsam9zaCw2LDcxDQoxNixzYW0sMiwxMTgNCjE3LGFuZHksNCwxNTMNCjE3LGRhdmlkLDE2LDE1OA0KMTcsamFrZSw0LDEzOA0KMTcsamFtZXMsNCwxNTkNCjE3LGpvbm5pZSw2LDEzOQ0KMTcsam9zaCwxMSw4Mg0KMTcsc2FtLDksMTI3DQoxOCxhbmR5LDYsMTU5DQoxOCxkYXZpZCw3LDE2NQ0KMTgsamFrZSw4LDE0Ng0KMTgsamFtZXMsOCwxNjcNCjE4LGpvbm5pZSw2LDE0NQ0KMTgsam9zaCw2LDg4DQoxOCxzYW0sNiwxMzMNCjE5LGFuZHksOCwxNjcNCjE5LGRhdmlkLDEzLDE3OA0KMTksamFrZSwxMCwxNTYNCjE5LGphbWVzLDE2LDE4Mw0KMTksam9ubmllLDgsMTUzDQoxOSxqb3NoLDE5LDEwNw0KMTksc2FtLDE4LDE1MQ0KMjAsYW5keSw0LDE3MQ0KMjAsZGF2aWQsNiwxODQNCjIwLGpha2UsOCwxNjQNCjIwLGphbWVzLDEzLDE5Ng0KMjAsam9ubmllLDYsMTU5DQoyMCxqb3NoLDExLDExOA0KMjAsc2FtLDEzLDE2NA0KMjEsYW5keSw1LDE3Ng0KMjEsZGF2aWQsMiwxODYNCjIxLGpha2UsMiwxNjYNCjIxLGphbWVzLDIsMTk4DQoyMSxqb25uaWUsMiwxNjENCjIxLGpvc2gsMiwxMjANCjIxLHNhbSw0LDE2OA0KMjIsYW5keSwxMCwxODYNCjIyLGRhdmlkLDE0LDIwMA0KMjIsamFrZSw4LDE3NA0KMjIsamFtZXMsMTUsMjEzDQoyMixqb25uaWUsMTUsMTc2DQoyMixqb3NoLDExLDEzMQ0KMjIsc2FtLDExLDE3OQ0KMjMsYW5keSwwLDE4Ng0KMjMsZGF2aWQsOSwyMDkNCjIzLGpha2UsNiwxODANCjIzLGphbWVzLDksMjIyDQoyMyxqb25uaWUsOSwxODUNCjIzLGpvc2gsNCwxMzUNCjIzLHNhbSwyLDE4MQ0KMjQsYW5keSw0LDE5MA0KMjQsZGF2aWQsNiwyMTUNCjI0LGpha2UsNiwxODYNCjI0LGphbWVzLDEyLDIzNA0KMjQsam9ubmllLDYsMTkxDQoyNCxqb3NoLDQsMTM5DQoyNCxzYW0sMTUsMTk2DQoyNSxhbmR5LDQsMTk0DQoyNSxkYXZpZCw0LDIxOQ0KMjUsamFrZSw0LDE5MA0KMjUsamFtZXMsNCwyMzgNCjI1LGpvbm5pZSw0LDE5NQ0KMjUsam9zaCw3LDE0Ng0KMjUsc2FtLDksMjA1DQoyNixhbmR5LDExLDIwNQ0KMjYsZGF2aWQsOCwyMjcNCjI2LGpha2UsOCwxOTgNCjI2LGphbWVzLDEzLDI1MQ0KMjYsam9ubmllLDEwLDIwNQ0KMjYsam9zaCw4LDE1NA0KMjYsc2FtLDgsMjEzDQoyNyxhbmR5LDksMjE0DQoyNyxkYXZpZCw0LDIzMQ0KMjcsamFrZSw5LDIwNw0KMjcsamFtZXMsMTEsMjYyDQoyNyxqb25uaWUsMTMsMjE4DQoyNyxqb3NoLDksMTYzDQoyNyxzYW0sOCwyMjENCjI4LGFuZHksMCwyMTQNCjI4LGRhdmlkLDIsMjMzDQoyOCxqYWtlLDIsMjA5DQoyOCxqYW1lcyw0LDI2Ng0KMjgsam9ubmllLDIsMjIwDQoyOCxqb3NoLDIsMTY1DQoyOCxzYW0sMiwyMjMNCjI5LGFuZHksNywyMjENCjI5LGRhdmlkLDE3LDI1MA0KMjksamFrZSwxMCwyMTkNCjI5LGphbWVzLDQsMjcwDQoyOSxqb25uaWUsOSwyMjkNCjI5LGpvc2gsNCwxNjkNCjI5LHNhbSw2LDIyOQ0KMzAsYW5keSwxMCwyMzENCjMwLGRhdmlkLDQsMjU0DQozMCxqYWtlLDQsMjIzDQozMCxqYW1lcyw2LDI3Ng0KMzAsam9ubmllLDQsMjMzDQozMCxqb3NoLDYsMTc1DQozMCxzYW0sOSwyMzgNCjMxLGFuZHksMTQsMjQ1DQozMSxkYXZpZCwxMiwyNjYNCjMxLGpha2UsNiwyMjkNCjMxLGphbWVzLDcsMjgzDQozMSxqb25uaWUsMTEsMjQ0DQozMSxqb3NoLDcsMTgyDQozMSxzYW0sMTIsMjUwDQozMixhbmR5LDYsMjUxDQozMixkYXZpZCw0LDI3MA0KMzIsamFrZSw3LDIzNg0KMzIsamFtZXMsNCwyODcNCjMyLGpvbm5pZSwxMiwyNTYNCjMyLGpvc2gsMiwxODQNCjMyLHNhbSw0LDI1NA0KMzMsYW5keSw4LDI1OQ0KMzMsZGF2aWQsOSwyNzkNCjMzLGpha2UsOSwyNDUNCjMzLGphbWVzLDUsMjkyDQozMyxqb25uaWUsOSwyNjUNCjMzLGpvc2gsOSwxOTMNCjMzLHNhbSw2LDI2MA0KMzQsYW5keSw2LDI2NQ0KMzQsZGF2aWQsNiwyODUNCjM0LGpha2UsNywyNTINCjM0LGphbWVzLDQsMjk2DQozNCxqb25uaWUsOSwyNzQNCjM0LGpvc2gsNCwxOTcNCjM0LHNhbSw0LDI2NA0KMzUsYW5keSwwLDI2NQ0KMzUsZGF2aWQsOSwyOTQNCjM1LGpha2UsMTIsMjY0DQozNSxqYW1lcyw0LDMwMA0KMzUsam9ubmllLDQsMjc4DQozNSxqb3NoLDQsMjAxDQozNSxzYW0sNCwyNjgNCjM2LGFuZHksMTIsMjc3DQozNixkYXZpZCwxMCwzMDQNCjM2LGpha2UsNiwyNzANCjM2LGphbWVzLDYsMzA2DQozNixqb25uaWUsOSwyODcNCjM2LGpvc2gsMTQsMjE1DQozNixzYW0sMTIsMjgwDQozNyxhbmR5LDYsMjgzDQozNyxkYXZpZCw0LDMwOA0KMzcsamFrZSw3LDI3Nw0KMzcsamFtZXMsOCwzMTQNCjM3LGpvbm5pZSw0LDI5MQ0KMzcsam9zaCw0LDIxOQ0KMzcsc2FtLDksMjg5",T="/super-six-tracker/assets/football.b99eb6b5.svg";document.querySelector("#app").innerHTML=`
  <div id="title">
    <img id="football" src="" alt="Logo" width="60" height="60"/>
    <h1>Super 6 League Tracker</h1>
  </div>
  <h2>QUE SERA SERA, WE'RE GOING TO WORMBELLY</h2>
  <p>Click each name to toggle data series.</p>
  <div id="graph"><div>`;document.getElementById("football").src=T;const o={top:40,right:90,bottom:40,left:80},u=800-o.left-o.right,y=500-o.top-o.bottom,d=u/y;let i=null,x=null;function k(M,L){const D=window.innerWidth,c=window.innerHeight;return D/c>d?(L=y,M=u):(M=D,L=M/d),[M,L]}[i,x]=k();document.querySelector("#app").innerHTML+=`<table width=${i}>
 <thead>
     <tr>
       <th></th>
       <th>Andy</th>
       <th>David</th>
       <th>Jake</th>
       <th>James</th>
       <th>Jonnie</th>
       <th>Josh</th>
       <th>Sam</th>
     </tr>
 </thead>
 <tbody>
     <tr id="max-round-score">
       <td>Best Round</td>
     </tr>
     <tr id="avg-round-score">
     <td>Average Round</td>
     </tr>
     <tr id="standard-dev">
     <td>Standard Deviation</td>
 </tbody>
 </table>`;const r=d3.select("#graph").append("svg").attr("width",i+o.left+o.right).attr("height",x+o.top+o.bottom).append("g").attr("transform",`translate(${o.left}, ${o.top})`);d3.csv(S).then(function(M){const L=["andy","david","jake","james","jonnie","josh","sam"],D=L.map(function(s){return{name:s,values:M.filter(function(a){return a.name===s}).map(function(a){return{round:+a.round,score:+a.score,score_sum:+a.score_sum}})}});function c(){return d3.axisBottom(e).ticks()}function t(){return d3.axisLeft(n).ticks()}const e=d3.scaleLinear().domain([d3.min(M,function(s){return+s.round}),d3.max(M,function(s){return+s.round})]).range([0,i]);r.append("g").attr("transform",`translate(0, ${x})`).style("font-size","12px").call(d3.axisBottom(e).ticks(d3.max(M,function(s){return+s.round})/2)),r.append("g").attr("class","grid").attr("transform","translate(0,"+x+")").call(c().tickSize(-x).tickFormat("").ticks(d3.max(M,function(s){return+s.round})/2)),r.append("text").attr("text-anchor","center").attr("x",(i-50)/2).attr("y",x+o.bottom).text("Round");const n=d3.scaleLinear().domain([0,Math.ceil(d3.max(M,function(s){return+s.score_sum})/10)*10]).range([x,0]);r.append("g").style("font-size","12px").call(d3.axisLeft(n)),r.append("g").attr("class","grid").call(t().tickSize(-i).tickFormat("")),r.append("text").attr("text-anchor","center").attr("x",-o.left).attr("y",x/2).text("Points");const j=d3.scaleOrdinal().domain(L).range(d3.schemeDark2),z=d3.line().x(s=>e(+s.round)).y(s=>n(+s.score_sum)),p=r.selectAll("myLines").data(D).join("path").attr("d",s=>z(s.values)).attr("stroke",s=>j(s.name)).style("stroke-width",2).style("fill","none"),h=r.selectAll("myLabels").data(D).join("g").append("text").datum(s=>({name:s.name,value:s.values[s.values.length-1]})).attr("transform",s=>`translate(${e(s.value.round)},${n(s.value.score_sum)})`).attr("x",s=>s.name==="jake"||s.name==="sam"?52:12).text(s=>s.name).style("fill",s=>j(s.name)).style("font-size","15px").style("border","solid").on("click",(s,a)=>{const l=h.selectAll("g")._parents;let C=null;for(let N=0;N<l.length;N++)if(a.name===l[N].innerHTML){C=l[N];break}const Q=p.selectAll("path")._parents;let m=null;for(let N=0;N<Q.length;N++)if(j(a.name)===Q[N].attributes.stroke.value){m=Q[N];break}d3.select(C).style("opacity",()=>d3.select(C).style("opacity")==="1"?"0.33":"1"),d3.select(m).style("opacity",()=>d3.select(m).style("opacity")==="1"?"0":"1")}),w=[];for(let s=0;s<D.length;s++){let a=[];for(let l=0;l<D[s].values.length;l++)a.push(D[s].values[l].score);w.push(a)}const E=document.getElementById("max-round-score"),g=document.getElementById("avg-round-score"),b=document.getElementById("standard-dev");for(let s=0;s<w.length;s++)E.innerHTML+=`<td>${d3.max(w[s])}</td>`;for(let s=0;s<w.length;s++)g.innerHTML+=`<td>${Math.round(d3.mean(w[s])*10)/10}</td>`;for(let s=0;s<w.length;s++)b.innerHTML+=`<td>${Math.round(d3.deviation(w[s])*10)/10}</td>`});