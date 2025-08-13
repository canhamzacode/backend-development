import express from 'express';
import { errorHandler } from './middlewares';
import appRoute from './routes';

const app = express();
app.use(express.json());

const PORT = 3000;

app.use('/api/v1', appRoute);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listenting on ${PORT}`);
});
