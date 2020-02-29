import express from 'express';
import parser from 'body-parser';
import { postNote } from './controllers';

const app = express();

app.use(parser.json());

app.post('/notes', postNote);

export default app;
