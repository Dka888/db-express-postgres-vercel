import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import pkg from 'jsonwebtoken';
const {verify, sign} = pkg;

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findOne({ where: { username }, });

        if (user) {
            res.send('Użytkownik z taką nazwą istnieje');
        }

        const hashed = bcrypt.hashSync(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashed,
        });

        res.send(`Server works, user created: ${newUser.username}`);
    } catch (error) {
        console.error('Błąd podczas obsługi żądania:', error.message);
        res.status(500).send('Internal Server Error');
    }
}

export const login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if(!username) {
           return res.status(404).send('Błąd1');
        }

        const isCorrectPassword = bcrypt.compareSync(password, user.password);
        if(!isCorrectPassword) {
          return res.status(404).send("Błąd")
        }

        const secretKey = 'Pss...It is The Secret!'
        const token = sign({ id: user.id }, secretKey, {
            expiresIn: 86400,
          });

        res.status(200).send({user, token}, );

    }catch(e) {
        res.status(500).send('błąd');
    }
};

export const allUsers = async (req, res) => {
    try {
     const users = await User.findAll();
      res.send(users);
    } catch (error) {
      console.error('Błąd podczas obsługi żądania:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };