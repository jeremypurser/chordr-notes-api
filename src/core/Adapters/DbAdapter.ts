import { Entity } from '../Entities';
import { NotesController } from '../UseCases/notesController';

export interface DbAdapter {
  post(table: string, a: { [key: string]: any }): Promise<any>;
  get(table: string, attribute: string, id: string): Promise<any>;
  update(table: string, a: Required<Entity>): Promise<any>;
  delete(table: string, id: string): Promise<any>;
}

export default function notesController(dbAdapter: DbAdapter): NotesController {
  return {
    addNote: note => dbAdapter.post('notes', note),
    getNoteById: id => dbAdapter.get('notes', 'user_id', id),
    getAllNotes: userId => dbAdapter.get('notes', 'id', userId),
    updateNote: note => dbAdapter.update('notes', note),
    deleteNote: id => dbAdapter.delete('notes', id),
  };
}
