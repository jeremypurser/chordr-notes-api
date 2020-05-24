import { Chord, ChordrResponse } from '.';

export interface NotesController {
  addNote(note: Exclude<Chord, 'id'>): Promise<ChordrResponse<Chord, 'posted'>>;
  getNoteById(id: string): Promise<ChordrResponse<Chord, undefined>>;
  getAllNotes(userId: string): Promise<ChordrResponse<Chord[], undefined>>;
  updateNote(note: Chord): Promise<ChordrResponse<Chord, 'updated'>>;
  deleteNote(
    note: Chord
  ): Promise<ChordrResponse<Chord, 'marked for deletion'>>;
}
