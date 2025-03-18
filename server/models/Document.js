const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['PDF', 'DOCX', 'IMAGE', 'TEXT']
    },
    text: {
        type: String,
        required: true
    },
    analysis: {
        generalAnalysis: {
            type: String,
            required: true
        },
        contractSummary: {
            type: String,
            required: true
        },
        riskAssessment: {
            type: String,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Document', DocumentSchema);