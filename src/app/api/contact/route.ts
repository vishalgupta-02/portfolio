import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      )
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Message must be at least 5 characters long." },
        { status: 400 }
      )
    }

    const senderName = typeof name === "string" && name.trim() ? name.trim() : "Website Visitor"
    const senderEmail = email.trim()
    const messageContent = message.trim()

    const resendApiKey = process.env.RESEND_API_KEY

    // If RESEND_API_KEY is not configured yet (e.g. local dev before user adds key)
    if (!resendApiKey) {
      console.warn(
        "⚠️ [Contact API] RESEND_API_KEY is not set in environment variables. Message simulated:",
        { senderName, senderEmail, messageContent }
      )
      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Message received (Development mode: RESEND_API_KEY not configured yet).",
      })
    }

    const emailPayload = {
      from: "Portfolio Contact <contact@vishalbuild.tech>",
      to: ["abhimanyug987@gmail.com"],
      reply_to: senderEmail,
      subject: `New Portfolio Message from ${senderName}`,
      text: `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${messageContent}\n\nSent from vishalbuild.tech contact form at ${new Date().toISOString()}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f2937; background-color: #f9fafb; margin: 0; padding: 20px; }
              .card { max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
              .header { background: #0f172a; color: #ffffff; padding: 24px; }
              .header h2 { margin: 0; font-size: 20px; font-weight: 600; }
              .header p { margin: 4px 0 0; font-size: 13px; color: #94a3b8; }
              .body { padding: 24px; }
              .field { margin-bottom: 16px; }
              .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 600; margin-bottom: 4px; }
              .value { font-size: 15px; color: #0f172a; font-weight: 500; }
              .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; white-space: pre-wrap; color: #334155; }
              .footer { padding: 16px 24px; background: #f1f5f9; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="header">
                <h2>New Portfolio Contact Message</h2>
                <p>Received from vishalbuild.tech contact form</p>
              </div>
              <div class="body">
                <div class="field">
                  <div class="label">From</div>
                  <div class="value">${escapeHtml(senderName)} &lt;${escapeHtml(senderEmail)}&gt;</div>
                </div>
                <div class="field">
                  <div class="label">Message</div>
                  <div class="message-box">${escapeHtml(messageContent)}</div>
                </div>
              </div>
              <div class="footer">
                Hit "Reply" in your email client to respond directly to ${escapeHtml(senderEmail)}.
              </div>
            </div>
          </body>
        </html>
      `,
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    })

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text()
      console.error("[Resend API Error]", resendResponse.status, errorText)
      return NextResponse.json(
        { error: "Failed to dispatch email via Resend. Please try again or email directly." },
        { status: resendResponse.status }
      )
    }

    const resendData = await resendResponse.json()
    return NextResponse.json({ success: true, id: resendData.id })
  } catch (err) {
    console.error("[Contact API Error]", err)
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your message." },
      { status: 500 }
    )
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
