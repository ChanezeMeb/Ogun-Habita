# OGUN HABITA — site vitrine

Site statique de OGUN HABITA, entreprise de maçonnerie et de rénovation à Rivière-Salée (Martinique).

- `site/` : le site (HTML/CSS/JS, sans dépendance). Ouvrir `site/index.html` dans un navigateur pour le voir en local.
- `brochure/` : brochure A4 recto-verso (`brochure.html` → `OGUN_HABITA_Brochure.pdf`).
- `netlify.toml` : hébergement Netlify, publie le dossier `site/`.

## Formulaire de devis

Le formulaire utilise Netlify Forms. Les demandes sont envoyées par e-mail
(Netlify → Forms → Form notifications). En local, l'envoi est simulé.

## Régénérer la brochure PDF

```sh
pip install weasyprint
weasyprint brochure/brochure.html brochure/OGUN_HABITA_Brochure.pdf
```
