const mongoose = require('mongoose')
const uuid = require('uuid').v4

const investmentSchema = mongoose.Schema({
    invAction: {
        type: String,
        default: 'Investing'
    },
    invType: String,
    invAssetName: String,
    invAssetPrice: Number,
    invDate: Date,
    invQuantity: Number,
    invWages: [
        {
            wagesType: String,
            wagesAmount: Number
        }
    ],
    userID: String,
    invExtraNote: String,
    invAmount: Number,
    uuid: {
        type: String,
        default: uuid()
    }
},{ timestamps: true })

const Invest = mongoose.model('Invest', investmentSchema)
module.exports = Invest