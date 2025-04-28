const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  debug: true,
  logger: true
});

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      console.log('Missing required fields:', { name, email, message });
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    const mailOptions = {
      from: `"GlitchDesign" <${process.env.EMAIL_USER}>`,
      to: 'pd@ampvc.co',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                line-height: 1.6;
                color: #1a1a1a;
                margin: 0;
                padding: 0;
                background-color: #ffffff;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 40px 20px;
              }
              .header {
                text-align: center;
                margin-bottom: 40px;
              }
              .logo {
                font-size: 24px;
                font-weight: 600;
                color: #1a1a1a;
                text-decoration: none;
                letter-spacing: -0.5px;
              }
              .content {
                background: #ffffff;
              }
              .info-box {
                margin: 30px 0;
              }
              .info-item {
                margin-bottom: 15px;
                display: flex;
                align-items: baseline;
              }
              .label {
                font-weight: 500;
                color: #666;
                min-width: 80px;
                font-size: 14px;
              }
              .value {
                color: #1a1a1a;
                font-size: 15px;
              }
              .message {
                margin-top: 40px;
                padding-top: 30px;
                border-top: 1px solid #eee;
              }
              .message-title {
                font-size: 16px;
                font-weight: 500;
                color: #666;
                margin-bottom: 15px;
              }
              .message-content {
                color: #1a1a1a;
                font-size: 15px;
                line-height: 1.8;
                white-space: pre-wrap;
              }
              .footer {
                margin-top: 40px;
                text-align: center;
                font-size: 12px;
                color: #999;
              }
              .reply-link {
                display: inline-block;
                margin-top: 30px;
                color: #1a1a1a;
                text-decoration: none;
                font-size: 14px;
                border-bottom: 1px solid #1a1a1a;
                padding-bottom: 2px;
              }
              @media only screen and (max-width: 600px) {
                .container {
                  padding: 30px 15px;
                }
                .info-item {
                  flex-direction: column;
                }
                .label {
                  margin-bottom: 5px;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <a href="https://glitchdesign.co" class="logo">GlitchDesign</a>
              </div>
              <div class="content">
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
                  <div class="message-content">
                    ${message}
                  </div>
                </div>
                <div style="text-align: center;">
                  <a href="mailto:${email}" class="reply-link">Reply to ${name}</a>
                </div>
                <div class="footer">
                  <p>This email was sent from the GlitchDesign contact form</p>
                  <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} GlitchDesign</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    console.log('Attempting to send contact email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    const info = await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully:', {
      messageId: info.messageId,
      response: info.response
    });
    
    res.json({ 
      success: true,
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Error sending contact email:', error);
    console.error('Error details:', {
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
      stack: error.stack
    });
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email',
      details: error.message,
      code: error.code
    });
  }
} 