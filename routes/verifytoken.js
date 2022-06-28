const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    //verifying the token 
    const authHeaders = req.headers.token;
    if (authHeaders) {
        const token = authHeaders.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                res.status(401).json("Invalid Token");
            }
            req.user = user;
            next();
        }); // jwt.verify is used to verify the token
    } else {
        return res.status(401).json("You are not authenticated")
    }
};
//verifying the token and authorization
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You are not authorized to perform this action");
        }
    })
};
// verifying the token and admin authorization
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You are not authorized to perform this action");
        }
    })
};

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
};