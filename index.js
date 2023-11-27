import express from "express";
import 'dotenv/config';
import { register, allUsers } from "./app/controllers/user-controllers.js";

const app = express();


app.use('/user', register);
app.use('/users', allUsers);

app.listen(process.env.PORT, () => {
    console.log('Server run on PORT: 5000')
});