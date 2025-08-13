import { Request, Response, Router } from 'express';
import { HTTP_STATUS } from '../constants';
import { login, me, register } from '@/controllers';
import { authenticate, validate } from '@/middlewares';
import { userLoginSchema, registerUserSchema } from '@/utils';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK.code).json({
    message: 'Welcome to Hamza'
  });
});

router.route('/auth/register').post(validate(registerUserSchema), register);
router.route('/auth/login').post(validate(userLoginSchema), login);
router.route('/auth/me').get(authenticate, me);

export default router;
