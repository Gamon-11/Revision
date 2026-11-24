# Exercice 10 : sudoku

Lis l'énoncé, écris ta réponse sur papier, puis ouvre la correction.

## Énoncé

Écrire un programme GNU-Prolog qui complète la grille ci-dessous. On peut prendre les variables X11, X12, …, X99 (Xij = case de la ligne i, colonne j).

| | | | | | | | | |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| · | 3 | · | 4 | · | 5 | · | 7 | · |
| 6 | 2 | · | · | 8 | · | 4 | · | · |
| 7 | · | · | · | · | 1 | · | · | 9 |
| 2 | 4 | 6 | · | · | 3 | 8 | · | · |
| · | · | · | · | · | · | 2 | · | 3 |
| · | 1 | 3 | 6 | · | · | 9 | 5 | · |
| · | · | 8 | · | 4 | 7 | · | · | · |
| 1 | · | · | 9 | · | · | · | · | 6 |
| · | · | 9 | · | 5 | · | 3 | 8 | 2 |

## CSP

<details class="corr"><summary>Voir la correction</summary>

**Variables** : Xij pour i, j ∈ {1, …, 9}, soit 81 variables.

**Domaines** : {1, …, 9} ; les cases déjà remplies ont un domaine réduit à une valeur (X12 = 3, X14 = 4, …).

**Contraintes**, 27 contraintes globales :

- 9 lignes : toutesDiff(Xi1, …, Xi9) pour chaque i ;
- 9 colonnes : toutesDiff(X1j, …, X9j) pour chaque j ;
- 9 blocs 3 × 3 : toutesDiff des 9 cases de chaque bloc.

</details>

## Programme

<details class="corr"><summary>Indice</summary>

À l'examen, écrire les 27 `fd_all_different` à la main avec X11…X99 est accepté. Plus court : représenter la grille comme une liste de 9 lignes, mettre les chiffres connus directement et des `_` ailleurs, puis construire colonnes et blocs par des prédicats récursifs.

</details>

<details class="corr"><summary>Voir la correction</summary>

```prolog
% Ex 10 : sudoku. La grille est une liste de 9 lignes ; _ = case vide
% Requête : ?- sudoku(G), affiche(G).
sudoku(Lignes) :-
    Lignes = [[_,3,_,4,_,5,_,7,_],
              [6,2,_,_,8,_,4,_,_],
              [7,_,_,_,_,1,_,_,9],
              [2,4,6,_,_,3,8,_,_],
              [_,_,_,_,_,_,2,_,3],
              [_,1,3,6,_,_,9,5,_],
              [_,_,8,_,4,7,_,_,_],
              [1,_,_,9,_,_,_,_,6],
              [_,_,9,_,5,_,3,8,2]],
    tous_differents(Lignes),
    colonnes(Lignes, Colonnes), tous_differents(Colonnes),
    blocs(Lignes, Blocs),       tous_differents(Blocs),
    etiquetage(Lignes).

% chaque groupe de 9 cases prend les valeurs 1..9 toutes différentes
tous_differents([]).
tous_differents([G|Gs]) :-
    fd_domain(G, 1, 9),
    fd_all_different(G),
    tous_differents(Gs).

% transposée : la 1re colonne est formée des têtes de chaque ligne
colonnes([[]|_], []) :- !.
colonnes(Lignes, [Col|Cols]) :-
    tetes(Lignes, Col, Restes),
    colonnes(Restes, Cols).
tetes([], [], []).
tetes([[X|R]|Ls], [X|Xs], [R|Rs]) :- tetes(Ls, Xs, Rs).

% blocs 3x3 : on prend les lignes 3 par 3, puis les colonnes 3 par 3
blocs([], []).
blocs([L1,L2,L3|Ls], Bs) :-
    blocs3(L1, L2, L3, B1),
    blocs(Ls, B2),
    append(B1, B2, Bs).
blocs3([], [], [], []).
blocs3([A,B,C|R1], [D,E,F|R2], [G,H,I|R3], [[A,B,C,D,E,F,G,H,I]|Bs]) :-
    blocs3(R1, R2, R3, Bs).

etiquetage([]).
etiquetage([L|Ls]) :- fd_labeling(L), etiquetage(Ls).

affiche([]).
affiche([L|Ls]) :- write(L), nl, affiche(Ls).
```

[Télécharger sudoku.pl](/ai09/ppc/prolog/sudoku.pl)

Solution (unique) :

| | | | | | | | | |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 9 | **3** | 1 | **4** | 2 | **5** | 6 | **7** | 8 |
| **6** | **2** | 5 | 7 | **8** | 9 | **4** | 3 | 1 |
| **7** | 8 | 4 | 3 | 6 | **1** | 5 | 2 | **9** |
| **2** | **4** | **6** | 5 | 9 | **3** | **8** | 1 | 7 |
| 5 | 9 | 7 | 8 | 1 | 4 | **2** | 6 | **3** |
| 8 | **1** | **3** | **6** | 7 | 2 | **9** | **5** | 4 |
| 3 | 6 | **8** | 2 | **4** | **7** | 1 | 9 | 5 |
| **1** | 5 | 2 | **9** | 3 | 8 | 7 | 4 | **6** |
| 4 | 7 | **9** | 1 | **5** | 6 | **3** | **8** | **2** |

En gras, les chiffres donnés.

**Version « à la main » attendue à l'examen** (début) :

```prolog
sudoku([X11,X12,X13, ... ,X99]) :-
    fd_domain([X11,X12, ... ,X99], 1, 9),
    X12 #= 3, X14 #= 4, X16 #= 5, X18 #= 7,      % cases données
    ...
    fd_all_different([X11,X12,X13,X14,X15,X16,X17,X18,X19]),   % ligne 1
    ...
    fd_all_different([X11,X21,X31,X41,X51,X61,X71,X81,X91]),   % colonne 1
    ...
    fd_all_different([X11,X12,X13,X21,X22,X23,X31,X32,X33]),   % bloc 1
    ...
    fd_labeling([X11,X12, ... ,X99]).
```

</details>
