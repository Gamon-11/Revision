# Définitions à connaître par cœur

J'ai relu les 17 annales (A05 à A25, P18, P19). Cette fiche liste toutes les définitions qu'un énoncé de copie 3 utilise ou fait réciter, avec la formulation à écrire sur la copie et les annales où elle sert. Les citations entre guillemets sont recopiées des énoncés : c'est le vocabulaire exact du correcteur.

Comment l'utiliser : cache la colonne « Définition à écrire » et récite. Les définitions marquées ★ sont demandées explicitement (« définir », « justifier », « montrer ») ; les autres servent à rédiger une preuve ou à comprendre l'énoncé.

## 1 · Vocabulaire des graphes

| Terme | Définition à écrire | Annales |
| --- | --- | --- |
| Graphe G = (X, E) | X ensemble de sommets, E ensemble d'arêtes [u, v] (non orienté) ou U ensemble d'arcs (u, v) (orienté). | toutes |
| Graphe complet | Toute paire de sommets est reliée par une arête (un arc dans chaque sens si orienté). Le TSP se pose sur un graphe complet. | A11, A23, A25 |
| Degré d(x) | Nombre d'arêtes incidentes à x. En orienté : d⁺(x) arcs sortants, d⁻(x) arcs entrants. | A13, A15, A16, A18, A25 |
| Lemme des poignées de main | Σ d(x) = 2 \|E\|, donc le nombre de sommets de degré impair est toujours **pair**. | idem (justifie qu'on puisse toujours les apparier) |
| Chaîne / cycle | Suite d'arêtes consécutives ; un cycle est une chaîne fermée. En orienté on dit **chemin / circuit**. | A11 V |
| Connexe | Pour toute paire de sommets il existe une chaîne qui les relie. | A11 V |
| ★ Cycle hamiltonien | Cycle qui passe **une et une seule fois par chaque sommet**. | A11 IV, A21 IV, tous les TSP |
| ★ Cycle (chaîne) eulérien(ne) | Cycle (chaîne) qui passe **une et une seule fois par chaque arête**. | A11 V, A13, A15, A16, A18, A25 |
| Arbre | Graphe connexe sans cycle ; il a n − 1 arêtes. | A11 IV, A14, A15 |
| ★ Arbre couvrant de poids minimum (ACM) | Arbre qui contient tous les sommets et dont la somme des coûts est minimale (Kruskal ou Prim). | A11 IV, A12 IV, A14, A15 |
| Couplage | Ensemble d'arêtes deux à deux sans sommet commun. | A14, A15, postier |
| ★ Couplage parfait de poids minimum | Couplage qui couvre tous les sommets considérés (ici les sommets impairs), de coût total minimal. | A14, A15 (Christofides), A13 à A25 (postier) |

À retenir : hamiltonien = chaque **sommet** une fois, eulérien = chaque **arête** une fois. Le TSP cherche un cycle hamiltonien, le postier chinois un cycle eulérien.

## 2 · Graphes eulériens

★ **Théorème d'Euler (non orienté)**. Un graphe connexe admet :

- un **cycle eulérien** si et seulement si **tous ses sommets sont de degré pair** ;
- une **chaîne eulérienne** (non fermée) si et seulement si il a **exactement 2 sommets de degré impair**, qui en sont les extrémités.

Tombé : A13 III, A15 III, A16 III, A18 III, A25 III. La question « Pourquoi le commerçant ne peut-il pas visiter tous ses clients en passant une fois, et une seule, dans chaque rue ? » se répond en une phrase : *le graphe n'est pas eulérien car il possède des sommets de degré impair (les nommer avec leur degré).*

★ **Graphe pseudo-symétrique** (A11 V, verbatim) : « un graphe G = (X, U) orienté est pseudo-symétrique si et seulement si, en tout sommet i, il part autant d'arcs qu'il en arrive », c'est-à-dire d⁺(i) = d⁻(i).

★ **Théorème orienté** (A11 V, à démontrer) : un graphe orienté admet un **circuit eulérien** si et seulement si il est **connexe et pseudo-symétrique**. L'équivalent non orienté est « connexe et tous les degrés pairs ».

★ **Problème du postier chinois** (A16 III-3, formulation de l'énoncé) : construire « un cycle de valuation minimale passant **au moins une fois** par chaque arête ». Méthode : sommets impairs → couplage parfait de poids minimum entre eux (plus courts chemins) → doubler ces chemins → le graphe devient eulérien → cycle eulérien. Coût = somme des arêtes + coût du couplage.

## 3 · Les problèmes de tournées

★ **TSP (problème du voyageur de commerce)** (A23 III « Décrire le problème du voyageur de commerce ») : étant donné un graphe complet G = (X, A) et un coût cᵢⱼ sur chaque arc, trouver un **cycle hamiltonien de coût minimal**, c'est-à-dire visiter chaque ville exactement une fois et revenir au point de départ. Symétrique si cᵢⱼ = cⱼᵢ, asymétrique sinon (matrices de Little). Problème NP-difficile.

**TSP euclidien** (P18, A05, A09) : les villes sont des points du plan et cᵢⱼ est la distance euclidienne. Il vérifie toujours l'inégalité triangulaire.

**Variante à visites multiples** (P18, A05, A09, verbatim) : « la variante du voyageur de commerce où il est permis de visiter une ville plus d'une fois ». Avec l'inégalité triangulaire, il existe toujours une solution optimale qui visite chaque ville une seule fois (on court-circuite les répétitions sans allonger le tour).

★ **VRP (problème de tournées de véhicules)** (A06, A07, A08, A12, A14, A15, A16, A18, A21, A23) : un **dépôt**, n **clients** de demande qᵢ, une flotte de véhicules identiques de **capacité Q**. Construire des tournées qui partent du dépôt et y reviennent, telles que chaque client est servi **une seule fois par un seul véhicule**, que la somme des demandes d'une tournée ne dépasse pas Q, et que la **distance totale soit minimale**.

**CARP (tournées sur arcs)** : version « sur les rues » du VRP : les demandes sont portées par les arêtes (collecte des déchets, salage), avec capacité. Le postier chinois en est le cas sans capacité. Pas tombé sous ce nom, mais c'est le chapitre « tournées sur arcs » du cours.

★ **TOP (tournées sélectives)** (A25 IV, verbatim à retenir) : « une variante du problème de tournées de véhicules où a priori il n'est pas possible de servir tous les clients ». Chaque véhicule part de d, sert des clients et arrive en a **sans dépasser un temps de parcours limite L** ; chaque client rapporte un profit Pᵢ **collecté au plus une fois** par la flotte de m véhicules ; on **maximise le profit total collecté**.

## 4 · Inégalité triangulaire, bornes et rapports de performance

★ **Inégalité triangulaire** (P18, A05, A09, A11, A12) : pour tous sommets i, j, k, **c(i, k) ≤ c(i, j) + c(j, k)**. Autrement dit, passer par un intermédiaire n'est jamais plus court que le trajet direct. C'est l'hypothèse qui permet de « court-circuiter » un sommet déjà visité.

★ **Borne inférieure** (A11, A12, A14, A15, A21) : valeur dont on sait qu'elle est **≤ au coût optimal** (en minimisation). **Prouver qu'une solution est optimale sans méthode exacte** (A21 IV) : exhiber une borne inférieure **égale** au coût de la solution. Bornes du cours : ACM (et 1-arbre), réduction de la matrice de Little, borne par les deux plus petites arêtes de chaque sommet.

★ **Relation ACM / cycle hamiltonien** (A11 IV) : en retirant une arête d'un cycle hamiltonien optimal H\* on obtient un arbre couvrant, donc **c(ACM) ≤ c(H\*)**. Avec l'inégalité triangulaire, l'arbre doublé puis court-circuité donne **c(H) ≤ 2 c(ACM) ≤ 2 c(H\*)**.

★ **Rapport (ratio) de performance** (P18, A05, A09, A11, A12) : une heuristique H a un rapport de performance ρ ≥ 1 si, **pour toute instance I**, H(I) ≤ ρ · OPT(I) (minimisation). Le « ratio du coût de la solution produite par l'algorithme, par le coût du tour optimal » est H(I) / OPT(I). « Arbitrairement grand » = aucune constante ρ ne convient : on le montre avec une famille d'instances dont le ratio tend vers l'infini.

```latex
\rho = \sup_{I} \frac{H(I)}{\mathrm{OPT}(I)}
```

**Approximation k-absolue** (A13 IV, verbatim « approximation 1-absolue ») : F\* − F̂ ≤ k pour toute instance (écart en valeur absolue, pas en rapport).

| Méthode | Rapport | Condition |
| --- | --- | --- |
| PPV | arbitrairement grand | sans inégalité triangulaire (P18, A05, A09, A11) |
| PPV | O(log n), pas de constante | avec inégalité triangulaire |
| Arbre doublé | 2 | inégalité triangulaire |
| ★ Christofides | **3/2** | inégalité triangulaire (A12 IV, à justifier) |
| ★ 2-opt | pas de constante | même avec inégalité triangulaire (A12 IV) |

## 5 · Heuristiques, voisinage, 2-opt

**Méthode exacte / heuristique** : une méthode exacte garantit l'optimum (énumération, Little, PLNE) ; une heuristique donne rapidement une solution réalisable **sans garantie d'optimalité**. Une heuristique **constructive** bâtit une solution (PPV, Christofides, Fletcher, Shamos) ; une heuristique **d'amélioration** part d'une solution et la modifie (2-opt).

**Métaheuristique** : schéma général de recherche, indépendant du problème, qui guide une heuristique pour sortir des optimums locaux (tabou, recuit simulé, génétique). Jamais demandée directement dans les annales.

★ **Voisinage, optimum local, descente** (A21 IV) : le voisinage d'une solution est l'ensemble des solutions obtenues par un mouvement élémentaire. Une **descente** applique un mouvement améliorant tant qu'il en existe ; elle s'arrête sur un **optimum local** : aucune solution voisine n'est meilleure, ce qui n'implique pas l'optimum global (A21 : PPV + 2-opt reste bloqué à 21 alors que l'optimum vaut 19).

★ **Mouvement 2-opt** : retirer deux arêtes non adjacentes (a, b) et (c, d) du tour et reconnecter en (a, c) et (b, d), ce qui inverse le segment entre b et c. Gain = c(a, b) + c(c, d) − c(a, c) − c(b, d) ; on l'applique si le gain est > 0.

★ **Tour 2-opt optimal** (P18, A05, A09) : aucun mouvement 2-opt ne diminue son coût. Énoncé à démontrer : en euclidien, un tour 2-opt optimal **ne se croise jamais** (deux arêtes qui se croisent peuvent être remplacées par les deux diagonales d'un quadrilatère, strictement plus courtes) ; **la réciproque est fausse** (un tour sans croisement peut encore être amélioré par un 2-opt).

★ **Algorithme en O(n!)** (A12 IV) : énumérer tous les ordres de visite, (n − 1)! en fixant la ville de départ, calculer chaque coût et garder le minimum. Exact mais inutilisable au-delà d'une quinzaine de villes.

**Les heuristiques nommées** (à savoir définir en une phrase) :

| Nom | Définition courte | Annales |
| --- | --- | --- |
| PPV (plus proche voisin) | Depuis la ville courante, aller à la ville non visitée la plus proche ; en VRP, fermer la tournée quand le client suivant dépasse Q. | A08, A14, A15, A16, A21, P18 |
| Christofides | ACM → couplage parfait de poids minimum sur les sommets de degré impair → cycle eulérien → raccourcis. | A12, A14, A15 |
| Gillett-Miller (balayage) | Trier les clients par angle polaire autour du dépôt et les grouper dans l'ordre tant que Q n'est pas dépassée (« cluster first, route second »). | A06, A08, A16, A18, A21, A23 |
| Shamos (élastique) | Partir de l'enveloppe convexe du secteur (dépôt inclus) et insérer le point au plus petit surcoût. | A07, A08, A16, A21 |
| Fletcher | Ajouter les arêtes par longueur croissante sans créer de sommet de degré 3 ni de sous-cycle. | A06, A18, A23 |
| Beasley | « Route first, cluster second » : découper un **tour géant** en tournées réalisables par un plus court chemin dans un graphe auxiliaire. | A07, A12, A14, A15 |
| Tour géant | Cycle hamiltonien qui visite tous les clients en ignorant la capacité, découpé ensuite en tournées. | A07, A12, A14, A15 |

**Décomposer un problème de tournées** (A07 I) : soit regrouper puis router (cluster first, route second : Gillett-Miller), soit router puis découper (route first, cluster second : Beasley).

## 6 · Méthodes exactes

★ **Procédure par séparation et évaluation (PSE, branch and bound)** (A11, A12, A14, A15) : on **sépare** l'ensemble des solutions en sous-ensembles (avec l'arc (i, j) / sans l'arc (i, j)), on **évalue** chaque sous-ensemble par une borne inférieure, et on **élague** tout nœud dont la borne est ≥ à la meilleure solution connue.

**Little** : borne inférieure = somme des minimums retirés sur chaque ligne puis chaque colonne (réduction de la matrice). **Regret** d'un zéro (i, j) = min de sa ligne + min de sa colonne hors lui-même : on sépare sur le zéro de regret maximal.

★ **Plus court chemin** (A11 III, A12 III, verbatim « quel problème de référence reconnaissez-vous ? ») : réponse attendue : le **problème du plus court chemin** d'un sommet origine vers les autres ; algorithme de **Dijkstra**, valable pour des coûts **positifs ou nuls**.

★ **Sous-tour et MTZ** (A23 III, A25 IV) : un sous-tour est un cycle qui ne passe pas par toutes les villes ; il faut l'interdire dans la PLNE du TSP. Deux formulations :

```latex
\text{Sous-ensembles : } \sum_{i\in S}\sum_{j\in S} x_{ij} \le |S|-1 \quad \forall S \subset X,\ 2 \le |S| \le n-1
```

```latex
\text{MTZ : } u_i - u_j + n\,x_{ij} \le n-1 \quad \forall i \ne j,\ i,j \ne 1,\quad 1 \le u_i \le n-1
```

La première a un nombre exponentiel de contraintes (2ⁿ) mais une relaxation plus forte ; MTZ en a O(n²) mais une relaxation plus faible (A23 III-3 « discuter l'efficacité »).

## 7 · Les autres parties (pas encore vues en cours)

Ces définitions sont données dans l'énoncé, mais les avoir en tête fait gagner du temps. Je les note en bref.

**PPC / CSP (copie 1)**

- **CSP** = triplet (X, D, C) : un ensemble de **variables**, leurs **domaines** finis, et des **contraintes** sur ces variables. Une solution affecte à chaque variable une valeur de son domaine en respectant toutes les contraintes. Demandé partout : A13, A14, A15, A18, P18, A21.
- ★ **Couverture de sommets** (P18 Ex 1 et A18 Ex I, verbatim) : « S couvre une arête [u,v] si u∈S ou v∈S (ou les deux). L'ensemble S est une couverture de G si chaque arête de G est couverte par S. Une couverture est dite de cardinal minimal s'il n'existe pas de couverture de plus petit cardinal. »
- **Partition** (rappel d'A21 Ex II, verbatim) : « une partition d'un ensemble S est un ensemble {S₁, …, Sₖ} de sous-ensembles non vides de S disjoints deux à deux et dont l'union est égale à S ». Problème Partition (A23 I) : couper A en A' et A\A' de même poids.
- Énoncés de jeux à modéliser : officiers d'Euler (A13), tomographie discrète (A12, A14), Akari (A15), sel et moutarde (A25), carré magique (A09).

**PL / PLNE (copie 2)**

- Un modèle s'écrit toujours dans l'ordre **paramètres, variables de décision, fonction objectif, contraintes** (P19 le rappelle en conseil, A25 II l'exige).
- **Bin-packing** (P18, P19) : ranger n articles de taille uᵢ ∈ ]0, 1] dans un nombre minimum de boîtes de capacité 1.
- **Sac à dos** (A05, A06, P19) : choisir des objets de poids et valeur donnés pour maximiser la valeur sans dépasser la capacité.
- **Ensemble intersectant** (P19, verbatim) : « on cherche un sous-ensemble H de U qui contient au moins un élément de chaque sous-ensemble s de la famille S », de cardinal minimal. La couverture de sommets en est le cas particulier où chaque s est une arête.
- **Affectation** (A25 II) : chaque employé fait exactement une tâche et chaque tâche est faite par un seul employé.

**Ordonnancement**

- ★ Définition (A08 et A16 Ex I, verbatim) : « Un problème d'ordonnancement consiste à déterminer les dates d'exécution d'activités qui utilisent une ou des quantités connues d'un ensemble donné de ressources dont les capacités sont limitées. »
- Notations : rᵢ date de disponibilité, pᵢ durée, dᵢ date échue (d'échéance), Cᵢ date de fin. **Contrainte de précédence** : i avant j ; **contrainte de disjonction** : i et j ne peuvent pas s'exécuter en même temps, sans ordre imposé (A14, A21).
- Projet (A14 III) : **dates au plus tôt / au plus tard**, **marge**, **chemin critique** = chemin de tâches de marge nulle, dont la longueur est la durée minimale du projet.

**Hors programme depuis 2011** : Monte Carlo (A05, A06, P18) et finance (VAN, TRI, taux actuariel, OPCVM, call : A08, A09).
