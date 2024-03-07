const nodemailer = require('nodemailer');

exports.sendMail = async options => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secureConnection: false,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      ciphers: 'SSLv3',
    },
  });

  transporter.verify((err, res) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('Mail sent!');
    }
  });

  const mailOptions = {
    from: 'Dexter <demjan.a.golubov@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};
