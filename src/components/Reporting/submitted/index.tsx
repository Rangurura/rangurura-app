import React, { useState } from "react";
import Header from "@/components/Dashboard/Header";
import SubmitReport from "@/components/core/Modals/SubmitReport";
import { ApiEndpoint } from "@/constants";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaDownload, FaEye } from "react-icons/fa";
import { Report } from "@/typings";
import saveAs from "file-saver";
import Image from "next/image"; 
import no_data from "@/assets/images/no_leader.gif"; 

interface SubmittedReportsProps {
  receivedReport: Report[];
  loading: boolean;
}

const handleDownload = async (id: string) => {
  try {
    const response = await ApiEndpoint.get(`/reports/report/download/${id}`, {
      responseType: "blob",
    });
    const blob = new Blob([response.data], { type: response.data.type });
    saveAs(blob, `report_${id}.pdf`);
  } catch (error) {
    console.error("Error downloading the report", error);
  }
};

const SubmittedReports: React.FC<SubmittedReportsProps> = ({
  receivedReport,
  loading,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedReport, setOpenedReport] = useState<Report>();
  const [openV, setOpenV] = useState(false);

  return (
    <div className="w-full flex flex-col">
      <Modal opened={openV} onClose={() => setOpenV(false)} size={"lg"}>
        <div className="w-full h-full flex flex-col gap-4 pb-5 pl-5">
          <h6>Reported By: {openedReport?.nationalId}</h6>
          <p>
            "
            <span className="font-bold font-italic text-justify">
              {openedReport?.name}
            </span>
            "
          </p>
          <p>
            "
            <span className="font-bold font-italic text-justify">
              {openedReport?.description}
            </span>
            "
          </p>
        </div>
      </Modal>
      <Header header="Latest received Reports" />

      {loading ? (
        <div className="w-full h-full flex justify-center pt-[3rem]">
          <p>Loading...</p>
        </div>
      ) : receivedReport.length === 0 ? (
        <div className="w-full flex flex-col items-center">      
          <Image src={no_data} alt="No Data GIF" />
          <h1 className="mt-[1rem] font-bold">No received reports so far!</h1>
        </div>
      ) : (
        receivedReport.slice(0, 4).map((rep) => (
          <div
            key={rep.id}
            className="h-[3rem] flex items-center justify-between px-3 bg-[#EEF3F9] mt-2"
          >
            <h5>{rep.name}</h5>
            <span className="w-[40px] gap-5 rounded-[20%] flex items-center justify-center">
              <h5
                className="text-black text-[80%] hover:cursor-pointer"
                onClick={() => {
                  setOpenedReport(rep);
                  setOpenV(true);
                }}
              >
                <FaEye />
              </h5>
              <h5
                className="text-green-600 text-[80%] hover:cursor-pointer"
                onClick={() => handleDownload(rep.id)}
              >
                <FaDownload />
              </h5>
            </span>
          </div>
        ))
      )}

      <div className="w-full flex items-end justify-end gap-3 mb-3">
        <button
          className="text-white p-2 bg-[#20603D] text-right mt-5 rounded-md"
          onClick={open}
        >
          Submit New Report
        </button>
      </div>

      <Modal opened={opened} onClose={close} size="lg">
        <SubmitReport
          close={close}
          report={{
            id: undefined,
            name: "",
            nationalId: 0,
            summary: "",
            location: "",
            organizationLevel: "",
            description: "",
          }}
        />
      </Modal>
    </div>
  );
};

export default SubmittedReports;
