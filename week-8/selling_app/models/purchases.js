// _id   courses from the courses - userid from user 

import mongoose, { mongo, Schema }  from 'mongoose'


const purchaseSchema = new Schema ({

    userId:{type: Schema.Types.ObjectId,
        ref:'User'
    },
    
    courseId:{type: Schema.Types.ObjectId,
        ref:'Course'
    }


},{timestamps:true})


 export const PurchaseModel = mongoose.model("Purchase" , purchaseSchema); 