import { Request, Response } from 'express';
import { HTTP_STATUS } from '@/constants';

export const adminDashboard = (_req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK.code).json({ message: 'Welcome to the Admin Dashboard!!' });
};
