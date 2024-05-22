"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ApiEndpoint, problems as data } from "@/constants";
import { problemColumns, suggestionColumns } from "@/utils/columns";
import { DataTable } from "@/components/core/data-table";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import { Tooltip, Button } from "@nextui-org/react";
import { FaRegCheckSquare, FaRegEye } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import no_data from "@/assets/images/no_leader.gif";
import { Modal } from "@mantine/core";
import ReportActions from "../../actions/Reports";
import { Report } from "@/typings";
import { FaDownload } from "react-icons/fa6";

const ReportTable = ({
  receivedReport,
  myReport,
  loading,
}: {
  receivedReport: any[];
  myReport: any[];
  loading: boolean;
}) => {
  const [openedReport, setOpenedReport] = useState<Report>();
  const [openV, setOpenV] = useState(false);
  const [activeButton, setActiveButton] = useState("reports");

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

  const commonColumns: ColumnDef<Report>[] = [
    {
      accessorKey: "Name",
      header: ({ column }) => <h4>Report Name</h4>,
      cell: ({ row }) => (
        <h6 className="text-[80%]">
          {row.original.name.toString().length < 30
            ? row.original.name
            : `${row.original.name.slice(0, 38)} . . .`}
        </h6>
      ),
    },
    {
      accessorKey: "Description",
      header: ({ column }) => <h4>Description</h4>,
      cell: ({ row }) => (
        <h6 className="text-[80%]">
          {row.original.description.toString().length < 30
            ? row.original.description
            : `${row.original.description.slice(0, 38)} . . .`}
        </h6>
      ),
    },
    {
      accessorKey: "Location",
      header: ({ column }) => <h4>Location</h4>,
      cell: ({ row }) => (
        <h6 className="text-[80%]">
          {row.original.location.toString().length < 30
            ? row.original.location
            : `${row.original.location.slice(0, 38)} . . .`}
        </h6>
      ),
    },
    {
      accessorKey: "View",
      header: ({ column }) => (
        <div className="cursor-pointer w-full flex justify-end">
          <h5>View</h5>
        </div>
      ),
      cell: ({ row }) => (
        <div
          className="pr-4 w-full flex justify-end cursor-pointer"
          onClick={() => {
            setOpenedReport(row.original);
            setOpenV(true);
          }}
        >
          <FaRegEye />
        </div>
      ),
    },
    {
      accessorKey: "Download",
      header: ({ column }) => (
        <div className="cursor-pointer w-full flex justify-end">
          <h5>Download</h5>
        </div>
      ),
      cell: ({ row }) => (
        <div
          className="pr-4 w-full flex justify-end cursor-pointer text-green-600"
          onClick={() => handleDownload(row.original.id)}
        >
          <FaDownload />
        </div>
      ),
    },
  ];

  const sentReportColumns: ColumnDef<Report>[] = [
    ...commonColumns,
    {
      accessorKey: "Actions",
      header: ({ column }) => <></>,
      cell: ({ row }) => <ReportActions data={row.original} />,
    },
  ];


  return (
    <div className="py-2 px-2">
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
      <div className="w-full flex justify-end items-end">
        <div className="border-b-[1px] my-4 gap-6 ">
          <button
            type="button"
            className={`w-[8rem] uppercase text-sm ${
              activeButton == "received"
                ? "border-b-[3px] border-b-[#20603D] font-bold"
                : ""
            }`}
            onClick={() => setActiveButton("received")}
          >
            Received reports
          </button>
          <button
            type="button"
            className={`w-[8rem] uppercase text-sm ${
              activeButton == "sent"
                ? "border-b-[3px] border-b-[#20603D] font-bold"
                : ""
            }`}
            onClick={() => setActiveButton("sent")}
          >
            My sent reports
          </button>
        </div>
      </div>
      {loading ? (
        <div className="w-full h-full flex justify-center pt-[3rem]">
          <ClipLoader size={24} color="black" />
        </div>
      ) : activeButton == "sent" ? (
        myReport.length == 0 ? (
          <div className="w-full flex flex-col items-center">
            <Image src={no_data} alt="No Data GIF" />
            <h1 className="mt-[1rem] font-bold">No sent reports So Far!</h1>
          </div>
        ) : (
          <DataTable
            allowPagination={true}
            data={myReport.slice(0, 5)}
            columns={sentReportColumns}
            tableClass=""
          />
        )
      ) : receivedReport.length == 0 ? (
        <div className="w-full flex flex-col items-center">
          <Image src={no_data} alt="No Data GIF" />
          <h1 className="mt-[1rem] font-bold">No received reports So Far!</h1>
        </div>
      ) : (
        <DataTable
          allowPagination={true}
          data={receivedReport.slice(0, 5)}
          columns={commonColumns}
          tableClass=""
        />
      )}
    </div>
  );
};
export default ReportTable;
