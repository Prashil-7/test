import { NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const useMiddleware = async (
    req:Request, res:Response ,next:NextFunction
)=>{
  
   try {  //@ts-ignore
     const header = req.headers["token"];
 //@ts-ignore
     const decode = jwt.verify(header as string ,process.env.JWT_SECRET)
   
     if(decode){
         //@ts-ignore
         req.userId = decode.id;
         next();
     }

   } catch (error) {
    //@ts-ignore
    res.json({msg:"u are not logged in"})

    
   }
  


}