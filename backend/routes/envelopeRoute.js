const express = require('express')
const router = express.Router()
const {getAllEnvelopes, newEnvelope,getOneEnvelope,updateEnvelope} = require('../controllers/envelopeController')
const { update } = require('../models/envelopeModel')

router.get("/", getAllEnvelopes)
router.get("/:id", getOneEnvelope)
router.put("/:id", updateEnvelope)
router.post("/new",newEnvelope)

module.exports = router