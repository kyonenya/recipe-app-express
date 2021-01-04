import dotenv from 'dotenv';
import { dbConnectable } from './subscriberRepository';
import { Pool, QueryResult } from 'pg';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export const exec: dbConnectable = async (sql, params = undefined) => {
  return pool.query(sql, params);
};
