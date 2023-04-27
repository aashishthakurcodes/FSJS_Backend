import Product from "../Models/productSchema.js"
import formidable from "formidable"
import { s3FileUpload, s3deleteFile} from "../Services/imageuploader.js"
import Mongoose from "mongoose"
import asyncHandler from "../Services/asynchandler.js"
import CustomError from "../utilis/customerrors.js"
import config from "/workspaces/FSJS_Backend/config/index.js"


/**********************************************************
 * @ADD_PRODUCT
 * @route https://localhost:5000/api/product
 * @description Controller used for creating a new product
 * @description Only admin can create the coupon
 * @descriptio Uses AWS S3 Bucket for image upload
 * @returns Product Object
 *********************************************************/


export const addProduct = asyncHandler(async (req, res) => {
    const form = formidable({ multiples: true, keepExtensions: true });

    form.parse(req, async function (err, fields, files){
        if (err) {
            throw new CustomError(err.message || "Something went wrong", 500)
        }

        let productId = new Mongoose.Types.ObjectId().toHexString()

        console.log(fields, files);

       
    })
})