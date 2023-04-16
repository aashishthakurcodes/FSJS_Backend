import mongoose from "mongoose";
import Authroles from "../utilis/setauthor";
import bcrypt from 'bcryptjs'

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

//Encrypt the password before saving: HOOKS

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// Compare passwords
userSchema.methods = {
    //compare password
    comparePassword: async function(enteredPassword){
        return await bcrypt.compare(enteredPassword, this.password)
    }
}

//Generating token

export default mongoose.model("User","userschena")