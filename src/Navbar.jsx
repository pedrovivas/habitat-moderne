import { Home } from "lucide-react";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="bg-primary backdrop-blur-md border-b top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-30 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-75">
          <span className="w-16 h-16 rounded-xl flex items-center justify-center text-slate-900">
            <Home className="w-8 h-8" />
          </span>
          <span className="font-brand font-black tracking-tight font-medium">
            <span className="text-5xl">Habitat Moderne inc.</span>
            <br />
            <span className="text-3xl">Gestion immobilière</span>
          </span>
        </Link>
        <ul className="flex gap-3">
          <li className="font-medium hover:opacity-75 text-lg">
            <Link to="/">Accueil</Link>
          </li>
          <li className="font-medium hover:opacity-75 text-lg">
            <Link to="/appartements">Nos appartements</Link>
          </li>
          <li className="font-medium hover:opacity-75 text-lg">
            <Link to="/nous-rejoindre">Nous rejoindre</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
