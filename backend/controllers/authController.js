import bcrypt from "bcrypt";
import { db } from "../db/connection.js";
import { sendLoginCode } from "../services/emailService.js";

const codes = {};

export const loginRequest = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.execute(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (!users.length) {
      return res.status(401).json({
        success: false,
        message: "Identifiants incorrects",
      });
    }

    const user = users[0];

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        message: "Identifiants incorrects",
      });
    }

    const code = Math.floor(100000 + Math.random() * 900000);

    const expiresAt = Date.now() + 1 * 60 * 1000;

    codes[email] = {
      code,
      expiresAt,
    };

    await sendLoginCode({ email, code });

    return res.json({
      success: true,
      message: "Code envoyé par email",
    });

  } catch (err) {

    console.error("LOGIN ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });

  }
};


export const verifyCode = (req, res) => {

  const { email, code } = req.body;

  if (!codes[email]) {
    return res.status(400).json({
      success: false,
      message: "Pas de code demandé",
    });
  }

  const { code: correctCode, expiresAt } = codes[email];

  if (Date.now() > expiresAt) {

    delete codes[email];

    return res.status(400).json({
      success: false,
      message: "Code expiré",
    });
  }

  if (Number(code) === correctCode) {

    delete codes[email];

    return res.json({
      success: true,
      message: "Connexion réussie",
    });

  }

  return res.status(400).json({
    success: false,
    message: "Code incorrect",
  });
};