import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Retrieve and set environment variables
const PORT: number = parseInt(process.env.PORT || "0", 10);
const MONGODB_URI: string = process.env.MONGODB_URI!;
const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN!;
const REFRESH_TOKEN: string = process.env.REFRESH_TOKEN!;
const SHA_SALT: string = process.env.SHA_SALT!;

export { PORT, MONGODB_URI, ACCESS_TOKEN, REFRESH_TOKEN, SHA_SALT };
