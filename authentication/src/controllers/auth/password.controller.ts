import { Request, Response } from 'express';
import { HTTP_STATUS } from '@/constants';
import bcrypt from 'bcrypt';
import { sendResetEmail, findUserByEmail } from '@/utils';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ResetPassword } from '@/types';

export const forgotPassword = async (
  req: Request<{}, {}, Pick<ResetPassword, 'email'>>,
  res: Response
) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(HTTP_STATUS.OK.code).json({ message: 'Reset email sent.' });

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15m

  await db
    .update(users)
    .set({
      reset_password_token: resetCode,
      reset_password_expires: tokenExpiry
    })
    .where(eq(users.id, user.id));

  await sendResetEmail({ to: user.email, resetCode });
  return res.status(HTTP_STATUS.OK.code).json({ message: 'Reset email sent.' });
};

export const resetPassword = async (req: Request<{}, {}, ResetPassword>, res: Response) => {
  const { email, token, newPassword } = req.body;

  const user = await findUserByEmail(email);
  if (!user || !user.reset_password_token || user.reset_password_expires < new Date()) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ message: 'Invalid or expired code.' });
  }
  if (user.reset_password_token !== token) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ message: 'Invalid code.' });
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await db
    .update(users)
    .set({
      password: hashed,
      reset_password_token: null,
      reset_password_expires: null
    })
    .where(eq(users.id, user.id));

  return res.status(HTTP_STATUS.OK.code).json({ message: 'Password reset successful.' });
};
