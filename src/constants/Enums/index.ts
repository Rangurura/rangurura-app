import { useTranslation } from "react-i18next";
export const getTranslatedData = () => {
  const { t } = useTranslation();

  const organisationLevels = [
    {
      label: t("orgLevels.akagari"),
      value: "AKAGARI",
    },
    {
      label: t("orgLevels.umurenge"),
      value: "UMURENGE",
    },
    {
      label: t("orgLevels.akarere"),
      value: "AKARERE",
    },
    {
      label: t("orgLevels.intara"),
      value: "INTARA",
    },
  ];

  const governmentOrgs = [
    {
      label: "Police",
      value: "POLICE",
    },
    {
      label: "RIB",
      value: "RIB",
    },
  ];
  const leaders = [
    {
      label: "David NYIRINGABO",
      value: JSON.stringify({
        name: "David NYIRINGABO",
        phoneNumber: "0788460119",
      }),
    },
    {
      label: "UHIRIWE Anne",
      value: JSON.stringify({
        name: "Anne UHIRIWE",
        phoneNumber: "0783457998",
      }),
    },
    {
      label: "MUGABO Peter",
      value: JSON.stringify({
        name: "MUGABO Peter",
        phoneNumber: "0783475989",
      }),
    },
  ];

  const categories = [
    {
      label: t("categories.ubuzima"),
      value: "UBUZIMA",
    },
    {
      label: t("categories.uburezi"),
      value: "UBUREZI",
    },
    {
      label: t("categories.imiberehomyiza"),
      value: "IMIBEREHOMYIZA",
    },
    {
      label: t("categories.imyidagaduro"),
      value: "IMYIDAGADURO",
    },
    {
      label: t("categories.umutekano"),
      value: "UMUTEKANO",
    },
    {
      label: t("categories.ubutaka"),
      value: "UBUTAKA",
    },
  ];

  const organisationCategories = [
    {
      label: t("orgCategories.urwegoRwIbanze"),
      value: "Urwego Rw'Ibanze",
    },
    {
      label: t("orgCategories.ikigoCyaLeta"),
      value: "Ikigo cya Leta",
    },
  ];

  const leaderCategory = [
    {
      label: t("leaderCategory.umuyoboziMukuru"),
      value: "UMUYOBOZI_MUKURU",
    },
    {
      label: t("leaderCategory.umuyoboziWUburezi"),
      value: "UMUYOBOZI_W_UBUREZI",
    },
  ];

  return {
    organisationLevels,
    categories,
    organisationCategories,
    leaderCategory,
    governmentOrgs,
    leaders,
  };
};
