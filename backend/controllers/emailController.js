import { sendEmailToOwner } from "../services/emailService.js";

export const contactOwner = async (req, res) => {
  try {

    const { fullName, email, phone, contactMethod, message, apartmentId } = req.body;

    if (!fullName || !contactMethod || (!email && contactMethod === "email") || (!phone && contactMethod === "phone")) {
      return res.status(400).json({ error: "Informations manquantes dans le formulaire." });
    }

    await sendEmailToOwner({ fullName, email, phone, contactMethod, message, apartmentId });

    res.status(200).json({ message: "Email envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur envoi email:", error);
    res.status(500).json({ error: "Impossible d'envoyer l'email." });
  }
};