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
  findUserById
} from '../utils';
import { HTTP_STATUS } from '@/constants';
import { JWTPayload } from '@/types';

interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}

const register = async (req: Request<{}, {}, RegisterUserInput>, res: Response) => {
  try {
    const { email, name, password } = req.body;
    const existingUser = await findUserByEmailOrName(email, name);

    if (existingUser) {
      res.status(HTTP_STATUS.CONFLICT.code).json({
        message: 'User with this email already exists'
      });
      return;
    }

    const hashed = await hashPassword(password);
    const newUser = await createUser(name, email, hashed);

    res.status(HTTP_STATUS.CREATED.code).json({
      message: 'User created successfully',
      data: { userId: newUser.id }
    });
  } catch (error) {
    logger.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      message: HTTP_STATUS.INTERNAL_SERVER_ERROR.message
    });
  }
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
    res.status(HTTP_STATUS.UNAUTHORIZED.code).json({
      message: 'Invalid email or password'
    });
    return;
  }

  const token = generateToken({ userId: user.id, email: user.email });

  const userResponse = {
    id: user.id,
    email: user.email,
    name: user.name
  };

  res.status(HTTP_STATUS.OK.code).json({
    message: 'Login successful',
    data: {
      token,
      data: userResponse
    }
  });
  try {
  } catch (error) {
    logger.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      message: HTTP_STATUS.INTERNAL_SERVER_ERROR.message
    });
  }
};

const me = async (req: AuthenticatedRequest, res: Response) => {
  try {
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
      name: user.name
    };

    res.status(HTTP_STATUS.OK.code).json({
      message: 'User information retrieved successfully',
      data: userResponse
    });
  } catch (error) {
    logger.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      message: HTTP_STATUS.INTERNAL_SERVER_ERROR.message
    });
  }
};

export { register, login, me };
