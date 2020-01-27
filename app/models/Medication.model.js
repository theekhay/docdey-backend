const mongoose = require('mongoose');

var Schema = mongoose.Schema;


var MedicaitonSchema = new Schema({

    drugs: [{
        
        name: String,
        id: String
    }],

    name: {
        
        name: String
    },

    dosage: {
        type: Number,
        required: true
    },

    dosageTimes: {
        type: Array,
        required: true
    },

    dosageStart: {
        type: Date,
        required: true
    },

    dosageEnd: {
        type: Date,
        required: true
    },

    uuid: {
        type: String,
        unique: true,
        required: true
    },

    createdBy: {
        type: String,
        required: true
    },

    updatedBy: {
        type: String
    },

    status: {
        type: String,
        allowedValues: ["ACTIVE", "COMPLETED", "PENDING"],
        required: true
    },

    history: [{
        event: String,
        comment: String,
        userId: String,
        createdAt: Date
    }],

    deletedAt: {
        type: Date,
        default: null
    }, 
    
    deletedBy: {
        type: String
    }

});

// EventSchema.pre('save', function(next) {

//     console.log("trying to convert!");
//     console.log(this._id, typeof this._id)
//     console.log(this._id.toString(), typeof this._id.toString() )
//     this._id = this._id.toString();
//     next();
// });

let Medicaiton = mongoose.model('medications', MedicaitonSchema);

module.exports = Medicaiton;
