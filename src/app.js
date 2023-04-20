import express from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser';
const app = express()
//for receiving data in all format
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//access user cookies
app.use(cors())
//cookie parser allow server to access users cookie
app.use(cookieParser())



export default app;