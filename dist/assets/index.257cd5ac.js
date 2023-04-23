(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))g(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const f of o.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&g(f)}).observe(document,{childList:!0,subtree:!0});function c(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function g(e){if(e.ep)return;e.ep=!0;const o=c(e);fetch(e.href,o)}})();const O="/super-six-tracker/assets/super-six-scores.114834fa.csv",T="/super-six-tracker/assets/football.b99eb6b5.svg";document.querySelector("#app").innerHTML=`
  <div id="title">
    <img id="football" src="" alt="Logo" width="60" height="60"/>
    <h1>Super 6 League Tracker</h1>
  </div>
  <h2>QUE SERA SERA, WE'RE GOING TO WORMBELLY</h2>
  <p>Click each name to toggle data series.</p>
  <div id="graph"><div>`;document.getElementById("football").src=T;const l={top:40,right:80,bottom:40,left:80},u=800-l.left-l.right,R=500-l.top-l.bottom,S=u/R;let a=null,m=null;function $(r,i){const c=window.innerWidth,g=window.innerHeight;return c/g>S?(i=R,r=u):(r=c+l.left,i=r/S),[r,i]}[a,m]=$();document.querySelector("#app").innerHTML+=`<table width=${a}>
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
 </table>`;const d=d3.select("#graph").append("svg").attr("width",a+l.left+l.right).attr("height",m+l.top+l.bottom).append("g").attr("transform",`translate(${l.left}, ${l.top})`);d3.csv(O).then(function(r){const i=["andy","david","jake","james","jonnie","josh","sam"],c=i.map(function(t){return{name:t,values:r.filter(function(n){return n.name===t}).map(function(n){return{round:+n.round,score:+n.score,score_sum:+n.score_sum}})}});function g(){return d3.axisBottom(o).ticks()}function e(){return d3.axisLeft(f).ticks()}const o=d3.scaleLinear().domain([d3.min(r,function(t){return+t.round}),d3.max(r,function(t){return+t.round})]).range([0,a]);d.append("g").attr("transform",`translate(0, ${m})`).style("font-size","0.75rem").call(d3.axisBottom(o).ticks(d3.max(r,function(t){return+t.round})/2)),d.append("g").attr("class","grid").attr("transform","translate(0,"+m+")").call(g().tickSize(-m).tickFormat("").ticks(d3.max(r,function(t){return+t.round})/2)),d.append("text").attr("text-anchor","center").attr("x",(a-50)/2).attr("y",m+l.bottom).text("Round");const f=d3.scaleLinear().domain([d3.min(r,function(t){return+t.score_sum}),Math.ceil(d3.max(r,function(t){return+t.score_sum})/10)*10]).range([m,0]);d.append("g").style("font-size","0.75rem").call(d3.axisLeft(f).ticks(a===u?d3.max(r,function(t){return+t.score_sum})/20:d3.max(r,function(t){return+t.score_sum})/40)),d.append("g").attr("class","grid").call(e().tickSize(-a).tickFormat("").ticks(a===u?d3.max(r,function(t){return+t.score_sum})/20:d3.max(r,function(t){return+t.score_sum})/10)),d.append("text").attr("text-anchor","center").attr("transform",a===u?"rotate(0)":"rotate(-90)").attr("x",a===u?-l.left:-m/2).attr("y",a===u?m/2:-l.top).text("Points");const y=d3.scaleOrdinal().domain(i).range(d3.schemeDark2),_=d3.line().x(t=>o(+t.round)).y(t=>f(+t.score_sum)),w=d.selectAll("myLines").data(c).join("path").attr("d",t=>_(t.values)).attr("stroke",t=>y(t.name)).style("stroke-width",2).style("fill","none"),A=d.selectAll("myDots").data(i).enter().append("circle").attr("cx",function(t,n){return a===u?0+n*100:0+n*70}).attr("cy",-20).attr("r",5).style("fill",t=>y(t)),E=d.selectAll("myLabels").data(i).enter().append("text").attr("x",function(t,n){return a===u?10+n*100:8+n*70}).attr("y",-15).attr("class","legend-label").style("fill",t=>y(t)).text(function(t){return t}).attr("text-anchor","left").style("alignment-baseline","middle").on("click",(t,n)=>{const h=E.selectAll("g")._parents;let x=null;for(let s=0;s<h.length;s++)if(n===h[s].innerHTML){x=h[s];break}const v=w.selectAll("path")._parents;let b=null;for(let s=0;s<v.length;s++)if(y(n)===v[s].attributes.stroke.value){b=v[s];break}const k=A.selectAll("g")._parents;let L=null;for(let s=0;s<k.length;s++){let N=window.getComputedStyle(k[s]);if(`${d3.color(y(n)).formatRgb()}`===N.getPropertyValue("fill")){L=k[s];break}}d3.select(x).style("opacity",()=>d3.select(x).style("opacity")==="1"?"0.33":"1"),d3.select(b).style("opacity",()=>d3.select(b).style("opacity")==="1"?"0":"1"),d3.select(L).style("opacity",()=>window.getComputedStyle(L).getPropertyValue("opacity")==="1"?"0.33":"1")}),p=[];for(let t=0;t<c.length;t++){let n=[];for(let h=0;h<c[t].values.length;h++)n.push(c[t].values[h].score);p.push(n)}const M=document.getElementById("max-round-score"),H=document.getElementById("avg-round-score"),B=document.getElementById("standard-dev");for(let t=0;t<p.length;t++)M.innerHTML+=`<td>${d3.max(p[t])}</td>`;for(let t=0;t<p.length;t++)H.innerHTML+=`<td>${Math.round(d3.mean(p[t])*10)/10}</td>`;for(let t=0;t<p.length;t++)B.innerHTML+=`<td>${Math.round(d3.deviation(p[t])*10)/10}</td>`});
