import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { HTTP_STATUS } from '../constants';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.sendStatus(HTTP_STATUS.BAD_REQUEST.code).json({
      message: 'Validation error',
      errorrs: err.issues,
    });
  }

  return res
    .status(err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
    .json({
      message: err.message || HTTP_STATUS.INTERNAL_SERVER_ERROR.message,
    });
};
