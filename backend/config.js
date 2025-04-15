const dotenv = require('dotenv');

dotenv.config();

const PORT = Number(process.env.PORT) | 3000;
const DATABASE_NAME=process.env.DATABASE_NAME;
const DATABASE_URL=process.env.DATABASE_URL;
const JWT_SECRET_CODE=process.env.JWT_SECRET_CODE;
const SALT_ROUNDS=Number(process.env.SALT_ROUNDS);


module.exports={
    PORT,
    DATABASE_NAME,
    DATABASE_URL,
    JWT_SECRET_CODE,
    SALT_ROUNDS
}
