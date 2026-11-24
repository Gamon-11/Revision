# Exercice 9 : carré magique

Lis l'énoncé, écris ta réponse sur papier, puis ouvre la correction. Cet exercice sert surtout à comprendre ce que changent la consistance et les heuristiques de `fd_labeling`.

## Énoncé

Le carré magique d'ordre N est un carré N × N de nombres où **la somme de chaque ligne, de chaque colonne et de chacune des deux grandes diagonales est la même**. On ne cherche que les carrés qui contiennent les nombres de 1 à N².

1. Écrire le programme GNU-Prolog qui trouve les carrés magiques d'ordre 3.
2. Remplacer les contraintes en consistance d'arc **partielle** par des contraintes en consistance d'arc **totale**. Qu'observe-t-on ? (Utiliser l'option `backtracks` de `fd_labeling` pour compter les échecs dans les deux versions.)
3. Essayer différentes heuristiques de `fd_labeling` et observer le nombre d'échecs.

## Question 1 : carrés d'ordre 3

<details class="corr"><summary>Indice</summary>

La somme commune n'est pas une inconnue : 1 + 2 + … + 9 = 45 se répartit sur 3 lignes.

</details>

<details class="corr"><summary>Voir la correction</summary>

**Variables** : les 9 cases A B C / D E F / G H I. **Domaines** : {1, …, 9}.

**Contraintes** : toutesDiff des 9 cases (chaque nombre une seule fois), puis 8 sommes égales à **15** = 45 / 3 (3 lignes, 3 colonnes, 2 diagonales).

```prolog
% Ex 9 : carré magique d'ordre 3, cases A B C / D E F / G H I
% Somme magique = (1 + 2 + ... + 9) / 3 = 15
% Requêtes : ?- magique(L).
%            ?- magique_bt(L, partielle, [], B).
%            ?- magique_bt(L, totale, [variable_method(most_constrained)], B).
magique([A,B,C,D,E,F,G,H,I]) :-
    fd_domain([A,B,C,D,E,F,G,H,I], 1, 9),
    fd_all_different([A,B,C,D,E,F,G,H,I]),
    A+B+C #= 15, D+E+F #= 15, G+H+I #= 15,     % lignes
    A+D+G #= 15, B+E+H #= 15, C+F+I #= 15,     % colonnes
    A+E+I #= 15, C+E+G #= 15,                  % diagonales
    fd_labeling([A,B,C,D,E,F,G,H,I]).

% Version pour comparer : Mode = partielle (#=) ou totale (#=#),
% Opts = options de fd_labeling, B = nombre de retours arrière
magique_bt(L, Mode, Opts, B) :-
    L = [A,B1,C,D,E,F,G,H,I],
    fd_domain(L, 1, 9),
    fd_all_different(L),
    somme(Mode, [A,B1,C]), somme(Mode, [D,E,F]), somme(Mode, [G,H,I]),
    somme(Mode, [A,D,G]), somme(Mode, [B1,E,H]), somme(Mode, [C,F,I]),
    somme(Mode, [A,E,I]), somme(Mode, [C,E,G]),
    fd_labeling(L, [backtracks(B)|Opts]).

somme(partielle, [X,Y,Z]) :- X+Y+Z #= 15.
somme(totale,    [X,Y,Z]) :- X+Y+Z #=# 15.
```

[Télécharger carre_magique.pl](/ai09/ppc/prolog/carre_magique.pl)

Première solution :

| | | |
| --- | --- | --- |
| 2 | 7 | 6 |
| 9 | 5 | 1 |
| 4 | 3 | 8 |

Il y a **8 solutions**, qui sont toutes le même carré tourné ou retourné (4 rotations × 2 symétries). La case centrale vaut toujours 5.

</details>

## Question 2 : consistance partielle ou totale

<details class="corr"><summary>Voir la correction</summary>

On remplace `#=` par `#=#` dans les 8 sommes (`magique_bt(L, totale, [], B)`). Mesures avec GNU-Prolog 1.4.5, en comptant les retours arrière cumulés pour énumérer les 8 solutions :

| Version | 1re solution | Les 8 solutions |
| --- | --- | --- |
| Partielle `#=` | 2 | 45 |
| Totale `#=#` | 2 | 33 |

**Ce qu'on observe** : la consistance totale fait **moins de retours arrière** (33 contre 45). Avec `#=`, GNU-Prolog ne réduit que les **bornes** des domaines (min et max) ; avec `#=#`, il retire aussi les valeurs intérieures qui ne peuvent mener à aucune solution. Plus de filtrage, donc moins d'impasses, mais chaque propagation coûte plus cher. Sur un si petit problème, le temps total ne change presque pas.

</details>

## Question 3 : heuristiques

<details class="corr"><summary>Voir la correction</summary>

Retours arrière cumulés pour énumérer les 8 solutions :

| Options de `fd_labeling` | Partielle | Totale |
| --- | --- | --- |
| aucune (ordre de la liste, plus petite valeur d'abord) | 45 | 33 |
| `variable_method(first_fail)` | 45 | 33 |
| `variable_method(most_constrained)` | **19** | **19** |
| `value_method(max)` | 45 | 33 |
| `first_fail` + `value_method(middle)` | 51 | 33 |

**Ce qu'on observe** : `most_constrained` divise les échecs par plus de 2. Au départ tous les domaines ont la même taille, donc `first_fail` ne départage rien ; `most_constrained` choisit alors la variable présente dans le plus de contraintes, c'est-à-dire **la case centrale E**, présente dans 4 sommes (une ligne, une colonne, deux diagonales). Fixer d'abord les variables les plus contraintes propage le plus tôt possible.

La règle à retenir pour la copie : **variable la plus contrainte d'abord, valeur la moins contraignante d'abord**.

</details>
