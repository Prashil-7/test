import jwt from'jsonwebtoken'


export const usermiddleware = async (req,res,next)=>{

    const token = req.headers.token;

    const decodedUserToken = jwt.verify(token , process.env.JWT_SECRET);

    if(decodedUserToken){
        req.userId = decodedUserToken.id;
        next()
    }else{
        res.status(403).json({
            message:"u are not signed in"
        })
    }
}