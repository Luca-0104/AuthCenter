import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const { data, error } = await resend.emails.send({
    from: 'authcenter@resend.dev',
    to: [email],
    subject: '[Auth Center] Your 2FA code ⚤',
    html: `<p>Here is your 2FA code: ${token}</p>`
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/reset-password?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: 'authcenter@resend.dev',
    to: [email],
    subject: '[Auth Center] Reset your password ⚤',
    html: `<p>Click <a href="${confirmLink}">here</a> to reset your password.</p>`
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: 'authcenter@resend.dev',
    to: [email],
    subject: '[Auth Center] Confirm Your Email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
  });
};
