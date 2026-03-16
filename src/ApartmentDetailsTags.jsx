import { CheckCircle2 } from "lucide-react";

export default function ApartmentDetailsTags({ tags }) {
  if (!tags || !Array.isArray(tags) || tags.length === 0) return null;

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-2xl font-bold">Inclusions et commodités</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tags.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-slate-100/50 p-4 rounded-xl border border-slate-100"
          >
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-green-600" />
            <span className="font-medium text-slate-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}