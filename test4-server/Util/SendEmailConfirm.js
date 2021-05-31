const nodemailer = require("nodemailer");

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

module.exports.sendEmail = async (email, url) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const testAccount = await nodemailer.createTestAccount();
  const oauth2Client = new OAuth2(
    "558519162646-48ln7qrld7temojqb6q0dsqleag06g7u.apps.googleusercontent.com", // ClientID
    "929_CafKXkUXcJLhSFQ2PN5A", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
  refresh_token: "1//04bGwqiFt77HuCgYIARAAGAQSNwF-L9Ir7-Np9xKfBF6dwOP09TVlVRt0CZJiFoaiUrsujtOvPuhg2DYyyCp1n9MGy4Imj7RLPSE"
});
const accessToken = oauth2Client.getAccessToken()
  // create reusable transporter object using the default SMTP transport
  //const transporter = nodemailer.createTransport({
    const transporter = nodemailer.createTransport({
      service: "gmail",
    auth: {
      type: "OAuth2",
          user: "pjrresm@gmail.com", 
          clientId: "558519162646-48ln7qrld7temojqb6q0dsqleag06g7u.apps.googleusercontent.com",
          clientSecret: "929_CafKXkUXcJLhSFQ2PN5A",
          refreshToken: "1//04bGwqiFt77HuCgYIARAAGAQSNwF-L9Ir7-Np9xKfBF6dwOP09TVlVRt0CZJiFoaiUrsujtOvPuhg2DYyyCp1n9MGy4Imj7RLPSE",
          accessToken: accessToken
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Projet CV" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Account Confirmation Email", // Subject line
    text: "Hello world?", // plain text body
    html: `<a href="${url}">Testing Email</a>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
