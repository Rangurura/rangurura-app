import React from "react";
import { Select } from "@mantine/core";
import { Cells, Sectors, Districts, Provinces } from "rwanda";
import { useTranslation } from "react-i18next";

const SelectLevel = ({
  organisationCategory,
  organisationLevel,
  setLevel,
  show,
  label,
  SelectedLevel,
}: {
  organisationCategory: string;
  organisationLevel: string;
  setLevel: Function;
  show?: boolean;
  label?: string;
  SelectedLevel?: string;
}) => {
  const { t } = useTranslation();

  return (
    <>
      {organisationCategory === "Urwego Rw'Ibanze" && (
        <>
          {SelectedLevel && (
            <>
              {SelectedLevel === "INTARA" && (
                <>
                  {(show === true || show === undefined) && (
                    <label className="font-semibold text-black">
                      {label ??
                        `${t("problemForm.choose_local")} ${t(
                          "orgLevels.intara",
                        )}`}
                    </label>
                  )}
                  <Select
                    placeholder={`${t("problemForm.choose_local")} ${t(
                      "orgLevels.intara",
                    )}`}
                    data={Provinces()}
                    size="md"
                    searchable
                    onChange={(e: any) => setLevel(e)}
                  />
                </>
              )}
              {SelectedLevel === "AKARERE" && (
                <>
                  <label className="font-semibold text-black">
                    {label ??
                      `${t("problemForm.choose_local")} ${t(
                        "orgLevels.akarere",
                      )}`}
                  </label>
                  <Select
                    placeholder={`${t("problemForm.choose_local")} ${t(
                      "orgLevels.akarere",
                    )}`}
                    data={Districts()}
                    size="md"
                    searchable
                    onChange={(e: any) => setLevel(e)}
                  />
                </>
              )}
              {SelectedLevel === "UMURENGE" && (
                <>
                  <label className="font-semibold text-black">
                    {label ??
                      `${t("problemForm.choose_local")} ${t(
                        "orgLevels.umurenge",
                      )}`}
                  </label>
                  <Select
                    placeholder={`${t("problemForm.choose_local")} ${t(
                      "orgLevels.umurenge",
                    )}`}
                    data={[...new Set(Sectors() as string[])]}
                    size="md"
                    searchable
                    onChange={(e: any) => setLevel(e)}
                  />
                </>
              )}
              {SelectedLevel === "AKAGARI" && (
                <>
                  <label className="font-semibold text-black">
                    {label ??
                      `${t("problemForm.choose_local")} ${t(
                        "orgLevels.akagari",
                      )}`}
                  </label>
                  <Select
                    placeholder={`${t("problemForm.choose_local")} ${t(
                      "orgLevels.akagari",
                    )}`}
                    data={[...new Set(Cells() as string[])]}
                    size="md"
                    searchable
                    onChange={(e: any) => setLevel(e)}
                  />
                </>
              )}
            </>
          )}

          {!SelectedLevel && organisationLevel === "INTARA" && (
            <>
              {(show === true || show === undefined) && (
                <label className="font-semibold text-black">
                  {label ??
                    `${t("problemForm.choose_local")} ${t("orgLevels.intara")}`}
                </label>
              )}
              <Select
                placeholder={`${t("problemForm.choose_local")} ${t(
                  "orgLevels.intara",
                )}`}
                data={Provinces()}
                size="md"
                searchable
                onChange={(e: any) => setLevel(e)}
              />
            </>
          )}

          {!SelectedLevel && organisationLevel === "AKARERE" && (
            <>
              <label className="font-semibold text-black">
                {label ??
                  `${t("problemForm.choose_local")} ${t("orgLevels.akarere")}`}
              </label>
              <Select
                placeholder={`${t("problemForm.choose_local")} ${t(
                  "orgLevels.akarere",
                )}`}
                data={Districts()}
                size="md"
                searchable
                onChange={(e: any) => setLevel(e)}
              />
            </>
          )}

          {!SelectedLevel && organisationLevel === "UMURENGE" && (
            <>
              <label className="font-semibold text-black">
                {label ??
                  `${t("problemForm.choose_local")} ${t("orgLevels.umurenge")}`}
              </label>
              <Select
                placeholder={`${t("problemForm.choose_local")} ${t(
                  "orgLevels.umurenge",
                )}`}
                data={[...new Set(Sectors() as string[])]}
                size="md"
                searchable
                onChange={(e: any) => setLevel(e)}
              />
            </>
          )}

          {!SelectedLevel && organisationLevel === "AKAGARI" && (
            <>
              <label className="font-semibold text-black">
                {label ??
                  `${t("problemForm.choose_local")} ${t("orgLevels.akagari")}`}
              </label>
              <Select
                placeholder={`${t("problemForm.choose_local")} ${t(
                  "orgLevels.akagari",
                )}`}
                data={[...new Set(Cells() as string[])]}
                size="md"
                searchable
                onChange={(e: any) => setLevel(e)}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default SelectLevel;
