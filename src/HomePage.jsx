import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="bg-slate-100 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Habitat Moderne Inc.
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
            Entreprise familiale de gestion immobilière solidement établie à
            Montréal depuis 1965.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 text-lg leading-relaxed text-slate-700">
            <p>
              Nous vous offrons des logements rénovés avec goût à des prix
              raisonnables.
            </p>

            <p>
              Depuis les débuts de l'entreprise, nos bureaux sont situés au
              3572, rue Wellington à Verdun.
            </p>

            <p>
              Notre structure à taille humaine mise sur l'expérience de notre
              équipe administrative et d'entretien pour vous offrir un service
              courtois et personnalisé.
            </p>

            <p>
              Si vous cherchez à vous loger, n'hésitez pas à visiter nos
              appartements.
            </p>

            {/* CTA */}
            <div>
              <Link
                to="/appartements"
                className="inline-block text-center w-full md:w-auto mt-4 py-4 px-6 bg-primary rounded-xl font-bold shadow-md hover:bg-secondary transition active:scale-[0.98]"
              >
                Voir nos appartements
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="/habitat-moderne-building.jpg"
              alt="Habitat Moderne Building"
              className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
