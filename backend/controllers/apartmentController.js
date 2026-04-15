import {
  createApartment,
  getAllApartments,
  getApartmentById,
  updateApartmentById,
  deleteApartmentById,
} from "../services/apartmentService.js";

export const addApartment = async (req, res) => {
  try {
    
    req.body.visible = req.body.visible === "1" || req.body.visible === 1 || req.body.visible === true || req.body.visible === "true" ? 1 : 0;

    const images = req.files ? req.files.map((f) => f.filename) : [];

    const id = await createApartment(req.body, images);

    res.json({ id, message: "Appartement ajouté avec succès !" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const fetchApartments = async (req, res) => {
  try {
    const apartments = await getAllApartments();
    res.json(apartments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const fetchApartmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const apartment = await getApartmentById(id);
    if (!apartment)
      return res.status(404).json({ message: "Appartement introuvable" });
    res.json(apartment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const deleteApartment = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteApartmentById(id);
    res.json({ message: "Appartement supprimé avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const updateApartment = async (req, res) => {
  const { id } = req.params;

  try {
    const body = req.body || {};

    const existingImages = body.existingImages
      ? JSON.parse(body.existingImages)
      : [];

    const newImages = req.files ? req.files.map((f) => f.filename) : [];

    const images = [...existingImages, ...newImages];

    const updatedData = {
      title_fr: body.title_fr,
      title_en: body.title_en,
      address: body.address,
      unit: body.unit,
      postalCode: body.postalCode,
      price: body.price,
      bedrooms: body.bedrooms,
      bathrooms: body.bathrooms,
      sqft: body.sqft,
      neighborhood: body.neighborhood,
      description_fr: body.description_fr,
      description_en: body.description_en,
      tags: body.tags ? JSON.parse(body.tags) : [],
      customTags: body.customTags ? JSON.parse(body.customTags) : [],
      images: images,
      visible: body.visible === "true" || body.visible === true ? 1 : 0,
      availability_fr: body.availability_fr,
      availability_en: body.availability_en,
    };

    await updateApartmentById(id, updatedData);

    res.json({ message: "Appartement modifié avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};