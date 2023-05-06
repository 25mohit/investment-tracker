const asyncHandler = require('express-async-handler')
const Invest = require('../models/investModal');
const User = require('../models/userModal');

const addNewInvestment =  asyncHandler ( async (req, res) => {
    const { uuid, invAction, invType, invAssetName, invAssetPrice, invDate, invQuantity, invWages, invExtraNote, invAmount } = req.body

    if(!invType || !invAssetName || !invAssetPrice || !invAmount){
        return res.status(400).json({message: 'Please Fill all Required Fileds'})
    }
    const user = await User.findById(req.user._id).select('-password')
    
    if(!user){
        res.status(400).json({status: false, message: "User not Found, Unable to Add Data"})
    }
    
    const newInvestment = Invest.create({
        invAction, invType, userID:user._id.toString(), invAssetName, invAssetPrice, invDate, invQuantity, invWages, invExtraNote, invAmount, uuid
    })

    if(newInvestment){
        return res.status(201).json({status: true, data: {invAssetName, uuid, invAmount}, message: 'Investment Added Successfully'})
    } else {
        return res.status(400).json({status: false, messgae: "Invalid Data, Unable to Create New Investment"})
    }
})

const getAllInvestment = asyncHandler ( async (req, res) => {
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(400).send("Invalid Auth Token")
    }
    
    const allInvest = await Invest.find({userID: user._id})
    
    if(!allInvest){
        return res.status(400).send('Unable to Get Data From DB')
    }
    const newArr = allInvest.map(inv => {return{
        invAction: inv.invAction,
        invType: inv.invType,
        invAssetName: inv.invAssetName,
        invAssetPrice: inv.invAssetPrice,
        invDate: inv.invDate,
        invQuantity: inv.invQuantity,
        invWages: inv.invWages,
        invExtraNote: inv.invExtraNote,
        invAmount: inv.invAmount,
        uuid: inv.uuid,
        createdAt: inv.createdAt,
        updatedAt: inv.updatedAt,
    }})
    return res.status(200).json({status: true, data: newArr})
})

module.exports = {
    addNewInvestment,
    getAllInvestment
}