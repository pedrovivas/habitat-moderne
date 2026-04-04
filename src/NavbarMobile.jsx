import { NavLink } from "react-router";
import { navLinks } from "./navLinks";
import LogOutButton from "./LogOutButton";

export default function NavbarMobile({
  isOpen,
  closeMenu,
  isAuthenticated,
  handleLogout,
}) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-primary px-6 py-4">
      <ul className="flex flex-col gap-4">
        {navLinks.map((link) => (
          <li key={link.to} className="font-medium text-lg">
            <NavLink
              to={link.to}
              end={link.end}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "opacity-80" : "")}
            >
              {link.label}
            </NavLink>
          </li>
        ))}

        {isAuthenticated && (
          <li>
            <LogOutButton
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
            />
          </li>
        )}
      </ul>
    </div>
  );
}