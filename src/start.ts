import parser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { config } from './config/config';
import router from './config/routes';

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
