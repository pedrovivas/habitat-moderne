export default function formatAddress(
  { address, unit, neighborhood, city = "Montréal" },
  showNeighborhood = true,
) {

  const cityInfo =
    neighborhood && showNeighborhood ? `${city} (${neighborhood})` : city;

  return [address, unit && `app. ${unit}`, cityInfo].filter(Boolean).join(", ");
}