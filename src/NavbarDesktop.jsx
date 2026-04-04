import { NavLink } from "react-router";
import { navLinks } from "./navLinks";
import LogOutButton from "./LogOutButton";

export default function NavbarDesktop({ isAuthenticated, handleLogout }) {
  return (
    <ul className="hidden md:flex gap-6 items-center">
      {navLinks.map((link) => (
        <li key={link.to} className="font-medium text-lg">
          <NavLink
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              isActive ? "opacity-80" : "hover:opacity-80"
            }
          >
            {link.label}
          </NavLink>
        </li>
      ))}

      {isAuthenticated && (
        <li>
          <LogOutButton onClick={handleLogout} />
        </li>
      )}
    </ul>
  );
}