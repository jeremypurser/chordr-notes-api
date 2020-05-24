import parser from 'body-parser';
import cors from 'cors';
import express from 'express';
import notesController from './controllers';
import { expressAdapter } from './core/Adapters/RequestAdapter';

const app = express();

// ====================== MIDDLEWARE ==========================
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(parser.json());

// ====================== ROUTES ==============================
// TODO: change route include user_id
// Create
app.post('/api/v1/:userId/notes', expressAdapter(notesController.addNote));
// Read
app.get('/api/v1/:userId/notes', expressAdapter(notesController.getAllNotes));
// Update
app.put('/api/v1/notes/:id', expressAdapter(notesController.updateNote));
// Delete
app.delete('/api/v1/notes/:id', expressAdapter(notesController.deleteNote));

export default app;
