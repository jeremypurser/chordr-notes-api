import { Request, Response } from 'express';
import NotesModel from '../models';

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
