const express = require('express'); //express is used to create the router
const app = express(); 
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//----------------------------------
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

dotenv.config();

//connecting mongodb 
mongoose.connect(process.env.MONGO_URL)
    .then(() => 
    console.log("db connection was successful"))
    .catch((err) => {
    console.log(err);
    });
    app.use(express.json()); // parse the json data

    // app.get('/api/test', () => {
    // app.get('/api/test', () => {
    //     console.log("test us successful");
    // });

    app.use('/api/users', userRouter); //api.use is used to register a middleware function to a given path.(get,post,put,delete)
    app.use('/api/auth', authRouter);


//listen to port
app.listen(process.env.PORT || 5000, () => {
    console.log('Server started ');
});