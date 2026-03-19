import { useQuery } from "@tanstack/react-query";
import { getApartments } from "../services/api";

export default function ApartmentList() {
  const { data, isLoading, isError } = useQuery(["apartments"], getApartments);

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur lors du chargement</p>;

  return (
    <div>
      {data.map(a => (
        <div key={a.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{a.title}</h3>
          <p>{a.description}</p>
          <p>{a.price} €</p>
          <p>{a.city} - {a.bedrooms} chambres</p>
          {a.image_url && <img src={`http://localhost:5000${a.image_url}`} alt={a.title} width={200} />}
        </div>
      ))}
    </div>
  );
}