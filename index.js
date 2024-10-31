const express = require('express')
require('dotenv').config()
var bodyParser = require('body-parser')
const pool = require('./db')
const app = express()
const port = process.env.PORT
var jsonParser = bodyParser.json()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/postCompteur', jsonParser, async function (req, res) {
  if (!req.body) res.sendStatus(400)

  const { counter, userId } = req.body
  try {
    const [rows] = await pool.query(
      'INSERT INTO compteur (compteur, userId) VALUES (?,?) ON DUPLICATE KEY UPDATE compteur=?',
      [counter, userId, counter]
    )
    res.json(rows)
  } catch (err) {
    console.error('Erreur lors de linsertion des valeurs:', err)
    res.status(500).send('Erreur du serveur')
  }
})

app.get('/compteur/:userId' , async (req, res) => {
  const { userId } = req.params
  try {
    const [rows] = await pool.query('SELECT compteur FROM compteur WHERE userId = ?', [
      userId,
    ])
    console.log(rows)
    res.json(rows.length > 0 ? rows[0].compteur : 0)
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs:', err)
    res.status(500).send('Erreur du serveur')
  }
})

app.post('/user', jsonParser, function (req, res) {
  if (!req.body) res.sendStatus(400)

  const userId = req.body
  console.log(userId)

  res.send({ message: 'Tout good' })
})

app.put('/resetCompteur', jsonParser, async function(req, res) {
  const { userId } = req.body
  console.log(userId)
  await pool.query(
    'UPDATE compteur SET compteur=? WHERE userId=?',
    [0, userId]
  )
  res.json({success: true})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
