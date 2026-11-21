# Fiche Little, Christofides, Beasley

A14 et A15 posent exactement le même exercice sur une matrice 6×6 (dépôt A) : Christofides, Little, puis PPV et Beasley pour le VRP. A11 et A12 posent Little sur d'autres matrices, avec un plus court chemin. Le tour optimal de cette matrice coûte **14**.

## Little (procédure par séparation et évaluation)

Sur la matrice A14/A15, la borne de départ vaut **9** et l'arborescence trouve le tour optimal **A → B → C → D → E → F → A = 14** en 17 nœuds.

**Méthode**

1. **Réduction** : soustraire le minimum de chaque ligne, puis de chaque colonne. La somme des minimums est une borne inférieure (évaluation par défaut) : chaque ville doit être quittée et atteinte une fois.
2. **Regrets** : pour chaque zéro (i, j), θ(i, j) = plus petit élément de la ligne i (hors j) + plus petit élément de la colonne j (hors i). C'est ce que coûte le fait de **ne pas** prendre l'arc.
3. **Séparation** sur le zéro de regret maximal :
   - branche « sans (i, j) » : borne = borne du père + θ(i, j) ;
   - branche « avec (i, j) » : supprimer la ligne i et la colonne j, mettre ∞ sur l'arc qui fermerait un sous-cycle parasite (de la fin de la chaîne vers son début), réduire à nouveau et ajouter le résultat à la borne.
4. Explorer d'abord la branche de plus petite borne. Couper tout nœud dont la borne est ≥ la meilleure tournée déjà trouvée.

**Réduction de la matrice** (minimums des lignes : 1, 1, 1, 2, 2, 2 ; colonnes déjà réduites, borne = 9)

|  | A | B | C | D | E | F |
| --- | --- | --- | --- | --- | --- | --- |
| A | ∞ | 0 | 3 | 3 | 3 | 4 |
| B | 0 | ∞ | 0 | 1 | 3 | 4 |
| C | 3 | 0 | ∞ | 2 | 3 | 3 |
| D | 2 | 0 | 1 | ∞ | 0 | 2 |
| E | 2 | 2 | 2 | 0 | ∞ | 0 |
| F | 3 | 3 | 2 | 2 | 0 | ∞ |

Regrets : AB = 3 + 0 = **3** (maximum), puis BA, CB, EF, FE = 2, BC, ED = 1, DB, DE = 0.

**Arborescence** (borne entre parenthèses)

- Racine (9), on sépare sur AB
  - Avec AB (12), on sépare sur BC
    - Avec BC (13), on sépare sur CD
      - Avec CD (13), on sépare sur DE
        - Avec DE (14) : il reste EF et FA, **tournée ABCDEFA = 14**
        - Sans DE (15) : coupé
      - Sans CD (14) : coupé
    - Sans BC (14) : coupé
  - Sans AB (12) : on explore BA, CB, DC, ED (le même tour en sens inverse), tout est coupé à 14 ou 15

Toutes les feuilles restantes ont une borne ≥ 14 : la solution 14 est donc optimale. La matrice étant symétrique, ABCFEDA = 14 est aussi optimale.

## Christofides et bornes inférieures

Sur cette matrice, Christofides donne **A → B → C → F → E → D → A = 14**, qui est déjà optimal. La garantie théorique est C(T) ≤ 1,5 × C(T\*) lorsque l'inégalité triangulaire est respectée.

1. **Arbre couvrant minimal (Prim depuis A)** : AB (1), BC (1), BD (2), DE (2), EF (2). Coût = **8**.
2. **Sommets de degré impair dans l'arbre** : A (1), B (3), C (1), F (1).
3. **Couplage parfait minimal** entre eux :

| Couplage | Coût |
| --- | --- |
| AB + CF = 1 + 4 | **5** |
| AF + BC = 5 + 1 | 6 |
| AC + BF = 4 + 5 | 9 |

4. **Arbre + couplage** (coût 13) : tous les degrés sont pairs. Un cycle eulérien : A → B → C → F → E → D → B → A.
5. **Raccourcis** : on saute les sommets déjà visités (le second B), ce qui donne A B C F E D A = 1 + 1 + 4 + 2 + 2 + 4 = **14**.

**Bornes inférieures à connaître**

| Borne | Valeur ici | Justification |
| --- | --- | --- |
| Réduction de Little | 9 | Chaque ville est quittée et atteinte une fois |
| Arbre couvrant minimal | 8 | Retirer une arête d'un tour donne un arbre couvrant |
| 1-arbre (arbre sur B…F + 2 plus petites arêtes en A) | 7 + 1 + 4 = **12** | Un tour est un 1-arbre où tous les degrés valent 2 |

Le 1-arbre est la meilleure des trois ici. Il est utile pour la question de type A21 : « montrer que le cycle de 19 est optimal sans méthode exacte ». Si une borne vaut 19, le cycle est prouvé optimal.

## VRP : PPV puis Beasley (A15)

Avec les demandes d'A15 (B 3, C 1, D 2, E 3, F 1, Q = 5), le PPV donne **21 avec 2 véhicules** et le découpage de Beasley du tour géant (B, C, D, E, F) donne **24 avec 3 véhicules**. A14 utilise d'autres demandes : refais le calcul avec les siennes.

**PPV tournée par tournée**

| Tournée | Ordre | Longueur | Charge |
| --- | --- | --- | --- |
| 1 | A → B → C → F → A (depuis C, D ne tient plus : on prend F) | 1 + 1 + 4 + 5 = 11 | 5 |
| 2 | A → D → E → A (D et E à égalité depuis A, on prend D) | 4 + 2 + 4 = 10 | 5 |

**Beasley**

1. Numéroter les clients du tour géant de 1 à n, et créer les sommets 0 à n.
2. Pour chaque sous-suite i…j dont la demande tient dans Q, créer l'arc (i−1, j) valué par le coût de la tournée dépôt → i → … → j → dépôt.
3. Le plus court chemin de 0 à n donne le découpage optimal (graphe sans circuit : on calcule V(j) dans l'ordre).

| Arc | Tournée | Coût | Arc | Tournée | Coût |
| --- | --- | --- | --- | --- | --- |
| 0→1 | A B A | 2 | 2→4 | A D E A | 10 |
| 0→2 | A B C A | 6 | 3→4 | A E A | 8 |
| 1→2 | A C A | 8 | 3→5 | A E F A | 11 |
| 1→3 | A C D A | 11 | 4→5 | A F A | 10 |
| 2→3 | A D A | 8 |  |  |  |

Plus court chemin : V(1) = 2, V(2) = 6, V(3) = min(2 + 11, 6 + 8) = 13, V(4) = min(6 + 10, 13 + 8) = 16, V(5) = min(13 + 11, 16 + 10) = **24**. Découpage : **(B) (C, D) (E, F)**.

Ce qu'il faut en dire sur la copie : Beasley est optimal **pour l'ordre du tour géant donné**, pas pour le VRP. Ici, l'ordre imposé B, C, D, E, F est moins bon que celui que trouve le PPV.

## Dijkstra (A11, A12) et pièges

« Partant de B, déterminer un cheminement optimal pour se rendre à F » : le problème de référence est le **plus court chemin**, résolu par **Dijkstra** car tous les coûts sont positifs.

1. d(B) = 0, toutes les autres distances à ∞.
2. Prendre le sommet non définitif de plus petite distance et le marquer définitif.
3. Mettre à jour ses successeurs : d(j) = min(d(j), d(i) + c(i, j)), en notant le prédécesseur.
4. S'arrêter quand F est définitif, puis remonter les prédécesseurs.

Sur la matrice d'A11 (orientée), on marque B (0), puis E (1), puis A et D (3), puis F (5). Il existe deux chemins de longueur **5** : B → E → F et B → A → F. Présente-le sous forme de tableau, une ligne par itération.

**Pièges**

- Little : oublier d'interdire l'arc qui fermerait un sous-cycle parasite après chaque « avec ». Sur une matrice orientée (A11, A12), il ne faut surtout pas la symétriser.
- Little : ne pas conclure explicitement « toutes les feuilles ont une borne ≥ 14, donc 14 est optimal ».
- Christofides : faire le couplage sur tous les sommets au lieu des seuls sommets de degré impair de l'arbre.
- Beasley : oublier que le coût d'un arc inclut l'aller et le retour au dépôt.
- Ratio 1,5 de Christofides et ratio 2 de l'arbre : ils ne valent que si l'inégalité triangulaire est respectée. Sans elle, le PPV peut être arbitrairement mauvais (A05, A09, P18).

**À faire pour t'entraîner** : refais Little sur la matrice 6×6 d'A11 (asymétrique), puis le plus court chemin B → F. Envoie-moi ta copie si tu veux une correction.
