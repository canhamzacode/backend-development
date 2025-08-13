import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/utils';
import { JWTPayload } from '@/types';
import { HTTP_STATUS } from '@/constants';

export const authenticate = (
  req: Request & { user?: JWTPayload },
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(HTTP_STATUS.UNAUTHORIZED.code).json({
        message: 'No token provided'
      });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(HTTP_STATUS.UNAUTHORIZED.code).json({
      message: 'Invalid token'
    });
  }
};
