const router = require('express').Router(); //router is a class
const User = require('../models/User');
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require('../routes/verifytoken');

// update
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => { // put is used to update the data
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }
    
    try {
        const UpdatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body // updating the user
        }, {
            new: true
        });
        res.status(200).json(UpdatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Delete 
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const DeletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(204).json(DeletedUser,"User Deleted Successfully");
0    } catch (err) {
        res.status(500).json(err);
    }
});

//Get user 
router.get('/', verifyTokenAndAdmin, async (req, res) => {  // find user by id 
    try {
        const query = req.query.new;
        const users = query ? await User.find().sort({_id: -1}).limit(2) : await User.find(req.params.id);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get Stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => { 
    const date = new Date(); // this is the current date
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1)); // this is the last year
    try {
        const data = await User.aggregate([
            {$match : {createdAt : {$gte : lastYear}}},
            {$project: {
                month: {$month: "$createdAt"},
            },
        },
        {$group: {
            _id : "$month",
            total : {$sum: 1}
        }
    }
        ]);
        res.status(200).json(data);
    }catch (err){
        res.status(500).json(err);
    }
});




// //Get user 
// router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {  // find user by id 
//     try {
//         const user = await User.findById(req.params.id);
//         const {password, ...others} = user._doc;
//         res.status(200).json(others);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

module.exports = router;