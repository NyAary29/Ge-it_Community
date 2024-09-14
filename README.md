# 🗂️ Architecture du Projet

## 📁 Frontend (React Vite)

```bash
/frontend
│
├── /public                   # Fichiers statiques publics (HTML, favicons, etc.)
│
├── /src
│   ├── /assets               # Images, icônes, fichiers statiques
│   ├── /components           # Composants réutilisables (Button, Input, etc.)
│   ├── /contexts             # Gestion globale de l'état (AuthContext)
│   ├── /hooks                # Hooks personnalisés (useAuth)
│   ├── /pages                # Pages principales de l'application (Auth, Chat, Profile)
│   ├── /routes               # Routes privées et publiques (PrivateRoute, AuthRoute)
│   ├── /styles               # Fichiers de style (CSS ou config Tailwind)
│   ├── /utils                # Fonctions utilitaires (appels API, gestion JWT, etc.)
│   └── App.jsx               # Composant principal gérant les routes avec React Router
│
└── vite.config.js            # Configuration de Vite
```
##  📁 BackEnd (Nodejs)
```bash
/backend
│
├── /controllers              # Logique des contrôleurs (authController.js)
├── /middlewares              # Middleware pour la vérification des tokens JWT
├── /routes                   # Définition des routes de l'API (authRoutes.js)
├── /models                   # Modèles de la base de données (User.js)
├── /utils                    # Fonctions utilitaires (génération et vérification JWT)
├── /config                   # Configuration de la base de données et des secrets
├── /tests                    # Tests unitaires (auth.test.js)
├── server.js                 # Point d'entrée de l'application Express
└── .env                      # Variables d'environnement pour la configuration
