
import express from 'express'
import 'dotenv/config'
import { userRouter } from './routes/user.js';
import { courseRouter } from './routes/course.js';
import { adminRouter } from './routes/admin.js';
import { connectDB } from './db/db.js';


const app = express();
app.use(express.json())

const port = process.env.PORT || 4000;
connectDB();


app.use("/api/v1/users", userRouter)
app.use("/api/v1/course", courseRouter)
app.use("/api/v1/admin", adminRouter)






app.listen(port,()=>{
    console.log('the port 3000 selling app');
    
})