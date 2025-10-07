 -import { Router } from "express";
import { userModel} from '../models/users.js'
const userRouter = Router();
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { usermiddleware } from "../middlewares/user.middle.js";
import { PurchaseModel } from "../models/purchases.js";
import { CourseModel } from "../models/course.js";

userRouter.post("/signup", async (req,res)=>{
    const {email,password ,firstName ,lastName} = req.body
     //zod validation

    //hased the password..

      const hashPassword =  await bcrypt.hash(password ,6)

try {
     const user = await userModel.create({
            email,
            password:hashPassword,
            firstName,
            lastName
        })
        res.status(200).json({
            message:"you are signup"
        })
} catch (error) {
    res.status(405).json({
        message:"u arlready signuped"
    })
    console.log(`the err in signup ${error}`);
    
}

    
})


userRouter.post("/signin", async (req,res)=>{
    
    const {email , password} =req.body;


  

     const user = await userModel.findOne({ email })

     if(!user){
        res.json({
            message:"u are not signup"
        })
     }

      const passwordMatch = await bcrypt.compare(password, user.password)
     
     
     
    try {
         if(passwordMatch ){
             const token =   jwt.sign({
                id:user._id.toString()
             } ,process.env.JWT_SECRET )
                //cookie logic auth
             
                res.json({
                    token:token
                })
                res.status(200).json({
                    message:"u are signin"
                })
         }
    } catch (error) {
        res.status(404).json({
            message:"u are not signin ",
        })
        console.log(`the err in signin ${error}`); 
    }
})




userRouter.get("/user-purchase", usermiddleware, async(req,res)=>{
    
    const userId = req.userId
    
    try {
        const purchase = await PurchaseModel.find({
                userId,
        })

        let purchasedcourse = [];
        for(let i=0 ;i<purchase.length; i++){
            purchasedcourse.push(purchase[i].courseId)
        }

        const courseData = await CourseModel.find({
            _id :{$in : purchasedcourse}
        })
        res.json({
            purchase,
            courseData
        })
    } catch (error) {
        res.json({
            msg:"u are hav eerr in user purchased"

        })  
        console.log(`the err i usercpurchase ${error}`);
              
    }
})

export {userRouter}