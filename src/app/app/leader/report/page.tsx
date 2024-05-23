// "use client";
// import Activity from "@/components/Dashboard/Activity/Leader";
// import CustomTable from "@/components/Dashboard/Activity/SummaryTable";
// import DashboardSkeleton from "@/components/skeleton/DashboardSkeleton";
// import { ApiEndpoint } from "@/constants";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import SubmittedReports from "@/components/Reporting/submitted";
// import { FaAngleRight } from "react-icons/fa";
// import EventsTable from "@/components/core/Tables/Events";
// import Link from "next/link";
// import no_data from '@/assets/images/no_leader.gif'
// const Page = () => {
//   const [loading, setLoading] = useState(false);
//   const [events, setEvents] = useState([]);
//   const [problemsData, setProblemsData] = useState([]);
//   const [suggestionsData, setSuggestionsData] = useState([]);
//   const [loading2, setLoading2] = useState(true);
//   const [loadingPage, setLoadingPage] = useState(true);
//   useEffect(() => {
//     setLoadingPage(false);
//   }, []);
//   useEffect(() => {
//     setLoading2(true);
//     ApiEndpoint.get("/problems/local")
//       .then((res) => {
//         console.log(res.data?.data);
//         if (res.data?.data?.message) {
//           setProblemsData([]);
//         } else {
//           setProblemsData(res.data?.data?.reverse());
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .finally(() => setLoading2(false));

//     ApiEndpoint.get("/suggestions/local")
//       .then((res) => {
//         console.log(res.data?.data);
//         if (res.data?.data?.message) {
//           setSuggestionsData([]);
//         } else {
//           setSuggestionsData(res.data?.data?.reverse());
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .finally(() => setLoading2(false));
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     ApiEndpoint.get("/events/mine")
//       .then((res) => {
//         console.log(res.data?.data);
//         if (res.data?.data?.message) {
//           setEvents([]);
//         } else {
//           setEvents(res.data?.data?.reverse());
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }, []);
//   return (
//     <>
//       {loadingPage ? (
//         <DashboardSkeleton />
//       ) : (
//         <section className="w-full md:h-[90%] flex flex-col justify-between md:gap-0 mt-4">
//           <div className="w-full h-[47%] flex flex-col md:flex-row justify-between gap-5 md:gap-0">
//             <div className="md:w-[32%] bg-white rounded-lg py-3 px-3 md:py-0 mt-3 md:mt-0">
//               <Activity />
//             </div>
//             <div className="md:w-[66%] md:h-full bg-white rounded-lg">
//               <CustomTable
//                 problemsData={problemsData}
//                 suggestionsData={suggestionsData}
//                 loading={loading}
//               />
//             </div>
//           </div>
//           <div className="w-full md:h-[47%] flex flex-col md:flex-row justify-between">
//             <div className="my-2 md:my-0 md:w-[32%] bg-white rounded-lg px-3">
//              <SubmittedReports/>
//             </div>
//             <div className="md:w-[66%] md:h-full bg-white rounded-lg">
//             <div className="w-full flex justify-between px-6 items-center">
//               <h1 className="text-2xl w-4/5 font-bold pt-2">Events</h1>
//               <Link
//                 href={"/app/leader/events"}
//                 className="text-sm text-[#0075FF] flex items-center gap-3"
//               >
//                 View More <FaAngleRight />
//               </Link>
//             </div>
//             {events.length > 0 ? (
//               <EventsTable
//                 dataProps={events.slice(0, 5)}
//                 showPagination={false}
//                 styles="h-full"
//               />
//             ) : (
//               <div className="w-full flex flex-col items-center">
//                 <Image src={no_data} alt="No Data GIF" />
//                 <h1 className="mt-[1rem] font-bold">
//                   No Announcements found in your system!
//                 </h1>
//               </div>
//             )}
//             </div>
//           </div>
//         </section>
//       )}
//     </>
//   );
// }

// export default Page;

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
          <SubmittedReports />
        </div>
        <div className="my-2 md:my-0 w-full bg-white rounded-lg px-3">
          <ReportProblems />
        </div>
      </div>
    </div>
  );
};

export default Page;
