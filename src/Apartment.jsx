import { Bed, Bath, Maximize } from "lucide-react";

export default function Apartment({ apt }) {
  return (
    <div
      key={apt.id}
      className="group bg-white rounded-[2rem] overflow-hidden border border-slate-200 hover:border-lime-200 hover:shadow-2xl hover:shadow-lime-100/50 transition-all duration-500 cursor-pointer flex flex-col"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={apt.images[0]}
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
            <p className="text-2xl font-black text-slate-800">${apt.price}</p>
            <p className="text-xs text-slate-400 font-medium">per month</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-500 text-sm mt-auto pt-4 border-t border-slate-50">
          <span className="flex items-center font-medium">
            <Bed size={16} className="mr-1.5 text-lime-600" /> {apt.beds}
          </span>
          <span className="flex items-center font-medium">
            <Bath size={16} className="mr-1.5 text-lime-600" /> {apt.baths}
          </span>
          <span className="flex items-center font-medium">
            <Maximize size={16} className="mr-1.5 text-lime-600" /> {apt.sqft}{" "}
            pi<sup>2</sup>
          </span>
        </div>
      </div>
    </div>
  );
}
