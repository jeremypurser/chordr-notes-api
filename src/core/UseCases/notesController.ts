import { DbAdapter } from '../Adapters/DbAdapter';
import { Chord, ChordrResponse } from '../Entities';

export interface NotesController {
  addNote(
    note: Exclude<Chord, 'id'>
  ): Promise<ChordrResponse<Chord, 'created'>>;
  getNoteById(id: string): Promise<ChordrResponse<Chord, 'retrieved'>>;
  getAllNotes(userId: string): Promise<ChordrResponse<Chord[], 'retrieved'>>;
  updateNote(note: Chord): Promise<ChordrResponse<Chord, 'updated'>>;
  deleteNote(id: string): Promise<ChordrResponse<Chord, 'marked for deletion'>>;
}

export default function makeNotesController(
  dbAdapter: DbAdapter
): NotesController {
  return {
    // Create
    addNote: note =>
      dbAdapter
        .post('notes', note)
        .then(data => ({
          success: true as true,
          status: 'created' as 'created',
          data: data as Chord,
        }))
        .catch(error => ({
          success: false,
          status: 'error',
          error: error as string,
        })),
    // Read 1
    getNoteById: id =>
      dbAdapter
        .get('notes', 'user_id', id)
        .then(data => ({
          success: true as true,
          status: 'retrieved' as 'retrieved',
          data: data as Chord,
        }))
        .catch(error => ({
          success: false,
          status: 'error',
          error: error as string,
        })),
    // Read all
    getAllNotes: userId =>
      dbAdapter
        .get('notes', 'id', userId)
        .then(data => ({
          success: true as true,
          status: 'retrieved' as 'retrieved',
          data: data as Chord[],
        }))
        .catch(error => ({
          success: false,
          status: 'error',
          error: error as string,
        })),
    // Update
    updateNote: note =>
      dbAdapter
        .update('notes', note)
        .then(data => ({
          success: true as true,
          status: 'updated' as 'updated',
          data: data,
        }))
        .catch(error => ({
          success: false,
          status: 'error',
          error: error as string,
        })),
    // Delete
    deleteNote: id =>
      dbAdapter
        .delete('notes', id)
        .then(data => ({
          success: true as true,
          status: 'marked for deletion' as 'marked for deletion',
          data: data as Chord,
        }))
        .catch(error => ({
          success: false,
          status: 'error',
          error: error as string,
        })),
  };
}
