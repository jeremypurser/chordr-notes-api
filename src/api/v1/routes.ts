import { Router } from 'express';
import notesController from '../../controllers';
import { expressAdapter } from '../../core/Adapters/RequestAdapter';

// base => /api/v1
const router = Router();

// Create
router.post('/:userId/notes', expressAdapter(notesController.addNote));

// Read all
router.get('/:userId/notes', expressAdapter(notesController.getAllNotes));

// Read 1
router.get('/notes/:id', expressAdapter(notesController.getNoteById));

// Update
router.put('/notes/:id', expressAdapter(notesController.updateNote));

// Delete
router.delete('/notes/:id', expressAdapter(notesController.deleteNote));

export default router;
