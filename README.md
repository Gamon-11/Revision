# Révisions

Site statique de révision (HTML, CSS, JS, aucune compilation). Vercel le déploie tel quel.

## Déployer sur Vercel

1. Pousser ce dossier sur GitHub.
2. Sur vercel.com : *Add New → Project*, choisir le dépôt.
3. Framework preset : **Other**. Laisser *Build Command* et *Output Directory* vides.
4. Deploy. Chaque `git push` redéploie le site.

## Voir le site en local

Les fiches sont chargées avec `fetch`, donc il faut un petit serveur (ouvrir `index.html` directement ne suffit pas) :

```bash
npx serve .
# ou
python3 -m http.server 8000
```

## Organisation

```
index.html                  accueil : choix de l'UV
fiche.html                  lecteur de fiches Markdown (tableaux, formules LaTeX)
assets/data.js              TOUT le contenu (UV, sections, ressources)
assets/app.js, site.css     rendu et style communs
ai09/index.html             page de l'UV : rappel de ce qu'il faut réviser + sections
ai09/metaheuristique/       section Métaheuristique
  index.html                page de la section (générée depuis data.js)
  ateliers/*.html           ateliers interactifs autonomes
  fiches/*.md               fiches et corrigés en Markdown
```

## Ajouter une ressource

- **Atelier** : déposer le `.html` dans `ai09/<section>/ateliers/`, puis ajouter dans `assets/data.js`
  `{ type: "atelier", titre: "…", resume: "…", href: "/ai09/<section>/ateliers/mon-atelier.html", tags: ["…"] }`.
- **Fiche ou corrigé** : déposer le `.md` dans `ai09/<section>/fiches/`, puis ajouter
  `{ type: "fiche", titre: "…", resume: "…", src: "/ai09/<section>/fiches/ma-fiche.md" }`
  (`type: "corrige"` pour un corrigé). Les blocs ```` ```latex ```` sont rendus en formules.

## Ajouter une section (ex. PPC, PLNE)

1. Dans `assets/data.js`, copier le bloc de la section `metaheuristique` dans `sections`, changer `id`, `titre`, `resume`, `groupes`.
2. Copier le dossier : `cp ai09/metaheuristique/index.html ai09/<id>/index.html`, puis dans ce fichier
   remplacer `data-section="metaheuristique"` par `data-section="<id>"` (et le `<title>`).

## Ajouter une UV

1. Ajouter un objet dans `uvs` de `assets/data.js` (`id`, `code`, `nom`, `resume`, `couleur`, `sections`).
2. Créer `<id>/index.html` en copiant `ai09/index.html` : changer `data-uv="ai09"` et remplacer le bloc de rappel
   (format de l'épreuve, priorités, antisèche) par celui de la nouvelle UV.
