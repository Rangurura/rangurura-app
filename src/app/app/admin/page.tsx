"use client";

import Activity from "@/components/Dashboard/Activity";
import CustomTable from "@/components/Dashboard/Activity/SummaryTable";
import DistrictOverview from "@/components/Dashboard/DistrictsOverview";
import ProblemsCategories from "@/components/Dashboard/ProblemCategories";
import ReportProblems from "@/components/Dashboard/Reports";
import DashboardSkeleton from "@/components/skeleton/DashboardSkeleton";
import { ApiEndpoint } from "@/constants";
import { useEffect, useState } from "react";

const Page = () => {
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
    ApiEndpoint.get("/problems/all")
      .then((res) => {
        console.log(res.data?.data);
        if (res.data?.data?.message) {
          setProblemsData([]);
        } else {
          setProblemsData(res.data?.data?.reverse());
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading2(false));

    ApiEndpoint.get("/suggestions/all")
      .then((res) => {
        console.log(res.data?.data);
        if (res.data?.data?.message) {
          setSuggestionsData([]);
        } else {
          setSuggestionsData(res.data?.data?.reverse());
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading2(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    ApiEndpoint.get("/events/my_events")
      .then((res) => {
        console.log(res.data?.data);
        if (res.data?.data?.message) {
          setEvents([]);
        } else {
          setEvents(res.data?.data?.reverse());
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
        <DashboardSkeleton />
      ) : (
        <section className="w-full md:h-[90%] flex flex-col justify-between md:gap-0 mt-4">
          <div className="w-full h-[47%] flex flex-col md:flex-row justify-between gap-5 md:gap-0">
            <div className="md:w-[32%] bg-white rounded-lg py-3 px-3 md:py-0 mt-3 md:mt-0">
              <Activity />
            </div>
            <div className="md:w-[66%] md:h-full bg-white rounded-lg">
              <CustomTable
                problemsData={problemsData}
                suggestionsData={suggestionsData}
                loading={loading}
              />
            </div>
          </div>
          <div className="w-full md:h-[47%] flex flex-col md:flex-row justify-between">
            <div className="my-2 md:my-0 md:w-[32%] bg-white rounded-lg px-3">
              <ReportProblems />
            </div>
            <div className="my-2 md:my-0 md:w-[32%] bg-white rounded-lg px-3">
              <ProblemsCategories />
            </div>
            <div className="my-2 md:my-0 md:w-[32%] bg-white rounded-lg px-3">
              <DistrictOverview />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Page;
