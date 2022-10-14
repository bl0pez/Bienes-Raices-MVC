import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        }
      });

      //Envia el email
      await transport.sendMail({
        from: 'Bienes Raices',
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.message,
        });
        
}