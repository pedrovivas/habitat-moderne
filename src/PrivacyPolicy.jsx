import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      <title>{t("privacyPolicy.title")}</title>
      <meta
        name="description"
        content={t("privacyPolicy.metaDescription")}
      />
      <main className="max-w-7xl mx-auto px-6 pt-8">
        <h1 className="text-3xl font-bold mb-6">
          {t("privacyPolicy.h1")}
        </h1>
        <h2 className="text-2xl font-semibold mb-4">
          {t("privacyPolicy.h2")}
        </h2>
        <p className="mb-4">
          {t("privacyPolicy.content")}
        </p>
      </main>
    </div>
  );
}
