import SibApiV3Sdk from "@sendinblue/client";

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY as string
);

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({
  from,
  to,
  subject,
  html,
}: EmailOptions): Promise<void> {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = html;
  sendSmtpEmail.sender = { email: from };
  sendSmtpEmail.to = [{ email: to }];

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`Email sent to ${to}: ${response.body.messageId}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
    throw new Error(
      "We're sorry, but it looks like something went wrong on our end"
    );
  }
}
