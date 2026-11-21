# Fiche VRP heuristique

Cet exercice est tombé 6 fois (A06, A08, A16, A18, A21, A23) avec seulement deux énoncés différents : la minoterie et la grille Q=8.

## Méthodes pas à pas

Avant tout calcul, fais la somme des demandes et divise par Q : cela donne le nombre minimal de camions (ici 30 / 10 = 3).

**PPV tournée par tournée (VRP)**

1. Partir du dépôt avec un camion vide.
2. Aller au client non servi le plus proche **dont la demande tient encore dans le camion**.
3. Quand plus aucun client ne tient, rentrer au dépôt : la tournée est fermée.
4. Recommencer avec un nouveau camion jusqu'à ce que tous les clients soient servis.
5. En cas d'égalité de distance, annoncer la règle choisie sur la copie (par exemple le plus petit numéro).

**Gillett-Miller (balayage, « cluster first, route second »)**

1. Calculer l'angle polaire de chaque client vu depuis le dépôt : θ = atan2(y − yD, x − xD).
2. Trier les clients par angle à partir du client de départ imposé, dans le sens imposé (« sens inverse des aiguilles d'une montre » = angles croissants).
3. Remplir un secteur dans cet ordre tant que la capacité Q n'est pas dépassée, puis ouvrir le secteur suivant.
4. Résoudre un TSP dans chaque secteur, dépôt inclus, avec l'heuristique demandée (Shamos, Fletcher, ou PPV + 2-opt dans le cours).

**Shamos (méthode de l'élastique, TSP euclidien)**

1. Tracer l'enveloppe convexe des points du secteur, dépôt inclus : c'est le premier cycle (l'élastique).
2. Pour chaque point intérieur k et chaque arête (i, j) du cycle, calculer le surcoût d(i,k) + d(k,j) − d(i,j).
3. Insérer le point qui allonge le moins le cycle, à l'endroit le moins cher. Recommencer jusqu'à ce que tous les points soient dans le cycle.

**Fletcher (arêtes gloutonnes)**

1. Partir de nœuds isolés et trier toutes les arêtes par longueur croissante.
2. Ajouter la plus petite arête qui ne crée **ni fourche** (un nœud de degré 3) **ni cycle** avec les arêtes déjà choisies.
3. Le dernier ajout ferme la chaîne en cycle hamiltonien.

**Clarke et Wright (« marguerite », méthode parallèle)** : au programme du CM, mais absent des 17 annales fournies (2005 à 2025). À connaître quand même, car le sujet peut changer (corrigé ci-dessous).

1. Partir de n tournées aller-retour 0 → i → 0.
2. Calculer l'économie de chaque paire : e(i, j) = D(i, 0) + D(0, j) − D(i, j).
3. Trier les économies par ordre décroissant et fusionner les deux tournées si i et j sont en bout de tournée et si la charge totale reste ≤ Q.

**Corrigé Clarke et Wright sur la matrice d'A15** (dépôt A ; demandes B 3, C 1, D 2, E 3, F 1 ; Q = 5). Résultat : **3 tournées, 24 km**.

| Paire | e(i, j) = d(i,A) + d(A,j) − d(i,j) | Décision | Tournées après |
| --- | --- | --- | --- |
| E-F | 4 + 5 − 2 = 7 | Fusion (charge 4) | B / C / D / E-F |
| D-E | 4 + 4 − 2 = 6 | Refus : charge 2 + 4 = 6 > 5 |  |
| C-D | 4 + 4 − 3 = 5 | Fusion (charge 3) | B / C-D / E-F |
| C-F | 4 + 5 − 4 = 5 | Refus : charge 7 |  |
| D-F | 4 + 5 − 4 = 5 | Refus : charge 7 |  |
| B-C | 1 + 4 − 1 = 4 | Refus : charge 6 |  |
| C-E, B-D, B-E, B-F | 4, 3, 1, 1 | Refus : capacité |  |

Tournées finales : A-B-A (2), A-C-D-A (11), A-E-F-A (11), total 24. À égalité d'économie (C-D, C-F, D-F = 5), j'ai pris l'ordre alphabétique : écris ta règle sur la copie.

Les trois vérifications à faire à chaque paire, dans l'ordre : i et j sont dans deux tournées différentes, i et j sont chacun **en bout** de leur tournée (jamais au milieu), et la charge totale reste ≤ Q. Ici, l'économie la plus forte (E-F) bloque ensuite toutes les fusions avec B, d'où un résultat moins bon que le PPV (21) : Clarke et Wright reste une heuristique.

Rappel de distance euclidienne à avoir sur la feuille A4 : √2 ≈ 1,41 ; √5 ≈ 2,24 ; √8 ≈ 2,83 ; √10 ≈ 3,16 ; √13 ≈ 3,61 ; √17 ≈ 4,12 ; √18 ≈ 4,24.

## Corrigé minoterie : PPV

Le PPV donne 3 tournées pleines (10 t chacune) pour une longueur totale de **47,22 km**, avec 3 camions. Données d'A21 (identiques en A08 et A16) : dépôt en (3, 3), Q = 10 t, demande totale 30 t. En cas d'égalité, j'ai pris le plus petit numéro.

| Tournée | Ordre de visite | Distances (km) | Longueur | Charge |
| --- | --- | --- | --- | --- |
| 1 | D → 9 → 5 → 2 → 1 → 4 → 10 → D | 1 + 1,41 + 1 + 1 + 1,41 + 2 + 3 | 10,83 | 10 t |
| 2 | D → 12 → 14 → 15 → 18 → 17 → 13 → D | 1,41 + 2,24 + 1 + 1 + 2 + 3,61 + 3,16 | 14,42 | 10 t |
| 3 | D → 6 → 7 → 3 → 11 → 8 → 16 → D | 2,24 + 1 + 1,41 + 3 + 6,08 + 4 + 4,24 | 21,98 | 10 t |
| **Total** |  |  | **47,22** | 30 t |

Les trois moments à commenter sur ta copie :

- Depuis 9, les clients 5 et 6 sont à égalité (√2) : annonce ta règle de départage.
- Depuis 4, le client le plus proche est 8 (distance 1) mais sa demande de 3 t ne tient pas dans le camion (charge 9/10) : on passe à 10, à distance 2.
- La tournée 3 fait un grand aller-retour 11 → 8 (6,08 km) car ce sont les derniers clients restants. C'est le défaut typique du PPV : les dernières tournées ramassent les clients « oubliés », dispersés.

## Corrigé minoterie : Gillett-Miller + Shamos

Le balayage depuis le client 8, dans le sens inverse des aiguilles d'une montre, donne 3 secteurs de 10 t et une longueur totale de **38,18 km**, soit 19 % de moins que le PPV. J'ai vérifié par énumération que chaque tournée obtenue par Shamos est optimale dans son secteur.

**Étape 1 : angles polaires depuis le dépôt (3, 3), triés à partir de 8**

| Ordre | 8 | 4 | 1 | 5 | 2 | 9 | 6 | 7 | 3 | 11 | 13 | 15 | 18 | 14 | 17 | 12 | 16 | 10 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Angle (°) | 198 | 214 | 236 | 243 | 252 | 270 | 297 | 315 | 315 | 0 | 18 | 45 | 56 | 63 | 90 | 135 | 135 | 180 |
| Demande (t) | 3 | 2 | 2 | 1 | 2 | 2 | 1 | 1 | 1 | 2 | 1 | 2 | 1 | 2 | 1 | 3 | 2 | 1 |

7 et 3 ont le même angle (315°) : on prend d'abord le plus proche du dépôt (7). Même chose pour 12 puis 16 à 135°.

**Étape 2 : secteurs et tournées par Shamos**

| Secteur | Clients | Enveloppe convexe (élastique) | Insertions (surcoût) | Tournée finale | Longueur |
| --- | --- | --- | --- | --- | --- |
| 1 | 8, 4, 1, 5, 2 | D, 8, 4, 1, 2 | 5 entre 2 et D (+0,07) | D → 8 → 4 → 1 → 2 → 5 → D | 9,81 |
| 2 | 9, 6, 7, 3, 11, 13, 15 | D, 9, 6, 3, 13, 15 | 11 entre 3 et 13 (+0), puis 7 entre 6 et 3 (+0,18) | D → 9 → 6 → 7 → 3 → 11 → 13 → 15 → D | 13,07 |
| 3 | 18, 14, 17, 12, 16, 10 | D, 18, 16, 10 | 17 entre 18 et 16 (+0), 14 entre D et 18 (+0,04), 12 entre 10 et D (+0,65) | D → 14 → 18 → 17 → 16 → 10 → 12 → D | 15,30 |
| **Total** |  |  |  |  | **38,18** |

Sur la copie, dessine chaque secteur sur le repère, trace l'élastique, puis montre chaque insertion avec son calcul de surcoût, par exemple pour 5 : d(2,5) + d(5,D) − d(2,D) = 1 + 2,24 − 3,16 = 0,07.

## Questions de réflexion et pièges

Le sujet de la grille Q=8 (A06, A18, A23) ajoute toujours les deux mêmes questions après le calcul. Les réponses attendues tiennent en quelques lignes.

**« Que constate-t-on ? »** (après deux positions de l'axe de balayage)

- La solution, et même le nombre de camions, dépendent de la position de départ de l'axe : Gillett-Miller n'est pas stable.
- Les secteurs sont formés sur l'angle seul, sans tenir compte des distances : deux clients voisins peuvent se retrouver dans deux tournées différentes.

**« Proposez deux améliorations en gardant Fletcher »**

1. Lancer le balayage depuis chacun des n clients, et dans les deux sens, puis garder la meilleure solution (2n essais, toujours rapide).
2. Après le découpage, échanger ou déplacer des clients situés à la frontière de deux secteurs voisins si cela réduit la longueur totale et respecte Q.
3. Améliorer chaque tournée obtenue par Fletcher avec une recherche locale (2-opt ou Or-opt), comme le fait le cours avec « PPV + 2-opt ».

**Pièges qui coûtent des points**

- Oublier le dépôt dans le TSP de chaque secteur (l'enveloppe convexe de Shamos doit l'inclure).
- Dans le PPV VRP, prendre le client le plus proche sans vérifier qu'il tient dans le camion.
- Tourner dans le mauvais sens : « sens inverse des aiguilles d'une montre » signifie des angles croissants.
- Ne pas donner ce que l'énoncé demande explicitement : la longueur de chaque tournée, la longueur totale **et** le nombre de camions, avec un dessin.
- Ne pas annoncer la règle de départage des égalités : le correcteur accepte un autre choix s'il est écrit.

**À faire pour t'entraîner** : refais la minoterie à la main sans regarder ce corrigé, puis compare. Ensuite, fais le sujet de la grille Q=8 de l'annale A23 : envoie-moi ta copie (photo) et je la corrige.
