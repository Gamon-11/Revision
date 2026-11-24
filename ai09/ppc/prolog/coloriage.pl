% Ex 7 : coloriage de carte. 1 = bleu, 2 = rouge, 3 = jaune, 4 = vert
% Requête : ?- carte([R1,R2,R3,R4,R5,R6]).
carte([R1,R2,R3,R4,R5,R6]) :-
    fd_domain([R1,R2,R3,R4,R5,R6], 1, 4),
    % une contrainte par frontière commune
    R1 #\= R2, R1 #\= R3, R1 #\= R4, R1 #\= R5, R1 #\= R6,
    R2 #\= R3, R2 #\= R5,
    R3 #\= R4, R3 #\= R5,
    R4 #\= R5,
    R5 #\= R6,
    fd_labeling([R1,R2,R3,R4,R5,R6]).
