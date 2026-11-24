# Exercice 4 : car sequencing

Lis l'énoncé, écris ta réponse sur papier, puis ouvre la correction.

## Énoncé

On a **8 voitures** à peindre avec une couleur parmi 3 : vert, jaune et bleu. À cause des limitations de la chaîne d'assemblage :

- **pas plus de 3** voitures ne peuvent être peintes en vert ;
- **exactement 3** voitures doivent être peintes en jaune ;
- **pas plus de 2** voitures ne peuvent être peintes en bleu ;
- la **première** voiture de la chaîne ne peut pas être peinte en vert.

Écris un programme GNU-Prolog qui résout cette instance du problème de car sequencing.

<details class="corr"><summary>Indice</summary>

Une variable par voiture (sa couleur), un entier par couleur. Toutes les contraintes de quantité s'écrivent avec un seul prédicat de comptage chacune.

</details>

## CSP

<details class="corr"><summary>Voir la correction</summary>

**Variables** : V1, …, V8, la couleur de la voiture en position i sur la chaîne.

**Domaines** : D(Vi) = {1, 2, 3} avec 1 = vert, 2 = jaune, 3 = bleu.

**Contraintes** :

- au plus 3 des Vi valent 1 ;
- exactement 3 des Vi valent 2 ;
- au plus 2 des Vi valent 3 ;
- V1 ≠ 1.

</details>

## Programme

<details class="corr"><summary>Voir la correction</summary>

```prolog
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
```

[Télécharger car_sequencing.pl](/ai09/ppc/prolog/car_sequencing.pl)

Première solution : `[2,1,1,1,2,2,3,3]`, soit jaune, vert, vert, vert, jaune, jaune, bleu, bleu. Il y a 350 solutions en tout.

**À remarquer** : avec 8 voitures, 3 jaunes, au plus 3 vertes et au plus 2 bleues, on a forcément **exactement 3 vertes et 2 bleues** (3 + 3 + 2 = 8). Le solveur le déduit tout seul par propagation.

**Sans `fd_exactly`**, on peut compter avec des contraintes réifiées : `fd_cardinality([V1 #= 2, V2 #= 2, …, V8 #= 2], 3)`. C'est plus long, mais c'est la même idée que dans l'énigme sel et moutarde (A25).

</details>
