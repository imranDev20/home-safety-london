export const customerEmailSubject = "Your request to contact us was successful";

export const customerNotificationEmailHtml = (
  name: string,
  subject: string,
  message: string
) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
    <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
      <h2>Your request to contact us was successful</h2>
    </div>
    <div style="padding: 20px;">
      <p style="font-size: 18px;">Dear ${name},</p>
      <p style="font-size: 16px;">
        Thank you for contacting us. We have received your message and will get back to you as soon as possible.
      </p>
      <div style="margin-top: 20px; padding: 10px; background-color: #f9f9f9; border-radius: 5px;">
        <p style="font-size: 16px; font-weight: bold;">Subject:</p>
        <p style="font-size: 16px; margin-left: 20px;">${subject}</p>
        <p style="font-size: 16px; font-weight: bold;">Message:</p>
        <p style="font-size: 16px; margin-left: 20px;">${message}</p>
      </div>
      <p style="font-size: 16px; margin-top: 20px;">
        Best regards,<br/>
        <strong>London Home Safety Limited</strong>
      </p>
    </div>
    <div style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #666;">
      <p>London Home Safety Limited, 123 Business Road, Business City, BC 12345</p>
      <p><a href="https://www.londonhomesafetylimited.co.uk" style="color: #4CAF50;">www.yourcompany.com</a></p>
    </div>
  </div>
`;