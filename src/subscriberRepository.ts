require('dotenv').config();
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const getAllContacts = async () => {
  const client = await pool.connect();
  try {
    const response = await client.query('SELECT * FROM contacts');
    console.log(response['rows']);
  } catch (err) {
    console.error(err)
  } finally {
    client.release();
  }
};

const insertOne = async () => {
  const client = await pool.connect();
  try {
    const response = await client.query("INSERT INTO contacts (name, email, zipcode) VALUES ('Freddie Mercury', 'fred@queen.com', 0000000);");
    console.log(response['rows']);
  } catch (err) {
    console.error(err)
  } finally {
    client.release();
  }
};

//insertOne();

getAllContacts();
