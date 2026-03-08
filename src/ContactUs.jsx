import { Phone, Mail, Printer } from "lucide-react";

export default function ContactUs() {
  const numberStyle = "text-lg font-bold tracking-tight";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      <main className="max-w-4xl mx-auto px-6 pt-12">
        <h1 className="text-3xl font-bold mb-8 text-slate-800">
          Contactez-nous
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6 text-blue-600">
              <Phone className="w-6 h-6 text-slate-500" />
              <h2 className="text-xl font-semibold text-slate-800">
                Téléphones
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-sm text-slate-500 uppercase tracking-wide font-medium">
                  Administration
                </span>
                {/* Phone Mobile */}
                <a
                  href="tel:5147617105"
                  className={`${numberStyle} text-blue-600 md:hidden`}
                >
                  514-761-7105
                </a>
                {/* Phone Desktop */}
                <p className={`${numberStyle} text-slate-800 hidden md:block`}>
                  514-761-7105
                </p>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-slate-500 uppercase tracking-wide font-medium">
                  Location
                </span>
                {/* Phone Mobile */}
                <a
                  href="tel:5147692762"
                  className={`${numberStyle} text-blue-600 md:hidden`}
                >
                  514-769-2762
                </a>
                {/* Phone Desktop*/}
                <p className={`${numberStyle} text-slate-800 hidden md:block`}>
                  514-769-2762
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3 text-slate-600">
                <Printer className="w-6 h-6 text-slate-500" />
                <h2 className="text-xl font-semibold text-slate-800">
                  Télécopieur
                </h2>
              </div>
              <p className={`${numberStyle} text-slate-800`}>514-761-0110</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 text-blue-600">
                <Mail className="w-6 h-6 text-slate-500" />
                <h2 className="text-xl font-semibold text-slate-800">
                  Courriel
                </h2>
              </div>
              <a
                href="mailto:info@habitatmoderne.com"
                className="inline-flex items-center gap-2 text-lg text-blue-600 hover:underline"
              >
                info@habitatmoderne.com
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
