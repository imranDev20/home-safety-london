import { NextResponse } from "next/server";
import { verifyRecaptcha } from "../_lib/verifyRecaptcha";
import { formatResponse } from "@/shared/functions";
import { sendEmail } from "../_lib/sendEmail";
import { adminNotificationEmailHtml } from "../_templates/admin-email";
import {
  customerEmailSubject,
  customerNotificationEmailHtml,
} from "../_templates/customer-email";

// Type guard to check if an error has a message property
function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}

export async function POST(req: Request) {
  try {
    // Extract the reCAPTCHA secret key from environment variables
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { message: "reCAPTCHA secret key is missing" },
        { status: 500 }
      );
    }

    // Parse the request body
    const { reCaptchaToken, email, message, subject, name } = await req.json();

    // Verify the reCAPTCHA token
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
      fromEmail: "info@londonhomesafety.co.uk",
      fromName: "London Home Safety",
      to: process.env.ADMIN_EMAIL as string,
      subject: adminEmailSubject,
      html: adminNotificationEmailHtml(name, email, subject, message),
    });

    // Send email to customer
    await sendEmail({
      fromName: "London Home Safety",
      fromEmail: "info@londonhomesafety.co.uk",
      to: email,
      subject: customerEmailSubject,
      html: customerNotificationEmailHtml(name, subject, message),
    });

    // Return a success response
    return NextResponse.json(
      formatResponse(true, null, "Form submitted successfully")
    );
  } catch (error) {
    // Handle errors and return a user-friendly message
    const errorMessage = isErrorWithMessage(error)
      ? error.message
      : "Internal Server Error";

    console.log(errorMessage);

    return NextResponse.json(formatResponse(false, null, errorMessage), {
      status: 500,
    });
  }
}
