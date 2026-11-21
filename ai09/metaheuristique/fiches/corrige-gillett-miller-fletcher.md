# Corrigé : VRP grille Q = 8 (Gillett-Miller + Fletcher)

Exercice IV de la grille Q = 8 (A06, A18, A23) : balayage avec deux positions de l'axe, Fletcher dans chaque secteur, constat et deux améliorations.

**Résultat : axe fig. 2 → 36,69 ; axe fig. 3 → 44,03 (ou 40,03 selon les ex æquo, voir plus bas).** Les annales du dossier sont des scans sans texte, donc j'ai relevé les coordonnées sur la figure (origine en bas à gauche). Tous les calculs sont vérifiés par script.

**Coordonnées** : D(4,4) ; 1(3,8) ; 2(6,8) ; 3(1,7) ; 4(8,6) ; 5(1,4) ; 6(8,3) ; 7(2,2) ; 8(3,1) ; 9(4,1) ; 10(6,1) ; 11(1,0) ; 12(3,0) ; 13(5,0). La demande totale vaut 15 et la capacité totale 16, donc 2 véhicules suffisent.

## 1a. Axe de la figure 2 (vers l'ouest, D→5, rotation horaire)
Angles vus depuis D : 5 (180°), 3 (135°), 1 (104°), 2 (63,4°), 4 (26,6°), 6 (−14°) | 10 (−56,3°), 13 (−76°), 9 (−90°), 12 (−104°), 8 (−108,4°), 11 (−126,9°), 7 (−135°).
- **C1 = {5,3,1,2,4,6}** : charge 1+1+2+1+2+1 = **8**
- **C2 = {10,13,9,12,8,11,7}** : charge **7**

**Fletcher sur C1+D** (arêtes par longueur croissante, refus si degré 3 ou sous-cycle) : 1-3 (√5) ✓, 2-4 (√8) ✓, D-5 (3) ✓, 1-2 (3) ✓, 3-5 (3) ✓, 4-6 (3) ✓, D-1 (√17) ✗ degré, D-6 (√17) ✓ ferme le cycle.
→ D-5-3-1-2-4-6-D = 12+√5+2√2+√17 = **21,19**

**Fletcher sur C2+D** : 8-9 (1) ✓, 8-12 (1) ✓, 7-8 (√2) ✗ degré, 9-12 (√2) ✗ cycle, 9-13 (√2) ✓, 10-13 (√2) ✓, 11-12 (2) ✓, les arêtes en √5 sont toutes ✗ sauf 7-11 ✓, D-7 (√8) ✓, puis tout ✗ jusqu'à D-10 (√13) ✓.
→ D-7-11-12-8-9-13-10-D = 4+4√2+√5+√13 = **15,50**

**Total fig. 2 = 16 + 6√2 + 2√5 + √13 + √17 ≈ 36,69**

## 1b. Axe de la figure 3 (D→1, rotation horaire, 1 dans le 1er cluster)
Ordre : 1, 2, 4, 6, 10, 13 | 9, 12, 8, 11, 7, 5, 3
- **C1 = {1,2,4,6,10,13}** : charge 2+1+2+1+1+1 = **8**
- **C2 = {9,12,8,11,7,5,3}** : charge **7**

**Fletcher sur C1+D** : 10-13 (√2) ✓, 2-4 (√8) ✓, 6-10 (√8) ✓, 1-2 (3) ✓, 4-6 (3) ✓, D-10 (√13) ✗ degré, D-1 (√17) ✓, D-6 ✗, D-13 (√17) ✓.
→ D-1-2-4-6-10-13-D = 6+5√2+2√17 = **21,32**

**Fletcher sur C2+D** : 8-9 ✓, 8-12 ✓, 7-8 ✗ degré, 9-12 ✗ cycle, 11-12 (2) ✓, 5-7 (√5) ✓, 7-9 (√5) ✓, 7-11 ✗ … D-5 (3) ✓, D-9 et 3-5 ✗ degré, … D-3 (√18) ✓, puis il ne reste que 3-11 (7) ✓ pour fermer.
→ D-5-7-9-8-12-11-3-D = 14+2√5+3√2 = **22,71**

**Total fig. 3 = 20 + 8√2 + 2√5 + 2√17 ≈ 44,03**

⚠️ **Piège des ex æquo** : dans ce dernier cluster, plusieurs arêtes ont la même longueur (√5 et 3). Ci-dessus, je départage par numéro de sommet. Avec un autre choix (7-11 avant 7-9, puis D-9 et 3-5), on obtient D-9-8-12-11-7-5-3-D = 10+2√5+3√2 = **18,71**, qui est l'optimum du cluster, et un total de **40,03**. À l'examen, annonce ta règle de départage. La conclusion reste la même dans les deux cas.

## 2. Constat
Le résultat **dépend fortement de la position initiale de l'axe** : 36,69 contre 44,03, soit environ +20 %. Le découpage de la fig. 3 sépare des clients proches (13 de 9/12, 3 de 1) et force des arêtes longues comme 3-11 (7). Fletcher étant glouton, il peut lui-même se dégrader (sensible aux ex æquo, arêtes de fermeture longues).

## 3. Deux améliorations (en gardant Fletcher)
1. **Essayer tous les axes de départ** : n positions (un axe par client) × 2 sens de rotation, appliquer GM + Fletcher à chaque fois et garder la meilleure solution. Ça coûte peu et supprime la dépendance au choix de l'axe.
2. **Améliorer après Fletcher** : 2-opt ou 3-opt dans chaque tournée (ici on retrouverait 18,71), puis des **échanges ou déplacements de clients entre clusters** (relocate, swap) en respectant Q = 8. Par exemple, passer 13 dans le cluster de 9/12.

Autres réponses acceptables : départager les ex æquo de façon plus fine (plusieurs exécutions), ou construire les clusters en tenant compte des distances et pas seulement de l'angle (par exemple un germe plus insertion).