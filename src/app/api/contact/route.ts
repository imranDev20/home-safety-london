import { NextResponse } from "next/server";
import { verifyRecaptcha } from "../_lib/verifyRecaptcha";
import { formatResponse } from "@/shared/functions";
import { sendEmail } from "../_lib/sendEmail";
import { adminNotificationEmailHtml } from "../_templates/admin-email";
import {
  customerEmailSubject,
  customerNotificationEmailHtml,
} from "../_templates/customer-email";

export async function POST(req: Request) {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const { reCaptchaToken, email, message, subject, name } = await req.json();

    if (!secretKey) {
      return NextResponse.json(
        { message: "reCAPTCHA secret key is missing" },
        { status: 500 }
      );
    }

    const verificationResponse = await verifyRecaptcha(
      reCaptchaToken,
      secretKey
    );

    if (!verificationResponse.success) {
      return NextResponse.json(
        formatResponse(
          false,
          verificationResponse["error-codes"],
          "reCAPTCHA verification failed"
        ),
        { status: 400 }
      );
    }

    // Send email to admin
    const adminEmailSubject = `${name} wants to contact you`;
    await sendEmail({
      from: email,
      to: process.env.ADMIN_EMAIL as string,
      subject: adminEmailSubject,
      html: adminNotificationEmailHtml(name, email, subject, message),
    });

    // Send email to customer

    await sendEmail({
      from: '"London Home Safety Limited" <no-reply@londonhomesafetylimited.com>',
      to: email,
      subject: customerEmailSubject,
      html: customerNotificationEmailHtml(name, subject, message),
    });

    return NextResponse.json(
      formatResponse(true, null, "Form submitted successfully")
    );
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return NextResponse.json(
      formatResponse(false, null, "Internal Server Error"),
      { status: 500 }
    );
  }
}
