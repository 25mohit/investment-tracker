const User = require("../models/userModal")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Activity = require("../models/activityModal")
const Invest = require('../models/investModal');
const UserSystem = require("../models/userInfo")
const SystemInfo = require("../extras/SystemInfoGet")

const generateToken = (id, name) => {
    return jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

const registerUser = asyncHandler ( async (req, res) => {
    const { name, email, password, mobile, dob } = req.body
    
    if( !name || !email || !password ) {
        return res.status(401).json({
            status: false,
            message: "Unable to Create User, Please Fill All Required Fields"
        })
    }

    const isUserExists = await User.findOne({ email }) && User.findOne({ mobile })

    if(isUserExists){
        return res.status(400).json({
            status: false,
            message: "User Already Exists"
        })
    }

    const user = await User.create({
        name, email, password, mobile, dob
    })

    if(user){
        UserSystem.create({
            userInfo: SystemInfo(),
            parent: {
                _id: user._id,
                uuid: user.uuid
            },
            house: 'Register'
        })
        return res.status(201).json({
            status: true,
            message: `User with ${name} Successfully Created`
        })
    } else {
        return res.status(400).json({
            status: false,
            message: "Invalid Credentials"
        })
    }
})

const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })

    if(!user){
        return res.status(400).json({status: false, message: "User Data not Found in our DB"})
    }

    const buyP = await Invest.find({userID: user._id,invAction: 'Buy' }).select('invAmount')
    const sellP = await Invest.find({userID: user._id,invAction: 'Sell' }).select('invAmount')
    
    const finaleB = buyP.map(price => price.invAmount).reduce((a, b) => a+b,0)
    const finaleP = sellP.map(price => price.invAmount).reduce((a, b) => a+b,0)

    const verifyPassword = await bcrypt.compare(password, user.password)

    const token = generateToken(user._id, user.name)

    if(user && verifyPassword){
        Activity.create({
            userID: user._id,
            status: "Login"
        })
        UserSystem.create({
            userInfo: SystemInfo(),
            parent: {
                _id: user._id,
                uuid: user.uuid
            },
            house: 'Login'
        })
        return res.status(200).json({status: true, investments:{ invested: finaleB, sold: finaleP}, token, message: "Log-In Successfully", user: user.name})
    } else {
        return res.status(400).json({status: false, message: "Invalid Credentials"})
    }
})

module.exports = {
    registerUser,
    loginUser
}