import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'mahpro110@gmail.com',
      pass: 'wmub oche bjco huze',
    },
  });

  await transporter.sendMail({
    from: 'mahpro110@gmail.com', // sender address
    to, // list of receivers
    subject: 'Hello ✔ wanna change to password', // Subject line
    text: 'Reset Password with 10 minutes.', // plain text body
    html, // html body
  });
};
