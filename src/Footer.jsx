import { Link } from "react-router";

export default function Footer() {
    const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 mt-auto">
      <img className="m-auto max-w-[400px] invert mix-blend-screen" src="/logo.png" />
      <div className="max-w-6xl mx-auto text-center">
        <p>© {year} Habitat Moderne inc. Tous droits réservés.</p>
        <Link to="/politique-de-confidentialite" className="text-xs text-slate-400 hover:text-slate-200 transition-colors duration-300">
          Politique de confidentialité
        </Link>
      </div>
    </footer>
  );
}
