import { Pool } from 'pg';
import { connection } from '../../config';

const pool = new Pool(connection);

interface NotesPost {
  body: {
    name: string;
    tuning: string[];
    note: string[][];
  };
}

export interface NotesGet {
  params: GetParams;
}

export type GetParams = {
  user_id: string;
};

const NotesModel = {
  get: async ({ params }: NotesGet) => {
    const { user_id } = params;
    const query = 'SELECT * from notes WHERE user_id=($1)';
    return await pool.query(query, [+user_id]);
  },

  post: async ({ body }: NotesPost) => {
    const { name, tuning, note } = body;
    const query =
      'INSERT INTO notes (user_id, name, tuning, note) VALUES(1, $1, $2, $3)';
    return await pool.query(query, [name, tuning, note]);
  }
};

export default NotesModel;
