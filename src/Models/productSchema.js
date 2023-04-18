import mongoose from "mongoose";
const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:["true","plz give product name"],
        trim:true,
        maxLength:[120,"prodct not more than 120 words"]
    },
    price:{
        type:Number,
        required:["true","plz give product price"],
        trim:true,
        maxLength:[5,"price not more than 120 words"]
    },
    description:{
        type:String
    },
    photos:[{
        secure_url:{
            type:String,
            required:true
        }
    }],
    stock:{
        type:Number,
        default:0
    },
    sold:{
        type:Number,
        default:0
    },
  collectionid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"collecton"
    
  }

},{timestamps:true})

export default mongoose.model("product",productSchema)