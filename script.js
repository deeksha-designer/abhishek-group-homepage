const header=document.querySelector('.site-header');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40),{passive:true});

const hamburger=document.querySelector('.hamburger'),menuPanel=document.querySelector('.menu-panel');
function setMenu(open){hamburger.setAttribute('aria-expanded',String(open));hamburger.setAttribute('aria-label',open?'Close menu':'Open menu');menuPanel.inert=!open;menuPanel.setAttribute('aria-hidden',String(!open));menuPanel.classList.toggle('open',open);document.body.classList.toggle('menu-open',open)}
hamburger.addEventListener('click',()=>setMenu(hamburger.getAttribute('aria-expanded')!=='true'));
menuPanel.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false)});

const slides=[...document.querySelectorAll('.hero-slide')],bars=[...document.querySelectorAll('.slide-dots button')];
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
let slideIndex=0,autoplay=!reducedMotion,slideTimer;
function showSlide(index){slideIndex=(index+slides.length)%slides.length;slides.forEach((slide,i)=>{slide.classList.toggle('active',i===slideIndex);slide.setAttribute('aria-hidden',String(i!==slideIndex))});bars.forEach((bar,i)=>{bar.classList.toggle('active',i===slideIndex);bar.setAttribute('aria-selected',String(i===slideIndex))});if(autoplay)restartSlider()}
function restartSlider(){clearInterval(slideTimer);slideTimer=setInterval(()=>showSlide(slideIndex+1),6000)}
bars.forEach((bar,index)=>bar.addEventListener('click',()=>showSlide(index)));
document.querySelector('.next').addEventListener('click',()=>showSlide(slideIndex+1));
document.querySelector('.prev').addEventListener('click',()=>showSlide(slideIndex-1));
const playButton=document.querySelector('.play-toggle');
playButton.addEventListener('click',()=>{autoplay=!autoplay;playButton.innerHTML=autoplay?'<i class="fa-solid fa-pause" aria-hidden="true"></i>':'<i class="fa-solid fa-play" aria-hidden="true"></i>';playButton.setAttribute('aria-label',autoplay?'Pause slider':'Play slider');document.querySelector('.slide-dots').classList.toggle('paused',!autoplay);autoplay?restartSlider():clearInterval(slideTimer)});
if(autoplay)restartSlider();
document.addEventListener('visibilitychange',()=>document.hidden?clearInterval(slideTimer):autoplay&&restartSlider());
document.querySelectorAll('[data-route-slide]').forEach(route=>{route.addEventListener('pointerenter',()=>{clearInterval(slideTimer);showSlide(Number(route.dataset.routeSlide));clearInterval(slideTimer)});route.addEventListener('pointerleave',()=>autoplay&&restartSlider());route.addEventListener('focus',()=>showSlide(Number(route.dataset.routeSlide)))});

const companies=[
 ['Abhishek Group Pvt Ltd','The principal company and group headquarters in Gurugram.','assets/facility.avif','Abhishek Group facility','assets/abhishek-logo.png'],
 ['Joyson Anand Abhishek Safety Systems','A named group company working in automotive safety systems.','assets/people.avif','Automotive safety systems team','assets/abhishek-logo.png'],
 ['Abhishek K Kaiho Recyclers','The vehicle recycling business developed with Kaiho Sangyo Japan.','assets/vehicle-scrappage.jpg','Vehicle recycling facility','assets/logo-kaiho.png'],
 ['Abhishek Elektrosil Auto Components','A named group company focused on automotive components.','assets/operations.avif','Automotive component operation','assets/logo-elektrosil.png'],
 ['Abhishek K Road System','A named group company focused on road systems.','assets/hero-roads.png','Road systems and mobility','assets/logo-road.png'],
 ['AWL Pvt Ltd','A company listed within the Abhishek Group portfolio.','assets/facility.avif','Industrial facility','assets/abhishek-logo.png'],
 ['Luster Automotive','A company listed within the Abhishek Group portfolio.','assets/operations.avif','Automotive operation','assets/abhishek-logo.png']
];
const companyButtons=[...document.querySelectorAll('.company-nav button')],companyImage=document.querySelector('#company-image'),companyLogo=document.querySelector('#company-logo');
function selectCompany(index){companyButtons.forEach((button,i)=>{button.classList.toggle('active',i===index);button.setAttribute('aria-selected',String(i===index));button.tabIndex=i===index?0:-1});const data=companies[index];companyImage.style.opacity='0';setTimeout(()=>{companyImage.src=data[2];companyImage.alt=data[3];companyImage.style.opacity='1'},180);companyLogo.src=data[4];document.querySelector('.company-lockup span').textContent=String(index+1).padStart(2,'0')+' / 07';document.querySelector('#company-name').textContent=data[0];document.querySelector('#company-description').textContent=data[1]}
companyButtons.forEach((button,index)=>{button.addEventListener('click',()=>selectCompany(index));button.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight'].includes(event.key))return;event.preventDefault();const next=(index+(event.key==='ArrowRight'?1:-1)+companyButtons.length)%companyButtons.length;selectCompany(next);companyButtons[next].focus()})});selectCompany(0);

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

if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion-ready');const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');revealObserver.unobserve(entry.target)}}),{threshold:.1,rootMargin:'0px 0px -5%'});document.querySelectorAll('.section>*,.company-showcase,.news-grid').forEach(element=>{element.classList.add('reveal');revealObserver.observe(element)})}
