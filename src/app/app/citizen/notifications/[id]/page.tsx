"use client";
import React, { useEffect, useState } from "react";
import { Modal, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import AppealDecision from "@/components/core/Modals/Appeal";
import { ApiEndpoint } from "@/constants";
import { useParams } from "next/navigation";
import AcceptDecision from "@/components/core/Modals/Decision/AcceptDecision";
import { MdOutlineFileDownload } from "react-icons/md";
import no_data from "@/assets/images/no_data_gif.gif";
import Image from "next/image";
function Page() {
  const [openAppeal, setOpenAppeal] = useState(false);
  const [notification, setNotification] = useState<any>({});
  const [isOpen, { open, close }] = useDisclosure();
  const { id } = useParams();
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    // Simulating an API call
    ApiEndpoint.get(`/problems/answer/${id}`)
      .then((response) => {
        console.log("problem", response.data);
        setNotification(response.data.data);
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching problem", error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, [id]);
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
        `/problems/${notification?.problem?.id}/download?type=${type}`,
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
        notification?.proofUrl !== "null"
          ? String(notification?.problem?.proofUrl)
          : notification?.problem?.recordUrl !== "null"
            ? String(notification?.problem?.recordUrl)
            : notification?.problem?.document ?? "downloaded-file.jpg";
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
    <div className="">
      <h1 className="text-[1.5rem] font-extrabold mt-2">Notification</h1>

      <div className="bg-white p-10 rounded-xl">
        {/* Show Skeleton if loading is true */}
        {loading ? (
          <>
            <Skeleton height={30} width="50%" mb="sm" />
            <Skeleton height={20} width="100%" mb="sm" />
            <Skeleton height={20} width="100%" mb="sm" />
            <Skeleton height={50} width="30%" mt="md" />
          </>
        ) : !notification?.message ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="text-center">
              <Image src={no_data} alt="No Data GIF" />
              <h1 className="text-2xl font-bold">No data found.</h1>
            </div>
          </div>
        ) : (
          <>
            <div className="desc py-4">
              <h1 className="text-xl font-bold">Description</h1>
              <p className="text-md mt-2">{notification?.message}</p>
            </div>
            <div>
              <h1 className="text-xl font-bold">Attached proof</h1>
              <button
                onClick={() => handleDownloadInstructions("record")}
                className="px-3 py-3 bg-[#0075FF] text-white rounded-lg flex items-center gap-1"
              >
                <MdOutlineFileDownload />
                {loadingDwnld.loading && loadingDwnld.type === "record"
                  ? "Downloading . . . "
                  : "Download Record"}
              </button>
            </div>
            <div className="Buttons flex gap-4 my-5">
              {notification?.problem?.status === "REJECTED" && (
                <button
                  type="button"
                  onClick={() => setOpenAppeal(true)}
                  className="bg-orange-400 w-[10rem] px-3 py-3 rounded-lg flex items-center justify-center text-white font-extrabold"
                >
                  Appeal
                </button>
              )}

              <button
                onClick={open}
                type="button"
                className="bg-blue-400 w-[10rem] px-3 py-3 rounded-lg flex items-center justify-center text-white font-extrabold"
              >
                Mark as solved
              </button>
            </div>
          </>
        )}
      </div>

      <Modal
        opened={isOpen}
        onClose={close}
        className="overflow-y-hidden relative"
        size={"lg"}
      >
        <AcceptDecision problemId={notification?.problem?.id} close={close} />
      </Modal>

      <Modal
        opened={openAppeal}
        onClose={() => setOpenAppeal(false)}
        className="overflow-y-hidden relative"
        size={"lg"}
      >
        <AppealDecision
          problemId={notification?.problem?.id}
          close={() => setOpenAppeal(false)}
        />
      </Modal>
    </div>
  );
}

export default Page;
