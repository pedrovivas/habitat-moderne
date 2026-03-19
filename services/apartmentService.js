export const addApartment = async (formData) => {
  
  const res = await fetch("http://localhost:5000/api/apartments", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Erreur lors de l'ajout de l'appartement");
  return res.json();
};

const fetchApartments = async () => {
  const res = await fetch("http://localhost:5000/api/apartments");
  if (!res.ok) throw new Error("Erreur récupération appartements");
  return res.json();
};

export const sendContactForm = async (formData) => {
  const response = await fetch("http://localhost:5000/api/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Erreur lors de l'envoi de l'email");
  }

  return response.json();
};

export const updateApartment = async (id, formData) => {
  
  const res = await fetch(`http://localhost:5000/api/apartments/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Erreur lors de la modification de l'appartement");
  }

  return res.json();
};

export default fetchApartments;