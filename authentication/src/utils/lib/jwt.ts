import jwt from 'jsonwebtoken';
import { JWTPayload } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (
  payload: Omit<JWTPayload, 'iat' | 'exp'>,
  type?: 'access_token' | 'refresh_token'
): string => {
  if (type === 'refresh_token') {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '2d' });
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '14m' });
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
