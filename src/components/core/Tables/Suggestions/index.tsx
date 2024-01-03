"use client";

import { ColumnDef } from "@tanstack/react-table";
import SortButton from "@/components/core/data-table/sort-button";
import { Problem } from "@/typings";
import { problems as data } from "@/constants";
import { DataTable } from "@/components/core/data-table";
import { useState } from "react";
import { Tooltip, Button } from "@nextui-org/react";
import { FaRegCheckSquare } from "react-icons/fa";
import { MdOutlineTaskAlt } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { RiUserLocationFill } from "react-icons/ri";
import { HiDotsVertical } from "react-icons/hi";
import { HiClock } from "react-icons/hi2";

const columns: ColumnDef<Problem>[] = [
  {
    accessorKey: "Description",
    header: ({ column }) => <h4>Suggestion</h4>,
    cell: ({ row }) => (
      <h6 className="text-[80%]">
        {row.original.description.toString().length < 30
          ? row.original.description
          : `${row.original.description.slice(0, 58)} . . .`}
      </h6>
    ),
  },
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
    accessorKey: "Actions",
    header: ({ column }) => <></>,
    cell: ({ row }) => <HiDotsVertical />,
  },
];

const SuggestionsTable = () => {
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
export default SuggestionsTable;
