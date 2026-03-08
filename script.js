(function () {
  'use strict';

  // Nav scroll
  const nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // Hamburger
  const hamburger = document.querySelector('.nav-hamburger');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav-open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('nav-open') && !nav.contains(e.target)) {
        nav.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active link
  const currentPath = window.location.pathname.replace(/\/$/, '').replace(/\.html$/, '');
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const linkPath = link.getAttribute('href')?.replace(/\/$/, '').replace(/\.html$/, '');
    if (linkPath && currentPath.endsWith(linkPath)) link.classList.add('active');
  });

  // Directory filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const coachCards = document.querySelectorAll('.coach-card');

  if (filterBtns.length && coachCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        coachCards.forEach((card) => {
          if (filter === 'all') {
            card.removeAttribute('data-hidden');
          } else {
            const tags = card.dataset.tags || '';
            card.setAttribute('data-hidden', tags.includes(filter) ? 'false' : 'true');
          }
        });
      });
    });
  }

  // Email capture
  window.handleEmailCapture = function (event) {
    event.preventDefault();
    const form = event.target;
    const note = form.querySelector('.email-capture-note');
    if (note) {
      note.textContent = "You're on the list.";
      note.style.color = 'var(--color-primary-light)';
    }
    const input = form.querySelector('input[type="email"]');
    if (input) input.value = '';
  };
})();
