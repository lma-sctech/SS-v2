# Tests visiteur preprod

Objectif: verifier le parcours d'un visiteur reel avant mise en production.

## Pre-requis

- Frontend preprod accessible dans le navigateur.
- Backend Node.js lance sur l'hebergement preprod.
- Variable frontend configuree:
  - `NEXT_PUBLIC_CONTACT_API_URL=https://.../api/contact`
- Variables backend configurees:
  - `FRONTEND_URL=https://...`
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_SECURE`
  - `SMTP_USER`
  - `SMTP_PASS`
  - `MAIL_FROM`
  - `MAIL_TO`
  - `CONTACT_RATE_LIMIT_MAX=10`
- Boite mail de reception accessible.
- WhatsApp installe ou WhatsApp Web accessible.

## Test 1 - Envoi minimal avec telephone

1. Ouvrir la page contenant le formulaire `Travel request`.
2. Renseigner:
   - Full name
   - Phone number
   - Preferred contact method
   - Travel purpose
   - Message
3. Laisser Email vide.
4. Ne pas ouvrir les details optionnels.
5. Cliquer sur `Send Travel Request`.

Resultat attendu:

- Le bouton passe en loading.
- Une modale de confirmation apparait.
- Un Request ID est visible, exemple `SS-20260611-A7K4`.
- Un email arrive dans la boite `MAIL_TO`.
- Le meme Request ID apparait dans le sujet et le corps du mail.

## Test 2 - Envoi minimal avec email seulement

1. Renseigner:
   - Full name
   - Email address
   - Preferred contact method
   - Travel purpose
   - Message
2. Laisser Phone number vide.
3. Envoyer.

Resultat attendu:

- La demande est acceptee.
- La modale apparait avec un Request ID.
- L'email recu contient l'adresse email du visiteur.

## Test 3 - Telephone et email absents

1. Renseigner Full name, Preferred contact method, Travel purpose et Message.
2. Laisser Phone number et Email address vides.
3. Envoyer.

Resultat attendu:

- Le formulaire refuse l'envoi.
- Message visible: demander un telephone ou une adresse email.
- Aucun email n'est envoye.

## Test 4 - Champs obligatoires manquants

Tester un envoi sans:

- Full name
- Preferred contact method
- Travel purpose
- Message

Resultat attendu:

- Le navigateur ou le formulaire bloque l'envoi.
- Aucun email n'est envoye.
- L'utilisateur comprend quoi completer.

## Test 5 - Details optionnels

1. Ouvrir `Add travel details`.
2. Renseigner:
   - Departure city
   - Destination city
   - Travel dates
   - Number of travelers
   - Need flight?
   - Need hotel?
   - Need insurance?
   - Need documents / visa support?
   - Budget range
3. Envoyer.

Resultat attendu:

- La demande est envoyee.
- Tous les details optionnels remplis apparaissent dans l'email.
- Le Request ID est present.

## Test 6 - WhatsApp optionnel

1. Envoyer une demande valide.
2. Dans la modale, cliquer sur `Send on WhatsApp`.

Resultat attendu:

- WhatsApp ou WhatsApp Web s'ouvre.
- Le message est prerempli.
- Le Request ID est identique a celui de la modale et de l'email.
- Le visiteur reste libre de fermer la modale sans utiliser WhatsApp.

## Test 7 - Fermeture de la modale

Apres un envoi valide, tester:

- bouton `Close`
- clic sur le fond sombre
- touche `Escape`

Resultat attendu:

- La modale se ferme proprement.
- Le site reste utilisable.

## Test 8 - Formulaire service

1. Ouvrir une page service.
2. Renseigner les champs essentiels.
3. Envoyer sans ouvrir `Add service details`.

Resultat attendu:

- La demande est acceptee.
- Le mail indique le service concerne.
- La modale affiche le Request ID.
- WhatsApp optionnel reprend le meme Request ID.

## Test 9 - Details optionnels service

1. Ouvrir `Add service details`.
2. Renseigner quelques champs optionnels.
3. Envoyer.

Resultat attendu:

- Les details renseignes apparaissent dans l'email.
- Les champs non renseignes ne polluent pas l'email.

## Test 10 - Rate limit

1. Depuis le meme navigateur ou la meme IP, envoyer 10 demandes valides ou presque valides.
2. Tenter une 11e demande dans la meme fenetre de temps.

Resultat attendu:

- Les 10 premieres demandes sont acceptees si elles sont valides.
- La 11e retourne un message d'erreur de limite.
- Le backend retourne une reponse JSON claire.

## Test 11 - Mobile

Tester sur largeur mobile:

- formulaire visible sans impression d'interrogatoire
- champs essentiels lisibles
- details optionnels fermes par defaut
- modale bien centree
- boutons non pleins ecran inutilement
- pas de debordement horizontal

## Test 12 - Erreur backend ou SMTP

Couper temporairement le backend ou utiliser une URL API invalide.

Resultat attendu:

- Le formulaire affiche une erreur claire.
- Le site ne plante pas.
- Aucun WhatsApp ne s'ouvre automatiquement.

## Validation finale

- Un visiteur peut envoyer une demande en moins d'une minute.
- L'agence recoit un email complet.
- Le Request ID est commun entre email, modale et WhatsApp.
- WhatsApp reste optionnel et non intrusif.
- Le formulaire ne demande que l'essentiel au depart.
