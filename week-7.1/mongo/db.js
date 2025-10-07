import mongoose, { mongo, Schema } from "mongoose";
const ObjectId = mongoose.ObjectId

const userSchema = new Schema({
    email: String,
    password:String,
    name:String
},{timestamps: true});


const todoSchema = new Schema({
    title:String,
    userId: ObjectId,
    done:Boolean
},{timestamps: true});
 





export const Todo = mongoose.model("Todo" , todoSchema)
export const User = mongoose.model("User" , userSchema) 