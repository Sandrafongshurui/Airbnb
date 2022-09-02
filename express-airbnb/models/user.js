const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        default: "male",        
    },
    password: {
        type: String,
        required: true
    },
    aboutMe: {
        type: String,
        default: " "
    },
    image: {
        type: String,
        default: " "
    }

},
{ timestamps: true }
)

module.exports = mongoose.model('User', userSchema)