import {Phone, Mail} from "lucide-react";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      <main className="max-w-7xl mx-auto px-6 pt-8 text-slate-600 leading-relaxed text-lg">
        <p>Personnes responsables :</p>
        <ul>
          <li>Tél.: administration 514-761-7105</li>
          <li>Tél.: location 514-769-2762</li>
          <li>Télécopieur 514-761-0110</li>
        </ul>
        <a
          href="tel:5147617105"
          className="flex items-center gap-1 hover:opacity-75 transition group"
        >
          <Phone className="w-5 h-5 group-hover:scale-110 transition" />
          <span className="font-bold">514-761-7105</span>
        </a>
        <a
          href="mailto:info@habitatmoderne.com"
          className="flex items-center gap-1 hover:opacity-75 transition group"
        >
          <Mail className="w-5 h-5 group-hover:scale-110 transition" />
          <span className="font-bold">info@habitatmoderne.com</span>
        </a>
      </main>
    </div>
  );
}
