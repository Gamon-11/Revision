% Ex 11 : une machine, 5 tâches. Si = date de début de Ji
% ri = disponibilité, pi = durée, di = date échue
% Requêtes : ?- ordo(S, Cmax, SommeC).          (un ordonnancement valide)
%            ?- ordo_cmax(S, Cmax).             (finir le plus tôt possible)
%            ?- ordo_somme(S, SommeC).          (minimiser la somme des fins)
contraintes([S1,S2,S3,S4,S5], Cmax, SommeC) :-
    fd_domain([S1,S2,S3,S4,S5], 0, 100),
    % ri =< Si  et  Si + pi =< di
    S1 #>= 3, S1 + 5 #=< 18,
    S2 #>= 1, S2 + 6 #=< 10,
    S3 #>= 5, S3 + 2 #=< 14,
    S4 #>= 4, S4 + 1 #=< 12,
    S5 #>= 0, S5 + 4 #=< 22,
    % disjonction : pour chaque paire, i avant j OU j avant i
    disj(S1,5, S2,6), disj(S1,5, S3,2), disj(S1,5, S4,1), disj(S1,5, S5,4),
    disj(S2,6, S3,2), disj(S2,6, S4,1), disj(S2,6, S5,4),
    disj(S3,2, S4,1), disj(S3,2, S5,4),
    disj(S4,1, S5,4),
    % objectifs
    Cmax #= max(max(max(S1+5, S2+6), max(S3+2, S4+1)), S5+4),
    SommeC #= (S1+5) + (S2+6) + (S3+2) + (S4+1) + (S5+4).

disj(Si, Pi, Sj, Pj) :- (Si + Pi #=< Sj) #\/ (Sj + Pj #=< Si).

ordo(S, Cmax, SommeC) :-
    contraintes(S, Cmax, SommeC), fd_labeling(S).
ordo_cmax(S, Cmax) :-
    contraintes(S, Cmax, _), fd_minimize(fd_labeling(S), Cmax).
ordo_somme(S, SommeC) :-
    contraintes(S, _, SommeC), fd_minimize(fd_labeling(S), SommeC).
