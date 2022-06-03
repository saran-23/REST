const mongoose = require('mongoose');
const joi = require('joi');
const passwordComplexity = require('password-complexity');

const CartSchema = new mongoose.schema({
    userId: {type: String, required: true},
    products: [
        {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
}, 
    {timeStamps: true}
);

module.exports = mongoose.model('cart', CartSchema);