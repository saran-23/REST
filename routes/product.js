const router = require('express').Router(); //router is a class
const Product = require('../models/Product');
const {
    verifyTokenAndAdmin, verifyTokenAndAuthorization
} = require('../routes/verifytoken');

//create product
router.post('/',verifyTokenAndAdmin, async (req,res) => {
    const newProduct = new Product (req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//update 
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    
        try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            {
            $set: req.body // updating the product
        }, 
        {
            new: true // return the updated product
        });
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
})

// //Delete 
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedProduct,"Product Deleted Successfully");
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get("/find/:id",verifyTokenAndAuthorization, async (req, res) => {
    try {
      const product = await Product.findOne(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  });
// //Get product
router.get('/', async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(1); // 
        }else if(qCategory){
            products = await Product.find({categories:{
                $in: [qCategory] // in helps to find the    products with the category
            }});
        }
        else {
            products = await Product.find();  
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;