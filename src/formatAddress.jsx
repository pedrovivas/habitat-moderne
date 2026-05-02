import { useTranslation } from "react-i18next";

export default function formatAddress(
  { address, unit, neighborhood, postal_code },
  showNeighborhood = true,
) {
  const { t } = useTranslation();

  const postalCodeFormatted = postal_code && `QC ${postal_code}`;

  const cityInfo =
    neighborhood && showNeighborhood
      ? `${postalCodeFormatted} (${neighborhood})`
      : `${postalCodeFormatted}`;

  return [address, unit && `${t("apartmentDetails.apartment")} ${unit}`, cityInfo].filter(Boolean).join(", ");
}