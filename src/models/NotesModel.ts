import { Pool } from 'pg';
import { connection } from '../../config';

const pool = new Pool(connection);

interface NotesRequest<T> {
  body?: {
    name: string;
    tuning: string[];
    note: string[][];
  };
  params?: T;
}

export interface NotesGet {
  params: UserParams;
}

export type UserParams = {
  user_id: string;
};

export type NoteParams = {
  note_id: string;
};

const NotesModel = {
  get: async ({ params }: NotesGet) => {
    const { user_id } = params;
    const query = 'SELECT * from notes WHERE user_id=($1)';
    return await pool.query(query, [+user_id]);
  },

  post: async ({ body }: NotesRequest<UserParams>) => {
    const { name, tuning, note } = body;
    const query =
      'INSERT INTO notes (user_id, name, tuning, note) VALUES(1, $1, $2, $3)';
    return await pool.query(query, [name, tuning, note]);
  },

  put: async ({ body, params }: NotesRequest<NoteParams>) => {
    const { note_id } = params;
    const { name, tuning, note } = body;
    const query = 'UPDATE notes SET name=$1, tuning=$2, note=$3 WHERE id=$4';
    return await pool.query(query, [name, tuning, note, note_id]);
  },
  delete: async ({ params }: NotesRequest<NoteParams>) => {
    const { note_id } = params;
    return await pool.query('DELETE FROM notes WHERE id=$1', [note_id]);
  }
};

export default NotesModel;
