import express from "express";
import 'dotenv/config';
// import { Sequelize } from 'sequelize';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  connectionString: "postgres://default:CEjehzq83vga@ep-lively-night-27832602-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
})

const password = process.env.POSTGRES_PASSWORD;
const username = process.env.POSTGRES_USER
const databaseName = process.env.POSTGRES_DATABASE;
const host = process.env.POSTGRES_HOST;

// const sequelize = new Sequelize( databaseName, username, password, {
//   host,
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: {
//       rejectUnauthorized: false, 
//     },
//   },
//   logging: false,
// });


// const database = process.env.POSTGRES_URL + '?sslmode=require';
// const sequelize = new Sequelize(database);

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connected to the database.');
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database:', error);
//   });


const app = express();

app.use('/', (req, res) => {
    res.send('Server works');
})

app.listen(process.env.PORT, () => {
    console.log('Server run on PORT: 5000')
});