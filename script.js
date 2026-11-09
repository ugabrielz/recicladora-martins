const header=document.querySelector('#header'),toggle=document.querySelector('.menu-toggle'),menu=document.querySelector('.menu');
function headerState(){header.classList.toggle('scrolled',scrollY>30)} headerState(); addEventListener('scroll',headerState,{passive:true});
toggle?.addEventListener('click',()=>menu.classList.toggle('open'));
document.querySelectorAll('.menu a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));

const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -50px'});
document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));

const parallax=[...document.querySelectorAll('.parallax')];
let ticking=false;
function updateParallax(){parallax.forEach(el=>{const r=el.getBoundingClientRect(),speed=parseFloat(el.dataset.speed||'.1'),center=r.top+r.height/2,delta=(center-innerHeight/2)*speed;el.style.transform=`translate3d(0,${delta}px,0)`});ticking=false}
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateParallax);ticking=true}},{passive:true}); addEventListener('resize',updateParallax);updateParallax();

const sections=[...document.querySelectorAll('main section[id]')],links=[...document.querySelectorAll('.menu a[href^="#"]')];
const navObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.remove('active'));document.querySelector(`.menu a[href="#${e.target.id}"]`)?.classList.add('active')}}),{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s=>navObs.observe(s));
window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader");

  if (!loader) return;

  setTimeout(() => {
    loader.classList.add("hide");

    setTimeout(() => {
      loader.remove();
    }, 600);

  }, 1000);
});


// Solicitação de coleta gratuita via WhatsApp (sem armazenamento de dados).
const collectForm=document.getElementById('collectForm');
if(collectForm){
  const otherCheckbox=collectForm.querySelector('input[value="Outros"]');
  const otherField=document.getElementById('collectOther');
  const error=document.getElementById('collectError');
  otherCheckbox.addEventListener('change',()=>{
    otherField.hidden=!otherCheckbox.checked;
    otherField.required=otherCheckbox.checked;
    if(!otherCheckbox.checked)otherField.value='';
  });
  collectForm.querySelectorAll('input[name="item"]').forEach(box=>box.addEventListener('change',()=>{error.hidden=true}));
  collectForm.addEventListener('submit',event=>{
    event.preventDefault();
    if(!collectForm.reportValidity())return;
    const selected=[...collectForm.querySelectorAll('input[name="item"]:checked')];
    if(!selected.length){error.hidden=false;collectForm.querySelector('input[name="item"]').focus();return}
    const items=selected.map(box=>box.value==='Outros'?`Outros: ${otherField.value.trim()}`:box.value);
    const name=document.getElementById('collectName').value.trim();
    const address=document.getElementById('collectAddress').value.trim();
    if(!name||!address)return;
    const message=`Olá! Gostaria de agendar uma coleta gratuita com a Recicladora Martins.\n\nNome: ${name}\nEndereço: ${address}\nItens para retirada: ${items.join(', ')}\n\nAguardo retorno para combinar a data e o horário da coleta.`;
    const url=`https://wa.me/5517996443848?text=${encodeURIComponent(message)}`;
    window.open(url,'_blank','noopener,noreferrer');
  });
}
