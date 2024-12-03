const nodemailer = require("nodemailer");

module.exports.sendEmail = async (options) => {
  try {
    // Create the transporter for sending emails
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nodejssha@gmail.com", // sender's email
        pass: "hpktxrfzaxhznqpd",    // sender's email app-specific password
      },
      tls: {
        rejectUnauthorized: false, // For development use only
      },
    });

    // Send the email using the transporter with the HTML content directly in the sendMail function
    const info = await transporter.sendMail({
      from: '"Node.js" <nodejssha@gmail.com>', // sender address
      to: options.email,                      // recipient email
      subject: "Email Confirmation",           // subject line
      html: `
        <html>
          <head>
            <style>
              /* Inline styles for better compatibility across email clients */
              body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
              .container { background-color: #ffffff; padding: 20px; border-radius: 8px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
              .header { text-align: center; margin-bottom: 20px; }
              .header img { width: 150px; }
              h1 { color: #4CAF50; }
              p { font-size: 16px; color: #333; }
              a { display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px; }
              a:hover { background-color: #45a049; }
              .footer { font-size: 12px; color: #777; text-align: center; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <!-- Node.js Logo -->
              <div class="header">
                <img src="https://www.curotec.com/wp-content/uploads/2023/09/curotec-nodejs.png" alt="Node.js Logo" />
              </div>
              <h1>Confirmation Email</h1>
              <p>${options.message}</p>
              <p>Thank you for signing up! Please confirm your email address by clicking the button below:</p>
              <a href="http://${process.env.HOST || 'localhost:3000'}/verify/${encodeURIComponent(options.email)}">Verify Email</a>
              <p>If you didn’t request this, please ignore this email.</p>
              <div class="footer">
                Best regards,<br>
                Node.js Team
              </div>
            </div>
          </body>
        </html>
      `, // HTML body content directly here
    });

    // Log the message ID after sending the email
    console.log("Message sent: %s", info.messageId);

  } catch (error) {
    // Catch and log any errors that occur during sending the email
    console.error("Error sending email:", error);
  }
};
