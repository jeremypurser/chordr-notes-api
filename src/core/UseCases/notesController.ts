import { DbAdapter } from '../Adapters/DbAdapter';
import { Chord, ChordrResponse } from '../Entities';

export interface Notes {
  addNote(
    userId: string,
    note: Exclude<Chord, 'id'>
  ): Promise<ChordrResponse<Chord, 'created'>>;
  getNoteById(id: string): Promise<ChordrResponse<Chord, 'retrieved'>>;
  getAllNotes(userId: string): Promise<ChordrResponse<Chord[], 'retrieved'>>;
  updateNote(note: Chord): Promise<ChordrResponse<Chord, 'updated'>>;
  deleteNote(id: string): Promise<ChordrResponse<Chord, 'marked for deletion'>>;
}

export default class NotesController implements Notes {
  // Injected data persistence
  db: DbAdapter;

  private constructor(dbAdatper: DbAdapter) {
    this.db = dbAdatper;
  }

  static from(dbAdatper: DbAdapter) {
    return new this(dbAdatper);
  }

  // Create
  addNote(
    userId: string,
    note: Exclude<Chord, 'id'>
  ): Promise<ChordrResponse<Chord, 'created'>> {
    return this.db
      .post('notes', userId, note)
      .then(data => ({
        success: true as true,
        status: 'created' as 'created',
        data: data as Chord,
      }))
      .catch(error => ({
        success: false,
        status: 'error',
        error: error,
      }));
  }

  // Read 1
  getNoteById(id: string): Promise<ChordrResponse<Chord, 'retrieved'>> {
    return this.db
      .get('notes', 'id', id)
      .then(data => ({
        success: true as true,
        status: 'retrieved' as 'retrieved',
        data: data as Chord,
      }))
      .catch(error => ({
        success: false,
        status: 'error',
        error: error,
      }));
  }

  // Read all
  getAllNotes(userId: string): Promise<ChordrResponse<Chord[], 'retrieved'>> {
    return this.db
      .get('notes', 'user_id', userId)
      .then(data => ({
        success: true as true,
        status: 'retrieved' as 'retrieved',
        data: data as Chord[],
      }))
      .catch(error => ({
        success: false,
        status: 'error',
        error: error,
      }));
  }

  // Update
  updateNote(note: Chord): Promise<ChordrResponse<Chord, 'updated'>> {
    return this.db
      .update('notes', note)
      .then(data => ({
        success: true as true,
        status: 'updated' as 'updated',
        data: data,
      }))
      .catch(error => ({
        success: false,
        status: 'error',
        error: error,
      }));
  }

  // Delete
  deleteNote(
    id: string
  ): Promise<ChordrResponse<Chord, 'marked for deletion'>> {
    return this.db
      .delete('notes', id)
      .then(data => ({
        success: true as true,
        status: 'marked for deletion' as 'marked for deletion',
        data: data as Chord,
      }))
      .catch(error => ({
        success: false,
        status: 'error',
        error: error,
      }));
  }
}
