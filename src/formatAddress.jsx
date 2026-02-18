export default function formatAddress({
  address,
  unit,
  neighborhood,
  city = "Montréal",
}) {
  return [address, unit && `app. ${unit}`, `${city} (${neighborhood})`]
    .filter(Boolean)
    .join(", ");
}