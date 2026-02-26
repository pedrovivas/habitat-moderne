import { Link, NavLink } from "react-router";
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
          <li className="font-medium text-lg">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${isActive ? "text-white" : "hover:opacity-75"}`
              }
            >
              Accueil
            </NavLink>
          </li>
          <li className="font-medium text-lg">
            <NavLink
              to="/appartements"
              className={({ isActive }) =>
                `${isActive ? "text-white" : "hover:opacity-75"}`
              }
            >
              Nos appartements
            </NavLink>
          </li>
          <li className="font-medium text-lg">
            <NavLink
              to="/nous-rejoindre"
              className={({ isActive }) =>
                `${isActive ? "text-white" : "hover:opacity-75"}`
              }
            >
              Nous joindre
            </NavLink>
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
          <li className="block text-lg font-medium">
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) => `${isActive && "text-white"}`}
            >
              Accueil
            </NavLink>
          </li>
          <li className="block text-lg font-medium">
            <NavLink
              to="/appartements"
              onClick={closeMenu}
              className={({ isActive }) => `${isActive && "text-white"}`}
            >
              Nos appartements
            </NavLink>
          </li>
          <li className="block text-lg font-medium">
            <NavLink
              to="/nous-rejoindre"
              onClick={closeMenu}
              className={({ isActive }) => `${isActive && "text-white"}`}
            >
              Nous rejoindre
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
