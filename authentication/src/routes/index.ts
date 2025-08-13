import { Request, Response, Router } from 'express';
import { HTTP_STATUS } from '../constants';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK.code).json({
    message: 'Welcome to Hamza'
  });
});

export default router;
