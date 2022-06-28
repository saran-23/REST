const router = require('express').Router(); //router is a class
const Order = require('../models/order');
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require('../routes/verifytoken');

//create order
router.post('/',verifyTokenAndAuthorization, async (req,res) => {
    const newOrder = new Order (req.body);
    try {
        const savedOrder= await newOrder.save();
        res.status(200).json(savedOrder);
    }catch (err) {
        res.status(500).json(err);
    }
})

//update  order
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    
        try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, 
            {
            $set: req.body // updating the product
        }, 
        {
            new: true // return the updated product
        });
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Delete order
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedOrder,"Order Deleted Successfully");
    } catch (err) {
        res.status(500).json(err);
    }
});
// get user order
router.get("/find/:id",verifyTokenAndAuthorization, async (req, res) => {
    try {
      const Order = await Order.findOne(req.params.id);
      res.status(200).json(Order);  
    } catch (err) {
      res.status(500).json(err);
    }
  });

// get all orders
router.get('/', verifyTokenAndAdmin,async (req,res) => {
    try{
        const Orders = await Order.find();
        res.send(200).json(Orders)
    }catch(err){
        res.status(500).json(err)
    }
} )

// Get Monthly INCOME
router.get('/income', verifyTokenAndAdmin, async(req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));

    try{
        const income =  await Order.aggregate([
            {$match:{createdAt: {$gte: previousMonth}}},
            {$project: {
                month: {$month: "$createdAt"},
                sales :"$amount",
            },
        },
            {
                $group:{
                    _id: "$month",
                    total : {$sum: "$sales"}
                }
            }
        ])
        res.status(200).json(income);
        return;
    }catch (err){
        res.send(500).json(err);
        return;
    }
});

module.exports = router;