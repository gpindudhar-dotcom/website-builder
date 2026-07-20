const mongoose = require("mongoose");

const WebsiteSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    title:{
        type:String,
        required:true
    },

    template:{
        type:String,
        required:true
    },

    content:{
        type:Object,
        default:{}
    },

    published:{
        type:Boolean,
        default:false
    }

},{timestamps:true});

module.exports = mongoose.model("Website",WebsiteSchema);