const mongoose = require('mongoose');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');


// userschema to describe the structure of the user
const UserSchema = new mongoose.Schema(  
    {
        username: {type: String, required: true, unique: true},
        email : {type: String, required: true, unique: true},
        password: {type: String, required: true},
        isAdmin: { 
            type: Boolean,
            default: false, 
        },
    },
        { timestamps: true } //
    );


module.exports = mongoose.model('User', UserSchema); 