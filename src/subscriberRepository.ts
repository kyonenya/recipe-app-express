require('dotenv').config();
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const getAllContacts = async () => {
  try {
    const client = await pool.connect();
    const response = await client.query('SELECT * FROM contacts');
    console.log(response['rows']);
  } catch (err) {
    console.error(err)
  } finally {
    client.release();
  }
};

getAllContacts();
