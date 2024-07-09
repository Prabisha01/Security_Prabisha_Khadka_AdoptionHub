const mongoose = require('mongoose');
const path = require("path");

const userSchema = mongoose.Schema({
    fullName :{
        type: String,
        required: true,
    }, 
    email:{
        type: String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    userImageUrl :{
        type: String,
        default: null,
        required: false,
        trim: true
    },
    isAdmin: {
        type : Boolean,
        default: false,
    },
    wishlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wishlist',
      },
    });

const Users = mongoose.model('users', userSchema);
module.exports = Users;