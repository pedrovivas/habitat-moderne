import { Link, NavLink } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState("fr");
  const isAuthenticated = localStorage.getItem("admin");

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  const handleChangeLang = (e) => {
    const selectedLang = e.target.value;
    setLang(selectedLang);

    document.documentElement.lang = selectedLang;

    if (selectedLang !== "fr") {
      toast(
        "Votre navigateur peut traduire automatiquement cette page dans la langue choisie.",
        { icon: "🌐", duration: 4000 },
      );
    }
  };

  return (
    <nav className="bg-primary border-b top-0 z-40 relative">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
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
        <ul className="hidden md:flex gap-6 items-center">
          <li className="font-medium text-lg">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${isActive ? "opacity-80" : "hover:opacity-80"}`
              }
            >
              Accueil
            </NavLink>
          </li>

          <li className="font-medium text-lg">
            <NavLink
              to="/appartements"
              className={({ isActive }) =>
                `${isActive ? "opacity-80" : "hover:opacity-80"}`
              }
            >
              Nos appartements
            </NavLink>
          </li>

          <li className="font-medium text-lg">
            <NavLink
              to="/nous-joindre"
              className={({ isActive }) =>
                `${isActive ? "opacity-80" : "hover:opacity-80"}`
              }
            >
              Nous joindre
            </NavLink>
          </li>

          {/* <li>
            <select
              value={lang}
              onChange={handleChangeLang}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </li> */}

          {/* <li className="block text-lg font-medium">
            {!isAuthenticated ? (
              <Link to="/admin/login" onClick={closeMenu}>
                Se connecter
              </Link>
            ) : (
              <Link to="/admin/dashboard" onClick={closeMenu}>
                Tableau de bord
              </Link>
            )}
          </li> */}
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
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          <li className="block text-lg font-medium">
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) => `${isActive && "opacity-80"}`}
            >
              Accueil
            </NavLink>
          </li>
          <li className="block text-lg font-medium">
            <NavLink
              to="/appartements"
              onClick={closeMenu}
              className={({ isActive }) => `${isActive && "opacity-80"}`}
            >
              Nos appartements
            </NavLink>
          </li>
          <li className="block text-lg font-medium">
            <NavLink
              to="/nous-joindre"
              onClick={closeMenu}
              className={({ isActive }) => `${isActive && "opacity-80"}`}
            >
              Nous joindre
            </NavLink>
          </li>

          {/* <li>
            <select
              value={lang}
              onChange={handleChangeLang}
              className="border rounded px-2 py-1 text-sm w-full"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </li> */}

          {/* <li className="block text-lg font-medium">
            {!isAuthenticated ? (
              <Link to="/admin/login" onClick={closeMenu}>
                Se connecter
              </Link>
            ) : (
              <Link to="/admin/dashboard" onClick={closeMenu}>
                Tableau de bord
              </Link>
            )}
          </li> */}
        </ul>
      </div>
    </nav>
  );
}
