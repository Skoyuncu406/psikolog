import nodemailer from "nodemailer";

export const sendContactMail = async ({ name, phone, subject, message }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Psikolog Merkezi" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    subject: `Yeni İletişim Formu: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; background:#f7f5ef; padding:24px;">
        <div style="max-width:600px; margin:auto; background:white; border-radius:18px; padding:24px;">
          <h2 style="color:#1f5f4b;">Yeni İletişim Formu Mesajı</h2>

          <p><strong>İsim Soyisim:</strong> ${name}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          <p><strong>Konu:</strong> ${subject}</p>

          <hr style="border:none; border-top:1px solid #e5e5e5; margin:20px 0;" />

          <p><strong>Mesaj:</strong></p>
          <p style="line-height:1.7; color:#333;">${message}</p>
        </div>
      </div>
    `,
  });
};
