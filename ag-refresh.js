/* Abhishek Group homepage refresh — 2026-11-17. Hero slider, brand film, India map, footer wordmark. */
(()=>{
const locations=[
['AWL Pvt Ltd','New Delhi','Delhi','Office',28.63156,77.22737,'World Trade Center, 514 Fifth, Babar Rd, Connaught Place, New Delhi, Delhi 110001','assets/company-photo-3.png'],['Luster Automotive Pvt Ltd','Gurugram','Haryana','Plant',28.50021,77.07338,'Plot No. 380, 381, Electronic City, Phase IV, Udyog Vihar, Sector 18, Gurugram, Haryana 122015','assets/company-photo-2.png'],['Abhishek K Kaiho Recyclers Pvt Ltd','Fatehpur','Haryana','Plant',28.25911,76.91492,'Fatehpur, Haryana 122015','assets/company-photo-4.png'],['Abhishek Group Pvt Ltd','Gurugram','Haryana','Head Office',28.50021,77.07338,'Plot No. 381, Electronic City, Phase IV, Udyog Vihar, Sector 18, Gurugram, Haryana 122015','assets/facility.avif'],['Abhishek Elektrosil Auto Components Pvt Ltd','Gurugram','Haryana','Plant',28.36987,76.92783,'Plot no-100, Sector 5, IMT Manesar, Gurugram, Haryana 122052','assets/company-photo-6.jpg'],['Joyson Anand Abhishek Safety Systems Pvt Ltd','Gurugram','Haryana','Plant',28.36701,76.92867,'Plot No 20, Sector 5, IMT Manesar, Gurugram, Haryana 122050','assets/company-photo-1.png'],['Joyson Anand Abhishek Safety Systems Pvt Ltd','Majrakath','Rajasthan','Plant',27.96762,76.39426,'X98V+JJV, Majrakath, Rajasthan 301020','assets/company-photo-1.png'],['Joyson Anand Abhishek Safety Systems Pvt Ltd','Kancheepuram','Tamil Nadu','Plant',12.70072,80.00886,'Survey No. 43/4, 215-Thennur Village, Chengalpattu, Kancheepuram, Tamil Nadu 603002','assets/company-photo-1.png'],['Abhishek K Road System Pvt Ltd','Gurugram','Haryana','Mother Plant',28.37735,76.92417,'Plot No. 149, Sector 6, IMT Manesar, Gurugram, Haryana 122052','assets/company-photo-5.png'],
['Abhishek K Road System Pvt Ltd','Rourkela','Odisha','Embossing Station',22.22427,84.84312,'Uditnagar, Rourkela, Odisha 769012','assets/company-photo-5.png'],['Abhishek K Road System Pvt Ltd','Bhubaneshwar','Odisha','Embossing Station',20.23441,85.81463,'Kapilprasad, BDA Colony, Bhubaneswar, Odisha 751002','assets/company-photo-5.png'],['Abhishek K Road System Pvt Ltd','Jalda','Odisha','Embossing Station',22.18353,86.67323,'Pathuri, Jalda, Odisha 757086','assets/company-photo-5.png'],['Abhishek K Road System Pvt Ltd','Sambalpur','Odisha','Embossing Station',21.48684,83.98308,'Budharaja, Sambalpur, Odisha 768004','assets/company-photo-5.png'],['Abhishek K Road System Pvt Ltd','Jeypore','Odisha','Embossing Station',18.85958,82.57841,'Nehru Nagar, Mill Street, Jeypore, Odisha 764003','assets/company-photo-5.png'],['Abhishek K Road System Pvt Ltd','Brahmapur','Odisha','Embossing Station',19.31549,84.80101,'Brahma Nagar, Brahmapur, Odisha 760001','assets/company-photo-5.png'],['Abhishek K Road System Pvt Ltd','Nashik','Maharashtra','Embossing Station',19.96478,73.75753,'Govind Nagar, Nashik, Maharashtra 422001','assets/company-photo-5.png'],['Abhishek K Road System Pvt Ltd','Kidgaon','Maharashtra','Embossing Station',17.73091,73.95770,'Kidgaon, Maharashtra 415015','assets/company-photo-5.png'],['Abhishek K Road System Pvt Ltd','Nagaon','Maharashtra','Embossing Station',16.76236,74.29187,'Hatkanangle, Kolhapur, Nagaon, Maharashtra 416122','assets/company-photo-5.png'],['Abhishek K Road System Pvt Ltd','Vadodara','Gujarat','Embossing Station',22.34200,73.21967,'Harni, Vadodara, Gujarat 390022','assets/company-photo-5.png'],['Abhishek K Road System Pvt Ltd','Bharuch','Gujarat','Embossing Station',21.72978,72.63328,'Vadadla, Bharuch, Gujarat 392015','assets/company-photo-5.png'],['Abhishek K Road System Pvt Ltd','Valsad','Gujarat','Embossing Station',20.59154,72.96167,'Atakpardi, Valsad, Gujarat 396007','assets/company-photo-5.png']];

/* ---------- Hero slider ---------- */
(()=>{const hero=document.querySelector('.ag-hero');if(!hero)return;
const slides=[...hero.querySelectorAll('.ag-hero__slide')],dotsWrap=hero.querySelector('.ag-hero__dots'),dots=[...dotsWrap.querySelectorAll('button')],pauseBtn=hero.querySelector('.ag-hero__pause'),stage=hero.querySelector('.ag-hero__stage');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,DURATION=6000,SPEED=850;
let index=0,playing=!reduce,busy=false,timer;
if(!playing)dotsWrap.classList.add('is-static');
function restartDot(){dots.forEach((d,i)=>{d.classList.remove('is-active');d.setAttribute('aria-selected',String(i===index))});void dotsWrap.offsetWidth;dots[index].classList.add('is-active')}
function schedule(){clearTimeout(timer);if(playing&&!document.hidden)timer=setTimeout(()=>go(index+1,1),DURATION)}
function go(next,dir){next=(next+slides.length)%slides.length;if(next===index||busy)return;dir=dir||(next>index?1:-1);busy=true;
  const current=slides[index],incoming=slides[next];
  incoming.style.transition='none';incoming.style.transform=`translateX(${dir*100}%)`;void incoming.offsetWidth;incoming.style.transition='';
  current.classList.add('is-leaving');current.classList.remove('is-active');current.style.transform=`translateX(${-dir*100}%)`;
  incoming.classList.add('is-active');incoming.style.transform='';
  current.setAttribute('aria-hidden','true');incoming.setAttribute('aria-hidden','false');
  index=next;restartDot();schedule();
  setTimeout(()=>{current.classList.remove('is-leaving');current.style.transform='';busy=false},reduce?0:SPEED)}
dots.forEach((dot,i)=>dot.addEventListener('click',()=>go(i)));
hero.querySelectorAll('.ag-hero__arrow').forEach(btn=>btn.addEventListener('click',()=>go(index+Number(btn.dataset.dir),Number(btn.dataset.dir))));
pauseBtn.addEventListener('click',()=>{playing=!playing;pauseBtn.innerHTML=`<i class="fa-solid fa-${playing?'pause':'play'}" aria-hidden="true"></i>`;pauseBtn.setAttribute('aria-label',playing?'Pause slider':'Play slider');dotsWrap.classList.toggle('is-paused',!playing);if(playing){dotsWrap.classList.remove('is-static');restartDot()}schedule()});
document.addEventListener('visibilitychange',()=>{if(document.hidden)clearTimeout(timer);else if(playing){restartDot();schedule()}});
let startX=null;stage.addEventListener('pointerdown',e=>{startX=e.clientX});stage.addEventListener('pointerup',e=>{if(startX===null)return;const dx=e.clientX-startX;startX=null;if(Math.abs(dx)>50)go(index+(dx<0?1:-1),dx<0?1:-1)});
restartDot();schedule()})();

/* ---------- Brand film ---------- */
(()=>{const wrap=document.querySelector('.ag-video');if(!wrap)return;const video=wrap.querySelector('video'),btn=wrap.querySelector('.ag-video__toggle');
video.removeAttribute('controls');video.muted=true;
const sync=()=>{const on=!video.paused;btn.innerHTML=`<i class="fa-solid fa-${on?'pause':'play'}" aria-hidden="true"></i>`;btn.setAttribute('aria-label',on?'Pause video':'Play video')};
video.addEventListener('play',sync);video.addEventListener('pause',sync);
btn.addEventListener('click',()=>{if(video.paused)video.play().catch(()=>{});else video.pause()});
const p=video.play();if(p)p.catch(sync);sync()})();

/* ---------- India network: filters + 3D globe (globe.gl, loaded on demand) ---------- */
(()=>{const root=document.querySelector('.ag-map');if(!root)return;
const stage=root.querySelector('.ag-map__stage'),holder=root.querySelector('.ag-globe'),legend=root.querySelector('.ag-globe__legend'),card=root.querySelector('.ag-map__card'),countEl=root.querySelector('#ag-map-count');
const selects={state:root.querySelector('#ag-map-state'),type:root.querySelector('#ag-map-type'),company:root.querySelector('#ag-map-company')};
const COLORS={'Head Office':'#fd9907','Office':'#ffd166','Plant':'#ff5a36','Mother Plant':'#ff8fab','Embossing Station':'#5ad1ff'};
const photos={'Joyson Anand Abhishek Safety Systems':'assets/people.avif','Luster Automotive':'assets/product-seating.webp','AWL':'assets/product-manufacturing.webp','Abhishek K Kaiho Recyclers':'assets/vehicle-scrappage.jpg','Abhishek K Road System':'assets/hero-roads.png','Abhishek Elektrosil Auto Components':'assets/operations.avif','Abhishek Group':'assets/facility.avif'};
const data=[...locations].sort((a,b)=>(b[3]==='Head Office')-(a[3]==='Head Office')).map(([company,city,state,type,lat,lon,address,image])=>{company=company.replace(/ Pvt Ltd$/,'');return{company,city,state,type,lat,lon,address,image:photos[company]||image}});
const unique=key=>[...new Set(data.map(d=>d[key]))].sort();
for(const[key,select]of Object.entries(selects))unique(key).forEach(v=>select.add(new Option(v,v)));
legend.innerHTML=Object.entries(COLORS).map(([t,c])=>`<li><span style="background:${c}"></span>${t}</li>`).join('');
let visible=data,pos=0,globe=null;
const HOME={lat:22.5,lng:81,altitude:.62};
function fly(list,ms=1200){if(!globe)return;if(!list.length||list.length===data.length){globe.pointOfView(HOME,ms);return}
  const lats=list.map(d=>d.lat),lngs=list.map(d=>d.lon),span=Math.max(Math.max(...lats)-Math.min(...lats),Math.max(...lngs)-Math.min(...lngs));
  globe.pointOfView({lat:(Math.max(...lats)+Math.min(...lats))/2,lng:(Math.max(...lngs)+Math.min(...lngs))/2,altitude:Math.min(1.4,Math.max(.45,span/14))},ms)}
function drawPoints(){if(!globe)return;const active=visible[pos];globe.ringsData(visible);globe.pointsData(visible).pointRadius(d=>d===active?.42:.26).pointAltitude(d=>d===active?.035:.012)}
function show(){const d=visible[pos];card.classList.toggle('is-empty',!d);
  if(!d){card.querySelector('h3').textContent='No locations found';card.querySelector('.ag-map__meta').textContent='';card.querySelector('.ag-map__address').textContent='Try a different state, location type or company.';drawPoints();return}
  const img=card.querySelector('img');img.src=d.image;img.alt=`${d.company}, ${d.city}`;
  card.querySelector('h3').textContent=d.company;card.querySelector('.ag-map__meta').textContent=`${d.city} · ${d.type}`;card.querySelector('.ag-map__address').textContent=d.address;
  card.querySelector('a').href=`https://www.google.com/maps/dir/?api=1&destination=${d.lat},${d.lon}`;drawPoints()}
function filter(){const f={state:selects.state.value,type:selects.type.value,company:selects.company.value};visible=data.filter(d=>Object.entries(f).every(([k,v])=>v==='all'||d[k]===v));pos=0;countEl.textContent=visible.length;show();fly(visible)}
Object.values(selects).forEach(s=>s.addEventListener('change',filter));
filter();
const loadScript=src=>new Promise((ok,fail)=>{const el=document.createElement('script');el.src=src;el.onload=ok;el.onerror=fail;document.head.append(el)});
function size(){globe&&globe.width(holder.clientWidth).height(holder.clientHeight)}
async function init(){try{await loadScript('https://cdn.jsdelivr.net/npm/globe.gl@2.34.4/dist/globe.gl.min.js');
  const states=await fetch('assets/india-states-lite.geojson').then(r=>r.json()).catch(()=>({features:[]}));
  globe=Globe({animateIn:false})(holder)
    .backgroundColor('rgba(0,0,0,0)')
    .showGlobe(false).showAtmosphere(false)
    .polygonsData(states.features).polygonCapColor(()=>'rgba(253,153,7,.22)').polygonSideColor(()=>'rgba(0,0,0,0)').polygonStrokeColor(()=>'rgba(214,120,0,.85)').polygonAltitude(.004)
    .ringLat('lat').ringLng('lon').ringAltitude(.013).ringColor(d=>{const c=COLORS[d.type]||'#fd9907';return t=>c+Math.round((1-t)*255).toString(16).padStart(2,'0')}).ringMaxRadius(d=>d===visible[pos]?3.2:2).ringPropagationSpeed(2.2).ringRepeatPeriod(900)
    .pointLat('lat').pointLng('lon').pointColor(d=>COLORS[d.type]||'#fd9907').pointsMerge(false)
    .pointLabel(d=>`<div class="ag-globe__tip"><strong>${d.company}</strong><span>${d.city} · ${d.type}</span></div>`)
    .onPointClick(d=>{pos=visible.indexOf(d);show()})
    .onPointHover(d=>{holder.style.cursor=d?'pointer':'grab'});
  const controls=globe.controls();controls.enableZoom=true;controls.minDistance=130;controls.maxDistance=360;controls.autoRotate=false;
  size();globe.pointOfView(HOME,0);drawPoints();fly(visible,1500);stage.classList.add('is-ready');
  addEventListener('resize',size,{passive:true})}catch(e){stage.classList.add('is-failed')}}
if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();init()}},{rootMargin:'400px 0px'});io.observe(stage)}else init()})();

/* ---------- Footer wordmark: fill the viewport width ---------- */
(()=>{const mark=document.querySelector('.ag-footer__mark');if(!mark)return;const text=mark.querySelector('span');
const fitMark=()=>{text.style.fontSize='100px';const w=text.getBoundingClientRect().width||1,target=document.documentElement.clientWidth*.97,px=100*target/w;mark.style.setProperty('--ag-mark-size',px+'px');text.style.fontSize='';mark.style.setProperty('--ag-mark-h',(px*.74)+'px')};
fitMark();addEventListener('resize',fitMark,{passive:true});if(document.fonts)document.fonts.ready.then(fitMark)})();
})();
