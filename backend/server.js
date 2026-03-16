import express from "express";
import cors from "cors";
import apartmentsRoutes from "./routes/apartments.js";
import emailRoutes from "./routes/email.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use(express.urlencoded({ extended: true }));

app.use("/api/apartments", apartmentsRoutes);
app.use("/api/email", emailRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(5000, () =>
  console.log("Backend lancé sur http://localhost:5000")
);