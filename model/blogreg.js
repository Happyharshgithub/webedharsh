const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registerSchema = new Schema ({

    name:{
        type:String,
        required:true,
    },
    penname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
    },

    password:{
        type:String,
        required:true,
    },

    userstatus:{
        type:String,
        required:false,
    }

} , {timestamps:true});





const Blogr = mongoose.model('Blogr', registerSchema);
module.exports = Blogr;




