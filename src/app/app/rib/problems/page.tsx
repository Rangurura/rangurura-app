// "use client";
// import ReportProblems from "@/components/Dashboard/Reports";
// import ProblemsTable from "@/components/core/Tables/Problems";
// import { useEffect, useState } from "react";
// import { ApiEndpoint } from "@/constants";
// import { TfiReload } from "react-icons/tfi";
// import CriticalAlerts from "@/components/Dashboard/CriticalEscalation";

// const Page = () => {
//   const [loading, setLoading] = useState(false);
//   const [problemsData, setProblemsData] = useState([]);
//   const refetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await ApiEndpoint.get("/problems/local");
//       if (response.data?.data?.message) {
//         setProblemsData([]);
//       } else {
//         setProblemsData(response?.data?.data?.reverse());
//       }
//     } catch (err) {
//       console.error("Error fetching problems:", err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     setLoading(true);
//     ApiEndpoint.get("/problems/local")
//       .then((res) => {
//         console.log(res.data?.data);
//         if (res.data?.data?.message) {
//           setProblemsData([]);
//         } else {
//           setProblemsData(res.data?.data?.reverse());
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }, []);
//   return (
//     <div className="w-full h-[90%] flex items-center justify-between mt-4">
//       <div className="w-full md:w-[64%] h-full">
//         <div className="w-full flex items-center justify-between">
//           <h1 className="text-[1.5rem] font-extrabold">Problems</h1>
//           <button
//             type="button"
//             className="bg-[#20603D] flex items-center gap-2 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md"
//             onClick={refetchData}
//           >
//             <TfiReload />
//             Refresh
//           </button>
//         </div>

//         <div className="w-full h-[85%]">
//           <ProblemsTable data={problemsData} loading={loading} />
//         </div>
//       </div>
//       <div className="w-[34%] h-full hidden md:flex flex-col gap-5">
//         <div className="my-2 md:my-0 w-full bg-white rounded-lg px-3">
//           <CriticalAlerts/>
//         </div>
//         <div className="my-2 md:my-0 w-full bg-white rounded-lg px-3">
//           <ReportProblems />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";
import ReportProblems from "@/components/Dashboard/Reports";
import ProblemsTable from "@/components/core/Tables/Problems";
import { useEffect, useState } from "react";
import { ApiEndpoint } from "@/constants";
import { TfiReload } from "react-icons/tfi";
import CriticalAlerts from "@/components/Dashboard/CriticalEscalation";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [problemsData, setProblemsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const refetchData = async () => {
    setLoading(true);
    try {
      const response = await ApiEndpoint.get("/problems/local");
      if (response.data?.data?.message) {
        setProblemsData([]);
      } else {
        setProblemsData(response?.data?.data?.reverse());
      }
    } catch (err) {
      console.error("Error fetching problems:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    ApiEndpoint.get("/problems/local")
      .then((res) => {
        if (res.data?.data?.message) {
          setProblemsData([]);
        } else {
          setProblemsData(res.data?.data?.reverse());
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

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

  return (
    <div className="w-full h-[90%] flex items-center justify-between mt-4">
      <div className="w-full md:w-[64%] h-full">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-[1.5rem] font-extrabold">Problems</h1>

          <div className="items-end flex justify-end float-end gap-4">
            {/* Date Filter */}
            <input
              type="date"
              value={selectedDate || ""}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border p-2 rounded"
            />

            {/* Status Filter */}
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

            <button
              type="button"
              className="bg-[#20603D] flex items-center gap-2 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md"
              onClick={refetchData}
            >
              <TfiReload />
              Refresh
            </button>
          </div>
        </div>

        <div className="w-full h-[85%] mt-4">
          <ProblemsTable
            data={filteredData.length ? filteredData : problemsData}
            loading={loading}
          />
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
