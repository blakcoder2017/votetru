const nodemailer = require('nodemailer');

const HTML_TEMPLATE = require('./emailTemplate');

const sendEmail = async (options) => {
  //1. create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });

  //2. define the email options
  const emailOptions = {
    from: 'VoteTrue <hello@votetruegh.com>',
    to: options.email,
    subject: options.subject,
    html: HTML_TEMPLATE(options.message),
  };

  //3. send the email
  await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
