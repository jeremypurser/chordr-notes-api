import { Request, Response } from 'express';
import NotesModel from '../models';

type Params = { id: string };

const NotesController = {
  getNotes: (req: Request<Params>, res: Response) => {
    NotesModel.get(req)
      .then(result => {
        res.json(result.rows);
      })
      .catch(() => {
        res.status(400).end();
      });
  },
  postNote: (req: Request, res: Response) => {
    NotesModel.post(req)
      .then(() => {
        res.status(201).end();
      })
      .catch(() => {
        res.status(400).end();
      });
  }
};

export default NotesController;
