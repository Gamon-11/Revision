# Fiche postier chinois

Cet exercice est tombé 6 fois (A11, A13, A15, A16, A18, A25), avec seulement trois graphes différents. La méthode tient en quatre étapes.

## Méthode pas à pas

**Théorème d'Euler à citer mot pour mot** : un graphe non orienté connexe admet un cycle eulérien (passant une et une seule fois par chaque arête) si et seulement si tous ses sommets sont de degré pair. Il admet une chaîne eulérienne si et seulement s'il a exactement 0 ou 2 sommets de degré impair.

Version orientée (A11, exercice V) : un graphe orienté connexe admet un circuit eulérien si et seulement s'il est pseudo-symétrique, c'est-à-dire si chaque sommet a autant d'arcs entrants que sortants.

1. **Degrés** : faire le tableau des degrés de tous les sommets. Le nombre de sommets impairs est toujours pair.
2. **Conclure** : aucun sommet impair, le cycle eulérien existe et sa longueur est la somme des arêtes. Sinon, il faut repasser par certaines rues.
3. **Couplage minimal** : calculer le plus court chemin entre chaque paire de sommets impairs (Dijkstra ou à l'œil sur un petit graphe), puis choisir l'appariement de coût total minimal. Avec 4 sommets impairs, il n'y a que 3 appariements possibles : les écrire tous.
4. **Doubler** les arêtes des chemins choisis : le graphe obtenu est eulérien. Longueur minimale = somme de toutes les arêtes + coût du couplage. Donner ensuite un cycle explicite qui part du dépôt et y revient.

Pour construire le cycle à la main : partir du dépôt, avancer par n'importe quelle arête non encore utilisée en évitant de couper le graphe restant en deux (règle de Fleury), et barrer chaque arête utilisée.

## Corrigé réseau A–K (A15, A18, A25)

L'itinéraire minimal depuis B mesure **6 120 m, soit 6,12 km** : 5 320 m de rues plus 800 m de rues parcourues deux fois. Arêtes lues sur la figure : AB 1000, AH 280, BK 200, BC 600, HK 200, KC 120, HF 200, HD 400, KD 640, CD 200, FD 1000, FE 360, ED 120.

**Question 1 : pourquoi pas une seule fois par rue ?**

| Sommet | A | B | C | D | E | F | H | K |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Degré | 2 | 3 | 3 | 5 | 2 | 3 | 4 | 4 |

B, C, D et F sont de degré impair : d'après le théorème d'Euler, il n'existe pas de cycle eulérien.

**Question 2 : itinéraire minimal**

Plus courts chemins entre sommets impairs : BC = 320 (B-K-C), BD = 520 (B-K-C-D), BF = 600 (B-K-H-F), CD = 200, CF = 520 (C-K-H-F), DF = 480 (D-E-F).

| Appariement | Coût |
| --- | --- |
| {B, C} + {D, F} = 320 + 480 | **800** |
| {B, F} + {C, D} = 600 + 200 | **800** |
| {B, D} + {C, F} = 520 + 520 | 1 040 |

Deux appariements sont optimaux à 800 m. Avec le premier, on double BK, KC, DE et EF. Un cycle possible depuis B :

B → A → H → D → C → B → K → C → K → D → E → D → F → E → F → H → K → B

**Question 3** : 5 320 + 800 = 6 120 m = **6,12 km**. Attention, la figure est en mètres et la question en kilomètres.

## Corrigé quartiers Q, Q' et graphe Q'' (A13, A16)

Q et Q' ne sont pas eulériens : il faut repasser par 2 tronçons dans Q et 3 dans Q'. Le cycle minimal sur Q'' mesure **52**.

**Quartier Q** : les sommets de degré 3 sont D, C, F et A (E, G, H, B sont de degré 4). On les apparie par des rues directes : D-C et F-A. Il faut donc parcourir **2 tronçons** deux fois.

**Quartier Q'** : les sommets de degré 3 sont D, G, F et B (E, C, A sont de degré 2). G-B est une rue directe (1 tronçon), mais D et F ne sont pas voisins (D-G-F ou D-E-F, 2 tronçons). Les autres appariements coûtent aussi 3. Minimum : **3 tronçons** parcourus deux fois.

**Graphe Q''** : la somme des arêtes vaut 45. Les sommets impairs sont b, e, f et g.

| Appariement | Chemins | Coût |
| --- | --- | --- |
| {b, e} + {f, g} | b-i-h-e (4) + f-h-g (3) | 7 |
| {b, f} + {e, g} | b-i-h-f (3) + e-h-g (4) | 7 |
| {b, g} + {e, f} | b-i-h-g (4) + e-h-f (3) | 7 |

Les trois appariements coûtent 7 : n'importe lequel donne l'optimum, 45 + 7 = **52**. Sur la copie, explique pourquoi c'est optimal : tout cycle doit ajouter des chemins reliant les sommets impairs deux à deux, et 7 est le minimum de ces ajouts.

## Pièges et lien avec le CARP

- Oublier un sommet dans le tableau des degrés : D a 5 voisins dans le réseau A–K, et c'est là qu'on se trompe le plus.
- Apparier les sommets impairs par une arête directe alors qu'un détour est plus court (CF : 520 par K et H, il n'y a pas de rue directe).
- Ne pas écrire les trois appariements : sans eux, le correcteur ne peut pas voir que ton choix est minimal.
- Donner la longueur sans le cycle explicite, ou un cycle qui ne part pas du dépôt imposé (B pour le commerçant, D pour le postier).
- Oublier la conversion mètres → kilomètres.

Le TD CARP (réseau à saler, camions de 5 t) est la version avec capacité : on garde l'idée de parcourir des arêtes, mais il faut découper le parcours en plusieurs tournées. Ce problème est NP-difficile, alors que le postier chinois sans capacité se résout en temps polynomial grâce au couplage.

**À faire pour t'entraîner** : refais le réseau A–K d'A25 sans regarder ce corrigé, puis Q'' d'A16, et envoie-moi une photo si tu veux une correction.
