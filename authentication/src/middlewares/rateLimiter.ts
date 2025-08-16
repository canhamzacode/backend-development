import rateLimit, { Options } from 'express-rate-limit';

interface CustomRateLimitOptions {
  windowMs: number;
  max: number;
  message: string;
}

export const createRateLimiter = ({ windowMs, max, message }: CustomRateLimitOptions) =>
  rateLimit({
    windowMs,
    max,
    message: { error: message },
    standardHeaders: true,
    legacyHeaders: false
  });

export const registerLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Too many accounts created from this IP, please try again later.'
});

export const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again later.'
});

export const passwordResetLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many password reset attempts, please try again later.'
});
