"use client";

import { ColumnDef } from "@tanstack/react-table";
import SortButton from "@/components/core/data-table/sort-button";
import { Problem } from "@/typings";
import { problems as data } from "@/constants";
import { DataTable } from "@/components/core/data-table";
import { useState } from "react";
const columns: ColumnDef<Problem>[] = [
  {
    accessorKey: "Description",
    header: ({ column }) => <SortButton column={column} name="Description" />,
    cell: ({ row }) => <div>{row.original.description.slice(0, 18)}</div>,
  },
  {
    accessorKey: "Level",
    header: ({ column }) => <SortButton column={column} name="Level" />,
    cell: ({ row }) => <div>{row.original.level}</div>,
  },
];

const CustomTable = () => {
  const [activeButton, setActiveButton] = useState("events")
  return (
    <div className="w-full h-full px-2">
        
        <div className="w-full border-b-[1px] my-4 flex">
            <button type="button" className={`w-[8rem] ${activeButton == "events" ? "border-b-[1px] border-b-[#20603D]":""}`} onClick={()=> setActiveButton("events")}>Events</button>
            <button type="button" className={`w-[8rem] ${activeButton == "problems" ? "border-b-[1px] border-b-[#20603D]":""}`} onClick={()=> setActiveButton("problems")}>Problems</button>
            <button type="button" className={`w-[8rem] ${activeButton == "suggestions" ? "border-b-[1px] border-b-[#20603D]":""}`} onClick={()=> setActiveButton("suggestions")}>Suggestions</button>
        </div>
      <DataTable allowPagination={false} data={data} columns={columns} tableClass=""/>
    </div>
  );
};
export default CustomTable;
