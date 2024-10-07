"use client";
import DistrictOverview from "@/components/Dashboard/DistrictsOverview";
import ReportProblems from "@/components/Dashboard/Reports";
import ProblemsTable from "@/components/core/Tables/Problems";
import { useEffect, useState } from "react";
import { ApiEndpoint } from "@/constants";
import { TfiReload } from "react-icons/tfi";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai"; // Import icons for collapse/expand

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [problemsData, setProblemsData] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [collapsed, { toggle }] = useDisclosure(true); // Using `useDisclosure` to handle collapse state

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await ApiEndpoint.get("/problems/local");
      if (response.data?.data?.message) {
        setProblemsData([]);
      } else {
        const data = response?.data?.data;
        setProblemsData(data);

        if (filter) {
          const filtered = data.filter((prob: any) => prob.status === filter);
          setFilteredProblems(filtered);
        } else {
          setFilteredProblems(data);
        }
      }
    } catch (err) {
      console.error("Error fetching problems:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  return (
    <div className="w-full h-[90%] flex items-center justify-between mt-4">
      {/* Main content section */}
      <div
        className={`w-full ${
          collapsed ? "md:w-full" : "md:w-[64%]"
        } h-full transition-all duration-500`}
      >
        <div className="w-full flex items-center justify-between">
          <h1 className="text-[1.5rem] font-extrabold">Problems</h1>

          <div className="flex items-center gap-3 relative">
            <button
              type="button"
              className={`${
                filter === ""
                  ? "bg-[#20603D70] text-white"
                  : "bg-white text-black"
              } flex items-center gap-2 font-bold py-2 px-4 rounded-sm`}
              onClick={() => setFilter("")}
            >
              All
            </button>
            <button
              type="button"
              className={`${
                filter === "APPROVED"
                  ? "bg-[#20603D70] text-white"
                  : "bg-white text-black"
              } flex items-center gap-2 font-bold py-2 px-4 rounded-sm`}
              onClick={() => setFilter("APPROVED")}
            >
              Approved
            </button>
            <button
              type="button"
              className={`${
                filter === "PENDING"
                  ? "bg-[#20603D70] text-white"
                  : "bg-white text-black"
              } flex items-center gap-2 font-bold py-2 px-4 rounded-sm`}
              onClick={() => setFilter("PENDING")}
            >
              Pending
            </button>
            <button
              type="button"
              className={`${
                filter === "ESCALATED"
                  ? "bg-[#20603D70] text-white"
                  : "bg-white text-black"
              } flex items-center gap-2 font-bold py-2 px-4 rounded-sm`}
              onClick={() => setFilter("ESCALATED")}
            >
              Escalated
            </button>
            <button
              type="button"
              className="bg-[#20603D] flex items-center gap-2 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md"
              onClick={fetchData} // Refetch data when refreshing
            >
              <TfiReload />
              Refresh
            </button>
            <div className="">
              <button
                className="bg-[#20603D] text-white p-2 rounded-full"
                onClick={toggle}
              >
                {collapsed ? (
                  <AiOutlineLeft size={20} />
                ) : (
                  <AiOutlineRight size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-[85%]">
          {/* Render filtered data */}
          <ProblemsTable data={filteredProblems} loading={loading} />
        </div>
      </div>

      {/* Right section with collapse/expand */}
      <div
        className={`${
          collapsed ? "md:hidden" : "md:w-[34%]"
        } w-[34%] h-full hidden md:flex flex-col gap-5 transition-all duration-500`}
      >
        <div className="my-2 md:my-0 w-full bg-white rounded-lg px-3">
          <DistrictOverview />
        </div>
        <div className="my-2 md:my-0 w-full bg-white rounded-lg px-3">
          <ReportProblems />
        </div>
      </div>

      {/* Toggle button for collapsing/expanding */}
    </div>
  );
};

export default Page;
