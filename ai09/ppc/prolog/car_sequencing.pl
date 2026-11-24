% Ex 4 : car sequencing. Couleurs : 1 = vert, 2 = jaune, 3 = bleu
% Requête : ?- voitures(L).
voitures(L) :-
    length(L, 8),                     % 8 voitures dans l'ordre de la chaîne
    fd_domain(L, 1, 3),
    fd_atmost(3, L, 1),               % au plus 3 vertes
    fd_exactly(3, L, 2),              % exactement 3 jaunes
    fd_atmost(2, L, 3),               % au plus 2 bleues
    L = [V1|_],
    V1 #\= 1,                         % la première n'est pas verte
    fd_labeling(L).
