"use client";

import Activity from "@/components/Dashboard/Activity";
import CustomTable from "@/components/Dashboard/Activity/SummaryTable";

const Page = () => {
  return (
    <section className="w-full md:h-[90%] flex flex-col justify-between pt-4 md:gap-0">
      <div className="w-full h-[47%] flex flex-col md:flex-row justify-between gap-5 md:gap-0">
        <div className="md:w-[32%] bg-white rounded-lg py-3 md:py-0 mt-3 md:mt-0">
          <Activity />
        </div>
        <div className="md:w-[66%] md:h-full bg-white rounded-lg">
          <CustomTable />
        </div>
      </div>
      <div className="w-full md:h-[47%] flex flex-col md:flex-row justify-between">
        <div className="my-2 md:my-0 md:w-[32%] bg-white rounded-lg px-5">
          {/* <EducationContent/> */}
        </div>
        <div className="my-2 md:my-0 md:w-[32%] bg-white rounded-lg px-5">
          {/* <SoldMedicines/> */}
        </div>
        <div className="my-2 md:my-0 md:w-[32%] bg-white rounded-lg px-5">
          {/* <PatientFee/> */}
        </div>
      </div>
    </section>
  );
};

export default Page;
