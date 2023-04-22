import User from "../Models/userSchema.js";
import Jwt  from "jsonwebtoken";
import asynHandler from "../Services/asynchandler.js";
import config from "../../config/index.js";
import customerrors from "../utilis/customerrors.js";





export const isLoggedIn = asynHandler(async (req, res, next) => {
    let token;

    if (req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) ) {
        token = req.cookies.token || req.headers.authorization.split(" ")[1]

        // token = "Bearer gbhnjm235r5hbnj"
    }

    if (!token) {
        throw new customerrors("Not authorized to access this resource", 401)
    }

    try {
        const decodedJwtPayload = Jwt.verify(token, config.JWT_SECRET);

         req.user = await User.findById(decodedJwtPayload._id, "name email role")

         next()
    } catch (error) {
        throw new customerrors("Not authorized to access this resource", 401)
    }

})


export const authorization=(...requiredRoles)=>asynHandler(async(req,res,next)=>
{
   if(!requiredRoles.includes(req.user.role)){
    throw new customerrors("You can not access it...")

   }
   next()
})

