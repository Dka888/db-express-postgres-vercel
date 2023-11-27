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

sequelize.authenticate();


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
}, {
  tableName: 'Users'
});

// app.use('/', (req, res) => {
//     res.send('Server works');
// })

app.use('/user', async (req, res) => {
  try {
    const newUser = await User.create({
      username: 'user',
      email: 'user@user.com',
      password: 'password123',
    });

    res.send(`Server works, user created: ${newUser.username}`);
  } catch (error) {
    console.error('Błąd podczas obsługi żądania:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/users', async (req, res) => {
  try {
  const users = await User.findAll();

    res.send(users);
  } catch (error) {
    console.error('Błąd podczas obsługi żądania:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(process.env.PORT, () => {
    console.log('Server run on PORT: 5000')
});