import { Request, Response } from 'express';
import NotesModel, { NoteParams, UserParams } from '../models';

const NotesController = {
  getNotes: (req: Request<UserParams>, res: Response) => {
    NotesModel.get(req)
      .then(result => {
        res.json(result.rows);
      })
      .catch(() => {
        res.status(400).end();
      });
  },
  postNote: (req: Request<UserParams>, res: Response) => {
    NotesModel.post(req)
      .then(() => {
        res.status(201).json('save');
      })
      .catch(() => {
        res.status(400).json('save');
      });
  },
  editNote: (req: Request<NoteParams>, res: Response) => {
    NotesModel.put(req)
      .then(() => {
        res.status(201).json('update');
      })
      .catch(() => {
        res.status(400).json('update');
      });
  },
  deleteNote: (req: Request<NoteParams>, res: Response) => {
    NotesModel.delete(req)
      .then(() => {
        res.status(200).end();
      })
      .catch(() => {
        res.status(500).end();
      });
  }
};

export default NotesController;
