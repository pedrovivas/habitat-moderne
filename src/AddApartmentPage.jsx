import ApartmentForm from "./ApartmentForm";
import { useQueryClient } from "@tanstack/react-query";

export default function AddApartmentPage() {
  const queryClient = useQueryClient();

  const handleAdded = () => {
    queryClient.invalidateQueries(["apartments"]);
  };

  return (
    <div style={{ padding: "50px" }}>
      <ApartmentForm onAdded={handleAdded} />
    </div>
  );
}