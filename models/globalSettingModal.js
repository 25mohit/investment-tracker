const mongoose = require('mongoose')
const uuid = require('uuid').v4

const globalSettingSchema = mongoose.Schema({
    settingName: String,
    sequence: Number,
    settingDetail: String,
    // userID: String,
    uuid: {
        type: String,
        default: uuid()
    }
},{ timestamps: true})

const GlobalSetting = mongoose.model('GlobalSetting', globalSettingSchema)
module.exports = GlobalSetting