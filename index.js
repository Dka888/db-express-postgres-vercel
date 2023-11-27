import express from "express";
import 'dotenv/config';
import { router as UserRouter} from "./app/routes/user-routes.js";
import {router as NoteRouter} from './app/routes/note-routes.js';

const app = express();

app.use(express.json());
app.use('/users', UserRouter);
app.use('/notes', NoteRouter);

app.listen(process.env.PORT, () => {
    console.log('Server run on PORT: 5000')
});