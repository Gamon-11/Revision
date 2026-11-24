# Exercice 6 : retour de monnaie

Lis l'énoncé, écris ta réponse sur papier, puis ouvre la correction.

## Énoncé

Un distributeur automatique de boissons reçoit des pièces pour un total de **T centimes**, puis l'utilisateur choisit une boisson de prix **P centimes** (T et P multiples de 10). Il faut calculer la monnaie à rendre, sachant que le distributeur a en réserve **E2** pièces de 2 €, **E1** pièces de 1 €, **C50** pièces de 50 centimes, **C20** pièces de 20 centimes et **C10** pièces de 10 centimes.

1. Modéliser le problème sous forme d'un CSP.
2. Comment exprimer que le distributeur doit rendre **le moins de pièces possible** ?
3. Écrire les programmes Prolog correspondants.

## Question 1 : CSP

<details class="corr"><summary>Indice</summary>

Les inconnues sont le nombre de pièces de chaque sorte à rendre. Le stock donne le domaine.

</details>

<details class="corr"><summary>Voir la correction</summary>

**Paramètres** : T, P, E2, E1, C50, C20, C10.

**Variables** : X2, X1, X50, X20, X10, le nombre de pièces de 2 €, 1 €, 50, 20 et 10 centimes rendues.

**Domaines** : D(X2) = {0, …, E2}, D(X1) = {0, …, E1}, D(X50) = {0, …, C50}, D(X20) = {0, …, C20}, D(X10) = {0, …, C10}. On ne peut pas rendre plus de pièces qu'il n'y en a en réserve.

**Contrainte** : 200·X2 + 100·X1 + 50·X50 + 20·X20 + 10·X10 = T − P.

Si T < P ou si le stock ne permet pas de faire T − P, le CSP n'a pas de solution : le distributeur doit refuser la vente.

</details>

## Question 2 : le moins de pièces possible

<details class="corr"><summary>Voir la correction</summary>

On ajoute une variable de coût et on passe d'un problème de **satisfaction** à un problème d'**optimisation** :

- Nb = X2 + X1 + X50 + X20 + X10 ;
- on cherche la solution qui **minimise Nb**.

En GNU-Prolog : `fd_minimize(fd_labeling(Vars), Nb)`. Le solveur trouve une solution, puis ajoute la contrainte Nb < valeur trouvée et recommence, jusqu'à ce qu'il n'y en ait plus : la dernière trouvée est optimale.

**Pourquoi pas l'algorithme glouton** (rendre d'abord les plus grosses pièces) ? Il échoue quand le stock est limité. Pour rendre 60 c avec une pièce de 50 c, trois de 20 c et aucune de 10 c, le glouton prend 50 c puis reste bloqué à 10 c, alors que 3 × 20 c marche. Le CSP explore toutes les combinaisons, donc il trouve toujours une solution s'il en existe une.

</details>

## Question 3 : programmes

<details class="corr"><summary>Voir la correction</summary>

```prolog
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
```

[Télécharger monnaie.pl](/ai09/ppc/prolog/monnaie.pl)

Avec T = 500, P = 230 (270 c à rendre) et le stock [2, 3, 4, 5, 5] :

- `monnaie` rend `[0,0,3,4,4]`, soit 3 × 50 + 4 × 20 + 4 × 10 = 270 en 11 pièces (première solution trouvée, pas la meilleure) ;
- `monnaie_min` rend `[1,0,1,1,0]`, soit 2 € + 50 c + 20 c, **3 pièces**.

Avec le stock [0, 1, 1, 10, 10], `monnaie_min` rend 1 € + 50 c + 6 × 20 c = 8 pièces.

</details>
