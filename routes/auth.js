const router = require('express').Router(); 
const user = require('../models/user'); // importing the userSchema from the user.js file
router.post("/register", (req, res) => {
    const newuser = new user({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    
    });
    
})





module.export = router;