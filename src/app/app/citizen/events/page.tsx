"use client";

import NewEvent from "@/components/Events/NewEvent";
import EventsTable from "@/components/core/Tables/Events";
import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { ApiEndpoint } from "@/constants";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import no_data from "@/assets/images/no_leader.gif";
import { TfiReload } from "react-icons/tfi";
import { useTranslation } from "react-i18next";

const Page = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const {t} = useTranslation()
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const refetchData = async () => {
    setLoading(true);
    try {
      const response = await ApiEndpoint.get("/events/receive_event");
      if (response.data?.data?.message) {
        setEvents([]);
      } else {
        setEvents(response?.data?.data?.reverse());
      }
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    ApiEndpoint.get("/events/receive_event")
      .then((res) => {
        console.log(res.data?.data);
        if (res.data?.data?.message) {
          setEvents([]);
        } else {
          setEvents(res.data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="w-full h-[90%] mt-4">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-[1.6rem] font-extrabold">{t("sidebar.events")}</h1>
        <button
          type="button"
          className="bg-[#20603D] flex items-center gap-2 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md"
          onClick={refetchData}
        >
          <TfiReload />
          {t("citizen.refresh")}
        </button>
      </div>

      {loading ? (
        <div className="w-full flex justify-center mt-[2rem]">
          <ClipLoader size={24} color="black" />
        </div>
      ) : events.length == 0 ? (
        <div className="w-full flex flex-col items-center">
          <Image src={no_data} alt="No Data GIF" />
          <h1 className="mt-[1rem] font-bold">
        {t("suggestions.no_data")}
          </h1>
        </div>
      ) : (
        <div className="w-full h-max bg-white">
          <EventsTable dataProps={events} />
        </div>
      )}
    </div>
  );
};

export default Page;
