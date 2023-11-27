import pg from 'pg';
import { Sequelize } from "sequelize";

const { Pool } = pg;
export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + '?sslmode=require',
});

export const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize.authenticate();