# Plan de tests repo local

Objectif: valider le projet complet avant commit, preprod ou hebergement cPanel, sans exposer de secrets et sans modifier le design.

Ce document a ete construit apres lecture du repo local: structure racine, `frontend/`, `backend/`, workflow GitHub Pages, scripts, composants, formulaires, modales, medias, SEO et fichiers de configuration.

## 0. Regles avant de tester

- Ne jamais afficher ni commiter `backend/.env` ou `frontend/.env.local`.
- Ne pas lancer trop de tests email reels: chaque requete valide vers `/api/contact` peut envoyer un email SMTP.
- Lancer les tests depuis la racine du repo:

```powershell
cd C:\Users\X\Documents\SanaaServices-V2
```

- Si un test echoue, noter:
  - commande lancee;
  - erreur exacte;
  - navigateur et largeur d'ecran si test visuel;
  - URL testee;
  - Request ID si formulaire.

## 1. Tests d'integrite du repo

### 1.1 Etat Git avant commit

Commande:

```powershell
git status --short
```

Resultat attendu:

- Les anciens fichiers racine de l'ancien frontend apparaissent comme supprimes seulement si leurs equivalents existent bien dans `frontend/`.
- Les dossiers `frontend/` et `backend/` sont visibles comme nouveaux ou modifies avant staging.
- Aucun fichier secret n'apparait:
  - `backend/.env`
  - `frontend/.env.local`
  - logs locaux
  - `node_modules/`
  - `.next/`
  - `out/`

Priorite: Critique.

### 1.2 Fichiers locaux a ne pas commiter

Commande:

```powershell
Get-ChildItem -Force | Select-Object Mode,Name,Length
```

Verifier que les elements suivants restent ignores:

- `.next-dev.stderr.log`
- `.next-dev.stdout.log`
- `.next/`
- `.local-preview/`
- `node_modules/`
- `out/`
- `frontend/.next/`
- `frontend/out/`
- `backend/node_modules/`
- `frontend/node_modules/`

Priorite: Critique.

### 1.3 Exemples d'environnement

Commandes:

```powershell
Get-Content backend\.env.example
Get-Content frontend\.env.example
```

Resultat attendu:

- `backend/.env.example` contient uniquement des placeholders.
- `frontend/.env.example` contient uniquement des variables publiques ou placeholders.
- Le README correspond aux noms de variables reels.

Priorite: Important.

## 2. Installation et scripts

### 2.1 Installation clean frontend

Commande:

```powershell
npm.cmd --prefix frontend ci
```

Resultat attendu:

- Installation sans erreur.
- `frontend/package-lock.json` reste coherent.

Priorite: Critique.

### 2.2 Installation clean backend

Commande:

```powershell
npm.cmd --prefix backend ci
```

Resultat attendu:

- Installation sans erreur.
- `backend/package-lock.json` reste coherent.

Priorite: Critique.

### 2.3 Scripts racine

Commandes:

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run build:pages
npm.cmd run audit:assets
npm.cmd run perf:budget
```

Resultat attendu:

- `lint`, `build`, `build:pages`, `audit:assets` passent.
- `perf:budget` doit etre analyse: la video hero est volontairement centrale, mais un echec signale le poids reel a surveiller.

Priorite: Critique pour build/lint, Important pour perf.

## 3. Tests backend Express

Fichiers couverts:

- `backend/server.js`
- `backend/package.json`
- `backend/.env.example`

### 3.1 Lancement local

Commande:

```powershell
npm.cmd --prefix backend run dev
```

Resultat attendu:

- Le serveur demarre sur `PORT`, par defaut `4000`.
- Message console de type: `Sanaa Services contact API running on port 4000`.

Priorite: Critique.

### 3.2 Health check

Commande:

```powershell
Invoke-RestMethod http://127.0.0.1:4000/health
```

Resultat attendu:

```json
{
  "success": true,
  "status": "ok"
}
```

Priorite: Critique.

### 3.3 Validation minimale refusee

Commande:

```powershell
Invoke-RestMethod `
  -Method Post `
  -Uri http://127.0.0.1:4000/api/contact `
  -ContentType "application/json" `
  -Body "{}"
```

Resultat attendu:

- Reponse JSON `success: false`.
- Erreur claire sur le premier champ obligatoire manquant.
- Aucun email envoye.

Priorite: Critique.

### 3.4 Envoi minimal avec telephone

Attention: ce test peut envoyer un vrai email.

Commande:

```powershell
$body = @{
  name = "Test Visitor"
  phone = "+1 555 0100"
  contactMethod = "Phone"
  travelPurpose = "World Cup 2026"
  message = "Local backend test"
} | ConvertTo-Json

Invoke-RestMethod `
  -Method Post `
  -Uri http://127.0.0.1:4000/api/contact `
  -ContentType "application/json" `
  -Body $body
```

Resultat attendu:

- `success: true`.
- `requestId` au format `SS-YYYYMMDD-XXXXXX`.
- Email recu sur `MAIL_TO`.
- Meme Request ID dans le sujet et le corps du mail.

Priorite: Critique.

### 3.5 Envoi minimal avec email sans telephone

Resultat attendu:

- La demande est acceptee si `email` est present et valide.
- Aucun blocage artificiel si le telephone est vide.

Priorite: Critique.

### 3.6 Email invalide

Payload a tester:

```json
{
  "name": "Test Visitor",
  "email": "bad-email",
  "contactMethod": "Email",
  "travelPurpose": "Flight booking",
  "message": "Testing invalid email"
}
```

Resultat attendu:

- Reponse JSON `success: false`.
- Message clair: email invalide.
- Aucun email envoye.

Priorite: Critique.

### 3.7 Honeypot anti-spam

Payload a tester:

```json
{
  "name": "Bot",
  "phone": "123",
  "contactMethod": "Phone",
  "travelPurpose": "Travel",
  "message": "Spam",
  "company": "spam company"
}
```

Resultat attendu:

- Reponse `success: true` generique.
- Aucun email envoye.
- Le bot ne recoit pas d'indice utile.

Priorite: Important.

### 3.8 Rate limit 10 par IP

Commande sans email reel, en utilisant un payload invalide:

```powershell
1..11 | ForEach-Object {
  try {
    Invoke-RestMethod `
      -Method Post `
      -Uri http://127.0.0.1:4000/api/contact `
      -ContentType "application/json" `
      -Body "{}"
  } catch {
    $_.Exception.Response.StatusCode.value__
  }
}
```

Resultat attendu:

- Les premieres requetes retournent une erreur de validation.
- La 11e requete dans la fenetre de temps retourne `429`.
- Message JSON clair: trop de demandes.

Priorite: Important.

### 3.9 CORS limite au frontend

Tester avec `FRONTEND_URL=http://localhost:3000`.

Resultat attendu:

- Origine `http://localhost:3000` acceptee.
- Origine externe non autorisee refusee avec JSON d'erreur.
- Les requetes sans `Origin` restent possibles pour tests serveur/cPanel.

Priorite: Critique.

### 3.10 Erreurs SMTP

Procedure:

- Modifier temporairement une variable SMTP dans `backend/.env`.
- Relancer le backend.
- Envoyer une demande valide.

Resultat attendu:

- Reponse JSON `success: false`.
- Message public non technique.
- Erreur detaillee seulement cote serveur.
- Le frontend affiche une erreur propre.

Priorite: Critique.

## 4. Tests frontend Next.js

Fichiers couverts:

- `frontend/app/layout.tsx`
- `frontend/app/page.tsx`
- `frontend/app/globals.css`
- `frontend/next.config.mjs`
- `frontend/tailwind.config.ts`
- `frontend/tsconfig.json`
- `frontend/eslint.config.mjs`

### 4.1 Lancement local

Commande:

```powershell
npm.cmd --prefix frontend run dev
```

Resultat attendu:

- Frontend accessible sur `http://127.0.0.1:3000/`.
- Aucun `Internal Server Error`.
- Aucun appel bloquant a Google Fonts.

Priorite: Critique.

### 4.2 Build applicatif

Commande:

```powershell
npm.cmd run build
```

Resultat attendu:

- Build Next.js passe.
- Les routes statiques sont generees.
- Pas d'erreur sur `params`, metadata, images ou imports.

Priorite: Critique.

### 4.3 Build GitHub Pages

Commande:

```powershell
npm.cmd run build:pages
```

Resultat attendu:

- `frontend/out/` est cree.
- `.nojekyll` est present dans `frontend/out/`.
- Les assets utilisent le bon `basePath` si `NEXT_PUBLIC_BASE_PATH` est defini.

Priorite: Critique.

### 4.4 Lint

Commande:

```powershell
npm.cmd run lint
```

Resultat attendu:

- Aucun warning ou erreur bloquante.
- Les composants client/server restent coherents.

Priorite: Critique.

## 5. Tests assets et medias

Fichiers couverts:

- `frontend/components/media/HeroVideo.tsx`
- `frontend/components/media/ResponsiveImage.tsx`
- `frontend/public/img/**`
- `frontend/public/vid/**`
- `frontend/scripts/audit-assets.mjs`
- `frontend/scripts/performance-budget.mjs`

### 5.1 References d'assets existantes

Commande:

```powershell
rg -n '"/(img|vid)/' frontend/app frontend/components frontend/data frontend/lib
```

Verifier manuellement que chaque chemin existe dans `frontend/public`.

Point a surveiller:

- L'image utilisee comme poster hero et Open Graph doit toujours exister dans `frontend/public`.
- Reference actuelle: `/img/compressed/worldcup-main-02.jpg`.

Priorite: Critique.

### 5.2 Audit du poids des assets

Commande:

```powershell
npm.cmd run audit:assets
```

Resultat attendu:

- Liste claire des plus gros fichiers.
- Les images restent raisonnables.
- Les videos sont visibles comme principaux postes de poids.

Priorite: Important.

### 5.3 Budget performance

Commande:

```powershell
npm.cmd run perf:budget
```

Resultat attendu:

- Idealement passe.
- Si echec, verifier que l'echec est uniquement lie au poids volontaire de `hero-vid1.mp4` ou `CSM1.mp4`.
- Ne pas accepter un nouvel asset lourd non identifie.

Priorite: Important.

### 5.4 Video hero globale

Sur `http://127.0.0.1:3000/`:

- La video de fond hero est visible.
- Le scrim bleu transparent est visible au-dessus de la video.
- Le texte reste lisible.
- Si `prefers-reduced-motion` est active, le poster/fond reste propre et la video ne devient pas un bloc vide.

Priorite: Critique.

### 5.5 Video formulaire Travel request

Dans la section `Travel request`:

- La video `CSM1.mp4` est visible derriere le formulaire.
- Le scrim bleu rend le texte lisible.
- Aucun fallback vers une image supprimee.
- Le formulaire reste lisible sur mobile.

Priorite: Critique.

## 6. Tests parcours homepage

Fichier principal: `frontend/app/page.tsx`.

### 6.1 Hero

Viewports:

- `320x740`
- `360x800`
- `390x844`
- `430x932`
- `768x1024`
- `1024x768`
- `1440x1000`

Resultat attendu:

- Le header ne couvre pas le texte.
- `World Cup 2026 in the USA` n'est jamais coupe a droite.
- `Travel with Confidence, Support with Pride` n'est jamais coupe a droite.
- Aucun scroll horizontal.
- Les CTA hero sont centres et adaptes a la taille de leur texte.

Priorite: Critique.

### 6.2 Header desktop

Elements attendus:

- Logo Sanaa Services.
- Navigation:
  - World Cup 2026
  - Services
  - Reviews
  - Contact
  - About us
- CTA desktop visibles seulement quand le menu sandwich n'est pas visible.
- Texte blanc, hover champagne/jaune.

Priorite: Critique.

### 6.3 Menu mobile

Sur mobile:

- Le menu sandwich s'ouvre.
- Il se ferme au clic hors panneau.
- Il se ferme avec `Escape`.
- Il se ferme avec le bouton retour telephone/navigateur.
- `About us` ouvre une modale globale, pas une modale coincee dans le menu.
- Apres fermeture d'About, le site reste utilisable.

Priorite: Critique.

### 6.4 Carousel logos airlines

Resultat attendu:

- Logos visibles.
- Animation fluide.
- Pause au hover desktop.
- Pas d'information essentielle uniquement dans le carousel, car il est decoratif/masque aux lecteurs d'ecran.

Priorite: Amelioration.

### 6.5 Section World Cup 2026 Travel Support

Resultat attendu:

- Fond transparent coherent avec le background global video.
- Pas de fond bleu supplementaire non voulu.
- Texte centre.
- Pas d'ancienne liste de bullet points.

Priorite: Important.

### 6.6 Section About story

Resultat attendu:

- Carte image `sanaa-bergha.webp` visible.
- Texte de droite sticky sur desktop.
- Bouton `About us` ouvre la modale.
- Modale fermable au bouton, clic overlay, Escape.
- Focus clavier reste propre.

Priorite: Critique.

### 6.7 Section Services

Resultat attendu:

- Eyebrow/titre de section nomme `Services`.
- Chaque carte est un vrai bouton accessible.
- Hover/focus visibles.
- Clic ouvre une modale service.
- Aucun changement de page au clic sur les cartes homepage.

Priorite: Critique.

### 6.8 Section How it works / Travel request

Resultat attendu:

- Le bloc texte de gauche reste visible/sticky sur desktop pendant le scroll.
- Le formulaire reste la zone interactive principale.
- Les champs obligatoires sont en haut.
- Les details optionnels sont dans un menu repliable.

Priorite: Critique.

### 6.9 Reviews

Resultat attendu:

- Titre: `Client Trust, Built Over Years`.
- Si Google Places n'est pas configure, fallback testimonials visible.
- Si Google Places est configure, pas d'erreur serveur visible au visiteur.

Priorite: Important.

### 6.10 Cartes finales

Resultat attendu:

- `Creators and partners` et `Final travel call` ont meme largeur, meme forme et meme logique responsive.
- Les CTA de la carte finale sont en bas.
- Le texte est centre et lisible avec effet blur.

Priorite: Important.

### 6.11 Footer

Resultat attendu:

- Footer present.
- Logo taille correcte.
- Hauteur optimisee.
- Carte Google visible.
- Liens About, Contact, Privacy, Reviews fonctionnels.

Priorite: Important.

## 7. Tests formulaires frontend

Fichiers couverts:

- `frontend/components/forms/QuickLeadForm.tsx`
- `frontend/components/forms/ServiceLeadForm.tsx`
- `frontend/components/forms/RequestSuccessModal.tsx`
- `frontend/components/forms/UploadField.tsx`
- `frontend/lib/contact-api.ts`

### 7.1 Formulaire Travel request minimal

Remplir:

- Full name
- Phone number ou Email address
- Preferred contact method
- Travel purpose
- Message

Resultat attendu:

- Loading pendant l'envoi.
- Email envoye par backend.
- Modale de confirmation visible.
- Request ID visible.
- WhatsApp propose en option seulement, jamais ouvert automatiquement.

Priorite: Critique.

### 7.2 Telephone ou email obligatoire

Cas a tester:

- Telephone seul: accepte.
- Email seul: accepte.
- Les deux vides: bloque avec message clair.

Priorite: Critique.

### 7.3 Champs optionnels

Ouvrir `Add travel details`.

Verifier:

- Les champs optionnels restent caches par defaut.
- Les champs remplis sont envoyes.
- Les champs vides ne polluent pas inutilement l'email.

Priorite: Important.

### 7.4 Erreur API

Procedure:

- Arreter le backend ou mettre une URL invalide dans `frontend/.env.local`.
- Envoyer le formulaire.

Resultat attendu:

- Message d'erreur visible.
- Le bouton redevient utilisable.
- Pas d'ouverture WhatsApp.
- Pas de crash React.

Priorite: Critique.

### 7.5 Modale de succes

Verifier:

- Bouton Close.
- Clic overlay.
- Touche Escape.
- Lien WhatsApp avec message prerempli.
- Request ID identique a celui de l'email.

Priorite: Critique.

### 7.6 Formulaire service

Pour chaque page service:

- `/services/notary-services`
- `/services/legal-consulting`
- `/services/insurance`
- `/services/translation`
- `/services/driving-school`
- `/services/visa-immigration`
- `/services/travel-agency`

Verifier:

- Le champ service est bien envoye.
- Les champs specifiques optionnels sont presents.
- L'upload field n'annonce pas un upload reel si aucun fichier n'est envoye au backend.
- La confirmation reprend le service.

Priorite: Critique.

## 8. Tests modales Services homepage

Fichiers couverts:

- `frontend/components/marketing/AnimatedTravelServiceCard.tsx`
- `frontend/app/page.tsx`
- `frontend/app/globals.css`

Cartes a tester:

- Flights & Bookings
- Hotels & Stay Planning
- Family Travel
- Travel Insurance
- World Cup 2026 Trips
- Multi-City USA Travel

Pour chaque carte:

- Ouverture au clic.
- Fermeture bouton X.
- Fermeture overlay.
- Fermeture Escape.
- Focus clavier visible.
- Image de gauche sticky et centree verticalement sur desktop.
- Scroll interne mobile propre.
- CTA WhatsApp et Start request visibles.
- Aucun debordement horizontal.

Tests specifiques:

- `World Cup 2026 Trips`: galerie/carousel images.
- `Multi-City USA Travel`: gif ou image animee non bloquee si le fichier est cense etre anime; cadrage plutot carre; pas de mini photos a droite si retirees.

Priorite: Critique.

## 9. Tests pages internes

### 9.1 `/about`

Fichier: `frontend/app/about/page.tsx`.

Resultat attendu:

- Page charge sans erreur.
- Contenu clair.
- Carte office/contact presente.
- CTA fonctionnels.

Priorite: Important.

### 9.2 `/contact`

Fichier: `frontend/app/contact/page.tsx`.

Resultat attendu:

- Cartes phone/email/address visibles.
- QuickLeadForm fonctionnel.
- MapCard charge correctement.

Priorite: Critique.

### 9.3 `/faq`

Fichiers:

- `frontend/app/faq/page.tsx`
- `frontend/data/faq.ts`
- `frontend/components/marketing/FAQAccordion.tsx`

Resultat attendu:

- Accordions ouvrables/fermables.
- Questions generales et services visibles.
- Aucun caractere d'encodage casse.

Priorite: Important.

### 9.4 `/reviews`

Fichiers:

- `frontend/app/reviews/page.tsx`
- `frontend/lib/google-reviews.ts`

Resultat attendu:

- Fallback visible sans API Google.
- Aucun crash si API Google echoue.
- Lien Google Reviews fonctionne.

Priorite: Important.

### 9.5 `/services`

Fichiers:

- `frontend/app/services/page.tsx`
- `frontend/components/marketing/ServiceGrid.tsx`
- `frontend/components/marketing/ServiceCard.tsx`

Resultat attendu:

- Toutes les cartes services sont visibles.
- Les liens menent aux pages detail.
- Images et textes corrects.

Priorite: Important.

### 9.6 `/services/[slug]`

Fichier: `frontend/app/services/[slug]/page.tsx`.

Resultat attendu:

- Tous les slugs de `frontend/data/services.ts` generent une page.
- Un slug invalide retourne 404.
- Metadata par service correcte.
- FAQ service visible.
- Formulaire service fonctionnel.

Priorite: Critique.

### 9.7 `/privacy`

Fichier: `frontend/app/privacy/page.tsx`.

Resultat attendu:

- Page lisible.
- Informations coherence contact.
- Pas de placeholder.

Priorite: Important.

## 10. Tests accessibilite

Fichiers principaux:

- `Header.tsx`
- `MobileMenu.tsx`
- `AboutStoryTrigger.tsx`
- `AnimatedTravelServiceCard.tsx`
- `RequestSuccessModal.tsx`
- `FAQAccordion.tsx`
- `ButtonLink.tsx`
- `SubmitButton.tsx`

### 10.1 Navigation clavier

Tester uniquement au clavier:

- Tab depuis le haut de page.
- Header.
- Menu mobile.
- Cartes services.
- Modales.
- Formulaires.
- Footer.

Resultat attendu:

- Focus visible partout.
- Pas de focus perdu derriere une modale.
- Escape ferme les modales.
- Apres fermeture, le focus revient a l'element declencheur quand possible.

Priorite: Critique.

### 10.2 Roles et aria

Verifier:

- Modales avec `role="dialog"`.
- `aria-modal="true"`.
- `aria-labelledby` pointe vers un titre existant.
- Boutons close avec label accessible.
- Images decoratives en `alt=""`.
- Images informatives avec alt utile.

Priorite: Critique.

### 10.3 Contraste

Verifier sur mobile et desktop:

- Header blanc sur fond video.
- Texte hero sur video.
- Texte formulaire sur video.
- Cartes glass.
- Footer.
- Boutons champagne.

Priorite: Important.

### 10.4 Reduced motion

Activer `prefers-reduced-motion`.

Resultat attendu:

- Pas de grandes animations.
- Les contenus restent visibles.
- Carousel et modales ne deviennent pas blancs/vides.

Priorite: Important.

## 11. Tests SEO technique

Fichiers couverts:

- `frontend/app/layout.tsx`
- `frontend/lib/metadata.ts`
- `frontend/lib/schema.ts`
- `frontend/app/robots.ts`
- `frontend/app/sitemap.ts`
- `frontend/next.config.mjs`

### 11.1 Metadata globale

Verifier:

- Title et description presents.
- Open Graph present.
- Twitter card present.
- Image OG existe vraiment dans `frontend/public`.

Priorite: Critique.

### 11.2 Sitemap

Commande apres build:

```powershell
Get-Content frontend\out\sitemap.xml
```

Resultat attendu:

- Routes principales presentes.
- Routes services presentes.
- `lastModified` stable, pas `new Date()` mouvant a chaque build.

Priorite: Important.

### 11.3 Robots

Commande apres build:

```powershell
Get-Content frontend\out\robots.txt
```

Resultat attendu:

- `Allow: /`.
- Sitemap pointe vers le bon domaine/basePath.

Priorite: Important.

### 11.4 Schema LocalBusiness

Verifier dans le HTML:

- JSON-LD present.
- Nom, telephone, adresse, URL coherents avec `siteConfig`.
- Email affiche coherent avec l'email de production choisi.

Priorite: Important.

### 11.5 Hierarchie Hn

Verifier:

- Un seul H1 clair par page.
- Sections homepage structurees en H2.
- Pas de titre uniquement visuel sans structure.

Priorite: Important.

## 12. Tests responsive

Largeurs obligatoires:

- `320x740`
- `360x800`
- `390x844`
- `430x932`
- `768x1024`
- `1024x768`
- `1440x1000`

Pour chaque largeur:

- Pas de scroll horizontal.
- Header ne couvre pas le contenu.
- Menu mobile seulement aux bons breakpoints.
- CTA adaptes au texte, pas pleine largeur inutilement.
- Modales scrollables.
- Formulaires utilisables.
- Footer propre.

Priorite: Critique.

## 13. Tests cPanel / preprod

### 13.1 Backend Node sur cPanel

Verifier:

- cPanel peut lancer `backend/server.js`.
- Node version compatible, idealement 20.
- Variables d'environnement renseignees cote serveur.
- `FRONTEND_URL` pointe vers le vrai domaine frontend.
- `PORT` adapte a cPanel si necessaire.

Priorite: Critique.

### 13.2 Frontend statique ou Next export

Verifier:

- `npm.cmd run build:pages` genere un dossier statique exploitable.
- Le domaine sert bien `index.html`.
- Les assets `/img/...` et `/vid/...` chargent.
- Si le site est dans un sous-dossier, `NEXT_PUBLIC_BASE_PATH` est configure.

Priorite: Critique.

### 13.3 API frontend vers backend

Verifier:

- `NEXT_PUBLIC_CONTACT_API_URL` pointe vers l'URL publique backend.
- Le navigateur ne bloque pas la requete CORS.
- Les erreurs CORS ne contiennent pas de secrets.

Priorite: Critique.

## 14. Matrice fichier par fichier

| Fichier | Tests associes |
| --- | --- |
| `package.json` | Scripts racine, orchestration frontend, build, lint, assets. |
| `.gitignore` | Secrets, logs, builds et node_modules ignores. |
| `.gitattributes` | Videos sous LFS si GitHub doit les transporter correctement. |
| `.github/workflows/deploy.yml` | Build GitHub Pages depuis `frontend/`, variables publiques, artifact `frontend/out`. |
| `README.md` | Instructions locales, backend, frontend, deploy et variables coherentes. |
| `backend/package.json` | Scripts `dev/start`, dependances Express/Nodemailer/CORS/rate-limit. |
| `backend/.env.example` | Placeholders SMTP, CORS, rate limit, aucune valeur secrete. |
| `backend/server.js` | Health, CORS, validation, honeypot, rate limit, SMTP, Request ID, JSON errors. |
| `frontend/package.json` | Scripts Next, lint, build static, audit assets, budget. |
| `frontend/next.config.mjs` | Export statique, basePath GitHub Pages, trailingSlash. |
| `frontend/tsconfig.json` | Strict mode, alias `@/*`. |
| `frontend/tailwind.config.ts` | Couleurs, typo, ombres, coherence design. |
| `frontend/eslint.config.mjs` | Lint Next. |
| `frontend/postcss.config.js` | Tailwind/PostCSS. |
| `frontend/performance-budget.json` | Limites assets publiques. |
| `frontend/app/layout.tsx` | Metadata globale, JSON-LD, header/footer, fond scrim global. |
| `frontend/app/globals.css` | Hero responsive, scrim bleu, fonds homepage, animations, reduced motion, carousel. |
| `frontend/app/page.tsx` | Homepage complete: hero, World Cup, About, Services, formulaire, reviews, cartes finales. |
| `frontend/app/about/page.tsx` | Page About, contact strip, coherence contenu. |
| `frontend/app/contact/page.tsx` | Page contact, QuickLeadForm, MapCard. |
| `frontend/app/faq/page.tsx` | FAQ generale et services. |
| `frontend/app/privacy/page.tsx` | Politique, contenu non placeholder. |
| `frontend/app/reviews/page.tsx` | Reviews fallback/live. |
| `frontend/app/services/page.tsx` | Grille services, liens. |
| `frontend/app/services/[slug]/page.tsx` | Generation slugs, 404, metadata, formulaire service. |
| `frontend/app/robots.ts` | Robots statique et sitemap. |
| `frontend/app/sitemap.ts` | Routes et dates stables. |
| `frontend/data/site.ts` | Nav, contact, adresse, email, telephone, WhatsApp. |
| `frontend/data/services.ts` | Slugs, images, FAQs, champs optionnels, textes sans encodage casse. |
| `frontend/data/faq.ts` | FAQ sans encodage casse. |
| `frontend/data/testimonials.ts` | Fallback reviews. |
| `frontend/lib/assets.ts` | BasePath pour assets statiques. |
| `frontend/lib/contact.ts` | Liens tel, mailto, WhatsApp. |
| `frontend/lib/contact-api.ts` | API URL, payload formulaire, WhatsApp optionnel, erreurs. |
| `frontend/lib/google-reviews.ts` | Google Places ou fallback sans crash. |
| `frontend/lib/metadata.ts` | OG/Twitter image existante. |
| `frontend/lib/schema.ts` | JSON-LD LocalBusiness. |
| `frontend/lib/analytics.ts` | dataLayer sans crash si absent. |
| `frontend/components/layout/Header.tsx` | Header fixe, nav desktop, About modal, CTA desktop. |
| `frontend/components/layout/MobileMenu.tsx` | Sandwich, clic exterieur, back button, About modal. |
| `frontend/components/layout/Footer.tsx` | Footer, logo, map, liens. |
| `frontend/components/layout/SiteLogo.tsx` | Logo header/footer, tailles, alt. |
| `frontend/components/layout/ScrollToTopButton.tsx` | Apparition au scroll, pas de bande mobile parasite. |
| `frontend/components/forms/QuickLeadForm.tsx` | Formulaire travel, video, validations, optionnels, submit API. |
| `frontend/components/forms/ServiceLeadForm.tsx` | Formulaire pages services, champs specifiques, submit API. |
| `frontend/components/forms/RequestSuccessModal.tsx` | Confirmation, Request ID, WhatsApp optionnel, fermeture. |
| `frontend/components/forms/UploadField.tsx` | UI fichier locale, pas de promesse d'upload backend. |
| `frontend/components/marketing/AboutStoryTrigger.tsx` | Carte About, modale, focus trap, contenu markdown parse. |
| `frontend/components/marketing/AnimatedTravelServiceCard.tsx` | Cartes services homepage, modales, carousel, sticky image. |
| `frontend/components/marketing/AirlineLogoCarousel.tsx` | Logos, animation, reduced motion. |
| `frontend/components/marketing/ContactStrip.tsx` | CTA contact et carte finale. |
| `frontend/components/marketing/FAQAccordion.tsx` | Accordions accessibles. |
| `frontend/components/marketing/MapCard.tsx` | Iframe Google Maps. |
| `frontend/components/marketing/PanelPromoCard.tsx` | Cartes promo meme dimension. |
| `frontend/components/marketing/ReviewCard.tsx` | Rendu reviews. |
| `frontend/components/marketing/SectionHeading.tsx` | Hierarchie titres. |
| `frontend/components/marketing/ServiceCard.tsx` | Cartes services pages internes. |
| `frontend/components/marketing/ServiceGrid.tsx` | Grille services responsive. |
| `frontend/components/marketing/TrustBadgeRow.tsx` | Badges hero. |
| `frontend/components/media/HeroVideo.tsx` | Chargement video, poster, reduced motion, saveData. |
| `frontend/components/media/ResponsiveImage.tsx` | Images publiques, sizes/loading/decoding. |
| `frontend/components/ui/ButtonLink.tsx` | CTA tailles fit-content, variants, focus. |
| `frontend/components/ui/CardSurface.tsx` | Surfaces visuelles coherentes. |
| `frontend/components/ui/CTAGroup.tsx` | Groupes CTA centres/adaptatifs. |
| `frontend/components/ui/SubmitButton.tsx` | Etat loading/disabled. |
| `frontend/scripts/audit-assets.mjs` | Inventaire assets. |
| `frontend/scripts/build-github-pages.mjs` | Export statique et `.nojekyll`. |
| `frontend/scripts/performance-budget.mjs` | Budget poids assets. |

## 15. Tests de contenu et coherence

### 15.1 Encodage

Commande:

```powershell
rg -n "â|Ã|�" frontend backend README.md
```

Resultat attendu:

- Aucun caractere casse.
- Les tirets, apostrophes et accents sont propres.

Priorite: Important.

### 15.2 Coordonnees et domaine

Verifier dans `frontend/data/site.ts`, README, backend `.env.example`:

- Email public voulu.
- Telephone.
- Adresse.
- Domaine frontend.
- Domaine backend/API.
- WhatsApp.

Priorite: Important.

### 15.3 Texte visible sans placeholders

Commande:

```powershell
rg -n "Placeholder|Lorem|TODO|FIXME" frontend backend README.md
```

Resultat attendu:

- Aucun placeholder public.
- Les TODO techniques restants sont volontaires et documentes.

Priorite: Important.

## 16. Ordre recommande d'execution

1. `git status --short`.
2. Verifier secrets/logs ignores.
3. `npm.cmd --prefix backend ci`.
4. `npm.cmd --prefix frontend ci`.
5. Lancer backend et tester `/health`.
6. Lancer frontend et tester homepage.
7. Tester formulaire minimal + email reel.
8. Tester modale WhatsApp optionnelle.
9. Tester menu mobile et modales.
10. Tester toutes les routes internes.
11. `npm.cmd run lint`.
12. `npm.cmd run build`.
13. `npm.cmd run build:pages`.
14. `npm.cmd run audit:assets`.
15. `npm.cmd run perf:budget`.
16. Corriger les points rouges.
17. Refaire `git status --short`.
18. Commit seulement quand les echecs restants sont compris et acceptes.

## 17. Points a surveiller avant commit

- `hero-vid1.mp4` est lourd: ne pas le supprimer sans validation, c'est une piece visuelle centrale.
- Le poster hero / Open Graph reference dans metadata et hero doit exister dans `frontend/public`.
- Les logs `.next-dev.*.log` doivent rester hors commit.
- Les fichiers `.env` doivent rester hors commit.
- Le backend doit rester separable du frontend pour cPanel.
- Le frontend ne doit jamais contenir SMTP user/pass.
- WhatsApp est optionnel apres l'email, pas automatique.
- Le rate limit est actuellement prevu a 10 par IP.
