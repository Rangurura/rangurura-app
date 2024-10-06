import { Select } from "@mantine/core";
import { Cells, Sectors, Districts, Provinces } from "rwanda";

const LeaderSelectLevel = ({
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
  return (
    <>
      {(organisationCategory === "Urwego Rw'Ibanze" || organisationCategory === "Ikigo cya Leta") && (
        <>
          {SelectedLevel && (
            <>
              {SelectedLevel === "INTARA" && (
                <>
                  {(show === true || show === undefined) && (
                    <label className="font-semibold text-black">
                      {label ?? `Hitamo ${SelectedLevel}`}
                    </label>
                  )}
                  <Select
                    placeholder={`Hitamo ${SelectedLevel}`}
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
                    {label ?? `Hitamo ${SelectedLevel}`}
                  </label>
                  <Select
                    placeholder={`Hitamo ${SelectedLevel}`}
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
                    {label ?? `Hitamo ${SelectedLevel}`}
                  </label>
                  <Select
                    placeholder={`Hitamo ${SelectedLevel}`}
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
                    {label ?? `Hitamo ${SelectedLevel}`}
                  </label>
                  <Select
                    placeholder={`Hitamo ${SelectedLevel}`}
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
      )}
    </>
  );
};

export default LeaderSelectLevel;
