// const asyncHandler =(fn)=>  async ( req, res,next ) => {
//     try {
        
//     } catch (error) {
//          res.status(error.code || 500).json({
//             success :false,
//             message:"err in asyncHandler ", error.message
//          })
//     }
// }

// export default asyncHandler;





//second way by promises

const asyncHandler =(requestHandler) => {  return (req,res,next) =>{

    Promise.resolve(requestHandler(req,res,next)).catch((err) =>  next(err) )
}}
export default asyncHandler;