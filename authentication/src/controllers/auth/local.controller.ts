import { Request, Response } from 'express';
import {
  createUser,
  findUserByEmail,
  findUserByEmailOrName,
  generateToken,
  hashPassword,
  LoginUserInput,
  RegisterUserInput,
  findUserById
} from '@/utils';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { HTTP_STATUS } from '@/constants';
import { JWTPayload } from '@/types';

interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}

export const register = async (req: Request<{}, {}, RegisterUserInput>, res: Response) => {
  const { email, name, password } = req.body;
  const exists = await findUserByEmailOrName(email, name);
  if (exists)
    return res
      .status(HTTP_STATUS.CONFLICT.code)
      .json({ message: 'User with this email or name already exists' });

  const hashed = await hashPassword(password);
  const newUser = await createUser(name, email, hashed, 'user');
  return res
    .status(HTTP_STATUS.CREATED.code)
    .json({ message: 'User created successfully', data: { userId: newUser.id } });
};

export const login = async (req: Request<{}, {}, LoginUserInput>, res: Response) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user)
    return res.status(HTTP_STATUS.UNAUTHORIZED.code).json({ message: 'Invalid email or password' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok)
    return res.status(HTTP_STATUS.UNAUTHORIZED.code).json({ message: 'Invalid email or password' });

  const access_token = generateToken({ userId: user.id, email: user.email, role: user.role });
  const refresh_token = generateToken(
    { userId: user.id, email: user.email, role: user.role },
    'refresh_token'
  );
  await db.update(users).set({ refresh_token }).where(eq(users.id, user.id));

  return res.status(HTTP_STATUS.OK.code).json({
    message: 'Login successful',
    data: {
      access_token,
      refresh_token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    }
  });
};

export const me = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user?.userId)
    return res.status(HTTP_STATUS.UNAUTHORIZED.code).json({ message: 'Not authenticated' });
  const user = await findUserById(req.user.userId);
  if (!user) return res.status(HTTP_STATUS.NOT_FOUND.code).json({ message: 'User not found' });

  return res.status(HTTP_STATUS.OK.code).json({
    message: 'User information retrieved successfully',
    data: { id: user.id, email: user.email, name: user.name, role: user.role }
  });
};

export const logout = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user?.userId)
    return res.status(HTTP_STATUS.UNAUTHORIZED.code).json({ message: 'Not authenticated' });
  await db.update(users).set({ refresh_token: null }).where(eq(users.id, req.user.userId));
  return res.status(HTTP_STATUS.OK.code).json({ message: 'Logged out successfully' });
};
