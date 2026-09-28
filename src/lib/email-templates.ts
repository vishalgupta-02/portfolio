export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function formatTimestamp(date: Date = new Date()): string {
  try {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    }) + " IST";
  } catch {
    return date.toUTCString();
  }
}

// Generate preheader spacing so email clients don't append boilerplate to the snippet
const PREHEADER_FILLER = "&zwnj;&nbsp;".repeat(40);

/**
 * Builds the notification email sent to the portfolio owner (Vishal)
 */
export function buildNotificationEmail({
  senderName,
  senderEmail,
  messageContent,
  timestamp,
}: {
  senderName: string;
  senderEmail: string;
  messageContent: string;
  timestamp?: string;
}) {
  const timeStr = timestamp || formatTimestamp();
  const initials = getInitials(senderName);
  const cleanSnippet = messageContent.replace(/\s+/g, " ").trim().slice(0, 140);
  const preheaderText = `${senderName}: "${cleanSnippet}"`;
  const replySubject = encodeURIComponent(`Re: Your message on vishalbuild.tech`);
  const mailtoLink = `mailto:${senderEmail}?subject=${replySubject}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>New Portfolio Message from ${escapeHtml(senderName)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #0f172a;">
  <!-- Hidden Preheader: Ensures Gmail / Apple Mail shows sender's actual message in preview snippet -->
  <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
    ${escapeHtml(preheaderText)} ${PREHEADER_FILLER}
  </div>

  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04); border: 1px solid #e2e8f0;">
          
          <!-- Top Accent Gradient Line -->
          <tr>
            <td height="4" style="background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%); line-height: 4px; font-size: 4px;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 24px 28px 16px 28px; border-bottom: 1px solid #f1f5f9;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display: inline-flex; align-items: center; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 9999px; padding: 4px 12px; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; color: #475569; text-transform: uppercase;">
                      <span style="display: inline-block; width: 6px; height: 6px; border-radius: 9999px; background-color: #10b981; margin-right: 6px;"></span>
                      Portfolio Contact Form
                    </span>
                  </td>
                  <td align="right" style="font-size: 12px; color: #64748b; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">
                    ${escapeHtml(timeStr)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sender Profile Box -->
          <tr>
            <td style="padding: 24px 28px 16px 28px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;">
                <tr>
                  <!-- Initials Avatar -->
                  <td width="48" valign="middle" style="padding-right: 14px;">
                    <div style="width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%); color: #ffffff; font-weight: 700; font-size: 16px; line-height: 44px; text-align: center; box-shadow: 0 2px 4px rgba(14, 165, 233, 0.25);">
                      ${escapeHtml(initials)}
                    </div>
                  </td>
                  <!-- Sender Details -->
                  <td valign="middle">
                    <div style="font-size: 16px; font-weight: 700; color: #0f172a; line-height: 1.3;">
                      ${escapeHtml(senderName)}
                    </div>
                    <div style="font-size: 13px; color: #2563eb; margin-top: 2px;">
                      <a href="${escapeHtml(mailtoLink)}" style="color: #2563eb; text-decoration: none; font-weight: 500;">
                        ${escapeHtml(senderEmail)}
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 0 28px 24px 28px;">
              <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; color: #64748b; margin-bottom: 8px;">
                Message Content
              </div>
              <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 18px 20px; font-size: 15px; line-height: 1.65; color: #1e293b; white-space: pre-wrap; word-break: break-word;">${escapeHtml(messageContent)}</div>
            </td>
          </tr>

          <!-- Quick Action Buttons -->
          <tr>
            <td style="padding: 0 28px 28px 28px;">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="border-radius: 8px; background-color: #0f172a;">
                    <a href="${escapeHtml(mailtoLink)}" target="_blank" style="display: inline-block; padding: 12px 22px; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 8px; background-color: #0f172a; border: 1px solid #0f172a;">
                      Reply to ${escapeHtml(senderName)}
                    </a>
                  </td>
                  <td width="12"></td>
                  <td align="center">
                    <a href="https://vishalbuild.tech" target="_blank" style="display: inline-block; padding: 12px 18px; font-size: 13px; font-weight: 500; color: #475569; text-decoration: none; border-radius: 8px; background-color: #f8fafc; border: 1px solid #e2e8f0;">
                      Open Portfolio &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 18px 28px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; line-height: 1.5;">
              Delivered by <strong>vishalbuild.tech</strong> &bull; Hit <strong style="color: #0f172a;">Reply</strong> in your mail app to respond directly to ${escapeHtml(senderEmail)}.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `New Portfolio Message from ${senderName} (${senderEmail})
Received: ${timeStr}

--------------------------------------------------
${messageContent}
--------------------------------------------------

Reply directly to this email or write to ${senderEmail}.
Sent from vishalbuild.tech contact form.`;

  return { html, text, preheaderText };
}

/**
 * Builds the automated confirmation / receipt email sent to the visitor
 */
export function buildVisitorConfirmationEmail({
  senderName,
  messageContent,
}: {
  senderName: string;
  messageContent: string;
}) {
  const preheaderText = `Thanks for reaching out! I've received your message and will get back to you shortly.`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Thanks for reaching out!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #0f172a;">
  <!-- Hidden Preheader -->
  <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
    ${escapeHtml(preheaderText)} ${PREHEADER_FILLER}
  </div>

  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04); border: 1px solid #e2e8f0;">
          
          <!-- Top Accent Line -->
          <tr>
            <td height="4" style="background: linear-gradient(90deg, #3b82f6 0%, #10b981 100%); line-height: 4px; font-size: 4px;">&nbsp;</td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px 28px 24px 28px;">
              <h2 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #0f172a; line-height: 1.25;">
                Thanks for reaching out, ${escapeHtml(senderName)}
              </h2>
              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 1.6; color: #334155;">
                I got your message through my portfolio (<a href="https://vishalbuild.tech" style="color: #2563eb; text-decoration: none; font-weight: 500;">vishalbuild.tech</a>). I'll review it and get back to you as soon as possible.
              </p>

              <div style="font-size: 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; color: #64748b; margin: 24px 0 8px 0;">
                Copy of your message
              </div>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #10b981; border-radius: 8px; padding: 14px 18px; font-size: 14px; line-height: 1.6; color: #475569; white-space: pre-wrap; word-break: break-word;">${escapeHtml(messageContent)}</div>

              <p style="margin: 24px 0 8px 0; font-size: 14px; line-height: 1.6; color: #334155;">
                If you have anything urgent, feel free to reply directly to this email.
              </p>
            </td>
          </tr>

          <!-- Sign-off & Socials -->
          <tr>
            <td style="padding: 0 28px 28px 28px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid #f1f5f9; padding-top: 20px;">
                <tr>
                  <td>
                    <div style="font-size: 15px; font-weight: 700; color: #0f172a;">Vishal Gupta</div>
                    <div style="font-size: 13px; color: #64748b; margin-top: 2px;">Full Stack & Systems Engineer &bull; <a href="https://vishalbuild.tech" style="color: #2563eb; text-decoration: none;">vishalbuild.tech</a></div>
                    <div style="margin-top: 10px; font-size: 13px;">
                      <a href="https://github.com/vishalgupta-02" target="_blank" style="color: #64748b; text-decoration: none; margin-right: 12px;">GitHub</a>
                      <a href="https://www.linkedin.com/in/v1shalgupt9" target="_blank" style="color: #64748b; text-decoration: none; margin-right: 12px;">LinkedIn</a>
                      <a href="https://x.com/v1shalworks" target="_blank" style="color: #64748b; text-decoration: none;">X / Twitter</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 14px 28px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
              This is an automated confirmation for your message sent to Vishal Gupta.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `Hi ${senderName},

Thanks for reaching out via vishalbuild.tech! I've received your message and will review it and get back to you shortly.

Here's a copy of your message:
--------------------------------------------------
${messageContent}
--------------------------------------------------

Best regards,
Vishal Gupta
Full Stack & Systems Engineer
https://vishalbuild.tech
GitHub: https://github.com/vishalgupta-02
LinkedIn: https://www.linkedin.com/in/v1shalgupt9`;

  return { html, text, preheaderText };
}
