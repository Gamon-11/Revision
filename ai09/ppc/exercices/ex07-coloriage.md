# Exercice 7 : coloriage de carte en 4 couleurs

Lis l'énoncé, écris ta réponse sur papier, puis ouvre la correction.

## Énoncé

Écrire le programme GNU-Prolog qui colorie les régions ci-dessous de sorte que **deux régions ayant une frontière commune** aient des couleurs différentes. On dispose de 4 couleurs : bleu, rouge, jaune et vert (auxquelles on peut associer des entiers).

<svg viewBox="0 0 445 260" role="img" aria-label="Carte des six régions R1 à R6" style="max-width:420px;width:100%;display:block;margin:1em auto;font-family:inherit">
<g fill="none" stroke="currentColor" stroke-width="2">
<polygon points="8,7 225,7 225,32 70,32 70,105 8,105"/>
<rect x="70" y="32" width="155" height="73"/>
<rect x="42" y="105" width="183" height="126"/>
<rect x="225" y="19" width="212" height="183"/>
<rect x="225" y="68" width="78" height="97"/>
<rect x="225" y="202" width="185" height="48"/>
</g>
<g fill="currentColor" font-size="22" text-anchor="middle">
<text x="36" y="72">R2</text><text x="148" y="76">R3</text><text x="134" y="175">R1</text>
<text x="370" y="118">R5</text><text x="264" y="124">R4</text><text x="317" y="235">R6</text>
</g>
</svg>

<details class="corr"><summary>Indice</summary>

Commence par lister les frontières : c'est le seul vrai travail. Le reste est une contrainte ≠ par frontière.

</details>

## Frontières et CSP

<details class="corr"><summary>Voir la correction</summary>

**Frontières** (lues sur la figure, 11 en tout) :

| Région | Voisines |
| --- | --- |
| R1 | R2, R3, R4, R5, R6 |
| R2 | R1, R3, R5 |
| R3 | R1, R2, R4, R5 |
| R4 | R1, R3, R5 |
| R5 | R1, R2, R3, R4, R6 |
| R6 | R1, R5 |

**Variables** : R1, …, R6, la couleur de chaque région.

**Domaines** : {1, 2, 3, 4} avec 1 = bleu, 2 = rouge, 3 = jaune, 4 = vert.

**Contraintes** : Ri ≠ Rj pour chaque frontière (Ri, Rj).

C'est exactement la **coloration du graphe** dont les sommets sont les régions et les arêtes les frontières (vue en CM 01).

</details>

## Programme

<details class="corr"><summary>Voir la correction</summary>

```prolog
% Ex 7 : coloriage de carte. 1 = bleu, 2 = rouge, 3 = jaune, 4 = vert
% Requête : ?- carte([R1,R2,R3,R4,R5,R6]).
carte([R1,R2,R3,R4,R5,R6]) :-
    fd_domain([R1,R2,R3,R4,R5,R6], 1, 4),
    % une contrainte par frontière commune
    R1 #\= R2, R1 #\= R3, R1 #\= R4, R1 #\= R5, R1 #\= R6,
    R2 #\= R3, R2 #\= R5,
    R3 #\= R4, R3 #\= R5,
    R4 #\= R5,
    R5 #\= R6,
    fd_labeling([R1,R2,R3,R4,R5,R6]).
```

[Télécharger coloriage.pl](/ai09/ppc/prolog/coloriage.pl)

Solution : `[1,2,3,2,4,2]`, soit R1 bleu, R2 rouge, R3 jaune, R4 rouge, R5 vert, R6 rouge.

**Peut-on faire avec 3 couleurs ?** Non : R1, R3, R4 et R5 se touchent deux à deux (c'est une **clique de taille 4**), donc il faut au moins 4 couleurs. En remplaçant `1, 4` par `1, 3` dans `fd_domain`, Prolog répond `no`.

</details>
