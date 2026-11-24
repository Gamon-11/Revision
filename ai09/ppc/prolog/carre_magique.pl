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
