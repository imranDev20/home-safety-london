import {
  TransactionalEmailsApi,
  SendSmtpEmail,
  TransactionalEmailsApiApiKeys,
} from "@sendinblue/client";

const apiInstance = new TransactionalEmailsApi();
apiInstance.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
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
  const sendSmtpEmail = new SendSmtpEmail();

  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = html;
  sendSmtpEmail.sender = { email: from };
  sendSmtpEmail.to = [{ email: to }];

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    if (response.body && (response.body as any).messageId) {
      console.log(`Email sent to ${to}: ${(response.body as any).messageId}`);
    } else {
      console.log(`Email sent to ${to}, but no messageId received`);
    }
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
    throw new Error(
      "We're sorry, but it looks like something went wrong on our end"
    );
  }
}
