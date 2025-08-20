import { Request, Response } from 'express';
import { HTTP_STATUS } from '@/constants';
import { generateToken, verifyToken } from '@/utils';
import { findUserById } from '@/utils';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const refresh = async (req: Request, res: Response) => {
  const { refresh_token } = req.body;
  const decoded = verifyToken(refresh_token);

  const user = await findUserById(decoded.userId);
  if (!user || user.refresh_token !== refresh_token) {
    return res.status(HTTP_STATUS.UNAUTHORIZED.code).json({ message: 'Invalid refresh token' });
  }

  const access = generateToken({ userId: user.id, email: user.email, role: user.role });
  const refreshNew = generateToken(
    { userId: user.id, email: user.email, role: user.role },
    'refresh_token'
  );

  await db.update(users).set({ refresh_token: refreshNew }).where(eq(users.id, user.id));

  return res.status(HTTP_STATUS.OK.code).json({
    message: 'Token refreshed successfully',
    data: { access_token: access, refresh_token: refreshNew }
  });
};
