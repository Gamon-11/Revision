# Exercice 8 : construire sa maison

Lis l'énoncé, écris ta réponse sur papier, puis ouvre la correction.

## Énoncé

Écrire le programme GNU-Prolog qui trouve un agenda pour mener à bien, **en un minimum de temps**, les tâches de construction d'une maison. L'horizon de temps commence à la date 0. Il faut trouver les dates de démarrage des 10 tâches, qui peuvent nécessiter l'achèvement d'autres tâches (contraintes de précédence). **Il n'y a pas de contrainte de ressource** : des tâches peuvent se faire en parallèle.

| Code | Nom | Durée | Nécessite |
| --- | --- | --- | --- |
| a | maçonnerie | 7 | |
| b | charpente | 3 | a |
| c | toit | 1 | b |
| d | sanitaire | 8 | a |
| e | façade | 2 | d, c |
| f | fenêtres | 1 | d, c |
| g | jardin | 1 | d, c |
| h | plafond | 3 | f |
| i | peinture | 2 | h |
| j | emménagement | 1 | e, g, i |

<details class="corr"><summary>Indice</summary>

« j nécessite i » se traduit par : j ne commence pas avant la fin de i, soit Tj ≥ Ti + durée(i). L'objectif est la date de fin de la dernière tâche.

</details>

## CSP

<details class="corr"><summary>Voir la correction</summary>

**Variables** : Ta, …, Tj, la date de début de chaque tâche, et Fin, la date de fin du chantier.

**Domaines** : {0, …, H} avec H un horizon assez grand, par exemple la somme des durées (29) : en faisant tout à la suite on finit forcément avant.

**Contraintes de précédence** : pour chaque tâche y qui nécessite x, Ty ≥ Tx + px. Il y en a 14 (une par ligne et par prédécesseur du tableau).

**Objectif** : Fin = Tj + 1 (j est la dernière tâche), à **minimiser**.

</details>

## Programme

<details class="corr"><summary>Voir la correction</summary>

```prolog
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
```

[Télécharger maison.pl](/ai09/ppc/prolog/maison.pl)

Résultat : **Fin = 22**, avec a = 0, b = 7, c = 10, d = 7, e = 15, f = 15, g = 15, h = 16, i = 19, j = 21.

**Vérification par le chemin critique** : a → d → f → h → i → j dure 7 + 8 + 1 + 3 + 2 + 1 = 22. Aucun calendrier ne peut faire mieux que la durée du plus long chemin, et sans ressource on l'atteint toujours. C'est la même logique que les dates au plus tôt de l'annale A14 Ex III.

</details>
