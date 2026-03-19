import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/ajouter-appartement";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Erreur connexion");
        setLoading(false);
        return;
      }

      toast.success("Code envoyé par email 📩");
      setStep(2);
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur");
    }

    setLoading(false);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Code incorrect");
        setLoading(false);
        return;
      }

      toast.success("Connexion réussie 🎉");

      localStorage.setItem("admin", "true");

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Connexion Admin
        </h2>

        {step === 1 && (
          <form onSubmit={handleLogin} className="flex flex-col gap-6">

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />

            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
            >
              {loading ? "Chargement..." : "Se connecter"}
            </button>

          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyCode} className="flex flex-col gap-6">

            <p className="text-center text-gray-600">
              Entrez le code reçu par email
            </p>

            <input
              type="text"
              placeholder="Code à 6 chiffres"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border p-3 rounded-lg text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
            >
              {loading ? "Vérification..." : "Vérifier le code"}
            </button>

          </form>
        )}

      </div>
    </div>
  );
}