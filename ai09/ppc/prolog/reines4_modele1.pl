% Ex 2 : 4 reines, modèle 1 (Li = ligne, Ci = colonne de la reine i)
% Requête : ?- reines4([L1,L2,L3,L4], [C1,C2,C3,C4]).
reines4([L1,L2,L3,L4], [C1,C2,C3,C4]) :-
    fd_domain([L1,L2,L3,L4,C1,C2,C3,C4], 1, 4),
    fd_all_different([L1,L2,L3,L4]),          % lignes différentes
    fd_all_different([C1,C2,C3,C4]),          % colonnes différentes
    % diagonales montantes : C + L différents
    C1+L1 #\= C2+L2, C1+L1 #\= C3+L3, C1+L1 #\= C4+L4,
    C2+L2 #\= C3+L3, C2+L2 #\= C4+L4, C3+L3 #\= C4+L4,
    % diagonales descendantes : C - L différents
    C1-L1 #\= C2-L2, C1-L1 #\= C3-L3, C1-L1 #\= C4-L4,
    C2-L2 #\= C3-L3, C2-L2 #\= C4-L4, C3-L3 #\= C4-L4,
    fd_labeling([L1,L2,L3,L4,C1,C2,C3,C4]).
