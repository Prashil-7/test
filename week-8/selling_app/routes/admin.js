import { Router } from "express";
import { AdminModel } from "../models/admin.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { adminmiddleware } from "../middlewares/admin.middle.js";
import { CourseModel } from "../models/course.js";




const adminRouter =Router();

adminRouter.post("/signup", async (req,res)=>{
    const { email ,password ,firstName,lastName} = req.body;

       
           

     try {

        const alreadyExitsEmail =  await AdminModel.findOne({email})
       
        if(alreadyExitsEmail){
        res.status(404).json({
            Message: "u are already exits mailId please signin"
        })
    }
    

 const passwordHashAdmin = await bcrypt.hash(password ,5);


        const adminUser = await  AdminModel.create({
            email: email,
            firstName:firstName,
            lastName:lastName,
            password:passwordHashAdmin
        })
         return  res.status(200).json({
            Message:"u are now signup"
        })
     } catch (error) {
        console.error(`the error happen in admin : ${error}`);
        
         return res.status(500).json({
            Message:" serever error in admin"
        })
     }
   

    
    
})

adminRouter.post("/signin", async (req,res)=>{ 
    
    const {email ,password} = req.body;

  try {
      const admin = await  AdminModel.findOne({email });
           if(!email){
               return res.status(500).json({
                  Message:"invlaid email please signup"
              })
           }
  
      const  adminHashMatched = bcrypt.compare(password ,admin.password);

      if(adminHashMatched){
        const token= jwt.sign({
            id:admin._id.toString()
        }, process.env.JWT_SECRET_ADMIN)

         return  res.status(200).json({
            token:token,
            Message:"u are now signin "
        })
      
      }

     
  } catch (error) {
    console.error(`the error in admin signin :${error}`);
    return res.status(500).json({
        Message:"u are invalid credentials"
    })
  }

})


adminRouter.post("/course", adminmiddleware , async (req,res)=>{

    const adminId = req.creatorId

    const {title ,description, price ,imageUrl } = req.body;

    if(!title || !price ){
        res.json({
            msg:"give all field"
        })
    }

//use cloudianry  and multer for upload images... 
   try {
     const course = await CourseModel.create({
         title,
         description,
         price,
         imageUrl, // here fixed some bugs
         creatorId:adminId
     })
      return res.status(200).json({
         Message:"u are uploaded the course details",
         courseId : course._id
     })
   } catch (error) {
    console.log(`the errr inn  course ${error}`);
    return res.status(405).json({
        message:"u are now have course problmes"
    })
    
    
   }

})


adminRouter.put("/course" ,adminmiddleware,async(req,res)=>{
    
    const adminId = req.creatorId;

    const {title , description , imageUrl ,price , courseId} = req.body

    //check ki course admin hi change kar raha hai

   try {
     const coursecheck =  await CourseModel.findOne({
         _id :courseId,
         creatorId :adminId
     })
 
     if(!coursecheck){
         res.json({
             Message:"u are not creator of that course"
         })
     }
   } catch (error) {
    res.json({
        message:"u are not upadated the course check"
    })
    console.log(`hte err in course  check ${error}`);
   }


    //update that  course_id  is se
 //updateone me pahle konsi  1) id se upadate karu  
 //2) kya upadate karu ...
 //3) options
    try {
        const courseUpdate =  await CourseModel.updateOne({
            _id : courseId,
            creatorId : adminId
        } ,{
            title,
            description,
            price ,
            imageUrl
    
        })
        res.json({
            Message:"u are course updated",
            courseId:courseUpdate._id
        })
    } catch (error) {
        res.json({
            message:"u are not upadated course"
        })
        console.log(`the err in course update ${error}`);
        
    }
})


adminRouter.get("/course/published",adminmiddleware, async (req,res)=>{
    const adminId = req.creatorId;
     
    const courses =await CourseModel.find({
        creatorId: adminId
    })
    res.json({
        message:"u are now upadated the course",
        courses
    }) 
})

export {adminRouter};