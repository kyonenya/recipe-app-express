require('dotenv').config();
import { Pool, QueryResult } from 'pg';
import { subscriberable } from './subscriberEntity';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export const getAllSubscribers = async (): Promise<QueryResult> => {
  const query = 'SELECT * FROM contacts';
  return await pool.query(query);
};

export const createSubscriber = async (values: string[]) => {
  const query = {
    text: "INSERT INTO contacts (name, email, zipcode) VALUES ($1, $2, $3);",
    values,
  }
  return await pool.query(query);
};
