import { connection } from '../../config';
import { Pool } from 'pg';

const pool = new Pool(connection);

interface NotesPost {
  body: {
    name: string;
    tuning: string[];
    note: string[][];
  };
}

const NotesModel = {
  post: async ({ body }: NotesPost) => {
    const { name, tuning, note } = body;
    const query =
      'INSERT INTO notes (user_id, name, tuning, note) VALUES(1, $1, $2, $3)';
    return await pool.query(query, [name, tuning, note]);
  }
};

export default NotesModel;
