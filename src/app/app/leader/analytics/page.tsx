"use client";

import { useEffect, useState } from "react";
import AnalyticTable from "@/components/Dashboard/Analytics";
import DistrictsOverViewTable from "@/components/core/Tables/DistrictsOverview";
import ReportProblems from "@/components/Dashboard/Reports";
import DashboardSkeleton from "@/components/skeleton/DashboardSkeleton";
import { ApiEndpoint } from "@/constants";

const timePeriods = ["daily", "weekly", "monthly", "yearly"];

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("daily");

  const [solvedProblemsCount, setSolvedProblemsCount] = useState(0);
  const [unsolvedProblemsCount, setUnsolvedProblemsCount] = useState(0);
  const [suggestionsCount, setSuggestionsCount] = useState(0);
  const [allProblemsCount, setAllProblemsCount] = useState(0);

  useEffect(() => {
    setLoadingPage(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await ApiEndpoint.get(
          `/leader-dashboard/overview?period=${selectedPeriod}`,
        );

        const data = res?.data?.data;
        console.log("dataaa" + JSON.stringify(data));

        if (data) {
          const problems = data[0]?.problems ?? [];
          const suggestions = data[1]?.suggestions ?? [];

          const approvedProblems = problems.filter(
            (problem: any) => problem.status === "APPROVED",
          );
          const pendingProblems = problems.filter(
            (problem: any) => problem.status === "PENDING",
          );

          setSolvedProblemsCount(approvedProblems.length);
          setUnsolvedProblemsCount(pendingProblems.length);
          setSuggestionsCount(suggestions.length);
          setAllProblemsCount(problems.length);
        } else {
          setSolvedProblemsCount(0);
          setUnsolvedProblemsCount(0);
          setSuggestionsCount(0);
          setAllProblemsCount(0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPeriod]);

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };

  return (
    <>
      {loadingPage ? (
        <DashboardSkeleton />
      ) : (
        <section className="w-full md:h-[90%] flex flex-col justify-between md:gap-0 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h5 className="font-extrabold text-[1.6rem]">
              {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}{" "}
              Analytics
            </h5>
            <div className="flex gap-2">
              {timePeriods.map((period) => (
                <button
                  key={period}
                  onClick={() => handlePeriodChange(period)}
                  className={`px-3 py-1 rounded ${
                    selectedPeriod === period
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-[45%] flex flex-col md:flex-row justify-between gap-5 md:gap-0">
            <div className="md:w-[32%] bg-white rounded-lg py-3 px-3 md:py-0 mt-3 md:mt-0">
              {/* Pass the counts as props to AnalyticTable */}
              <AnalyticTable
                solvedProblemsCount={solvedProblemsCount}
                unsolvedProblemsCount={unsolvedProblemsCount}
                suggestionsCount={suggestionsCount}
                allProblemsCount={allProblemsCount}
                loading={loading}
              />
            </div>
            <div className="md:w-[66%] bg-white rounded-lg py-3 px-3 md:py-0 mt-3 md:mt-0">
              <DistrictsOverViewTable />
            </div>
          </div>

          <div className="w-full md:h-[45%] flex flex-col md:flex-row justify-between">
            <div className="my-2 md:my-0 md:w-[32%] bg-white rounded-lg px-3">
              <ReportProblems />
            </div>
            <div className="my-2 md:my-0 md:w-[32%] bg-white rounded-lg px-3">
              <ReportProblems />
            </div>
            <div className="my-2 md:my-0 md:w-[32%] bg-white rounded-lg px-3">
              <ReportProblems />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Page;
