import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === "fr" ? "en" : "fr";
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 hover:cursor-pointer hover:opacity-80 transition"
    >
      {i18n.language === "fr" ? "English" : "Français"}
    </button>
  );
}
