import asynHandler from "/workspaces/FSJS_Backend/src/Services/asynchandler.js"

import customerrors from "/workspaces/FSJS_Backend/src/utilis/customerrors.js"
//importing users
import User from "../Models/userSchema.js"


//cookie
export const cookieOption={
    //expires in 3 daays
    expires: new Date(Date.now()+3*24*60*60*1000),
    httpOnly:true  //Read only if this is not there anyone can read and write it
}


export const signup=asynHandler(async(req , res)=>{
    // Data from the useres
    const{name,email,password}=req.body


    //Validaiton
    if(!name || !email || !password){
        //used imported customerrors class
       throw new customerrors("Please fill all the fields")
    }

    //create a new field in the database
    //check if user already exist or not
     const existuser=  await User.findOne({email})

     //if user exsit show the error
     if(existuser){
        throw new customerrors("User already existb",400 )
     }
    
     // Creating a new user
     const createuser=await User.create({
        name,email,password
     })
   

     const token= User.getJWTtoken()
     //privacy
     User.password=undefined

     //store this token in user's cookie
     res.cookie("token",token,cookieOption)

     //sending response
     res.status(200).json({
        success:true,
        token,
        User,
     })
})


export const login=asynHandler(async(req,res)=>{
   const {email,password}=req.body

   //Validation
   if(!email || !password){
      throw new customerrors("Please enter all details",400 )

   }
   const user= User.findOne({email}).select("+password");
   if(!user){
      throw new customerrors("invalid Record",400)
   }
   
   const pssmatch=await user.comparePassword(password)

   if(pssmatch){
const token=  user.getJWTtoken()
user.password=undefined
     res.cookie("token",token,cookieOption)
     return res.status(200).json({
      success:true,
      token,user
     })
   }


throw new customerrors("Password is incorrect",400)

})


export const logout=asynHandler(async(res,req)=>{
   res.cookie("token",null,{
      expires:new Date(Date.now()),
      httpOnly:true
   })
 res.status(200).json({
   success:true,
   message:"Logout"
 })

})

export const getprofile=asynHandler(async(req,res)=>{
   const {User}=req

   if(!User){
      throw new customerrors("User not found",401)
   }
   res.status(200).json({
      success:true,
      User
   })
})
