(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))p(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const m of o.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&p(m)}).observe(document,{childList:!0,subtree:!0});function c(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function p(e){if(e.ep)return;e.ep=!0;const o=c(e);fetch(e.href,o)}})();const O="/super-six-tracker/assets/super-six-scores.dca1fac3.csv",T="/super-six-tracker/assets/football.b99eb6b5.svg";document.querySelector("#app").innerHTML=`
  <div id="title">
    <img id="football" src="" alt="Logo" width="60" height="60"/>
    <h1>Super 6 League Tracker</h1>
  </div>
  <h2>QUE SERA SERA, WE'RE GOING TO WORMBELLY</h2>
  <p>Click each name to toggle data series.</p>
  <div id="graph"><div>`;document.getElementById("football").src=T;const l={top:40,right:80,bottom:40,left:80},g=800-l.left-l.right,R=500-l.top-l.bottom,S=g/R;let i=null,u=null;function $(r,a){const c=window.innerWidth,p=window.innerHeight;return c/p>S?(a=R,r=g):(r=c+l.left+l.right,a=r/S),[r,a]}[i,u]=$();document.querySelector("#app").innerHTML+=`<table width=${i}>
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
 </table>`;const d=d3.select("#graph").append("svg").attr("width",i+l.left+l.right).attr("height",u+l.top+l.bottom).append("g").attr("transform",`translate(${l.left}, ${l.top})`);d3.csv(O).then(function(r){const a=["andy","david","jake","james","jonnie","josh","sam"],c=a.map(function(t){return{name:t,values:r.filter(function(n){return n.name===t}).map(function(n){return{round:+n.round,score:+n.score,score_sum:+n.score_sum}})}});function p(){return d3.axisBottom(o).ticks()}function e(){return d3.axisLeft(m).ticks()}const o=d3.scaleLinear().domain([d3.min(r,function(t){return+t.round}),d3.max(r,function(t){return+t.round})]).range([0,i]);d.append("g").attr("transform",`translate(0, ${u})`).style("font-size","0.75rem").call(d3.axisBottom(o).ticks(d3.max(r,function(t){return+t.round})/2)),d.append("g").attr("class","grid").attr("transform","translate(0,"+u+")").call(p().tickSize(-u).tickFormat("").ticks(d3.max(r,function(t){return+t.round})/2)),d.append("text").attr("text-anchor","center").attr("x",(i-50)/2).attr("y",u+l.bottom).text("Round");const m=d3.scaleLinear().domain([d3.min(r,function(t){return+t.score_sum}),Math.ceil(d3.max(r,function(t){return+t.score_sum})/10)*10]).range([u,0]);d.append("g").style("font-size","0.75rem").call(d3.axisLeft(m).ticks(i===g?d3.max(r,function(t){return+t.score_sum})/20:d3.max(r,function(t){return+t.score_sum})/40)),d.append("g").attr("class","grid").call(e().tickSize(-i).tickFormat("").ticks(i===g?d3.max(r,function(t){return+t.score_sum})/20:d3.max(r,function(t){return+t.score_sum})/10)),d.append("text").attr("text-anchor","center").attr("x",-l.left).attr("y",u/2).text("Points");const y=d3.scaleOrdinal().domain(a).range(d3.schemeDark2),_=d3.line().x(t=>o(+t.round)).y(t=>m(+t.score_sum)),w=d.selectAll("myLines").data(c).join("path").attr("d",t=>_(t.values)).attr("stroke",t=>y(t.name)).style("stroke-width",2).style("fill","none"),A=d.selectAll("myDots").data(a).enter().append("circle").attr("cx",function(t,n){return i===g?0+n*100:0+n*80}).attr("cy",-20).attr("r",5).style("fill",t=>y(t)),E=d.selectAll("myLabels").data(a).enter().append("text").attr("x",function(t,n){return i===g?10+n*100:8+n*80}).attr("y",-15).attr("class","legend-label").style("fill",t=>y(t)).text(function(t){return t}).attr("text-anchor","left").style("alignment-baseline","middle").on("click",(t,n)=>{const h=E.selectAll("g")._parents;let x=null;for(let s=0;s<h.length;s++)if(n===h[s].innerHTML){x=h[s];break}const v=w.selectAll("path")._parents;let b=null;for(let s=0;s<v.length;s++)if(y(n)===v[s].attributes.stroke.value){b=v[s];break}const k=A.selectAll("g")._parents;let L=null;for(let s=0;s<k.length;s++){let N=window.getComputedStyle(k[s]);if(`${d3.color(y(n)).formatRgb()}`===N.getPropertyValue("fill")){L=k[s];break}}d3.select(x).style("opacity",()=>d3.select(x).style("opacity")==="1"?"0.33":"1"),d3.select(b).style("opacity",()=>d3.select(b).style("opacity")==="1"?"0":"1"),d3.select(L).style("opacity",()=>window.getComputedStyle(L).getPropertyValue("opacity")==="1"?"0.33":"1")}),f=[];for(let t=0;t<c.length;t++){let n=[];for(let h=0;h<c[t].values.length;h++)n.push(c[t].values[h].score);f.push(n)}const M=document.getElementById("max-round-score"),H=document.getElementById("avg-round-score"),B=document.getElementById("standard-dev");for(let t=0;t<f.length;t++)M.innerHTML+=`<td>${d3.max(f[t])}</td>`;for(let t=0;t<f.length;t++)H.innerHTML+=`<td>${Math.round(d3.mean(f[t])*10)/10}</td>`;for(let t=0;t<f.length;t++)B.innerHTML+=`<td>${Math.round(d3.deviation(f[t])*10)/10}</td>`});
