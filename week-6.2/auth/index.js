import express  from 'express'
import jwt from 'jsonwebtoken'

const app = express();
app.use(express.json())
 const jwt_secret = "ffygugugug";

const users =[];


app.get("/",(req,res)=>{
    res.sendFile(__dirname + "./public/index.html" )
})

app.post("/signup",(req ,res)=>{

    const username = req.body.username;
    const password = req.body.password;
 
    
       
        
    

    users.push({
        username,
        password
    })
    res.json({
        message:"u are signup"
    })
})

app.post("/signin",(req,res)=>{

    const username = req.body.username;
    const password = req.body.password;

    const user = users.find((u)=>{
        if(u.username === username && u.password === password){
            return true
        }else{
            return false;
        }
    })

    if(!user){
        res.json({
            message:"u are not regisstred"
        })
    }
    else{
        const token = jwt.sign({username},jwt_secret); // ab string ban gai
        
        res.json({
            token:token
        })
    }



})

app.get("/me",(req,res)=>{
    const token = req.headers.token;
    
    const decodedjwt = jwt.verify(token,jwt_secret)

    const username = decodedjwt.username

  

    let user = users.find((u)=> u.username === username)
    if(user){
        res.json({
            username:user.username,
            password: user.password
        })
    }else{
        res.status(404).send({
            message:"Unauthorized"
        })
    }
})
















app.listen(3000,()=>{
    console.log(`the port in 3000 `);
    
})