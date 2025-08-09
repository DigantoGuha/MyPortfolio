// Basic helpers
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const target = document.querySelector(a.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// Typewriter effect (reads data-text JSON array)
(function typewriter(){
  const el = document.querySelector('.typewriter');
  if(!el) return;
  const arr = JSON.parse(el.getAttribute('data-text'));
  let i=0, pos=0, forward=true;
  const pause=1500;

  function step(){
    const txt = arr[i];
    if(forward){
      pos++;
      el.textContent = txt.slice(0,pos);
      if(pos===txt.length){ forward=false; setTimeout(step,pause); return; }
    } else {
      pos--;
      el.textContent = txt.slice(0,pos);
      if(pos===0){ forward=true; i=(i+1)%arr.length; }
    }
    setTimeout(step, forward?80:30);
  }
  step();
})();

// Animate skill bars when visible
function animateSkillBars(){
  const fills = document.querySelectorAll('.fill');
  const offset = window.innerHeight * 0.85;
  fills.forEach(f=>{
    const rect = f.getBoundingClientRect();
    if(rect.top < offset){
      const width = f.getAttribute('data-fill') + '%';
      f.style.width = width;
    }
  });
}
window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// Simple contact validation (no backend) — shows success message
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('message').value.trim();
  const note = document.getElementById('formNote');

  if(!name || !email || !msg){
    note.textContent = 'Please fill all fields.';
    note.style.color = '#fca5a5';
    return;
  }

  // A tiny email pattern check
  if(!/^\S+@\S+\.\S+$/.test(email)){
    note.textContent = 'Please enter a valid email address.';
    note.style.color = '#fca5a5';
    return;
  }

  // Simulate success
  note.textContent = 'Message sent! I will respond to your email soon.';
  note.style.color = '#a7f3d0';
  form.reset();
});
