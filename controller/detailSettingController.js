const DetailSetting = require("../models/detailSettingModel");
const GlobalSetting = require('../models/globalSettingModal')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModal')

const detailSettingAdd =  asyncHandler ( async (req, res) => {
    
    const user = await User.findById(req.user.id).select('-password').select('-uuid')
    
    if(!user){
        res.status(400).send('Invalid Auth Token')
    }

    const parentSettingID = req.params.glID

    const { invTypeName, sequence, invTypeDetail } = req.body

    if(!invTypeName ){
        return res.status(400).json({message: 'Please Fill all Required Fields'})
    }
    
    const isValid = await GlobalSetting.find({uuid: parentSettingID},{userID: user._id.toString()})

    if(isValid.length){
        const { settingName } = isValid[0]
        const newDetailSetting = DetailSetting.create({
            userID: user._id.toString(),
            parentID: parentSettingID,
            invTypeName,
            sequence,
            invTypeDetail,
            parentName: settingName
        })
        if(newDetailSetting){
            return res.status(201).json({status: true, data: {settingName: invTypeName}, message: 'Record Successfully Created'})
        } else {
            return res.status(400).json({status: false, message: 'Unable to Create Entry, Invalid Credentials'})
        }
    } else {
        return res.status(400).send('Unable to Get Any Record')
    }
})

const getDetailSetting = asyncHandler ( async (req, res) => {
    
    const user = await User.findById(req.user.id).select('-password').select('-uuid')
    
    if(!user){
        res.status(400).send('Invalid Auth Token')
    }

    const parent = req.params.parentID
    if(!parent){
        res.status(400).send('Invalid Key')
    }
    const detailSettingList = await DetailSetting.find({userID :{$in: user._id.toString()}})

    if(detailSettingList){
        const newArr = detailSettingList.map(data => {return{
            parentID: data.parentID,
            parentName: data.parentName,
            invTypeName: data.invTypeName,
            sequence: data.sequence,
            invTypeDetail: data.invTypeDetail,
            uuid: data.uuid,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        }})
        res.status(200).json({status: true, data: newArr})
    } else {
        res.status(400).json({ status: false, message:"Unable to Fetch Data from DB"})
    }
})

module.exports = {
    detailSettingAdd,
    getDetailSetting
}