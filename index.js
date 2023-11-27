import express from "express";
import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + '?sslmode=require',
})

const app = express();

app.use('/', (req, res) => {
    res.send('Server works');
})

app.listen(process.env.PORT, () => {
    console.log('Server run on PORT: 5000')
});