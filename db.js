// db.js
const mysql = require('mysql2/promise');
require('dotenv').config()

const pool = mysql.createPool({
  host: process.env.DB_HOST,        // Adresse du serveur MySQL
  user: process.env.DB_USER,         // Nom d'utilisateur de la base de données
  password: process.env.DB_PASSWORD,     // Mot de passe de la base de données
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,      // Limite de connexions simultanées
  queueLimit: 0             // Taille maximale de la file d'attente
});

module.exports = pool;