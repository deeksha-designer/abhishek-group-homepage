const header=document.querySelector('.site-header');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40),{passive:true});

const hamburger=document.querySelector('.hamburger'),menuPanel=document.querySelector('.menu-panel');
function setMenu(open){hamburger.setAttribute('aria-expanded',String(open));hamburger.setAttribute('aria-label',open?'Close menu':'Open menu');menuPanel.inert=!open;menuPanel.setAttribute('aria-hidden',String(!open));menuPanel.classList.toggle('open',open);document.body.classList.toggle('menu-open',open)}
hamburger.addEventListener('click',()=>setMenu(hamburger.getAttribute('aria-expanded')!=='true'));
menuPanel.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false)});

/* Hero: Mobis-style horizontal slider (0.5s ease slide, 6s autoplay, bg zoom, line reveal) */
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const mv=document.querySelector('.mv'),mvSlides=[...mv.querySelectorAll('.mv-slide')],mvDots=[...mv.querySelectorAll('.mv-dots button')],mvPause=mv.querySelector('.mv-pause');
let mvIndex=0,mvBusy=false,mvAuto=!reducedMotion,mvTimer;
mv.classList.add('mv-first');
function mvGo(next,dir){
 next=(next+mvSlides.length)%mvSlides.length;if(next===mvIndex||mvBusy)return;
 dir=dir||(next>mvIndex?1:-1);mv.classList.remove('mv-first');
 const cur=mvSlides[mvIndex],nxt=mvSlides[next];
 if(reducedMotion){cur.classList.remove('is-active');nxt.classList.add('is-active')}
 else{
  mvBusy=true;nxt.style.transition='none';nxt.style.transform=`translateX(${dir*100}%)`;nxt.style.visibility='visible';nxt.offsetWidth;
  const ease='transform .5s ease';cur.style.transition=ease;nxt.style.transition=ease;
  cur.style.transform=`translateX(${-dir*100}%)`;nxt.style.transform='translateX(0)';
  cur.classList.remove('is-active');nxt.classList.add('is-active');
  setTimeout(()=>{[cur,nxt].forEach(el=>{el.style.transition='';el.style.transform='';el.style.visibility=''});mvBusy=false},520);
 }
 cur.setAttribute('aria-hidden','true');nxt.removeAttribute('aria-hidden');
 mvDots.forEach((d,i)=>{d.classList.toggle('is-active',i===next);d.setAttribute('aria-selected',String(i===next))});
 mvIndex=next;if(mvAuto)mvRestart();
}
function mvRestart(){clearInterval(mvTimer);mvTimer=setInterval(()=>mvGo(mvIndex+1,1),6000)}
mvDots.forEach((d,i)=>d.addEventListener('click',()=>mvGo(i)));
mv.querySelector('.mv-next').addEventListener('click',()=>mvGo(mvIndex+1,1));
mv.querySelector('.mv-prev').addEventListener('click',()=>mvGo(mvIndex-1,-1));
mvPause.addEventListener('click',()=>{mvAuto=!mvAuto;mvPause.classList.toggle('is-paused',!mvAuto);mvPause.setAttribute('aria-label',mvAuto?'Pause slider':'Play slider');mvAuto?mvRestart():clearInterval(mvTimer)});
if(mvAuto)mvRestart();
document.addEventListener('visibilitychange',()=>document.hidden?clearInterval(mvTimer):mvAuto&&mvRestart());

/* Companies: Ageeva-style list + MadeByShape-style stacking cards on scroll */
const bizStack=document.querySelector('.biz-stack'),bizCards=[...document.querySelectorAll('.biz-card')],bizItems=[...document.querySelectorAll('.biz-item')];
let bizActive=-1,bizTick=false;
function bizStickyTop(card){return parseFloat(getComputedStyle(card).top)||0}
function bizUpdate(){
 bizTick=false;let active=0;
 bizCards.forEach((card,i)=>{const top=card.getBoundingClientRect().top;if(top<=bizStickyTop(card)+2)active=i;
  const next=bizCards[i+1];let scale=1;
  if(next&&!reducedMotion){const range=card.offsetHeight||1,d=next.getBoundingClientRect().top-bizStickyTop(next);const p=Math.min(1,Math.max(0,1-d/range));scale=1-p*.06}
  card.style.setProperty('--biz-scale',scale.toFixed(4));card.style.setProperty('--biz-dim',((1-scale)*2).toFixed(3));
 });
 if(active!==bizActive){bizActive=active;bizItems.forEach((b,i)=>{b.classList.toggle('is-active',i===active);b.setAttribute('aria-current',String(i===active))})}
}
addEventListener('scroll',()=>{if(!bizTick){bizTick=true;requestAnimationFrame(bizUpdate)}},{passive:true});
addEventListener('resize',bizUpdate,{passive:true});bizUpdate();
bizItems.forEach((b,i)=>b.addEventListener('click',()=>{const first=bizCards[0],cs=getComputedStyle(first),step=first.offsetHeight+parseFloat(cs.marginBottom||0);const natural=bizStack.getBoundingClientRect().top+scrollY+i*step;scrollTo({top:natural-bizStickyTop(bizCards[i])+1,behavior:reducedMotion?'auto':'smooth'})}));

const locationData={Gurugram:['Headquarters · Haryana','Corporate headquarters and central business office.','assets/facility.avif'],Vadodara:['Listed operation · Gujarat','Abhishek Group operation listed in Vadodara.','assets/operations.avif'],Nashik:['Listed operation · Maharashtra','Abhishek Group operation listed in Nashik.','assets/facility.avif'],Bhubaneshwar:['Listed operation · Odisha','Abhishek Group operation listed in Bhubaneshwar.','assets/operations.avif'],Kancheepuram:['Listed operation · Tamil Nadu','Abhishek Group operation listed in Kancheepuram.','assets/facility.avif']};
const mapStage=document.querySelector('.world-map-stage'),indiaHotspot=document.querySelector('.india-hotspot'),mapBack=document.querySelector('.map-back'),mapLocations=[...document.querySelectorAll('.map-location')],mapInfo=document.querySelector('.map-info');
function setMapZoom(zoomed){mapStage.classList.toggle('zoomed',zoomed);mapBack.hidden=!zoomed;document.querySelector('.map-locations').setAttribute('aria-hidden',String(!zoomed))}
indiaHotspot.addEventListener('click',()=>setMapZoom(true));mapBack.addEventListener('click',()=>setMapZoom(false));
mapLocations.forEach(pin=>pin.addEventListener('click',()=>{const name=pin.dataset.location,data=locationData[name];mapLocations.forEach(item=>item.classList.toggle('active',item===pin));mapInfo.querySelector('img').src=data[2];mapInfo.querySelector('small').textContent=`${pin.dataset.company} · ${pin.dataset.type}`;mapInfo.querySelector('h3').textContent=name;mapInfo.querySelector('p').textContent=data[1];mapInfo.querySelector('a').href=`https://maps.google.com/?q=${encodeURIComponent(name+', India')}`}));
const presenceFilters=[...document.querySelectorAll('.presence-filters select')];
function filterMapLocations(){const [state,type,company]=presenceFilters.map(select=>select.value);mapLocations.forEach(pin=>{const visible=(state==='all'||pin.dataset.state===state)&&(type==='all'||pin.dataset.type===type)&&(company==='all'||pin.dataset.company===company);pin.hidden=!visible});if(!mapStage.classList.contains('zoomed'))setMapZoom(true)}
presenceFilters.forEach(select=>select.addEventListener('change',filterMapLocations));

const productTrack=document.querySelector('.product-grid'),productCards=[...productTrack.children],productPrev=document.querySelector('.product-prev'),productNext=document.querySelector('.product-next');
let productIndex=0;
function updateProductSlider(){const card=productCards[0],gap=parseFloat(getComputedStyle(productTrack).gap)||0,step=card.getBoundingClientRect().width+gap,max=Math.max(0,productCards.length-(innerWidth<=650?1:innerWidth<=1000?2:2));productIndex=Math.min(productIndex,max);productTrack.style.transform=`translateX(${-productIndex*step}px)`;productPrev.disabled=productIndex===0;productNext.disabled=productIndex===max}
productPrev.addEventListener('click',()=>{productIndex=Math.max(0,productIndex-1);updateProductSlider()});
productNext.addEventListener('click',()=>{productIndex+=1;updateProductSlider()});
addEventListener('resize',updateProductSlider,{passive:true});updateProductSlider();

const newsItems=[
 {type:'recycling',label:'Vehicle recycling',title:'Abhishek Group partners with Kaiho Sangyo to open vehicle scrappage facility',image:'assets/vehicle-scrappage.jpg',alt:'Vehicle scrappage facility'},
 {type:'recycling',label:'Vehicle recycling',title:'Vehicle scrapping facility by Abhishek Group and Kaiho Sangyo Japan inaugurated',image:'assets/operations.avif',alt:'Vehicle recycling operations'},
 {type:'company',label:'Group update',title:'Nitin Gadkari inaugurates new vehicle scrapping facility by Abhishek Group and Kaiho Sangyo Japan',image:'assets/facility.avif',alt:'Abhishek Group facility'}
];
const newsGrid=document.querySelector('.news-grid'),newsTabs=[...document.querySelectorAll('[data-news]')];
function renderNews(type='all'){const visible=type==='all'?newsItems:newsItems.filter(item=>item.type===type);newsGrid.innerHTML=visible.map(item=>`<article><img src="${item.image}" alt="${item.alt}"><small>${item.label}</small><h3>${item.title}</h3><a href="https://www.abhishekgroup.co.in/" target="_blank" rel="noopener">Read on the group site ↗</a></article>`).join('');newsTabs.forEach(tab=>{const active=tab.dataset.news===type;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active))})}
newsTabs.forEach(tab=>tab.addEventListener('click',()=>renderNews(tab.dataset.news)));renderNews();

if(!reducedMotion){document.documentElement.classList.add('motion-ready');const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');revealObserver.unobserve(entry.target)}}),{threshold:.1,rootMargin:'0px 0px -5%'});document.querySelectorAll('.section>*:not(.biz-layout),.news-grid').forEach(element=>{element.classList.add('reveal');revealObserver.observe(element)})}
