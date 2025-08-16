import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {
  createUser,
  findUserByEmail,
  findUserByEmailOrName,
  hashPassword,
  logger,
  LoginUserInput,
  RegisterUserInput,
  generateToken,
  findUserById,
  verifyToken,
  sendResetEmail
} from '../utils';
import { HTTP_STATUS } from '@/constants';
import { JWTPayload, ResetPassword } from '@/types';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}

const register = async (req: Request<{}, {}, RegisterUserInput>, res: Response) => {
  const { email, name, password } = req.body;
  const existingUser = await findUserByEmailOrName(email, name);

  if (existingUser) {
    return res.status(HTTP_STATUS.CONFLICT.code).json({
      message: 'User with this email or name already exists'
    });
  }

  const hashed = await hashPassword(password);
  const newUser = await createUser(name, email, hashed, 'user');

  return res.status(HTTP_STATUS.CREATED.code).json({
    message: 'User created successfully',
    data: { userId: newUser.id }
  });
};

const login = async (req: Request<{}, {}, LoginUserInput>, res: Response) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    res.status(HTTP_STATUS.UNAUTHORIZED.code).json({
      message: 'Invalid email or password'
    });
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(HTTP_STATUS.UNAUTHORIZED.code).json({
      message: 'Invalid email or password'
    });
  }

  const access_token = generateToken({ userId: user.id, email: user.email, role: user.role });
  const refresh_token = generateToken(
    { userId: user.id, email: user.email, role: user.role },
    'refresh_token'
  );

  await db.update(users).set({ refresh_token }).where(eq(users.id, user.id));

  const userResponse = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  };

  return res.status(HTTP_STATUS.OK.code).json({
    message: 'Login successful',
    data: {
      access_token,
      refresh_token,
      user: userResponse
    }
  });
};

const me = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user?.userId) {
    res.status(HTTP_STATUS.UNAUTHORIZED.code).json({
      message: 'Not authenticated'
    });
    return;
  }

  const user = await findUserById(req.user.userId);

  if (!user) {
    res.status(HTTP_STATUS.NOT_FOUND.code).json({
      message: 'User not found'
    });
    return;
  }

  const userResponse = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  };

  return res.status(HTTP_STATUS.OK.code).json({
    message: 'User information retrieved successfully',
    data: userResponse
  });
};

const refresh = async (req: Request, res: Response) => {
  const { refresh_token } = req.body;
  const decoded = verifyToken(refresh_token);

  const user = await findUserById(decoded.userId);

  if (!user || user.refresh_token !== refresh_token) {
    return res.status(HTTP_STATUS.UNAUTHORIZED.code).json({
      message: 'Invalid refresh token'
    });
  }

  const new_access_token = generateToken({ userId: user.id, email: user.email, role: user.role });
  const new_refresh_token = generateToken(
    { userId: user.id, email: user.email, role: user.role },
    'refresh_token'
  );

  await db.update(users).set({ refresh_token: new_refresh_token }).where(eq(users.id, user.id));

  return res.status(HTTP_STATUS.OK.code).json({
    message: 'Token refreshed successfully',
    data: {
      access_token: new_access_token,
      refresh_token: new_refresh_token
    }
  });
};

const logout = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user?.userId) {
    res.status(HTTP_STATUS.UNAUTHORIZED.code).json({
      message: 'Not authenticated'
    });
    return;
  }

  await db.update(users).set({ refresh_token: null }).where(eq(users.id, req.user.userId));

  return res.status(HTTP_STATUS.OK.code).json({
    message: 'Logged out successfully'
  });
};

const forgotPassword = async (
  req: Request<{}, {}, Pick<ResetPassword, 'email'>>,
  res: Response
) => {
  const { email } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(HTTP_STATUS.OK.code).json({ message: 'Reset email sent.' });
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min

  await db
    .update(users)
    .set({
      reset_password_token: resetCode,
      reset_password_expires: tokenExpiry
    })
    .where(eq(users.id, user.id));

  await sendResetEmail({ to: user.email, resetCode: resetCode });

  return res.status(HTTP_STATUS.OK.code).json({ message: 'Reset email sent.' });
};

const resetPassword = async (req: Request<{}, {}, ResetPassword>, res: Response) => {
  const { email, token, newPassword } = req.body;

  const user = await findUserByEmail(email);
  if (!user || !user.reset_password_token || user.reset_password_expires < new Date()) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ message: 'Invalid or expired code.' });
  }

  if (user.reset_password_token !== token) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ message: 'Invalid code.' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await db
    .update(users)
    .set({
      password: hashedPassword,
      reset_password_token: null,
      reset_password_expires: null
    })
    .where(eq(users.id, user.id));

  return res.status(HTTP_STATUS.OK.code).json({ message: 'Password reset successful.' });
};

const adminDashboard = (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK.code).json({
    message: 'Welcome to the Admin Dashboard!!'
  });
};

export { register, login, me, refresh, logout, forgotPassword, resetPassword, adminDashboard };
