import dotenv from 'dotenv';
dotenv.config();

import express from "express";

const app = express()

console.log(process.env.PORT);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/hyamir', (req, res) => {
    res.send("Hello Amir");
})

app.get('/button', (req, res) => {
    res.send("<button>Login</button>");
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on this url http://localhost:${process.env.PORT}`)
})