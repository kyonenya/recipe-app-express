import dotenv from 'dotenv';
import { dbExecutable } from './repository';
import { Pool, QueryResult } from 'pg';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export const execute: dbExecutable = async (sql, params = undefined) => {
  return pool.query(sql, params);
};
