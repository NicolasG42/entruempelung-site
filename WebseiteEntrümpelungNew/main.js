// Minimal JS: Smooth Scroll, Dialogs, Mailto-Fallback, Jahr, JSON-LD
(() => {
  const $ = (q, r=document) => r.querySelector(q);
  const $$ = (q, r=document) => Array.from(r.querySelectorAll(q));

  // Jahr im Footer
  const y = new Date().getFullYear();
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(y);

  // Smooth Scrolling für In-Page-Links
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#' || id.startsWith('#impressum') || id.startsWith('#datenschutz')) return;
      const target = $(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 8;
        window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
      }
    });
  });

  // Modale (Impressum/Datenschutz)
  const dlgImpressum = $('#dlgImpressum');
  const dlgPrivacy = $('#dlgPrivacy');
  $('#openImpressum')?.addEventListener('click', (e) => { e.preventDefault(); dlgImpressum?.showModal(); });
  $('#openPrivacy')?.addEventListener('click', (e) => { e.preventDefault(); dlgPrivacy?.showModal(); });

  // Kontaktformular: mailto-Fallback, keine Fremd-Backends
  const form = $('#contactForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!(form instanceof HTMLFormElement)) return;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const fd = new FormData(form);
    const name = (fd.get('name')||'').toString().trim();
    const email = (fd.get('email')||'').toString().trim();
    const tel = (fd.get('telefon')||'').toString().trim();
    const msg = (fd.get('nachricht')||'').toString().trim();

    // Zieladresse exakt wie im Dokument vorhanden
    const to = 'anfragebeispiel.de';
    const subject = encodeURIComponent('Anfrage Entrümpelung');
    const body = encodeURIComponent(
      `Name: ${name}\nE-Mail: ${email}\nTelefon: ${tel}\n---\nNachricht:\n${msg}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });

  // JSON-LD aus vorhandenen Infos befüllen (keine neuen Daten erfinden)
  const ld = $('#ldjson');
  if (ld) {
    const json = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Loos Entrümpelung',
      description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
      telephone: '+49 176 12345678',
      email: 'anfragebeispiel.de',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Straße Nr',
        postalCode: 'PLZ',
        addressLocality: 'Ort',
        addressCountry: 'DE'
      },
      areaServed: 'Region',
      openingHours: 'Mo-Sa 08:00-18:00',
      priceRange: ''
    };
    ld.textContent = JSON.stringify(json);
  }
})();
