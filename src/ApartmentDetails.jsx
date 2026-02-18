import { useParams, Link } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Square,
  CheckCircle2,
  Phone,
  Mail,
} from "lucide-react";
import fetchApartments from "./fetchApartments"; // Assuming this is your fetch function
import formatAddress from "./formatAddress";

export default function ApartmentDetails() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Try to get apartments from the cache
  const apartments = queryClient.getQueryData(["apartments"]);

  // If not found in cache, refetch the apartments
  const { data, isLoading, isError } = useQuery({
    queryKey: ["apartments"],
    queryFn: fetchApartments,
    enabled: !apartments, // only refetch if not in cache
  });

  // Use the cache if available, otherwise use the newly fetched data
  const apartment =
    apartments?.find((apt) => apt.id === Number(id)) ||
    data?.find((apt) => apt.id === Number(id));

    const [activeImgIndex, setActiveImgIndex] = useState(0);
    
    useEffect(() => {
        window.scrollTo({
          top: 0,
          left: 0
        });
    }, [])

  // Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-slate-500 font-medium animate-pulse">
          Chargement en cours...
        </p>
      </div>
    );
  }

  // Error State
  if (isError || !apartment) {
    return <p>Error loading apartment details or apartment not found.</p>;
  }

  // Next/Previous Image Functions
  function nextImg() {
    setActiveImgIndex((prev) => (prev + 1) % apartment.images.length);
  }

  function prevImg() {
    setActiveImgIndex(
      (prev) => (prev - 1 + apartment.images.length) % apartment.images.length,
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      <main className="max-w-7xl mx-auto px-6 pt-8">
        {/* Back Link */}
        <Link
          to="/appartements"
          className="flex items-center gap-2 text-slate-600 hover:text-secondary transition font-medium group mb-4"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />
          Retour à la liste
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              {/* Main Image Section */}
              <div className="relative rounded-3xl overflow-hidden h-[500px] group bg-slate-200 shadow-inner">
                <img
                  src={apartment.images[activeImgIndex]}
                  alt={apartment.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
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
              </div>

              {/* Image Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {apartment.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative flex-shrink-0 w-28 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImgIndex === idx ? "border-primary scale-95 shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                      alt={`Miniature ${idx + 1}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Apartment Details Section */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Disponible maintenant
                  </span>
                  <h1 className="text-4xl font-extrabold text-slate-900">
                    {apartment.title}
                  </h1>
                  <p className="text-slate-500 text-xl flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-secondary" />{" "}
                    {formatAddress(apartment)}
                  </p>
                </div>
                <div className="text-4xl font-black">
                  {apartment.price} ${" "}
                  <span className="text-base text-slate-400 font-normal">
                    / mois
                  </span>
                </div>
              </div>

              {/* Bedroom, Bathroom, and Size Info */}
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-slate-200">
                <div className="flex flex-col items-center text-slate-500 text-center gap-1">
                  <Bed className="w-6 h-6" />
                  <p className="font-bold text-lg">
                    {apartment.bedrooms} Chambres
                  </p>
                </div>
                <div className="flex flex-col items-center text-slate-500 text-center gap-1 border-x border-slate-100">
                  <Bath className="w-6 h-6" />
                  <p className="font-bold text-lg">
                    {apartment.bathrooms} Bains
                  </p>
                </div>
                <div className="flex flex-col items-center text-slate-500 text-center gap-1">
                  <Square className="w-6 h-6" />
                  <p className="font-bold text-lg">{apartment.sqft} pi²</p>
                </div>
              </div>

              {/* Apartment Description */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">À propos de ce logement</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Ce magnifique appartement situé à {apartment.neighborhood}{" "}
                  offre un cadre de vie exceptionnel. L'espace a été conçu pour
                  maximiser la lumière naturelle et offrir une fluidité moderne
                  entre les pièces. Une opportunité rare dans l'un des secteurs
                  les plus prisés de la ville.
                </p>
              </div>

              {/* <div className="space-y-4">
              <h2 className="text-2xl font-bold">Inclusions et commodités</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {apartment.amenities.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-slate-100/50 p-4 rounded-xl border border-slate-100"
                  >
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div> */}
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 sticky top-24 space-y-8">
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold">Intéressé par ce bien ?</h3>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition"
                    placeholder="Votre nom complet"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition"
                    placeholder="Votre adresse courriel"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition resize-none"
                    placeholder="Bonjour, je souhaiterais planifier une visite..."
                  ></textarea>
                </div>
                <button className="w-full bg-primary py-4 rounded-xl font-bold hover:bg-secondary transition active:scale-[0.98]">
                  Contacter le propriétaire
                </button>
              </form>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-around text-slate-400">
                <button className="flex flex-col items-center gap-1 hover:text-secondary transition group">
                  <Phone className="w-5 h-5 group-hover:scale-110 transition" />
                  <span className="text-[10px] uppercase font-bold">
                    Appeler
                  </span>
                </button>
                <button className="flex flex-col items-center gap-1 hover:text-secondary transition group">
                  <Mail className="w-5 h-5 group-hover:scale-110 transition" />
                  <span className="text-[10px] uppercase font-bold">Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
