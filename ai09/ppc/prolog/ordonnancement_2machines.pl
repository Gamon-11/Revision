% Annale A16 Ex I : mêmes 5 tâches, m = 2 machines identiques.
% Mi = machine de la tâche i. Requête : ?- ordo2(S, M, SommeC).
ordo2([S1,S2,S3,S4,S5], [M1,M2,M3,M4,M5], SommeC) :-
    fd_domain([S1,S2,S3,S4,S5], 0, 100),
    fd_domain([M1,M2,M3,M4,M5], 1, 2),
    S1 #>= 3, S1 + 5 #=< 18,
    S2 #>= 1, S2 + 6 #=< 10,
    S3 #>= 5, S3 + 2 #=< 14,
    S4 #>= 4, S4 + 1 #=< 12,
    S5 #>= 0, S5 + 4 #=< 22,
    % deux tâches ne se chevauchent que si elles sont sur des machines différentes
    disj(S1,5,M1, S2,6,M2), disj(S1,5,M1, S3,2,M3), disj(S1,5,M1, S4,1,M4),
    disj(S1,5,M1, S5,4,M5), disj(S2,6,M2, S3,2,M3), disj(S2,6,M2, S4,1,M4),
    disj(S2,6,M2, S5,4,M5), disj(S3,2,M3, S4,1,M4), disj(S3,2,M3, S5,4,M5),
    disj(S4,1,M4, S5,4,M5),
    SommeC #= (S1+5) + (S2+6) + (S3+2) + (S4+1) + (S5+4),
    fd_minimize(fd_labeling([M1,M2,M3,M4,M5,S1,S2,S3,S4,S5]), SommeC).

disj(Si,Pi,Mi, Sj,Pj,Mj) :-
    (Mi #\= Mj) #\/ (Si + Pi #=< Sj) #\/ (Sj + Pj #=< Si).
