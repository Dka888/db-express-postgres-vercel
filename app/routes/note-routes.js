import {Router} from 'express';
import { createNote, deleteNote, getAllNotes, getNote, updateNote } from '../controllers/note-controllers.js';
import { verifyToken } from '../middleware/middleware.js';

export const router = new Router();
router.get('/', verifyToken, getAllNotes);
router.get('/:id',verifyToken, getNote);
router.post('/',verifyToken, createNote);
router.put('/:id',verifyToken, updateNote);
router.delete('/:id',verifyToken, deleteNote);