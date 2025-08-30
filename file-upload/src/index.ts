import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { logger } from './utils';
import { errorHandler } from './middlewares';
import appRoute from './routes';

const app = express();

const PORT = 3000;

app.use(express.json());
app.use('/api/v1', appRoute);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
