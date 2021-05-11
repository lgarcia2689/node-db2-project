const express = require("express")

const CarsRouter = require('./cars/cars-router')

const server = express()

server.use(express.json());

// DO YOUR MAGIC

server.use('/api/Cars', CarsRouter)

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" })
  })

module.exports = server
