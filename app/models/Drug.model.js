const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var components = new Schema({

    name: String, 
    quantity: Number,
    measurementUnit: String
})

var interactions = new Schema({

    drug: String, 
    interaction: String
})

var variants = new Schema({

    name: String
})

var DrugSchema = new Schema({

    name: {
        type: String,
        unique: true,
        required: true
    },

    components: {
        type: [ components ]
    },

    sideEffects: {
        type: Array
    },

    interactions: {
        type: [interactions]
    },

    commonBrands: {
        type: Array
    },

    dosage: {
        type: String
    },

    uuid: {
        type: String,
        unique: true,
        required: true
    }, 
    
    variants: {
        type: [variants]
    },

    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },

    createdBy: {
        type: String,
        required: true
    },

    updatedBy: {
        type: String
    },

    updatedAt: {
        type: Date,
    },

    deletedAt: {
        type: Date,
        default: null
    }, 
    
    deletedBy: {
        type: String
    }

});


let Drug = mongoose.model('drugs', DrugSchema);

module.exports = Drug;
