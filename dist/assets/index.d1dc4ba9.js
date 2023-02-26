(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))h(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&h(d)}).observe(document,{childList:!0,subtree:!0});function i(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function h(e){if(e.ep)return;e.ep=!0;const n=i(e);fetch(e.href,n)}})();const H="/super-six-tracker/assets/super-six-scores.31cf4151.csv",$="/super-six-tracker/assets/football.b99eb6b5.svg";document.querySelector("#app").innerHTML=`
  <div id="title">
    <img id="football" src="" alt="Logo" width="60" height="60"/>
    <h1>Super 6 League Tracker</h1>
  </div>
  <h2>QUE SERA SERA, WE'RE GOING TO WORMBELLY</h2>
  <p>Click each name to toggle data series.</p>
  <div id="graph"><div>`;document.getElementById("football").src=$;const o={top:40,right:90,bottom:40,left:80},b=800-o.left-o.right,L=500-o.top-o.bottom,k=b/L;let p=null,u=null;function B(r,a){const i=window.innerWidth,h=window.innerHeight;return i/h>k?(a=L,r=b):(r=i,a=r/k),[r,a]}[p,u]=B();document.querySelector("#app").innerHTML+=`<table width=${p}>
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
 </table>`;const c=d3.select("#graph").append("svg").attr("width",p+o.left+o.right).attr("height",u+o.top+o.bottom).append("g").attr("transform",`translate(${o.left}, ${o.top})`);d3.csv(H).then(function(r){const a=["andy","david","jake","james","jonnie","josh","sam"],i=a.map(function(t){return{name:t,values:r.filter(function(s){return s.name===t}).map(function(s){return{round:+s.round,score:+s.score,score_sum:+s.score_sum}})}});function h(){return d3.axisBottom(n).ticks()}function e(){return d3.axisLeft(d).ticks()}const n=d3.scaleLinear().domain([d3.min(r,function(t){return+t.round}),d3.max(r,function(t){return+t.round})]).range([0,p]);c.append("g").attr("transform",`translate(0, ${u})`).style("font-size","0.75rem").call(d3.axisBottom(n).ticks(d3.max(r,function(t){return+t.round})/2)),c.append("g").attr("class","grid").attr("transform","translate(0,"+u+")").call(h().tickSize(-u).tickFormat("").ticks(d3.max(r,function(t){return+t.round})/2)),c.append("text").attr("text-anchor","center").attr("x",(p-50)/2).attr("y",u+o.bottom).text("Round");const d=d3.scaleLinear().domain([d3.min(r,function(t){return+t.score_sum}),Math.ceil(d3.max(r,function(t){return+t.score_sum})/10)*10]).range([u,0]);c.append("g").style("font-size","0.75rem").call(d3.axisLeft(d).ticks(d3.max(r,function(t){return+t.score_sum})/20)),c.append("g").attr("class","grid").call(e().tickSize(-p).tickFormat("").ticks(d3.max(r,function(t){return+t.score_sum})/20)),c.append("text").attr("text-anchor","center").attr("x",-o.left).attr("y",u/2).text("Points");const g=d3.scaleOrdinal().domain(a).range(d3.schemeDark2),S=d3.line().x(t=>n(+t.round)).y(t=>d(+t.score_sum)),R=c.selectAll("myLines").data(i).join("path").attr("d",t=>S(t.values)).attr("stroke",t=>g(t.name)).style("stroke-width",2).style("fill","none"),E=c.selectAll("myLabels").data(i).join("g").append("text").datum(t=>({name:t.name,value:t.values[t.values.length-1]})).attr("transform",t=>`translate(${n(t.value.round)},${d(t.value.score_sum)})`).attr("x",t=>t.name==="sam"?52:12).text(t=>t.name).style("fill",t=>g(t.name)).style("font-size","15px").style("border","solid").on("click",(t,s)=>{const f=E.selectAll("g")._parents;let y=null;for(let l=0;l<f.length;l++)if(s.name===f[l].innerHTML){y=f[l];break}const x=R.selectAll("path")._parents;let v=null;for(let l=0;l<x.length;l++)if(g(s.name)===x[l].attributes.stroke.value){v=x[l];break}d3.select(y).style("opacity",()=>d3.select(y).style("opacity")==="1"?"0.33":"1"),d3.select(v).style("opacity",()=>d3.select(v).style("opacity")==="1"?"0":"1")}),m=[];for(let t=0;t<i.length;t++){let s=[];for(let f=0;f<i[t].values.length;f++)s.push(i[t].values[f].score);m.push(s)}const M=document.getElementById("max-round-score"),_=document.getElementById("avg-round-score"),A=document.getElementById("standard-dev");for(let t=0;t<m.length;t++)M.innerHTML+=`<td>${d3.max(m[t])}</td>`;for(let t=0;t<m.length;t++)_.innerHTML+=`<td>${Math.round(d3.mean(m[t])*10)/10}</td>`;for(let t=0;t<m.length;t++)A.innerHTML+=`<td>${Math.round(d3.deviation(m[t])*10)/10}</td>`});
