export const createAccountNotifyHtml = (email: string) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Account Created</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: auto;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          overflow: hidden;
        }
        .header {
          background-color: #4CAF50;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 20px;
        }
        .content h2 {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .content p {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          background-color: #007BFF;
          color: #fff;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
        }
        .footer {
          background-color: #f1f1f1;
          padding: 10px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        .footer a {
          color: #4CAF50;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Your Account Has Been Created</h2>
        </div>
        <div class="content">
          <p>Dear ${name},</p>
          <p>We are pleased to inform you that an account has been created for you in our system.</p>
          <p>Your login credentials are as follows:</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Password:</strong> [User's Password]</p>
          <p>You can log in to your account using the button below:</p>
          <a href="[Login URL]" class="button">Log In</a>
          <p>For security reasons, we recommend changing your password after logging in for the first time.</p>
          <p>Best regards,<br>Your Company Team</p>
        </div>
        <div class="footer">
          <p>Your Company Name | Address Line 1, Address Line 2 | City, State, Zip Code</p>
          <p><a href="https://www.yourcompany.com">www.yourcompany.com</a></p>
        </div>
      </div>
    </body>
    </html>
    `;
};
