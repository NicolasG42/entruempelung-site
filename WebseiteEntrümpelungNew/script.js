(() => {
  // Kontakt-Infos (Platzhalter)
  const CONTACT_EMAIL = "kontaktbeispiel.de";
  const CONTACT_PHONE = "+49 000 000000";
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sticky header state
  const header = document.querySelector('.site-header');
  const onScrollHeader = () => {
    const scrolled = window.scrollY > 10;
    header?.classList.toggle('scrolled', scrolled);
  };
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  // Mobile nav
  const nav = document.getElementById('hauptmenue');
  const navToggle = document.querySelector('.nav-toggle');
  const setMenu = (open) => {
    if (!nav || !navToggle) return;
    nav.dataset.open = String(open);
    navToggle.setAttribute('aria-expanded', String(open));
    if (open) {
      document.addEventListener('keydown', onEscClose);
    } else {
      document.removeEventListener('keydown', onEscClose);
    }
  };
  const onEscClose = (e) => {
    if (e.key === 'Escape') setMenu(false);
  };
  navToggle?.addEventListener('click', () => setMenu(!(nav?.dataset.open === 'true')));
  nav?.querySelectorAll('a')?.forEach(a => a.addEventListener('click', () => setMenu(false)));

  // Smooth scroll for hash links
  const headerOffset = () => header?.offsetHeight ?? 0;
  const smoothTo = (el) => {
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset() - 8;
    window.scrollTo({ top: y, behavior: prefersReduced ? 'auto' : 'smooth' });
  };
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href')?.slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        smoothTo(target);
      }
    });
  });

  // Reveal on scroll
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  if (prefersReduced) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      for (const ent of entries) {
        if (ent.isIntersecting) {
          ent.target.classList.add('is-visible');
          obs.unobserve(ent.target);
        }
      }
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Back to top
  const toTop = document.querySelector('.btn-to-top');
  const onScrollTopBtn = () => {
    if (!toTop) return;
    const show = window.scrollY > 400;
    toTop.hidden = !show;
  };
  onScrollTopBtn();
  window.addEventListener('scroll', onScrollTopBtn, { passive: true });
  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' }));

  // Kontakt-Buttons befüllen
  document.querySelectorAll('[data-contact="tel"]').forEach(a => {
    if (a instanceof HTMLAnchorElement) a.href = `tel:${CONTACT_PHONE}`;
  });
  document.querySelectorAll('[data-contact="mail"]').forEach(a => {
    if (a instanceof HTMLAnchorElement) a.href = `mailto:${CONTACT_EMAIL}`;
  });

  // Toast Helper
  const toastEl = document.querySelector('.toast');
  const showToast = (msg, type = 'info') => {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.hidden = false;
    toastEl.style.background = type === 'error' ? '#991b1b' : (type === 'success' ? '#065f46' : '#0f172a');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => { toastEl.hidden = true; }, 4000);
  };

  // Form handling (client-side only + mailto fallback)
  const form = document.querySelector('.contact-form');
  const status = document.querySelector('.form-status');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!(form instanceof HTMLFormElement)) return;
    const fd = new FormData(form);
    const name = (fd.get('name') || '').toString().trim();
    const email = (fd.get('email') || '').toString().trim();
    const phone = (fd.get('phone') || '').toString().trim();
    const zip = (fd.get('zip') || '').toString().trim();
    const date = (fd.get('date') || '').toString().trim();
    const message = (fd.get('message') || '').toString().trim();
    const weekend = fd.get('weekend') ? 'Ja' : 'Nein';
    const privacy = !!fd.get('privacy');

    // Basic checks
    const emailOk = /.+@.+\..+/.test(email);
    if (!name || !email || !emailOk || !zip || !message || !privacy) {
      status && (status.textContent = 'Bitte Pflichtfelder korrekt ausfüllen.');
      showToast('Bitte Pflichtfelder korrekt ausfüllen.', 'error');
      form.reportValidity();
      return;
    }

    const subject = encodeURIComponent('Neue Entrümpelungsanfrage');
    const body = encodeURIComponent(
      `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone}\nOrt/PLZ: ${zip}\nWunschtermin: ${date}\nSamstagstermine bevorzugt: ${weekend}\n---\nNachricht:\n${message}`
    );

    showToast('Vielen Dank! Wir melden uns kurzfristig.', 'success');
    status && (status.textContent = 'Vielen Dank! Wir melden uns kurzfristig.');

    // Mailto Fallback (öffnet E-Mail-Client)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    form.reset();
  });
})();
