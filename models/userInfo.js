const mongoose = require('mongoose')
const uuid = require('uuid').v4

const UserSystemInfoSchema = mongoose.Schema({
    userInfo: Object,
    parent:{
        _id: String,
        uuid: String
    },
    house: String,
    uuid: {
        type: String,
        default: uuid()
    },
    birth: {
        type: Date,
        default: Date.now()
    }
})

const UserSystem = mongoose.model('user-system', UserSystemInfoSchema)

module.exports = UserSystem