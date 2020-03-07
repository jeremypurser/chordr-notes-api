import { Request, Response } from 'express';
import NotesModel, { UserParams } from '../models';

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
        res.status(201).end();
      })
      .catch(() => {
        res.status(400).end();
      });
  },
  editNote: (req: Request<NoteParams>, res: Response) => {
    NotesModel.put(req)
      .then(() => {
        res.status(201).end();
      })
      .catch(() => {
        res.status(400).end();
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
