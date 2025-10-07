import express from 'express'


const app = express();

app.get("/",(req,res)=>{
    res.send("hello from the index2")
})

const loggerMiddleware= (req,res)=>{
    console.log("the meethod is "+ req.method);
    console.log("the url is "+ req.url);
    console.log("the hpstname is "+ req.hostname);
    console.log(new Date());
    
}



let reqcounting=0 ;
const countReq = (req,res,next)=>{
 reqcounting = reqcounting +1;
    console.log(`the req , ${reqcounting}`);
     next();
}

const handleReq= (req,res)=>{
    res.send(`the middleware passed `)
}

app.use(loggerMiddleware);

app.get("/middle", countReq ,handleReq)

app.listen(3000,()=>{console.log(`the running on 3000`);
})