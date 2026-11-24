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

**Variante avec retenues** : on peut aussi introduire des retenues R1, R2, R3, R4 ∈ {0, 1} et poser une égalité par colonne (D + E = Y + 10·R1, etc.). C'est plus long à écrire mais la propagation est plus forte : utile si on te demande de comparer deux modèles.

</details>
