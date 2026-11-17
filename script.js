const header=document.querySelector('.site-header');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40),{passive:true});

const hamburger=document.querySelector('.hamburger'),menuPanel=document.querySelector('.menu-panel');
function setMenu(open){hamburger.setAttribute('aria-expanded',String(open));hamburger.setAttribute('aria-label',open?'Close menu':'Open menu');menuPanel.hidden=!open;menuPanel.classList.toggle('open',open);document.body.classList.toggle('menu-open',open)}
hamburger.addEventListener('click',()=>setMenu(hamburger.getAttribute('aria-expanded')!=='true'));
menuPanel.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false)});
menuPanel.querySelectorAll('.menu-disclosure>button').forEach(button=>{button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!open));button.parentElement.classList.toggle('is-open',!open)})});

const companyPanels=[...document.querySelectorAll('.company-panel')],companySticky=document.querySelector('.company-sticky');
if(companyPanels.length&&companySticky){const activateCompany=panel=>{companyPanels.forEach(item=>item.classList.toggle('active',item===panel));companySticky.querySelector('img').src=panel.dataset.logo;companySticky.querySelector('h3').textContent=panel.dataset.name;companySticky.querySelector('p').textContent=panel.dataset.description};const companyObserver=new IntersectionObserver(entries=>{const current=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(current)activateCompany(current.target)},{threshold:[.35,.55,.75]});companyPanels.forEach(panel=>companyObserver.observe(panel));activateCompany(companyPanels[0])}

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
function renderNews(type='all'){const visible=type==='all'?newsItems:newsItems.filter(item=>item.type===type);newsGrid.innerHTML=visible.map(item=>`<article><img src="${item.image}" alt="${item.alt}"><h3>${item.title}</h3><a href="https://www.abhishekgroup.co.in/" class="ag-btn ag-btn--outline ag-btn--sm" target="_blank" rel="noopener" aria-label="Read more: ${item.title}">Read more <i class="fa-solid fa-arrow-right-long" aria-hidden="true"></i></a></article>`).join('');newsTabs.forEach(tab=>{const active=tab.dataset.news===type;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active))})}
newsTabs.forEach(tab=>tab.addEventListener('click',()=>renderNews(tab.dataset.news)));renderNews();

if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion-ready');const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');revealObserver.unobserve(entry.target)}}),{threshold:.1,rootMargin:'0px 0px -5%'});document.querySelectorAll('.section>*,.company-showcase,.news-grid').forEach(element=>{element.classList.add('reveal');revealObserver.observe(element)})}
