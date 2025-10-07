// _id - title - imageURL - description - price timestamps  -creatorid is from admin



import mongoose, { mongo, Schema }  from 'mongoose'


const courseSchema = new Schema ({

    title:String,
    description:String,
    imageUrl: String,
    price:Number,
    creatorId :{  type : Schema.Types.ObjectId,
        ref: 'Admin'
    }

},{timestamps:true})


 export const CourseModel = mongoose.model("Course" , courseSchema); 