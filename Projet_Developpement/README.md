# Rapport projet de développement
## Développement d'une petite application web géoportail
***MDT - SA2020 - Bosson, Chevrier et Bobillier***

### Concept
Pour ce projet, il nous a été demander de développer une petit application web de type "géoportail".
Ci-dessous, quelques points spécifiques qui nous a été demandé :
- Le développement doit se faire avec vue.js
- Intégrer une librairie avec des composants
- Menu d'accueil permettant d'afficher des couches spécifiques selon les désirent de l'utilisateur
- Pages affichants des données géographiques en 2D et 3D (OpenLayers et Cesium)
- Une page statique décrivent le projet, les outils et l'équipe
- Le projet doit être contrôlé et stocké sur GitHub

Pour respecter ces contraintes, nous avons choisi de développé un site web 2D et 3D intéractive ayant une utilitée pour notre métier. Un outil de validation de nouvelles constructions selon les contraintes liées à l'aménagement du territoire et de la Mensuration Officielle. L'utilisateur pourra introduire son projet (par ex. bâtiment) dans le site web, visualiser son emplacement en 2D et 3D, soit son intégration dans l'environnement construit. Il pourra ensuite contrôler si la construction respect les contraintes d'aménagement du territoire en apuyant sur un bouton de validation. Le site web retournera ensuite différentes informations. Par exemple :
- Surface de la construction
- Surface de l'aire d'implantation
- IBUS
- Validation que la construction se situ à l'intérieur d'une aire d'implantation --> validé ou fausse
- ...
 

### Démarche

Nous avons commencé par créer un GitHub et à le partager entre les étudiants. Nous avons ensuite établit la structure du projet en se bassant sur celle mise à disposition par les encadrants. 
Au départ, pour les tâches de préparation, nous avions décidé de se séparer les tâches entre nous :
- Recherche et préparation des données --> Méric
- Tests des données en entré --> Adrien
- Préparation de la structure html et css --> Quentin
Nous avons vite remarqué que cette répartition n'était pas optimale, surtout à distance. Nous avons donc revu notre idée et avons décider de s'entraider sur toutes les tâches. De plus cela permettra que chacun apprenne et comprenne mieux les objectifs du projet. De ce fait chacun à participé à mettre en place des outils .js, vue.js, sur des données OpenLayers et Cesium ainsi que sur les caluls avec turf.js.
L'outil Teams de Microsoft à aussi été utilisé à chaque fois que nous avons travailler sur le projet. Il nous a permis de discuter sur nos intérogations et/ou problèmes ainsi que de voir en live de quoi nous parlions. Cette méthodologie nous a permis de compléter nos compétances et connaissances sur les thèmes abordés.
Le code a été commenté dans le but de faciliter sa compréhension.

### Donnée
L'acquisition des données est une étape très importante qui nous a pris beaucoup de temps. Nous avons pu avoir les donnéesde la mensuration officiel via un bureau privé d'un étudiant. Pour les données du modèle numérique de terrain et des swissBuildings2.0, nous avons pu les avoir via l'HEIG-VD.
Pour pouvoir les utiliser, nous avons du effectuer de nombreux traitement dessus :
- Transformation de coordonnées, MN95 --> WGS84 et NF02 --> hauteur ellipsoidale
- Constructions des aires d'implantation
- Transformation des fichiers au format .geojson qui nous permet d'utiliser les données aussi bien avec OpenLayers qu'avec Cesium
- ...
Les données téléchargées dans notre projet sont donc tous en WGS84 avec une hauteur ellipsoidale au format .geojson.
L'utilisateur qui voudra charger son projet devra donc tenir compte du système de coordonnée ainsi que du format. Dans le cas contraire, l'ajout du projet echouera.

### Problème

### Conclusion

### Perspective

### Documentation