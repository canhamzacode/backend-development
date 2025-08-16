import { z } from 'zod';

export const registerUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string()
  })
});

export const userLoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string()
  })
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refresh_token: z.string()
  })
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email()
  })
});

export const resetPasswordSchema = z.object({
  body: z.object({
    email: z.string().email(),
    token: z.string(),
    newPassword: z.string().min(8)
  })
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>['body'];

export type LoginUserInput = z.infer<typeof userLoginSchema>['body'];
