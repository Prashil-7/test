import express from 'express';
import 'dotenv/config'
import { z } from 'zod';
import bcrypt, { hash } from 'bcrypt'
import { userModel ,connectDB,contentModel, linkModel} from './db';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { useMiddleware } from './middleware';
import { random } from './uitls';

const app = express();
app.use(express.json());


connectDB();

const PORT = process.env.PORT;


app.post("/api/v1/signup" , async (req,res)=>{

  

    

    const inputChecks = z.object({
      username: z
        .string()
        .min(3, 'Username must be at least 3 characters long')
        .max(20, 'Username must be at most 20 characters long'),
        //.regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    
      password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .max(100, 'Password must be less than 100 characters long')
        // .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        // .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        // .regex(/[0-9]/, 'Password must contain at least one number')
        // .regex(/[\W_]/, 'Password must contain at least one special character'),
    });
    
    // Example usage
    const result = inputChecks.safeParse( req.body);
    
    if (!result.success) {
      console.error(result.error.format());
    } else {
      console.log('Valid input:', result.data);
    }
    

    const {username, password}  = req.body;
   
        try {
            const hashPassword = await bcrypt.hash(password,10);

            const userExits = await  userModel.findOne({username});

            // if(userExits){
            //      return res.status(500).json({
            //         msg:"u are already exits"
            //      })
            // }
            if(userExits){
                 res.json({msg:"u are already registered"})
            }
            
            await userModel.create({ username, 
                password: hashPassword });

            res.json({ msg: "User registered successfully" });

        } catch (error) {
            res.status(500).json({
                msg:"u are invalid credentials"
            })
            console.log(`error in signup${error}`);
            
        }

    
})

// app.post("/api/v1/signin" , async (req,res)=>{

//       const { username, password } =req.body;

//       try {
//         const user = await userModel.findOne({username})
//         if(!user) {res.json({msg:"u are not signn up"});}
  
//     const passwordMatch = await bcrypt.compare(password , user?.password!);
//     if(!passwordMatch){
//         res.json({msg:"password incorrect"})
//     }
  
//          const existingUser = await userModel.findOne({username , password: passwordMatch});
  
//          try {
//             if(existingUser) {
//              const token =   jwt.sign({id: existingUser._id},
//                process.env.JWT_SECRET!)
   
//                  res.status(200).json({token})
//             }
//          } catch (error) {
//             res.json({msg:"err"})
//             console.log(`the err ${error}`);
            
//          }
         

//       } catch (error) {
//         res.json({msg:"invalid info"})
//         console.log(`the err in signin ${error}`);
        
        
//       }

  

    
    
//     }) 


    app.post("/api/v1/signin", async (req, res) => {
        const { username, password } = req.body;
      
        try {
          const user = await userModel.findOne({ username });
          if (!user) {
             res.status(400).json({ msg: "You are not signed up" });
          }
                              //@ts-ignore
          const passwordMatch = await bcrypt.compare(password, user.password!);
          if (!passwordMatch) {
            res.status(401).json({ msg: "Password incorrect" });
          }
      
          if (!process.env.JWT_SECRET) {
             res.status(500).json({ msg: "JWT_SECRET is not defined" });
          }
              //@ts-ignore
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
            expiresIn: "1h", // optional: token expiration
          });
      
           res.status(200).json({ token });
        } catch (error) {
          console.error("Error in signin:", error);
           res.status(500).json({ msg: "Server error during signin" });
        }
      });
      
//@ts-ignore
app.post("/api/v1/content" ,useMiddleware ,  async (req,res)=>{
//todso bananna
  const {title, link, } = req.body;
  try {
    
    await contentModel.create({
      link,title,
      //@ts-ignore
      userId : req.userId,
      tags:[]
    })
    res.json({
      msg:"u are contend added"
    })
  } catch (error) {
    res.json({msg:"u are contend no added"})
    console.log(`the err ${error}`);
  }

})

//@ts-ignore
app.get("/api/v1/content" ,useMiddleware ,  async (req,res)=>{
  //view all tosdos
  //@ts-ignore 
  const userId = req.userId

  try {
    const content = await contentModel.find({userId }).populate("userId" ,"username")
    res.json({content})
    
  } catch (error) {
    
  }

})


//@ts-ignore
app.delete("/api/v1/content", useMiddleware ,  async(req,res)=>{
  const contentId = req.body.contentId;
  
  await contentModel.deleteOne({
    contentId,
      //@ts-ignore
    userId :req.userId
  })
  res.json({mag:"u ar econtent now deleted"})
})

//@ts-ignore

app.post("/api/v1/brain/share" , useMiddleware , async (req,res)=>{
    const {share} = req.body;
    const hash = random(10);
    if(share){
      const  exitingUser =  await linkModel.findOne({
        //@ts-ignore
        userId :req.userId
      })
      if(exitingUser){
        res.json({
          hash: exitingUser.hash
        })
        return;
      }


       await linkModel.create({
        hash,//@ts-ignore
        userId: req.userId
      })
      res.json({hashlink:  hash})
    }
    else{
       await linkModel.deleteOne({//@ts-ignore
        userId:req.userId
      })
    }
    res.json({
      msg:"u are shared link  removed"
    })
})


app.get("/api/v1/brain/:sharedLink", async (req,res)=>{
  const hash = req.params.sharedLink;
  console.log("hte reach");
  

  const  link =  await linkModel.findOne({
    hash
  })
    if(!link){
      res.json({
        mag:" link is not found"
      })
      return;
    }
    const content =  await contentModel.find({
      userId : link.userId
    })

    const user = await userModel.findOne({
      _id :link.userId
    })

    if(!user){
      res.status(404).json({msg:'user not found err happen our side'});
      return ;
    }

    res.json({
      username: user.username,
      content: content
    })
})



app.listen(PORT,()=>{
    console.log(`the port running on ${PORT}`);
    
})



