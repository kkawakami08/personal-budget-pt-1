const mongoose = require('mongoose')
const envelopeSchema = mongoose.Schema({
    category: {
        type: String,
        required: [true, "Enter category name"]
    },
    budget: {
        type: Number,
        required: [true, "Enter budget amount"]
    }
})

module.exports = mongoose.model("Envelope",envelopeSchema)