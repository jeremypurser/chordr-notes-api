import express from 'express';
import parser from 'body-parser';
import cors from 'cors';
import { postNote } from './controllers';

const app = express();

app.use(cors({ origin: 'http://localhost:3000/' }));
app.use(parser.json());

app.post('/notes', postNote);

export default app;
