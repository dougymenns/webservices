const sgMail = require("@sendgrid/mail");
const dotenv = require('dotenv')
const express = require("express")
const app = express()

app.use(express.static('utils'))

dotenv.config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.sendMail = async (to, subject, text) => {
  const msg = {
    to: to, // Change to your recipient
    from: "douglasmensah97@gmail.com", // Change to your verified sender
    subject: subject,
    text: text,
    // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  try {
    await sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (err) {
    console.log(err);
  }
};


