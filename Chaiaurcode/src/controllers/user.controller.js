import asyncHandler from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiErrors.js"
import {User} from "../models/user.model.js"
import {uploadCloudinary} from "../utils/cloudinary.js"
import { error, log } from "console";
import { jwtVerify } from "../middlewares/auth.middleware.js";
 

// const generateAccessAndRefreshToken =  async(userId)=>{
// try {
//   const user = await User.findById(userId);
//   const accessToken = user.generateAccessToken()
//   const refreshToken= user.generateRefreshToken()
  
//   user.refreshToken =refreshToken;
//   await user.save({validateBeforeSave :false})
//   // console.log(accessToken ,refreshToken);
  
//   return{accessToken ,refreshToken};       
 
  
// } catch (error) {
//  throw new ApiError(500,"something wen wrong while generating refresh and access token") 
  
// } 
// }

const generateAccessAndRefereshTokens = async(userId) =>{
  try {
      const user = await User.findById(userId)
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()

      user.refreshToken = refreshToken
      await user.save({ validateBeforeSave: false })

      //console.log("the jwt ", accessToken ,"referesh", refreshToken);
      
      return {accessToken, refreshToken}


  } catch (error) {
      throw new ApiError(500, "Something went wrong while generating referesh and access token")
  }
}

const registerUser = asyncHandler( async (req,res)=>{
    // steps 1 ->get user deatilas from frontend from model user
    //vailidation -- email pasword aur empty to nahi  
    //check user already users by email, aur username
     // file hai y anhai like avata aur cover image check
     // aviable hai to upload karo cloudinary pe res pe se url nikalna padenga
     //  create user object -> creation call in db
     //remove password and referesh token fied fromn response
      // check use creation and check
      //retrun response





      const {fullname,email,username, password}=req.body
               //console.log("email",email);
                    //some is new to add validate the things
          if([fullname,email,username,password].some((field)=>{field?.trim()=== ""})){
            throw new ApiError(404,"all fileds are requrieds");
          }

          const exitedUser = await User.findOne({
            $or:[{username},{email}]
          })

          if(exitedUser){
            throw new ApiError(409 ,"user already existed with associated username and email");
          }

          const avatarLocalPath = req.files?.avatar[0]?.path;
          const coverImageLocalPath = req.files.coverImage[0].path;

        //   let coverImageLocalPath;
          
        //   if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length >0 ) 
        //     {
        // coverImageLocalPath = req.files.coverImage[0].path
        // console.log(err);
        
            
        //   }


          if(!avatarLocalPath){
            throw new ApiError( 400," upload avatar image ")
          }
               
        
          // if(!coverImageLocalPath){
          //   throw new ApiError( 400," upload coverImage  ")
          // }
           

            const avatar = await uploadCloudinary(avatarLocalPath);
            const coverImage = await uploadCloudinary(coverImageLocalPath);

          


            if(!avatar){
              throw new ApiError(400,"avatar is missing");
            }

            if(!coverImage){
              throw new ApiError(400,"coverImage is missing");
            }
            

             const user = await User.create({
              fullname,
              avatar:avatar.url,
              coverImage: coverImage?.url || "",
              username :username.toLowerCase(),
              email,
              password
            })

             const createdUser = await User.findById(user._id).select(
              "-password -refreshToken" 
             );

             if(!createdUser){throw new ApiError(500,"user not created by our side")}


             return res.status(201).json(
              new ApiResponse(201, createdUser,"user registered Successfully")
             )
    })


// const loginUser = asyncHandler (async (req,res)=>{
//        /* req body se data lena
//           username or email
//           fins username and email in database hai to 
//           check password  correct nahi to err send
//           then by JWT se acces token and referesh token generate
//           its store in user cookies
//        */

//   const {email, username,password}= req.body;
  
//   if(!email && !username){
//     throw new ApiError(400,"username and email not found"); 
//   } 

//   const user =  await User.findOne({
//     $or:[{username},{email}]
//   })

//    if(!user){
//     throw new ApiError(404,"user is not exits");
//    }
   
//    const isPasswordValid = await user.isPasswordCorrect(password);

//    if(!isPasswordValid){
//     throw new ApiError(401,"the password is not correct"); 
//    }

//    const {accessToken ,refreshToken} = generateAccessAndRefereshTokens(user._id);
//    console.log("the user ", accessToken ,refreshToken);
   
   
//    const loggedInUser = await User.findById(user._id).select("-password  -refreshToken" );


//    //cokkies me bhejna

//    const options={
//     httpOnly : true,
//     secure:true
//    }
//    console.log(accessToken,refreshToken);
   
//    return res
//    .status(200)
//    .cookie("accessToken", accessToken ,options)
//    .cookie("refreshToken", refreshToken ,options)
//    .json(
//     new ApiResponse(200,
//       {
//         user : loggedInUser ,accessToken,refreshToken
//       },
//       "User is Logged In Successfully"
//     )
//    )


   







// }) 



const loginUser = asyncHandler(async (req, res) =>{
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  const {email, username, password} = req.body
  console.log(email);

  if (!username && !email) {
      throw new ApiError(400, "username or email is required")
  }
  
  // Here is an alternative of above code based on logic discussed in video:
  // if (!(username || email)) {
  //     throw new ApiError(400, "username or email is required")
      
  // }

  const user = await User.findOne({
      $or: [{username}, {email}]
  })

  if (!user) {
      throw new ApiError(404, "User does not exist")
  }

 const isPasswordValid = await user.isPasswordCorrect(password)

 if (!isPasswordValid) {
  throw new ApiError(401, "Invalid user credentials")
  }

 const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

  const options = {
      httpOnly: true,
      secure: true
  }

  console.log("jwt ", accessToken ,refreshToken);
  
  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
      new ApiResponse(
          200, 
          {
              user: loggedInUser, accessToken, refreshToken
          },
          "User logged In Successfully"
      )
  )

})


const loggedOutUser =asyncHandler( async (req,res)=>{
   
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set:{ refreshToken:undefined}
    },
    {new:true}
  )   

  const options={
    httpOnly : true,
    secure:true
   }
   
   return res
   .status(200)
   .clearCookie("accessToken", options)
   .clearCookie("refreshToken" ,options)
   .json(new ApiResponse(200,{},"User Logout SuccessFully"));
}) 




export {registerUser,
  loginUser,
  loggedOutUser,

};
