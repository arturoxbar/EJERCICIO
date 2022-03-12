const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
require ('dotenv').config();

const jwt = require('jsonwebtoken');
let prisma = new PrismaClient()

app.use(bodyParser.json())

app.post('/signin', async function (req, res) {

  let user = req.body.user
  let pwd = req.body.pwd

  if (typeof user !== 'string' || typeof pwd !== 'string') {
    res.status(400).end()
  } else {
    const login = await prisma.user.findUnique({
      where: {
        email: user,
      },
    })
    if (login && login.pwd === pwd) {

      var token = jwt.sign({ user, exp: Date.now(), id: login.id }, process.env.SECRET);

      console.log(token)
      
      res.send(token)
    } else {
      res.status(401).end()
    }
  }
})

app.post('/signup', async function (req, res) {

  let user = req.body.user
  let pwd = req.body.pwd

  if (typeof user !== 'string' || typeof pwd !== 'string') {
    res.status(400).end()
  } else {
    await prisma.user.create({
      data: {
        email: user,
        pwd: pwd
      },
    })

    res.end()
  }
})

app.listen(3010)


