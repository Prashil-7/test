import mongoose from  'mongoose'
import { Db_Name } from './dbnames.js'

 export const connectDB =  async ()=>{

    try {
        const instanceDB = await mongoose.connect(`${process.env.MONGO_URL}/${Db_Name}`)
        console.log(`connection Connected ${instanceDB.connection.host}`);
        
    } catch (error) {
        console.log(`the err in Connection ${error}`);
        
    }

}