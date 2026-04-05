import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function FullNameInput({ id, value, onChange }) {
  const [touched, setTouched] = useState(false);
  const { t } = useTranslation();

  const trimmedName = value.trim();
  const isValid = trimmedName.length >= 2;

  const showError = touched && trimmedName.length > 0 && !isValid;
  const showValid = touched && isValid;

  const baseClasses =
    "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition";

  const stateClasses = showValid
    ? "border-primary focus:ring-2 focus:ring-primary bg-white"
    : showError
      ? "border-red-500 focus:ring-2 focus:ring-red-500 bg-white"
      : "focus:ring-2 focus:ring-primary";

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="text-xs font-bold text-slate-400 uppercase ml-1"
      >
        {t("form.fullName.label")}
      </label>

      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setTouched(true)}
        required
        placeholder={t("form.fullName.placeholder")}
        className={`${baseClasses} ${stateClasses}`}
      />

      {showError && (
        <p className="text-xs text-red-500 ml-1">
          {t("form.fullName.error")}
        </p>
      )}
    </div>
  );
}