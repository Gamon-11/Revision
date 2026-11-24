# Exercices 1 à 3 : les reines

Lis l'énoncé, écris ta réponse sur papier, puis ouvre la correction. Chaque correction a été vérifiée en GNU-Prolog.

## Énoncé

Il s'agit de placer **4 reines** sur un échiquier de 4 lignes et 4 colonnes, de manière à ce qu'aucune reine ne soit en prise. Deux reines sont en prise si elles se trouvent sur **une même ligne, une même colonne ou une même diagonale**.

Lignes et colonnes sont numérotées de 1 à 4.

## Exercice 1 : CSP du modèle 1

**Modèle 1** : on associe à chaque reine i deux variables Li et Ci, la ligne et la colonne où la placer. Écris le CSP correspondant (variables, domaines, contraintes).

<details class="corr"><summary>Indice</summary>

Deux cases (l, c) et (l', c') sont sur la même diagonale montante si c + l = c' + l', et sur la même diagonale descendante si c − l = c' − l'.

</details>

<details class="corr"><summary>Voir la correction</summary>

**Variables** : X = {L1, L2, L3, L4, C1, C2, C3, C4}.

**Domaines** : D(Li) = D(Ci) = {1, 2, 3, 4} pour i = 1…4.

**Contraintes**, quatre familles :

- lignes différentes : Clig = {L1≠L2, L1≠L3, L1≠L4, L2≠L3, L2≠L4, L3≠L4} ;
- colonnes différentes : Ccol = {C1≠C2, C1≠C3, …, C3≠C4} ;
- diagonales montantes différentes : Cdm = {Ci + Li ≠ Cj + Lj, pour i < j} ;
- diagonales descendantes différentes : Cdd = {Ci − Li ≠ Cj − Lj, pour i < j}.

C = Clig ∪ Ccol ∪ Cdm ∪ Cdd, soit 4 × 6 = 24 contraintes binaires.

**Modèle 1 bis** : on remplace les deux premières familles par des contraintes globales, Clig = toutesDiff({L1, L2, L3, L4}) et Ccol = toutesDiff({C1, C2, C3, C4}).

Une solution : (C1, L1) = (1, 2), (C2, L2) = (2, 4), (C3, L3) = (3, 1), (C4, L4) = (4, 3).

</details>

## Exercice 2 : programme du modèle 1

Écris le programme GNU-Prolog qui résout le problème des 4 reines avec le modèle 1.

<details class="corr"><summary>Voir la correction</summary>

```prolog
% Ex 2 : 4 reines, modèle 1 (Li = ligne, Ci = colonne de la reine i)
% Requête : ?- reines4([L1,L2,L3,L4], [C1,C2,C3,C4]).
reines4([L1,L2,L3,L4], [C1,C2,C3,C4]) :-
    fd_domain([L1,L2,L3,L4,C1,C2,C3,C4], 1, 4),
    fd_all_different([L1,L2,L3,L4]),          % lignes différentes
    fd_all_different([C1,C2,C3,C4]),          % colonnes différentes
    % diagonales montantes : C + L différents
    C1+L1 #\= C2+L2, C1+L1 #\= C3+L3, C1+L1 #\= C4+L4,
    C2+L2 #\= C3+L3, C2+L2 #\= C4+L4, C3+L3 #\= C4+L4,
    % diagonales descendantes : C - L différents
    C1-L1 #\= C2-L2, C1-L1 #\= C3-L3, C1-L1 #\= C4-L4,
    C2-L2 #\= C3-L3, C2-L2 #\= C4-L4, C3-L3 #\= C4-L4,
    fd_labeling([L1,L2,L3,L4,C1,C2,C3,C4]).
```

[Télécharger reines4_modele1.pl](/ai09/ppc/prolog/reines4_modele1.pl)

Prolog répond `L = [1,2,3,4], C = [2,4,1,3]` : la reine de la ligne 1 est en colonne 2, etc.

**À remarquer** : ce modèle trouve **48 solutions**, alors que l'échiquier n'en a que 2. Les reines sont interchangeables, donc chaque placement apparaît 4! = 24 fois (une par façon de numéroter les reines). Ajouter `L1 #< L2, L2 #< L3, L3 #< L4` (ou fixer Li = i) casse cette symétrie, et on retombe sur le modèle 2.

</details>

## Exercice 2 bis : CSP du modèle 2

**Modèle 2** : comme il y a exactement une reine par colonne, on associe une variable Xi à chaque colonne i : Xi est la ligne de la reine de la colonne i. Écris le CSP.

<details class="corr"><summary>Voir la correction</summary>

**Variables** : X = {X1, X2, X3, X4}.

**Domaines** : D(Xi) = {1, 2, 3, 4}.

**Contraintes** :

- lignes différentes : toutesDiff(X1, …, Xn) ;
- diagonales montantes différentes : toutesDiff(X1 + 1, …, Xn + n) ;
- diagonales descendantes différentes : toutesDiff(X1 − 1, …, Xn − n).

Les colonnes sont différentes **par construction** : il n'y a plus de contrainte à poser. C'est pour cela que l'espace de recherche est bien plus petit (4⁴ = 256 affectations au lieu de 4⁸ = 65 536).

Solutions : (X1, X2, X3, X4) = (2, 4, 1, 3) ou (3, 1, 4, 2).

</details>

## Exercice 3 : n reines avec le modèle 2

Écris le programme GNU-Prolog qui résout le problème des **n reines** avec le modèle 2.

<details class="corr"><summary>Indice</summary>

Tu ne peux pas écrire les variables à la main : crée la liste avec `length(Xs, N)`, puis parcours-la récursivement en comparant chaque reine à toutes celles qui sont à sa droite, en gardant l'écart de colonnes D.

</details>

<details class="corr"><summary>Voir la correction</summary>

```prolog
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
```

[Télécharger reines_n.pl](/ai09/ppc/prolog/reines_n.pl)

`reines(8, Xs)` donne `[1,5,8,6,3,7,2,4]` ; il y a 92 solutions pour n = 8, et `first_fail` trouve une solution pour n = 30 instantanément.

**Pourquoi pas `fd_all_different` sur les Xi + i ?** C'est la traduction directe du CSP et c'est correct, mais il faut créer des variables auxiliaires Mi #= Xi + i et Di #= Xi − i. Or **une variable FD ne peut pas être négative** : Di #= Xi − i échoue dès que Xi < i. Il faut alors décaler (Di #= Xi − i + n). La version par paires ci-dessus évite le problème.

</details>

## Quel modèle choisir ?

<details class="corr"><summary>Voir la réponse du TD</summary>

Il n'y a pas une seule réponse :

- pour **coller à la réalité**, les deux modèles sont équivalents ;
- pour **être facile à trouver**, le modèle 1 est plus direct ;
- pour **résoudre efficacement**, le modèle 2 est meilleur : il intègre une déduction (une reine par colonne) dans le choix des variables, donc l'espace de recherche est plus petit et il n'y a pas de symétries inutiles.

</details>
