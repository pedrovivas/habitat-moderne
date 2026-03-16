import { useParams, Link, useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Square,
} from "lucide-react";
import fetchApartments from "../services/apartmentService";
import formatAddress from "./formatAddress";
import ApartmentDetailsTags from "./ApartmentDetailsTags";
import Form from "./Form";
import MapModal from "./MapModal";

export default function ApartmentDetails() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("admin") === "true";

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const cachedApartments = queryClient.getQueryData(["apartments"]);
  const { data: fetchedApartments, isLoading, isError } = useQuery({
    queryKey: ["apartments"],
    queryFn: fetchApartments,
    enabled: !cachedApartments,
  });

  const apartments = cachedApartments || fetchedApartments || [];
  const apartment = apartments.find((apt) => Number(apt.id) === Number(id));

  const images = apartment?.images
    ? Array.isArray(apartment.images)
      ? apartment.images
      : JSON.parse(apartment.images)
    : [];

  const tags = apartment?.tags
    ? (() => {
        try {
          const firstParse = JSON.parse(apartment.tags);
          return Array.isArray(firstParse) ? firstParse : JSON.parse(firstParse);
        } catch {
          return [];
        }
      })()
    : [];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  if (isLoading) return <p>Chargement...</p>;
  if (isError || !apartment) return <p>Appartement introuvable.</p>;

  const nextImg = () =>
    setActiveImgIndex((prev) => (prev + 1) % images.length);
  const prevImg = () =>
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);

      const confirmDelete = () => {
  toast((t) => (
    <div className="flex flex-col gap-3">
      <p className="font-semibold">
        Voulez-vous vraiment supprimer cet appartement ?
      </p>

      <div className="flex gap-3 justify-end">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Annuler
        </button>

        <button
          onClick={() => {
            toast.dismiss(t.id);
            handleDelete();
          }}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Supprimer
        </button>
      </div>
    </div>
  ));
};

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/apartments/${apartment.id}`, {
        method: "DELETE",
      });
      queryClient.invalidateQueries(["apartments"]);
      toast.success("Appartement supprimé avec succès 🗑️");
      navigate("/appartements");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la suppression ❌");
    }
  };

  const handleEdit = () => {
    navigate(`/modifier-appartement/${apartment.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      <main className="max-w-7xl mx-auto px-6 pt-8">
        <Link
          to="/appartements"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-secondary transition font-medium mb-4"
        >
          <ArrowLeft className="w-5 h-5" /> Retour à la liste
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <div className="relative rounded-3xl overflow-hidden h-[500px] group bg-slate-200 shadow-inner">
                <img
                  src={
                    images[activeImgIndex]
                      ? `http://localhost:5000/uploads/${images[activeImgIndex]}`
                      : "/placeholder.jpg"
                  }
                  alt={apartment.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImg();
                      }}
                      className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition hover:bg-white hover:text-secondary"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImg();
                      }}
                      className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition hover:bg-white hover:text-secondary"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative flex-shrink-0 w-28 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImgIndex === idx
                        ? "border-primary scale-95 shadow-md"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={`http://localhost:5000/uploads/${img}`}
                      className="w-full h-full object-cover"
                      alt={`Miniature ${idx + 1}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-100 text-green-800">
                    {/* Disponible maintenant */}
                    Disponible<i> </i>
                    {apartment.availability || " maintenant"}
                  </span>
                  <h1 className="text-4xl font-extrabold text-slate-900">{apartment.title}</h1>
                </div>

                {isAdmin && (
                  <div className="flex gap-3">
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-2 bg-primary hover:bg-secondary text-slate-900 font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L12 14l-4 1 1-4 7.5-7.5z"
                        />
                      </svg>
                      Modifier
                    </button>

                    <button
                      onClick={confirmDelete}
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"
                        />
                      </svg>
                      Supprimer
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 py-6 border-y border-slate-200">
                <div className="flex flex-col items-center text-slate-500 text-center gap-1">
                  <Bed className="w-6 h-6" />
                  <p className="font-bold text-lg">{apartment.bedrooms} Chambres</p>
                </div>
                <div className="flex flex-col items-center text-slate-500 text-center gap-1 border-x border-slate-100">
                  <Bath className="w-6 h-6" />
                  <p className="font-bold text-lg">{apartment.bathrooms} Bains</p>
                </div>
                <div className="flex flex-col items-center text-slate-500 text-center gap-1">
                  <Square className="w-6 h-6" />
                  <p className="font-bold text-lg">{apartment.sqft} pi²</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">À propos de ce logement</h2>
                <p className="text-slate-600 leading-relaxed text-lg">{apartment.description}</p>
              </div>

              {tags.length > 0 && <ApartmentDetailsTags tags={tags} />}
            </div>
          </div>

          <Form address={formatAddress(apartment, false)} />
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