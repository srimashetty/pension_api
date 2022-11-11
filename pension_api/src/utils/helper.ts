import dotenv from "dotenv";
import {Pool} from "pg";

dotenv.config();

const pool = new Pool({
    user: 'postgres',
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    host: process.env.SERVER,
    port: 5432,
    idleTimeoutMillis: 3000,
});

export default pool;
