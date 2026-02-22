import { Link } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <nav className="bg-primary border-b top-0 z-40 relative">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center hover:opacity-75"
        >
          <span className="font-brand tracking-tight">
            <span className="text-2xl md:text-4xl font-bold">
              Habitat Moderne inc.
            </span>
            <br />
            <span className="text-lg md:text-2xl">Gestion immobilière</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          <li className="font-medium hover:opacity-75 text-lg">
            <Link to="/">Accueil</Link>
          </li>
          <li className="font-medium hover:opacity-75 text-lg">
            <Link to="/appartements">Nos appartements</Link>
          </li>
          <li className="font-medium hover:opacity-75 text-lg">
            <Link to="/nous-rejoindre">Nous joindre</Link>
          </li>
        </ul>

        {/* Mobile Burger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg transition"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-primary transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          <li>
            <Link
              to="/"
              onClick={closeMenu}
              className="block text-lg font-medium hover:opacity-75"
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              to="/appartements"
              onClick={closeMenu}
              className="block text-lg font-medium hover:opacity-75"
            >
              Nos appartements
            </Link>
          </li>
          <li>
            <Link
              to="/nous-rejoindre"
              onClick={closeMenu}
              className="block text-lg font-medium hover:opacity-75"
            >
              Nous rejoindre
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
