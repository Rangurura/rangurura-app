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
import { TfiReload } from "react-icons/tfi";
import { ApiEndpoint } from "@/constants";

const Page = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [leadersData, setLeadersData] = useState([]);
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
          title: "Fetch leaders error",
          message: "Error occurred when fetching leaders!",
          color: "#FF555D",
          autoClose: 5000,
          icon: <RxCrossCircled />,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const refetchData = async () => {
    setLoading(true);
    try {
      const response = await ApiEndpoint.get("/leaders/all");
      if (response.data?.data?.message) {
        setLeadersData([]);
      } else {
        setLeadersData(response?.data?.data?.reverse());
      }
    } catch (err) {
      console.error("Error fetching problems:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:h-[90%] mt-4">
      <h1 className="text-[1.5rem] font-extrabold">All leaders</h1>
      <div className="w-full flex items-end justify-end gap-3 ">
        <button
          type="button"
          onClick={open}
          className="bg-[#20603D]  px-4 py-2 rounded-lg flex items-center justify-center text-white font-extrabold"
        >
          New Leader
        </button>
        <button
          type="button"
          className="bg-[#20603D] flex items-center gap-2 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md"
          onClick={refetchData}
        >
          <TfiReload />
          Refresh
        </button>
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
              No leader registered yet
            </h6>
          </div>
        )}
      </div>
      <Modal opened={opened} onClose={close} size={"lg"}>
        <NewLeader close={close} />
      </Modal>
    </div>
  );
};

export default Page;
