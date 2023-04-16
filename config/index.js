import dotenv from 'dotenv'

dotenv.config();

const config={
    PORT:process.env.PORT || 5000,
    Mongo_url:process.env.Mongo_url ||" mongodb://localhost:27017/ecomm",
    JWT_SECRET:process.env.JWT_SECRET || "yoursecret",
    JWT_EXPIRY:process.env.JWT_EXPIRY || "4d",
}

export default config;