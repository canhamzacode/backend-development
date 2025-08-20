import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';
import { createUser, findUserByEmail } from '@/utils';

const client = new OAuth2Client(process.env.CLIENT_ID);

export async function exchangeCodeForTokens(code: string) {
  const { data } = await axios.post('https://oauth2.googleapis.com/token', {
    code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    grant_type: 'authorization_code'
  });
  return { id_token: data.id_token as string, access_token: data.access_token as string };
}

export async function verifyGoogleIdToken(id_token: string) {
  const ticket = await client.verifyIdToken({ idToken: id_token, audience: process.env.CLIENT_ID });
  return ticket.getPayload();
}

export async function upsertGoogleUser(googleUser: { email?: string; name?: string }) {
  const existing = googleUser.email ? await findUserByEmail(googleUser.email) : null;
  if (existing) return existing;
  return createUser(googleUser.name || 'Google User', googleUser.email!, null, 'user');
}
