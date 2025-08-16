import { ServerClient } from 'postmark';
import logger from './logger';

const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN!);

interface SendResetEmailParams {
  to: string;
  resetCode: string;
  subject?: string;
  customMessage?: string;
}

export async function sendResetEmail({
  to,
  resetCode,
  subject = 'Password Reset Request',
  customMessage
}: SendResetEmailParams) {
  const message = customMessage
    ? customMessage.replace('{{resetCode}}', resetCode)
    : `You requested a password reset. Use the code below to reset your password:\n\n${resetCode}\n\nIf you did not request this, you can ignore this email.`;

  try {
    await client.sendEmail({
      From: process.env.POSTMARK_FROM_EMAIL!,
      To: to,
      Subject: subject,
      TextBody: message
    });
    console.log(`Reset code sent to ${to}`);
  } catch (err) {
    logger.error('Error sending reset code email:', err);
    throw new Error('Email could not be sent. Try again later.');
  }
}
