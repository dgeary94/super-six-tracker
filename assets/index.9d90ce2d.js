(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))p(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const f of o.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&p(f)}).observe(document,{childList:!0,subtree:!0});function l(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function p(e){if(e.ep)return;e.ep=!0;const o=l(e);fetch(e.href,o)}})();const _="/super-six-tracker/assets/super-six-scores.31cf4151.csv",B="/super-six-tracker/assets/football.b99eb6b5.svg";document.querySelector("#app").innerHTML=`
  <div id="title">
    <img id="football" src="" alt="Logo" width="60" height="60"/>
    <h1>Super 6 League Tracker</h1>
  </div>
  <h2>QUE SERA SERA, WE'RE GOING TO WORMBELLY</h2>
  <p>Click each name to toggle data series.</p>
  <div id="graph"><div>`;document.getElementById("football").src=B;const i={top:40,right:90,bottom:40,left:80},y=800-i.left-i.right,L=500-i.top-i.bottom,k=y/L;let u=null,d=null;function O(r,s){const l=window.innerWidth,p=window.innerHeight;return l/p>k?(s=L,r=y):(r=l,s=r/k),[r,s]}[u,d]=O();document.querySelector("#app").innerHTML+=`<table width=${u}>
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
 </table>`;const c=d3.select("#graph").append("svg").attr("width",u+i.left+i.right).attr("height",d+i.top+i.bottom).append("g").attr("transform",`translate(${i.left}, ${i.top})`);d3.csv(_).then(function(r){const s=["andy","david","jake","james","jonnie","josh","sam"],l=s.map(function(t){return{name:t,values:r.filter(function(n){return n.name===t}).map(function(n){return{round:+n.round,score:+n.score,score_sum:+n.score_sum}})}});function p(){return d3.axisBottom(o).ticks()}function e(){return d3.axisLeft(f).ticks()}const o=d3.scaleLinear().domain([d3.min(r,function(t){return+t.round}),d3.max(r,function(t){return+t.round})]).range([0,u]);c.append("g").attr("transform",`translate(0, ${d})`).style("font-size","0.75rem").call(d3.axisBottom(o).ticks(d3.max(r,function(t){return+t.round})/2)),c.append("g").attr("class","grid").attr("transform","translate(0,"+d+")").call(p().tickSize(-d).tickFormat("").ticks(d3.max(r,function(t){return+t.round})/2)),c.append("text").attr("text-anchor","center").attr("x",(u-50)/2).attr("y",d+i.bottom).text("Round");const f=d3.scaleLinear().domain([d3.min(r,function(t){return+t.score_sum}),Math.ceil(d3.max(r,function(t){return+t.score_sum})/10)*10]).range([d,0]);c.append("g").style("font-size","0.75rem").call(d3.axisLeft(f).ticks(d3.max(r,function(t){return+t.score_sum})/20)),c.append("g").attr("class","grid").call(e().tickSize(-u).tickFormat("").ticks(d3.max(r,function(t){return+t.score_sum})/20)),c.append("text").attr("text-anchor","center").attr("x",-i.left).attr("y",d/2).text("Points");const g=d3.scaleOrdinal().domain(s).range(d3.schemeDark2),S=d3.line().x(t=>o(+t.round)).y(t=>f(+t.score_sum)),R=c.selectAll("myLines").data(l).join("path").attr("d",t=>S(t.values)).attr("stroke",t=>g(t.name)).style("stroke-width",2).style("fill","none");c.selectAll("myDots").data(s).enter().append("circle").attr("cx",function(t,n){return u===y?0+n*100:0+n*62}).attr("cy",-20).attr("r",5).style("fill",t=>g(t));const E=c.selectAll("myLabels").data(s).enter().append("text").attr("x",function(t,n){return u===y?10+n*100:8+n*62}).attr("y",-15).style("fill",t=>g(t)).text(function(t){return t}).attr("text-anchor","left").style("alignment-baseline","middle").on("click",(t,n)=>{const h=E.selectAll("g")._parents;let x=null;for(let a=0;a<h.length;a++)if(n===h[a].innerHTML){x=h[a];break}const v=R.selectAll("path")._parents;let b=null;for(let a=0;a<v.length;a++)if(g(n)===v[a].attributes.stroke.value){b=v[a];break}d3.select(x).style("opacity",()=>d3.select(x).style("opacity")==="1"?"0.33":"1"),d3.select(b).style("opacity",()=>d3.select(b).style("opacity")==="1"?"0":"1")}),m=[];for(let t=0;t<l.length;t++){let n=[];for(let h=0;h<l[t].values.length;h++)n.push(l[t].values[h].score);m.push(n)}const M=document.getElementById("max-round-score"),A=document.getElementById("avg-round-score"),H=document.getElementById("standard-dev");for(let t=0;t<m.length;t++)M.innerHTML+=`<td>${d3.max(m[t])}</td>`;for(let t=0;t<m.length;t++)A.innerHTML+=`<td>${Math.round(d3.mean(m[t])*10)/10}</td>`;for(let t=0;t<m.length;t++)H.innerHTML+=`<td>${Math.round(d3.deviation(m[t])*10)/10}</td>`});
