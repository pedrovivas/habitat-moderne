import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmailToOwner = async ({ fullName, email, phone, contactMethod, message, apartmentId }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${fullName}" <${email || process.env.EMAIL_USER}>`,
    to: process.env.OWNER_EMAIL,
    subject: `Nouvelle demande pour l'appartement ${apartmentId}`,
    html: `
    <div style="font-family: 'Inter', sans-serif; background-color: #f8fafc; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; padding: 30px; border: 1px solid #e2e8f0;">
        <h2 style="color: #1e293b; font-size: 24px; font-weight: bold; margin-bottom: 20px;">
          Nouveau message d'un locataire intéressé
        </h2>
        <p style="color: #475569; font-size: 16px; margin-bottom: 10px;">
          <strong>Nom :</strong> ${fullName}
        </p>
        <p style="color: #475569; font-size: 16px; margin-bottom: 10px;">
          <strong>Méthode de contact :</strong> ${contactMethod}
        </p>
        <p style="color: #475569; font-size: 16px; margin-bottom: 10px;">
          <strong>Email :</strong> ${email || "N/A"}
        </p>
        <p style="color: #475569; font-size: 16px; margin-bottom: 10px;">
          <strong>Téléphone :</strong> ${phone || "N/A"}
        </p>
        <p style="color: #64748b; font-size: 14px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
          Vous recevez ce message depuis votre application Habitat Moderne.
        </p>
      </div>
    </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendLoginCode = async ({ email, code }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Habitat Moderne" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Votre code de connexion",
    html: `
      <div style="font-family: 'Inter', sans-serif; background-color: #f8fafc; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; padding: 30px; border: 1px solid #e2e8f0;">
          <h2 style="color: #1e293b; font-size: 24px; font-weight: bold; margin-bottom: 20px;">
            Code de connexion
          </h2>
          <p style="color: #475569; font-size: 16px;">
            Bonjour,<br/>
            Votre code de connexion est : <strong>${code}</strong>
          </p>
          <p style="color: #64748b; font-size: 14px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
            Ce code est valable 5 minutes.
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};