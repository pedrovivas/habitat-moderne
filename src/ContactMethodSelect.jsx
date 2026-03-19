export default function ContactMethodSelect({ id, value, onChange, touched, disabled }) {
  const isValid = value === "email" || value === "phone";
  const showError = touched && !isValid;

  const baseClasses =
    "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition";

  const stateClasses = isValid
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
        Méthode de contact préférée
      </label>

      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`${baseClasses} ${stateClasses}`}
      >
        <option value="" disabled>Choisir une option</option>
        <option value="email">Courriel</option>
        <option value="phone">Téléphone</option>
      </select>

      {showError && (
        <p className="text-xs text-red-500 ml-1">
          Veuillez sélectionner une méthode de contact.
        </p>
      )}
    </div>
  );
}