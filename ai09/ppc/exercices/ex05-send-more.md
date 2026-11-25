# Exercice 5 : SEND + MORE = MONEY

Lis l'énoncé, écris ta réponse sur papier, puis ouvre la correction.

## Énoncé

Résoudre l'addition

```text
    S E N D
  + M O R E
  ---------
  M O N E Y
```

sachant que :

- chaque lettre correspond à un chiffre ;
- les lettres doivent avoir des valeurs différentes ;
- M et S doivent être différents de 0.

Écris le programme GNU-Prolog qui résout ce problème.

<details class="corr"><summary>Indice</summary>

Pas besoin de gérer les retenues : écris chaque mot comme un nombre (1000·S + 100·E + 10·N + D) et pose une seule égalité.

</details>

## CSP

<details class="corr"><summary>Voir la correction</summary>

**Variables** : S, E, N, D, M, O, R, Y (8 lettres distinctes).

**Domaines** : {0, …, 9} pour chacune.

**Contraintes** :

- toutesDiff(S, E, N, D, M, O, R, Y) ;
- S ≠ 0 et M ≠ 0 ;
- 1000S + 100E + 10N + D + 1000M + 100O + 10R + E = 10000M + 1000O + 100N + 10E + Y.

</details>

## Programme

<details class="corr"><summary>Voir la correction</summary>

```prolog
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
```

[Télécharger send_more.pl](/ai09/ppc/prolog/send_more.pl)

Solution unique : **9567 + 1085 = 10652**, soit S = 9, E = 5, N = 6, D = 7, M = 1, O = 0, R = 8, Y = 2.

</details>

## Variante avec retenues

Réécris le programme en posant **une équation par colonne**, comme une addition posée à la main, avec une variable de retenue par colonne.

<details class="corr"><summary>Indice</summary>

Dans chaque colonne : chiffre du haut + chiffre du bas + retenue reçue = chiffre du résultat + 10 × retenue envoyée. Une retenue vaut 0 ou 1.

</details>

<details class="corr"><summary>Voir la correction</summary>

**Variables en plus** : R1, R2, R3, R4 ∈ {0, 1}, la retenue envoyée par chaque colonne, de droite à gauche.

**Contraintes** (à la place de la grande égalité) :

| Colonne | Équation |
| --- | --- |
| unités | D + E = Y + 10·R1 |
| dizaines | N + R + R1 = E + 10·R2 |
| centaines | E + O + R2 = N + 10·R3 |
| milliers | S + M + R3 = O + 10·R4 |
| dix-milliers | M = R4 |

```prolog
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
```

[Télécharger send_more_retenues.pl](/ai09/ppc/prolog/send_more_retenues.pl)

Même solution unique : 9567 + 1085 = 10652.

**Laquelle choisir ?** Les deux sont justes. La version par colonnes suit le raisonnement fait à la main, et M = R4 avec M ≠ 0 donne directement M = 1. Mesuré en GNU-Prolog, la grande égalité propage pourtant un peu plus ici : avant la recherche, elle trouve S = 9, M = 1, O = 0 et E ∈ {4..7}, contre E ∈ {2..8} pour la version par colonnes. Elle fait 1 retour arrière contre 3. À l'examen, écris celle que l'énoncé demande, sinon la plus courte.

</details>
