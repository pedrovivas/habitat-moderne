import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Vérifie si admin est connecté
  const isAuthenticated = !!localStorage.getItem("admin");

  const navigate = useNavigate();

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  function handleLogout() {
    localStorage.removeItem("admin");
    toast.success("Déconnecté avec succès");
    navigate("/admin/login");
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

        <NavbarDesktop isAuthenticated={isAuthenticated} handleLogout={handleLogout} />

        {/* BOUTON MOBILE */}
        <button onClick={toggleMenu} className="md:hidden p-2 rounded-lg">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <NavbarMobile isOpen={isOpen} closeMenu={closeMenu} handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
    </nav>
  );
}
