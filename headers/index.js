import express from 'express'

const app = express();

app.get("/", (req,res)=>{
        res.send("hello")
})
app.get("/sum/:first/:second",(req,res)=>{
    const first = parseInt(req.params.first);
    const second = parseInt(req.params.second)
        
    res.json({
        ans : (`the ans is the ${first + second}`)
    })

})
app.get("/multiply",(req,res)=>{
    const {first ,second} = req.query;
    const total = Number(first) * Number(second)
    res.json(`the ans is ${total}`);
})
app.get("/divide",(req,res)=>{})
app.get("/subtract",(req,res)=>{})


app.listen(3000,()=>{console.log("listen on port 3000");
})