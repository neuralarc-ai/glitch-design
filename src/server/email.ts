import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: import.meta.env.VITE_EMAIL_USER,
    pass: import.meta.env.VITE_EMAIL_PASSWORD,
  },
});

export const sendDiscoveryCallEmail = async (formData: {
  name: string;
  email: string;
  details: string;
}) => {
  const { name, email, details } = formData;

  const mailOptions = {
    from: import.meta.env.VITE_EMAIL_USER,
    to: 'pd@ampvc.co',
    subject: `New Discovery Call Request from ${name}`,
    html: `
      <h2>New Discovery Call Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Project Details:</strong></p>
      <p>${details}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}; 