# Fiche Beasley et Christofides

Beasley est tombé 4 fois (A07, A12, A14, A15), toujours en calcul. Christofides est tombé 3 fois : 2 calculs (A14, A15) et 1 question de cours sur son ratio (A12).

## Déjà tombé ?

Oui, les deux, mais pas depuis 2015. Les sujets se recopient d'une année à l'autre (A14 et A15 ont la même matrice), donc le format ci-dessous est celui à attendre.

| Annale | Exercice | Beasley | Christofides |
| --- | --- | --- | --- |
| A07 | Copie I, ex. 2 (5 pts) | Découper le tour de Shamos avec une **distance max L = 7** par véhicule, donner le coût total | — |
| A12 | Ex. III et IV (copie 3) | Découpage du tour géant (A, B, C, D, E), demandes 2, 3, 1, 2, 1, Q = 5 | **Question de cours** : « admet-elle un rapport de performance ? lequel ? justifier » |
| A14 | Ex. IV (5 pts) | Q3b : découpage du tour géant (A, …, F), Q = 5, après un PPV | Q1 : « donner une solution approchée par Christofides » |
| A15 | Ex. IV (5 pts) | Q3b : même exercice, tour géant (B, C, D, E, F) | Q1 : même question, même matrice |

À retenir :

- Beasley arrive toujours **en fin d'exercice**, après un TSP (Shamos, Little) ou un PPV. Il vaut environ 1 à 1,5 point.
- En A14/A15, Christofides est la **première question** d'un exercice de 5 points qui enchaîne Christofides, Little, PPV et Beasley sur la même matrice.
- L'énoncé d'A12 ne précise pas de dépôt (le tour géant contient les 5 villes). Si ça arrive, écris ton hypothèse sur la copie.
- Il manque les sujets 2010, 2017, 2019, 2020, 2022 et 2024 : on ne sait pas ce qui y est tombé.

## Beasley : la méthode

Beasley transforme un tour géant (un seul cycle qui passe par tous les clients) en plusieurs tournées qui respectent la capacité Q ou la distance L. C'est la méthode **« route first, cluster second »** : on fait d'abord la route, puis on la coupe. C'est l'inverse de Gillett-Miller (« cluster first, route second »).

L'idée clé : on garde l'ordre du tour géant, et on cherche **où couper** pour que le total soit minimal. Chercher les meilleures coupures revient à chercher un plus court chemin.

1. **Numéroter** les clients dans l'ordre du tour géant : 1, 2, …, n. Créer les sommets 0, 1, …, n (0 = « rien n'est encore servi »).
2. **Créer les arcs** : pour chaque suite consécutive de clients i, i+1, …, j qui tient dans un véhicule, créer l'arc (i−1) → j. Son coût est celui de la tournée dépôt → i → … → j → dépôt.
3. **Plus court chemin de 0 à n** : le graphe n'a pas de circuit (les arcs vont toujours vers l'avant), donc on calcule V(j) dans l'ordre j = 1, 2, …, n, sans Dijkstra.
4. **Remonter** les prédécesseurs depuis n : chaque arc du chemin est une tournée.

La formule à écrire sur la copie :

```latex
V(0) = 0, \qquad V(j) = \min_{i \le j,\ (i..j) \text{ réalisable}} \big[\, V(i-1) + \text{coût}(i..j) \,\big]
```

Astuce de calcul pour aller vite : quand on ajoute le client j à une tournée qui finissait en j−1, on enlève le retour au dépôt depuis j−1 et on ajoute j−1 → j → dépôt.

```latex
\text{coût}(i..j) = \text{coût}(i..j-1) - d(j-1, 0) + d(j-1, j) + d(j, 0)
```

Dès qu'une suite dépasse Q (ou L), les suites plus longues qui partent du même i dépassent aussi : tu passes au i suivant.

## Beasley, exemple 1 : A15 (capacité)

**Énoncé.** Dépôt A. Demandes B = 3, C = 1, D = 2, E = 3, F = 1. Véhicules de capacité Q = 5. Donner le découpage optimal du tour géant (B, C, D, E, F). Résultat : **3 tournées, coût 24**.

Matrice des distances (symétrique) :

|  | A | B | C | D | E | F |
| --- | --- | --- | --- | --- | --- | --- |
| A | – | 1 | 4 | 4 | 4 | 5 |
| B | 1 | – | 1 | 2 | 4 | 5 |
| C | 4 | 1 | – | 3 | 4 | 4 |
| D | 4 | 2 | 3 | – | 2 | 4 |
| E | 4 | 4 | 4 | 2 | – | 2 |
| F | 5 | 5 | 4 | 4 | 2 | – |

**Étape 1, numéroter.** B = 1, C = 2, D = 3, E = 4, F = 5. Sommets 0 à 5.

**Étape 2, lister les arcs.** Pour chaque point de départ, on allonge la suite tant que la charge reste ≤ 5.

| Arc | Clients | Charge | Tournée | Coût |
| --- | --- | --- | --- | --- |
| 0 → 1 | B | 3 | A B A = 1 + 1 | 2 |
| 0 → 2 | B, C | 4 | A B C A = 1 + 1 + 4 | 6 |
| ~~0 → 3~~ | B, C, D | 6 > 5 | impossible |  |
| 1 → 2 | C | 1 | A C A = 4 + 4 | 8 |
| 1 → 3 | C, D | 3 | A C D A = 4 + 3 + 4 | 11 |
| ~~1 → 4~~ | C, D, E | 6 > 5 | impossible |  |
| 2 → 3 | D | 2 | A D A = 4 + 4 | 8 |
| 2 → 4 | D, E | 5 | A D E A = 4 + 2 + 4 | 10 |
| ~~2 → 5~~ | D, E, F | 6 > 5 | impossible |  |
| 3 → 4 | E | 3 | A E A = 4 + 4 | 8 |
| 3 → 5 | E, F | 4 | A E F A = 4 + 2 + 5 | 11 |
| 4 → 5 | F | 1 | A F A = 5 + 5 | 10 |

**Étape 3, plus court chemin de 0 à 5.** Pour chaque sommet j, on regarde tous les arcs qui arrivent en j.

| j | Calcul | V(j) | Préd. |
| --- | --- | --- | --- |
| 0 | départ | 0 | – |
| 1 | V(0) + 2 | 2 | 0 |
| 2 | min(V(0) + 6, V(1) + 8) = min(6, 10) | 6 | 0 |
| 3 | min(V(1) + 11, V(2) + 8) = min(13, 14) | 13 | 1 |
| 4 | min(V(2) + 10, V(3) + 8) = min(16, 21) | 16 | 2 |
| 5 | min(V(3) + 11, V(4) + 10) = min(24, 26) | **24** | 3 |

**Étape 4, remonter.** 5 ← 3 ← 1 ← 0. Les arcs du chemin sont 0 → 1, 1 → 3 et 3 → 5 :

- tournée 1 : A → B → A, coût 2, charge 3 ;
- tournée 2 : A → C → D → A, coût 11, charge 3 ;
- tournée 3 : A → E → F → A, coût 11, charge 4.

Total **24 avec 3 véhicules**.

**Phrase de conclusion à écrire.** Ce découpage est optimal *pour l'ordre (B, C, D, E, F)*, pas pour le VRP. Le PPV de la question 3a trouvait 21 avec 2 véhicules (A B C F A, puis A D E A) : l'ordre imposé du tour géant est ici mauvais.

A14 pose le même exercice sur le tour (A, B, C, D, E, F) avec A comme dépôt : les clients sont B … F avec les mêmes demandes, donc le calcul est identique.

## Beasley, exemple 2 : A07 (distance L = 7)

**Énoncé.** Sur une grille de mailles unitaires, distances euclidiennes, avec √2 = 1,4 ; √5 = 2,2 ; √10 = 3,2. Partie 1 : résoudre le TSP avec Shamos. Partie 2 : un véhicule ne peut pas parcourir plus de L = 7, découper la tournée avec Beasley et donner le coût total. Résultat : **3 tournées, coût 18,2**.

Coordonnées lues sur la figure (origine en bas à gauche) : d (0, 3), 1 (2, 4), 2 (3, 3), 3 (0, 2), 4 (1, 2), 5 (3, 2), 6 (1, 1).

Ici la contrainte porte sur la **longueur de chaque tournée**, pas sur une charge. La méthode est la même : un arc existe si la tournée fait au plus 7.

**Partie 1, Shamos (rappel rapide).** L'enveloppe convexe est d → 1 → 2 → 5 → 6 → 3 → d. Seul le point 4 est à l'intérieur. Surcoût de son insertion sur chaque arête :

| Arête | d(i,4) + d(4,j) − d(i,j) | Surcoût |
| --- | --- | --- |
| d–1 | 1,4 + 2,2 − 2,2 | 1,4 |
| 1–2 | 2,2 + 2,2 − 1,4 | 3,0 |
| 2–5 | 2,2 + 2 − 1 | 3,2 |
| 5–6 | 2 + 1 − 2,2 | 0,8 |
| 6–3 | 1 + 1 − 1,4 | **0,6** |
| 3–d | 1 + 1,4 − 1 | 1,4 |

On insère 4 entre 6 et 3 : tour **d → 1 → 2 → 5 → 6 → 4 → 3 → d**, longueur 2,2 + 1,4 + 1 + 2,2 + 1 + 1 + 1 = 9,8. C'est plus que 7, donc il faut découper.

**Partie 2, étape 1.** Numéroter dans l'ordre du tour : 1, 2, 5, 6, 4, 3 deviennent les positions 1 à 6. Sommets 0 à 6.

**Étape 2, les arcs.** Distances au dépôt utiles : d1 = 2,2 ; d2 = 3 ; d5 = 3,2 ; d6 = 2,2 ; d4 = 1,4 ; d3 = 1.

| Arc | Clients | Tournée | Longueur |
| --- | --- | --- | --- |
| 0 → 1 | 1 | 2,2 + 2,2 | 4,4 |
| 0 → 2 | 1, 2 | 2,2 + 1,4 + 3 | 6,6 |
| ~~0 → 3~~ | 1, 2, 5 | 2,2 + 1,4 + 1 + 3,2 = 7,8 | > 7 |
| 1 → 2 | 2 | 3 + 3 | 6,0 |
| ~~1 → 3~~ | 2, 5 | 3 + 1 + 3,2 = 7,2 | > 7 |
| 2 → 3 | 5 | 3,2 + 3,2 | 6,4 |
| ~~2 → 4~~ | 5, 6 | 3,2 + 2,2 + 2,2 = 7,6 | > 7 |
| 3 → 4 | 6 | 2,2 + 2,2 | 4,4 |
| 3 → 5 | 6, 4 | 2,2 + 1 + 1,4 | 4,6 |
| 3 → 6 | 6, 4, 3 | 2,2 + 1 + 1 + 1 | 5,2 |
| 4 → 5 | 4 | 1,4 + 1,4 | 2,8 |
| 4 → 6 | 4, 3 | 1,4 + 1 + 1 | 3,4 |
| 5 → 6 | 3 | 1 + 1 | 2,0 |

Le client 5 est loin du dépôt : il ne peut être servi avec aucun voisin, donc il aura sa propre tournée.

**Étape 3, plus court chemin.**

| j | Calcul | V(j) | Préd. |
| --- | --- | --- | --- |
| 1 | 0 + 4,4 | 4,4 | 0 |
| 2 | min(0 + 6,6 ; 4,4 + 6) | 6,6 | 0 |
| 3 | 6,6 + 6,4 (seul arc) | 13,0 | 2 |
| 4 | 13 + 4,4 | 17,4 | 3 |
| 5 | min(13 + 4,6 ; 17,4 + 2,8) | 17,6 | 3 |
| 6 | min(13 + 5,2 ; 17,4 + 3,4 ; 17,6 + 2) | **18,2** | 3 |

**Étape 4, remonter.** 6 ← 3 ← 2 ← 0 :

- tournée 1 : d → 1 → 2 → d, longueur 6,6 ;
- tournée 2 : d → 5 → d, longueur 6,4 ;
- tournée 3 : d → 6 → 4 → 3 → d, longueur 5,2.

Coût total **18,2** (au lieu de 9,8 pour un véhicule sans limite). Si tu parcours le tour dans l'autre sens, tu trouves les mêmes 3 tournées et le même coût.

## Christofides : la méthode

Christofides construit un tour du TSP à partir d'un arbre couvrant minimal, qu'on « répare » pour pouvoir le parcourir en un seul cycle. Il s'applique à un graphe complet non orienté (matrice symétrique). Sa garantie, C(T) ≤ 1,5 × C(optimal), demande l'**inégalité triangulaire**.

Pourquoi ça marche : un graphe dont tous les sommets ont un degré pair contient un cycle eulérien (qui passe une fois par chaque arête). L'arbre a des sommets de degré impair, on les « apparie » pour les rendre pairs. C'est la même idée que pour le postier chinois.

1. **Arbre couvrant minimal (ACM)** avec Prim ou Kruskal.
2. **Sommets de degré impair** dans l'arbre. Il y en a toujours un nombre pair.
3. **Couplage parfait de coût minimal** entre ces seuls sommets impairs. À la main, on énumère : 4 sommets donnent 3 couplages possibles, 6 sommets en donnent 15.
4. **Union** arbre + couplage : tous les degrés deviennent pairs (une arête peut apparaître deux fois).
5. **Cycle eulérien** dans ce graphe, depuis le dépôt.
6. **Raccourcis** : on parcourt le cycle et on saute chaque sommet déjà visité. On obtient un cycle hamiltonien, la solution approchée.

Coût du cycle eulérien = coût de l'ACM + coût du couplage. Les raccourcis ne l'allongent pas si l'inégalité triangulaire est respectée.

## Christofides, exemple : A14 / A15

**Énoncé.** Même matrice que l'exemple 1 de Beasley, dépôt A. « Donner une solution approchée par l'heuristique de Christofides. » Résultat : **A → B → C → F → E → D → A, coût 14** (c'est aussi l'optimum, trouvé par Little à la question suivante).

**Étape 1, ACM par Kruskal.** On trie les arêtes par coût croissant et on les prend si elles ne créent pas de cycle.

| Arête | Coût | Décision |
| --- | --- | --- |
| AB | 1 | prise |
| BC | 1 | prise |
| BD | 2 | prise |
| DE | 2 | prise |
| EF | 2 | prise : 5 arêtes pour 6 sommets, l'arbre est complet |

Coût de l'ACM = 1 + 1 + 2 + 2 + 2 = **8**. (Avec Prim depuis A, tu trouves le même arbre.)

**Étape 2, degrés dans l'arbre.** A = 1, B = 3 (A, C, D), C = 1, D = 2, E = 2, F = 1. Sommets impairs : **A, B, C, F**.

**Étape 3, couplage minimal.** Avec 4 sommets, il y a 3 façons de les mettre par paires :

| Couplage | Coût |
| --- | --- |
| AB + CF = 1 + 4 | **5** |
| AF + BC = 5 + 1 | 6 |
| AC + BF = 4 + 5 | 9 |

On garde **AB + CF**.

**Étape 4, union.** Arêtes : AB (deux fois), BC, BD, DE, EF, CF. Degrés : A = 2, B = 4, C = 2, D = 2, E = 2, F = 2. Tous pairs. Coût = 8 + 5 = 13.

**Étape 5, cycle eulérien depuis A.** A → B → C → F → E → D → B → A. Chaque arête de l'union est utilisée une fois.

**Étape 6, raccourcis.** On lit le cycle et on saute B la deuxième fois : D → B → A devient D → A.

Tour : **A → B → C → F → E → D → A** = 1 + 1 + 4 + 2 + 2 + 4 = **14**.

Deux remarques qui rapportent des points :

- Le raccourci a **allongé** le cycle (13 → 14), parce que D → A = 4 est plus long que D → B → A = 3. Cette matrice ne respecte pas l'inégalité triangulaire (A–C = 4 > A–B + B–C = 2). La méthode s'applique quand même, mais la garantie 1,5 n'est plus prouvée.
- Le résultat dépend du cycle eulérien choisi. Avec A → B → D → E → F → C → B → A, on obtient A B D E F C A = 15. Les deux sont acceptés : dis quel cycle tu as pris.

## Question de cours (A12) : le ratio 3/2

**Question.** « L'heuristique de Christofides admet-elle un rapport de performance ? Si oui lequel ? Justifier. »

**Réponse à rédiger.** Oui : si les distances respectent l'inégalité triangulaire, C(T) ≤ 3/2 × OPT pour toute instance, où OPT est le coût du tour optimal. Preuve en 3 points :

1. **L'arbre coûte au plus OPT.** Si on retire une arête du tour optimal, on obtient une chaîne qui passe par tous les sommets, donc un arbre couvrant. L'ACM est le moins cher des arbres couvrants : C(ACM) ≤ OPT.
2. **Le couplage coûte au plus OPT/2.** On parcourt le tour optimal en sautant les sommets qui ne sont pas impairs dans l'arbre. Par inégalité triangulaire, ce cycle sur les sommets impairs coûte au plus OPT. Ils sont en nombre pair, donc on peut couper ce cycle en deux couplages parfaits en prenant une arête sur deux. Le moins cher des deux coûte au plus OPT/2, et le couplage minimal encore moins.
3. **Les raccourcis n'allongent pas.** Sauter un sommet déjà visité remplace i → k → j par i → j, et d(i, j) ≤ d(i, k) + d(k, j).

Donc C(T) ≤ C(ACM) + C(couplage) ≤ OPT + OPT/2 = **3/2 × OPT**.

```latex
C(T) \le C(\text{ACM}) + C(\text{couplage}) \le C^* + \tfrac{1}{2} C^* = \tfrac{3}{2} C^*
```

Pour comparer, si on te pose les autres questions d'A12 IV :

| Méthode | Rapport de performance (avec inégalité triangulaire) |
| --- | --- |
| Christofides | 3/2 |
| ACM doublé puis raccourci | 2 (pas de couplage, on double toutes les arêtes : 2 × C(ACM) ≤ 2 × OPT) |
| 2-opt | aucun ratio constant |
| PPV | aucun ratio constant (croît en log n) |
| Énumération des (n−1)! tours, en O(n!) | 1 (exact), mais inutilisable dès n ≈ 15 |

Sans inégalité triangulaire, aucune heuristique polynomiale n'a de ratio constant (sauf si P = NP).

## Pièges et lien avec ton projet TOP

**Pièges Beasley**

- Oublier l'aller et le retour au dépôt dans le coût d'un arc : A C A = 8, pas 0.
- Changer l'ordre des clients : on coupe le tour géant, on ne réordonne jamais.
- Ne pas dessiner le graphe 0 → n ou ne pas donner le tableau des V(j) : c'est ce qui montre au correcteur que tu as fait un plus court chemin.
- Écrire que la solution est optimale pour le VRP : elle l'est seulement pour l'ordre donné.

**Pièges Christofides**

- Faire le couplage sur tous les sommets au lieu des seuls sommets **impairs de l'arbre**.
- Oublier une arête doublée dans le cycle eulérien (ici AB deux fois).
- Annoncer le ratio 3/2 sans dire qu'il faut l'inégalité triangulaire.

**Lien avec ton projet TOP.** Ta méthode 2 est exactement Beasley adapté : tour géant PPV, puis découpage par programmation dynamique avec la contrainte τ(i, j) ≤ L, comme dans l'exemple A07. Le TOP ajoute trois changements : on peut sauter des clients, on garde au plus m tournées et on maximise le profit au lieu de minimiser le coût (ta récurrence F\_k(j)). Si une question demande une « amélioration », tu peux citer ce que ton split itéré fait : recoller les tournées en un nouveau tour géant, améliorer par 2-opt, puis redécouper.

**À faire.** Refais à la main A15 ex. IV, questions 1 et 3b, puis A07 partie 2, sans regarder cette fiche. Compare ensuite tes tableaux avec ceux d'ici.
