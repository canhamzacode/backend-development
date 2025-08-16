import { JWTPayload } from '@/types';
import { Request, Response, NextFunction } from 'express';

export const authorize =
  (...allowedRoles: string[]) =>
  (req: Request & { user?: JWTPayload }, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
