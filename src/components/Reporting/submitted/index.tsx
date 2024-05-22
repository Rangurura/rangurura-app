import Header from "@/components/Dashboard/Header";
import SubmitReport from "@/components/core/Modals/SubmitReport";
import { reports } from "@/constants";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { FaDownload } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

function SubmittedReports() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className="w-full flex flex-col">
      <Header header="Submitted Reports" />
      {reports.slice(0, 4).map((rep) => {
        return (
          <div className="h-[3rem] flex items-center justify-between px-3  bg-[#EEF3F9] mt-2">
            <h5>{rep.name}</h5>
            {/* <div> */}
            <span className="w-[40px] gap-5 rounded-[20%] flex items-center justify-center">
              <h5 className="text-black text-[80%]">
                <FaEye />
              </h5>
              <h5 className="text-green-600 text-[80%]">
                <FaDownload />
              </h5>
            </span>
            {/* </div> */}
          </div>
        );
      })}

      <div className="w-full flex items-end justify-end float-left gap-3 mb-3">
        <button className=" text-[white] p-2 bg-[#1467C3] text-right mt-5 rounded-md ">
          see More
        </button>
        <button
          className=" text-[white] p-2 bg-[#20603D] text-right mt-5 rounded-md"
          onClick={open}
        >
          Submit New report
        </button>
      </div>
      <Modal opened={opened} onClose={close} size={"lg"}>
        <SubmitReport
          close={close} report={{
            id: undefined,
            name: "",
            nationalId: 0,
            summary: "",
            location: "",
            organizationLevel: "",
            description: ""
          }}        
        />
      </Modal>
    </div>
  );
}

export default SubmittedReports;
