const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    confirmEmail: {
        type : Boolean,
        default : "false"
    }
});

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;
