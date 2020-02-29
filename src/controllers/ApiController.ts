import { Request, Response } from 'express';
import { connection } from '../../config';
import { Pool } from 'pg';

const pool = new Pool(connection);

export const postNote = (req: Request, res: Response) => {
  const { name, tuning, note } = req.body;
  const query =
    'INSERT INTO notes (user_id, name, tuning, note) VALUES(1, $1, $2, $3)';
  pool
    .query(query, [name, tuning, note])
    .then(result => {
      console.log(result);
      res.status(201).end();
    })
    .catch(err => {
      console.log(err);
      res.status(201).end();
    });
};
