import { Subscriber } from './subscriberEntity';
import dotenv from 'dotenv';
// ↓Repository should not know about Framework Layer
// import * as postgres from './postgres';
import { Pool, QueryResult } from 'pg';

dotenv.config();

/**
 * @deprecated
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export interface dbExecutable {
  (sql: string, params?: (string | number)[] | undefined): Promise<QueryResult>;
};

export const selectAll = async (executor: dbExecutable): Promise<QueryResult> => {
  const sql = 'SELECT * FROM subscribers';
  return await executor(sql);
};

export const insertOne = async (executor: dbExecutable, params: any[]) => {
  const sql = 'INSERT INTO subscribers (name, email, zipcode) VALUES ($1, $2, $3);';
  return await executor(sql, params);
};

export const selectByEmail = async (values: string[]): Promise<QueryResult> => {
  const query = {
    text: 'SELECT * FROM subscribers WHERE "email" = $1',
    values,
  };
  return await pool.query(query);
};
