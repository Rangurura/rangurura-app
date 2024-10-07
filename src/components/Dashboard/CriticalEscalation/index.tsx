"use client";
import React, { useState } from "react";
import Header from "../Header";
import Image from "next/image";
import { alerts, Alert } from "@/constants";
import ProblemActions from "@/components/core/actions/Problems";
import heart from "@/assets/images/heart.png";
import education from "@/assets/images/education.png";
import hands from "@/assets/images/Handshake.png";
import prob from "@/assets/images/prob.png";
import industry from "@/assets/images/industry.png";

const categoryImages: Record<string, any> = {
  health: heart,
  education: education,
  security: hands,
  environment: industry,
  default: prob,
};

const CriticalAlerts = () => {
  const [activeAlert, setActiveAlert] = useState<string | null>(null);

  const toggleProblemActions = (alertId: string) => {
    setActiveAlert((prevAlert) => (prevAlert === alertId ? null : alertId));
  };

  return (
    <div className="w-full flex flex-col">
      <Header header="Critical alerts from local governance" />

      {alerts.slice(0, 4).map((alrt: any) => {
        const iconSrc = categoryImages[alrt.category] || categoryImages.default;
        return (
          <div
            key={alrt.id}
            className="h-[3rem] flex items-center justify-between px-3 bg-[#EEF3F9] mt-2"
          >
            <div className="flex items-center gap-2">
              <Image
                src={iconSrc}
                alt={`${alrt.category} icon`}
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <h5>{alrt.name}</h5>
            </div>

            <span className="w-[20px] h-[20px] flex items-center justify-center cursor-pointer">
              <ProblemActions
                data={alrt}
                setOpenedProblem={() => {}}
                setOpenView={() => {}}
              />
            </span>
          </div>
        );
      })}

      <button className="w-full text-[#1467C3] text-right mt-5">
        See More
      </button>
    </div>
  );
};

export default CriticalAlerts;
