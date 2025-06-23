import mongoose ,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new  Schema({

    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        index:true  /// for the database searching 
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
    index:true
    },
    avatar:{
        type:String, //cloudinary url
        required:true
    },
    coverImage:{
        type:String, //cloudinary url
        required:true
    },
    watchHistory:[
        {type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true, "password is required"],
    },
    refreshToken:{
        type:String,
        
    }

},{timestamps:true})


// pre hooks in mongoose to data save hone ke pahle kya karna hai
userSchema.pre("save",  async function(next){

    if(!this.isModified("password"))  return next();

    this.password = await bcrypt.hash(this.password , 10);
    next();
})

// bcrypt se password check karna is correcdt or not

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}


//jwt token access and fixed
userSchema.methods.generateAccessToken = async function(){
     return  jwt.sign({
        _id: this._id,
        username:this.username,
        fullname: this.fullname,
        email:this.email
     },
     process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
     }
    )
}


userSchema.methods.generateRefreshToken = async function(){
    return await jwt.sign({
        _id: this._id,
        
     },
     process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
     }
    )

}

export const User = mongoose.model("User",userSchema);