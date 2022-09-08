const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,           
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    about_me: {
        type: String,
        default: "-"
    },
    image: {
        type: String,
        default: "-"
    }

},
{ timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User