import { Link, NavLink } from "react-router";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Vérifie si admin est connecté
  const isAuthenticated = !!localStorage.getItem("admin");

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  function handleLogout() {
    localStorage.removeItem("admin");
    toast.success("Déconnecté avec succès");
    window.location.href = "/admin/login";
  }

  return (
    <nav className="bg-primary border-b top-0 z-40 relative">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* LOGO */}
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

        {/* MENU DESKTOP */}
        <ul className="hidden md:flex gap-6 items-center">
          <li className="font-medium text-lg">
            <NavLink to="/">Accueil</NavLink>
          </li>

          <li className="font-medium text-lg">
            <NavLink to="/appartements">Nos appartements</NavLink>
          </li>

          <li className="font-medium text-lg">
            <NavLink to="/nous-joindre">Nous joindre</NavLink>
          </li>

          {/* ✅ ADMIN */}
          {isAuthenticated && (
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-1.5 rounded-lg hover:scale-105 transition duration-200 shadow-md"
              >
                <LogOut size={16} />
                Déconnexion
              </button>
            </li>
          )}
        </ul>

        {/* BOUTON MOBILE */}
        <button onClick={toggleMenu} className="md:hidden p-2 rounded-lg">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MENU MOBILE */}
      {isOpen && (
        <div className="md:hidden bg-primary px-6 py-4">
          <ul className="flex flex-col gap-4">
            <li className="text-lg">
              <NavLink to="/" onClick={closeMenu}>
                Accueil
              </NavLink>
            </li>

            <li className="text-lg">
              <NavLink to="/appartements" onClick={closeMenu}>
                Nos appartements
              </NavLink>
            </li>

            <li className="text-lg">
              <NavLink to="/nous-joindre" onClick={closeMenu}>
                Nous joindre
              </NavLink>
            </li>

            {/* ✅ ADMIN MOBILE */}
            {isAuthenticated && (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white px-4 py-1.5 rounded-lg hover:from-blue-800 hover:via-blue-600 hover:to-blue-400 transition duration-300 shadow-md"
                >
                  <LogOut size={16} />
                  Déconnexion
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
