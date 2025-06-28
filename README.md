# Nodejs-Approfondissement - Étude de cas Bloc 4

Projet d'étude de cas : Api de gestion des users et articles
Formation Bachelor CDA - Bloc 4
_Oktogone / ISCOD_

---

## 🚀 Fonctionnalités

- Gestion des users (CRUD, rôles admin/member)
- Authentification JWT sécurisée (middleware d'auth enrichi)
- Gestion des articles postés par les utilisateurs (CRUD)
- Attribution auto de l'autre (user connecté)
- Endpoints publics et sécurisés selon le rôle
- Endpoint public pour afficher les articles d'un user
- Tests unitaires (supertest, mockingoose) sur users et articles
- Déploiement et supervision avec PM2 (cluster, logs, limites mémoire)

--- 

## 🔐 Note de sécurité (tokens de test)

Les tokens JWT présents dans les fichiers de tests ont été générés localement et ne fonnent accès à **aucune API de production ni à aucune donnée réelle**.

Ils servent uniquement à valider l'API en local dans le cadre de cette étude de cas.
**Aucun secret, identifiant ou accès sensisble n'est exposé dans ce dépôt.**

En environnement professionnel, il est recommandé de stocker ce type de valeur dans des variables d'environnement
et de ne jamais les exposer dans un dépôt public.

---