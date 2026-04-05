import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import fetchApartments from "../services/apartmentService";
import { Search, AlertCircle } from "lucide-react";
import Apartment from "./Apartment";
import { Link } from "react-router";
import Form from "./Form";

export default function ListingsPage() {
  const isAdmin = localStorage.getItem("admin") === "true";
  const { t } = useTranslation();

  const {
    data: listings,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["apartments"],
    queryFn: fetchApartments,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <title>{t("apartmentsListing.titleLoading")}</title>
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-slate-500 font-medium animate-pulse">
          {t("apartmentsListing.loadingMessage")}
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
        <title>{t("apartmentsListing.titleError")}</title>
        <meta name="robots" content="noindex" />
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md text-center border border-red-100">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} />
          </div>
          <h1 className="text-xl font-bold text-slate-800 mb-4">
            {t("apartmentsListing.errorMessage")}
          </h1>
          {/* Error message from backend */}
          {/* <p className="text-slate-500 mb-6">{error.message}</p> */}
          <button
            onClick={() => refetch()}
            className="w-full py-3 bg-primary text-slate-900 rounded-xl font-bold hover:bg-secondary transition-all"
          >
            {t("apartmentsListing.errorCta")}
          </button>
        </div>
      </div>
    );
  }

  const filteredListings = listings?.filter(
    (apt) => isAdmin || apt.visible
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      <title>{t("apartmentsListing.title")}</title>
      <meta
        name="description"
        content={t("apartmentsListing.metaDescription")}
      />
      <main className="max-w-7xl mx-auto px-6 pt-8">
        <div className="mb-10 space-y-4">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            {t("apartmentsListing.h1")}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredListings && filteredListings.length > 0 ? (
            filteredListings.map((apartment) => (
              <Link key={apartment.id} to={`/appartements/${apartment.id}`}>
                <Apartment apartment={apartment} isAdmin={isAdmin} />
              </Link>
            ))
          ) : (
            <div className="bg-white rounded-[2rem] p-6 md:p-20 text-center border-2 border-dashed border-slate-200 col-span-full">
              <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} />
              </div>
              <p className="text-lg text-slate-500 font-medium mb-6">
                {t("apartmentsListing.noApartmentsMessage")}
              </p>
              <Form showPhone={false} showContactMethod={false} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}