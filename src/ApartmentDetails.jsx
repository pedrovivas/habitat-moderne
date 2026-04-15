import { useParams, Link, useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Edit,
  Trash2,
} from "lucide-react";

import fetchApartments from "../services/apartmentService";
import formatAddress from "./formatAddress";
import ApartmentDetailsTags from "./ApartmentDetailsTags";
import Form from "./Form";
import MapModal from "./MapModal";
import ImageGallery from "./ImageGallery"; // Modular Gallery

export default function ApartmentDetails() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "fr";

  // Security & Admin check
  const isAdmin = localStorage.getItem("admin") === "true";

  // Data Fetching with Cache Priority
  const cachedData = queryClient.getQueryData(["apartments"]);
  const {
    data: fetchedData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["apartments"],
    queryFn: fetchApartments,
    enabled: !cachedData,
  });

  const apartments = cachedData || fetchedData || [];
  const apartment = apartments.find((apt) => Number(apt.id) === Number(id));

  // --- DATA CLEANING: The "Deep Parse" for Tags ---
  const tags = (() => {
    try {
      let data = apartment?.tags;
      // Keep parsing as long as it's a string (handles double-stringified data)
      while (typeof data === "string") {
        data = JSON.parse(data);
      }
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.error("Tag Parsing Error:", e);
      return [];
    }
  })();

  const predefinedTagsList = t("apartmentForm.predefinedTags", {
    returnObjects: true,
  });

  // Tags prédéfinis : uniquement ceux qui ont un match réel
  const translatedTags = tags
    .map((tagId) => {
      const foundTag = Array.isArray(predefinedTagsList)
        ? predefinedTagsList.find((pt) => pt.id === tagId)
        : null;
      return foundTag ? foundTag.label : null;
    })
    .filter(Boolean);

  // Tags personnalisés bilingues (nouveau format) ou anciens strings (fallback)
  const customTagsLabels = (() => {
    try {
      let data = apartment?.custom_tags;
      while (typeof data === "string") {
        data = JSON.parse(data);
      }
      if (Array.isArray(data) && data.length > 0) {
        const lang = i18n.language?.startsWith("en") ? "en" : "fr";
        return data
          .map((tag) => {
            if (typeof tag !== "object" || tag === null) return String(tag);
            return lang === "en" ? (tag.en || "") : (tag.fr || "");
          })
          .filter(Boolean);
      }
      // Fallback : ancien format (strings brutes dans tags non prédéfinis)
      return tags.filter(
        (tagId) =>
          typeof tagId === "string" &&
          !(Array.isArray(predefinedTagsList) && predefinedTagsList.find((pt) => pt.id === tagId))
      );
    } catch (e) {
      return [];
    }
  })();

  const allTags = [...translatedTags, ...customTagsLabels];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  // --- ADMIN ACTIONS ---
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/apartments/${apartment.id}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) throw new Error();

      queryClient.invalidateQueries(["apartments"]);
      toast.success("Appartement supprimé avec succès 🗑️");
      navigate("/appartements");
    } catch (err) {
      toast.error("Erreur lors de la suppression ❌");
    }
  };

  const confirmDelete = () => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-slate-800">
          Supprimer cet appartement ?
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 bg-slate-100 rounded-md text-sm"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete();
            }}
            className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
          >
            Confirmer
          </button>
        </div>
      </div>
    ));
  };

  // --- RENDER LOGIC ---
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <title>Chargement l'appartement... | Habitat Moderne inc.</title>
        <div className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium">
          Chargement de l'appartement...
        </p>
      </div>
    );
  }

  if (isError || !apartment) {
    return (
      <>
        <title>Appartement introuvable | Habitat Moderne inc.</title>
        <div className="p-20 text-center">Appartement introuvable.</div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {(() => {
        const title = (lang === "en" ? apartment.title_en : apartment.title_fr) || apartment.title || "";
        const description = (lang === "en" ? apartment.description_en : apartment.description_fr) || apartment.description || "";
        return (
          <>
            <title>{`${title} | Habitat Moderne Inc.`}</title>
            <meta
              name="description"
              content={`${description.slice(0, 120)} — Habitat Moderne inc.`}
            />
          </>
        );
      })()}
      <main className="max-w-7xl mx-auto px-6 pt-8">
        {/* Navigation Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/appartements"
            className="inline-flex items-center gap-2 text-slate-600 hover:opacity-80 transition font-medium group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />{" "}
            {t("apartmentDetails.backToListing")}
          </Link>

          {isAdmin && (
            <div className="flex gap-3">
              <button
                onClick={() =>
                  navigate(`/modifier-appartement/${apartment.id}`)
                }
                className="flex items-center gap-2 bg-white border border-slate-200 hover:border-primary px-4 py-2 rounded-xl shadow-sm transition"
              >
                <Edit className="w-4 h-4" /> Modifier
              </button>
              <button
                onClick={confirmDelete}
                className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-xl shadow-sm transition"
              >
                <Trash2 className="w-4 h-4" /> Supprimer
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery Component */}
            <ImageGallery apartment={apartment} />

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-black text-slate-900 leading-tight">
                    {(lang === "en" ? apartment.title_en : apartment.title_fr) || apartment.title}
                  </h1>
                  <button
                    onClick={() => setIsMapOpen(true)}
                    className="group text-left text-slate-600 text-xl cursor-pointer hover:opacity-80 transition"
                  >
                    <MapPin className="w-5 h-5 text-[#EA4335] inline mr-2 mb-1 group-hover:scale-110 transition" />
                    <span>{formatAddress(apartment)}</span>
                  </button>
                </div>
                <div className="text-4xl font-black">
                  {Math.floor(apartment.price)} $
                  <span className="text-sm text-slate-400 font-normal uppercase tracking-widest">
                    {" "}
                    / {t("apartmentDetails.month")}
                  </span>
                </div>
              </div>

              {/* Specs */}
              <div className="flex justify-around py-6 border-y border-slate-200">
                <div className="flex flex-col items-center text-slate-500 text-center gap-1">
                  <Bed className="w-6 h-6" />
                  <p className="font-bold text-lg">
                    {apartment.bedrooms} {t("apartmentDetails.rooms")}
                  </p>
                </div>
                <div className="flex flex-col items-center text-slate-500 text-center gap-1 border-x border-slate-100">
                  <Bath className="w-6 h-6" />
                  <p className="font-bold text-lg">
                    {apartment.bathrooms} {t("apartmentDetails.bathrooms")}
                  </p>
                </div>
                {apartment.sqft > 0 && (
                  <div className="flex flex-col items-center text-slate-500 text-center gap-1">
                    <Maximize className="w-6 h-6" />
                    <p className="font-bold text-lg">
                      {apartment.sqft} {t("apartmentDetails.sqft")}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-800">
                  {t("apartmentDetails.description")}
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                  {(lang === "en" ? apartment.description_en : apartment.description_fr) || apartment.description}
                </p>
              </div>

              {allTags.length > 0 && (
                <ApartmentDetailsTags tags={allTags} />
              )}
            </div>
          </div>

          {/* Contact Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Form address={formatAddress(apartment, false)} />
            </div>
          </div>
        </div>

        <MapModal
          address={formatAddress(apartment)}
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
        />
      </main>
    </div>
  );
}
