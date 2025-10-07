import mongoose, { Schema }  from "mongoose";
import { strictObject } from "zod";

export  const connectDB = async ()=>{

try {
    const connectionDB =  await mongoose.connect(`${process.env.MONGO_URI}`)
    console.log(`the connection ${connectionDB.connection.host}`);
    
} catch (error) {
    console.log(`the err in db , ${error}`);
    
}
}


const userSchema  = new Schema ({
    username:{
        type:String,
        required : true,
        
    },
    password:{
        type:String,
        requried :true
    }

},{timestamps:true})
 export const userModel = mongoose.model('user',userSchema);

 const contenSchema = new Schema({
    title:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId,
        ref:"tags"
    }],
    userId :[{type:mongoose.Types.ObjectId,
        ref:"user",
        requried:true
    }]
 })
 export const contentModel = mongoose.model("content", contenSchema)


 const linkSchema = new Schema({
    hash:String,
    userId :[{type:mongoose.Types.ObjectId,
        ref:"user",
        requried:true,
        unique:true
    }]
 })
 export const linkModel = mongoose.model("link", linkSchema);


