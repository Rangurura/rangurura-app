"use client";
import { FaRegCheckSquare } from "react-icons/fa";
import { PiClockFill } from "react-icons/pi";
import { FaRegCalendar } from "react-icons/fa6";
import { GiVote } from "react-icons/gi";
import { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Header from "@/components/Dashboard/Header";
import { useGet } from "@/utils/funcs/useGet";
import { useRouter } from "next/navigation";

type useGetResp = {
  data: any;
  loading: boolean;
};

const Activity = () => {
  const {
    data: solvedProblemsData,
    loading: solvedProblemsLoading,
  }: useGetResp = useGet({
    src: "/leader-dashboard/number_of_approved_probs",
  });

  const {
    data: unsolvedProblemsData,
    loading: unsolvedProblemsLoading,
  }: useGetResp = useGet({ src: "/leader-dashboard/number_of_pending_probs" });

  const { data: suggestionsData, loading: suggestionsLoading }: useGetResp =
    useGet({
      src: "/leader-dashboard/number_of_suggestions",
    });

  const { data: allProbData, loading: allProbLoading }: useGetResp = useGet({
    src: "/leader-dashboard/number_of_probs",
  });

  const router = useRouter();

  return (
    <>
      {/* <Header header="Activity Overview" /> */}
      <h2 className="text-md font-bold py-5">Overview</h2>
      <div className="w-full md:h-[75%] grid grid-cols-1 gap-y-4 gap-x-4">
        <div
          className="w-full h-full p-4 bg-blue-200 border-b-4 border-blue-600 flex justify-between items-center rounded-t-lg hover:cursor-pointer"
          onClick={() => router.push(`/app/leader/problems`)}
        >
          <div className="flex items-center space-x-2">
            <FaRegCalendar size={18} className="text-blue-600" />
            {allProbLoading ? (
              <p className="text-black">...</p>
            ) : (
              <h4 className="text-black font-extrabold text-lg">
                {allProbData?.data?.data ?? 0}
              </h4>
            )}
            <h5 className="text-black font-semibold">All problems</h5>
          </div>
          <MdOutlineKeyboardArrowRight size={20} className="text-black" />
        </div>
        <div
          className="w-full h-full p-4 bg-green-200 border-b-4 border-green-600 flex justify-between items-center rounded-t-lg hover:cursor-pointer"
          onClick={() => router.push("/problems")}
        >
          <div className="flex items-center space-x-2">
            <FaRegCheckSquare size={18} className="text-green-600" />
            {solvedProblemsLoading ? (
              <p className="text-black">...</p>
            ) : (
              <h4 className="text-black font-extrabold text-lg">
                {solvedProblemsData?.data?.data ?? 0}
              </h4>
            )}
            <h5 className="text-black font-semibold">Solved problems</h5>
          </div>
          <MdOutlineKeyboardArrowRight size={20} className="text-black" />
        </div>
        <div
          className="w-full h-full p-4 bg-red-200 border-b-4 border-red-600 flex justify-between items-center rounded-t-lg hover:cursor-pointer"
          onClick={() => router.push(`/app/leader/problems`)}
        >
          <div className="flex items-center space-x-2">
            <PiClockFill size={20} className="text-red-600" />
            {unsolvedProblemsLoading ? (
              <p className="text-black">...</p>
            ) : (
              <h4 className="text-black font-extrabold text-lg">
                {unsolvedProblemsData?.data?.data ?? 0}
              </h4>
            )}
            <h5 className="text-black font-semibold">Unsolved problems</h5>
          </div>
          <MdOutlineKeyboardArrowRight size={20} className="text-black" />
        </div>
        <div
          className="w-full h-full p-4 bg-yellow-200 border-b-4 border-yellow-600 flex justify-between items-center rounded-t-lg hover:cursor-pointer"
          onClick={() => router.push(`/app/leader/suggestions`)}
        >
          <div className="flex items-center space-x-2">
            <GiVote size={23} className="text-yellow-600" />
            {suggestionsLoading ? (
              <p className="text-black">...</p>
            ) : (
              <h4 className="text-black font-extrabold text-lg">
                {suggestionsData?.data ?? 0}
              </h4>
            )}
            <h5 className="text-black font-semibold">Suggestions</h5>
          </div>
          <MdOutlineKeyboardArrowRight size={20} className="text-black" />
        </div>
      </div>
    </>
  );
};

export default Activity;
