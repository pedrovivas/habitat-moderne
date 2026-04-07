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
    tags: [], // Now stores stable IDs like ["heated", "garage"]
    visible: "",
    availability: "",
  });

  const [images, setImages] = useState([]);
  const [manualTagsInput, setManualTagsInput] = useState("");

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

  const handleManualTags = (e) => {
    const value = e.target.value;

    if (value.endsWith(",")) {
      const newTag = value.slice(0, -1).trim();

      if (newTag !== "") {
        setForm((prev) => ({
          ...prev,
          tags: [...new Set([...prev.tags, newTag])],
        }));
      }

      setManualTagsInput("");
    } else {
      setManualTagsInput(value);
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
        // This will send the array of IDs (and manual strings) to your backend
        formData.append("tags", JSON.stringify(form.tags));
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

      setImages([]);
      setManualTagsInput("");
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["title", "Titre"],
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

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full p-3 border rounded-lg"
        />

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
          <label className="block mb-1 font-semibold text-gray-700">
            Disponibilité
          </label>

          <input
            type="text"
            name="availability"
            placeholder="Ex: Disponible maintenant, 1 Juillet, 1 Août..."
            value={form.availability}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
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

          <label className="block mb-1 font-semibold">Tags personnalisés</label>

          <input
            type="text"
            value={manualTagsInput}
            onChange={handleManualTags}
            placeholder="Ex: Vue mer, Rénové"
            className="w-full p-3 border rounded-lg"
          />

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

            {manualTagsInput && (
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm opacity-70">
                {manualTagsInput}
              </span>
            )}
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
