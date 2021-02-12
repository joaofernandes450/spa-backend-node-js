var mongoose = require('../databases/coreDB');
mongoose.set('debug', true)

var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, // Reference to UserID,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    },
    deliveryTime: {
        type: String,
        required: true
    },
    deliveryAddress: {
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
    products: [{
        _id: false,
        name: {
            type: String
        },
        quantity: {
            type: Number,
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true,
        enum: ['pending', 'open', 'delivering', 'closed']
    }
})

module.exports = mongoose.model('Order', OrderSchema)