"use client"
import ReportProblemModel from "@/components/Create/Problems";
import DistrictOverview from "@/components/Dashboard/DistrictsOverview";
import ReportProblems from "@/components/Dashboard/Reports";
import ProblemsTable from "@/components/core/Tables/Problems";
import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoClose } from "react-icons/io5";

const Page = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="w-full h-[90%] flex items-center justify-between mt-4">
      <div className="w-full h-full">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-[1.5rem] font-extrabold">Problems</h1>
          <button
          type="button"
          onClick={open}
          className="bg-[#20603D] w-[15rem] px-3 py-3 rounded-lg flex items-center justify-center text-white font-extrabold"
        >
          Report New Problem
        </button>
        </div>
        <div className="w-full h-[85%]">
          <ProblemsTable />
        </div>
        <Modal
        opened={opened}
        onClose={close}
        h={"100vh"}
        closeOnClickOutside={false}
        className="overflow-y-hidden relative"
        size={"xl"}
        withCloseButton={false}
      >
        <button className="absolute top-6 right-4" onClick={close}>
          <IoClose size={24}/>
        </button>
        <ReportProblemModel closeL={close}/>
      </Modal>
      </div>
    </div>
  );
};

export default Page;
