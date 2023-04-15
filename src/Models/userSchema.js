import mongoose from "mongoose";
import Authroles from "../utilis/setauthor";

const userSchema= new mongoose.Schema({
    name:
    {
       type:String,
       required:["true","Enter your name"],
       maxLength:[10,"Name should not be more than 10 characters"],

    },
    email:{
        type:String,
       required:["true","E-mail is required"], 
    },
    password:{
        type:String,
       required:["true","E-mail is required"], 
       minLength:[8,'Password must have 8 characters'],
       select:'False'
    },
    role:{
        type:String,
        enum:Object.values(Authroles),
        default:Authroles.User
    },
    forgetaPasswordToken:String,
    forgetPasswordExpiry: Date
},{timestamps:true})


export default mongoose.model("User","userschena")