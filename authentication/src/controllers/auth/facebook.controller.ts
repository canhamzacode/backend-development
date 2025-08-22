import { HTTP_STATUS } from '@/constants';
import { db } from '@/db';
import { users } from '@/db/schema';
import {
  exchangeFacebookCodeForTokens,
  generateToken,
  getFacebookUserProfile,
  upsertFacebookUser
} from '@/utils';
import { eq } from 'drizzle-orm';
import { Request, Response } from 'express';

export const facebookOauth = async (_req: Request, res: Response) => {
  const base = 'https://www.facebook.com/v18.0/dialog/oauth';
  const params = new URLSearchParams({
    client_id: process.env.FACEBOOK_CLIENT_ID!,
    redirect_uri: process.env.FACEBOOK_REDIRECT_URI!,
    response_type: 'code',
    scope: 'email,public_profile'
  });

  res.redirect(`${base}?${params.toString()}`);
};

export const facebookOauthCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string | undefined;
  if (!code) return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ error: 'Missing code' });

  try {
    const { access_token } = await exchangeFacebookCodeForTokens(code);

    const fbUser = await getFacebookUserProfile(access_token);
    if (!fbUser?.email)
      return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ error: 'Facebook login failed' });

    const user = await upsertFacebookUser(fbUser);

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
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
      .json({ error: 'Facebook authentication failed' });
  }
};
