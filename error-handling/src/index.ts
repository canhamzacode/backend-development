import express from 'express';
import appROute from './routes';
import { errorHandler } from './middlewares';

const app = express();
app.use(express.json());

const PORT = 3000;

app.use('/api/v1', appROute);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App Listening on ${PORT}`);
});
