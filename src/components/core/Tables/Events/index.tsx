"use client";

import { ColumnDef } from "@tanstack/react-table";
import SortButton from "@/components/core/data-table/sort-button";
import { Event } from "@/typings";
import { events as data } from "@/constants";
import { DataTable } from "@/components/core/data-table";
import { useState } from "react";
import { Tooltip, Button } from "@nextui-org/react";
import { FaRegCheckSquare } from "react-icons/fa";
import { MdOutlineTaskAlt } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { RiUserLocationFill } from "react-icons/ri";
import { HiDotsVertical } from "react-icons/hi";
import { HiClock } from "react-icons/hi2";

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
    header: ({ column }) => <h4>Event name</h4>,
    cell: ({ row }) => (
      <h6 className="text-[80%]">
        {row.original.name.toString().length < 30
          ? row.original.name
          : `${row.original.name.slice(0, 58)} . . .`}
      </h6>
    ),
  },
  {
    accessorKey: "Start Date",
    header: ({ column }) => <h4>Start Date</h4>,
    cell: ({ row }) => <h6 className="text-[80%]">{row.original.startDate}</h6>,
  },
  {
    accessorKey: "End Date",
    header: ({ column }) => <h4>End Date</h4>,
    cell: ({ row }) => <h6 className="text-[80%]">{row.original.endDate}</h6>,
  },
  {
    accessorKey: "Location",
    header: ({ column }) => <h4>Location</h4>,
    cell: ({ row }) => <h6 className="text-[80%]">{row.original.location}</h6>,
  },
  {
    accessorKey: "Duration",
    header: ({ column }) => <h4>Duration</h4>,
    cell: ({ row }) => <h6 className="text-[80%]">{row.original.duration}</h6>,
  },
  {
    accessorKey: "Actions",
    header: ({ column }) => <></>,
    cell: ({ row }) => <HiDotsVertical />,
  },
];

const EventsTable = () => {
  return (
    <div className="w-full h-full px-2 bg-white mt-8">
      <div className="w-full h-[80%]">
        <DataTable
          allowPagination={true}
          data={data}
          columns={columns}
          tableClass=""
        />
      </div>
    </div>
  );
};
export default EventsTable;
