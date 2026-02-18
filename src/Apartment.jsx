import { Bed, Bath, Maximize } from "lucide-react";
import formatAddress from "./formatAddress";

export default function Apartment({ apartment }) {
  return (
    <div
      key={apartment.id}
      className="group bg-white rounded-[2rem] overflow-hidden border border-slate-200 hover:border-primary hover:shadow-2xl hover:shadow-slate-500/50 transition-all duration-500 cursor-pointer flex flex-col"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={apartment.images[0]}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={apartment.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-4 left-4 bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase text-slate-900 shadow-sm">
          {apartment.neighborhood}
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-4">
          <div className="mb-2">
            <span className="text-2xl font-black text-slate-800">
              ${apartment.price}
            </span>
            <span className="text-xs text-slate-400 font-medium"> / mois</span>
          </div>
          <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:opacity-75 transition-colors">
            {apartment.title}
          </h3>
        </div>

        <p className="text-slate-500 line-clamp-2 min-h-[3rem]">
          {formatAddress(apartment, false)}
        </p>

        <div className="flex items-center gap-4 text-slate-500 text-sm mt-auto pt-4 border-t border-slate-50">
          <span className="flex items-center font-medium">
            <Bed size={16} className="mr-1.5" /> {apartment.bedrooms}
          </span>
          <span className="flex items-center font-medium">
            <Bath size={16} className="mr-1.5" /> {apartment.bathrooms}
          </span>
          <span className="flex items-center font-medium">
            <Maximize size={16} className="mr-1.5" /> {apartment.sqft} pi
            <sup>2</sup>
          </span>
        </div>
      </div>
    </div>
  );
}
