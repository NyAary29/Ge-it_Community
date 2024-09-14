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
