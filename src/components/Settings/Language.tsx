import personImg from "@/assets/images/personImg.png";
import SwitchLanguages from "../core/SwitchLanguage";
import { useTranslation } from "react-i18next";

const SettingsTheme = () => {
  const {t} =useTranslation()
  return (
    <div className="w-[70%] h-full  flex flex-col px-9">
      <div className="w-full py-2 flex justify-between items-center mt-4">
        <h5 className="font-bold">{t("citizen.lge")}</h5>

        <SwitchLanguages color={"black"} />
      </div>
    </div>
  );
};
export default SettingsTheme;
