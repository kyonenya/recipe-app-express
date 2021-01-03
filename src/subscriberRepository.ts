import dotenv from 'dotenv';
import { Pool, QueryResult } from 'pg';
import { subscriberable } from './subscriberEntity';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export const selectAll = async (): Promise<QueryResult> => {
  const query = 'SELECT * FROM contacts';
  return await pool.query(query);
};

export const insertOne = async (values: string[]) => {
  const query = {
    text: "INSERT INTO contacts (name, email, zipcode) VALUES ($1, $2, $3);",
    values,
  }
  return await pool.query(query);
};

export const selectByEmail = async (values: string[]): Promise<QueryResult> => {
  const query = {
    text: 'SELECT * FROM contacts WHERE "email" = $1',
    values,
  }
  return await pool.query(query);
};
