const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    roles:{
        user:{
            type:Number,
            default:501
        },
        editor:Number,
        admin:Number
    },
    password:{
        type:String,
        required: true
    },
    refreshToken:String
});

module.exports = mongoose.model('User',userSchema);