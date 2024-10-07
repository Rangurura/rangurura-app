"use client";
import React from "react";
import { FaRegCheckSquare } from "react-icons/fa";
import { PiClockFill } from "react-icons/pi";
import { useState } from "react";
import Header from "../../Header";
import Link from "next/link";
import { useGet } from "@/utils/funcs/useGet";
import { useTranslation } from "react-i18next";
type useGetResp = {
  data: any;
  loading: boolean;
};
type TimeFrame = {
  key: string;
  label: string;
};
const Activity = () => {
  const timeFrame = [
    {
      key: "day",
      label: "Daily",
    },
    {
      key: "week",
      label: "Weekly",
    },
    {
      key: "month",
      label: "Monthly",
    },
    {
      key: "year",
      label: "Yearly",
    },
  ];

  const [activeTimeFrame, setActiveTimeFrame] = useState<TimeFrame>(
    timeFrame[0],
  );

  const {
    data: solvedProblemsData,
    loading: solvedProblemsLoading,
  }: useGetResp = useGet({
    src: "/user-dashboard/number_of_probs_solvedforMe",
  });

  const {
    data: unsolvedProblemsData,
    loading: unsolvedProblemsLoading,
  }: useGetResp = useGet({
    src: "/user-dashboard/number_of_pending_probsForMe",
  });

  const { t } = useTranslation();
  return (
    <>
      <Header header={t("citizen.header")} style="font-bold text-md" />
      <div className="w-full md:h-[80%] flex flex-col gap-5">
        <div className="w-full h-1/2 gap-2 flex flex-col md:flex-row">
          <div className="w-full h-full bg-[#00d5605f] border-b-[4px] rounded-t-lg border-b-[#00D560] flex flex-col items-center justify-center">
            <FaRegCheckSquare size={18} />
            <h5 className="text-[#000] text-sm text-center font-semibold mt-1">
              {t("citizen.solved")}{" "}
            </h5>
            {solvedProblemsLoading ? (
              <p>Loading...</p>
            ) : (
              <h4 className="text-[#000] font-extr text-[17px]">
                {solvedProblemsData?.data}
              </h4>
            )}
          </div>
          <div className="w-full md:h-full bg-[#fad0016c] border-b-[4px] rounded-t-lg border-b-[#FAD201] flex flex-col items-center justify-center">
            <PiClockFill size={20} />
            <h5 className="text-[#000] text-sm text-center font-semibold mt-1">
              {t("citizen.unsolved")}
            </h5>
            {unsolvedProblemsLoading ? (
              <p>Loading...</p>
            ) : (
              <h4 className="text-[#000] font-extrabold text-[17px]">
                {unsolvedProblemsData?.data}
              </h4>
            )}
          </div>
        </div>
        <h6 className="w-full px-2 text-center text-sm font-bold leading-4">
          {t("citizen.msg")}
        </h6>
        <div className="w-full flex justify-between px-2">
          <Link
            href={"/app/citizen/problems"}
            className="py-3 w-full md:w-[48%] flex justify-center font-bold rounded-sm text-sm bg-[#00d5605f]"
          >
            {t("citizen.view_prob")}
          </Link>
          <Link
            href={"/app/citizen/suggestions"}
            className="py-3 w-full md:w-[48%] flex justify-center font-bold rounded-sm text-sm bg-[#fad0016c]"
          >
            {t("citizen.view_sugg")}
          </Link>
        </div>
      </div>
    </>
  );
};
export default Activity;
