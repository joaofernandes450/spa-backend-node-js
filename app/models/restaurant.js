var mongoose = require('../databases/coreDB');
mongoose.set('debug', true)

var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
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
    popularity: {
        type: Number,
        default: 0
    },
    rating: [{
        _id: false,
        type: Number
    }]
})

module.exports = mongoose.model('Restaurant', RestaurantSchema)