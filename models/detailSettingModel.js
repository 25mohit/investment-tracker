const mongoose = require('mongoose')
const uuid = require('uuid').v4

const detailSettingSchema = mongoose.Schema({
    parentID: String,
    parentName: String,
    invTypeName: {
        type: String
    },
    userID: String,
    sequence: Number,
    invTypeDetail: String,
    uuid: {
        type: String,
        default: uuid()
    }
}, { timestamps : true })

const DetailSetting = mongoose.model('DetailSetting', detailSettingSchema)
module.exports = DetailSetting