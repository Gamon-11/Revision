% Ex 6 : retour de monnaie. Montants en centimes.
% Stock = [E2,E1,C50,C20,C10], Rendu = [X2,X1,X50,X20,X10]
% Requêtes : ?- monnaie(500, 230, [2,3,4,5,5], R).
%            ?- monnaie_min(500, 230, [2,3,4,5,5], R, Nb).
contraintes(T, P, [E2,E1,C50,C20,C10], [X2,X1,X50,X20,X10]) :-
    fd_domain(X2, 0, E2),             % on ne rend pas plus que le stock
    fd_domain(X1, 0, E1),
    fd_domain(X50, 0, C50),
    fd_domain(X20, 0, C20),
    fd_domain(X10, 0, C10),
    200*X2 + 100*X1 + 50*X50 + 20*X20 + 10*X10 #= T - P.

% Question 1 : une façon quelconque de rendre la monnaie
monnaie(T, P, Stock, Rendu) :-
    contraintes(T, P, Stock, Rendu),
    fd_labeling(Rendu).

% Question 2 : le moins de pièces possible
monnaie_min(T, P, Stock, Rendu, Nb) :-
    contraintes(T, P, Stock, Rendu),
    Rendu = [X2,X1,X50,X20,X10],
    Nb #= X2 + X1 + X50 + X20 + X10,
    fd_minimize(fd_labeling(Rendu), Nb).
