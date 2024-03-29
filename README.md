<div align="center">
  <h1>RES-APPLI</h1>
  <h2>SLAM Year 1 Project</h2>
  <h3>Powered by Electron JS</h3>
  <h4>Conçu par Hugo, Antoine , Maximilien , Léo</h4>

<img width="822"  alt="login" src="https://github.com/MrHugojuggernot/RESAPPLI-SLAM/assets/39633298/68d675f6-1588-4e81-88c9-7786f4fb6b10">
</div>

# What's RES ? 

RES est une application de réservation très personalisable en client lourd (Electron JS) pour tout le monde

Initialement un projet scolaire, RES a pour projet de devenir un utilitaire libre et flexible pour n'importe quel organisme qui souhaite organiser sa gestion
de salle à travers le temps.

# Fonctionnalités RES

- Gestion planning de 8h-18h
- 3 types de réservations possibles : Formation, Interne et Externe
- Gestion de thèmes personalisés avec un choix total des couleurs pour le meilleur des conforts !
- Administration des comptes lié à RES avec système de permission (Guest, Secrétaire, Administrateur, Administrateur RES)

# Fonctionnalités en cours de développement

- Modification des permissions / rôle d'un compte (Administrateur sur les autres comptes)
- Ajout ou suppression de compte
- Flexibilité : Création de réservation personalisée

# Installation

``git clone https://github.com/MrHugojuggernot/RESAPPLI-SLAM && cd RESAPPLI-SLAM``
<br>
``npm i && npm start``

# Attention

Ce projet est réalisé dans un cadre scolaire (BTS SIO 1) est possède de **multiples failles de sécurités** qui permettent d'éxécuter du code arbitraire (notamment un RCE, *Remote Code Execution*, grâce à Node.js).

Pour en savoir plus, voici une vidéo explicative sur le cas de **Microsoft Teams** [https://www.youtube.com/watch?v=K5WOkLaGS-E](https://www.youtube.com/watch?v=K5WOkLaGS-E).

Ne pas utiliser ce programme en production
