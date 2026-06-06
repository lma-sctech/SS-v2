# Audit performance et UX - Analyse et diagnostic

Date: 2026-06-06  
Projet: Sanaa Services  
Perimetre: code front, assets publics, export statique GitHub Pages, structure de chargement de la home et des pages principales.

Ce document contient uniquement l'analyse et le diagnostic. Le plan d'action sera construit dans une etape separee.

## Resume diagnostic

Le ralentissement ressenti vient principalement des medias, pas du code applicatif.

Le dossier `out/` genere pour GitHub Pages pese environ 52,44 Mo. Sur ce total, les medias `img` et `vid` representent environ 49,74 Mo. Autrement dit, pres de 95 % du poids de deploiement vient des images et videos.

La home charge ou reference une video hero, une video de formulaire, un logo PNG precharge, plusieurs images de services et plusieurs images de fond. Sur GitHub Pages, `next/image` ne peut pas utiliser l'optimiseur serveur de Next.js, donc les images originales sont servies telles quelles.

Le diagnostic principal est donc:

- les images sont beaucoup trop grandes pour leur usage reel dans l'interface;
- les videos sont trop lourdes et deux videos autoplay existent sur la home;
- le logo est precharge alors qu'il pese 1,34 Mo;
- les images de fond CSS ne beneficient pas du lazy loading natif de `next/image`;
- l'hydratation React existe, mais elle est secondaire par rapport au poids media.

## Donnees mesurees

### Poids global de l'export

| Element | Poids |
| --- | ---: |
| `out/` complet | 52,44 Mo |
| `out/img` + `out/vid` | 49,74 Mo |
| `_next/static` | 0,91 Mo |
| `out/index.html` | 97,4 Ko |
| HTML live GitHub Pages | 99 697 octets |

Lecture: le HTML et les bundles Next ne sont pas anormalement lourds. Le poids critique vient presque entierement des medias.

### Videos

| Fichier | Poids | Usage actuel | Diagnostic |
| --- | ---: | --- | --- |
| `public/vid/hero-vid1.mp4` | 6,69 Mo | Hero home, autoplay | Tres impactant car au-dessus de la ligne de flottaison. |
| `public/vid/CSM1.mp4` | 7,72 Mo | Formulaire rapide, autoplay | Impact fort: video plus bas dans la page mais presente dans le DOM. |
| `public/vid/CSM2.mp4` | 9,01 Mo | Non reference dans le code | Poids de deploiement inutile pour l'instant. |

Les deux videos utilisees sur la home totalisent deja 14,41 Mo. Sur mobile, elles peuvent aussi augmenter la consommation CPU, batterie et memoire.

### Images les plus lourdes

| Fichier | Dimensions | Poids | Usage actuel | Diagnostic |
| --- | ---: | ---: | --- | --- |
| `where_to_start2.jpg` | 6720 x 4480 | 3,21 Mo | Carte "Not sure where to start?" | Beaucoup trop grand pour une carte. |
| `travel_usa03.jpg` | 6000 x 4000 | 3,20 Mo | Poster de la video hero | Tres lourd pour une image de poster hero. |
| `legal_consultancy2.jpg` | 6621 x 4414 | 3,17 Mo | Service + CTA background | Reutilisee, mais non optimisee. |
| `Notary1.jpg` | 6016 x 4016 | 2,53 Mo | Carte service | Trop grand pour carte responsive. |
| `pexels-rdne-7841473.jpg` | 6608 x 4405 | 2,37 Mo | Non reference | Poids de deploiement inutile pour l'instant. |
| `welcom_usa.jpg` | 3024 x 4032 | 2,27 Mo | Carte service visa/immigration | Trop lourd pour carte. |
| `family_insurance2.jpg` | 3840 x 5760 | 2,09 Mo | Carte service insurance | Trop lourd pour carte. |
| `logo_sanaaservices_hd.png` | 1024 x 1024 | 1,34 Mo | Header + footer | Probleme important car precharge dans le header. |

Le probleme n'est pas uniquement le poids, mais le rapport entre dimensions reelles et dimensions affichees. Plusieurs images de 6000px sont utilisees dans des cartes qui s'affichent souvent entre 300px et 800px.

## Analyse du chargement de la home

### Hero

Fichiers concernes:

- `app/page.tsx`: video hero avec `autoPlay`, `loop`, `preload="metadata"`.
- `app/page.tsx`: poster `travel_usa03.jpg`.
- `public/vid/hero-vid1.mp4`: 6,69 Mo.
- `public/img/travel_usa03.jpg`: 3,20 Mo.

Diagnostic:

Le hero est visuellement premium, mais il impose un cout initial eleve. Meme avec `preload="metadata"`, une video autoplay finit par declencher le telechargement de donnees video. Comme elle est dans le premier viewport, elle peut entrer en concurrence avec le HTML, le CSS, le JS, la police, le logo et le poster.

Impact UX probable:

- chargement initial percu comme lent;
- retard d'apparition fluide du hero;
- experience mobile degradee sur reseau moyen;
- consommation CPU accrue pendant la lecture.

### Header et logo

Fichier concerne:

- `components/layout/Header.tsx`

Diagnostic:

Le logo est rendu via `next/image` avec `priority`. Dans l'HTML genere, il est precharge:

- `/SS/img/logo_sanaaservices_hd.png`
- poids: 1,34 Mo

Comme le header est commun a toutes les pages, ce poids touche tout le site. Le logo est un PNG carre 1024 x 1024 alors que son usage reel dans la topbar est beaucoup plus petit. C'est un cout initial disproportionne.

### Services

Fichiers concernes:

- `components/marketing/ServiceGrid.tsx`
- `components/marketing/ServiceCard.tsx`
- `data/services.ts`

Diagnostic:

Les cartes services utilisent `next/image`, mais en mode GitHub Pages la config active `images.unoptimized`. Dans ce contexte, `sizes` aide peu ou pas, car le navigateur recoit les images originales au lieu de variantes redimensionnees par Next.

La grille services contient plusieurs images lourdes:

- `Notary1.jpg`: 2,53 Mo
- `legal_consultancy2.jpg`: 3,17 Mo
- `family_insurance2.jpg`: 2,09 Mo
- `welcom_usa.jpg`: 2,27 Mo
- `drive_lesson.jpg`: 1,48 Mo

Impact UX probable:

- apparition tardive des cartes;
- scroll moins fluide pendant le decode des images;
- experience mobile penalisee, surtout si plusieurs images entrent rapidement dans le viewport.

### Section "Before you reach out"

Fichier concerne:

- `app/page.tsx`, cartes `prepareLinks`

Diagnostic:

Les images sont appliquees via `backgroundImage` inline. Les background images CSS ne profitent pas du lazy loading natif comme une balise `img`. La carte `where_to_start2.jpg` pese 3,21 Mo.

Impact UX probable:

- telechargements images declenches plus tot que necessaire;
- decode image couteux;
- section visuellement riche mais chere en bande passante.

### Formulaire rapide

Fichier concerne:

- `components/forms/QuickLeadForm.tsx`

Diagnostic:

Le formulaire rapide contient une video background:

- `CSM1.mp4`: 7,72 Mo
- `autoPlay`
- `loop`
- `preload="metadata"`

Cette video est sous le hero, mais elle existe deja dans le HTML de la home. Selon le navigateur, l'autoplay et la detection de visibilite peuvent provoquer un chargement plus tot que souhaite.

Impact UX probable:

- concurrence reseau avec le hero et les images;
- perte de fluidite en scroll;
- cout CPU inutile tant que l'utilisateur n'est pas proche du formulaire.

### Footer et Google Maps

Fichier concerne:

- `components/layout/Footer.tsx`

Diagnostic:

Le footer contient une iframe Google Maps avec `loading="lazy"`. C'est correct. Ce bloc n'est pas le probleme principal du chargement initial.

Point a surveiller:

- le footer reutilise le logo PNG de 1,34 Mo, mais l'image footer n'est pas aussi critique que le logo du header precharge.

## Analyse de l'hydratation et du JavaScript

Composants client detectes:

- `components/layout/ScrollToTopButton.tsx`
- `components/layout/MobileMenu.tsx`
- `components/marketing/FAQAccordion.tsx`
- `components/marketing/ServiceGrid.tsx`
- `components/forms/QuickLeadForm.tsx`
- `components/forms/ServiceLeadForm.tsx`
- `components/forms/UploadField.tsx`

Diagnostic:

Le JavaScript n'est pas le principal facteur de lenteur. Les chunks les plus lourds restent modestes par rapport aux medias:

- plus gros chunk JS: environ 222 Ko;
- CSS principal: environ 30 Ko;
- `_next/static`: environ 0,91 Mo.

Point a noter:

`ServiceGrid.tsx` est un composant client uniquement pour gerer l'animation d'apparition via `IntersectionObserver`. Comme il importe `ServiceCard`, toute la grille services devient une zone client/hydratee. Ce n'est pas catastrophique, mais c'est un cout UX/JS qui pourrait etre reduit plus tard.

## Analyse GitHub Pages

Fichier concerne:

- `next.config.mjs`

Configuration actuelle:

- `output: "export"` en mode GitHub Pages;
- `basePath: "/SS"`;
- `assetPrefix: "/SS/"`;
- `trailingSlash: true`;
- `images.unoptimized: true` en mode GitHub Pages.

Diagnostic:

Cette configuration est correcte pour publier sur GitHub Pages. Le revers logique est que Next ne peut pas utiliser son optimiseur d'images serveur. Les images doivent donc etre optimisees avant d'etre placees dans `public/img`, sinon elles sont servies en taille originale.

Conclusion: GitHub Pages n'est pas le probleme en soi. Le site doit simplement etre traite comme un site statique: medias compresses, formats modernes, dimensions adaptees, chargement differencie mobile/desktop.

## Assets non utilises ou suspects

Assets detectes comme non references directement par le code actuel:

- `public/vid/CSM2.mp4` - 9,01 Mo
- `public/img/pexels-rdne-7841473.jpg` - 2,37 Mo
- `public/img/pexels-karola-g-7681068.jpg` - 1,40 Mo
- `public/img/apointment2.jpg` - 0,36 Mo
- `public/img/where_to_start.jpg` - 0,60 Mo

Diagnostic:

Ils ne semblent pas impacter le chargement initial de la home s'ils ne sont pas references. En revanche, ils augmentent inutilement le poids du deploiement GitHub Pages et brouillent la maintenance du dossier `public`.

## Diagnostic UX

### Perception de lenteur

Le site donne une impression de lenteur parce que les elements les plus visibles sont aussi les plus lourds:

- hero video;
- poster hero;
- logo precharge;
- cartes services imagees;
- animations visuelles qui dependent d'un rendu fluide.

Quand les medias arrivent lentement, l'UX premium se retourne contre le site: au lieu de paraitre riche, elle parait lourde.

### Mobile

Le mobile est le contexte le plus expose:

- ecran plus petit, mais images desktop servies quand meme;
- reseau souvent plus lent;
- decode image/video plus couteux;
- autoplay video plus sensible en batterie et CPU;
- scroll potentiellement moins fluide avec videos + grands backgrounds + shadows/blur.

### Navigation

Les liens Next peuvent precharger certaines routes quand elles deviennent visibles. Ce comportement est utile sur un site leger, mais peut ajouter du bruit reseau sur une page qui a deja beaucoup de medias. Ce n'est pas la cause principale, mais c'est un facteur secondaire a surveiller.

## Ce qui n'est pas critique

Les elements suivants ne semblent pas etre les principales causes du probleme:

- HTML de la home: environ 100 Ko, acceptable.
- CSS principal: environ 30 Ko, acceptable.
- JS Next: raisonnable par rapport aux medias.
- Google Maps: charge en lazy dans le footer.
- Sitemap/robots/export GitHub Pages: structure correcte.

## Diagnostic final

Le site est fonctionnel et la structure Next/GitHub Pages est saine. Le probleme principal est une strategie media non adaptee a un site statique.

Priorite diagnostique:

1. Poids media excessif, surtout images originales et videos.
2. Video hero autoplay au-dessus de la ligne de flottaison.
3. Video de formulaire autoplay dans la home.
4. Logo PNG trop lourd et precharge sur toutes les pages.
5. Images de cartes trop grandes et non optimisees par GitHub Pages.
6. Background images non lazy.
7. Hydratation client de certaines sections, secondaire mais ameliorable.

La prochaine etape doit etre un plan d'action centre sur la reduction du poids initial, la strategie mobile, le lazy loading intelligent et le remplacement/optimisation des medias.
