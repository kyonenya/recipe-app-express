const { Client } = require('pg');

const connectionString = 'postgres://zxehjkojxygwch:3b483c8c5a70f746ffdf7f08d600d41b6a5c59d1fb911ac7b2046a8592b9b63e@ec2-23-20-168-40.compute-1.amazonaws.com:5432/de9v5vgk53jcli';

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

client.connect();

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
client.query('SELECT NOW();', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
