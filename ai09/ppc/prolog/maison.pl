% Ex 8 : construire sa maison. Ti = date de début de la tâche i
% Requête : ?- maison(Debuts, Fin).
maison([Ta,Tb,Tc,Td,Te,Tf,Tg,Th,Ti,Tj], Fin) :-
    fd_domain([Ta,Tb,Tc,Td,Te,Tf,Tg,Th,Ti,Tj], 0, 50),   % 50 > somme des durées (29)
    % précédences : Tsuivante >= Tprécédente + durée(précédente)
    Tb #>= Ta + 7,                    % charpente après maçonnerie
    Td #>= Ta + 7,                    % sanitaire après maçonnerie
    Tc #>= Tb + 3,                    % toit après charpente
    Te #>= Td + 8, Te #>= Tc + 1,     % façade
    Tf #>= Td + 8, Tf #>= Tc + 1,     % fenêtres
    Tg #>= Td + 8, Tg #>= Tc + 1,     % jardin
    Th #>= Tf + 1,                    % plafond après fenêtres
    Ti #>= Th + 3,                    % peinture après plafond
    Tj #>= Te + 2, Tj #>= Tg + 1, Tj #>= Ti + 2,   % emménagement
    Fin #= Tj + 1,
    fd_minimize(fd_labeling([Ta,Tb,Tc,Td,Te,Tf,Tg,Th,Ti,Tj]), Fin).
