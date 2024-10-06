"use client";
import { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { jwtDecode } from "jwt-decode";
import SortButton from "@/components/core/data-table/sort-button";
import { DataTable } from "@/components/core/data-table";
import { Tooltip, Button } from "@nextui-org/react";
import { FaRegCheckSquare, FaRegEye } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { IoDocumentAttach } from "react-icons/io5";
import { HiClock } from "react-icons/hi2";
import ProblemActions from "../../actions/Problems";
import LocationTracker from "../../Modals/LocationTracker";
import TableSkeleton from "../../data-table/TableSkeleton";
import no_data from "@/assets/images/no_data_gif.gif";
import Image from "next/image";
import TextToSpeech from "@/components/TTS";
import { getCookie } from "cookies-next";
import { getMyProfile } from "@/utils/funcs/funcs";
import { notifications } from "@mantine/notifications";
import { ImBoxRemove } from "react-icons/im";
import { ApiEndpoint } from "@/constants";
import { CgCloseR } from "react-icons/cg";

type Problem = {
  level: string;
  completed: boolean;
  ikibazo: string;
  urwego: string;
  owner: string;
  proofUrl: string;
  recordUrl: string;
  status: string;
  category: string;
  phoneNumber: string;
  document: string;
  id: string;
  longitude: number;
  latitude: number;
};

const ProblemsTable = ({
  data,
  loading,
}: {
  data: any[];
  loading: boolean;
}) => {
  const [openedProblem, setOpenedProblem] = useState<Problem>();
  const [openV, setOpenV] = useState(false);
  const [userType, setUserType] = useState<string>("UMUTURAGE");
  const [user, setUser] = useState({});
  useEffect(() => {
    getMyProfile()
      .then((data: any) => {
        setUser(data.data);
        setUserType(data.data.role);
      })
      .catch((err: any) => {
        if (err.response.status == 401) {
          notifications.show({
            title: "",
            message:
              err?.response?.data?.error ||
              "Network Error Consider Refreshing The Page",
            color: "#FF555D",
            autoClose: 3000,
          });
        }
      });
  }, []);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "Description",
      header: ({ column }) => <h4>Problem Description</h4>,
      cell: ({ row }) => (
        <h6 className="text-[100%]">
          {row.original.ikibazo.toString().length < 45
            ? row.original.ikibazo
            : `${row.original.ikibazo.slice(0, 45)} . . .`}
        </h6>
      ),
    },
    {
      accessorKey: "Completed",
      header: ({ column }) => <FaRegCheckSquare color={"#ccc"} size={24} />,
      cell: ({ row }) =>
        row.original.status === "APPROVED" ? (
          <span className="flex items-center gap-4">
            <FaRegCheckSquare color="#00D560" size={25} /> {row.original.status}
          </span>
        ) : row.original.status === "ESCALATED" ? (
          <span className="flex items-center gap-4">
            <ImBoxRemove color="#20603D" size={23} /> {row.original.status}
          </span>
        ) : row.original.status === "REJECTED" ? (
          <span className="flex items-center gap-4">
            <CgCloseR color="#d42e0b" size={23} /> {row.original.status}
          </span>
        ) : (
          <span className="flex items-center gap-4">
            <HiClock color="#FA8701" size={25} /> {row.original.status}
          </span>
        ),
    },
    {
      accessorKey: "Level",
      header: ({ column }) => <h4>Level</h4>,
      cell: ({ row }) => <h6 className="text-[100%]">{row.original.urwego}</h6>,
    },
    {
      accessorKey: "target",
      header: ({ column }) => <h4>Target</h4>,
      cell: ({ row }) => <h6 className="text-[100%]">{row.original.target}</h6>,
    },
    {
      accessorKey: "Actions",
      header: ({ column }) => <h4>Actions</h4>,
      cell: ({ row }) => (
        <ProblemActions
          setOpenView={setOpenV}
          setOpenedProblem={setOpenedProblem}
          data={row.original}
          type={userType}
        />
      ),
    },
  ];

  const [loadingDwnld, setLoadingDwnld] = useState({
    type: "",
    loading: false,
  });
  const handleDownloadInstructions = async (type: string) => {
    setLoadingDwnld({
      type,
      loading: true,
    });
    try {
      const response = await ApiEndpoint.get(
        `/problems/${openedProblem?.id}/download?type=${type}`,
        {
          responseType: "blob",
        },
      );
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download =
        openedProblem?.proofUrl !== "null"
          ? String(openedProblem?.proofUrl)
          : openedProblem?.recordUrl !== "null"
            ? String(openedProblem?.recordUrl)
            : openedProblem?.document ?? "downloaded-file.jpg";
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setLoadingDwnld({
        type: "",
        loading: false,
      });
    }
  };
  return (
    <div className="w-full h-full px-2 mt-8">
      <Modal opened={openV} onClose={() => setOpenV(false)} size={"lg"}>
        <div className="w-full h-full flex flex-col gap-4 pb-5 pl-5">
          <h6>Reported By: {openedProblem?.owner}</h6>
          <h6 className="mt-[-10px]">
            Phone Number: {openedProblem?.phoneNumber}
          </h6>
          <p>
            "
            <span className="font-bold font-italic text-justify">
              {openedProblem?.ikibazo}
            </span>
            "
          </p>
          <div className="w-full flex flex-col gap-3 items-center">
            {openedProblem?.proofUrl !== "null" ||
            openedProblem?.recordUrl !== "null" ||
            openedProblem?.document !== null ? (
              <>
                <h5 className="flex flex-col items-center gap-2 ">
                  {" "}
                  <IoDocumentAttach color="#0075FF" size={28} /> Problem was
                  sent with attachments{" "}
                </h5>
                <div className="w-full flex gap-3 items-center">
                  {openedProblem?.proofUrl !== "null" && (
                    <button
                      onClick={() => handleDownloadInstructions("proof")}
                      className="px-3 py-3 bg-[#0075FF] text-white rounded-lg flex items-center gap-1"
                    >
                      <MdOutlineFileDownload />
                      {loadingDwnld.loading && loadingDwnld.type === "proof"
                        ? "Downloading . . . "
                        : "Download Proof"}
                    </button>
                  )}
                  {openedProblem?.recordUrl !== "null" && (
                    <button
                      onClick={() => handleDownloadInstructions("record")}
                      className="px-3 py-3 bg-[#0075FF] text-white rounded-lg flex items-center gap-1"
                    >
                      <MdOutlineFileDownload />
                      {loadingDwnld.loading && loadingDwnld.type === "record"
                        ? "Downloading . . . "
                        : "Download Record"}
                    </button>
                  )}
                  {openedProblem?.document !== null && (
                    <button
                      onClick={() => handleDownloadInstructions("document")}
                      className="px-3 py-3 bg-[#0075FF] text-white rounded-lg flex items-center gap-1"
                    >
                      <MdOutlineFileDownload />
                      {loadingDwnld.loading && loadingDwnld.type === "document"
                        ? "Downloading . . . "
                        : "Download Document"}
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                <h5 className="flex flex-col items-center gap-2 ">
                  {" "}
                  <IoDocumentAttach color="#000" size={28} /> Problem was sent
                  with no attachment!{" "}
                </h5>
              </>
            )}
          </div>
        </div>
      </Modal>
      <div className="w-full flex flex-col items-center">
        {loading ? (
          <TableSkeleton columns={columns} />
        ) : data?.length === 0 ? (
          <div className="flex flex-col items-center">
            <Image src={no_data} alt="No Data GIF" />
            <h3 className="mt-[1rem] font-bold">
              No Reported Problems So Far!
            </h3>
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
    </div>
  );
};

export default ProblemsTable;
