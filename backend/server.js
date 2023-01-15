const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 3000

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.listen(PORT, () => {console.log(`Server is listening on port ${PORT}`.blue)})