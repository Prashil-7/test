import {Client} from "pg";
import express  from "express";

const app = express();
app.use(express.json());


const pgClient = new Client ( 'postgresql://neondb_owner:npg_6VSrbN3vQuAj@ep-plain-queen-a1392g4f-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require')
   
pgClient.connect();

app.post('/sign', async (req,res)=>{

    const {email,username, password} = req.body;


    try {
        // its query is cause some sql injection effects
        //  const insertQuery = `INSERT INTO users (email, username, password) VALUES ('${username}', '${email}' , '${password}')`;

        // const response = pgClient.query(insertQuery);

        //solution to add in DB 

        const insertQuery = `INSERT INTO users (username, email, password) VALUES ($1 ,$2, $3)`;
        const values = [username, email, password];

        const dbRes = await pgClient.query(insertQuery, values); 
    
        res.json({msg:"u are signup"});

    } catch (error) {
        return res.status(404).json({msg:" uare credential ar enot corrects"});
    }
})


app.listen(3000);










