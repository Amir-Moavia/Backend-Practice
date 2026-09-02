require('dotenv').config()

const express = require('express');
const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
  
})


app.get('/button', (req, res) => {
  res.send('<button>Click Me!</button>')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})