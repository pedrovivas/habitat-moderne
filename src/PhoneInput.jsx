import { useState } from "react";

export default function PhoneInput({
  id,
  value = "",
  onChange,
  placeholder = "Votre numéro de téléphone",
  required,
  className = "",
  ...props
}) {
  const [phone, setPhone] = useState(value);
  const [touched, setTouched] = useState(false);

  function format(digits) {
    if (digits.length > 6)
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    if (digits.length > 3) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    if (digits.length > 0) return `(${digits}`;
    return "";
  }

  function handleChange(e) {
    const input = e.target;
    const rawValue = input.value;

    const digits = rawValue.replace(/\D/g, "");

    if (digits.length > 10) return;

    const cursorPosition = input.selectionStart;
    const digitsBeforeCursor = rawValue
      .slice(0, cursorPosition)
      .replace(/\D/g, "").length;

    const formatted = format(digits);
    setPhone(formatted);

    if (onChange) onChange(digits);

    requestAnimationFrame(() => {
      let digitCount = 0;
      let newCursor = 0;

      for (let i = 0; i < formatted.length; i++) {
        if (/\d/.test(formatted[i])) digitCount++;
        if (digitCount >= digitsBeforeCursor) {
          newCursor = i + 1;
          break;
        }
      }

      input.setSelectionRange(newCursor, newCursor);
    });
  }

  const digitCount = phone.replace(/\D/g, "").length;
  const isValid = digitCount === 10;
  const isInvalid = touched && digitCount > 0 && digitCount < 10;

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
        value={phone}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        required={required}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition
          ${isValid ? "border-primary focus:ring-2 focus:ring-primary" : ""}
          ${isInvalid ? "border-red-500 focus:ring-2 focus:ring-red-500" : ""}
          ${!touched ? "border-slate-200 focus:ring-2 focus:ring-primary" : ""}
          ${className}
        `}
        {...props}
      />

      {isInvalid && (
        <p className="text-xs text-red-500 ml-1">
          Veuillez entrer un numéro valide.
        </p>
      )}

      {/* {isValid && (
        <p className="text-xs text-secondary ml-1">Numéro valide ✓</p>
      )} */}
    </div>
  );
}
