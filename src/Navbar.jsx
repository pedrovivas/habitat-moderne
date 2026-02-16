import { Home } from "lucide-react";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="bg-primary backdrop-blur-md border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-50">
          <span className="w-16 h-16 rounded-xl flex items-center justify-center text-slate-900">
            <Home className="w-8 h-8" />
          </span>
          <span className="text-3xl font-brand font-black tracking-tight text-slate-800">
            Habitat Moderne inc.
            <br />
            <span className="text-lg">Gestion immobilière</span>
          </span>
        </Link>
        <ul className="flex gap-3">
          <li className="font-bold hover:opacity-50">
            <Link to="/">Accueil</Link>
          </li>
          <li className="font-bold hover:opacity-50">
            <Link to="/">Nos appartements</Link>
          </li>
          <li className="font-bold hover:opacity-50">
            <Link to="/">Nous rejoindre</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
