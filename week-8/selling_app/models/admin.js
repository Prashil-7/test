// _id - email - password - username

import mongoose, { mongo, Schema }  from 'mongoose'


const adminSchema = new Schema ({

    email:{
        type :String,
        
        requried:true
    },
 
    firstName:String,
    lastName:String,
    password:String,


},
{timestamps:true})


 export const AdminModel = mongoose.model("Admin" , adminSchema); 