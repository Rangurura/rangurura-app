"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Problem, Suggestion } from "@/typings";
import { ApiEndpoint, problems as data } from "@/constants";
import { DataTable } from "@/components/core/data-table";
import { useEffect, useState } from "react";
import { FaRegCheckSquare } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { HiClock } from "react-icons/hi2";
import TableSkeleton from "../../data-table/TableSkeleton";
import no_data from "@/assets/images/no_data_gif.gif";
import Image from "next/image";
import SuggestionsActions from "../../actions/Suggestions";
import TextToSpeech from "@/components/TTS";
import { useTranslation } from "react-i18next";

const SuggestionsTable = ({
  data,
  loading,
}: {
  data: any[];
  loading: boolean;
}) => {
  const { t } = useTranslation();
  const columns: ColumnDef<Suggestion>[] = [
    {
      accessorKey: "Description",
      header: ({ column }) => (
        <div className="w-4/5">
          <h4>{t("sidebar.suggestions")}</h4>
        </div>
      ),
      cell: ({ row }) => (
        <h6 className="text-[80%]">
          {row.original?.igitekerezo?.toString().length < 30
            ? row.original?.igitekerezo
            : `${row.original?.igitekerezo?.slice(0, 58)} . . .`}
        </h6>
      ),
    },
    {
      accessorKey: "Completed",
      header: ({ column }) => <FaRegCheckSquare color={"#ccc"} />,
      cell: ({ row }) =>
        row.original.status == "PENDING" ? (
          <HiClock color="#FA8701" />
        ) : (
          <FaRegCheckSquare color="#00D560" />
        ),
    },
    {
      accessorKey: "listen",
      header: ({ column }) => <h3>Listen</h3>,
      cell: ({ row }) => <TextToSpeech text={row.original.igitekerezo} />,
    },
    {
      accessorKey: "Actions",
      header: ({ column }) => <h3>{t("citizen.actions")}</h3>,
      cell: ({ row }) => <SuggestionsActions data={row.original} />,
    },
  ];
  return (
    <div className="w-full h-full flex justify-center  px-2 mt-8">
      {loading ? (
        <div className="w-full h-[80%] bg-white p-2">
          <TableSkeleton columns={columns} />
        </div>
      ) : data?.length == 0 ? (
        <div>
          <Image src={no_data} alt="No Data GIF" />
          <h1 className="mt-[1rem] font-bold">{t("citizen.no_sug")}</h1>
        </div>
      ) : (
        <div className="w-full h-max bg-white">
          <DataTable
            allowPagination={true}
            data={data}
            columns={columns}
            tableClass=""
          />
        </div>
      )}
    </div>
  );
};
export default SuggestionsTable;
