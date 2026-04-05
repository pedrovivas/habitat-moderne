import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { fr } from "./locales/fr";
import { en } from "./locales/en";

// 1. Paste in your translation dictionaries
const resources = {
  fr: { translation: fr },
  en: { translation: en },
};

// 2. Initialize i18next
i18n
  .use(LanguageDetector) // Detects if the browser is set to FR or EN
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "fr", // If browser is Spanish, fall back to French
    supportedLngs: ["fr", "en"],

    detection: {
      // Look at localStorage first, then the browser settings
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false, // React already escapes values safely!
    },
  });

export default i18n;