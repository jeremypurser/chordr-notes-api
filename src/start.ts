import parser from 'body-parser';
import cors from 'cors';
import express from 'express';
import router from './api/v1/routes';
import { config } from './config';

const app = express();

// ====================== MIDDLEWARE ==========================
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(parser.json());

// ====================== ROUTING ==============================
app.use('/api/v1', router);

// ====================== OPEN PORT ============================
app.listen(config.port, () => {
  console.log(`Running on port ${config.port}`);
});
