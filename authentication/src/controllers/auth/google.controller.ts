import { Request, Response } from 'express';
import { HTTP_STATUS } from '@/constants';
import { upsertGoogleUser, exchangeCodeForTokens, verifyGoogleIdToken } from '@/services';
import { generateToken } from '@/utils';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const googleOauth = async (_req: Request, res: Response) => {
  const base = 'https://accounts.google.com/o/oauth2/v2/auth';
  const params = new URLSearchParams({
    client_id: process.env.CLIENT_ID!,
    redirect_uri: process.env.REDIRECT_URI!,
    response_type: 'code',
    scope: 'profile email'
  });
  res.redirect(`${base}?${params.toString()}`);
};

export const googleOauthCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string | undefined;
  if (!code) return res.status(400).json({ error: 'Missing code' });

  try {
    const { id_token } = await exchangeCodeForTokens(code);
    const googleUser = await verifyGoogleIdToken(id_token);
    if (!googleUser?.email) return res.status(400).json({ error: 'Google login failed' });

    const user = await upsertGoogleUser(googleUser);

    const access = generateToken({ userId: user.id, email: user.email, role: user.role });
    const refresh = generateToken(
      { userId: user.id, email: user.email, role: user.role },
      'refresh_token'
    );
    await db.update(users).set({ refresh_token: refresh }).where(eq(users.id, user.id));

    return res.status(HTTP_STATUS.OK.code).json({
      message: 'Login successful',
      data: {
        access_token: access,
        refresh_token: refresh,
        user: { id: user.id, email: user.email, name: user.name, role: user.role }
      }
    });
  } catch (e: any) {
    return res.status(500).json({ error: 'Google authentication failed' });
  }
};
