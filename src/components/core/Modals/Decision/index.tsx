"use client";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { Modal } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import logo from "../../../../assets/images/logo-dark.png";
import upload from "../../../../assets/images/upload.svg";
import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import { ApiEndpoint } from "@/constants";
function LeaderDecision({
  problemId,
  close,
  type,
}: {
  problemId: string;
  close: () => void;
  type: any; 
}) {
  const [comment, setComment] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [status, setStatus] = useState("APPROVED");

  const handleSelectedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
    if (file) {
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

  const handleSubmit = async () => {
    if (!comment || !selectedFile) {
      notifications.show({
        title: "Error",
        message: "Please add both a comment and proof.",
        type: "error",
        autoClose: 5000,
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("message", comment);
      formData.append("proof", selectedFile);
      formData.append("status", status);

      const response = ApiEndpoint.post(`/problems/answer/${problemId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if ((await response).data) {
        notifications.show({
          title: "Success",
          message: "Problem decision submitted successfully!",
          type: "success",
          autoClose: 5000,
        });
        close(); 
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to submit decision. Please try again.",
        type: "error",
        autoClose: 5000,
      });
      close();
    }
  };

  return (
    <div>
      <button className="absolute top-6 right-4" onClick={close}>
        <IoClose size={24} />
      </button>
      <div className="flex flex-col justify-center items-center">
        <Link href="/">
          <Image src={logo} alt="" width={50} />
        </Link>
        <h3 className="font-bold text-[#001833] text-2xl mb-4">Decision comment</h3>
      </div>
        {type === "UMUYOBOZI" && (
        <div className="w-full flex flex-col gap-1 mt-3">
          <label className="font-semibold text-black">Status</label>
          <select
            className="border-2 border-[#C3C3C3] rounded-md p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="APPROVED">Approved</option>
            <option value="PENDING">Pending</option>
            <option value="REJECTED">Rejected</option>
            <option value="ESCALATED">Escalated</option>
            <option value="APPEAL">Appeal</option>
          </select>
        </div>
      )}

      {type === "UMUTURAGE" && (
        <div className="w-full flex flex-col gap-1 mt-3">
          <label className="font-semibold text-black">Status</label>
          <select
            className="border-2 border-[#C3C3C3] rounded-md p-2"
            value={status}
            onChange={(e) => setStatus("APPROVED")} 
            disabled
          >
            <option value="APPROVED">Approved</option>
          </select>
        </div>
      )}
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-black">
          Comment{" "}
          <span className="text-red-600 text-sm">* (Maximum Characters: 255)</span>
        </label>
        <textarea
          rows={2}
          maxLength={255}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Description"
          className="border-[#C3C3C3] border-2 rounded-md p-2"
          style={{ resize: "none" }}
        ></textarea>
      </div>
      <div className="w-full flex flex-col gap-1">
        <label className="font-semibold text-black">Proof</label>
        <div
          className={`p-9 rounded-md border-2 ${
            showUpload ? "border-[#294929]" : "border-[#C3C3C3]"
          } w-full flex items-center ${showUpload ? "bg-[#294929]" : ""} justify-center`}
        >
          <label htmlFor="proof" className="cursor-pointer">
            {showUpload ? (
              <FaRegCircleCheck color="white" />
            ) : (
              <Image src={upload} className="w-6 h-6" alt=""></Image>
            )}
          </label>
          <input
            type="file"
            id="proof"
            className="hidden"
            onChange={handleSelectedFile}
          />
        </div>
        {showUpload && (
          <h6 className="w-full text-center font-bold text-[#001833]">
            Uploaded {fileName} as Proof
          </h6>
        )}
      </div>


      <div className="flex flex-col justify-center items-center">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-[#001833] w-[10rem] my-5 px-3 py-3 rounded-lg flex flex-col items-center justify-center text-white font-extrabold"
        >
          Submit Decision
        </button>
      </div>
    </div>
  );
}

export default LeaderDecision;
