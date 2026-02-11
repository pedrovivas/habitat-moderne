import { X, ChevronRight } from "lucide-react";

export default function ApartmentDetailModal({
  selectedListing,
  onModalClick,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        onClick={() => onModalClick(null)}
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
              onClick={() => onModalClick(null)}
              className="p-3 bg-white rounded-full shadow-xl"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="md:w-2/5 p-10 flex flex-col overflow-y-auto">
          <div className="hidden md:flex justify-end mb-4">
            <button
              onClick={() => onModalClick(null)}
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
                <p className="text-xl font-black">{selectedListing.baths}</p>
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
                <h4 className="font-bold text-slate-800 mb-2">Description</h4>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Appartements modernes et bien situés, offrant des espaces de
                  vie lumineux et des équipements pratiques. Idéals pour tous
                  types de locataires, ces appartements offrent confort et
                  commodités à un prix compétitif.
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
  );
}
