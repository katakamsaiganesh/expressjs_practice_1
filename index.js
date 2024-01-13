const express = require('express')
const {open} = require('sqlite')
const path = require('path')
const sqlite3 = require('sqlite3')
const app = express()
const dbPath = path.join(__dirname, 'goodreads')
let db = null

const initiliazeDBandServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server is running at localhost')
    })
  } catch (e) {
    console.log(`DB error:${e.message}`)
    process.exit(1)
  }
}

initiliazeDBandServer()

app.get('/books/', async (request, response) => {
  const getBooksQuery = `SELECT * FROM author;`
  const booksArray = await db.all(getBooksQuery)
  response.send(booksArray)
})
