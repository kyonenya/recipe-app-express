import dotenv from 'dotenv';
// ↓Repository should not know about Framework Layer
// import * as postgres from './postgres';
import { Pool, QueryResult } from 'pg';
import { subscriberable } from './subscriberEntity';

dotenv.config();

/*
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
  const sql = 'SELECT * FROM contacts';
  return await executor(sql);
};

export const insertOne = async (values: string[]) => {
  const query = {
    text: "INSERT INTO contacts (name, email, zipcode) VALUES ($1, $2, $3);",
    values,
  };
  return await pool.query(query);
};

export const selectByEmail = async (values: string[]): Promise<QueryResult> => {
  const query = {
    text: 'SELECT * FROM contacts WHERE "email" = $1',
    values,
  };
  return await pool.query(query);
};
