const router = require('express').Router(); //router is a class
const Cart = require('../models/cart');
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require('../routes/verifytoken');

//create product
router.post('/',verifyTokenAndAuthorization, async (req,res) => {
    const newCart = new Cart (req.body);
    try {
        const savedCart= await newCart.save();
        res.status(200).json(savedCart);
    }catch (err) {
        res.status(500).json(err);
    }
})

//update 
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    
        try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id, 
            {
            $set: req.body // updating the product
        }, 
        {
            new: true // return the updated product
        });
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Delete 
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedCart,"Cart Deleted Successfully");
    } catch (err) {
        res.status(500).json(err);
    }
});
// get carts by id
router.get("/find/:id",verifyTokenAndAuthorization, async (req, res) => {
    try {
      const Cart = await Cart.findById(req.params.id);
      res.status(200).json(Cart);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// get all carts
router.get('/', verifyTokenAndAdmin,async (req,res) => {
    try{
        const Carts = await Cart.find();
        res.send(200).json(Carts)
    }catch(err){
        res.status(500).json(err)
    }
} )


module.exports = router;