import mongoose from 'mongoose'

const collectionschema = new mongoose.Schema({
    name: {
        type: String,
        required: ["true", "enter some value at leas5"],
        trim: true,
        maxLength: [120, "You can't use more than 120 characters"]

    }
}
    ,
    { timestamps: true })


export default mongoose.model(collecton,"collectionschema")    