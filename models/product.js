const mongoose = require('mongoose'); 
const joi = require('joi'); 
const passwordComplexity = require('joi-password-complexity');

const ProductSchema = new mongoose.Schema({ 
    title: {type: String, required: true,unique: true},
    desc: {type: String, required: true},
    img : {type: String, required: true},
    categories: {type: Array}, //  to store multiple values 
    size: {type: String, required:true},
    color: {type: String},
    price: {type: Number, required:true},

})

module.exports = mongoose.model('Product', ProductSchema); 