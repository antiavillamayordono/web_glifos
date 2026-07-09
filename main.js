/* =============================================================
   GLIFOS · main.js
   ============================================================= */
(function () {
  "use strict";
  var CFG = window.__CONFIG__ || {};
  var DATA = (window.__GLIFOS_DATA__ && window.__GLIFOS_DATA__.editions) || [];
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  var $ = function (s, sc) { return (sc || document).querySelector(s); };
  var $$ = function (s, sc) { return Array.prototype.slice.call((sc || document).querySelectorAll(s)); };
  function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c];});}
  function safe(fn,n){try{fn();}catch(e){if(window.console)console.warn("["+n+"]",e);}}
  function norm(s){return String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]/g,"");}
  // Respuestas aceptadas de un glifo: su nombre + las variantes en g.alt (texto o n\u00famero).
  function accepts(g,val){var n=norm(val);if(!n)return false;if(norm(g.name)===n)return true;var a=g.alt||[];for(var i=0;i<a.length;i++){if(norm(a[i])===n)return true;}return false;}

  var I=window.__I18N__; function t(k){return (I&&I.t)?I.t(k):k;}
  // Texto configurable que puede ser una cadena (igual en los 3 idiomas) o un objeto {es,gl,ca}.
  function loc(v){if(v==null)return "";if(typeof v!=="object")return String(v);var lg=(I&&I.getLang)?I.getLang():"es";return v[lg]||v.es||v.gl||v.ca||"";}
  var SEASON={personajes:"verano",peliculas:"navidad"};
  var SRANK={personajes:0,peliculas:1}; // verano antes que navidad
  function CATL(c){return t("cat."+c);}
  function SLBLf(sea){return t("season."+sea);}

  function seasonOf(c){return SEASON[c]||"verano";}
  function editionTitle(e){return SLBLf(seasonOf(e.category))+" "+e.year+" · "+CATL(e.category);}
  function chronoKey(e){return e.year+SRANK[e.category]/10;} // navidad > verano dentro del año
  function pairsOf(e){var m={};e.glyphs.forEach(function(g,i){if(g.bisOf!=null)m[g.bisOf]=i;});return m;}
  function combine(a,b){var s=(a.s==="h"||b.s==="h")?"h":((a.s==="m"||b.s==="m")?"m":"n");var o={s:s};if(a.f||b.f)o.f=1;return o;}
  function logicalCells(p,e){if(!e)return p.cells;var pr=pairsOf(e),out=[];e.glyphs.forEach(function(g,i){if(g.bisOf!=null)return;if(g.hasBis&&pr[i]!=null)out.push(combine(p.cells[i],p.cells[pr[i]]));else out.push(p.cells[i]);});return out;}
  function hits(p,e){return logicalCells(p,e).reduce(function(a,c){return a+(c.s==="h"?1:0);},0);}
  function misses(p,e){return logicalCells(p,e).reduce(function(a,c){return a+(c.s==="m"?1:0);},0);}
  function starsOf(p,e){return logicalCells(p,e).reduce(function(a,c){return a+(c.f?1:0);},0);}
  function numLabel(e,i){var g=e.glyphs[i];return g.bisOf!=null?(g.bisOf+1):(i+1);}
  function editionsNewestFirst(){return DATA.slice().sort(function(a,b){return chronoKey(b)-chronoKey(a);});}
  function editionOf(y,c){return DATA.filter(function(e){return e.year===y&&e.category===c;})[0];}
  function glyphImg(e,i){var g=e.glyphs[i];var num=g.bisOf!=null?(g.bisOf+1):(i+1);var suf=g.bisOf!=null?"b":"";return "assets/img/glifos/"+e.year+"-"+e.category+"-"+("0"+num).slice(-2)+suf+".webp";}
  function fastestList(e){var o=e.glyphs.map(function(){return null;});e.participants.forEach(function(p){p.cells.forEach(function(c,i){if(c.f)o[i]=p.user;});});return o;}

  /* aggregate participant across ALL editions */
  function profileOf(user){
    var key=norm(user);
    var a={user:user,hits:0,misses:0,stars:0,contests:0,best:null,gold:0,silver:0,bronze:0,editions:[]};
    DATA.forEach(function(e){
      var p=e.participants.filter(function(x){return norm(x.user)===key;})[0]; if(!p)return;
      var h=hits(p,e),m=misses(p,e),s=starsOf(p,e);
      a.hits+=h;a.misses+=m;a.stars+=s;a.contests++;
      if(a.best===null||p.pos<a.best)a.best=p.pos;
      if(p.pos===1)a.gold++;else if(p.pos===2)a.silver++;else if(p.pos===3)a.bronze++;
      a.editions.push({year:e.year,category:e.category,title:editionTitle(e),pos:p.pos,hits:h,stars:s});
    });
    a.editions.sort(function(x,y){return (y.year+SRANK[y.category]/10)-(x.year+SRANK[x.category]/10);});
    a.loyalty = DATA.length? a.contests/DATA.length : 0;
    a.top5 = a.editions.filter(function(x){return x.pos<=5;}).length;
    a.top10 = a.editions.filter(function(x){return x.pos<=10;}).length;
    return a;
  }

  /* ---------- petroglyph art ---------- */
  function spiralPath(){var pts=[],t=0,cx=32,cy=32,turns=3.2,rmax=26;while(t<turns*2*Math.PI){var r=rmax*(t/(turns*2*Math.PI));pts.push((cx+r*Math.cos(t)).toFixed(1)+","+(cy+r*Math.sin(t)).toFixed(1));t+=0.22;}return "M "+pts.join(" L ");}
  var PETRO='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>'+
    '<symbol id="p-spiral" viewBox="0 0 64 64"><path d="'+spiralPath()+'" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></symbol>'+
    '<symbol id="p-deer" viewBox="0 0 64 64"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 40 L44 40"/><path d="M14 40 L12 54 M22 40 L22 54 M36 40 L36 54 M44 40 L46 54"/><path d="M44 40 L52 30"/><path d="M52 30 L54 20 M52 30 L60 24 M52 30 L48 20"/><path d="M14 40 L10 30 L14 24"/></g></symbol>'+
    '<symbol id="p-rings" viewBox="0 0 64 64"><g fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="32" cy="32" r="6"/><circle cx="32" cy="32" r="14"/><circle cx="32" cy="32" r="22"/><circle cx="32" cy="32" r="2.5" fill="currentColor"/></g></symbol>'+
    '<symbol id="p-idol" viewBox="0 0 64 64"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="32" cy="16" r="8"/><path d="M32 24 L32 48"/><path d="M18 34 L46 34"/><path d="M32 48 L22 60 M32 48 L42 60"/></g></symbol>'+
    '<symbol id="p-snake" viewBox="0 0 64 64"><path d="M6 24 Q16 10 24 24 T42 24 T60 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M6 42 Q16 28 24 42 T42 42 T60 42" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></symbol>'+
    '</defs></svg>';
  var SCATTER=[["spiral","top:6%;left:3%;width:110px;height:110px;color:var(--teal)"],["deer","top:18%;right:5%;width:88px;height:88px;color:var(--coral)"],["rings","top:46%;left:7%;width:78px;height:78px;color:var(--blue)"],["idol","top:68%;right:9%;width:70px;height:70px;color:var(--purple)"],["snake","top:84%;left:42%;width:110px;height:64px;color:var(--green)"],["spiral","top:32%;right:40%;width:64px;height:64px;color:var(--mustard)"]];
  function initPetro(){if(!$("#p-spiral"))document.body.insertAdjacentHTML("afterbegin",PETRO);var bg=$("[data-petro]");if(bg)bg.innerHTML=SCATTER.map(function(s){return '<svg data-motif style="'+s[1]+'"><use href="#p-'+s[0]+'"/></svg>';}).join("");}

  /* ---------- basics ---------- */
  function initYear(){$$("[data-year]").forEach(function(el){el.textContent=new Date().getFullYear();});}
  function initNav(){var nav=$("#nav");if(!nav)return;var b=$(".nav__burger",nav);if(!b)return;b.addEventListener("click",function(){var o=nav.classList.toggle("is-open");b.setAttribute("aria-expanded",o?"true":"false");});$$(".nav__mobile a",nav).forEach(function(a){a.addEventListener("click",function(){nav.classList.remove("is-open");});});}
  function initSplash(){var s=$(".splash");if(s)setTimeout(function(){s.style.display="none";},3200);}
  function initReveals(){var els=$$(".reveal");if(!("IntersectionObserver" in window)||reduced){els.forEach(function(e){e.classList.add("is-in");});return;}var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add("is-in");io.unobserve(x.target);}});},{threshold:0.05,rootMargin:"0px 0px -8% 0px"});els.forEach(function(e){io.observe(e);});setTimeout(function(){els.forEach(function(e){e.classList.add("is-in");});},6000);}
  function initCounts(){var els=$$("[data-count]");if(!els.length)return;function run(el){var to=parseInt(el.getAttribute("data-count"),10)||0;if(reduced){el.textContent=to;return;}var st=null;function step(t){if(!st)st=t;var p=Math.min((t-st)/1300,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step);}requestAnimationFrame(step);}if(!("IntersectionObserver" in window)){els.forEach(run);return;}var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){run(x.target);io.unobserve(x.target);}});},{threshold:0.4});els.forEach(function(e){io.observe(e);});}

  /* ---------- modals ---------- */
  function openModal(id){var o=$(id);if(o)o.classList.add("open");}
  function closeModal(o){o.classList.remove("open");}
  function initModals(){$$(".overlay").forEach(function(o){o.addEventListener("click",function(e){if(e.target===o)closeModal(o);});$$(".close",o).forEach(function(b){b.addEventListener("click",function(){closeModal(o);});});});document.addEventListener("keydown",function(e){if(e.key==="Escape")$$(".overlay.open").forEach(closeModal);});
    // tabs inside glyph modal
    $$("#glyph-modal .tab").forEach(function(t){t.addEventListener("click",function(){var k=t.getAttribute("data-tab");$$("#glyph-modal .tab").forEach(function(x){x.classList.toggle("is-active",x===t);});$("[data-tab-jugar]").hidden=(k!=="jugar");$("[data-tab-stats]").hidden=(k!=="stats");});});
  }
  function glyphTab(k){var t=$('#glyph-modal .tab[data-tab="'+k+'"]');if(t)t.click();}

  /* ---------- glyph detail ---------- */
  function showGlyph(e,i){
    var g=e.glyphs[i]; if(!g)return; var m=$("#glyph-modal"); if(!m)return;
    var fast=fastestList(e)[i];
    var pct=(g.played&&g.correct!=null)?Math.round(g.correct/g.played*100):null;
    var hasAns=!!g.name;
    var g0=e.glyphs[i];$("[data-g-num]",m).textContent=t("js.glyphNo")+" "+numLabel(e,i)+(g0.bisOf!=null?" "+t("js.secondTry"):"");
    $("[data-g-ed]",m).textContent=editionTitle(e);
    var stage=$("[data-g-stage]",m);
    stage.innerHTML='<img src="'+glyphImg(e,i)+'" alt="Jeroglífico" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'grid\';"><div class="daily__ph" style="display:none"><div class="q3">¿ ? ?</div><p>Imagen por añadir</p></div>';
    var input=$("[data-g-input]",m),fb=$("[data-g-fb]",m),ans=$("[data-g-answer]",m);
    input.value="";fb.textContent="";fb.className="fb";input.disabled=!hasAns;ans.textContent="";ans.style.display="none";
    var check=$("[data-g-check]",m),reveal=$("[data-g-reveal]",m);
    check.onclick=function(){if(!hasAns)return;var v=norm(input.value);if(!v)return;if(accepts(g,input.value)){fb.textContent=t("js.correct");fb.className="fb ok";ans.textContent=t("js.solution")+g.name;ans.style.display="";}else{fb.textContent=t("js.wrong");fb.className="fb no";}};
    input.onkeydown=function(ev){if(ev.key==="Enter")check.onclick();};
    reveal.onclick=function(){ans.textContent=t("js.solution")+g.name;ans.style.display="";};
    // stats tab
    var sc=$("[data-g-c]",m),sp=$("[data-g-pct]",m),sf=$("[data-g-fast]",m);
    sc.textContent=g.correct!=null?g.correct:"—";
    sp.textContent=pct!=null?pct+"%":"—";
    sf.textContent=fast?"@"+fast:"—";
    glyphTab("jugar");
    openModal("#glyph-modal");
  }

  /* ---------- participant profile ---------- */
  function showProfile(user){
    var a=profileOf(user),m=$("#profile-modal"); if(!m)return;
    $("[data-p-name]",m).textContent="@"+a.user;
    var cw=a.contests===1?t("js.contest"):t("js.contests");$("[data-p-sub]",m).textContent=a.contests+" "+cw+(a.best?" · "+t("js.bestPos")+" "+a.best+"º":"");
    $("[data-p-h]",m).textContent=a.hits;$("[data-p-m]",m).textContent=a.misses;$("[data-p-s]",m).textContent=a.stars;
    var badges=[];
    if(a.gold)  badges.push("🥇 ×"+a.gold);
    if(a.silver)badges.push("🥈 ×"+a.silver);
    if(a.bronze)badges.push("🥉 ×"+a.bronze);
    if(a.top5)  badges.push("🏅 Top 5 ×"+a.top5);
    if(a.top10) badges.push("🎖️ Top 10 ×"+a.top10);
    if(a.stars) badges.push("⭐ ×"+a.stars);
    if(a.loyalty>=1) badges.push("💯 Fiel");
    else if(a.loyalty>=0.75) badges.push("📜 Veterano/a");
    var box=$("[data-p-achv]",m);
    box.innerHTML=badges.length?badges.map(function(x){return "<span>"+esc(x)+"</span>";}).join(""):'<span class="muted">'+t("pm.noAchv")+'</span>';
    var list=$("[data-p-editions]",m);
    list.innerHTML='<div class="edrow edrow--head"><span>'+t("pm.edCol1")+'</span><span>'+t("pm.edCol2")+'</span><span>⭐</span></div>'+
      a.editions.map(function(ed){return '<div class="edrow"><span>'+esc(ed.title)+'</span><span class="mono">'+ed.pos+'º · '+ed.hits+' ✓</span><span class="mono star-col">'+(ed.stars?ed.stars+"⭐":"")+'</span></div>';}).join("");
    openModal("#profile-modal");
  }

  /* ---------- tiebreak ---------- */
  function initTiebreak(){var btn=$("[data-open-tiebreak]");if(btn)btn.addEventListener("click",function(){openModal("#tiebreak-modal");});}

  /* ---------- classification ---------- */
  function renderClasificacion(e,mount){
    var head='<thead><tr><th class="corner">'+t("concurso.participant")+'</th><th class="achead">'+t("pm.aciertos")+'</th>';
    for(var i=0;i<e.glyphs.length;i++){var bis=e.glyphs[i].bisOf!=null;head+='<th class="'+(i%5===0?"wk":"")+(bis?" bis":"")+'"><button class="numbtn'+(bis?" is-bis":"")+'" data-g="'+i+'">'+numLabel(e,i)+(bis?'<sup>b</sup>':'')+'</button></th>';}
    head+='</tr></thead>';
    var rows=e.participants.slice().sort(function(a,b){return a.pos-b.pos;});
    var body='<tbody>';
    rows.forEach(function(p){
      var st=starsOf(p,e),sh=st?'<span class="stars">'+Array(Math.min(st,5)+1).join("★")+'</span>':'';
      body+='<tr data-user="'+esc(norm(p.user))+'"><th class="name" data-open-user="'+esc(p.user)+'"><span class="pos">'+p.pos+'º</span>'+esc(p.user)+sh+'</th>';
      body+='<td class="ac">'+hits(p,e)+'</td>';
      p.cells.forEach(function(c,i){var bis=e.glyphs[i].bisOf!=null;var wk=(i%5===0?"wk":"")+(bis?" bis":"");if(c.f)body+='<td class="'+wk+'"><div class="cell star"><span>★</span></div></td>';else{var k={h:"hit",m:"miss",n:"none"}[c.s];body+='<td class="'+wk+'"><div class="cell '+k+'"></div></td>';}});
      body+='</tr>';
    });
    body+='</tbody>';
    mount.innerHTML='<p class="q-hint">'+t("js.scrollHint")+'</p><div class="qwrap"><table class="q">'+head+body+'</table></div>';
    $$(".numbtn",mount).forEach(function(b){b.addEventListener("click",function(){showGlyph(e,+b.getAttribute("data-g"));});});
    $$("[data-open-user]",mount).forEach(function(th){th.addEventListener("click",function(){showProfile(th.getAttribute("data-open-user"));});});
  }
  function renderPodium(e,mount){var medals=["🥇","🥈","🥉"];var top=e.participants.slice().sort(function(a,b){return a.pos-b.pos;}).slice(0,3);mount.innerHTML=top.map(function(p,i){var st=starsOf(p,e);return '<div class="pod pod--'+(i+1)+'"><div class="pod__medal">'+medals[i]+'</div><div class="pod__user" data-open-user="'+esc(p.user)+'" style="cursor:pointer">'+esc(p.user)+'</div><div class="pod__pts">'+hits(p,e)+' '+t("js.aciertosWord")+'</div>'+(st?'<div class="pod__stars">'+Array(st+1).join("★")+'</div>':'')+'</div>';}).join("");$$("[data-open-user]",mount).forEach(function(el){el.addEventListener("click",function(){showProfile(el.getAttribute("data-open-user"));});});}

  /* ---------- controls ---------- */
  function years(){var y={};DATA.forEach(function(e){y[e.year]=1;});return Object.keys(y).map(Number).sort(function(a,b){return b-a;});}
  function catsForYear(y){var c=[];DATA.forEach(function(e){if(e.year===y)c.push(e.category);});return c.sort(function(a,b){return SRANK[a]-SRANK[b];});}
  function buildControls(state,onChange){var yc=$("[data-year-controls]"),cc=$("[data-cat-controls]");if(!yc||!cc)return;function ry(){yc.innerHTML=years().map(function(y){return '<button class="chip-btn'+(y===state.year?" is-active":"")+'" data-y="'+y+'">'+y+'</button>';}).join("");}function rc(){var cs=catsForYear(state.year);if(cs.indexOf(state.cat)===-1)state.cat=cs[0];cc.innerHTML=cs.map(function(c){return '<button class="chip-btn'+(c===state.cat?" is-active":"")+'" data-c="'+c+'">'+SLBLf(seasonOf(c))+' · '+CATL(c)+'</button>';}).join("");}yc.addEventListener("click",function(e){var b=e.target.closest("[data-y]");if(!b)return;state.year=+b.getAttribute("data-y");ry();rc();onChange();});cc.addEventListener("click",function(e){var b=e.target.closest("[data-c]");if(!b)return;state.cat=b.getAttribute("data-c");rc();onChange();});ry();rc();}

  /* ---------- PAGE: Concurso ---------- */
  function currentEdition(){var ac=CFG.activeContest;if(ac){var e=editionOf(ac.year,ac.category);if(e)return {e:e,active:true};}var s=editionsNewestFirst();return s.length?{e:s[0],active:false}:null;}
  function initConcurso(){var mountC=$("[data-clasificacion]");if(!mountC)return;var cur=currentEdition();if(!cur){var tt=$("[data-concurso-title]");if(tt)tt.textContent="Aún no hay concursos";return;}var e=cur.e;var ey=$("[data-concurso-eyebrow]");if(ey)ey.textContent=(cur.active?t("js.contestLive"):t("js.contestLast"))+editionTitle(e);var st=$("[data-concurso-state]");if(st){st.textContent=cur.active?t("js.stateLive"):t("js.stateEnded");st.className="tag "+(cur.active?"tag--verano":"tag--navidad");}var pod=$("[data-podium]");if(pod)renderPodium(e,pod);renderClasificacion(e,mountC);var meta=$("[data-concurso-meta]");if(meta)meta.innerHTML='<span><b>'+e.glyphs.length+'</b> '+t("js.glyphs")+'</span><span><b>'+e.players+'</b> '+t("js.players")+'</span>';var search=$("[data-board-search]");if(search)search.addEventListener("input",function(){var q=norm(search.value);$$(".q tbody tr",mountC).forEach(function(r){var u=r.getAttribute("data-user")||"";var hit=q&&u.indexOf(q)!==-1;r.classList.toggle("is-hit",!!hit);r.classList.toggle("is-dim",q?u.indexOf(q)===-1:false);});});}

  /* ---------- PAGE: Histórico ---------- */
  function initHistorico(){var host=$("[data-historico]");if(!host)return;var ys=years();if(!ys.length)return;var state={year:ys[0],cat:catsForYear(ys[0])[0]};var meta=$("[data-edition-meta]"),mount=$("[data-hist-mount]"),search=$("[data-hist-search]");function applyFilter(){if(!search)return;var q=norm(search.value);$$(".q tbody tr",mount).forEach(function(r){var u=r.getAttribute("data-user")||"";r.classList.toggle("is-hit",!!(q&&u.indexOf(q)!==-1));r.classList.toggle("is-dim",q?u.indexOf(q)===-1:false);});}function render(){var e=editionOf(state.year,state.cat);if(!e){mount.innerHTML="";return;}if(meta)meta.innerHTML='<span><b>'+e.glyphs.length+'</b> '+t("js.glyphs")+'</span><span><b>'+e.players+'</b> '+t("js.players")+'</span><span>'+editionTitle(e)+'</span>';renderClasificacion(e,mount);applyFilter();}if(search)search.addEventListener("input",applyFilter);buildControls(state,render);render();}

  /* ---------- Modo libre ---------- */
  function initRandom(){var host=$("[data-random]");if(!host)return;var pool=[];DATA.forEach(function(e){e.glyphs.forEach(function(g,i){pool.push({e:e,i:i,g:g,name:g.name});});});var cur=null;var title=$("[data-r-title]",host),stage=$("[data-r-stage]",host),input=$("[data-r-input]",host),fb=$("[data-r-fb]",host);function pick(){cur=pool[Math.floor(Math.random()*pool.length)];title.textContent=t("js.randTitle")+CATL(cur.e.category)+" "+cur.e.year;stage.innerHTML='<img src="'+glyphImg(cur.e,cur.i)+'" alt="Jeroglífico" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'grid\';"><div class="daily__ph" style="display:none"><div class="q3">¿ ? ?</div><p>Imagen por añadir</p></div>';input.value="";fb.textContent="";fb.className="fb";}function check(){if(!cur){pick();return;}var v=norm(input.value);if(!v)return;if(accepts(cur.g,input.value)){fb.textContent=t("js.randCorrect")+cur.name+t("js.emoji");fb.className="fb ok";}else{fb.textContent=t("js.randWrong");fb.className="fb no";}}$("[data-r-check]",host).addEventListener("click",check);$("[data-r-new]",host).addEventListener("click",pick);input.addEventListener("keydown",function(e){if(e.key==="Enter")check();});pick();}

  /* ---------- PAGE: Inicio ---------- */
  function initHome(){var host=$("[data-home]");if(!host)return;var nc=$("[data-next-contest]");if(nc){var ncTxt=loc(CFG.nextContest);if(ncTxt){nc.innerHTML="🗓️ <b>"+t("js.nextPrefix")+"</b> · "+esc(ncTxt);}else{nc.style.display="none";}}var d=CFG.dailyGlyph,dg=$("[data-daily]");if(dg){if(d){var stage=$("[data-daily-stage]",dg);if(d.image&&stage)stage.innerHTML='<img src="'+esc(d.image)+'" alt="Glifo del día">';var meta=$("[data-daily-meta]",dg);if(meta)meta.textContent=d.number?("Glifo Nº "+d.number):"Glifo de hoy";}else{var none=$("[data-daily-none]");if(none)none.style.display="";var has=$("[data-daily-has]");if(has)has.style.display="none";}}var strip=$("[data-spon-strip]");if(strip&&CFG.sponsors&&CFG.sponsors.length){strip.innerHTML='<span class="lbl">'+t("js.prizesFrom")+'</span>'+CFG.sponsors.map(function(s){var u=s.web||s.instagram||(s.url&&s.url!=="#"?s.url:"");return '<a class="spon-pill" href="'+esc(u||"#")+'"'+(u?' target="_blank" rel="noopener"':"")+'>'+esc(s.name)+'</a>';}).join("");}var totG=0,totP={};DATA.forEach(function(e){totG+=e.glyphs.length;e.participants.forEach(function(p){totP[norm(p.user)]=1;});});setCount("[data-stat-glyphs]",totG);setCount("[data-stat-contests]",DATA.length);setCount("[data-stat-players]",Object.keys(totP).length);}
  function setCount(sel,val){var el=$(sel);if(el)el.setAttribute("data-count",val);}

  /* ---------- PAGE: Premios ---------- */
  var SPON_ICON={
    web:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.8 2.6 15.2 0 18M12 3c-2.6 2.8-2.6 15.2 0 18"/></svg>',
    ig:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
    tiktok:'<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M16.5 3c.3 2 1.55 3.5 3.5 3.85V9.4c-1.3 0-2.5-.4-3.5-1.05v6.15A5.75 5.75 0 1 1 10.75 8.7v2.75a2.95 2.95 0 1 0 2.05 2.8V3h3.7z"/></svg>',
    youtube:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 8.8l5 3.2-5 3.2z" fill="currentColor" stroke="none"/></svg>'
  };
  function sponLink(url,cls,icon,label){return '<a class="spon-link'+cls+'" href="'+esc(url)+'" target="_blank" rel="noopener">'+icon+'<span>'+esc(label)+'</span></a>';}
  function initSponsors(){
    var grid=$("[data-spon-grid]");if(!grid)return;
    var list=CFG.sponsors||[];
    if(!list.length){grid.innerHTML='<p class="muted">'+t("js.noSponsors")+'</p>';return;}
    grid.innerHTML=list.map(function(s){
      var web=s.web||(s.url&&s.url!=="#"?s.url:"");
      var photos=(s.photos&&s.photos.length)?s.photos:(s.photo?[s.photo]:[]);
      var media=photos.length
        ? '<div class="spon-card__gallery'+(photos.length>1?" spon-card__gallery--multi":"")+'">'+photos.map(function(ph){return '<img class="spon-card__photo" src="'+esc(ph)+'" alt="'+esc(s.name)+'" loading="lazy" onerror="this.style.display=\'none\'">';}).join("")+'</div>'
        : '<div class="spon-card__photo spon-card__photo--ph"></div>';
      var logo=s.logo?'<div class="spon-card__logo"><img src="'+esc(s.logo)+'" alt="'+esc(s.name)+'"></div>':'<div class="spon-card__logo">'+esc((s.name||"?").charAt(0))+'</div>';
      var links=[];
      if(web)links.push(sponLink(web,"",SPON_ICON.web,t("js.visit")));
      if(s.instagram)links.push(sponLink(s.instagram," spon-link--ig",SPON_ICON.ig,"Instagram"));
      if(s.tiktok)links.push(sponLink(s.tiktok," spon-link--tiktok",SPON_ICON.tiktok,"TikTok"));
      if(s.youtube)links.push(sponLink(s.youtube," spon-link--youtube",SPON_ICON.youtube,"YouTube"));
      return '<div class="spon-card">'+
        '<div class="spon-card__media">'+media+logo+'</div>'+
        '<div class="spon-card__body">'+
          '<h3>'+esc(s.name)+'</h3>'+
          (loc(s.description)?'<p class="spon-card__desc">'+esc(loc(s.description))+'</p>':'')+
          (loc(s.prize)?'<span class="prize">'+t("js.prizeLabel")+esc(loc(s.prize))+'</span>':'')+
          (links.length?'<div class="spon-card__links">'+links.join("")+'</div>':'')+
        '</div>'+
      '</div>';
    }).join("");
  }

  function boot(){if(window.__I18N__){safe(function(){window.__I18N__.apply();},"i18n");safe(function(){window.__I18N__.init();},"i18nInit");}safe(initPetro,"petro");safe(initYear,"year");safe(initNav,"nav");safe(initSplash,"splash");safe(initReveals,"reveals");safe(initModals,"modals");safe(initTiebreak,"tiebreak");safe(initHome,"home");safe(initConcurso,"concurso");safe(initHistorico,"historico");safe(initRandom,"random");safe(initSponsors,"sponsors");safe(initCounts,"counts");document.documentElement.classList.add("is-ready");}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();
