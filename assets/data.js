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
          resume: "Tournées : TSP, VRP, postier chinois. Méthodes exactes (Little), heuristiques (PPV, Christofides, Beasley, Gillett-Miller, Fletcher) et le projet TOP.",
          groupes: [
            {
              titre: "Vue d'ensemble",
              items: [
                { type: "fiche", titre: "Cartographie des annales", resume: "Ce qui tombe dans la copie 3, annale par annale, et l'ordre de révision.", src: "/ai09/metaheuristique/fiches/cartographie-annales.md", tags: ["annales", "priorités"] }
              ]
            },
            {
              titre: "TSP : méthode exacte et approchée",
              items: [
                { type: "atelier", titre: "Little (PSE)", resume: "Réduction de matrice, regrets, arborescence avec/sans arc, coupes. TD PSE, A11, A14/A15.", href: "/ai09/metaheuristique/ateliers/little.html", tags: ["TSP", "exact"] },
                { type: "atelier", titre: "Christofides", resume: "ACM, sommets impairs, couplage minimal, cycle eulérien, raccourcis. A14/A15.", href: "/ai09/metaheuristique/ateliers/christofides.html", tags: ["TSP", "ratio 3/2"] },
                { type: "fiche", titre: "Little, Christofides, Beasley", resume: "La matrice 6×6 d'A14/A15 traitée de bout en bout, bornes inférieures, Dijkstra.", src: "/ai09/metaheuristique/fiches/little-christofides-beasley.md", tags: ["TSP", "VRP"] },
                { type: "fiche", titre: "Beasley et Christofides", resume: "Méthode, deux exemples complets (A15, A07), preuve du ratio 3/2 (A12) et pièges.", src: "/ai09/metaheuristique/fiches/beasley-christofides.md", tags: ["TSP", "VRP", "preuve"] }
              ]
            },
            {
              titre: "VRP : tournées de véhicules",
              items: [
                { type: "atelier", titre: "Beasley (route first, cluster second)", resume: "Découpage optimal d'un tour géant par plus court chemin. A07, A12, A14, A15.", href: "/ai09/metaheuristique/ateliers/beasley.html", tags: ["VRP"] },
                { type: "atelier", titre: "VRP minoterie", resume: "PPV tournée par tournée puis Gillett-Miller + Shamos. A08, A16, A21.", href: "/ai09/metaheuristique/ateliers/vrp-minoterie.html", tags: ["VRP", "Shamos"] },
                { type: "atelier", titre: "Gillett-Miller + Fletcher", resume: "Grille Q = 8 : balayage, Fletcher arête par arête, effet de l'axe et des ex æquo.", href: "/ai09/metaheuristique/ateliers/gillett-miller-fletcher.html", tags: ["VRP", "Fletcher"] },
                { type: "fiche", titre: "VRP heuristique", resume: "PPV, Gillett-Miller, Shamos, Fletcher, Clarke & Wright, corrigé minoterie.", src: "/ai09/metaheuristique/fiches/vrp-heuristique.md", tags: ["VRP"] },
                { type: "corrige", titre: "Grille Q = 8 (A06, A18, A23)", resume: "Corrigé complet : deux axes de balayage, Fletcher, constat et deux améliorations.", src: "/ai09/metaheuristique/fiches/corrige-gillett-miller-fletcher.md", tags: ["VRP", "annale"] }
              ]
            },
            {
              titre: "Postier chinois",
              items: [
                { type: "atelier", titre: "Postier chinois", resume: "Degrés, sommets impairs, appariements, cycle eulérien. Réseau A–K, quartiers Q, Q', Q''.", href: "/ai09/metaheuristique/ateliers/postier-chinois.html", tags: ["graphes eulériens"] },
                { type: "fiche", titre: "Postier chinois", resume: "Théorème d'Euler, méthode en 4 étapes, corrigés A15/A18/A25 et A13/A16.", src: "/ai09/metaheuristique/fiches/postier-chinois.md", tags: ["graphes eulériens"] }
              ]
            },
            {
              titre: "Projet TOP",
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
