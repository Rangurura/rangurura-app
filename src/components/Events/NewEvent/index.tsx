import React, { useState } from "react";
import logo from "@/assets/images/logo-dark (1).png";
import Link from "next/link";
import Image from "next/image";
import SelectLevel from "@/components/core/Level";
import { ApiEndpoint } from "@/constants";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { select } from "@nextui-org/theme";
import { categories, organisationLevels } from "@/constants/Enums";
import { Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

const NewEvent = ({ close }: { close: Function }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    descriptions: "",
    endDateTime: "",
    eventName: "",
    location: "",
    organizationLevel: "",
    startDateTime: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "startDateTime" || name === "endDateTime") {
      const formattedDateTime = value.replace("T", " ");

      setFormData((prevState) => ({
        ...prevState,
        [name]: formattedDateTime,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    ApiEndpoint.post("/events/send_event", formData)
      .then((res: any) => {
        // toast.success(
        //   res.data?.data?.message ?? "Announcement sent successfully!",
        // );
        notifications.show({
          title: "Create announcement",
          message: "Successfully sent announcement!",
          autoClose: 5000,
          icon: <FaRegCheckCircle />,
        });

        setFormData({
          category: "",
          descriptions: "",
          endDateTime: "",
          eventName: "",
          location: "",
          organizationLevel: "",
          startDateTime: "",
        });
        close();
      })
      .catch((error: any) => {
        // toast.error("Error occured when creating announcement!");
        notifications.show({
          title: "Create announcement",
          message: "Error occurred when creating announcement!",
          color: "#FF555D",
          autoClose: 5000,
          icon: <RxCrossCircled />,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full h-full bg-white rounded-xl mt-[-2rem]">
      <div className="flex justify-center cursor-pointer">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo"
            width={40}
            height={40}
            className="mt-8"
          />
        </Link>
      </div>
      <h3 className="text-[#001833] font-bold text-2xl text-center">
        Create Announcement
      </h3>
      <div className="w-full flex-col flex justify-center items-center">
        <form
          onSubmit={submit}
          className="w-full flex flex-col gap-2 justify-center md:px-3 px-2 pt-2"
        >
          <div className="main_input">
            <div className="flex-col flex-1">
              <label htmlFor="eventName" className="font-bold">
                Announcement Name
              </label>
              <input
                type="text"
                className="sub_input"
                placeholder="Inama"
                id="eventName"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
              />
            </div>
            <div className="flex-col flex-1">
              <label htmlFor="organisationLevel" className="font-bold">
                Organisation Level
              </label>
              <Select
                value={formData.organizationLevel}
                onChange={(value: any) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    organizationLevel: value,
                  }))
                }
                data={organisationLevels}
              />
            </div>
          </div>
          <div className="main_input">
            <div className="flex-col flex-1">
              <label htmlFor="startDateTime" className="font-bold">
                Start Date and time
              </label>
              <input
                type="datetime-local"
                className="sub_input"
                id="startDateTime"
                name="startDateTime"
                value={formData.startDateTime}
                onChange={handleChange}
                step={1}
              />
            </div>
            <div className="flex-col flex-1">
              <label htmlFor="endDateTime" className="font-bold">
                End Date and time
              </label>
              <input
                type="datetime-local"
                className="sub_input"
                id="endDateTime"
                name="endDateTime"
                value={formData.endDateTime}
                onChange={handleChange}
                step={1}
              />
            </div>
          </div>
          <div className="main_input">
            <div className="flex-col flex-1">
              <label htmlFor="location" className="font-bold">
                Location
              </label>
              <input
                type="text"
                className="sub_input"
                placeholder="Ibiro by'umurenge"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="flex-col flex-1 ">
              <label htmlFor="category" className="font-bold">
                Categories
              </label>
              <Select
                data={categories}
                value={formData.category}
                onChange={(value: any) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    category: value,
                  }))
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-black">Description</label>
            <textarea
              rows={2}
              placeholder="Enter Description"
              className="border-[#C3C3C3] border-2 rounded-md p-2"
              style={{ resize: "none" }}
              name="descriptions"
              value={formData.descriptions}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="btn_primary py-2 rounded-md px-10 text-white"
            >
              {loading ? (
                <ClipLoader color="white" size={20} />
              ) : (
                "Create Announcement"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewEvent;
