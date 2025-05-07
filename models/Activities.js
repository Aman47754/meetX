const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    Id: {
        type: String,
        
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    time: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Activity', ActivitySchema);