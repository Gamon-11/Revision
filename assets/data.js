/*
 * Contenu du site : c'est le SEUL fichier à modifier pour ajouter une UV,
 * une section ou une ressource. Voir README.md pour la marche à suivre.
 *
 * Types de ressources :
 *   atelier : page HTML interactive (lien direct vers le fichier .html)
 *   fiche   : fichier Markdown affiché par /fiche.html (tableaux, formules LaTeX)
 *   corrige : comme une fiche, mais rangé sous « Corrigé »
 */
window.SITE = {
  titre: "Révisions",
  sousTitre: "Fiches, ateliers interactifs et corrigés pour préparer les finaux UTC.",

  uvs: [
    {
      id: "ai09",
      code: "AI09",
      nom: "Recherche opérationnelle",
      examen: "Final RO06-AI09",
      resume: "PPC en GNU-Prolog, modélisation PLNE, TSP / VRP et heuristiques de tournées.",
      couleur: "#1f5fd1",

      sections: [
        {
          id: "metaheuristique",
          titre: "Métaheuristique",
          resume: "Tournées : théorie du TSP, Little, Beasley et Christofides, VRP (PPV, Gillett-Miller, Shamos, Fletcher), postier chinois et projet TOP. Rangé par familles d'exercices.",
          groupes: [
            {
              titre: "Vue d'ensemble",
              resume: "Commence ici : ce qui tombe en copie 3 et dans quel ordre réviser.",
              items: [
                { type: "fiche", titre: "Cartographie des annales", resume: "Ce qui tombe dans la copie 3, annale par annale, et l'ordre de révision.", src: "/ai09/metaheuristique/fiches/cartographie-annales.md", tags: ["annales", "priorités"] }
              ]
            },
            {
              titre: "1 · Théorie du TSP : cycles, bornes, ratios, 2-opt",
              resume: "Les questions de cours : hamiltonien ou eulérien, prouver qu'un cycle est optimal, ratios du PPV, de Christofides et du 2-opt.",
              items: [
                { type: "atelier", titre: "Hamiltonien, eulérien + A11 Ex IV", resume: "La différence entre les deux, puis arbre couvrant minimum vs cycle hamiltonien et ratio du PPV (A11).", href: "/ai09/metaheuristique/ateliers/hamiltonien-eulerien.html", tags: ["A11", "bases"] },
                { type: "atelier", titre: "A21 Ex IV : optimalité, PPV + 2-opt", resume: "Cycle de 21, preuve que 19 est optimal sans méthode exacte, pourquoi PPV + 2-opt reste bloqué à 21.", href: "/ai09/metaheuristique/ateliers/a21-tsp-optimalite.html", tags: ["A21", "borne", "2-opt"] },
                { type: "atelier", titre: "Ratios et garanties", resume: "PPV et inégalité triangulaire, visites multiples, 2-opt et croisements (P18 = A05 = A09), O(n!), Christofides 3/2 et 2-opt (A12).", href: "/ai09/metaheuristique/ateliers/ratios-tsp.html", tags: ["P18", "A12", "ratio"] }
              ]
            },
            {
              titre: "2 · TSP exact : Little",
              resume: "Procédure par séparation et évaluation sur une matrice 6×6 (A11, A12, A14, A15).",
              items: [
                { type: "atelier", titre: "Little (PSE)", resume: "Réduction de matrice, regrets, arborescence avec/sans arc, coupes. TD PSE, A11, A14/A15.", href: "/ai09/metaheuristique/ateliers/little.html", tags: ["TSP", "exact"] },
                { type: "fiche", titre: "Little, Christofides, Beasley", resume: "La matrice 6×6 d'A14/A15 traitée de bout en bout, bornes inférieures, Dijkstra.", src: "/ai09/metaheuristique/fiches/little-christofides-beasley.md", tags: ["TSP", "VRP"] }
              ]
            },
            {
              titre: "3 · Beasley et Christofides",
              resume: "Ils tombent ensemble sur la même matrice (A14 = A15) : Christofides pour le TSP, Beasley pour découper le tour en tournées.",
              items: [
                { type: "atelier", titre: "Christofides", resume: "ACM, sommets impairs, couplage minimal, cycle eulérien, raccourcis. A14/A15.", href: "/ai09/metaheuristique/ateliers/christofides.html", tags: ["TSP", "ratio 3/2"] },
                { type: "atelier", titre: "Beasley (route first, cluster second)", resume: "Découpage optimal d'un tour géant par plus court chemin. A07, A12, A14, A15.", href: "/ai09/metaheuristique/ateliers/beasley.html", tags: ["VRP"] },
                { type: "fiche", titre: "Beasley et Christofides", resume: "Méthode, deux exemples complets (A15, A07), preuve du ratio 3/2 (A12) et pièges.", src: "/ai09/metaheuristique/fiches/beasley-christofides.md", tags: ["TSP", "VRP", "preuve"] }
              ]
            },
            {
              titre: "4 · VRP : PPV, Gillett-Miller, Shamos, Fletcher",
              resume: "Construire les tournées puis résoudre un TSP par secteur. Tombé 6 fois (minoterie et grille Q = 8).",
              items: [
                { type: "atelier", titre: "VRP minoterie", resume: "PPV tournée par tournée puis Gillett-Miller + Shamos. A08, A16, A21.", href: "/ai09/metaheuristique/ateliers/vrp-minoterie.html", tags: ["PPV", "Shamos"] },
                { type: "atelier", titre: "Gillett-Miller + Fletcher", resume: "Grille Q = 8 : balayage, Fletcher arête par arête, effet de l'axe et des ex æquo.", href: "/ai09/metaheuristique/ateliers/gillett-miller-fletcher.html", tags: ["Fletcher"] },
                { type: "fiche", titre: "VRP heuristique", resume: "PPV, Gillett-Miller, Shamos, Fletcher, Clarke & Wright, corrigé minoterie.", src: "/ai09/metaheuristique/fiches/vrp-heuristique.md", tags: ["VRP"] },
                { type: "corrige", titre: "Grille Q = 8 (A06, A18, A23)", resume: "Corrigé complet : deux axes de balayage, Fletcher, constat et deux améliorations.", src: "/ai09/metaheuristique/fiches/corrige-gillett-miller-fletcher.md", tags: ["VRP", "annale"] }
              ]
            },
            {
              titre: "5 · Postier chinois",
              resume: "Graphes eulériens : sommets impairs, couplage minimal, cycle eulérien. Tombé 6 fois.",
              items: [
                { type: "atelier", titre: "Postier chinois", resume: "Degrés, sommets impairs, appariements, cycle eulérien. Réseau A–K, quartiers Q, Q', Q''.", href: "/ai09/metaheuristique/ateliers/postier-chinois.html", tags: ["graphes eulériens"] },
                { type: "fiche", titre: "Postier chinois", resume: "Théorème d'Euler, méthode en 4 étapes, corrigés A15/A18/A25 et A13/A16.", src: "/ai09/metaheuristique/fiches/postier-chinois.md", tags: ["graphes eulériens"] }
              ]
            },
            {
              titre: "6 · Projet TOP",
              resume: "Ton projet : utile pour la PLNE du TSP (A23, A25) et l'idée du tour géant découpé.",
              items: [
                { type: "atelier", titre: "TOP pas à pas", resume: "Tournées sélectives : insertion gloutonne par ratio profit / détour sous la limite L, comparée à l'optimum PLNE.", href: "/ai09/metaheuristique/ateliers/top-pas-a-pas.html", tags: ["projet", "insertion"] }
              ]
            }
          ]
        }
        /*
         * Prochaine section : copier le bloc ci-dessus, changer id / titre / resume,
         * puis créer le dossier /ai09/<id>/ avec une copie de /ai09/metaheuristique/index.html.
         */
      ]
    }
  ]
};
