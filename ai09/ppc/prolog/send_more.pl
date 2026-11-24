% Ex 5 : SEND + MORE = MONEY
% Requête : ?- send([S,E,N,D,M,O,R,Y]).
send([S,E,N,D,M,O,R,Y]) :-
    fd_domain([S,E,N,D,M,O,R,Y], 0, 9),
    fd_all_different([S,E,N,D,M,O,R,Y]),
    S #\= 0, M #\= 0,
              1000*S + 100*E + 10*N + D
            + 1000*M + 100*O + 10*R + E
    #= 10000*M + 1000*O + 100*N + 10*E + Y,
    fd_labeling([S,E,N,D,M,O,R,Y]).
