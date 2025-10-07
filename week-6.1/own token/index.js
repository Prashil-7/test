// autherization via jwt

import express from 'express'

const app =express();
app.use(express.json());


const users=[];

const generateToken =()=>{
    let  a=[4,6,7,6,4,974,9,,9,8,98,9,85,9,8,,6,98,];
    let token ="";
        for(let i=0; i<17; i++){
            token += a[Math.floor(Math.random() *a.length)];
        }
       //console.log(token,"token");
       
    return token;
}



app.post("/signup",(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    
    if(users.find((i)=> i.username === username)){
        res.json({
            message:"u are already registered"
        })
        return
    }
    
    if(username.length < 5){
        res.json({
            message:"username is make long "
        })
    }

    users.push({
        username:username,
        password:password
    })
    res.json({
    message:"you are signup"
    })
    console.log(users);
    

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
    
    if(user){
        const token = generateToken();
       // console.log("token ", token);
        
        user.token = token;

        res.json({
            message:token
        })
    }else{
        res.status(404).send({
            message:"user is invalid"
        })
    }
    console.log(users);
    
})


app.get("/me",(req,res)=>{

    const token = req.headers.token;

    let user = users.find((u)=> u.token === token)
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
    console.log(`the runing on  3000`);
    
})