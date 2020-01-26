const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AppointmentSchema = new Schema({

    patient: {
        name: String,
        email: String,
        phoneNumber: String
    },

    specialist: {
        id: String,
        name: String
    },

    condition: {
        type: String
    },

    date: {
        type: Date, 
        required: true
    },

    startTime: {
        type: String, 
        required: true
    },

    endTime: {
        type: String, 
        required: true
    },

    createdAt: {
        type: Date,
        required: true
    },

    updatedAt: {
        type: Date
    }
});

let Appointment = mongoose.model('appointments', AppointmentSchema);

module.exports = Appointment;