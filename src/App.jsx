import React, { useState, useMemo } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import {
  Search,
  Home,
  Bed,
  Bath,
  Maximize,
  Filter,
  X,
  ChevronRight,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

// Initialize the Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
      retry: 2,
    },
  },
});

/**
 * MOCK DATA
 */
const MOCK_APARTMENTS = [
  {
    id: 1,
    name: "2 chambres et 1 salle de bain à Verdun",
    price: 2100,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 950,
    neighborhood: "Verdun",
    image_url:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
    amenities: ["Balcon", "Plafonds hauts"],
  },
  {
    id: 2,
    name: "1 chambre et 1 salle de bain à Pointe-Saint-Charles",
    price: 3200,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 1100,
    neighborhood: "Pointe-Saint-Charles",
    image_url:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
    amenities: ["Gym", "Sécurité 24/7"],
  },
  {
    id: 3,
    name: "1 chambre et 1 salle de bain à LaSalle",
    price: 1850,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    neighborhood: "LaSalle",
    image_url:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800",
    amenities: ["Piscine sur le toit", "Climatisation"],
  },
  {
    id: 4,
    name: "3 chambres et 2 salles de bain à LaSalle",
    price: 4500,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    neighborhood: "LaSalle",
    image_url:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    amenities: ["Stationnement", "Vue sur l'eau"],
  },
  {
    id: 5,
    name: "2 chambres et 1 salle de bain à Verdun",
    price: 1400,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 800,
    neighborhood: "Verdun",
    image_url:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
    amenities: ["Vue sur le parc", "Animaux acceptés"],
  },
  {
    id: 6,
    name: "2 chambres et 1 salle de bain à Verdun",
    price: 2450,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1050,
    neighborhood: "Verdun",
    image_url:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800",
    amenities: ["Planchers en bois franc", "Espace de bureau"],
  },
];

/**
 * API SERVICE LAYER
 */
const fetchApartments = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        MOCK_APARTMENTS.map((item) => ({
          id: item.id,
          title: item.name,
          price: item.price,
          beds: item.bedrooms,
          baths: item.bathrooms,
          sqft: item.sqft,
          area: item.neighborhood,
          image: item.image_url,
          tags: item.amenities || [],
        })),
      );
    }, 800);
  });
};

const ListingsPage = () => {
  const [filterArea, setFilterArea] = useState("All");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedListing, setSelectedListing] = useState(null);

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

  const filteredListings = useMemo(() => {
    if (!listings) return [];
    return listings.filter((item) => {
      const matchArea = filterArea === "All" || item.area === filterArea;
      const matchPrice = item.price <= maxPrice;
      return matchArea && matchPrice;
    });
  }, [listings, filterArea, maxPrice]);

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
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-lime-400 rounded-xl flex items-center justify-center text-slate-900 shadow-lg shadow-lime-100">
              <Home className="w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-800 uppercase">
              Habitat Moderne inc.
            </span>
          </div>

          <button
            onClick={() => refetch()}
            className={`p-2 rounded-full transition-all ${isFetching ? "animate-spin text-lime-600" : "text-slate-400 hover:bg-slate-100"}`}
            title="Refresh Listings"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-8">
        {/* Modern Filter Deck */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                Appartements disponibles
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-white border rounded-2xl px-4 py-2 flex items-center shadow-sm">
                <Filter size={16} className="text-slate-400 mr-2" />
                <select
                  className="bg-transparent border-none text-sm font-semibold focus:ring-0 cursor-pointer"
                  value={filterArea}
                  onChange={(e) => setFilterArea(e.target.value)}
                >
                  <option value="All">Toutes les zones</option>
                  <option value="Pointe-Saint-Charles">
                    Pointe-Saint-Charles
                  </option>
                  <option value="LaSalle">LaSalle</option>
                  <option value="Verdun">Verdun</option>
                </select>
              </div>

              <div className="bg-white border rounded-2xl px-4 py-2 flex flex-col shadow-sm min-w-[200px]">
                <label className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Budget maximum: ${maxPrice}
                </label>
                <input
                  type="range"
                  min="1000"
                  max="5000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-lime-500 h-1.5 rounded-lg appearance-none cursor-pointer bg-slate-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredListings.map((apt) => (
            <div
              key={apt.id}
              onClick={() => setSelectedListing(apt)}
              className="group bg-white rounded-[2rem] overflow-hidden border border-slate-200 hover:border-lime-200 hover:shadow-2xl hover:shadow-lime-100/50 transition-all duration-500 cursor-pointer flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={apt.image}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={apt.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 left-4 bg-lime-400 px-3 py-1 rounded-full text-[10px] font-black uppercase text-slate-900 shadow-sm">
                  {apt.area}
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-lime-600 transition-colors">
                    {apt.title}
                  </h3>
                  <div className="text-right">
                    <p className="text-2xl font-black text-slate-800">
                      ${apt.price}
                    </p>
                    <p className="text-xs text-slate-400 font-medium">
                      per month
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-500 text-sm mt-auto pt-4 border-t border-slate-50">
                  <span className="flex items-center font-medium">
                    <Bed size={16} className="mr-1.5 text-lime-600" />{" "}
                    {apt.beds}
                  </span>
                  <span className="flex items-center font-medium">
                    <Bath size={16} className="mr-1.5 text-lime-600" />{" "}
                    {apt.baths}
                  </span>
                  <span className="flex items-center font-medium">
                    <Maximize size={16} className="mr-1.5 text-lime-600" />{" "}
                    {apt.sqft} pi<sup>2</sup>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="bg-white rounded-[2rem] p-20 text-center border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} />
            </div>
            <p className="text-lg text-slate-500 font-medium">
              No matches found for this search.
            </p>
            <button
              onClick={() => {
                setFilterArea("All");
                setMaxPrice(5000);
              }}
              className="mt-4 px-6 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-all text-sm font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Detail Modal Overlay */}
      {selectedListing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            onClick={() => setSelectedListing(null)}
          />
          <div className="bg-white w-full max-w-5xl h-full max-h-[800px] rounded-[3rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row animate-in fade-in zoom-in slide-in-from-bottom-8 duration-300">
            <div className="md:w-3/5 h-64 md:h-auto relative">
              <img
                src={selectedListing.image}
                className="w-full h-full object-cover"
                alt="Detail"
              />
              <div className="absolute top-6 left-6 md:hidden">
                <button
                  onClick={() => setSelectedListing(null)}
                  className="p-3 bg-white rounded-full shadow-xl"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="md:w-2/5 p-10 flex flex-col overflow-y-auto">
              <div className="hidden md:flex justify-end mb-4">
                <button
                  onClick={() => setSelectedListing(null)}
                  className="p-2 text-slate-300 hover:text-slate-600 transition-colors"
                >
                  <X size={28} />
                </button>
              </div>

              <div className="flex-grow">
                <span className="inline-block px-3 py-1 bg-lime-100 text-lime-700 rounded-lg text-xs font-black uppercase mb-4 tracking-widest">
                  {selectedListing.area}
                </span>
                <h2 className="text-4xl font-black text-slate-800 mb-2 leading-tight">
                  {selectedListing.title}
                </h2>
                <p className="text-3xl font-black text-lime-600 mb-8">
                  ${selectedListing.price}
                  <span className="text-sm font-bold text-slate-400">/mo</span>
                </p>

                <div className="grid grid-cols-3 gap-3 mb-10">
                  <div className="border border-slate-100 p-4 rounded-2xl text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                      Chambres
                    </p>
                    <p className="text-xl font-black">{selectedListing.beds}</p>
                  </div>
                  <div className="border border-slate-100 p-4 rounded-2xl text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                      Bains
                    </p>
                    <p className="text-xl font-black">
                      {selectedListing.baths}
                    </p>
                  </div>
                  <div className="border border-slate-100 p-4 rounded-2xl text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                      Grandeur
                    </p>
                    <p className="text-xl font-black">{selectedListing.sqft}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">
                      Description
                    </h4>
                    <p className="text-slate-500 leading-relaxed text-sm">
                      Appartements modernes et bien situés, offrant des espaces
                      de vie lumineux et des équipements pratiques. Idéals pour
                      tous types de locataires, ces appartements offrent confort
                      et commodités à un prix compétitif.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedListing.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-lime-50 border border-lime-100 rounded-lg text-xs font-semibold text-lime-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button className="mt-10 w-full py-5 bg-lime-400 text-slate-900 rounded-2xl font-black hover:bg-lime-500 transition-all shadow-xl shadow-lime-100 flex items-center justify-center group">
                Demande de location{" "}
                <ChevronRight
                  size={20}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Root Wrapper
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ListingsPage />
  </QueryClientProvider>
);

export default App;
