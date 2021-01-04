import dotenv from 'dotenv';
import { Pool, QueryResult } from 'pg';
import { subscriberable } from './subscriberEntity';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export const exec = async (sql: string, values: string[] | undefined = undefined): Promise<QueryResult> => {
  return pool.query(sql, values);
};
