import { Select } from "@mantine/core";
import { Cells, Sectors, Districts, Provinces } from "rwanda";

const SelectLevel = ({
  organisationCategory,
  organisationLevel,
}: {
  organisationCategory: string;
  organisationLevel: string;
}) => {
  const uniqueSectors = [...new Set(Sectors())];
  return (
    <>
      {organisationCategory === "Urwego Rw'Ibanze" && (
        <>
          {organisationLevel === "Intara" && (
            <>
              <label className="font-semibold text-black">
                Hitamo {organisationLevel} ushaka kugezaho ikibazo
              </label>
              <Select
                placeholder={`Hitamo ${organisationLevel}`}
                data={Provinces()}
                size="md"
                searchable
              />
            </>
          )}
          {organisationLevel === "Akarere" && (
            <>
              <label className="font-semibold text-black">
                Hitamo {organisationLevel} ushaka kugezaho ikibazo
              </label>
              <Select
                placeholder={`Hitamo ${organisationLevel}`}
                data={Districts()}
                size="md"
                searchable
              />
            </>
          )}
          {organisationLevel === "Umurenge" && (
            <>
              <label className="font-semibold text-black">
                Hitamo {organisationLevel} ushaka kugezaho ikibazo
              </label>
              <Select
                placeholder={`Hitamo ${organisationLevel}`}
                data={[...new Set(Sectors() as string[])]}
                size="md"
                searchable
              />
            </>
          )}
          {organisationLevel === "Akagari" && (
            <>
              <label className="font-semibold text-black">
                Hitamo {organisationLevel} ushaka kugezaho ikibazo
              </label>
              <Select
                placeholder={`Hitamo ${organisationLevel}`}
                data={[...new Set(Cells() as string[])]}
                size="md"
                searchable
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default SelectLevel;
