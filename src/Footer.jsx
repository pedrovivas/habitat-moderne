export default function Footer() {
    const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 mt-auto">
      <div className="max-w-6xl mx-auto text-center">
        <p>© {year} Habitat Moderne inc. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
