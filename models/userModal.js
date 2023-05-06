const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: Number,
    dob: String,
    uuid: {
        type: String,
        default: uuidv4()
    }
},{ timestamps: true })

userSchema.pre('save', async function (next){
    if(!this.isModified("password")){
        return next()
    }
    
    const salt = await bcrypt.genSalt(10)
    const hasshedPassword = await bcrypt.hash(this.password, salt)
    this.password = hasshedPassword
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User