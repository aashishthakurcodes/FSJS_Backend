import mongoose, { mongo } from "mongoose";
const orderschema = new mongoose.Schema({
    product: {
        type: [
            {
                productid: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "product"
                }
                ,
                count: Number,
                price: Number,
            }

        ]
        ,
        required: true,
    }

    ,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    } ,
    amount: {
        type: Number,
        required: true
    },
    coupon:String,
    transactionId:String,
    status:{
type:String,
enum:["Ordered","Shipped","Delevered","Cancelled"],
default:"Ordered"
    }

}, { timestamps: true })


export default mongoose.model("Order", orderschema)