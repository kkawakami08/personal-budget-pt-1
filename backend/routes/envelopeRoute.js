const express = require('express')
const router = express.Router()
const {getAllEnvelopes, newEnvelope,getOneEnvelope} = require('../controllers/envelopeController')

router.get("/", getAllEnvelopes)
router.get("/:id", getOneEnvelope)
router.post("/new",newEnvelope)

module.exports = router