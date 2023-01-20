const express = require('express')
const router = express.Router()
const {getAllEnvelopes, newEnvelope} = require('../controllers/envelopeController')

router.get("/", getAllEnvelopes)
router.post("/new",newEnvelope)

module.exports = router