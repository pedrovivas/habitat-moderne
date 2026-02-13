import { MOCK_APARTMENTS } from "./MOCK_APARTMENTS";

export default async function fetchApartments() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        MOCK_APARTMENTS.map((item) => ({
          id: item.id,
          title: item.name,
          price: item.price,
          beds: item.bedrooms,
          baths: item.bathrooms,
          sqft: item.sqft,
          area: item.neighborhood,
          images: item.images,
          tags: item.amenities || [],
        })),
      );
    }, 800);
  });
}
