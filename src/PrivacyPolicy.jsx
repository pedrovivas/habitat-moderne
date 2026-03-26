import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      <main className="max-w-7xl mx-auto px-6 pt-8">
        <h1 className="text-3xl font-bold mb-6">
          Politique de Confidentialité
        </h1>
        <h2 className="text-2xl font-semibold mb-4">
          Loi 25 : la protection des renseignements personnels une priorité
        </h2>
        <p className="mb-4">
          Habitat Moderne Inc. mets tout en œuvre pour protéger les données
          personnelles recueillies afin de vous offrir un service de la plus
          haute qualité tout en observant la réglementation en vigueur. Nos
          politiques de confidentialité de l'information personnelle, ainsi que
          nos conditions d'utilisation ont été mises à jour afin de refléter les
          nouveautés et exigences de la loi 25. Veuillez adresser un courriel à
          :{" "}
          <a
            href="mailto:info@habitatmoderne.com"
            className="text-blue-600 hover:underline"
          >
            info@habitatmoderne.com
          </a>{" "}
          pour toute plaintes et/ou pour plus de détails sur notre politique et
          pratique encadrant la gouvernance à l'égard des renseignements
          personnels.
        </p>
      </main>
    </div>
  );
}
