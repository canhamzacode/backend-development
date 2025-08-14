import express from 'express';
import { errorHandler } from './middlewares';
import appRoute from './routes';
import { logger } from './utils/';

const app = express();
app.use(express.json());

const PORT = 3000;

app.use('/api/v1', appRoute);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
