const mongoose = require('mongoose')
const uuid = require('uuid').v4

const ActivitySchema = mongoose.Schema({
    userID: String,
    status: String,
    uuid: {
        type: String,
        default: uuid()
    }
},{ timestamps: true })

const Activity = mongoose.model('Activity', ActivitySchema)
module.exports = Activity