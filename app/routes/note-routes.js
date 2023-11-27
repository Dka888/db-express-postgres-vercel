import {Router} from 'express';
import { createNote, deleteNote, getAllNotes, getNote, updateNote } from '../controllers/note-controllers.js';

export const router = new Router();
router.get('/', getAllNotes);
router.get('/:id', getNote);
router.post('/', createNote);
router.patch('/:id', updateNote);
// router.delete('/:id', deleteNote);