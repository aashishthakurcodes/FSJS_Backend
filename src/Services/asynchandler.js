
import mongoose from "mongoose"
const asynHandler=(func)=> async(req,res,next)=>{
   try {
     await func(req,res,next)
   } catch (error) {
    res.status(error.code || 5000).json({
        success:false,
        message:error.message
    }),

   }
}

export default asynHandler;