import express from 'express'
import bcrypt from 'bcrypt'
import {User ,Todo} from './db.js'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import {z} from "zod"



const app = express();
app.use(express.json());

const JWT_SECRET = 'prafhf';

mongoose.connect("mongodb+srv://prashilgdscjdcoem:Iw09CmktVfOZYYC6@clusterone.84wiasv.mongodb.net/todo");




app.get("/",(req,res)=>{   
    res.send("hell")
    b 
})

app.post("/signup", async (req,res)=>{

        let requriedBody  = z.object({
            email: z.string().min(5).max(30).email(),
            name: z.string().min(6).max(45),
            password:z.string().min(6).max(20)
        }) 


        const bodyDataWithSuccess = requriedBody.safeParse(req.body)

        if(!bodyDataWithSuccess.success  ){
            res.json({
                message:"u are foramt is not correct",
                error:  bodyDataWithSuccess.error
            })
            return
        }

    const password= req.body.password
    const email = req.body.email
    const name = req.body.name
    
    let throwerr = false;
   try {
     const hasedpassword= await bcrypt.hash(password ,6)
 
      await User.create({
         password:hasedpassword,
         name:name,
         email:email
      })
   } catch (error) {
        res.json({
            message:"u are  email alreadty registred"
        })
        throwerr = true;
   }
   if(!throwerr){
    res.json({
        message:"u are now signup"
     })
   }
     
})


app.post("/signin", async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;



    const user = await User.findOne({
        email:email,
    })

    if(!user){
        res.json({
            message:"u are not registered"
        })
    }

    const passwordMatch =  bcrypt.compare(password, user.password)


    
    if(passwordMatch){
         const token= jwt.sign({
            id:user._id.toString()
         },JWT_SECRET)
         res.json({
            token:token
         })
    }else{
        res.status(403).json({
            message:' not signuped'
        })
    }

})

app.post("/todo", auth , async (req,res)=>{
    const title = req.body.title;
    const done = req.body.done;
    const userId = req.userId

     await Todo.create({
        title,
        done,
        userId
    })
    
    res.json({
        message:"u are todo created "

     })

})

app.get("/todos",auth , async (req,res)=>{

    const userId = req.userId;
    
    const todos = await Todo.find({
        userId
    })
    res.json({
        todos
    })

})




// auth middlewares

function auth(req,res,next){
    const token = req.headers.token;
    const decodedtoken = jwt.verify(token, JWT_SECRET);

    if(decodedtoken){
        req.userId = decodedtoken.id;
        next();
    }else{
        res.json({
            message: "u are not authe"
        })
    }
        
}

app.listen(3000,()=>{
    console.log("port 3000");
    
});

