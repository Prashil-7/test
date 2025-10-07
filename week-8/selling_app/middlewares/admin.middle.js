import jwt from 'jsonwebtoken'

 export const adminmiddleware = async (req,res ,next)=>{
     const token = req.headers.token
     
     const decodedAdmionToken = jwt.verify(token ,process.env.JWT_SECRET_ADMIN)

        if(decodedAdmionToken){
            req.creatorId = decodedAdmionToken.id;
            next()
        }else{
            res.status(403).json({
                message:"u are no signed in"
            })
        }

    } 