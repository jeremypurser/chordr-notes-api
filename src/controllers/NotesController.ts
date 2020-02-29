import { Request, Response } from 'express';
import { Pool } from 'pg';
import { connection } from '../../config';
import NotesModel from '../models';

const pool = new Pool(connection);

export const postNote = (req: Request, res: Response) => {
  NotesModel.post(req)
    .then(result => {
      console.log(result);
      res.status(201).end();
    })
    .catch(err => {
      console.log(err);
      res.status(201).end();
    });
};
