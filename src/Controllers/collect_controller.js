import collectionschema from "/workspaces/FSJS_Backend/src/Models/collection.js"
import asynHandler from "../Services/asynchandler.js"
import customerrors from "../utilis/customerrors.js";


export const createcollection=asynHandler(async(req,res)=>{
    const{name}= req.body

    if(!name){
        throw new customerrors("Collection Name is required",400)

    }

    const collection = await collectionschema.create({
        name
    })


    res.status(200).json({
        success: true,
        message: "Collection was created successfully",
        collection
    })
})