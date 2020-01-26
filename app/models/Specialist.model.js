const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SpecialistSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    fullName: {
        type: String
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    isEmailVerified: {
        type: Boolean,
        default: false
    },

    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },

    isPhoneNumberVerified: {
        type: Boolean,
        default: false
    },

    dob: {
        type: Date
    },

    address: {
        type: String
    },

    yearsOfExperience: {
        type: Number
    },

    role: {
        type: String,
        required: true
    },

    department: {
        type: String
    }

});

let Specialist = mongoose.model('specialists', SpecialistSchema);
module.exports = Specialist;