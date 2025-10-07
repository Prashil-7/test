import express from 'express'


const app = express();

let reqcounting=0 ;
const countReq = (req,res,next)=>{
 reqcounting = reqcounting +1;
    console.log(`the req , ${reqcounting}`);
     next();
}

const handleReq= (req,res)=>{
    res.send(`the middleware passed `)
}

app.get("/",(req,res)=>{
    res.send('hello from week 5.2')
})
app.get("/middle", countReq ,handleReq)


//agar sbko lacgana hai to  its global middleware
app.use(countReq)
app.get("/sum",(req,res)=>{
    res.send("hello from sum")
})
app.get("/multiply",(req,res)=>{
    res.send("hello from sum")
})
app.get("/divide",(req,res)=>{
    res.send("hello from sum")
})


app.listen(3000,()=>{console.log(`the port running on the 3000`);
})