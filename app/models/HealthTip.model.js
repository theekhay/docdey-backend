const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HealthTipSchema = new Schema({

    tip: {
        type: String,
        required: true
    },

    article: {
        name: String
    },

    externalLink: {
        type: String
    },

    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },

    updatedAt: {
        type: Date
    }
});

let HealthTip = mongoose.model('healthtips', HealthTipSchema);

module.exports = HealthTip;