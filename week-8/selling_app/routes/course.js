import { Router } from "express";
import { PurchaseModel } from "../models/purchases.js"; 
import {CourseModel} from '../models/course.js'
import { usermiddleware } from "../middlewares/user.middle.js";

const courseRouter = Router();


courseRouter.post("/purchases", usermiddleware, async (req,res)=>{
    
    const {userId ,courseId} = req.body;

    //use check that user is paid   ofr the course      s

    try {
         await PurchaseModel.create({
            userId,
            courseId
        })
      return  res.status(200).json({
        message:"u bought these course"
      })
    } catch (error) {
        res.json({
            message:"u have some problmes in purchase course"
        })
        console.log(`the purchased course  err ${error}`);
        
    }
})


courseRouter.get("/preview", async (req,res)=>{

        const course = await CourseModel.find({});

        res.json({
            course
        })
  
    })
    



    export {courseRouter};