"use client";
import React, { useState } from "react";
import Image from "next/image";
import proof1 from "../../../../../assets/images/personImg.png";
import { Modal } from "@mantine/core";
import { IoClose } from "react-icons/io5";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import logo from "../../../../../assets/images/logo-dark.png";
import { FaRegCircleCheck } from "react-icons/fa6";
import { notifications } from "@mantine/notifications";
import upload from "../../../../../assets/images/upload.svg";
import AppealDecision from "@/components/core/Modals/Appeal";

function Page() {
  const [openAppeal, setOpenAppeal] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  const handleSelectedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      // setSelectedFile(file);
      setFileName(file.name);
      setShowUpload(true);
      notifications.show({
        title: "Upload proof",
        message: "Proof uploaded Successfully!",
        type: "info",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="">
      <h1 className="text-[1.5rem] font-extrabold mt-2">Notifications</h1>
      <div className="bg-white p-10 rounded-xl">
        <div className="desc py-4">
          <h1 className="text-xl font-bold">Description</h1>
          <p className="text-md mt-2">
            Muraho neza, ikibazo cy’umuhanda udakoze wo mu karere ka Ruhnaga
            twagikemuye ubu mwareba niba bimeze neza. Niba bitarakemurwa neza
            mwatubwira.
          </p>
        </div>
        <div>
          <h1 className="text-xl font-bold">Attached proof</h1>
          <div className="images flex gap-4 mt-2">
            <Image src={proof1} alt="proof1" width={250} height={250} />
            <Image src={proof1} alt="proof1" width={250} height={250} />
          </div>
        </div>
        <div className="Buttons flex gap-4 my-5">
          <button
            type="button"
            onClick={() => setOpenAppeal(true)}
            className="bg-orange-400 w-[10rem] px-3 py-3 rounded-lg flex items-center justify-center text-white font-extrabold"
          >
            Appeal
          </button>
          <button
            type="button"
            className="bg-[#20603D] w-[10rem] px-3 py-3 rounded-lg flex items-center justify-center text-white font-extrabold"
          >
            Download
          </button>
          <button
            type="button"
            className="bg-blue-400 w-[10rem] px-3 py-3 rounded-lg flex items-center justify-center text-white font-extrabold"
          >
            Mark as solved
          </button>
        </div>
      </div>

      <Modal
        opened={openAppeal}
        onClose={() => setOpenAppeal(false)}
        className="overflow-y-hidden relative"
        size={"lg"}
      >
        {/* <AppealDecision /> */}
      </Modal>
    </div>
  );
}

export default Page;
