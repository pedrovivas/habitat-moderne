export default function PhoneInput({
  id,
  value = "",
  onChange,
  placeholder = "Votre numéro de téléphone",
  required,
  className = "",
  ...props
}) {
  function format(digits) {
    if (digits.length > 6)
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    if (digits.length > 3) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    if (digits.length > 0) return `(${digits}`;
    return "";
  }

  function handleChangeInput(e) {
    const rawValue = e.target.value;
    const digits = rawValue.replace(/\D/g, "").slice(0, 10);
    onChange && onChange(digits);
  }

  const formattedValue = format(value);

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="text-xs font-bold text-slate-400 uppercase ml-1"
      >
        Téléphone
      </label>

      <input
        id={id}
        type="tel"
        inputMode="tel"
        value={formattedValue}
        onChange={handleChangeInput}
        required={required}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition ${className}`}
        {...props}
      />
    </div>
  );
}