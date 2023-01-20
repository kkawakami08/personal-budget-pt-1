const express = require('express')
const PORT = process.env.PORT || 3000
const colors = require('colors')
const envelopeRouter = require('./routes/envelopeRoute')
const connectDB = require('./config/db')
//dont forget dotenv.config()
const dotenv = require('dotenv').config()

connectDB();

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api/envelopes",envelopeRouter)

app.listen(PORT, () => {console.log(`Server is listening on ${PORT}`.blue)})