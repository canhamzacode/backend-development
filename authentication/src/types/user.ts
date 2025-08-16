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
}

export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface ResetPassword {
  email: string;
  token: string;
  newPassword: string;
}
