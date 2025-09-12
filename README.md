Projet de Gestion de Missions et Candidatures 

 
 Présentation

Cette application web permet :

aux associations de publier des missions,

aux bénévoles de postuler à des missions,

et à chaque partie de gérer les candidatures.

Le projet a été réalisé dans le cadre d’un stage au sein du groupe AFEC. Il respecte l’architecture MVC et utilise Express.js, MariaDB, et le pattern repository-service-controller pour séparer les responsabilités.

 Installation et Lancement
1. Cloner le dépôt
git clone https://github.com/ton-projet.git
cd ton-projet

2. Installer les dépendances
npm install

3. Configuration des variables d’environnement

Crée un fichier .env à la racine avec les infos suivantes :

PORT=3000
JWT_SECRET=tonSecretIci
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=missions_db

4. Lancer le serveur
npm run dev


Le serveur sera disponible sur : http://localhost:3000

Initialisation des dépendances

Le fichier initDependencies.js instancie toutes les classes nécessaires (repository, service, controller) :

const userRepository = new UserRepository(pool);
const userService = new UserService(userRepository);
const userController = new UserController(userService);


Cela permet de centraliser la logique métier et d’assurer la maintenance du code avec une meilleure lisibilité et testabilité.

Justification du choix technologique
Pourquoi SQL (MariaDB) ?

 Intégrité des données : relations fortes entre utilisateurs, missions et candidatures.
 Contraintes de schéma strictes : utile pour garantir la cohérence métier.
 Requêtes relationnelles : jointures optimisées, très utiles pour les vues complexes.



Fonctionnalités principales

 Authentification via JWT et Cookies HTTP-only

 Rôles : benevole et association

 CRUD Missions (associations uniquement)

 Postuler à une mission (1 à la fois, pour les bénévoles)

 Voir les candidatures liées à ses missions

 Modifier le statut d’une candidature

 Stack technique

Backend : Node.js, Express.js

Base de données : MariaDB

ORM / Accès DB : MySQL2 (promesse)

Auth : JWT + Cookies

Architecture : MVC modulaire + Repository/Service/Controller

Informations complémentaires

Documentation API disponible dans Postman (collection exportée)

Code organisé par modules :

module.users/
module.missions/
module.candidatures/
routes/
middlewares/
