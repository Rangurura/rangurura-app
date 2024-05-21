"use client";

import { ColumnDef } from "@tanstack/react-table";
import SortButton from "@/components/core/data-table/sort-button";
import { ApiEndpoint, problems as data } from "@/constants";
import { DataTable } from "@/components/core/data-table";
import { useState, useEffect } from "react";
import { Tooltip, Button } from "@nextui-org/react";
import { FaRegCheckSquare } from "react-icons/fa";
import { MdOutlineTaskAlt } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { RiUserLocationFill } from "react-icons/ri";
import { HiDotsVertical } from "react-icons/hi";
import { HiClock } from "react-icons/hi2";
import ProblemActions from "../../actions/Problems";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import LocationTracker from "../../Modals/LocationTracker";
import TableSkeleton from "../../data-table/TableSkeleton";
import no_data from "@/assets/images/no_data_gif.gif";
import Image from "next/image";
import { FaRegEye } from "react-icons/fa";
import { IoDocumentAttach } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import TextToSpeech from "@/components/TTS";

type Problem = {
  name: string;
  nationalId:number;
  summary:string;
  location: string;
  organizationLevel: string;
  description:string;
};
const ReportsTable = ({
  data,
  loading,
}: {
  data: any[];
  loading: boolean;
}) => {
  const [isOpened, { open, close }] = useDisclosure(false);
  const [openedReport, setOpenedReport] = useState<Problem>();
  const [openV, setOpenV] = useState(false);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "Name",
      header: ({ column }) => <h4>Report Name</h4>,
      cell: ({ row }) => (
        <h6 className="text-[80%]">
          {row.original.name.toString().length < 45
            ? row.original.name
            : `${row.original.name.slice(0, 45)} . . .`}
        </h6>
      ),
    },
    {
        accessorKey: "Description",
        header: ({ column }) => <h4>Report Description</h4>,
        cell: ({ row }) => (
          <h6 className="text-[80%]">
            {row.original.description.toString().length < 45
              ? row.original.description
              : `${row.original.description.slice(0, 45)} . . .`}
          </h6>
        ),
      },
      {
        accessorKey: "Location",
        header: ({ column }) => <h4>Location</h4>,
        cell: ({ row }) => (
          <h6 className="text-[80%]">
            {row.original.location.toString().length < 45
              ? row.original.location
              : `${row.original.location.slice(0, 45)} . . .`}
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
      accessorKey: "Listen",
      header: ({ column }) => <></>,
      cell: ({ row }) => <TextToSpeech text={row.original?.name} />,
    },
    {
      accessorKey: "Actions",
      header: ({ column }) => <></>,
      cell: ({ row }) => <ProblemActions data={row.original} />,
    },
  ];

  return (
    <div className="w-full h-full px-2 mt-8">
      <Modal opened={isOpened} onClose={close} size={"auto"}>
        <LocationTracker username={"David"} location="Kicukiro" />
      </Modal>
      <Modal opened={openV} onClose={() => setOpenV(false)} size={"lg"}>
        <div className="w-full h-full flex flex-col gap-4 pb-5 pl-5">
          <h6>Reported By: {openedReport?.nationalId}</h6>
          <p>
            "
            <span className="font-bold font-italic text-justify">
              {openedReport?.summary}
            </span>
            "
          </p>
        </div>
      </Modal>
      <div className="w-full flex flex-col items-center">
        {loading ? (
          <TableSkeleton columns={columns} />
        ) : data?.length === 0 ? (
          <div className="flex flex-col items-center">
            <Image src={no_data} alt="No Data GIF" />
            <h3 className="mt-[1rem] font-bold">
              No Reports So Far!
            </h3>
          </div>
        ) : (
          <div className="w-full h-max bg-white">
            <DataTable
              allowPagination={true}
              data={data.reverse()}
              columns={columns}
              tableClass=""
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default ReportsTable;
