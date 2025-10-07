// _id - username - email - password - timestamps - 

import mongoose, { mongo, Schema }  from 'mongoose'


const userSchema = new Schema ({

    email:{
        type :String,
        unique:true,
        requried:true
    },
 
    firstName:String,
    lastName:String,
    password:String,


},
{timestamps:true})


 export const userModel = mongoose.model("User" , userSchema); 