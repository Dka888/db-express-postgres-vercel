import express from "express";
import 'dotenv/config';
import { register, allUsers, login } from "./app/controllers/user-controllers.js";

const app = express();

app.use(express.json());
app.post('/user', register);
app.get('/users', allUsers);
app.post('/users/login', login);

app.listen(process.env.PORT, () => {
    console.log('Server run on PORT: 5000')
});