import dotenv from 'dotenv'

dotenv.config();

const config={
    PORT:process.env.PORT || 5000,
    Mongo_url:process.env.Mongo_url ||" mongodb://localhost:27017/ecomm"
}

export default config;