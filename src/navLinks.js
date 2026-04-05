export function getNavLinks(t) {
  return [
    {
      to: "/",
      label: t("nav.home"),
      end: true,
    },
    {
      to: "/appartements",
      label: t("nav.apartments"),
    },
    {
      to: "/nous-joindre",
      label: t("nav.contact"),
    },
  ];
}
