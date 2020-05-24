import { Request, Response } from 'express';
import { ChordrResponse } from '../Entities';

export function expressAdapter(
  controller: (a: any, b?: any) => Promise<ChordrResponse<any, any>>
) {
  return function (req: Request, res: Response) {
    switch (req.method) {
      case 'POST':
        controller(req.params.userId, req.body).then(data => {
          res.status(data.success ? 201 : 500).json(data);
        });
        break;
      case 'GET':
        if (req.params.userId) {
          controller(req.params.userId).then(data => {
            res.status(data.success ? 200 : 500).json(data);
          });
        } else if (req.params.id) {
          controller(req.params.id).then(data => {
            res.status(data.success ? 200 : 500).json(data);
          });
        }
        break;
      case 'PUT':
        controller({ id: req.params.id, ...req.body }).then(data => {
          res.status(data.success ? 204 : 500).json(data);
        });
        break;
      case 'DELETE':
        controller(req.params.id).then(data => {
          res.status(data.success ? 204 : 500).json(data);
        });
        break;
      default:
        throw new Error('Invalid request');
        break;
    }
  };
}
