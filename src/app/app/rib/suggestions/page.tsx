"use client";
import ReportProblems from "@/components/Dashboard/Reports";
import ProblemsTable from "@/components/core/Tables/Problems";
import SuggestionsTable from "@/components/core/Tables/Suggestions";
import { useEffect, useState } from "react";
import { ApiEndpoint } from "@/constants";
import CriticalAlerts from "@/components/Dashboard/CriticalEscalation";
import { TfiReload } from "react-icons/tfi";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [problemsData, setProblemsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const filterData = () => {
    let filtered = problemsData;

    if (selectedDate) {
      filtered = filtered.filter(
        (problem: any) =>
          new Date(problem.date).toLocaleDateString() ===
          new Date(selectedDate).toLocaleDateString(),
      );
    }

    if (selectedStatus) {
      filtered = filtered.filter(
        (problem: any) => problem.status === selectedStatus,
      );
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData(); // Filter the data whenever the selected filters change
  }, [selectedDate, selectedStatus, problemsData]);

  useEffect(() => {
    setLoading(true);
    ApiEndpoint.get("/suggestions/local")
      .then((res) => {
        console.log(res.data?.data);
        if (res.data?.data?.message) {
          setProblemsData([]);
        } else {
          setProblemsData(res.data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="w-full h-[90%] flex items-center justify-between mt-4">
      <div className="w-full md:w-[64%] h-full">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-[1.5rem] font-extrabold">Suggestions</h1>

          <div className="items-end flex justify-end float-end gap-4">
            <input
              type="date"
              value={selectedDate || ""}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border p-2 rounded"
            />

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Select Status</option>
              <option value="escalated">Escalated</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="w-full h-[85%]">
          <SuggestionsTable data={problemsData ?? []} loading={loading} />
        </div>
      </div>
      <div className="w-[34%] h-full hidden md:flex flex-col gap-5">
        <div className="my-2 md:my-0 w-full bg-white rounded-lg px-3">
          <CriticalAlerts />
        </div>
        <div className="my-2 md:my-0 w-full bg-white rounded-lg px-3">
          <ReportProblems />
        </div>
      </div>
    </div>
  );
};

export default Page;
