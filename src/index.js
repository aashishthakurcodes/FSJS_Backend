import mongoose from "mongoose";
import app from "./app.js";
import config from "../config/index.js";

(async () => {
    try {
        await mongoose.connect(config.Mongo_url);
        console.log("Database connected");

        app.on('error',(err)=>{
            console.error("Error:",err);
            throw err;
        })
        const onlistening = () => {
            console.log(`listening on port ${config.PORT}`);
        }
        app.listen(config.PORT, onlistening)
    }


    catch (err) {
        console.error("Error aa gyi bro", err)
        throw err;
    }
})
 ()