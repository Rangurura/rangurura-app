"use client";
import DistrictOverview from "@/components/Dashboard/DistrictsOverview";
import ReportProblems from "@/components/Dashboard/Reports";
import ProblemsTable from "@/components/core/Tables/Problems";
import { useEffect, useState } from "react";
import { ApiEndpoint } from "@/constants";
import { TfiReload } from "react-icons/tfi";
import SubmittedReports from "@/components/Reporting/submitted";
import ReportsTable from "@/components/core/Tables/Reports";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [reportsData, setReportsData] = useState([]);
  const [myReports, setMyreports] = useState([]);

  const refetchData = async () => {
    setLoading(true);
    try {
      const response = await ApiEndpoint.get("reports/get_my_local_reports");
      if (response.data?.data?.message) {
        setReportsData([]);
      } else {
        setReportsData(response?.data?.data?.reverse());
      }
    } catch (err) {
      console.error("Error fetching problems:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    ApiEndpoint.get("reports/get_my_local_reports")
      .then((res) => {
        console.log(res.data?.data);
        if (res.data?.data?.message) {
          setReportsData([]);
        } else {
          setReportsData(res.data?.data?.reverse());
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    setLoading(true);
    ApiEndpoint.get("reports/report")
      .then((res) => {
        console.log(res.data?.data);
        if (res.data?.data?.message) {
          setMyreports([]);
        } else {
          setMyreports(res.data?.data?.reverse());
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
          <h1 className="text-[1.5rem] font-extrabold">Reports</h1>
          {/* <button
            type="button"
            className="bg-[#20603D] flex items-center gap-2 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md"
            onClick={refetchData}
          >
            <TfiReload />
            Refresh
          </button> */}
        </div>

        <div className="w-full h-[85%]">
          <ReportsTable
            receivedReport={reportsData}
            myReport={myReports}
            loading={false}
          />
        </div>
      </div>
      <div className="w-[34%] h-full hidden md:flex flex-col gap-5">
        <div className="my-2 md:my-0 w-full bg-white rounded-lg px-3">
          <SubmittedReports receivedReport={reportsData} loading={false} />
        </div>
        <div className="my-2 md:my-0 w-full bg-white rounded-lg px-3">
          <ReportProblems />
        </div>
      </div>
    </div>
  );
};

export default Page;
