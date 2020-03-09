import parser from 'body-parser';
import cors from 'cors';
import express from 'express';
import NotesController from './controllers';

const { postNote, getNotes, editNote, deleteNote } = NotesController;

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(parser.json());

// TODO: change route include user_id
// Create
app.post('/notes', postNote);
// Read
app.get('/:user_id/notes', getNotes);
// Update
app.put('/notes/:note_id', editNote);
// Delete
app.delete('/notes/:note_id', deleteNote);

// TODO: endpoint to delete all notes in dev

export default app;
