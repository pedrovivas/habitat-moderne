import { useState } from "react";

export default function EmailInput({ id, value, onChange, required }) {
  const [touched, setTouched] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isValid = emailRegex.test(value);
  const showValid = touched && isValid;
  const showError = touched && value.length > 0 && !isValid;

  const baseClasses =
    "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition";

  const stateClasses = showValid
    ? "border-primary focus:ring-2 focus:ring-primary"
    : showError
      ? "border-red-500 focus:ring-2 focus:ring-red-500"
      : "focus:ring-2 focus:ring-primary";

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="text-xs font-bold text-slate-400 uppercase ml-1"
      >
        Courriel
      </label>

      <input
        id={id}
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setTouched(true)}
        required={required}
        placeholder="Votre adresse courriel"
        className={`${baseClasses} ${stateClasses}`}
      />

      {showError && (
        <p className="text-xs text-red-500 ml-1">
          Veuillez entrer une adresse courriel valide.
        </p>
      )}
    </div>
  );
}
