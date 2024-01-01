"use client"

import { ColumnDef } from "@tanstack/react-table"
import SortButton from '@/components/core/data-table/sort-button';
import { Problem } from "@/typings";
import { problems as data } from "@/constants";
import { DataTable } from "@/components/core/data-table";
const columns: ColumnDef<Problem>[] = [
    {
        accessorKey: 'Description',
        header: ({ column }) => <SortButton column={column} name="Description" />,
        cell: ({ row }) => <div>{row.getValue('desciption')}</div>,
    },
    {
        accessorKey: 'Level',
        header: ({ column }) => <SortButton column={column} name="Level" />,
        cell: ({ row }) => <div>{row.getValue('level')}</div>,
    }
]

const CustomTable = ()=>{
    return(
        <div className="w-full h-full">
            <DataTable data={data} columns={columns}/>
        </div>
    )
}
export default CustomTable