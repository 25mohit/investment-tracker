const Activity = require("../models/activityModal");
const User = require("../models/userModal");
const asyncHandler = require('express-async-handler');

const activityController = asyncHandler ( async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    if(!user){
        return res.status(400).send("Invalid Token")
    }

    const activity = Activity.create({
        userID: user._id.toString(),
        status: 'Logout'
    })
    if(activity){
       return res.status(200).send("success")
    } else {
       return res.status(400).send("Error")
    }
})

const getAccountActivity = asyncHandler ( async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    if(!user){
        return res.status(400).send("Invalid Token")
    }

    const activity = await Activity.find({userID: user._id.toString()})

    if(!activity.length){
        return res.status(400).send("Not Able to Get Any Activity")
    }

    const newArr = activity.map(single => { return {
        status: single.status,
        time: single.createdAt
    }})
    return res.status(200).json({newArr})
})

module.exports = {
    activityController,
    getAccountActivity
}
