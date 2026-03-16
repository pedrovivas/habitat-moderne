import bcrypt from "bcrypt";
import { db } from "./db/connection.js";

const createAdmin = async () => {

  const email = "admin@habitat-moderne.com";
  const password = "2026@HABITATmoderne";

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.execute(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashedPassword]
  );

  console.log("Admin créé !");
  process.exit();
};

createAdmin();