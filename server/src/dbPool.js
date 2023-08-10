import dotenv from 'dotenv';
import pg from 'pg';
const { Pool } = pg;

//Load environment variables from .env file
dotenv.config();

//Configure the database connection pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5, //Maximum number of clients in the pool
  idleTimeoutMillis: 30000, //How long a client is idle before being closed
  connectionTimeoutMillis: 2000, //How long to wait when trying to connect to the database
});

export { pool };
