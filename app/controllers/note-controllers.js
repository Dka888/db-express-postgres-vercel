import { Note } from '../models/Note.js';

export const getAllNotes = async (req, res) => {
    const { userId } = req;
    try {
        const notes = await Note.findAll({
            where: { userId },
        });
        res.status(200).send(notes);
    } catch (e) {
        res.status(500);
    }
}

export const createNote = async (req, res) => {
    const { title, content } = req.body;
    const { userId } = req;
    try {
        const note = await Note.create({ title, content, userId});
        res.status(200).send(note);
    } catch (error) {
        res.status(500).send('Błąd podczas dodawania notatki.');
    }
}

export const getNote = async (req, res) => {
    const { id } = req.params;
    const note = await Note.findOne({ where: { id } });
    res.status(200).send(note);
}

export const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content, completed, notification, forDelete, color } = req.body;

    try {
        const note = await Note.findOne({ where: { id }, });

        if (!note) {
            return res.status(404).send('Notatka nie znaleziona.');
        }

        note.title = title; 

            note.content = content;

            note.completed = completed;

            note.notification = notification;

            note.forDelete = forDelete;

            note.color = color;
        await note.save();
        res.status(200).send(note);
    } catch (error) {
        res.status(500).send('Błąd podczas edycji notatki.');
    }
}

export const deleteNote = async (req, res) => {
    const { id } = req.params;

    try {
        const note = await Note.findOne({where: { id }})

        if (!note) {
            return res.status(404).send('Notatka nie znaleziona.');
        }
        await note.destroy();
        res.status(200).send();
    } catch (error) {
        res.status(500).send('Błąd podczas usuwania notatki.');
    }
}