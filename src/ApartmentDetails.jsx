import { useParams, Link } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Square
} from "lucide-react";
import fetchApartments from "./fetchApartments"; // Assuming this is your fetch function
import formatAddress from "./formatAddress";
import ApartmentDetailsTags from "./ApartmentDetailsTags";
import Form from "./Form";
import MapModal from "./MapModal";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/navigation";

export default function ApartmentDetails() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      <main className="max-w-7xl mx-auto px-6 pt-8">
        {/* Back Link */}
        <Link
          to="/appartements"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-secondary transition font-medium group mb-4"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />
          Retour à la liste
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              {/* Main Large Swiper */}
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="h-[500px] rounded-3xl overflow-hidden shadow-xl"
              >
                {apartment.images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                      alt={apartment.title}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Thumbnails Swiper */}
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={12}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="h-24"
              >
                {apartment.images.map((img, idx) => (
                  <SwiperSlide
                    key={idx}
                    className="rounded-xl overflow-hidden border-2 border-transparent cursor-pointer [.swiper-slide-thumb-active_&]:border-primary"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
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
                  <button
                    onClick={() => setIsMapOpen(true)}
                    className="group text-slate-500 text-xl flex items-center gap-2 cursor-pointer transition"
                  >
                    <MapPin className="w-5 h-5 text-slate-600 group-hover:text-secondary transition" />
                    <span className="group-hover:text-secondary transition">
                      {formatAddress(apartment)}
                    </span>
                  </button>
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

              {/* Tags */}
              {apartment.tags.length > 0 && (
                <ApartmentDetailsTags apartment={apartment} />
              )}
            </div>
          </div>

          {/* Contact Form Section */}
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
