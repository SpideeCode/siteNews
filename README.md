# 📰 Laravel + Inertia.js + React - Blog Application

Ce projet est une application Laravel 12 utilisant Inertia.js, React, Tailwind CSS et une base de données MySQL.  
Il contient une gestion d’articles avec rôles (`lecteur`, `auteur`, `webmaster`, `admin`) et des fonctionnalités comme les commentaires, likes, catégories, tags, etc.

---

## ⚙️ Préparation de l'environnement

### 1. Cloner le projet

```bash
git clone https://github.com/LeBibbb/siteNews.git
cd siteNews
````

---

## 🧩 Installation des dépendances

### Backend (Laravel)

```bash
composer install
```

### Frontend (React via Vite)

```bash
npm install
```

---

## ⚡ Configuration de l’environnement


### Configurer `.env`

Modifie les lignes suivantes :

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nom_de_ta_base
DB_USERNAME=root
DB_PASSWORD=
```

---

## 🧪 Lancer les serveurs

### 1. Lancer XAMPP (ou autre outil)

* Démarrer **Apache** et **MySQL**

### 2. Créer la base de données

Dans **phpMyAdmin**, créer une base de données portant le nom défini dans `.env`.

---

## 🧱 Exécuter les migrations et seeders

```bash
php artisan migrate --seed
```

> Pour tout réinitialiser :

```bash
php artisan migrate:fresh --seed
```

---

## 🚀 Lancer l’application

```bash
composer run dev
```

---

## 👤 Accès aux utilisateurs

Tu peux :

* Utiliser les comptes générés par les seeders
* Ou créer un compte via `/register` et modifier son rôle manuellement (via interface admin ou BDD)

---

## 📂 Structure du projet

* `routes/web.php` — Définition des routes avec les middlewares de rôles
* `resources/js/Pages/` — Composants React (pages)
* `app/Models/` — Modèles Laravel (Article, User, Comment, etc.)
* `app/Http/Middleware/` — Middleware pour les rôles
* `app/Http/Controllers/` — Contrôleurs
* `database/seeders/` — Seeders des rôles, users, etc.

---

## 🛠 Stack technique

* Laravel 12
* Inertia.js
* React + Vite
* Tailwind CSS
* MySQL

---

## ✅ Commandes utiles

| Action                    | Commande                           |
| ------------------------- | ---------------------------------- |
| Installer dépendances PHP | `composer install`                 |
| Installer dépendances JS  | `npm install`                      |
| Lancer Application        | `composer run dev`                 |
| Exécuter migrations       | `php artisan migrate`              |
| Seed DB                   | `php artisan db:seed`              |
| Reset base + seed         | `php artisan migrate:fresh --seed` |

---
