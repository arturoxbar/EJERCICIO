const { PrismaClient } = require('@prisma/client')
const express = require('express');
const jwt = require("jsonwebtoken");
const app = express()

const compression = require('compression')

app.use(compression())

let prisma = new PrismaClient()

require('dotenv').config();

app.get('/products', async function (req, res) {    
    try {
        let token = req["headers"]["authorization"].split(' ')[1]

        jwt.verify(token, process.env.SECRET)

        const products = await prisma.product.findMany()
    
        res.send(products)
    } catch {
        res.status(401).end()
    }
})
app.listen(3005)