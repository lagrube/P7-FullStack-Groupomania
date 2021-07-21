# ![left 100%](https://github.com/lagrube/Archives/blob/main/archives-master/images/Logo_OpenClassrooms.png) [OpenClassrooms-Développeur Web](https://openclassrooms.com/fr/paths/185-developpeur-web)

_`Début de formation le 14/10/2020`_

### Auteur

👤**Guillaume GRUBER** lagrube1@gmail.com

---

## 📎 Projet 7 - Création d'un réseau social d’entreprise

Le projet 7 consiste à construire (Frontend et Backend) un réseau social interne pour les employés de Groupomania. En utilisant une organisation "agile", nous avons "Carte blanche" avec quelques orientations et contraintes.

- Fonction, partager/commenter des gifs genre le site 9GAG.
- Fonction, écrire/partager des articles à la façon de Reddit.
- Utiliser le langage SQL pour le stockage de données.
- Les données de connexion doivent être sécurisées.

L'un des employés du groupe testera un MVP du produit avec une seule des deux fonctions demandées.

- <span style="color:green">Nous avons choisi de presenter " Pouvoir partager et commenter des gifs ".</span>

### Objectifs et Compétences évalué

- Gérer un stockage de données à l'aide de SQL
- Personnaliser le contenu envoyé à un client web
- Implémenter un stockage de données sécurisé en utilisant SQL
- Authentifier un utilisateur et maintenir sa session

---

## 🔨 Installation

### Pré requis

- Cloner la branche "master" de ce dépôt github
- Installer Node.js
- Installer Vue.js
- Installer MySQL

### Lancement du Backend et Frontend

- Dans le terminal, lancer les commandes suivantes sur chaques dossiers :

| ![icon du terminal](https://github.com/thierry-laval/archives/blob/master/images/terminal2.gif?raw=true) | Pour installer Node<br>(une seule fois) | Pour lancer le serveur |
| :------------------------------------------------------------------------------------------------------: | :-------------------------------------: | :--------------------: |
|                                        Sur le dossier **Back** :                                         |              `npm install`              |      `npm start`       |
|                                        Sur le dossier **Front** :                                        |              `npm install`              |    `npm run serve`     |

**_Pour tester les fonctionnalités de l'application voir les étapes suivantes :_**

- Créez un fichier nommé **`.env`** dans le dossier backend (je lai placé personnellement dans config).

```bash
Vous devez créer votre propre base de données Mysql !

Pour mon cas jutilise workbench avec comme Database : groupomania
suivit des Tables :
- users: id (PRIMARY KEY, auto increment), email, password, prenom, nom, bio, image
- posts: id (PK, AI), user_id(Clés étrangères avec users), data, message, lien_url, image_url
- commentaires: id (PK, AI), user_id(Clés étrangères avec users) , post_id(Clés étrangères avec posts), date, message
```

Voir modèle : https://github.com/lagrube/Archives/blob/main/archives-master/images/groupomania-model.png

- Ouvrez votre navigateur et allez sur : [`http://localhost:8080`](http://localhost:8080)

---

### Utilisé dans ce projet

- Voir : [Le projet 7 "Groupomania" sur OpenClassrooms](https://openclassrooms.com/fr/paths/185/projects/677/assignment "Cliquez pour voir le projet")
- Voir : [Les spécifications fonctionnelles donnée par le client](documents/spécifications_fonctionnelles.pdf)

| Languages  |   et    |       outils       |
| :--------: | :-----: | :----------------: |
|   HTML5    | Node.js |     Git/GitHub     |
|    CSS3    | Vue.js  | Visual Studio Code |
| Javascript |  MySQL  |        WCAG        |

→ **Liste des dépendances et documentations**

|                                                                   |                                                                            |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------- |
| express : [d​ocumentation](https://www.npmjs.com/package/express) | nodemon : ​[d​ocumentation](https://www.npmjs.com/package/nodemon)         |
| bcrypt : [d​ocumentation](https://www.npmjs.com/package/bcrypt)   | jsonwebtoken: [d​ocumentation](https://www.npmjs.com/package/jsonwebtoken) |
| dotenv : [d​ocumentation](https://www.npmjs.com/package/dotenvh)  | body-parser : ​[d​ocumentation](https://www.npmjs.com/package/body-parser) |
| helmet : ​[d​ocumentation](https://www.npmjs.com/package/helmet)  |

<!--
● express     : [d​ocumentation](https://www.npmjs.com/package/express)\
● sequelize   : ​[d​ocumentation](https://www.npmjs.com/package/sequelize)\
● bcrypt      : [d​ocumentation](https://www.npmjs.com/package/bcrypt)\
● jsonwebtoken: [d​ocumentation](https://www.npmjs.com/package/jsonwebtoken)\
● dotenv      : [d​ocumentation](https://www.npmjs.com/package/dotenvh)\
● body-parser : ​[d​ocumentation](https://www.npmjs.com/package/body-parser)\
● helmet      : ​[d​ocumentation](https://www.npmjs.com/package/helmet)\
● nodemon     : ​[d​ocumentation](https://www.npmjs.com/package/nodemon)\
-->

---
