import { Pool } from "pg";
import "dotenv/config";
export const dbPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    
});