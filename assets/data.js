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
          recherche: "Chercher (ex. Fletcher, A15, ratio)…",
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
                { type: "fiche", titre: "Définitions à connaître par cœur", resume: "Tout le vocabulaire des 17 annales avec la formulation attendue et où il tombe : hamiltonien, eulérien, inégalité triangulaire, ratio, 2-opt, ACM, couplage, TSP/VRP/TOP, PSE, MTZ. Note courte sur PPC, PLNE et ordonnancement.", src: "/ai09/metaheuristique/fiches/definitions.md", tags: ["cours", "par cœur"] },
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
        },
        {
          id: "ppc",
          titre: "PPC (GNU-Prolog)",
          resume: "Programmation par contraintes : les 11 exercices du TD avec l'énoncé d'abord, la correction ensuite. Tous les programmes sont testés en GNU-Prolog.",
          recherche: "Chercher (ex. reines, disjonction, fd_minimize)…",
          groupes: [
            {
              titre: "Vue d'ensemble",
              resume: "Commence ici : la syntaxe à savoir écrire de tête et la méthode variables, domaines, contraintes.",
              items: [
                { type: "fiche", titre: "Mémo GNU-Prolog et méthode CSP", resume: "fd_domain, contraintes arithmétiques et booléennes, comptage, fd_labeling et ses options, fd_minimize, pièges.", src: "/ai09/ppc/fiches/memo-gnu-prolog.md", tags: ["syntaxe", "méthode"] }
              ]
            },
            {
              titre: "1 · Modéliser : les reines",
              resume: "Le même problème avec deux modèles : comment choisir ses variables pour réduire l'espace de recherche.",
              items: [
                { type: "exercice", titre: "Ex 1 à 3 : les reines", resume: "CSP et programme du modèle 1 (Li, Ci), modèle 2 (une reine par colonne), puis n reines.", src: "/ai09/ppc/exercices/ex01-reines.md", tags: ["CSP", "toutesDiff", "récursion"] }
              ]
            },
            {
              titre: "2 · Compter et calculer",
              resume: "Contraintes de comptage, une équation arithmétique, puis l'optimisation avec fd_minimize.",
              items: [
                { type: "exercice", titre: "Ex 4 : car sequencing", resume: "8 voitures, 3 couleurs, des quotas : fd_atmost, fd_exactly.", src: "/ai09/ppc/exercices/ex04-car-sequencing.md", tags: ["comptage"] },
                { type: "exercice", titre: "Ex 5 : SEND + MORE = MONEY", resume: "Cryptarithme : toutesDiff et une seule égalité linéaire.", src: "/ai09/ppc/exercices/ex05-send-more.md", tags: ["arithmétique"] },
                { type: "exercice", titre: "Ex 6 : retour de monnaie", resume: "CSP avec paramètres, puis le moins de pièces possible avec fd_minimize.", src: "/ai09/ppc/exercices/ex06-monnaie.md", tags: ["optimisation"] }
              ]
            },
            {
              titre: "3 · Grilles et graphes",
              resume: "Une contrainte par frontière ou par ligne, colonne et bloc ; effet de la consistance et des heuristiques.",
              items: [
                { type: "exercice", titre: "Ex 7 : coloriage de carte", resume: "Lister les frontières, une contrainte ≠ par frontière, pourquoi 3 couleurs ne suffisent pas.", src: "/ai09/ppc/exercices/ex07-coloriage.md", tags: ["coloration", "clique"] },
                { type: "exercice", titre: "Ex 9 : carré magique", resume: "Ordre 3, consistance partielle #= ou totale #=#, heuristiques de fd_labeling mesurées.", src: "/ai09/ppc/exercices/ex09-carre-magique.md", tags: ["consistance", "heuristiques"] },
                { type: "exercice", titre: "Ex 10 : sudoku", resume: "27 toutesDiff : lignes, colonnes, blocs. Version liste de listes et version X11…X99.", src: "/ai09/ppc/exercices/ex10-sudoku.md", tags: ["toutesDiff"] }
              ]
            },
            {
              titre: "4 · Ordonnancement",
              resume: "Précédences, disjonctions réifiées et objectifs Cmax ou somme des fins. Tombé en A16.",
              items: [
                { type: "exercice", titre: "Ex 8 : construire sa maison", resume: "Précédences sans ressource, minimiser la date de fin, vérifier par le chemin critique.", src: "/ai09/ppc/exercices/ex08-maison.md", tags: ["précédence"] },
                { type: "exercice", titre: "Ex 11 : ordonnancement (A16)", resume: "Une machine : ri, pi, di, disjonction, Cmax puis ΣCi. Version 2 machines de l'annale A16.", src: "/ai09/ppc/exercices/ex11-ordonnancement.md", tags: ["disjonction", "A16"] }
              ]
            }
          ]
        }
        /*
         * Prochaine section : copier le bloc ci-dessus, changer id / titre / resume,
         * puis ajouter la page dans tools/pages.py (ou copier /ai09/ppc/index.html).
         */
      ]
    }
  ]
};
