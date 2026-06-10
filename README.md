# Le Petit Moka — Site de démonstration pédagogique

Site vitrine fictif d'un café parisien, en **HTML / CSS / JavaScript pur** (aucune dépendance, aucun build). Conçu comme support d'exercices pour un étudiant.

## Lancer le site

Ouvrir `index.html` directement dans un navigateur, ou servir le dossier :

```
npx serve .
```

## Structure

```
site-demo/
├── index.html        # Accueil : héro, points forts, compteurs animés, témoignages
├── menu.html         # La carte : grille de produits + filtres par catégorie (JS)
├── apropos.html      # Histoire, engagements, équipe
├── contact.html      # Coordonnées + formulaire avec validation JS
├── css/
│   └── style.css     # Feuille de style unique, commentée, organisée en sections
└── js/
    └── script.js     # Burger mobile, compteurs, filtres, validation formulaire
```

## Concepts couverts

| Domaine | Concepts |
|---|---|
| HTML | structure sémantique (`header`, `nav`, `section`, `article`, `footer`), formulaires, attributs `data-*`, accessibilité de base (`aria-expanded`, `label for`) |
| CSS | variables CSS (`:root`), Flexbox, Grid, `position: sticky`, transitions, pseudo-classes, media queries (menu burger responsive) |
| JavaScript | sélection du DOM, événements (`click`, `input`, `blur`, `submit`), `classList`, validation de formulaire avec regex, `IntersectionObserver`, `requestAnimationFrame` |

## Idées d'exercices (du plus simple au plus difficile)

1. **Lecture de code** — Retrouver où est défini la couleur principale du site et la changer pour un thème « thé vert ».
2. **HTML** — Ajouter une 5ᵉ personne dans l'équipe sur `apropos.html`, et 2 nouveaux produits sur `menu.html` (attention au `data-category`).
3. **CSS** — Le prix des produits déborde sur les petits écrans : ajouter une media query pour le replacer sous le titre.
4. **CSS** — Créer un mode sombre activé par une classe `dark` sur `<body>` (les variables CSS rendent ça facile).
5. **JS — bug à corriger (à introduire volontairement)** — Casser une règle de validation ou un sélecteur et demander de déboguer avec les DevTools.
6. **JS** — Ajouter un champ de recherche sur la page carte qui filtre les produits par nom au fil de la frappe.
7. **JS** — Sauvegarder le brouillon du formulaire de contact dans `localStorage` et le restaurer au rechargement.
8. **Projet** — Ajouter une page « Réservation » complète : formulaire date/heure/nombre de personnes, avec validation (pas de réservation dans le passé, max 8 personnes).

---
*Site fictif à but pédagogique — toute ressemblance avec un vrai café serait fortuite (mais gourmande).*
