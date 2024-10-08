"use client";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import NewLeader from "@/components/NewLeader";
import { getAllLeaders } from "@/utils/funcs/funcs";
import Leader from "@/components/Leader";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import no_leader_gif from "@/assets/images/no_leader.gif";
import Image from "next/image";
import { notifications } from "@mantine/notifications";
import { RxCrossCircled } from "react-icons/rx";
import { useTranslation } from "react-i18next";

const Page = () => {
  const [leadersData, setLeadersData] = useState([]);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllLeaders()
      .then((data: any) => {
        console.log("Leaders -->", data);
        setLeadersData(data?.data);
      })
      .catch((err: any) => {
        // toast.error("Unable to Fetch Leaders!");
        notifications.show({
          title: "Fetch leaders",
          message: "Error occurred when fetching leaders!",
          color: "#FF555D",
          autoClose: 5000,
          icon: <RxCrossCircled />,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full md:h-[90%] mt-4">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-[1.5rem] font-extrabold">{t("sidebar.leaders")}</h1>
      </div>
      <div className="w-full h-[92%] overflow-y-auto">
        {loading ? (
          <div className="w-full flex justify-center items-center">
            <ClipLoader size={23} color="black" />
          </div>
        ) : leadersData.length ? (
          <div className="w-full h-[97%] max-[470px]:grid-cols-1 grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-2 grid lg:grid-cols-4  pt-3 justify-start my-1 ">
            {leadersData.map((person: any, index: number) => (
              <Leader
                key={index}
                profile={person?.user}
                leader={person.leader}
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center mt-[3rem]">
            <Image src={no_leader_gif} width={100} alt="" />
            <h6 className="w-full text-center font-bold mt-[2rem]">
              {t("suggestions.no_data")}
            </h6>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
