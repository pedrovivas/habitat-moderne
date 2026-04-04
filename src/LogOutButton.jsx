import { LogOut } from "lucide-react";

export default function LogOutButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-1.5 rounded-lg hover:scale-105 transition duration-200 shadow-md"
    >
      <LogOut size={16} />
      Déconnexion
    </button>
  );
}
