const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({

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
        required: true,
        unique: true
    },

    isEmailVerified: {
        type: Boolean,
        default: false
    },

    phoneNumber: {
        type: String,
        required: true,
        unique: true
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
    }

});

let User = mongoose.model('users', UserSchema);
module.exports = User;