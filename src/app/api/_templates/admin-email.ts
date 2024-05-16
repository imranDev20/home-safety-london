// emailTemplates/adminNotificationEmail.js

export const adminNotificationEmailSubject = "New Contact Form Submission";

export const adminNotificationEmailHtml = (
  name: string,
  email: string,
  subject: string,
  message: string
) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="background-color: #d9534f; color: white; padding: 10px; text-align: center;">
      New Contact Form Submission
    </h2>
    <div style="padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <p style="font-size: 18px;">You have a new contact form submission:</p>
      <div style="margin-top: 20px; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">
        <p style="font-size: 16px; font-weight: bold;">Name:</p>
        <p style="font-size: 16px; margin-left: 20px;">${name}</p>
        <p style="font-size: 16px; font-weight: bold;">Email:</p>
        <p style="font-size: 16px; margin-left: 20px;">${email}</p>
        <p style="font-size: 16px; font-weight: bold;">Subject:</p>
        <p style="font-size: 16px; margin-left: 20px;">${subject}</p>
        <p style="font-size: 16px; font-weight: bold;">Message:</p>
        <p style="font-size: 16px; margin-left: 20px;">${message}</p>
      </div>
    </div>
  </div>
`;
