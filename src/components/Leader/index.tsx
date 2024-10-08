import { getRoleFromLevel } from "@/utils/funcs/funcs";
import { Modal } from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GoPerson } from "react-icons/go";
import { SlLocationPin } from "react-icons/sl";

const Leader = ({ profile, leader }: { profile: any; leader: any }) => {
  const role = getRoleFromLevel(leader?.organizationLevel ?? "");
  const {t} = useTranslation()
  const [openV, setOpenV] = useState(false);
  return (
    <div className="w-full h-[250px] rounded-lg flex flex-col items-center shadow-sm shadow-[#e7e5e5] gap-2 bg-white justify-start px-3">
      <Image
        src={profile.imageUrl}
        width={100}
        height={100}
        alt=""
        className="w-[50%] h-[50%] mt-3 rounded-lg bg-center items-center self-center align-center"
      />
      <h6 className="text-left w-full font-extrabold text-black">
        {profile?.username ?? "Name Not Set"}
      </h6>
      <h6 className="text-left text-[90%] w-full font-extrabold text-black flex gap-3 items-center">
        <GoPerson size={13} />
        {role}
      </h6>
      <h6 className="text-left text-[90%] w-full font-extrabold text-black flex gap-3 mt-[-0.5rem] items-center">
        <SlLocationPin size={13} />
        {leader?.location}
      </h6>

      <div className="w-full flex justify-between items-center">
        <button
          type="button"
          className="w-full text-[80%] self-start bg-[#20603D] rounded-md py-2 px-4 text-white"
          onClick={() => {
            setOpenV(true);
          }}
        >
          {t("citizen.leaderProf")}
        </button>
      </div>
      <Modal opened={openV} onClose={() => setOpenV(false)} size={"lg"}>
        <h3 className="text-center text-[#20603D] font-bold my-4 text-xl">
         {t("citizen.leaderProf")}
        </h3>
        <div className="w-full h-full flex flex-col pb-5 pl-5">
          <Image
            src={profile.imageUrl}
            width={50}
            height={50}
            alt=""
            className="w-[30%] h-[30%] rounded-lg bg-center items-center self-center align-center mb-3"
          />

          <h6 className="mt-[10px]">
            <span className="font-extrabold text-md">{t("signup.name")}:</span>{" "}
            {profile?.realName}
          </h6>
          <h6 className="mt-[10px]">
            <span className="text-md font-extrabold"> {t("login.id")}:</span>{" "}
            {profile?.username}
          </h6>
          <h6 className="mt-[10px]">
            <span className="text-md font-extrabold"> {t("signup.phone")}:</span>{" "}
            {profile?.phone}
          </h6> 
          <h6 className="mt-[10px]">
            <span className="text-md font-extrabold"> {t("level")} :</span> {role}
          </h6>
          <h6 className="mt-[10px]">
            <span className="font-extrabold text-md">{t("citizen.location")} :</span>{" "}
            {leader?.location}
          </h6>
        </div>
      </Modal>
    </div>
  );
};

export default Leader;
