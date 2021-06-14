const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
const configuration = require("../config/config");
require("dotenv").config();

class CreateSenderSendgrid {
  async send(msg) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    return await sgMail.send({ ...msg, from: configuration.email.sendgrid });
  }
}

// class CreateSenderNodemailer {
//   async send(msg) {
//     const config = {
//       host: "smtp.meta.ua",
//       port: 465,
//       secure: true,
//       auth: {
//         user: configuration.email.nodemailer,
//         pass: process.env.PASSWORD,
//       },
//     };

//     const transporter = nodemailer.createTransport(config);
//     const emailOptions = {
//       from: configuration.email.nodemailer,
//       ...msg,
//     };

//     return await transporter.sendMail(emailOptions);
//   }
// }

module.exports = { CreateSenderSendgrid };
