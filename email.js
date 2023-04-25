const nodemailer = require("nodemailer");
const ejs = require("ejs");
require("dotenv").config();

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;
const transport = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

const sendEmail = (receiver, subject, content) => {
  ejs.renderFile(
    __dirname + "/templates/welcome.ejs",
    { receiver, content },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        var mailOptions = {
          from: "email_username",
          to: receiver,
          subject: subject,
          html: data,
        };

        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: %s", info.messageId);
        });
      }
    }
  );
};

module.exports = {
  sendEmail,
};
