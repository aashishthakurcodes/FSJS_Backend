import mongoose from "mongoose";
import Authroles from "../utilis/setauthor";
import bcrypt from 'bcryptjs'
import JWT from "jsonwebtoken";
import config from "/workspaces/FSJS_Backend/config/index.js";
import crypto from "crypto"

const userSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: ["true", "Enter your name"],
        maxLength: [10, "Name should not be more than 10 characters"],

    },
    email: {
        type: String,
        required: ["true", "E-mail is required"],
    },
    password: {
        type: String,
        required: ["true", "E-mail is required"],
        minLength: [8, 'Password must have 8 characters'],
        select: 'False'
    },
    role: {
        type: String,
        enum: Object.values(Authroles),
        default: Authroles.User
    },
    forgetaPasswordToken: String,
    forgetPasswordExpiry: Date
}, { timestamps: true })

//Encrypt the password before saving: HOOKS

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// Compare Enter password8 passwords
userSchema.methods = {
    //compare password
    comparePassword: async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password)
    },
    //Generate Json web tokens

    // jwt.sign(payload, secretOrPrivateKey, [options, callback])
    getJWTtoken: function () {
        JWT.sign({ _id: this._id, role: this.role }, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRY
        })
    },

    //Forget password generate token
    generateForgettoken: function () {
        //create random text of twenty number
        const forgottoken = crypto.randomBytes(20).toString("hex")
        // encrypt the token by crypto
        this.forgetaPasswordToken = crypto.createHash("sha256").update(forgottoken).digest("hex")

        //time for token to expire

        this.forgetPasswordExpiry = Date.now() + 10 * 60 * 1000;
        return forgottoken;




    }
}

export default mongoose.model("User", "userschena")