// Menu mobile
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}));

// Formulaire de devis
// Envoi via Netlify Forms (hébergement Netlify) : chaque demande arrive par e-mail.
const form = document.getElementById('devis-form');

function showError(key, show) {
  form.querySelector(`.error[data-for="${key}"]`)?.classList.toggle('show', show);
}

function validate() {
  let ok = true;

  const travaux = form.querySelectorAll('input[name="travaux"]:checked').length > 0;
  showError('travaux', !travaux); ok &&= travaux;

  for (const id of ['commune', 'description', 'nom']) {
    const el = form.querySelector('#' + id);
    const valid = el.value.trim() !== '';
    el.classList.toggle('invalid', !valid);
    showError(id, !valid); ok &&= valid;
  }

  const tel = form.querySelector('#tel');
  const email = form.querySelector('#email');
  const telOk = tel.value.replace(/\D/g, '').length >= 10;
  const emailOk = email.value.trim() !== '' && email.checkValidity();
  tel.classList.toggle('invalid', !telOk);
  showError('tel', !telOk); ok &&= telOk;
  email.classList.toggle('invalid', !emailOk);
  showError('email', !emailOk); ok &&= emailOk;

  const consent = form.querySelector('input[name="consentement"]').checked;
  showError('consentement', !consent); ok &&= consent;

  return ok;
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validate()) {
    form.querySelector('.error.show')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = 'Envoi en cours…';

  try {
    // En local (fichier ouvert directement), l'envoi est simulé.
    if (location.protocol !== 'file:') {
      const data = new FormData(form);
      // regroupe les cases cochées en une seule ligne lisible dans l'e-mail
      const travaux = data.getAll('travaux').join(', ');
      data.delete('travaux');
      data.set('travaux', travaux);
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      });
      if (!res.ok) throw new Error(res.status);
    }
    form.querySelectorAll('fieldset, .consent, button[type="submit"]').forEach(el => el.hidden = true);
    document.getElementById('form-success').hidden = false;
  } catch {
    button.disabled = false;
    button.textContent = 'Envoyer ma demande';
    alert("L'envoi n'a pas fonctionné. Vous pouvez nous appeler au 0696 92 68 52 ou écrire à ogunhabita@gmail.com.");
  }
});
