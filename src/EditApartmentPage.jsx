import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchApartments from "../services/apartmentService";
import toast from "react-hot-toast";

export default function EditApartmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    address: "",
    unit: "",
    postalCode: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    neighborhood: "",
    description: "",
    tags: [],
    visible: "",
    availability: "",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const cachedApartments = queryClient.getQueryData(["apartments"]);
  const { data: fetchedApartments } = useQuery({
    queryKey: ["apartments"],
    queryFn: fetchApartments,
    enabled: !cachedApartments,
  });

  const apartments = cachedApartments || fetchedApartments || [];
  const apartment = apartments.find((apt) => Number(apt.id) === Number(id));

  useEffect(() => {
    if (!apartment) return;

    const tagsArray = apartment.tags
      ? (() => {
          try {
            const firstParse = JSON.parse(apartment.tags);
            return Array.isArray(firstParse)
              ? firstParse
              : JSON.parse(firstParse);
          } catch (err) {
            console.error("Erreur parsing tags:", err, apartment.tags);
            return [];
          }
        })()
      : [];

    setFormData({
      title: apartment.title,
      address: apartment.address,
      unit: apartment.unit,
      postalCode: apartment.postal_code,
      price: apartment.price,
      bedrooms: apartment.bedrooms,
      bathrooms: apartment.bathrooms,
      sqft: apartment.sqft,
      neighborhood: apartment.neighborhood,
      description: apartment.description,
      tags: tagsArray,
      visible: apartment.visible,
      availability: apartment.availability,
    });

    const imagesArray = apartment.images
      ? (() => {
          try {
            const firstParse = JSON.parse(apartment.images);
            return Array.isArray(firstParse)
              ? firstParse
              : JSON.parse(firstParse);
          } catch (err) {
            console.error("Erreur parsing images:", err, apartment.images);
            return [];
          }
        })()
      : [];

    setExistingImages(imagesArray);
  }, [apartment]);

  if (!apartment) return <p>Appartement introuvable</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      tags: e.target.value.split(",").map((t) => t.trim()),
    }));
  };

  const handleNewImages = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  const handleRemoveExistingImage = (imgName) => {
    setExistingImages(existingImages.filter((img) => img !== imgName));
  }; // Gérer le drop d'images
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  // Autoriser le drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();

      for (const key in formData) {
        if (key === "tags") payload.append(key, JSON.stringify(formData[key]));
        else payload.append(key, formData[key]);
      }

      payload.append("existingImages", JSON.stringify(existingImages));

      newImages.forEach((file) => payload.append("images", file));

      const res = await fetch(`http://localhost:5000/api/apartments/${id}`, {
        method: "PUT",
        body: payload,
      });

      if (!res.ok) throw new Error("Erreur lors de la modification");
      toast.success("Appartement modifié avec succès 🎉");

      queryClient.invalidateQueries(["apartments"]);
      navigate(`/appartements/${id}`);
    } catch (err) {
      console.error(err);
      toast.success("Appartement modifié avec succès 🎉");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Modifier l'appartement</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Titre</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Adresse</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Appartement / Unité</label>
          <input
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Code postal</label>
          <input
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Prix ($/mois)</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">Chambres</label>
            <input
              name="bedrooms"
              type="number"
              value={formData.bedrooms}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Bains</label>
            <input
              name="bathrooms"
              type="number"
              value={formData.bathrooms}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Surface (pi²)</label>
            <input
              name="sqft"
              type="number"
              value={formData.sqft}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">Quartier</label>
          <input
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">
            Tags (séparés par une virgule)
          </label>
          <input
            value={formData.tags.join(", ")}
            onChange={handleTagsChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Disponibilité
          </label>

          <input
            type="text"
            name="availability"
            placeholder="Ex: Disponible maintenant, 1 Juillet..."
            value={formData.availability}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div className="flex items-center gap-3 mt-2">
          <input
            type="checkbox"
            id="visible"
            checked={formData.visible}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, visible: e.target.checked }))
            }
            className="w-5 h-5 accent-green-500"
          />

          <label htmlFor="visible" className="text-gray-700 font-medium">
            Visible sur le site
          </label>
        </div>

        <div>
          <label className="block font-medium mb-1">Images existantes</label>

          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
            onClick={() => document.getElementById("imageInput").click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            Cliquez ici ou glissez vos images
          </div>

          <input
            type="file"
            id="imageInput"
            multiple
            className="hidden"
            onChange={handleNewImages}
          />

          <div className="flex flex-wrap gap-2 mt-4">
            {/* Images existantes */}
            {existingImages.map((img, idx) => (
              <div key={`existing-${idx}`} className="relative">
                <img
                  src={`http://localhost:5000/uploads/${img}`}
                  alt="existing"
                  className="w-24 h-24 object-cover rounded shadow"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveExistingImage(img)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}

            {/* Nouvelles images ajoutées */}
            {newImages.map((file, i) => (
              <div key={`new-${i}`} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded shadow"
                />
                <button
                  type="button"
                  onClick={() =>
                    setNewImages((prev) =>
                      prev.filter((_, index) => index !== i),
                    )
                  }
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded font-bold mt-4"
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}
