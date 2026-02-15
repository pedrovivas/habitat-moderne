import { useQuery } from "@tanstack/react-query";
import fetchApartments from "./fetchApartments";
import { Search, AlertCircle } from "lucide-react";
import Apartment from "./Apartment";
import {Link} from "react-router"

export default function ListingsPage() {
  const {
    data: listings,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["apartments"],
    queryFn: fetchApartments,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-lime-100 border-t-lime-500 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-slate-500 font-medium animate-pulse">
          Chargement en cours...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md text-center border border-red-100">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Connection Error
          </h2>
          <p className="text-slate-500 mb-6">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="w-full py-3 bg-lime-400 text-slate-900 rounded-xl font-bold hover:bg-lime-500 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      <main className="max-w-7xl mx-auto px-6 pt-8">
        <div className="mb-10 space-y-4">
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
            Appartements disponibles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings &&
            listings.map((apt) => (
              <Link key={apt.id} to={`/apartment/${apt.id}`}>
                <Apartment apt={apt} />
              </Link>
            ))}
        </div>

        {listings.length === 0 && (
          <div className="bg-white rounded-[2rem] p-20 text-center border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} />
            </div>
            <p className="text-lg text-slate-500 font-medium">
              Aucun logement disponible pour le moment.
            </p>
            {/* Add contact form here */}
          </div>
        )}
      </main>
    </div>
  );
}
