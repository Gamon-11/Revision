# Exercice 11 : ordonnancement sur une machine

Lis l'énoncé, écris ta réponse sur papier, puis ouvre la correction. **Cet exercice est tombé presque tel quel en A16 (Ex I)**, avec 2 machines au lieu d'une : la version annale est en fin de page.

## Énoncé

Un problème d'ordonnancement consiste à déterminer les dates d'exécution d'activités qui utilisent une ou des quantités connues d'un ensemble donné de ressources dont les capacités sont limitées.

On dispose d'**une machine** et de n tâches à ordonnancer dessus. La machine ne peut exécuter **qu'une seule tâche à la fois**. Pour chaque tâche Ji, on connaît sa **date de disponibilité ri**, sa **durée pi** et sa **date échue di**.

1. Écrire un CSP qui détermine un ordonnancement valide des tâches.
2. L'appliquer en GNU-Prolog à l'instance suivante :

| Tâche | r | p | d |
| --- | --- | --- | --- |
| J1 | 3 | 5 | 18 |
| J2 | 1 | 6 | 10 |
| J3 | 5 | 2 | 14 |
| J4 | 4 | 1 | 12 |
| J5 | 0 | 4 | 22 |

3. Compléter le CSP pour trouver l'ordonnancement qui **finit le plus tôt possible**.
4. Compléter le CSP pour trouver l'ordonnancement qui **minimise la somme des dates de fin**.

## Question 1 : CSP

<details class="corr"><summary>Indice</summary>

Une variable par tâche : sa date de début Si. « Une seule tâche à la fois » se traduit, pour chaque paire, par un OU entre deux ordres possibles.

</details>

<details class="corr"><summary>Voir la correction</summary>

**Variables** : S1, …, Sn, la date de début de chaque tâche.

**Domaines** : D(Si) = {ri, …, di − pi}. On peut aussi écrire {0, …, H} et poser les deux contraintes ci-dessous.

**Contraintes** :

- disponibilité : Si ≥ ri ;
- date échue : Si + pi ≤ di ;
- **disjonction** (une seule tâche à la fois) : pour toute paire i < j, **Si + pi ≤ Sj ou Sj + pj ≤ Si** (i finit avant que j commence, ou l'inverse).

Il y a n(n − 1)/2 contraintes de disjonction, soit 10 pour 5 tâches. Ce sont des contraintes **réifiées** : en GNU-Prolog, `#\/` entre deux contraintes.

</details>

## Questions 2 à 4 : programme

<details class="corr"><summary>Voir la correction</summary>

On note Ci = Si + pi la date de fin de Ji.

- Q3 : minimiser **Cmax = max Ci** (le makespan).
- Q4 : minimiser **Σ Ci**.

```prolog
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
```

[Télécharger ordonnancement.pl](/ai09/ppc/prolog/ordonnancement.pl)

**Résultats** :

| Requête | S1 | S2 | S3 | S4 | S5 | Objectif |
| --- | --- | --- | --- | --- | --- | --- |
| `ordo` (valide, sans objectif) | 10 | 1 | 7 | 9 | 15 | Cmax = 19, ΣC = 60 |
| `ordo_cmax` | 13 | 4 | 11 | 10 | 0 | **Cmax = 18** |
| `ordo_somme` | 13 | 4 | 11 | 10 | 0 | **ΣC = 56** |

Dans l'ordonnancement optimal, la machine enchaîne J5 [0, 4], J2 [4, 10], J4 [10, 11], J3 [11, 13], J1 [13, 18] sans aucun temps mort. Ici, les deux objectifs donnent le même ordonnancement, mais ce n'est pas vrai en général.

**Pourquoi 18 est optimal** : la somme des durées vaut 18 et la machine ne peut commencer qu'à 0 ; il faut donc au moins 18.

</details>

## Version annale A16 Ex I : 2 machines identiques

L'énoncé d'A16 reprend la même instance avec **m = 2 machines identiques** (une tâche ne s'exécute que sur une machine, chaque machine une tâche à la fois) et demande l'ordonnancement valide qui **minimise la somme des dates de fin**.

<details class="corr"><summary>Indice</summary>

Ajoute une variable Mi ∈ {1, 2} par tâche (sa machine). Deux tâches peuvent se chevaucher si elles sont sur des machines différentes : la disjonction gagne un troisième terme.

</details>

<details class="corr"><summary>Voir la correction</summary>

```prolog
% Annale A16 Ex I : mêmes 5 tâches, m = 2 machines identiques.
% Mi = machine de la tâche i. Requête : ?- ordo2(S, M, SommeC).
ordo2([S1,S2,S3,S4,S5], [M1,M2,M3,M4,M5], SommeC) :-
    fd_domain([S1,S2,S3,S4,S5], 0, 100),
    fd_domain([M1,M2,M3,M4,M5], 1, 2),
    S1 #>= 3, S1 + 5 #=< 18,
    S2 #>= 1, S2 + 6 #=< 10,
    S3 #>= 5, S3 + 2 #=< 14,
    S4 #>= 4, S4 + 1 #=< 12,
    S5 #>= 0, S5 + 4 #=< 22,
    % deux tâches ne se chevauchent que si elles sont sur des machines différentes
    disj(S1,5,M1, S2,6,M2), disj(S1,5,M1, S3,2,M3), disj(S1,5,M1, S4,1,M4),
    disj(S1,5,M1, S5,4,M5), disj(S2,6,M2, S3,2,M3), disj(S2,6,M2, S4,1,M4),
    disj(S2,6,M2, S5,4,M5), disj(S3,2,M3, S4,1,M4), disj(S3,2,M3, S5,4,M5),
    disj(S4,1,M4, S5,4,M5),
    SommeC #= (S1+5) + (S2+6) + (S3+2) + (S4+1) + (S5+4),
    fd_minimize(fd_labeling([M1,M2,M3,M4,M5,S1,S2,S3,S4,S5]), SommeC).

disj(Si,Pi,Mi, Sj,Pj,Mj) :-
    (Mi #\= Mj) #\/ (Si + Pi #=< Sj) #\/ (Sj + Pj #=< Si).
```

[Télécharger ordonnancement_2machines.pl](/ai09/ppc/prolog/ordonnancement_2machines.pl)

Résultat : **ΣC = 35**. Machine 1 : J2 [1, 7] puis J1 [7, 12]. Machine 2 : J5 [0, 4], J4 [4, 5], J3 [5, 7].

**Borne de contrôle** : chaque tâche finit au plus tôt à ri + pi, soit 8 + 7 + 7 + 5 + 4 = 31. Les 4 unités d'écart viennent des tâches qui se gênent sur une même machine ; `fd_minimize` prouve qu'on ne peut pas descendre sous 35.

</details>
