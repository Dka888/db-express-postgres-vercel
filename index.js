import express from "express";
import 'dotenv/config';
import pg from 'pg';
import { Sequelize } from "sequelize";
import { DataTypes } from 'sequelize';

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + '?sslmode=require',
});

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const app = express();

export const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});


app.use('/', (req, res) => {
    res.send('Server works');
})

app.use('/user', async (req, res) => {
  try {
    const poolResult = await pool.query('SELECT NOW()');
    console.log('Pool Result:', poolResult.rows);

    const newUser = await User.create({
      username: 'example_user',
      email: 'user@example.com',
      password: 'password123',
    });

    res.send(`Server works, user created: ${newUser.username}`);
  } catch (error) {
    console.error('Błąd podczas obsługi żądania:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(process.env.PORT, () => {
    console.log('Server run on PORT: 5000')
});