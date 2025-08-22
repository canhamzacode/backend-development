import axios from 'axios';

import { db } from '@/db';
import { users } from '@/db/schema';

export const upsertFacebookUser = async (fbUser: { email: string; name: string }) => {
  return db
    .insert(users)
    .values({ email: fbUser.email, name: fbUser.name })
    .onConflictDoUpdate({
      target: users.email,
      set: { name: fbUser.name }
    })
    .returning()
    .then((rows) => rows[0]);
};

export const exchangeFacebookCodeForTokens = async (code: string) => {
  const tokenRes = await axios.get('https://graph.facebook.com/v18.0/oauth/access_token', {
    params: {
      client_id: process.env.FACEBOOK_CLIENT_ID!,
      client_secret: process.env.FACEBOOK_CLIENT_SECRET!,
      redirect_uri: process.env.FACEBOOK_REDIRECT_URI!,
      code
    }
  });

  return tokenRes.data;
};

export const getFacebookUserProfile = async (accessToken: string) => {
  const profileRes = await axios.get('https://graph.facebook.com/me', {
    params: {
      fields: 'id,name,email',
      access_token: accessToken
    }
  });

  return profileRes.data;
};
