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

//@desc Transfer budget :from to :to envelope
//@router PUT /api/envelopes/:from/:to
//@acces Public
const transferBudget = asyncHandler(async (req,res) => {
    const fromEnvelopeId = req.params.from
    const toEnvelopeId = req.params.to
    
    const identifiedFromEnvelop = await Envelope.findById(fromEnvelopeId)
    const identifiedToEnvelop = await Envelope.findById(toEnvelopeId)

    if (!identifiedFromEnvelop || !identifiedToEnvelop) {
        res.status(400).json({message: "Invalid Envelope ID"})
    } else {
        const transferAmount = Number(req.body.amount)
        if (transferAmount > identifiedFromEnvelop.budget) {
            res.status(400).json({message: "Not enough transfer funds"})
        } else {
            const newFromBudget = identifiedFromEnvelop.budget - transferAmount
            const newToBudget = identifiedToEnvelop.budget + transferAmount
            
            const updatedFromEnvelope = await Envelope.findByIdAndUpdate(fromEnvelopeId, {budget: newFromBudget})
            const updatedToEnvelope = await Envelope.findByIdAndUpdate(toEnvelopeId, {budget: newToBudget})
            res.status(200).json({
                updatedFromEnvelope,
                updatedToEnvelope
           })
        }


        }

    // const identifiedEnvelope = await Envelope.findById(envelopeId)
    // if (!identifiedEnvelope) {
    //     res.status(400).json({message: "Invalid ID"})
    // } else if (identifiedEnvelope.category === req.body.category || identifiedEnvelope.budget === req.body.budget) {
    //     res.status(400).json({message: "Please update"})
    // } else {
    // const updatedEnvelope = await Envelope.findByIdAndUpdate(envelopeId, req.body)
    // res.status(200).json({
    //     old: identifiedEnvelope,
    //     new: updatedEnvelope})}
})

//@desc Delete individual envelope
//@router DELETE /api/envelopes/:id
//@acces Public
const deleteEnvelope = asyncHandler(async (req,res) => {
    const envelopeId = req.params.id
    const identifiedEnvelope = await Envelope.findById(envelopeId)
    if (!identifiedEnvelope) {
        res.status(400).json({message: "Invalid ID"})
    } else {
    await identifiedEnvelope.remove()
    res.status(200).json({
        message: `Removed`})}
})

module.exports = {
    getAllEnvelopes,
    newEnvelope,
    getOneEnvelope,
    updateEnvelope,
    deleteEnvelope,
    transferBudget
}