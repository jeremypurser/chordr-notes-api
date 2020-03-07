import parser from 'body-parser';
import cors from 'cors';
import express from 'express';
import NotesController from './controllers';

const { postNote, getNotes, editNote } = NotesController;

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(parser.json());

app.get('/:user_id/notes', getNotes);
// TODO: change route include user_id
app.post('/notes', postNote);
app.put('/notes/:note_id', editNote);

export default app;
