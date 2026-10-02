import nodemailer from "nodemailer";

type Inquiry = {
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  country: string;
  inquiry_type: string;
  product: string;
  quantity: string;
  application: string;
  message: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] || character);
}

export async function sendInquiryNotification(inquiry: Inquiry) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const recipient = process.env.INQUIRY_NOTIFICATION_TO || user;

  if (!host || !user || !password || !recipient) {
    console.warn("Inquiry email notification is not configured.");
    return;
  }

  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE !== "false",
    auth: { user, pass: password },
  });
  const row = (label: string, value: string) => value
    ? `<tr><td style="padding:8px 12px;background:#f7f3ee;font-weight:700">${label}</td><td style="padding:8px 12px">${escapeHtml(value)}</td></tr>`
    : "";

  await transporter.sendMail({
    from: `"${process.env.EMAIL_FROM_NAME || "XINSHERN Website"}" <${user}>`,
    to: recipient,
    replyTo: inquiry.email,
    subject: `[New Inquiry] ${inquiry.company_name || inquiry.full_name}${inquiry.product ? ` - ${inquiry.product}` : ""}`,
    html: `<div style="font-family:Arial,sans-serif;color:#241d17"><h2 style="color:#ed7117">New Website Inquiry</h2><table style="border-collapse:collapse;width:100%;max-width:720px" border="1" bordercolor="#e8e0d6">${row("Name", inquiry.full_name)}${row("Company", inquiry.company_name)}${row("Email", inquiry.email)}${row("Phone / WhatsApp", inquiry.phone)}${row("Country", inquiry.country)}${row("Inquiry Type", inquiry.inquiry_type)}${row("Product / Model", inquiry.product)}${row("Quantity", inquiry.quantity)}${row("Application", inquiry.application)}${row("Requirements", inquiry.message)}</table><p style="color:#74685d">Open the website admin panel to manage this inquiry.</p></div>`,
  });
}
