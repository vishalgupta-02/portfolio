import { NextResponse } from "next/server";
import {
  buildNotificationEmail,
  buildVisitorConfirmationEmail,
} from "@/lib/email-templates";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 },
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Message must be at least 5 characters long." },
        { status: 400 },
      );
    }

    const senderName =
      typeof name === "string" && name.trim() ? name.trim() : "Website Visitor";
    const senderEmail = email.trim();
    const messageContent = message.trim();

    const resendApiKey = process.env.RESEND_API_KEY;

    // If RESEND_API_KEY is not configured yet (e.g. local dev before user adds key)
    if (!resendApiKey) {
      console.warn(
        "[Contact API] RESEND_API_KEY is not set in environment variables. Message simulated:",
        { senderName, senderEmail, messageContent },
      );
      return NextResponse.json({
        success: true,
        simulated: true,
        message:
          "Message received (Development mode: RESEND_API_KEY not configured yet).",
      });
    }

    // 1. Build & send notification to portfolio owner (Vishal)
    const notificationEmail = buildNotificationEmail({
      senderName,
      senderEmail,
      messageContent,
    });

    const emailPayload = {
      from: "Vishal Gupta (Portfolio) <contact@vishalbuild.tech>",
      to: ["abhimanyug987@gmail.com"],
      reply_to: senderEmail,
      subject: `[Portfolio] New message from ${senderName}`,
      text: notificationEmail.text,
      html: notificationEmail.html,
    };

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error("[Resend API Error]", resendResponse.status, errorText);
      return NextResponse.json(
        {
          error:
            "Failed to dispatch email via Resend. Please try again or email directly.",
        },
        { status: resendResponse.status },
      );
    }

    const resendData = await resendResponse.json();

    // 2. Dispatch automated confirmation / thank-you email to visitor (non-blocking)
    try {
      const visitorEmail = buildVisitorConfirmationEmail({
        senderName,
        messageContent,
      });

      const visitorPayload = {
        from: "Vishal Gupta <contact@vishalbuild.tech>",
        to: [senderEmail],
        reply_to: "abhimanyug987@gmail.com",
        subject: `Thanks for reaching out, ${senderName}!`,
        text: visitorEmail.text,
        html: visitorEmail.html,
      };

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visitorPayload),
      });
    } catch (visitorErr) {
      // Log error but don't fail the request since the owner notification succeeded
      console.warn("[Contact API Visitor Confirmation Error]", visitorErr);
    }

    return NextResponse.json({ success: true, id: resendData.id });
  } catch (err) {
    console.error("[Contact API Error]", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your message." },
      { status: 500 },
    );
  }
}
