import { useId, useState } from "react";
import PhoneInput from "./PhoneInput";
import EmailInput from "./EmailInput";
import FullNameInput from "./FullNameInput";
import ContactMethodSelect from "./ContactMethodSelect";
import MessageInput from "./MessageInput";

export default function Form({
  address,
  showPhone = true,
  showContactMethod = true,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    contactMethod: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const fullnameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const contactMethodId = useId();
  const messageId = useId();

  const isButtonDisabled = status === "sending";

  function handleChange(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.contactMethod) {
      setError("Veuillez sélectionner une méthode de contact.");
      return;
    } else {
      setError("");
    }

    setStatus("sending");

    const dataToSend = {
    ...formData,
    apartmentId: address,
    message: formData.message.trim(),
    };

    try {
      const res = await fetch("http://localhost:5000/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi de l'email");

      setStatus("success");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        contactMethod: "",
        message: "",
      });

      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error(err);
      alert("Erreur : impossible d'envoyer l'email.");
      setStatus("idle");
    }
  }

  return (
    <div className="lg:col-span-1">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 sticky top-24 space-y-4">
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-bold">Intéressé par ce bien ?</h3>
          {status === "success" && (
            <p className="text-green-600 font-semibold transition-opacity duration-500">
              Email envoyé au propriétaire !
            </p>
          )}
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <FullNameInput
            id={fullnameId}
            value={formData.fullName}
            onChange={(val) => handleChange("fullName", val)}
          />

          <EmailInput
            id={emailId}
            value={formData.email}
            onChange={(val) => handleChange("email", val)}
            required={formData.contactMethod === "email"}
          />

          <PhoneInput
            id={phoneId}
            value={formData.phone}
            onChange={(val) => handleChange("phone", val)}
            required={formData.contactMethod === "phone"}
          />

          <ContactMethodSelect
            id={contactMethodId}
            value={formData.contactMethod}
            onChange={(val) => handleChange("contactMethod", val)}
          />
          {error && <p className="text-red-500 text-xs ml-1 mt-1">{error}</p>}

          <MessageInput
            id={messageId}
            value={formData.message}
            onChange={(val) => handleChange("message", val)}
          />

          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`w-full mt-4 py-4 rounded-xl font-bold transition active:scale-[0.98] ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-secondary"
            }`}
          >
            {status === "sending" ? "Envoi..." : "Contacter le propriétaire"}
          </button>
        </form>
      </div>
    </div>
  );
}
