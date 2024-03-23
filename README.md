## Configurer l'application en local

# Commandes :

`git clone https://github.com/enzo-mir/new_ecf_adonis6.git <nome_du_dossier>`
`cd <nome_du_dossier>`
`pnpm install`

## Si pnpm n'est pas installer [installation](https://pnpm.io/installation)

# Changement du nom
Changer le nom du fichier `.env.local` par `.env`

# Création de la base de données
`node db.js`

# Migration des données
`node ace migration:run`

# Lancement du serveur*
`pnpm run dev`


### Pour l'envois d'e-mail, changer les variables d'environement

- SMTP_USERNAME
- SMTP_EMAIL
- SMTP_PASSWORD
- SECRET_ENCRYPT