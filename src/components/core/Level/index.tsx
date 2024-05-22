import { Select } from "@mantine/core";
import { Cells, Sectors, Districts, Provinces } from "rwanda";

const SelectLevel = ({
  organisationCategory,
  organisationLevel,
  setLevel,
  show,
}: {
  organisationCategory: string;
  organisationLevel: string;
  setLevel: Function;
  show?: boolean;
}) => {
  return (
    <>
      {organisationCategory === "Urwego Rw'Ibanze" && (
        <>
          {organisationLevel === "INTARA" && (
            <>
              {(show === true || show === undefined) && (
                <label className="font-semibold text-black">
                  Hitamo {organisationLevel}
                </label>
              )}
              <Select
                placeholder={`Hitamo ${organisationLevel}`}
                data={Provinces()}
                size="md"
                searchable
                onChange={(e: any) => setLevel(e)}
              />
            </>
          )}
          {organisationLevel === "AKARERE" && (
            <>
              <label className="font-semibold text-black">
                Hitamo {organisationLevel}
              </label>
              <Select
                placeholder={`Hitamo ${organisationLevel}`}
                data={Districts()}
                size="md"
                searchable
                onChange={(e: any) => setLevel(e)}
              />
            </>
          )}
          {organisationLevel === "UMURENGE" && (
            <>
              <label className="font-semibold text-black">
                Hitamo {organisationLevel}
              </label>
              <Select
                placeholder={`Hitamo ${organisationLevel}`}
                data={[...new Set(Sectors() as string[])]}
                size="md"
                searchable
                onChange={(e: any) => setLevel(e)}
              />
            </>
          )}
          {organisationLevel === "AKAGARI" && (
            <>
              <label className="font-semibold text-black">
                Hitamo {organisationLevel}
              </label>
              <Select
                placeholder={`Hitamo ${organisationLevel}`}
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
