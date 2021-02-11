var mongoose = require('../databases/userDB');
mongoose.set('debug', true)

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
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    vat: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        }
    },
    deliveryInformation: {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['residential', 'company'],
            required: true
        },
        floor: {
            type: String
        },
        otherInfo: {
            type: String,
        },
        driverInfo: {
            type: String
        }
    },
    userHash: {
        type: String
    },
    recoveryCode: {
        type: String
    }
})

module.exports = mongoose.model('User', UserSchema)