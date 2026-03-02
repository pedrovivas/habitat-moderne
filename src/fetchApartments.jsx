import { MOCK_APARTMENTS } from "./MOCK_APARTMENTS";

export default async function fetchApartments() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        MOCK_APARTMENTS.map((apartment) => ({
          id: apartment.id,
          title: apartment.title,
          address: apartment.address,
          unit: apartment.unit,
          postalCode: apartment.postal_code,
          price: apartment.price,
          description: apartment.description,
          bedrooms: apartment.bedrooms,
          bathrooms: apartment.bathrooms,
          sqft: apartment.sqft,
          neighborhood: apartment.neighborhood,
          images: apartment.images,
          tags: apartment.tags || [],
        })),
      );
    }, 800);
  });
}
