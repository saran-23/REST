const router = require('express').Router(); 
const user = require('../models/user'); // importing the userSchema from the user.js file
const CryptoJS = require('crypto-js'); //  used to encrypt password it uses chiper block chaining mode and AES
router.post("/register", async (req, res) => { // holding the response by using async await
    const newUser = new user({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,process.env.PASS_KEY), //toString is used to convert the encrypted data into string
    });

    try {
    // saving the data(user-name, email, password) to the database
     const savedUser = await newUser.save(); //await is used to wait for the data to be saved
    // console.log(savedUser);
    res.status(201).json(savedUser); 
    }
    catch (err) {
        // console.log(err.message);
        res.status(500).json(err.message);   
    }


});






module.exports = router;