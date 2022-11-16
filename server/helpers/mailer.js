require("dotenv").config();
const nodemailer = require("nodemailer");
async function sendEmail(email, code) {

const smtpEndpoint = "smtp.sendgrid.net";
const port = 465;
const senderAddress = "allveepille@outlook.com";
var toAddress = email;
const smtpUsername = "apikey";
const smtpPassword = process.env.SG_APIKEY;

  try {
    
    var subject = "Olete edukalt registreeritud!";
    // emaili sisu
    var body_html = `<!DOCTYPE> 
    <html>
      <body>
        <p>Sinu kinnituskood on: </p> <b>${code}</b>
      </body>
    </html>`;
    

    let transporter = nodemailer.createTransport({
      host: smtpEndpoint,
      port: port,
      secure: true,
      auth: {
        user: smtpUsername,
        pass: smtpPassword,
      },
    });
    
    let mailOptions = {
      from: senderAddress,
      to: toAddress,
      subject: subject,
      html: body_html,
    };
    let info = await transporter.sendMail(mailOptions);
    return { error: false };
  } catch (error) {
    console.error("send-email-error", error);
    return {
      error: true,
      message: "Cannot send email",
    };
  }
}
module.exports = { sendEmail };