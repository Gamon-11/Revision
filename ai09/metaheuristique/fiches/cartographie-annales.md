# Cartographie des annales (chapitres vus)

## Format de l'examen et périmètre

Ce que tu as vu jusqu'ici correspond à la « copie 3 » du final, qui vaut 8 à 10 points sur 20 depuis 2014. C'est donc la moitié de la note, et c'est la partie la plus répétitive d'une année sur l'autre.

Le final RO06-AI09 dure 2h (1h30 en 2021), avec une feuille A4 manuscrite recto-verso autorisée. Il contient 3 ou 4 exercices de 4 à 6 points, chacun sur une copie séparée (sinon -1 point) :

| Copie | Thème | Vu en cours ? |
| --- | --- | --- |
| Copie 1 | PPC / CSP : écrire un programme GNU-Prolog | Pas encore |
| Copie 2 | Modélisation en PL / PLNE (variables, objectif, contraintes) | Pas encore, sauf la PLNE du TSP et du TOP |
| Copie 3 | Tournées, graphes, heuristiques : TSP, VRP, postier chinois, Little, Beasley… | Oui (cours Tournées, cours méta-heuristiques, TD) |

Les annales 2005 à 2009 contiennent aussi des exercices de Monte Carlo et de finance (VAN, TRI) qui ne sont plus au programme depuis 2011 : je les ignore.

D'après tes notes Obsidian, deux CM sont faits à ce jour : le CM 01 (logistique, coloration de graphes, Welsh-Powell, Zykov, cliques) et le CM 03 (tournées TSP/VRP, postier chinois). Le CM 02 (arbres et plus courts chemins) n'a pas encore de notes. La coloration ne tombe pas en copie 3 dans les annales : elle sert surtout de support aux exercices de modélisation (PPC, PL).

## Exercices de tournées dans chaque annale

Sur 17 annales, 15 ont au moins un exercice dans ton périmètre. Seule P19 (PL uniquement) n'en a aucun, et les exercices PPC/PL ne sont pas listés ici.

| Annale | Exercice (points) | Ce qui est demandé |
| --- | --- | --- |
| A25 | III (5) | Postier chinois sur le réseau A–K : pourquoi pas eulérien, itinéraire minimal, longueur |
| A25 | IV (5) | Tournées sélectives (TOP) : formulation PLNE + méthode exacte adaptée du TSP/VRP |
| A23 | III (4) | TSP : PLNE avec MTZ, puis avec énumération des sous-ensembles, comparer les deux |
| A23 | IV (5) | VRP grille Q=8 : Gillett-Miller + Fletcher avec deux axes de balayage, critique, 2 améliorations |
| A21 | III (4) | VRP minoterie : PPV tournée par tournée, puis Gillett-Miller + TSP par secteur |
| A21 | IV (4) | TSP 6 sommets : cycle de 21, cycle de 19 prouvé optimal sans méthode exacte, PPV + 2-opt ne trouve pas l'optimum |
| A18 | III (5) | Postier chinois réseau A–K (même graphe qu'A25) |
| A18 | IV (5) | VRP grille Q=8 : Gillett-Miller + Fletcher (même sujet qu'A23) |
| P18 | 3 (5) | TSP théorie : ratio du PPV, visites multiples et inégalité triangulaire, 2-opt et croisements |
| A16 | III (5) | Postier chinois sur Q, Q', puis cycle minimal sur Q'' |
| A16 | IV (5) | VRP minoterie : PPV + Gillett-Miller + Shamos |
| A15 | III (5) | Postier chinois réseau A–K |
| A15 | IV (5) | TSP 6 villes : Christofides, Little (borne + arborescence), VRP PPV, découpage de Beasley |
| A14 | III (5) | Ordonnancement de projet : dates au plus tôt/tard, chemin critique, méthode sérielle, disjonctions |
| A14 | IV (5) | TSP 6 villes : Christofides, Little, VRP PPV, Beasley (quasi identique à A15) |
| A13 | III (5) | Postier chinois sur Q et Q' |
| A13 | IV (5) | Heuristique de stockage sur 2 bandes : complexité, Gantt, preuve d'approximation F\* − F ≤ 1 |
| A12 | III | Little 5 villes, plus court chemin B→F (Dijkstra), Beasley |
| A12 | IV | TSP : algorithme en O(n!), ratio de Christofides, ratio du 2-opt |
| A11 | III | Little 6 villes + plus court chemin B→F |
| A11 | IV | Arbre couvrant minimal vs cycle hamiltonien, ratio du PPV |
| A11 | V | Preuve : circuit eulérien ⇔ connexe et pseudo-symétrique |
| A09 | IV (5) | TSP théorie (même sujet que P18) |
| A08 | IV (5) | VRP minoterie : PPV + Gillett-Miller + Shamos (même sujet qu'A16) |
| A07 | I (5) | Décomposer un problème réel de tournées, Shamos sur grille, découpage de Beasley avec L=7 |
| A06 | IV (5) | VRP grille Q=8 : Gillett-Miller + Fletcher (même sujet qu'A18/A23) |
| A05 | IV (5) | TSP théorie (même sujet que P18) |

## Types d'exercices par fréquence

Trois types d'exercices reviennent chacun 6 ou 7 fois, souvent avec exactement le même énoncé : les maîtriser couvre la plupart des sujets de la copie 3.

| Type d'exercice | Fois | Annales | Sujet réutilisé | Support de cours / TD |
| --- | --- | --- | --- | --- |
| TSP : preuves et garanties (ratio du PPV, inégalité triangulaire, 2-opt, Christofides, approximation) | 7 | A05, A09, P18, A11, A12, A13, A21 | A05 = A09 = P18 | Cours Tournées (bornes, ratios) |
| VRP heuristique : PPV tournée par tournée, balayage de Gillett-Miller, puis TSP par secteur (Shamos ou Fletcher) | 6 | A06, A08, A16, A18, A21, A23 (+ Shamos en A07) | Minoterie : A08, A16, A21 et TD Exo\_VRP. Grille Q=8 : A06, A18, A23 | TD Exo\_VRP, VRP\_PPV, Gillett-Miller puis Shamos |
| Postier chinois / graphes eulériens | 6 | A11, A13, A15, A16, A18, A25 | Réseau A–K : A15, A18, A25. Quartiers Q, Q' : A13, A16 | Cours Tournées (tournées sur arcs), TD CARP |
| TSP exact par Little (borne par réduction + arborescence) | 4 | A11, A12, A14, A15 | Matrice 6×6 : A14 = A15 | TD PSE (Little, Murty, Sweeney, Karel) |
| Découpage optimal d'un tour géant (Beasley) | 4 | A07, A12, A14, A15 | A14 = A15 | Cours Tournées |
| Heuristique de Christofides | 2 | A14, A15 | A14 = A15 | Cours Tournées |
| PLNE du TSP (MTZ, sous-tours) ou du TOP | 2 | A23, A25 | TOP = ton projet | Projet Tournées |
| Plus court chemin (Dijkstra) | 2 | A11, A12 | Oui | À vérifier |
| Ordonnancement de projet, heuristique de stockage | 1 chacun | A13, A14 | Non | À vérifier (seul l'atelier sans attente est dans tes TD) |

Les méta-heuristiques (descente, tabou, recuit, génétique) ne sont jamais demandées directement : elles n'apparaissent qu'à travers le 2-opt et les « améliorations » à proposer.

Clarke et Wright est au programme du CM 03 mais n'apparaît dans aucune des 17 annales fournies. Les années 2010, 2017, 2019, 2020, 2022 et 2024 manquent au dossier : on ne peut pas savoir s'il y est tombé.

## Priorités de révision

L'ordre proposé suit la fréquence et la quantité de points en jeu. Les exercices de calcul sont à refaire à la main, car les mêmes instances reviennent.

**Avancement au 15 novembre** : en TD, vous avez fait uniquement Exo\_VRP, Modelisation (coloration) et SansAttente. Le postier chinois, Little (TD PSE), le CARP et les heuristiques TSP ont été vus en CM, mais pas encore pratiqués en TD. Comme le prof a choisi la coloration et l'atelier sans attente pour ses TD, ces deux exercices remontent en priorité moyenne, même s'ils ne sont pas tombés dans les 17 annales.

| Thème | CM | TD fait | Annales | Priorité maintenant |
| --- | --- | --- | --- | --- |
| VRP heuristique (PPV, Gillett-Miller, Shamos, Fletcher) | Oui | Oui (Exo\_VRP) | 6 fois | 1 |
| Postier chinois | Oui | Non | 6 fois | 2 |
| Little, Beasley, Christofides | Oui | Non (TD PSE à venir ?) | 4 fois | 3 |
| Sans attente (ordonnancement → TSP) | Non | Oui | 0 | 4 |
| Coloration (Welsh-Powell, Zykov) | Oui (CM 01) | Oui (Modelisation) | 0 | 4 |
| Théorie TSP (ratios, 2-opt) | Oui | Non | 7 fois | 5 |

1. **VRP heuristique** (PPV, Gillett-Miller, Shamos, Fletcher) : refaire la minoterie (A21) et la grille Q=8 (A23) en entier.
2. **Postier chinois** : sommets impairs, couplage de coût minimal, longueur totale, sur le réseau A–K (A25) puis Q, Q', Q'' (A16).
3. **Little** : réduction de matrice, regrets, arborescence, sur la matrice 6×6 d'A15 et le TD PSE.
4. **Beasley et Christofides** sur la même instance A15.
5. **TSP théorie** : une fiche de preuves types (ratio PPV non borné, ratio 2 pour l'arbre et 3/2 pour Christofides, 2-opt et croisements).
6. **PLNE TSP / TOP** : formulations MTZ et sous-tours, en t'appuyant sur ton projet.

**Questions ouvertes pour toi**

- [ ] Ordonnancement de projet (A14) et plus court chemin (Dijkstra, A11/A12) : vus en cours, pas encore révisés. Ils restent dans le périmètre.
- [ ] PPC (GNU-Prolog) et modélisation PL : seront vues dans les prochaines semaines. On les ajoutera au plan à ce moment-là.
