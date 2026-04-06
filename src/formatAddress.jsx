import { useTranslation } from "react-i18next";

export default function formatAddress(
  { address, unit, neighborhood, city = "Montréal", postal_code },
  showNeighborhood = true,
) {
  const { t } = useTranslation();

  const postalCodeFormatted = postal_code && `, QC ${postal_code}`;

  const cityInfo =
    neighborhood && showNeighborhood
      ? `${city}${postalCodeFormatted} (${neighborhood})`
      : `${city}${postalCodeFormatted}`;

  return [address, unit && `${t("apartmentDetails.apartment")} ${unit}`, cityInfo].filter(Boolean).join(", ");
}