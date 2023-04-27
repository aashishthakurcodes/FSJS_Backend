import dotenv from 'dotenv'

dotenv.config();

const config={
    PORT:process.env.PORT || 5000,
    Mongo_url:process.env.Mongo_url ||" mongodb://localhost:27017/ecomm",
    JWT_SECRET:process.env.JWT_SECRET || "yoursecret",
    JWT_EXPIRY:process.env.JWT_EXPIRY || "4d",
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    S3_REGION: process.env.S3_REGION,
}

export default config;