import { useTranslation } from "react-i18next";

export default function MessageInput({ id, value, onChange }) {
  const { t } = useTranslation();
  const baseClasses =
    "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white";

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center ml-1">
        <label
          htmlFor={id}
          className="text-xs font-bold text-slate-400 uppercase"
        >
          {t("form.message.label")}
        </label>
        <span className="text-xs text-slate-400">{value.length} / 500</span>
      </div>

      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("form.message.placeholder")}
        rows={4}
        maxLength={500}
        className={`${baseClasses} resize-none`}
      />
    </div>
  );
}
