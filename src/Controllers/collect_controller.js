import collectionschema from "/workspaces/FSJS_Backend/src/Models/collection.js"
import asynHandler from "../Services/asynchandler.js"
import customerrors from "../utilis/customerrors.js";
import collection from "/workspaces/FSJS_Backend/src/Models/collection.js";


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
//Update the collectionj
    export const updateCollection = asynHandler(async(req, res) => {
        const {name} = req.body
        const {id: collectionId} = req.params
    
    
        if (!name) {
            throw new customerrors("Colection name is required", 400)
        }
    
        let updatedCollection = await collection.findByIdAndUpdate(collectionId, {
            name
        }, {
            new: true,
            runValidators: true
        })
    
        if (!updatedCollection) {
            throw new customerrors("Colection not found", 400)
        }
    
        res.status(200).json({
            success: true,
            message: "Collection updated successfully",
            updatedCollection
        })
    })
//Delete collection
    export const deleteCollection = asynHandler(async(req, res) => {

        const {id: collectionId} = req.params
    
        const collectionToDelete = await collection.findById(collectionId)
    
        if (!collectionToDelete) {
            throw new customerrors("Colection to be deleted not found", 400)
        }
    
        await collectionToDelete.remove()
    
        res.status(200).json({
            success: true,
            message: "Collection deleted successfully",
    
        })
    })
    

    //Get All Collection

    export const getAllCollection = asynHandler(async(req, res) => {



        const collections = await collection.find()
    
        if (!collections) {
            throw new customerrors("No collection found", 400)
        }
    
        res.status(200).json({
            success: true,
            collections
    
        })
    })
    
