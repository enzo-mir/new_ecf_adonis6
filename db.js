import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

// Connecter à la base de données MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err)
    return
  }
  connection.query(`CREATE DATABASE ${process.env.DB_DATABASE}`, (error) => {
    if (error) {
      console.error('Erreur lors de la création de la base de données :', error)
    } else {
      console.log('Base de données créée avec succès')
    }

    connection.end()
  })
})
