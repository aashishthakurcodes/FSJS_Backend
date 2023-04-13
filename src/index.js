import mongoose from "mongoose";
import app from "./app.js";

(async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/ecomm");
        console.log("Database connected");

        app.on('error',(err)=>{
            console.error("Error:",err);
            throw err;
        })
        const onlistening = () => {
            console.log(`listening on port 500`);
        }
        app.listen(5000, onlistening)
    }


    catch (err) {
        console.error("Error aa gyi bro", err)
        throw err;
    }
})
 ()