require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const index = async () => {
  try {
    const client = await pool.connect();
    const response = await client.query('SELECT * FROM manuscripts ORDER BY modifieddate DESC LIMIT $1;', [3]);
    console.log(response['rows']);
  } catch (err) {
    console.error(err)
  } finally {
    client.release();
  }
};

index();