import { useId, useState } from "react";
import PhoneInput from "./PhoneInput";
import EmailInput from "./EmailInput";
import FullNameInput from "./FullNameInput";
import ContactMethodSelect from "./ContactMethodSelect";

export default function Form({
  address,
  showPhone = true,
  showContactMethod = true,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    contactMethod: showContactMethod ? "" : "email"
  });

  const fullnameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const infoId = useId();
  const contactMethodId = useId();

  function handleChange(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    /* const { fullName, email, phone, contactMethod } = formData;

    // Basic validation
    if (!fullName.trim()) {
      alert("Le nom est requis.");
      return;
    }

    if (!contactMethod) {
      alert("Veuillez choisir une méthode de contact.");
      return;
    }

    if (contactMethod === "email" && !email) {
      alert("Le courriel est requis.");
      return;
    }

    if (contactMethod === "phone" && !phone) {
      alert("Le téléphone est requis.");
      return;
    } */

    console.log(
      "Form submitted:",
      formData,
      address
        ? `Address: ${address}`
        : "Merci de m’informer dès qu’un logement se libère.",
    );
  }

  return (
    <div className="lg:col-span-1">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 sticky top-24 space-y-8">
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-bold">
            {address
              ? "Intéressé par ce bien ?"
              : "Soyez informé dès qu'un logement se libère"}
          </h3>
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

          {showPhone && (
            <PhoneInput
              id={phoneId}
              value={formData.phone}
              onChange={(val) => handleChange("phone", val)}
              required={formData.contactMethod === "phone"}
            />
          )}

          {showContactMethod && (
            <ContactMethodSelect
              id={contactMethodId}
              value={formData.contactMethod}
              onChange={(val) =>
                setFormData((prev) => ({
                  ...prev,
                  contactMethod: val,
                }))
              }
            />
          )}

          {/* <div className="space-y-1.5">
            <label
              htmlFor={infoId}
              className="text-xs font-bold text-slate-400 uppercase ml-1"
            >
              Message
            </label>
            <textarea
              id={infoId}
              rows="4"
              name="info"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition resize-none"
              placeholder="Bonjour, je souhaiterais planifier une visite..."
            ></textarea>
          </div> */}
          <button className="w-full bg-primary mt-4 py-4 rounded-xl font-bold hover:bg-secondary transition active:scale-[0.98]">
            {address ? "Contacter le propriétaire" : "Contactez-nous"}
          </button>
        </form>
      </div>
    </div>
  );
}
