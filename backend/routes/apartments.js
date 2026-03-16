import express from "express";
import multer from "multer";
import { addApartment, fetchApartments, updateApartment,
  deleteApartment } from "../controllers/apartmentController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/", upload.array("images"), addApartment);
router.get("/", fetchApartments);

router.delete("/:id", deleteApartment);

router.put("/:id", upload.array("images"), updateApartment);

export default router;