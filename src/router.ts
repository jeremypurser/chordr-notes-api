import parser from 'body-parser';
import cors from 'cors';
import express from 'express';
import notesController from './controllers';
import { expressAdapter } from './core/Adapters/RequestAdapter';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(parser.json());

// TODO: change route include user_id
// Create
app.post('/notes', expressAdapter(notesController.addNote));
// Read
app.get('/:user_id/notes', expressAdapter(notesController.getAllNotes));
// Update
app.put('/notes/:note_id', expressAdapter(notesController.updateNote));
// Delete
app.delete('/notes/:note_id', expressAdapter(notesController.deleteNote));

// TODO: endpoint to delete all notes in dev

export default app;
