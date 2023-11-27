import {Router} from 'express';
import { createNote, deleteNote, getAllNotes, updateNote } from '../controllers/note-controllers.js';

export const router = new Router();
router.get('/', getAllNotes);
// router.post('/', createNote);
// router.put('/:id', updateNote);
// router.delete('/:id', deleteNote);