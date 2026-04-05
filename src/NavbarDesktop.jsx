import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import LogOutButton from "./LogOutButton";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { getNavLinks } from "./navLinks";

export default function NavbarDesktop({ isAuthenticated, handleLogout }) {
  const { t } = useTranslation();

  const navLinks = getNavLinks(t);

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

      <li>
        <LanguageSwitcher />
      </li>
    </ul>
  );
}
