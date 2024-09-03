import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const email = process.env.EMAIL_USER;
const password = process.env.EMAIL_PASS;
async function sendPasswordEmail(toEmail: string) {
  const password = "123456";

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: password,
    },
  });

  let mailOptions = {
    from: "info.jpp.ats@gmail.com",
    to: toEmail,
    subject: "Your Login Credentials",
    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #dddddd; border-radius: 10px;">
                <h2 style="color: #4CAF50; text-align: center;">Welcome!</h2>
                <p style="font-size: 16px; color: #333333; text-align: center;">
                    We are excited to have you on board. Here is your 6-digit password:
                </p>
                <div style="text-align: center; margin: 20px 0;">
                    <span style="font-size: 36px; font-weight: bold; color: #4CAF50;">${password}</span>
                </div>
                <p style="font-size: 14px; color: #555555; text-align: center;">
                    Please keep this password safe and secure. Don't forget to change your default password once you logged in.
                </p>
                <p style="font-size: 14px; color: #777777; text-align: center;">
                    Best Regards,<br>Your Team
                </p>
            </div>
        `,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: " + error);
  }
}

export default sendPasswordEmail;
