import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();
  const paragraphs = t("home.content", { returnObjects: true });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <title>{t("home.title")}</title>
      <meta name="description" content={t("home.metaDescription")} />
      <section className="bg-slate-100 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {t("home.h1")}
          </h1>
          <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed opacity-90">
            {t("home.intro")}
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-lg leading-relaxed text-slate-700">
            {Array.isArray(paragraphs) &&
              paragraphs.map((text, index) => <p key={index}>{text}</p>)}
            <div>
              <Link
                to="/appartements"
                className="inline-block text-center w-full md:w-auto mt-4 py-4 px-6 bg-primary rounded-xl font-bold shadow-md hover:bg-secondary transition active:scale-[0.98]"
              >
                {t("home.cta")}
              </Link>
            </div>
          </div>

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