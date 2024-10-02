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
import { ClipLoader } from "react-spinners";

function AcceptDecision({
  problemId,
  close,
}: {
  problemId: string;
  close: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
    ApiEndpoint.put(`/problems/response/accept/${problemId}`)
      .then((response) => {
        if (response.data) {
          notifications.show({
            title: "Success",
            message: "Problem Marked As Solved!",
            type: "success",
            autoClose: 5000,
          });
          close();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((error) => {
        notifications.show({
          title: "Error",
          message: "Failed to mark problem as solved. Please try again.",
          type: "error",
          autoClose: 5000,
        });
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <button className="absolute top-6 right-4" onClick={close}>
        <IoClose size={24} />
      </button>
      <div className="flex flex-col justify-center items-center">
        <h3 className="font-bold text-[#001833] text-lg mb-4">
          Are you sure you want to mark this problem as solved.
        </h3>
        <p className="w-full text-center">This action will mark this problem as solved and no longer a concern to you.</p>
      </div>
      <div className="flex mt-3 justify-center gap-6 items-center">
        <button
            onClick={close}
            className="bg-gray-400 text-white p-2 px-10 rounded-md"
            >
            Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="btn_primary text-white p-2 px-10 rounded-md"
        >
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <ClipLoader size={18} color="white" />
            </div>
          ) : (
            "Accept"
          )}
        </button>
      </div>
    </div>
  );
}

export default AcceptDecision;
