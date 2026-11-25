% Ex 5, variante avec retenues : une équation par colonne
% R1..R4 = retenue de chaque colonne, de droite à gauche
% Requête : ?- send_r([S,E,N,D,M,O,R,Y]).
send_r([S,E,N,D,M,O,R,Y]) :-
    fd_domain([S,E,N,D,M,O,R,Y], 0, 9),
    fd_domain([R1,R2,R3,R4], 0, 1),
    fd_all_different([S,E,N,D,M,O,R,Y]),
    S #\= 0, M #\= 0,
    D + E      #= Y + 10*R1,          % unités
    N + R + R1 #= E + 10*R2,          % dizaines
    E + O + R2 #= N + 10*R3,          % centaines
    S + M + R3 #= O + 10*R4,          % milliers
    M #= R4,                          % dix-milliers : M est la dernière retenue
    fd_labeling([S,E,N,D,M,O,R,Y]).
