"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Event } from "@/typings";
import { events as data } from "@/constants";
import { DataTable } from "@/components/core/data-table";
import { FaRegCheckSquare, FaRegEye } from "react-icons/fa";
import { HiClock } from "react-icons/hi2";
import { useState } from "react";
import { Modal } from "@mantine/core";
import EventsActions from "../../actions/Events";
import { useTranslation } from "react-i18next";

const EventsTable = ({
  dataProps,
  showPagination,
  styles,
}: {
  dataProps?: Event[];
  showPagination?: boolean;
  styles?: string;
}) => {
  const [openedEvent, setOpenedEvent] = useState<Event>();
  const [openV, setOpenV] = useState(false);
  const { t } = useTranslation();
  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "Completed",
      header: ({ column }) => <FaRegCheckSquare color={"#ccc"} />,
      cell: ({ row }) =>
        row.original.completed ? (
          <FaRegCheckSquare color="#00D560" />
        ) : (
          <HiClock color="#FA8701" />
        ),
    },
    {
      accessorKey: "Event Name",
      header: ({ column }) => <h4>{t("citizen.event_name")}</h4>,
      cell: ({ row }) => (
        <h6 className="text-[80%]">
          {row.original.eventName.toString().length < 30
            ? row.original.eventName
            : `${row.original.eventName.slice(0, 58)} . . .`}
        </h6>
      ),
    },
    {
      accessorKey: "Event Description",
      header: ({ column }) => <h4>{t("citizen.event_desc")}</h4>,
      cell: ({ row }) => (
        <h6 className="text-[80%]">
          {row.original.descriptions.toString().length < 30
            ? row.original.descriptions
            : `${row.original.descriptions.slice(0, 58)} . . .`}
        </h6>
      ),
    },
    {
      accessorKey: "Start Date Time",
      header: ({ column }) => <h4>{t("citizen.startDate")}</h4>,
      cell: ({ row }) => (
        <h6 className="text-[80%]">{row.original.startDateTime}</h6>
      ),
    },
    {
      accessorKey: "End Date Time",
      header: ({ column }) => <h4>{t("citizen.endDate")}</h4>,
      cell: ({ row }) => (
        <h6 className="text-[80%]">{row.original.endDateTime}</h6>
      ),
    },
    {
      accessorKey: "Location",
      header: ({ column }) => <h4>{t("citizen.location")}</h4>,
      cell: ({ row }) => (
        <h6 className="text-[80%]">{row.original.location}</h6>
      ),
    },
    {
      accessorKey: "View",
      header: ({ column }) => (
        <div className="cursor-pointer w-full flex justify-end">
          <h5>{t("citizen.view")}</h5>
        </div>
      ),
      cell: ({ row }) => (
        <div
          className="pr-4 w-full flex justify-end cursor-pointer"
          onClick={() => {
            setOpenedEvent(row.original);
            setOpenV(true);
          }}
        >
          <FaRegEye />
        </div>
      ),
    },
    // {
    //   accessorKey: "Duration",
    //   header: ({ column }) => <h4>Duration</h4>,
    //   cell: ({ row }) => <h6 className="text-[80%]">{row.original.duration}</h6>,
    // },
    {
      accessorKey: "Actions",
      header: ({ column }) => <></>,
      cell: ({ row }) => <EventsActions data={row.original} />,
    },
  ];
  return (
    <div className="w-full h-max px-2 bg-white mt-8">
      <Modal opened={openV} onClose={() => setOpenV(false)} size={"lg"}>
        <div className="w-full h-full flex flex-col gap-4 pb-5 pl-5">
          <h3 className="text-[#20603D] font-extrabold text-center text-xl">
            {t("citizen.evnt")}
          </h3>
          <div className="mt-[10px] mx-3">
            <h6>
              <span className="font-extrabold text-md mx-2">
                {t("citizen.event_name")}
              </span>{" "}
              {openedEvent?.eventName}
            </h6>
          </div>
          <div className="mt-[10px] mx-3">
            <h6>
              <span className="font-extrabold text-md mx-2">
                {t("citizen.event_desc")}{" "}
              </span>{" "}
              {openedEvent?.descriptions}
            </h6>
          </div>
          <div className="mt-[10px] mx-3">
            <h6>
              {" "}
              <span className="text-md font-extrabold mx-2">
                {t("problemForm.local")}{" "}
              </span>
              {openedEvent?.organizationLevel}
            </h6>
          </div>
          <div className="mt-[10px] mx-3">
            <h6>
              {" "}
              <span className="font-extrabold text-md mx-2">
                {t("citizen.category")}
              </span>{" "}
              {openedEvent?.category}
            </h6>
          </div>
          <div className="mt-[10px] mx-3">
            <h6>
              {" "}
              <span className="text-md font-extrabold mx-2">
                {t("citizen.startDate")}:
              </span>
              {openedEvent?.startDateTime}
            </h6>
          </div>
          <div className="mt-[10px] mx-3">
            <h6>
              <span className="text-md font-extrabold mx-2">
                {t("citizen.endDate")}:{" "}
              </span>
              {openedEvent?.endDateTime}
            </h6>
          </div>
          <div className="mt-[10px] mx-3">
            <h6>
              {" "}
              <span className="text-md font-extrabold mx-2">
                {t("citizen.location")}{" "}
              </span>
              {openedEvent?.location}
            </h6>
          </div>
        </div>
      </Modal>
      <div className={`${styles} w-full h-[80%]`}>
        <DataTable
          allowPagination={showPagination ?? true}
          data={dataProps ?? data}
          columns={columns}
          tableClass=""
        />
      </div>
    </div>
  );
};
export default EventsTable;
