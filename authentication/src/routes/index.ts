import { Request, Response, Router } from 'express';
import { HTTP_STATUS } from '../constants';
import { forgotPassword, login, logout, me, refresh, register, resetPassword } from '@/controllers';
import {
  authenticate,
  loginLimiter,
  passwordResetLimiter,
  registerLimiter,
  validate
} from '@/middlewares';
import {
  userLoginSchema,
  registerUserSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} from '@/utils';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK.code).json({
    message: 'Welcome to Hamza!!!'
  });
});

router.route('/auth/register').post(registerLimiter, validate(registerUserSchema), register);
router.route('/auth/login').post(loginLimiter, validate(userLoginSchema), login);
router.route('/auth/me').get(authenticate, me);
router.route('/auth/refresh').post(validate(refreshTokenSchema), refresh);
router.route('/auth/logout').get(authenticate, logout);
router
  .route('/auth/forget-password')
  .post(passwordResetLimiter, validate(forgotPasswordSchema), forgotPassword);
router.route('/auth/reset-password').post(validate(resetPasswordSchema), resetPassword);

export default router;
