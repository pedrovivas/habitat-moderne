import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import fetchApartments from "../services/apartmentService";
import toast from "react-hot-toast";

export default function EditApartmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const predefinedTags = t("apartmentForm.predefinedTags", { returnObjects: true });

  const [formData, setFormData] = useState({
    title_fr: "",
    title_en: "",
    address: "",
    unit: "",
    postalCode: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    neighborhood: "",
    description_fr: "",
    description_en: "",
    tags: [],
    customTags: [],
    visible: "",
    availability_fr: "",
    availability_en: "",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [manualTagInput, setManualTagInput] = useState({ fr: "", en: "" });

  const { data: apartments = [] } = useQuery({
    queryKey: ["apartments"],
    queryFn: fetchApartments,
  });

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

    const customTagsArray = apartment.custom_tags
      ? (() => {
        try {
          const parsed = JSON.parse(apartment.custom_tags);
          return Array.isArray(parsed) ? parsed : [];
        } catch (err) {
          console.error("Erreur parsing custom_tags:", err);
          return [];
        }
      })()
      : [];

    setFormData({
      title_fr: apartment.title_fr || apartment.title || "",
      title_en: apartment.title_en || "",
      address: apartment.address || "",
      unit: apartment.unit || "",
      postalCode: apartment.postal_code || "",
      price: apartment.price || "",
      bedrooms: apartment.bedrooms || "",
      bathrooms: apartment.bathrooms || "",
      sqft: apartment.sqft || "",
      neighborhood: apartment.neighborhood || "",
      description_fr: apartment.description_fr || apartment.description || "",
      description_en: apartment.description_en || "",
      tags: tagsArray,
      customTags: customTagsArray,
      visible: apartment.visible,
      availability_fr: apartment.availability_fr || apartment.availability || "",
      availability_en: apartment.availability_en || "",
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

  const handleManualTagInputChange = (e) => {
    const { name, value } = e.target;
    setManualTagInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCustomTag = () => {
    const frTrimmed = manualTagInput.fr.trim();
    const enTrimmed = manualTagInput.en.trim();

    if (!frTrimmed && !enTrimmed) return;

    setFormData((prev) => ({
      ...prev,
      customTags: [...prev.customTags, { fr: frTrimmed, en: enTrimmed }],
    }));

    setManualTagInput({ fr: "", en: "" });
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleNewImages = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  const handleRemoveExistingImage = (imgName) => {
    setExistingImages(existingImages.filter((img) => img !== imgName));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      for (const key in formData) {
        if (key === "tags") {
          payload.append(key, JSON.stringify(formData[key]));
        } else if (key === "customTags") {
          payload.append(key, JSON.stringify(formData[key]));
        } else {
          payload.append(key, formData[key]);
        }
      }

      payload.append("existingImages", JSON.stringify(existingImages));
      newImages.forEach((file) => payload.append("images", file));

      const res = await fetch(`http://localhost:5000/api/apartments/${id}`, {
        method: "PUT",
        body: payload,
      });

      if (!res.ok) throw new Error("Erreur lors de la modification");

      const updatedApartment = await res.json();

      queryClient.setQueryData(["apartments"], (old = []) =>
        old.map((apt) =>
          apt.id === updatedApartment.id ? updatedApartment : apt
        )
      );

      await queryClient.invalidateQueries(["apartments"]);

      toast.success("Appartement modifié avec succès 🎉");

      navigate(`/appartements/${id}`);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la modification ❌");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Modifier l'appartement</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Titre bilingue */}
        <div>
          <label className="block font-semibold mb-1">Titre</label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-xs text-gray-500 mb-1 block">🇫🇷 Français</span>
              <input
                name="title_fr"
                value={formData.title_fr}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500 mb-1 block">🇬🇧 English</span>
              <input
                name="title_en"
                value={formData.title_en}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>
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

        {/* Description bilingue */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <span className="text-xs text-gray-500 mb-1 block">🇫🇷 Français</span>
              <textarea
                name="description_fr"
                value={formData.description_fr}
                onChange={handleChange}
                rows={4}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500 mb-1 block">🇬🇧 English</span>
              <textarea
                name="description_en"
                value={formData.description_en}
                onChange={handleChange}
                rows={4}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>
        </div>

        {/* Disponibilité bilingue */}
        <div>
          <label className="block font-semibold mb-1">Disponibilité</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <span className="text-xs text-gray-500 mb-1 block">🇫🇷 Français</span>
              <input
                type="text"
                name="availability_fr"
                placeholder="Ex: Disponible maintenant, 1 Juillet..."
                value={formData.availability_fr}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500 mb-1 block">🇬🇧 English</span>
              <input
                type="text"
                name="availability_en"
                placeholder="Ex: Available now, July 1st..."
                value={formData.availability_en}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>
        </div>

        {/* Tags prédéfinis */}
        <div>
          <label className="block font-semibold mb-2">Caractéristiques (sélection rapide)</label>
          <select
            multiple
            onChange={(e) => {
              const selectedId = e.target.value;
              setFormData((prev) => ({
                ...prev,
                tags: prev.tags.includes(selectedId)
                  ? prev.tags.filter((t) => t !== selectedId)
                  : [...prev.tags, selectedId],
              }));
            }}
            className="w-full p-3 border rounded-lg h-32 mb-3"
          >
            {Array.isArray(predefinedTags) &&
              predefinedTags.map((tag) => (
                <option
                  key={tag.id}
                  value={tag.id}
                  style={{ fontWeight: formData.tags.includes(tag.id) ? "bold" : "normal" }}
                >
                  {formData.tags.includes(tag.id) ? "✓ " : ""}{tag.label}
                </option>
              ))}
          </select>
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.tags.map((tagId) => {
              const tagData = Array.isArray(predefinedTags)
                ? predefinedTags.find((t) => t.id === tagId)
                : null;
              return (
                <span
                  key={tagId}
                  className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {tagData ? tagData.label : tagId}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        tags: prev.tags.filter((t) => t !== tagId),
                      }))
                    }
                    className="text-red-500 font-bold"
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        </div>

        {/* Tags personnalisés bilingues */}
        <div>
          <label className="block font-semibold mb-1">Tags personnalisés</label>
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div>
              <span className="text-xs text-gray-500 mb-1 block">🇫🇷 Français</span>
              <input
                type="text"
                name="fr"
                value={manualTagInput.fr}
                onChange={handleManualTagInputChange}
                onKeyDown={handleTagInputKeyDown}
                placeholder="Ex: Vue sur parc"
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500 mb-1 block">🇬🇧 English</span>
              <input
                type="text"
                name="en"
                value={manualTagInput.en}
                onChange={handleManualTagInputChange}
                onKeyDown={handleTagInputKeyDown}
                placeholder="Ex: Park view"
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddCustomTag}
            className="text-sm px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
          >
            + Ajouter ce tag
          </button>

          <div className="mt-3 flex flex-wrap gap-2">
            {formData.customTags.map((tag, i) => (
              <span
                key={`custom-${i}`}
                className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
              >
                {tag.fr}{tag.en ? ` / ${tag.en}` : ""}
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      customTags: prev.customTags.filter((_, idx) => idx !== i),
                    }))
                  }
                  className="text-red-500 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
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
