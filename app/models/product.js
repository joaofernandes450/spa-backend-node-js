var mongoose = require('../databases/coreDB');
mongoose.set('debug', true)

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    weight: {
        type: Number,
        required: true
    },
    ingredients: [{
        _id: false,
        type: String,
    }],
    nutricional: {
        energyValueKCAL: {
            type: Number
        },
        energyValueKJ: {
            type: Number
        },
        fat: {
            type: Number,
        },
        fatSaturates: {
            type: Number
        },
        carbohydrate: {
            type: Number
        },
        sugar: {
            type: Number,
        },
        fiber: {
            type: Number,
        },
        protein: {
            type: Number
        },
        sodium: {
            type: Number
        }
    },
    price: {
        type: Number
    },
    tags: [{
        _id: false,
        type: String
    }],
    type: {
        type: String
    }
})

module.exports = mongoose.model('Product', ProductSchema)