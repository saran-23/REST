

const express = require('express'); //express is used to create the router
const app = express(); 
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
//----------------------------------
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');





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

 //api.use is used to register a middleware function to a given path.(get,post,put,delete)
    app.use('/api/users', userRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/products', productRouter);
    app.use('/api/carts', cartRouter);
    app.use('/api/orders', orderRouter);

//listen to port
app.listen(process.env.PORT || 5000, () => { 
    console.log('Server started ');
});