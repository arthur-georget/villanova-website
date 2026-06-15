# Villanova Website

[![Normes WCAG](https://img.shields.io/badge/Accessibility-WCAG%20AA%20Compliant-brightgreen)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Licence](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**Villanova Website** est une application web moderne permettant de consulter, rechercher et filtrer des événements et des lieux en temps réel. Le site interroge l'API publique d'**OpenAgenda** pour centraliser et afficher l'agenda culturel et associatif.

Ce projet a été réalisé dans le cadre de la validation d'un bloc de compétences du titre **RNCP 37273 : Développeur Web Full Stack**.

---

## 🚀 Fonctionnalités

* **Interconnexion API :** Requêtes asynchrones sur l'API d'OpenAgenda.
* **Moteur de recherche avancé :** Filtrage dynamique par mots-clés, thématiques, dates, et recherche croisée sur les événements et les lieux.
* **Accessibilité (a11y) :** Site entièrement conforme aux normes **WCAG 2.1 niveau AA** (navigation au clavier, contrastes élevés, balisage sémantique ARIA, compatibilité lecteurs d'écran).
* **Design Responsive :** Interface fluide et adaptée à tous les écrans (Desktop, Tablette, Mobile).

---

## 🛠️ Technologies utilisées

* **HTML5 :** Structuration sémantique stricte pour l'accessibilité.
* **SASS (SCSS) :** Architecture CSS modulaire, gestion des variables (couleurs, espacements) et nesting.
* **JavaScript Vanilla (ES6+) :** Logique de l'application, manipulation du DOM et gestion des requêtes asynchrones (`Fetch API`).

---

## 📦 Installation et contribution

Pour lancer le projet en local, suivez ces étapes simple :

1. **Cloner le dépôt :**
   ```bash
   git clone [https://github.com/arthur-georget/villanova-website.git](https://github.com/arthur-georget/villanova-website.git)
   cd villanova-website
   ```

2. **Compiler le SASS :**
Si vous utilisez le compilateur SASS officiel (ou une extension d'EDI comme Live Sass Compiler) :
    ```bash
    sass src/scss/main.scss dist/css/style.css --watch
    ```

3. **Lancer le projet :**
Ouvrez simplement le fichier index.html dans votre navigateur, ou utilisez une extension de serveur local type Live Server.

## ♿ Accessibilité (WCAG AA)
Une attention toute particulière a été portée à l'inclusion et à l'accessibilité numérique :

* ** Navigation au clavier :** Présence de liens d'évitement (skip links), focus visible et gestion rigoureuse du tabindex.

* ** Lecteurs d'écran :** Utilisation des rôles, états et propriétés ARIA (aria-expanded, aria-live pour les résultats de recherche dynamiques, etc.).

* ** Contrastes :** Ratios de contraste vérifiés et validés selon les critères WCAG AA.

## 🎓 Contexte Pédagogique
Ce projet valide un bloc du titre professionnel RNCP 37273 - Développeur Web full stack.
Il démontre la capacité à :

* Construire une interface utilisateur web responsive et accessible.

* Gérer la logique d'une application côté client avec du JavaScript pur.

* Consommer et exploiter les données d'une API tierce de manière sécurisée et fluide.