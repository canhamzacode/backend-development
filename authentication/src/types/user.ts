export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  refresh_token: string;
  reset_password_token: string;
  reset_password_expires: Date;
  createdAt?: Date;
  updatedAt?: Date;
  role: Role;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

export interface ResetPassword {
  email: string;
  token: string;
  newPassword: string;
}

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin'
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
