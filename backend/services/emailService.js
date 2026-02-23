const nodemailer = require('nodemailer');

// Create transporter - uses env vars when configured
// Set SMTP_* in .env for real email sending (e.g. SendGrid, Mailgun, Gmail)
const getTransporter = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  return null;
};

/**
 * Send order confirmation + welcome email after successful payment
 * @param {Object} opts
 * @param {string} opts.to - Customer email
 * @param {string} opts.customerName - Customer name
 * @param {string} opts.courseName - Course/program name
 * @param {number} opts.amount - Amount paid
 */
async function sendOrderConfirmationEmail({ to, customerName, courseName, amount }) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log('[Email] SMTP not configured. Would send order confirmation to:', to);
    return { sent: false, reason: 'SMTP not configured' };
  }

  const subject = 'Order Successful – Welcome to Sky States!';
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#f4f4f5;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <div style="background:#fff;border-radius:16px;padding:40px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
      <h1 style="color:#1a1a2e;margin:0 0 24px;font-size:24px;">Thank you for your order!</h1>
      <p style="color:#475569;line-height:1.6;margin:0 0 24px;">Hi ${customerName || 'Student'},</p>
      <p style="color:#475569;line-height:1.6;margin:0 0 24px;">Your payment was successful. We're excited to welcome you to Sky States!</p>
      
      <div style="background:#f8fafc;border-radius:12px;padding:24px;margin:24px 0;border:1px solid #e2e8f0;">
        <h3 style="margin:0 0 16px;color:#1a1a2e;font-size:16px;">Order Details</h3>
        <p style="margin:0 0 8px;color:#475569;"><strong>Course:</strong> ${courseName || 'EdTech Program'}</p>
        <p style="margin:0;color:#475569;"><strong>Amount:</strong> $${(amount || 0).toFixed(2)} USD</p>
      </div>

      <p style="color:#475569;line-height:1.6;margin:24px 0;">If you have any questions, our support team is here to help. Reach out anytime at <a href="mailto:support@skyreviews.us" style="color:#2563eb;">support@skyreviews.us</a>.</p>
      
      <p style="color:#475569;line-height:1.6;margin:0;">Best regards,<br><strong>Sky States Support Team</strong></p>
    </div>
    <p style="text-align:center;color:#94a3b8;font-size:12px;margin:24px 0 0;">© Sky States – EdTech Courses for the US Market</p>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER || '"Sky States" <noreply@skyreviews.us>',
      to,
      subject,
      html
    });
    console.log('[Email] Order confirmation sent to:', to);
    return { sent: true };
  } catch (err) {
    console.error('[Email] Failed to send:', err.message);
    return { sent: false, error: err.message };
  }
}

module.exports = { sendOrderConfirmationEmail };
