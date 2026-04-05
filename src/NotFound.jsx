import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Home, Search, MapPinOff } from "lucide-react";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <title>{t("notFound.title")}</title>
      <meta name="robots" content="noindex" />

      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-slate-200 blur-3xl opacity-30 rounded-full scale-150"></div>
          <div className="relative flex justify-center">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
              <MapPinOff className="w-16 h-16 text-slate-400" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-6xl font-black text-slate-900">404</h1>
          <h2 className="text-2xl font-bold text-slate-800">
            {t("notFound.h2")}
          </h2>
          <p className="text-slate-500 leading-relaxed">
            {t("notFound.content")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            to="/appartements"
            className="flex items-center justify-center gap-2 text-center w-full md:w-auto mt-4 py-4 px-6 bg-primary rounded-xl font-bold shadow-md hover:bg-secondary transition active:scale-[0.98]"
          >
            <Search className="w-5 h-5" />
            {t("home.cta")}
          </Link>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-center w-full md:w-auto mt-4 py-4 px-6 bg-primary rounded-xl font-bold shadow-md hover:bg-secondary transition active:scale-[0.98]"
          >
            <Home className="w-5 h-5" />
            {t("nav.home")}
          </Link>
        </div>
      </div>
    </div>
  );
}
