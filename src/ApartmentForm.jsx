import { useState } from "react";
import { useTranslation } from "react-i18next";
import { addApartment } from "../services/apartmentService.js";

export default function ApartmentForm({ onAdded }) {
  const { t } = useTranslation();

  const [toast, setToast] = useState({
    message: "",
    type: "",
    visible: false,
  });

  const showToast = (message, type = "success") => {
    setToast({ message, type, visible: true });

    setTimeout(() => {
      setToast({ message: "", type: "", visible: false });
    }, 3000);
  };

  const predefinedTags = t("apartmentForm.predefinedTags", {
    returnObjects: true,
  });

  const [form, setForm] = useState({
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

  const [images, setImages] = useState([]);
  const [manualTagInput, setManualTagInput] = useState({ fr: "", en: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePredefinedTags = (e) => {
    const selectedId = e.target.value;

    setForm((prev) => {
      if (prev.tags.includes(selectedId)) {
        return {
          ...prev,
          tags: prev.tags.filter((tag) => tag !== selectedId),
        };
      } else {
        return {
          ...prev,
          tags: [...prev.tags, selectedId],
        };
      }
    });
  };

  const handleManualTagInputChange = (e) => {
    const { name, value } = e.target;
    setManualTagInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCustomTag = () => {
    const frTrimmed = manualTagInput.fr.trim();
    const enTrimmed = manualTagInput.en.trim();

    if (!frTrimmed && !enTrimmed) return;

    setForm((prev) => ({
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

  const handleFiles = (files) =>
    setImages((prev) => [...prev, ...Array.from(files)]);

  const handleImageSelect = (e) => handleFiles(e.target.files);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeImage = (index) =>
    setImages((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in form) {
      if (key === "tags") {
        formData.append("tags", JSON.stringify(form.tags));
      } else if (key === "customTags") {
        formData.append("customTags", JSON.stringify(form.customTags));
      } else {
        formData.append(key, form[key]);
      }
    }

    images.forEach((img) => formData.append("images", img));

    try {
      await addApartment(formData);
      onAdded?.();
      showToast("Appartement ajouté avec succès 🎉", "success");

      setForm({
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

      setImages([]);
      setManualTagInput({ fr: "", en: "" });
    } catch (err) {
      console.error("Erreur ajout appartement:", err);
      showToast("Erreur lors de l'ajout ❌", "error");
    }
  };

  return (
    <>
      {toast.visible && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg text-white font-semibold transition-all duration-300 ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-700 text-center">
          Ajouter un Appartement
        </h2>

        {/* Titre bilingue */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Titre</label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-xs text-gray-500 mb-1 block">🇫🇷 Français</span>
              <input
                type="text"
                name="title_fr"
                placeholder="Titre en français"
                value={form.title_fr}
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500 mb-1 block">🇬🇧 English</span>
              <input
                type="text"
                name="title_en"
                placeholder="Title in English"
                value={form.title_en}
                onChange={handleChange}
                className="p-3 border rounded-lg w-full"
              />
            </div>
          </div>
        </div>

        {/* Autres champs non bilingues */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["address", "Adresse"],
            ["unit", "Unité"],
            ["postalCode", "Code Postal"],
            ["sqft", "Surface (sqft)", "number"],
            ["price", "Prix", "number"],
            ["bedrooms", "Chambres", "number"],
            ["bathrooms", "Salles de bain", "number"],
            ["neighborhood", "Quartier"],
          ].map(([name, placeholder, type = "text"]) => (
            <input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              value={form[name]}
              onChange={handleChange}
              className="p-3 border rounded-lg"
            />
          ))}
        </div>

        {/* Description bilingue */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Description</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <span className="text-xs text-gray-500 mb-1 block">🇫🇷 Français</span>
              <textarea
                name="description_fr"
                placeholder="Description en français"
                value={form.description_fr}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500 mb-1 block">🇬🇧 English</span>
              <textarea
                name="description_en"
                placeholder="Description in English"
                value={form.description_en}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Disponibilité bilingue */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Disponibilité</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <span className="text-xs text-gray-500 mb-1 block">🇫🇷 Français</span>
              <input
                type="text"
                name="availability_fr"
                placeholder="Ex: Disponible maintenant, 1 Juillet..."
                value={form.availability_fr}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <span className="text-xs text-gray-500 mb-1 block">🇬🇧 English</span>
              <input
                type="text"
                name="availability_en"
                placeholder="Ex: Available now, July 1st..."
                value={form.availability_en}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <input
            type="checkbox"
            id="visible"
            checked={form.visible}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, visible: e.target.checked }))
            }
            className="w-5 h-5 accent-green-500"
          />
          <label htmlFor="visible" className="text-gray-700 font-medium">
            Visible sur le site
          </label>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Images</label>

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
            onChange={handleImageSelect}
          />

          <div className="flex flex-wrap gap-2 mt-4">
            {images.map((file, i) => (
              <div key={i} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded shadow"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tags prédéfinis */}
        <div>
          <label className="block mb-2 font-semibold">
            Caractéristiques (sélection rapide)
          </label>

          <select
            multiple
            onChange={handlePredefinedTags}
            className="w-full p-3 border rounded-lg h-32 mb-4"
          >
            {Array.isArray(predefinedTags) &&
              predefinedTags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.label}
                </option>
              ))}
          </select>

          {/* Tags personnalisés bilingues */}
          <label className="block mb-1 font-semibold">Tags personnalisés</label>
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div>
              <span className="text-xs text-gray-500 mb-1 block">🇫🇷 Français</span>
              <input
                type="text"
                name="fr"
                value={manualTagInput.fr}
                onChange={handleManualTagInputChange}
                onKeyDown={handleTagInputKeyDown}
                placeholder="Ex: Vue mer"
                className="w-full p-3 border rounded-lg"
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
                placeholder="Ex: Ocean view"
                className="w-full p-3 border rounded-lg"
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

          {/* Tags sélectionnés */}
          <div className="mt-3 flex flex-wrap gap-2">
            {form.tags.map((tagId) => {
              const tagData = Array.isArray(predefinedTags)
                ? predefinedTags.find((t) => t.id === tagId)
                : null;

              const displayLabel = tagData ? tagData.label : tagId;

              return (
                <span
                  key={tagId}
                  className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {displayLabel}
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
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

            {form.customTags.map((tag, i) => (
              <span
                key={`custom-${i}`}
                className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
              >
                {tag.fr}{tag.en ? ` / ${tag.en}` : ""}
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
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

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-500 transition"
        >
          Ajouter Appartement
        </button>
      </form>
    </>
  );
}
