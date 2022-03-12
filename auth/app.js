const { PrismaClient } = require('@prisma/client')
const express = require('express')

require ('dotenv').config();

const jwt = require('jsonwebtoken');
let prisma = new PrismaClient()
const app = express()

app.get('/signin', async function (req, res) {

  let user = req.query['user']
  let pwd = req.query['pwd']

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

app.get('/signup', async function (req, res) {

  let user = req.query['user']
  let pwd = req.query['pwd']

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


