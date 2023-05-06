const asyncHandler = require('express-async-handler')
const GlobalSetting = require('../models/globalSettingModal')
const User = require('../models/userModal')

const addGlobalSetting =  asyncHandler ( async (req, res) => {

   const user = await User.findById(req.user.id).select('-password').select('-uuid')
   
   if(!user){
      res.status(400).send('Invalid Auth Token')
   }

   const { settingName, sequence, settingDetail, uuid } = req.body

    if( !settingName ){
       return res.status(400).send('Please Enter Global Setting Name')
    }

    const newSetting = GlobalSetting.create({ userID:user._id.toString(), settingName, sequence, settingDetail, uuid })

    if(newSetting){
       return res.status(201).json({status: true, data: { settingName, uuid}, message: "Setting Created Successfully"})
    } else {
       return res.status(400).json({status: false, message: 'Invalid Data, Unable to Create new Setting'})
    }
})

const getGlobalSetting = asyncHandler ( async (req, res) => {
   // const user = await User.findById(req.user.id).select('-password')
   
   // if(!user){
   //    res.status(400).send('Invalid Auth Token')
   // }

   const allSettingList = await GlobalSetting.find({})

   if(!allSettingList){
      res.status(400).json({status: false, message: "No data Found, or Invalid Auth Token"})
   } else {
      res.status(200).json({status: true, data: allSettingList})
   }


})

module.exports = {
    addGlobalSetting,
    getGlobalSetting
}