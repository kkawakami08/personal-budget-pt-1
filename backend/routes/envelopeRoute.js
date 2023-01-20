const express = require('express')
const router = express.Router()
const {getAllEnvelopes, newEnvelope,getOneEnvelope,updateEnvelope,deleteEnvelope} = require('../controllers/envelopeController')
const { update } = require('../models/envelopeModel')

router.get("/", getAllEnvelopes)
router.get("/:id", getOneEnvelope)
router.put("/:id", updateEnvelope)
router.delete("/:id", deleteEnvelope)
router.post("/new",newEnvelope)

module.exports = router