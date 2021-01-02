require('dotenv').config();
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export const getAllSubscribers = async (): Promise<any> => {
  const query = 'SELECT * FROM contacts';
  const response = await pool.query(query);
  // console.log(response['rows']);
  return response;
};

const insertOne = async () => {
  const query = {
    text: "INSERT INTO contacts (name, email, zipcode) VALUES ($1, $2, $3);",
    values: ['Freddie Mercury', 'fred@queen.com', 1234567],
  }
  const response = await pool.query(query);
  console.log(response['rows']);
};

// insertOne();

getAllSubscribers();
