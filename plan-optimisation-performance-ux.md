# Plan d'action performance et UX

Date: 2026-06-06  
Projet: Sanaa Services  
Base: audit `audit-performance-ux.md`

Objectif: transformer le site GitHub Pages en site statique tres rapide, fluide sur mobile, avec un rendu toujours premium. Ce document est un plan d'action. Il ne modifie pas encore le code fonctionnel.

## Objectifs cibles

| Indicateur | Cible |
| --- | ---: |
| Poids total de `out/` | 52,44 Mo -> moins de 12 Mo |
| Poids `public/img` + `public/vid` utile | 49,74 Mo -> moins de 10 Mo |
| Hero poster | 3,20 Mo -> moins de 200 Ko |
| Logo header | 1,34 Mo -> moins de 100 Ko |
| Image carte service | 1,5-3,2 Mo -> 80-180 Ko |
| Video hero | 6,69 Mo -> 800 Ko-2 Mo selon variante |
| Video formulaire | 7,72 Mo -> lazy load strict ou remplacement image |
| LCP mobile | viser moins de 2,5 s |
| CLS | viser moins de 0,05 |
| JS/CSS initial | garder sous 1 Mo, deja proche |

## Principe directeur

GitHub Pages sert un site statique. Il ne fournit pas l'optimisation serveur de `next/image`. Donc tous les medias doivent etre optimises avant d'arriver dans `public`.

La strategie doit etre:

- optimiser les fichiers sources;
- servir des variantes adaptees desktop/mobile;
- eviter le chargement automatique des medias non visibles;
- garder une experience visuelle proche du design actuel;
- mesurer avant/apres a chaque lot.

## Phase 0 - Baseline et garde-fous

But: figer les mesures avant modification pour pouvoir prouver le gain.

Actions:

1. Conserver l'audit actuel comme reference.
2. Ajouter un script de mesure local, par exemple `scripts/audit-assets.mjs`.
3. Mesurer:
   - poids total de `public/img`;
   - poids total de `public/vid`;
   - 20 plus gros fichiers;
   - poids de `out/`;
   - nombre de medias references dans `out/index.html`.
4. Ajouter une commande npm:
   - `npm run audit:assets`
5. Ajouter une section "budgets" dans le rapport ou dans un fichier dedie.

Fichiers concernes:

- `package.json`
- `scripts/audit-assets.mjs`
- eventuellement `performance-budget.json`

Critere de validation:

- on peut lancer une commande unique et obtenir les poids critiques.

## Phase 1 - Nettoyage des assets non utilises

But: reduire le poids du repo et du deploiement sans risque visuel.

Assets suspects:

- `public/vid/CSM2.mp4` - 9,01 Mo
- `public/img/pexels-rdne-7841473.jpg` - 2,37 Mo
- `public/img/pexels-karola-g-7681068.jpg` - 1,40 Mo
- `public/img/apointment2.jpg` - 0,36 Mo
- `public/img/where_to_start.jpg` - 0,60 Mo

Actions:

1. Confirmer qu'ils ne sont pas references dans `app`, `components`, `data`, `lib`.
2. Les deplacer dans un dossier hors publication ou les supprimer du repo si aucun usage prevu.
3. Si on veut les garder pour design futur, les placer hors `public`, par exemple `assets/source/`, pour qu'ils ne soient pas deployes.

Fichiers/dossiers concernes:

- `public/img`
- `public/vid`
- eventuellement nouveau dossier `assets/source`

Gain attendu:

- reduction immediate possible d'environ 13,7 Mo dans l'export.

Critere de validation:

- `npm run build` fonctionne;
- aucune reference cassee dans `out/index.html`;
- `out/` diminue fortement.

## Phase 2 - Pipeline images statiques

But: remplacer les images originales par des formats et dimensions adaptes a leur usage.

### Structure proposee

Creer des variantes dans:

```txt
public/img/optimized/
  logo/
  hero/
  services/
  cards/
  cta/
```

Formats recommandes:

- AVIF pour les navigateurs modernes;
- WebP fallback;
- JPG fallback uniquement si necessaire.

Tailles cibles:

| Usage | Largeur desktop | Largeur mobile | Poids cible |
| --- | ---: | ---: | ---: |
| Logo header/footer | 512 px max | 320 px max | moins de 100 Ko |
| Hero poster | 1920 px | 960 px | 120-220 Ko |
| Service featured | 1600 px | 900 px | 120-220 Ko |
| Service standard | 1100 px | 700 px | 80-160 Ko |
| Prepare cards | 1000 px | 700 px | 80-150 Ko |
| CTA background | 1400 px | 800 px | 100-180 Ko |

Actions:

1. Installer ou utiliser un outil de conversion image:
   - option recommandee: `sharp`;
   - alternative manuelle: Squoosh, ImageOptim, TinyPNG, Photoshop export.
2. Generer les variantes AVIF/WebP.
3. Garder les originaux hors `public` si besoin.
4. Mettre a jour les chemins dans le code ou dans `data/services.ts`.
5. Ajouter un budget de taille par image.

Fichiers concernes:

- `data/services.ts`
- `app/page.tsx`
- `components/marketing/ServiceCard.tsx`
- `components/marketing/ContactStrip.tsx`
- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `lib/assets.ts`

Critere de validation:

- aucune image utile au site ne depasse 250 Ko, sauf exception explicite;
- le rendu visuel reste premium;
- le logo est net sur desktop et mobile;
- l'export `out/img` baisse fortement.

## Phase 3 - Remplacer les backgrounds CSS critiques par composants media controlables

But: reprendre le controle du lazy loading et des variantes responsives.

Probleme actuel:

Les sections suivantes utilisent des images en `backgroundImage`:

- `app/page.tsx`, cartes "Before you reach out";
- `components/marketing/ContactStrip.tsx`.

Les background images CSS ne beneficient pas du lazy loading natif d'une image HTML.

Actions:

1. Creer un composant media statique, par exemple:
   - `components/media/ResponsivePicture.tsx`
2. Utiliser une balise `picture` avec sources AVIF/WebP.
3. Utiliser `loading="lazy"` pour les images sous la ligne de flottaison.
4. Garder le meme rendu visuel avec position absolute + overlay.
5. Retirer les `backgroundImage` inline pour les cartes et le CTA.

Fichiers concernes:

- `components/media/ResponsivePicture.tsx`
- `app/page.tsx`
- `components/marketing/ContactStrip.tsx`

Critere de validation:

- les images sous le hero ne sont pas chargees avant d'entrer proche du viewport;
- les overlays et effets visuels restent identiques;
- pas de layout shift.

## Phase 4 - Strategie video hero

But: garder un hero premium sans penaliser le premier chargement.

Probleme actuel:

- `hero-vid1.mp4`: 6,69 Mo;
- video dans le premier viewport;
- autoplay + loop;
- poster actuel: 3,20 Mo.

Strategie proposee:

1. Optimiser la video hero en deux variantes:
   - desktop: 1280-1600 px, 6-10 secondes, moins de 2 Mo;
   - mobile: 720-960 px, moins de 1 Mo.
2. Generer un poster hero tres leger:
   - desktop moins de 200 Ko;
   - mobile moins de 120 Ko.
3. Creer un composant `HeroVideo`:
   - affiche d'abord le poster;
   - charge la video apres le premier rendu;
   - respecte `prefers-reduced-motion`;
   - peut desactiver la video sur connexion lente si `navigator.connection.saveData` est actif;
   - choisit mobile/desktop selon viewport.
4. Garder le texte hero visible immediatement.

Fichiers concernes:

- `app/page.tsx`
- nouveau `components/media/HeroVideo.tsx`
- `public/vid`
- `public/img/optimized/hero`

Critere de validation:

- premier affichage hero visible rapidement meme sans video;
- video lancee seulement apres le rendu initial;
- pas de fond noir pendant le chargement;
- LCP lie au poster ou au texte, pas au fichier video lourd.

## Phase 5 - Strategie video du formulaire

But: empecher `CSM1.mp4` de concurrencer le hero et les images.

Probleme actuel:

- `CSM1.mp4`: 7,72 Mo;
- video background dans `QuickLeadForm`;
- formulaire plus bas dans la home;
- autoplay.

Options recommandees:

### Option A - Lazy video stricte

1. Creer un composant `LazyBackgroundVideo`.
2. Ne pas injecter `<source>` tant que le formulaire n'est pas proche du viewport.
3. Utiliser un poster image optimise en attendant.
4. Desactiver la video sur mobile faible ou `prefers-reduced-motion`.

### Option B - Remplacement image premium

1. Remplacer la video par une image optimisee avec overlay blur.
2. Garder le rendu premium.
3. Supprimer le cout CPU/video de cette section.

Recommendation diagnostic:

Commencer par Option A si la video est importante pour la direction artistique. Passer a Option B si les mesures restent mauvaises sur mobile.

Fichiers concernes:

- `components/forms/QuickLeadForm.tsx`
- nouveau `components/media/LazyBackgroundVideo.tsx`
- `public/vid`
- `public/img/optimized/cards`

Critere de validation:

- aucune requete `CSM1` avant que la section ne soit proche du viewport;
- formulaire lisible sans video;
- scroll fluide sur mobile.

## Phase 6 - Logo ultra leger

But: corriger un cout disproportionne sur toutes les pages.

Probleme actuel:

- `logo_sanaaservices_hd.png`: 1,34 Mo;
- precharge dans le header a cause de `priority`;
- present header + footer.

Actions:

1. Rogner le logo source pour supprimer l'espace inutile autour du visuel.
2. Exporter:
   - WebP transparent si possible;
   - PNG optimise si transparence fine necessaire;
   - SVG uniquement si le logo s'y prete proprement.
3. Viser moins de 100 Ko.
4. Garder `priority` uniquement si le fichier est devenu leger.
5. Definir des dimensions explicites si possible pour limiter les calculs `fill`.

Fichiers concernes:

- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `public/img/logo_sanaaservices_hd.png`
- eventuellement `public/img/optimized/logo/*`

Critere de validation:

- logo net;
- topbar meme hauteur;
- pas de prechargement d'un fichier lourd.

## Phase 7 - Optimisation des cartes services

But: conserver le style premium tout en reduisant les requetes visibles sur la home.

Actions:

1. Utiliser des images optimisees et variantes mobile/desktop.
2. Garder `sizes`, mais ne pas compter dessus seul en GitHub Pages.
3. Desactiver le prefetch Next sur les cartes si le reseau est trop sollicite:
   - `prefetch={false}` sur les `Link` des cartes services;
   - garder le prefetch topbar possible si utile.
4. Garder les dimensions fixes des cartes pour eviter les shifts.
5. Revoir les ombres/blur sur mobile si le scroll reste moins fluide.

Fichiers concernes:

- `components/marketing/ServiceCard.tsx`
- `components/marketing/ServiceGrid.tsx`
- `data/services.ts`

Critere de validation:

- cartes visibles rapidement;
- hover desktop conserve;
- animation d'apparition fluide;
- pas de chargement de routes secondaires en concurrence avec les medias critiques.

## Phase 8 - Reduction de l'hydratation non essentielle

But: garder uniquement le client-side necessaire.

Constat:

Composants client actuels:

- `ScrollToTopButton`
- `MobileMenu`
- `FAQAccordion`
- `ServiceGrid`
- `QuickLeadForm`
- `ServiceLeadForm`
- `UploadField`

Actions:

1. Garder `MobileMenu`, `ScrollToTopButton`, formulaires et FAQ en client: ils ont une vraie interactivite.
2. Revoir `ServiceGrid`:
   - actuellement client surtout pour l'animation d'apparition;
   - option: transformer l'animation en CSS plus simple;
   - option: garder un petit wrapper client qui ne force pas toute la logique service.
3. Envisager un lazy render du formulaire rapide sous le fold.
4. Eviter de transformer `app/page.tsx` en client component.

Fichiers concernes:

- `components/marketing/ServiceGrid.tsx`
- `components/forms/QuickLeadForm.tsx`
- eventuellement `components/lazy/*`

Critere de validation:

- pas d'augmentation JS;
- interactions toujours fonctionnelles;
- moins de travail React au chargement initial.

## Phase 9 - Optimisation UX mobile

But: rendre le site rapide, lisible et fluide sur smartphone.

Actions:

1. Sur mobile, preferer:
   - poster hero leger;
   - video hero mobile ou video desactivee selon contexte;
   - images de cartes max 700-900 px;
   - ombres/blur moins couteux.
2. Verifier:
   - topbar transparente sans masquer le contenu;
   - menu mobile lisible;
   - CTA sticky sans chevauchement;
   - scroll-to-top accessible;
   - footer non trop lourd.
3. Ajouter des classes responsives pour reduire les effets lourds si besoin:
   - `backdrop-blur`;
   - gros `box-shadow`;
   - `filter/drop-shadow`;
   - grandes surfaces avec video.

Fichiers concernes:

- `app/globals.css`
- `components/layout/Header.tsx`
- `components/layout/MobileMenu.tsx`
- `components/layout/StickyMobileCTA.tsx`
- `components/layout/Footer.tsx`
- `components/marketing/ServiceCard.tsx`

Critere de validation:

- scroll mobile fluide;
- texte toujours lisible;
- pas de chevauchement;
- premier rendu visuel rapide.

## Phase 10 - Verification technique et budgets CI

But: eviter que le site redevienne lourd apres optimisation.

Actions:

1. Ajouter budgets dans un script:
   - image max: 250 Ko;
   - logo max: 100 Ko;
   - video hero desktop max: 2 Mo;
   - video mobile max: 1 Mo;
   - `out/` max: 12 Mo.
2. Ajouter une commande:
   - `npm run perf:budget`
3. Ajouter cette commande au workflow GitHub Actions avant deploy.
4. Ajouter une verification Lighthouse locale optionnelle:
   - build GitHub Pages;
   - serveur statique local;
   - test mobile.

Fichiers concernes:

- `package.json`
- `scripts/performance-budget.mjs`
- `.github/workflows/deploy.yml`

Critere de validation:

- le deploiement echoue si un asset depasse un budget critique;
- le rapport de build reste lisible.

## Ordre d'execution recommande

### Lot 1 - Gains rapides et risque faible

1. Supprimer ou sortir de `public` les assets non utilises.
2. Optimiser le logo.
3. Optimiser le poster hero.
4. Ajouter script de mesure assets.

Gain attendu:

- reduction rapide de 10-15 Mo;
- amelioration immediate du header et du premier rendu.

### Lot 2 - Images de cartes

1. Generer images optimisees AVIF/WebP.
2. Remplacer les chemins des services.
3. Remplacer les backgrounds CSS par images lazy.
4. Verifier home et pages services.

Gain attendu:

- forte reduction de poids image;
- meilleur scroll mobile.

### Lot 3 - Videos

1. Compresser video hero en variantes.
2. Implementer `HeroVideo`.
3. Lazy loader ou remplacer video formulaire.
4. Respecter reduced motion et save-data.

Gain attendu:

- baisse massive du cout initial;
- UX mobile bien plus stable.

### Lot 4 - Hydratation et prefetch

1. Revoir `ServiceGrid`.
2. Ajouter `prefetch={false}` aux cartes si mesure utile.
3. Lazy render formulaire si necessaire.

Gain attendu:

- moins de travail JS;
- moins de concurrence reseau.

### Lot 5 - CI et validation finale

1. Ajouter budgets performance dans GitHub Actions.
2. Relancer build/export.
3. Tester site GitHub Pages apres push.
4. Comparer avant/apres dans un rapport final.

## Definition de "ultra optimise" pour ce projet

Le site sera considere ultra optimise quand:

- la home affiche le hero immediatement avec poster leger;
- aucune video lourde ne bloque le premier chargement;
- les images sont adaptees a leur taille d'affichage;
- le logo ne pese plus plus d'1 Mo;
- le mobile ne telecharge pas des images desktop geantes;
- le scroll reste fluide malgre les effets premium;
- le build GitHub Pages contient des budgets anti-regression;
- l'esthetique actuelle est conservee.

## Risques a surveiller

| Risque | Prevention |
| --- | --- |
| Perte de qualite visuelle apres compression | Comparer captures desktop/mobile avant/apres. |
| Logo flou | Garder une variante suffisamment grande et bien rognee. |
| Hero moins premium sans video immediate | Poster hero de haute qualite + video chargee apres rendu. |
| Backgrounds moins bien cadres | Utiliser `object-position` par image. |
| Trop de variantes media difficiles a maintenir | Centraliser les chemins dans `data/services.ts` ou un fichier media dedie. |
| CI trop stricte | Prevoir budgets realistes et exceptions explicites. |

## Sortie attendue apres implementation

Fichiers probablement ajoutes:

- `components/media/HeroVideo.tsx`
- `components/media/ResponsivePicture.tsx`
- `components/media/LazyBackgroundVideo.tsx`
- `scripts/audit-assets.mjs`
- `scripts/performance-budget.mjs`
- `performance-budget.json`

Fichiers probablement modifies:

- `app/page.tsx`
- `components/forms/QuickLeadForm.tsx`
- `components/marketing/ServiceCard.tsx`
- `components/marketing/ContactStrip.tsx`
- `components/layout/Header.tsx`
- `components/layout/Footer.tsx`
- `data/services.ts`
- `package.json`
- `.github/workflows/deploy.yml`

Medias probablement remplaces ou deplaces:

- `public/img/*`
- `public/vid/*`

## Validation finale

Commandes a executer apres implementation:

```bash
npm run lint
npm run build
npm run audit:assets
npm run perf:budget
```

Verification manuelle:

- home desktop;
- home mobile;
- page `/services`;
- une page service detail;
- formulaire rapide;
- footer avec Google Maps;
- GitHub Pages apres deploy.

Mesures a reporter:

- poids `out/` avant/apres;
- poids `public/img` avant/apres;
- poids `public/vid` avant/apres;
- taille des 10 plus gros assets;
- comportement mobile observe.
