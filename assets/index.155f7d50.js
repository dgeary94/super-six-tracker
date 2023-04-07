(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))h(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const m of o.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&h(m)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function h(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const O="/super-six-tracker/assets/super-six-scores.dca1fac3.csv",T="/super-six-tracker/assets/football.b99eb6b5.svg";document.querySelector("#app").innerHTML=`
  <div id="title">
    <img id="football" src="" alt="Logo" width="60" height="60"/>
    <h1>Super 6 League Tracker</h1>
  </div>
  <h2>QUE SERA SERA, WE'RE GOING TO WORMBELLY</h2>
  <p>Click each name to toggle data series.</p>
  <div id="graph"><div>`;document.getElementById("football").src=T;const a={top:40,right:80,bottom:40,left:80},y=800-a.left-a.right,R=500-a.top-a.bottom,S=y/R;let u=null,c=null;function $(r,l){const i=window.innerWidth,h=window.innerHeight;return i/h>S?(l=R,r=y):(r=i,l=r/S),[r,l]}[u,c]=$();document.querySelector("#app").innerHTML+=`<table width=${u}>
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
 </table>`;const d=d3.select("#graph").append("svg").attr("width",u+a.left+a.right).attr("height",c+a.top+a.bottom).append("g").attr("transform",`translate(${a.left}, ${a.top})`);d3.csv(O).then(function(r){const l=["andy","david","jake","james","jonnie","josh","sam"],i=l.map(function(t){return{name:t,values:r.filter(function(n){return n.name===t}).map(function(n){return{round:+n.round,score:+n.score,score_sum:+n.score_sum}})}});function h(){return d3.axisBottom(o).ticks()}function e(){return d3.axisLeft(m).ticks()}const o=d3.scaleLinear().domain([d3.min(r,function(t){return+t.round}),d3.max(r,function(t){return+t.round})]).range([0,u]);d.append("g").attr("transform",`translate(0, ${c})`).style("font-size","0.75rem").call(d3.axisBottom(o).ticks(d3.max(r,function(t){return+t.round})/2)),d.append("g").attr("class","grid").attr("transform","translate(0,"+c+")").call(h().tickSize(-c).tickFormat("").ticks(d3.max(r,function(t){return+t.round})/2)),d.append("text").attr("text-anchor","center").attr("x",(u-50)/2).attr("y",c+a.bottom).text("Round");const m=d3.scaleLinear().domain([d3.min(r,function(t){return+t.score_sum}),Math.ceil(d3.max(r,function(t){return+t.score_sum})/10)*10]).range([c,0]);d.append("g").style("font-size","0.75rem").call(d3.axisLeft(m).ticks(d3.max(r,function(t){return+t.score_sum})/20)),d.append("g").attr("class","grid").call(e().tickSize(-u).tickFormat("").ticks(d3.max(r,function(t){return+t.score_sum})/20)),d.append("text").attr("text-anchor","center").attr("x",-a.left).attr("y",c/2).text("Points");const g=d3.scaleOrdinal().domain(l).range(d3.schemeDark2),w=d3.line().x(t=>o(+t.round)).y(t=>m(+t.score_sum)),A=d.selectAll("myLines").data(i).join("path").attr("d",t=>w(t.values)).attr("stroke",t=>g(t.name)).style("stroke-width",2).style("fill","none"),E=d.selectAll("myDots").data(l).enter().append("circle").attr("cx",function(t,n){return u===y?0+n*100:0+n*62}).attr("cy",-20).attr("r",5).style("fill",t=>g(t)),M=d.selectAll("myLabels").data(l).enter().append("text").attr("x",function(t,n){return u===y?10+n*100:8+n*62}).attr("y",-15).attr("class","legend-label").style("fill",t=>g(t)).text(function(t){return t}).attr("text-anchor","left").style("alignment-baseline","middle").on("click",(t,n)=>{const p=M.selectAll("g")._parents;let x=null;for(let s=0;s<p.length;s++)if(n===p[s].innerHTML){x=p[s];break}const v=A.selectAll("path")._parents;let b=null;for(let s=0;s<v.length;s++)if(g(n)===v[s].attributes.stroke.value){b=v[s];break}const k=E.selectAll("g")._parents;let L=null;for(let s=0;s<k.length;s++){let N=window.getComputedStyle(k[s]);if(`${d3.color(g(n)).formatRgb()}`===N.getPropertyValue("fill")){L=k[s];break}}d3.select(x).style("opacity",()=>d3.select(x).style("opacity")==="1"?"0.33":"1"),d3.select(b).style("opacity",()=>d3.select(b).style("opacity")==="1"?"0":"1"),d3.select(L).style("opacity",()=>window.getComputedStyle(L).getPropertyValue("opacity")==="1"?"0.33":"1")}),f=[];for(let t=0;t<i.length;t++){let n=[];for(let p=0;p<i[t].values.length;p++)n.push(i[t].values[p].score);f.push(n)}const _=document.getElementById("max-round-score"),H=document.getElementById("avg-round-score"),B=document.getElementById("standard-dev");for(let t=0;t<f.length;t++)_.innerHTML+=`<td>${d3.max(f[t])}</td>`;for(let t=0;t<f.length;t++)H.innerHTML+=`<td>${Math.round(d3.mean(f[t])*10)/10}</td>`;for(let t=0;t<f.length;t++)B.innerHTML+=`<td>${Math.round(d3.deviation(f[t])*10)/10}</td>`});
