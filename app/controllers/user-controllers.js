import { User } from '../models/User.js';

export const register = async (req, res) => {
    const { username, email, password } = req;
    try {
        const user = await User.findOne({ username });

        if (user) {
            res.send('Użytkownik z taką nazwą istnieje');
        }

        const newUser = await User.create({
            username,
            email,
            password,
        });

        res.send(`Server works, user created: ${newUser.username}`);
    } catch (error) {
        console.error('Błąd podczas obsługi żądania:', error.message);
        res.status(500).send('Internal Server Error');
    }
}

export const allUsers = async (req, res) => {
    try {
     const users = await User.findAll();
      res.send(users);
    } catch (error) {
      console.error('Błąd podczas obsługi żądania:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };