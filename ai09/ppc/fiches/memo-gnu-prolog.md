# Mémo GNU-Prolog et méthode CSP

Tout ce qu'il faut savoir écrire de tête pour la copie 1, tiré des 16 premières pages du TD et des annales. Les exercices de la section supposent ce mémo connu.

## Modéliser un CSP en 3 étapes

Un **CSP** (*Constraint Satisfaction Problem*, problème de satisfaction de contraintes) est un triplet **(X, D, C)** :

1. **Variables X** : les inconnues du problème. Commence toujours par là, en disant ce que représente chaque variable (« Xi = ligne de la reine de la colonne i »).
2. **Domaines D** : les valeurs que chaque variable peut prendre (« D(Xi) = {1, …, n} »).
3. **Contraintes C** : les relations entre variables, regroupées par familles (« lignes différentes », « diagonales différentes »…).

À ce stade on ne se soucie pas de la résolution : on spécifie le problème. Un même problème a souvent plusieurs modèles, et le meilleur est en général celui dont **l'espace de recherche est le plus petit**, c'est-à-dire celui qui met une partie du raisonnement dans le choix des variables (modèle 2 des reines).

## Squelette d'un programme

```prolog
probleme([X1, X2, X3]) :-
    fd_domain([X1, X2, X3], 1, 9),      % 1. domaines
    fd_all_different([X1, X2, X3]),    % 2. contraintes
    X1 + X2 #= X3,
    fd_labeling([X1, X2, X3]).         % 3. recherche, toujours en dernier
```

Avec un objectif à optimiser, la dernière ligne devient `fd_minimize(fd_labeling(Vars), Cout)`. Pour maximiser, `fd_maximize`.

## Domaines

| Prédicat | Effet |
| --- | --- |
| `fd_domain(X, Min, Max)` | X entier entre Min et Max |
| `fd_domain([X,Y,Z], Min, Max)` | idem pour chaque variable de la liste |
| `fd_domain(X, [8,10,12])` | X prend une des valeurs de la liste |
| `fd_min/2`, `fd_max/2`, `fd_size/2`, `fd_dom/2` | plus petite valeur, plus grande, nombre de valeurs, liste des valeurs |

**Piège** : une variable FD est un entier **positif ou nul** (entre 0 et `fd_max_integer`). Une expression comme `X - I` qui peut devenir négative ne peut pas être stockée dans une variable FD : compare-la directement (`X - I #\= Y - J`) ou décale-la (`X - I + N`).

## Contraintes arithmétiques

| Consistance d'arc partielle | Totale | Sens |
| --- | --- | --- |
| `#=` | `#=#` | égal |
| `#\=` | `#\=#` | différent |
| `#<` | `#<#` | inférieur |
| `#=<` | `#=<#` | inférieur ou égal |
| `#>` | `#>#` | supérieur |
| `#>=` | `#>=#` | supérieur ou égal |

**Attention à l'ordre des symboles** : inférieur ou égal s'écrit `#=<` (le = d'abord, comme en Prolog classique `=<`), jamais `#<=`. Supérieur ou égal s'écrit `#>=`, dans l'ordre habituel.

La version totale filtre plus de valeurs à chaque étape (moins de retours arrière) mais chaque propagation coûte plus cher. Voir le carré magique.

**Piège** : `#=` pose une contrainte entre variables FD ; `is` calcule une valeur Prolog immédiatement et sert seulement pour des compteurs déjà connus (`I1 is I + 1`).

## Contraintes booléennes (réifiées)

Une contrainte vaut 1 si elle est vraie, 0 sinon : on peut donc les combiner.

| Opérateur | Sens |
| --- | --- |
| `E1 #<=> E2` | équivalence |
| `E1 #\<=> E2` | non-équivalence |
| `E1 #==> E2` | implication |
| `#\ E` | non |
| `E1 #\/ E2` | ou |
| `E1 ## E2` | ou exclusif |
| `E1 #/\ E2` | et |

Exemple typique (disjonction d'ordonnancement) : `(Si + Pi #=< Sj) #\/ (Sj + Pj #=< Si)`.

## Contraintes sur les contraintes et contraintes de comptage

| Prédicat | Effet |
| --- | --- |
| `fd_cardinality([C1,…,Cn], N)` | N = nombre de contraintes vraies parmi C1…Cn |
| `fd_at_least_one(L)`, `fd_at_most_one(L)`, `fd_only_one(L)` | au moins une, au plus une, exactement une contrainte vraie |
| `fd_atmost(N, L, V)` | au plus N variables de L valent V |
| `fd_atleast(N, L, V)` | au moins N variables de L valent V |
| `fd_exactly(N, L, V)` | exactement N variables de L valent V |

## Contraintes symboliques

| Prédicat | Effet |
| --- | --- |
| `fd_all_different(L)` | valeurs toutes différentes deux à deux (contrainte globale « toutesDiff ») |
| `fd_relation([[0,1,2],[3,4,5]], [X,Y,Z])` | contrainte en extension : (X,Y,Z) = (0,1,2) ou (3,4,5) |
| `fd_element(I, [a1,…,an], X)` | X = I-ème entier de la liste |
| `fd_element_var(I, [V1,…,Vn], X)` | X = I-ème variable de la liste |

## Recherche : `fd_labeling`

Par défaut, `fd_labeling(L)` instancie les variables dans l'ordre de la liste, chacune de la plus petite à la plus grande valeur. Sur `;`, Prolog revient en arrière et cherche une autre solution.

| Option de `fd_labeling(L, Options)` | Effet |
| --- | --- |
| `variable_method(first_fail)` | « échec d'abord » : la variable au plus petit domaine en premier |
| `variable_method(most_constrained)` | first_fail, puis à égalité la variable qui apparaît dans le plus de contraintes |
| `value_method(max)` | valeurs de la plus grande à la plus petite |
| `value_method(middle)`, `value_method(random)` | du milieu vers l'extérieur, au hasard |
| `backtracks(B)` | B = nombre de retours arrière effectués |

## Pièges qui coûtent des points

- Oublier `fd_labeling` : Prolog répond avec des domaines réduits, pas avec une solution.
- Poser `fd_labeling` avant les contraintes : on énumère sans propager, c'est du générer-et-tester.
- Écrire `=` au lieu de `#=` : `=` unifie des termes, il ne calcule rien.
- Une variable FD négative (voir plus haut).
- Ne pas dire ce que représente chaque variable : c'est la moitié des points de la question « modéliser ».

## Ce qui tombe à l'examen

Dans 16 annales sur 17, la copie 1 demande d'écrire le CSP puis le programme GNU-Prolog : couverture de sommets (P18, A18), partition (A21, A23), ordonnancement à 2 machines (A16, identique à l'exercice 11), sel et moutarde avec contraintes booléennes (A25), Akari (A15), tomographie (A14), officiers d'Euler (A13). Depuis 2021, le rappel de syntaxe est donné dans l'énoncé (A25) : la difficulté est le modèle, pas la syntaxe.
