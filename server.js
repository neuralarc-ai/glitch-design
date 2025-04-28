import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: `${__dirname}/.env` });

// Validate required environment variables
const requiredEnvVars = ["EMAIL_USER", "EMAIL_PASSWORD"];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(
    "Missing required environment variables:",
    missingEnvVars.join(", ")
  );
  process.exit(1);
}

console.log("Environment variables loaded successfully");
console.log("Email user:", process.env.EMAIL_USER);

const app = express();

// Configure CORS for all origins with additional security options
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST'], // Only allow GET and POST requests
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // Cache preflight requests for 24 hours
}));

// Additional security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

app.use(express.json());

// Configure nodemailer with secure settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  debug: true,
  logger: true,
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error with email configuration:", error);
    console.error("Error details:", {
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
    });
  } else {
    console.log("Email server is ready to send messages");
  }
});

app.post("/api/discovery-call", async (req, res) => {
  console.log("Received discovery call request:", req.body);

  try {
    const { name, email, details } = req.body;

    if (!name || !email || !details) {
      console.log("Missing required fields:", { name, email, details });
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    const mailOptions = {
      from: `"GlitchDesign" <${process.env.EMAIL_USER}>`,
      to: "pd@ampvc.co",
      replyTo: email,
      subject: `New Discovery Call Request from ${name}`,
      html: `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Discovery Call Request</title>
    <style>
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        background: #f9fafb;
        color: #111827;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 540px;
        margin: 0 auto;
        padding: 32px 24px;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      }
      .header {
        text-align: center;
        margin-bottom: 32px;
      }
      .logo {
        font-size: 20px;
        font-weight: 600;
        color: #111827;
        text-decoration: none;
      }
      .info-box {
        margin-bottom: 24px;
      }
      .info-item {
        margin-bottom: 16px;
      }
      .label {
        display: block;
        font-size: 12px;
        color: #6b7280;
        margin-bottom: 4px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .value {
        font-size: 15px;
        font-weight: 500;
      }
      .details {
        padding-top: 24px;
        border-top: 1px solid #e5e7eb;
      }
      .details-title {
        font-size: 14px;
        font-weight: 600;
        color: #6b7280;
        margin-bottom: 12px;
      }
      .details-content {
        font-size: 15px;
        line-height: 1.7;
        white-space: pre-wrap;
      }
      .reply-link {
        display: inline-block;
        margin-top: 28px;
        font-size: 14px;
        color: #3b82f6;
        text-decoration: none;
        border-bottom: 1px solid #3b82f6;
        padding-bottom: 2px;
      }
      .footer {
        margin-top: 40px;
        text-align: center;
        font-size: 12px;
        color: #9ca3af;
      }
      @media (max-width: 600px) {
        .container {
          padding: 24px 16px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <a href="https://glitchdesign.co" class="logo">GlitchDesign</a>
      </div>
      <div class="info-box">
        <div class="info-item">
          <span class="label">Name</span>
          <span class="value">${name}</span>
        </div>
        <div class="info-item">
          <span class="label">Email</span>
          <span class="value">${email}</span>
        </div>
      </div>
      <div class="details">
        <div class="details-title">Project Details</div>
        <div class="details-content">${details}</div>
      </div>
      <div style="text-align: center;">
        <a href="mailto:${email}" class="reply-link">Reply to ${name}</a>
      </div>
      <div class="footer">
        <p>This email was sent from the GlitchDesign discovery call form</p>
        <p style="margin-top: 5px;">© ${new Date().getFullYear()} GlitchDesign</p>
      </div>
    </div>
  </body>
</html>

      `,
    };

    console.log("Attempting to send email with options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    // Add event listeners for the email sending process
    transporter.on("log", console.log);
    transporter.on("error", console.error);

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", {
      messageId: info.messageId,
      response: info.response,
    });

    res.json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    console.error("Error details:", {
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Failed to send email",
      details: error.message,
      code: error.code,
    });
  }
});

app.post("/api/contact", async (req, res) => {
  console.log("Received contact request:", req.body);

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      console.log("Missing required fields:", { name, email, message });
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    const mailOptions = {
      from: `"GlitchDesign" <${process.env.EMAIL_USER}>`,
      to: "pd@ampvc.co",
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Contact Form Submission</title>
    <style>
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        background: #f9fafb;
        color: #111827;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 540px;
        margin: 0 auto;
        padding: 32px 24px;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      }
      .header {
        text-align: center;
        margin-bottom: 32px;
      }
      .logo {
        font-size: 20px;
        font-weight: 600;
        color: #111827;
        text-decoration: none;
      }
      .info-box {
        margin-bottom: 24px;
      }
      .info-item {
        margin-bottom: 16px;
      }
      .label {
        display: block;
        font-size: 12px;
        color: #6b7280;
        margin-bottom: 4px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .value {
        font-size: 15px;
        font-weight: 500;
      }
      .message {
        padding-top: 24px;
        border-top: 1px solid #e5e7eb;
      }
      .message-title {
        font-size: 14px;
        font-weight: 600;
        color: #6b7280;
        margin-bottom: 12px;
      }
      .message-content {
        font-size: 15px;
        line-height: 1.7;
        white-space: pre-wrap;
      }
      .reply-link {
        display: inline-block;
        margin-top: 28px;
        font-size: 14px;
        color: #3b82f6;
        text-decoration: none;
        border-bottom: 1px solid #3b82f6;
        padding-bottom: 2px;
      }
      .footer {
        margin-top: 40px;
        text-align: center;
        font-size: 12px;
        color: #9ca3af;
      }
      @media (max-width: 600px) {
        .container {
          padding: 24px 16px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <a href="https://glitchdesign.co" class="logo">GlitchDesign</a>
      </div>
      <div class="info-box">
        <div class="info-item">
          <span class="label">Name</span>
          <span class="value">${name}</span>
        </div>
        <div class="info-item">
          <span class="label">Email</span>
          <span class="value">${email}</span>
        </div>
      </div>
      <div class="message">
        <div class="message-title">Message</div>
        <div class="message-content">${message}</div>
      </div>
      <div style="text-align: center;">
        <a href="mailto:${email}" class="reply-link">Reply to ${name}</a>
      </div>
      <div class="footer">
        <p>This email was sent from the GlitchDesign contact form</p>
        <p style="margin-top: 5px;">© ${new Date().getFullYear()} GlitchDesign</p>
      </div>
    </div>
  </body>
</html>

      `,
    };

    console.log("Attempting to send contact email with options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    const info = await transporter.sendMail(mailOptions);
    console.log("Contact email sent successfully:", {
      messageId: info.messageId,
      response: info.response,
    });

    res.json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Error sending contact email:", error);
    console.error("Error details:", {
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Failed to send email",
      details: error.message,
      code: error.code,
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
