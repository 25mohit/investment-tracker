const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModal')

const protect = asyncHandler ( async (req, res, next) => {
    const token = req.headers.authentication

    if(!token){
        res.status(400).send('Invalid on Not Found Authentication Token')
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET)

    if(!verify){
        res.status(400).send("Invalid Auth Token")
    }
    
    const user = await User.findById(verify.id).select("-password")
    // console.log("token", verify, user);
    if(!user){
        res.status(400).send('User not Found in DB')
    }

    req.user = user
    next()
})

module.exports = protect