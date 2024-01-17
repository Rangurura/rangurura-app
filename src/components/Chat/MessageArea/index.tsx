"use client";
import bg from "@/assets/images/background.png";
import { ChatState } from "@/context/ChatContext";
import { Chat } from "@/typings";
import Image from "next/image";
import { useEffect, useState } from "react";

const MessagesArea = () => {
  const { activeChat, setActiveChat } = ChatState();

  return (
    <div className="w-[64%] h-full bg-white rounded-lg chat-area">
      <div className="w-full h-16 rounded-t-[1rem] bg-[#0075FF] flex flex-col items-center justify-center">
        <div className="flex items-start gap-4">
          <Image
            src={activeChat?.image}
            alt={`${activeChat?.user}`}
            className="w-8 h-8"
          />
          <div className="flex gap-2">
            <h5>{activeChat?.user}</h5>
            <h5>{activeChat?.status}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessagesArea;
