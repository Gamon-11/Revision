% Ex 3 : n reines, modèle 2 (Xi = ligne de la reine de la colonne i)
% Requête : ?- reines(8, Xs).
reines(N, Xs) :-
    length(Xs, N),                    % N variables X1..XN
    fd_domain(Xs, 1, N),
    fd_all_different(Xs),             % lignes différentes
    pas_en_prise(Xs),                 % diagonales différentes
    fd_labeling(Xs, [variable_method(first_fail)]).

% chaque reine est comparée à toutes celles qui sont à sa droite
pas_en_prise([]).
pas_en_prise([X|Xs]) :-
    pas_attaque(X, Xs, 1),
    pas_en_prise(Xs).

% D = écart de colonnes entre X et Y
pas_attaque(_, [], _).
pas_attaque(X, [Y|Ys], D) :-
    X + D #\= Y,                      % même diagonale montante
    X - D #\= Y,                      % même diagonale descendante
    D1 is D + 1,
    pas_attaque(X, Ys, D1).
