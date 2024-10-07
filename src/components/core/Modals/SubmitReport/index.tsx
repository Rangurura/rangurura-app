"use client";
import { Report } from "@/typings";
import { ApiEndpoint } from "@/constants/index";
import * as React from "react";
import { notifications } from "@mantine/notifications";
import { ClipLoader } from "react-spinners";
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { getTranslatedData } from "@/constants/Enums";
import { Select } from "@mantine/core";
import SelectLevel from "../../Level";

const SubmitReport = ({
  report,
  close,
}: {
  report: Report;
  close: Function;
}) => {
  const [loading, setLoading] = React.useState(false);
  const [level, setLevel] = React.useState("");
  const { organisationLevels } = getTranslatedData();

  const [formData, setFormData] = React.useState({
    descriptions: "",
    organizationLevel: "",
    reportName: "",
    location: level,
  });

  React.useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      location: level,
    }));
  }, [level]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitReport = () => {
    const payload = {
      ...formData,
      location: level,
    };

    setLoading(true);
    ApiEndpoint.post("/reports/send_report", payload)
      .then((res) => {
        notifications.show({
          title: "Send Report",
          message: "Successfully Sent report!",
          autoClose: 5000,
          icon: <FaRegCheckCircle />,
        });
        close();
      })
      .catch((err) => {
        notifications.show({
          title: "Send report",
          message: "Error occurred when sending report!",
          color: "#FF555D",
          autoClose: 5000,
          icon: <RxCrossCircled />,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 items-center">
      <header className="w-full text-center font-extrabold text-lg">
        Send Report
      </header>
      <div className="w-full flex flex-col">
        <div className="my-1">
          <div className="flex-row flex-1">
            <label htmlFor="reportName" className="font-bold">
              Report Name
            </label>
            <input
              type="text"
              className="sub_input"
              placeholder="Raporo"
              id="reportName"
              name="reportName"
              value={formData.reportName}
              onChange={handleChange}
            />
          </div>
        </div>
        <h2 className="mt-3 text-[90%] mb-[-0.71rem] font-bold">Description</h2>
        <textarea
          value={formData.descriptions}
          className="border border-[#ccc] my-3 p-2 text-justify rounded-lg text-[90%] bg-[#f1f6ff] resize-none"
          name="descriptions"
          onChange={handleChange}
        />
        <div className="flex-col flex-1">
          <label htmlFor="organizationLevel" className="font-bold">
            Organisation Level
          </label>
          <Select
            value={formData.organizationLevel}
            onChange={(value: string) =>
              handleSelectChange(value, "organizationLevel")
            }
            data={organisationLevels}
          />
          <div className="my-1"></div>
          <div className="flex-row flex-1">
            <SelectLevel
              organisationCategory="Urwego Rw'Ibanze"
              organisationLevel={formData.organizationLevel}
              setLevel={setLevel}
            />
          </div>
        </div>
        <div className="w-full mt-5 flex justify-between md:px-[10%]">
          <button
            onClick={() => close()}
            className="py-3 px-8 rounded-3xl flex items-center justify-center bg-[#ccc] text-black"
          >
            Cancel
          </button>
          <button
            onClick={submitReport}
            className={`py-3 px-8 rounded-3xl flex items-center justify-center ${
              loading ? "cursor-not-allowed" : ""
            } bg-[#0075FF] text-white`}
          >
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <ClipLoader size={24} color="white" />
              </div>
            ) : (
              "Send report"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitReport;
