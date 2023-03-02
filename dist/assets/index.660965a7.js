(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))p(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const m of o.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&p(m)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function p(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const _="/super-six-tracker/assets/super-six-scores.f85d9dcc.csv",B="/super-six-tracker/assets/football.b99eb6b5.svg";document.querySelector("#app").innerHTML=`
  <div id="title">
    <img id="football" src="" alt="Logo" width="60" height="60"/>
    <h1>Super 6 League Tracker</h1>
  </div>
  <h2>QUE SERA SERA, WE'RE GOING TO WORMBELLY</h2>
  <p>Click each name to toggle data series.</p>
  <div id="graph"><div>`;document.getElementById("football").src=B;const a={top:40,right:90,bottom:40,left:80},y=800-a.left-a.right,L=500-a.top-a.bottom,k=y/L;let u=null,d=null;function O(r,s){const i=window.innerWidth,p=window.innerHeight;return i/p>k?(s=L,r=y):(r=i,s=r/k),[r,s]}[u,d]=O();document.querySelector("#app").innerHTML+=`<table width=${u}>
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
 </table>`;const c=d3.select("#graph").append("svg").attr("width",u+a.left+a.right).attr("height",d+a.top+a.bottom).append("g").attr("transform",`translate(${a.left}, ${a.top})`);d3.csv(_).then(function(r){const s=["andy","david","jake","james","jonnie","josh","sam"],i=s.map(function(t){return{name:t,values:r.filter(function(n){return n.name===t}).map(function(n){return{round:+n.round,score:+n.score,score_sum:+n.score_sum}})}});function p(){return d3.axisBottom(o).ticks()}function e(){return d3.axisLeft(m).ticks()}const o=d3.scaleLinear().domain([d3.min(r,function(t){return+t.round}),d3.max(r,function(t){return+t.round})]).range([0,u]);c.append("g").attr("transform",`translate(0, ${d})`).style("font-size","0.75rem").call(d3.axisBottom(o).ticks(d3.max(r,function(t){return+t.round})/2)),c.append("g").attr("class","grid").attr("transform","translate(0,"+d+")").call(p().tickSize(-d).tickFormat("").ticks(d3.max(r,function(t){return+t.round})/2)),c.append("text").attr("text-anchor","center").attr("x",(u-50)/2).attr("y",d+a.bottom).text("Round");const m=d3.scaleLinear().domain([d3.min(r,function(t){return+t.score_sum}),Math.ceil(d3.max(r,function(t){return+t.score_sum})/10)*10]).range([d,0]);c.append("g").style("font-size","0.75rem").call(d3.axisLeft(m).ticks(d3.max(r,function(t){return+t.score_sum})/20)),c.append("g").attr("class","grid").call(e().tickSize(-u).tickFormat("").ticks(d3.max(r,function(t){return+t.score_sum})/20)),c.append("text").attr("text-anchor","center").attr("x",-a.left).attr("y",d/2).text("Points");const g=d3.scaleOrdinal().domain(s).range(d3.schemeDark2),S=d3.line().x(t=>o(+t.round)).y(t=>m(+t.score_sum)),R=c.selectAll("myLines").data(i).join("path").attr("d",t=>S(t.values)).attr("stroke",t=>g(t.name)).style("stroke-width",2).style("fill","none");c.selectAll("myDots").data(s).enter().append("circle").attr("cx",function(t,n){return u===y?0+n*100:0+n*62}).attr("cy",-20).attr("r",5).style("fill",t=>g(t));const E=c.selectAll("myLabels").data(s).enter().append("text").attr("x",function(t,n){return u===y?10+n*100:8+n*62}).attr("y",-15).style("fill",t=>g(t)).text(function(t){return t}).attr("text-anchor","left").style("alignment-baseline","middle").on("click",(t,n)=>{const h=E.selectAll("g")._parents;let x=null;for(let l=0;l<h.length;l++)if(n===h[l].innerHTML){x=h[l];break}const v=R.selectAll("path")._parents;let b=null;for(let l=0;l<v.length;l++)if(g(n)===v[l].attributes.stroke.value){b=v[l];break}d3.select(x).style("opacity",()=>d3.select(x).style("opacity")==="1"?"0.33":"1"),d3.select(b).style("opacity",()=>d3.select(b).style("opacity")==="1"?"0":"1")}),f=[];for(let t=0;t<i.length;t++){let n=[];for(let h=0;h<i[t].values.length;h++)n.push(i[t].values[h].score);f.push(n)}const M=document.getElementById("max-round-score"),A=document.getElementById("avg-round-score"),H=document.getElementById("standard-dev");for(let t=0;t<f.length;t++)M.innerHTML+=`<td>${d3.max(f[t])}</td>`;for(let t=0;t<f.length;t++)A.innerHTML+=`<td>${Math.round(d3.mean(f[t])*10)/10}</td>`;for(let t=0;t<f.length;t++)H.innerHTML+=`<td>${Math.round(d3.deviation(f[t])*10)/10}</td>`});
