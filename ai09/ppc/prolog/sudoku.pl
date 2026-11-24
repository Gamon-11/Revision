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
