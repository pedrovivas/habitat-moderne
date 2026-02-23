import { useEffect } from "react";

export default function MapModal({ address, isOpen, onClose }) {
  const encoded = encodeURIComponent(address);
  const src = `https://www.google.com/maps?q=${encoded}&output=embed`;

  useEffect(() => {
    if (!isOpen) return;

    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-[95%] max-w-4xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-bold">Localisation</h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-black text-xl"
          >
            ×
          </button>
        </div>
        <iframe
          title="map"
          src={src}
          width="100%"
          height="500"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
        />
      </div>
    </div>
  );
}
