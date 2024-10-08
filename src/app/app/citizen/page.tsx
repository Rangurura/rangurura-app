"use client";
import React from "react";
import Activity from "@/components/Dashboard/Activity/Citizen";
import CustomTable from "@/components/Dashboard/Activity/SummaryTable";
import EventsTable from "@/components/core/Tables/Events";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

import no_data from "@/assets/images/no_leader.gif";
import { useEffect, useState } from "react";
import { ApiEndpoint } from "@/constants";
import CitizenSkeleton from "@/components/skeleton/CitizenSkeleton";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [problemsData, setProblemsData] = useState([]);
  const [suggestionsData, setSuggestionsData] = useState([]);
  const [loading2, setLoading2] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  useEffect(() => {
    setLoadingPage(false);
  }, []);
  useEffect(() => {
    setLoading2(true);
    ApiEndpoint.get("/problems/my/asked")
      .then((res) => {
        console.log(res.data?.data);
        if (res.data?.data?.message) {
          setProblemsData([]);
        } else {
          setProblemsData(res.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading2(false));

    ApiEndpoint.get("/suggestions/mine")
      .then((res) => {
        console.log(res.data?.data);
        if (res.data?.data?.message) {
          setSuggestionsData([]);
        } else {
          setSuggestionsData(res.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading2(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    ApiEndpoint.get("/events/receive_event")
      .then((res) => {
        if (res.data?.data?.message) {
          setEvents([]);
        } else {
          setEvents(res.data?.dataProps);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loadingPage ? (
        <CitizenSkeleton />
      ) : (
        <section className="w-full md:h-[90%] flex flex-col justify-between md:gap-0 mt-4">
          <div className="w-full h-[47%] flex flex-col md:flex-row justify-between gap-5 md:gap-0">
            <div className="md:w-[66%] md:h-full w-full bg-white rounded-lg">
              <CustomTable
                problemsData={problemsData.slice(0, 5)}
                suggestionsData={suggestionsData.slice(0, 5)}
                loading={loading2}
              />
            </div>
            <div className="md:w-[32%] bg-white rounded-lg py-3 px-3 md:py-0 mt-3 md:mt-0">
              <Activity />
            </div>
          </div>
          <div className="w-full md:h-[50%] flex flex-col bg-white">
            <div className="w-full flex justify-between px-6 items-center">
              <h1 className="text-lg md:text-2xl md:w-4/5 font-bold pt-2">
                {t("citizen.event_name")}
              </h1>
              <Link
                href={"/app/citizen/events"}
                className="text-sm text-[#0075FF] flex items-center gap-3"
              >
                View More <FaAngleRight />
              </Link>
            </div>
            {events?.length > 0 ? (
              <EventsTable
                dataProps={events?.slice(0, 5)}
                showPagination={false}
                styles="h-full"
              />
            ) : (
              <div className="w-full flex flex-col items-center pb-10 md:pb-0">
                <Image src={no_data} alt="No Data GIF" />
                <h1 className="mt-[1rem] font-bold">{t("citizen.no")}</h1>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Page;
