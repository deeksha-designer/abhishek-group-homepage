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

/* ---------- India network: filters + interactive map (MapLibre + OpenFreeMap, loaded on demand) ---------- */
(()=>{const root=document.querySelector('.ag-map');if(!root)return;
const stage=root.querySelector('.ag-map__stage'),holder=root.querySelector('.ag-globe'),card=root.querySelector('.ag-map__card'),countEl=root.querySelector('#ag-map-count');
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const selects={state:root.querySelector('#ag-map-state'),type:root.querySelector('#ag-map-type'),company:root.querySelector('#ag-map-company')};
const photos={'Joyson Anand Abhishek Safety Systems':'assets/people.avif','Luster Automotive':'assets/product-seating.webp','AWL':'assets/product-manufacturing.webp','Abhishek K Kaiho Recyclers':'assets/vehicle-scrappage.jpg','Abhishek K Road System':'assets/hero-roads.png','Abhishek Elektrosil Auto Components':'assets/operations.avif','Abhishek Group':'assets/facility.avif'};
const data=[...locations].sort((a,b)=>(b[3]==='Head Office')-(a[3]==='Head Office')).map(([company,city,state,type,lat,lon,address,image])=>{company=company.replace(/ Pvt Ltd$/,'');return{company,city,state,type,lat,lon,address,image:photos[company]||image}});
const unique=key=>[...new Set(data.map(d=>d[key]))].sort();
for(const[key,select]of Object.entries(selects))unique(key).forEach(v=>select.add(new Option(v,v)));
let visible=data,pos=0,map=null;
const INDIA=[[67.6,6.4],[97.5,37.3]];
const pad=()=>innerWidth>900?{top:60,bottom:30,left:30,right:Math.min(380,stage.clientWidth*.34)}:{top:56,bottom:20,left:16,right:16};
function fly(list,ms=1200){if(!map)return;let b=INDIA;
  if(list.length&&list.length<data.length){const lats=list.map(d=>d.lat),lngs=list.map(d=>d.lon);b=[[Math.min(...lngs),Math.min(...lats)],[Math.max(...lngs),Math.max(...lats)]]}
  map.fitBounds(b,{padding:pad(),maxZoom:8,duration:ms})}
const geo=()=>({type:'FeatureCollection',features:visible.map((d,i)=>({type:'Feature',properties:{i,active:i===pos?1:0},geometry:{type:'Point',coordinates:[d.lon,d.lat]}}))});
function drawPoints(){const src=map&&map.getSource('ag-loc');src&&src.setData(geo())}
function show(){const d=visible[pos];card.classList.toggle('is-empty',!d);
  if(!d){card.querySelector('h3').textContent='No locations found';card.querySelector('.ag-map__meta').textContent='';card.querySelector('.ag-map__address').textContent='Try a different state, location type or company.';drawPoints();return}
  const img=card.querySelector('img');img.src=d.image;img.alt=`${d.company}, ${d.city}`;
  card.querySelector('h3').textContent=d.company;card.querySelector('.ag-map__meta').textContent=`${d.city} · ${d.type}`;card.querySelector('.ag-map__address').textContent=d.address;drawPoints()}
function filter(){const f={state:selects.state.value,type:selects.type.value,company:selects.company.value};visible=data.filter(d=>Object.entries(f).every(([k,v])=>v==='all'||d[k]===v));pos=0;countEl.textContent=visible.length;show();fly(visible)}
Object.values(selects).forEach(s=>s.addEventListener('change',filter));
filter();
const loadScript=src=>new Promise((ok,fail)=>{const el=document.createElement('script');el.src=src;el.onload=ok;el.onerror=fail;document.head.append(el)});
const loadCSS=href=>new Promise(ok=>{const el=document.createElement('link');el.rel='stylesheet';el.href=href;el.onload=el.onerror=ok;document.head.append(el)});
async function init(){try{const LIB='https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl';
  await Promise.all([loadCSS(LIB+'.css'),loadScript(LIB+'.js')]);
  const outline=await fetch('assets/india-outline.geojson').then(r=>r.json());
  map=new maplibregl.Map({container:holder,style:'https://tiles.openfreemap.org/styles/liberty',bounds:INDIA,fitBoundsOptions:{padding:pad()},minZoom:3,maxZoom:14,dragRotate:false,pitchWithRotate:false,attributionControl:{compact:true}});
  map.touchZoomRotate.disableRotation();
  map.addControl(new maplibregl.NavigationControl({showCompass:false}),'bottom-left');
  map.on('load',()=>{
    const below=(map.getStyle().layers.find(l=>l.type==='symbol')||{}).id;
    const world=[[-180,-85],[180,-85],[180,85],[-180,85],[-180,-85]];
    map.addSource('ag-mask',{type:'geojson',data:{type:'Feature',properties:{},geometry:{type:'Polygon',coordinates:[world,...outline.features[0].geometry.coordinates.map(p=>p[0])]}}});
    map.addLayer({id:'ag-mask',type:'fill',source:'ag-mask',paint:{'fill-color':'#ffffff','fill-opacity':.62}},below);
    if(map.getLayer('boundary_disputed'))map.setLayoutProperty('boundary_disputed','visibility','none');
    map.addSource('ag-india',{type:'geojson',data:outline,attribution:'India boundary: Survey of India via DataMeet'});
    map.addLayer({id:'ag-india-border',type:'line',source:'ag-india',paint:{'line-color':'hsl(248,1%,41%)','line-width':['interpolate',['linear'],['zoom'],3,.8,8,1.6]}},below);
    map.addSource('ag-loc',{type:'geojson',data:geo()});
    map.addLayer({id:'ag-pulse',type:'circle',source:'ag-loc',paint:{'circle-color':'#fd9907','circle-radius':8,'circle-opacity':.45}});
    map.addLayer({id:'ag-dot',type:'circle',source:'ag-loc',paint:{'circle-color':'#fd9907','circle-radius':['case',['==',['get','active'],1],8,5.5],'circle-stroke-color':'#fff','circle-stroke-width':2}});
    const tip=new maplibregl.Popup({closeButton:false,closeOnClick:false,offset:12,className:'ag-map__popup'});
    map.on('mouseenter','ag-dot',e=>{map.getCanvas().style.cursor='pointer';const d=visible[e.features[0].properties.i];if(d)tip.setLngLat([d.lon,d.lat]).setHTML(`<div class="ag-globe__tip"><strong>${d.company}</strong><span>${d.city} · ${d.type}</span></div>`).addTo(map)});
    map.on('mouseleave','ag-dot',()=>{map.getCanvas().style.cursor='';tip.remove()});
    map.on('click','ag-dot',e=>{pos=e.features[0].properties.i;show()});
    if(!reduceMotion){let onScreen=true;new IntersectionObserver(es=>{onScreen=es[0].isIntersecting;if(onScreen)requestAnimationFrame(pulse)}).observe(stage);
      function pulse(now){if(!onScreen)return;const t=(now%1400)/1400;map.setPaintProperty('ag-pulse','circle-radius',6+t*16);map.setPaintProperty('ag-pulse','circle-opacity',.5*(1-t));requestAnimationFrame(pulse)}}
    stage.classList.add('is-ready')});
}catch(e){stage.classList.add('is-failed')}}
if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();init()}},{rootMargin:'400px 0px'});io.observe(stage)}else init()})();

/* ---------- Footer wordmark: fill the viewport width ---------- */
(()=>{const mark=document.querySelector('.ag-footer__mark');if(!mark)return;const text=mark.querySelector('span');
const fitMark=()=>{text.style.fontSize='100px';const w=text.getBoundingClientRect().width||1,target=document.documentElement.clientWidth*.97,px=100*target/w;mark.style.setProperty('--ag-mark-size',px+'px');text.style.fontSize='';mark.style.setProperty('--ag-mark-h',(px*.74)+'px')};
fitMark();addEventListener('resize',fitMark,{passive:true});if(document.fonts)document.fonts.ready.then(fitMark);})();
})();
