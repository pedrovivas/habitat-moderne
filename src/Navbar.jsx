import { Home, RefreshCw } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-16 h-16 bg-lime-400 rounded-xl flex items-center justify-center text-slate-900 shadow-lg shadow-lime-100">
            <Home className="w-8 h-8" />
          </div>
          <p className="text-3xl font-brand font-black tracking-tight text-slate-800">
            Habitat Moderne inc.
            <br />
            <span className="text-lg">Gestion immobilière</span>
          </p>
        </div>
      </div>
    </nav>
  );
}
