export default function formatAddress(
  { address, unit, neighborhood, city = "Montréal", postal_code },
  showNeighborhood = true,
) {
  const postalCodeFormatted = postal_code && `, QC ${postal_code}`;

  const cityInfo =
    neighborhood && showNeighborhood
      ? `${city}${postalCodeFormatted} (${neighborhood})`
      : `${city}${postalCodeFormatted}`;

  return [address, unit && `app. ${unit}`, cityInfo].filter(Boolean).join(", ");
}