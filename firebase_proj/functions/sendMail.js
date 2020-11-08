const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
//const gmailEmail = functions.config().gmail.email;
//const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mykitchending@gmail.com',
    pass: 'Tongueofflame007',
  },
});

  async function sendEmail(message) {
    const mailOptions = {
      from: 'Ding',
      to: '8138926373@vtext.com',
    };

    // The user unsubscribed to the newsletter.
    mailOptions.subject = `Ding Alert!`;
    mailOptions.text = message;
    await mailTransport.sendMail(mailOptions);
    return null;
  }

sendEmail('yo')
