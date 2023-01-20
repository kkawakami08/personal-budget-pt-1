const asyncHandler = require('express-async-handler')
const Envelope = require('../models/envelopeModel')

//@desc Get all envelopes
//@router GET /api/envelopes
//@acces Public
const getAllEnvelopes = asyncHandler(async (req,res) => {
    const envelopes = await Envelope.find()
    res.status(200).json(envelopes)
})

//@desc SET new envelope
//@router POST /api/envelopes
//@acces Public
const newEnvelope = asyncHandler(async (req,res) => {
    const {category, budget} = req.body
    if (!category || !budget) {
        res.status(400).json({message: "Enter required fields"})
    } else { 
        const envelope = await Envelope.create({
            category, budget
        })
        res.status(200).json(envelope)}
})

//@desc Get individual envelope
//@router GET /api/envelopes/:id
//@acces Public
const getOneEnvelope = asyncHandler(async (req,res) => {
    const envelopeId = req.params.id
    const identifiedEnvelope = await Envelope.findById(envelopeId)
    if (!identifiedEnvelope) {
        res.status(400).json({message: "Invalid ID"})
    } else {
    res.status(200).json(identifiedEnvelope)}
})

//@desc Update individual envelope
//@router PUT /api/envelopes/:id
//@acces Public
const updateEnvelope = asyncHandler(async (req,res) => {
    const envelopeId = req.params.id
    const identifiedEnvelope = await Envelope.findById(envelopeId)
    if (!identifiedEnvelope) {
        res.status(400).json({message: "Invalid ID"})
    } else if (identifiedEnvelope.category === req.body.category || identifiedEnvelope.budget === req.body.budget) {
        res.status(400).json({message: "Please update"})
    } else {
    const updatedEnvelope = await Envelope.findByIdAndUpdate(envelopeId, req.body)
    res.status(200).json({
        old: identifiedEnvelope,
        new: updatedEnvelope})}
})

module.exports = {
    getAllEnvelopes,
    newEnvelope,
    getOneEnvelope,
    updateEnvelope
}