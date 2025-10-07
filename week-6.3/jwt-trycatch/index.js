import express from 'express'
import jwt from 'jsonwebtoken'


//genrateing 
//decoding
//verifying all the jwts.

const app = express();
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("helo");
})


app.listen(3000,()=>{
    console.log("the run on 3000" );
    
})