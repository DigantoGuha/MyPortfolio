// DOM helpers
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// Preloader
window.addEventListener('load', () => {
  const preloader = $('.preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
      document.body.style.overflow = '';
      initAnimations();
    }, 500);
  }, 1000); // Minimum 1s display time
});

// Theme toggle
function initTheme() {
  const themeToggle = $('.theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
  
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
  });
}

// Mobile menu
function initMobileMenu() {
  const menuBtn = $('.mobile-menu-btn');
  const nav = $('.nav');
  
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close menu when clicking on a link
  $$('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// Scroll animations
function initAnimations() {
  const animateElements = $$('[data-animate]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animateElements.forEach(el => {
    const delay = el.getAttribute('data-delay') || '0';
    el.style.transitionDelay = `${delay}s`;
    observer.observe(el);
  });
}

// Smooth scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu if open
        const nav = $('.nav');
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });
}

// Typewriter effect
function initTypewriter() {
  const el = $('.typewriter');
  if (!el) return;
  
  const arr = JSON.parse(el.getAttribute('data-text'));
  let i = 0, pos = 0, forward = true;
  const pause = 1500;
  
  // Add cursor element
  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  cursor.textContent = '|';
  el.appendChild(cursor);
  
  function step() {
    const txt = arr[i];
    if (forward) {
      el.insertBefore(document.createTextNode(txt[pos]), cursor);
      pos++;
      if (pos === txt.length) {
        forward = false;
        setTimeout(step, pause);
        return;
      }
    } else {
      el.removeChild(el.childNodes[el.childNodes.length - 2]);
      pos--;
      if (pos === 0) {
        forward = true;
        i = (i + 1) % arr.length;
      }
    }
    setTimeout(step, forward ? 80 : 30);
  }
  step();
}

// Animate skill bars when visible
function initSkillBars() {
  const fills = $$('.fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-fill') + '%';
        entry.target.style.width = width;
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });
  
  fills.forEach(f => observer.observe(f));
}

// Contact form
function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const msg = $('#message').value.trim();
    const note = $('#formNote');
    
    if (!name || !email || !msg) {
      showFormError(note, 'Please fill all fields.');
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      showFormError(note, 'Please enter a valid email address.');
      return;
    }
    
    // Simulate success
    showFormSuccess(note, 'Message sent! I will respond to your email soon.');
    form.reset();
  });
}

function showFormError(el, message) {
  el.textContent = message;
  el.style.color = '#fca5a5';
  el.style.opacity = '1';
  
  setTimeout(() => {
    el.style.opacity = '0';
  }, 3000);
}

function showFormSuccess(el, message) {
  el.textContent = message;
  el.style.color = '#a7f3d0';
  el.style.opacity = '1';
  
  setTimeout(() => {
    el.style.opacity = '0';
  }, 3000);
}

// Set current year
function setCurrentYear() {
  $('#year').textContent = new Date().getFullYear();
}

// Initialize everything
function init() {
  setCurrentYear();
  initTheme();
  initMobileMenu();
  initSmoothScroll();
  initTypewriter();
  initSkillBars();
  initContactForm();
}

document.addEventListener('DOMContentLoaded', init);
