"use client";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/images/logo-dark (1).png";
import Link from "next/link";
import Image from "next/image";
import upload from "@/assets/images/upload.svg";
import { Provinces, Sectors, Cells, Districts, Villages } from "rwanda";
import { Modal, Select } from "@mantine/core";
import SelectLevel from "@/components/core/Level";
import toast from "react-hot-toast";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { baseURL } from "@/constants";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { getMyProfile } from "@/utils/funcs/funcs";
import { getTranslatedData } from "@/constants/Enums";
import { notifications } from "@mantine/notifications";
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

const CreateSuggestionModel = ({ closeL }: { closeL: Function }) => {
  const navigate = useRouter();
  const {
    organisationLevels,
    categories,
    organisationCategories,
    governmentOrgs,
  } = getTranslatedData();
  const [opened, { open, close }] = useDisclosure(false);
  const [institution, setInstitution] = useState("");
  const [organisationCategory, setOrganisationCategory] = useState<string>("");
  const [organisationLevel, setOrganisationLevel] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [fileName, setFileName] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("");
  const [nationalId, setNationalId] = useState("");

  useEffect(() => {
    getMyProfile().then((data) => {
      setNationalId(data?.data?.nationalId || "");
      setPhoneNumber(data?.data?.phoneNumber || "");
    });
  }, []);
  const submitSuggestion = async (e: any) => {
    e.preventDefault();
    if (!category || !level || !nationalId || !phoneNumber) {
      toast.error("Fill All Fields!");
      return;
    }
    setLoading(true);
    const formData = {
      category: category,
      igitekerezo: suggestion,
      urwego: organisationLevel.toUpperCase(),
      phoneNumber: phoneNumber,
      nationalId: nationalId,
      institutions: institution || "LOCAL",
      location: level,
    };

    try {
      const response = await axios.post(
        `${baseURL}/suggestions/send_idea`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setLoading(false);
      notifications.show({
        title: "Create Suggestion",
        message: response.data?.data?.message,
        autoClose: 5000,
        icon: <FaRegCheckCircle />,
      });
      closeL();
    } catch (err: any) {
      setLoading(false);
      if (err.message === "Network Error") {
        notifications.show({
          title: "Create Suggestion",
          message:
            "Request unable to reach our servers. Slow Network Connection Problem!",
          color: "#FF555D",
          autoClose: 5000,
          icon: <RxCrossCircled />,
        });
      } else {
        notifications.show({
          title: "Create Suggestion",
          message:
            err.response?.data?.error ??
            "An Error Occurred! If it persists contact the support at support@rangurura.com",
          color: "#FF555D",
          autoClose: 5000,
          icon: <RxCrossCircled />,
        });
      }
    }
  };

  return (
    <section className="flex justify-center items-center w-full h-full">
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton
        closeOnClickOutside={false}
      >
        <form
          onSubmit={submitSuggestion}
          className="w-full flex flex-col justify-center py-5 pb-10 gap-2"
        >
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-black">
              Hitamo Ubwoko bw'igitekerezo cyawe{" "}
              <span className="text-red-600">*</span>
            </label>
            <Select
              value={category}
              data={categories}
              onChange={(e: any) => setCategory(e)}
            />
          </div>
          <div className="flex items-center justify-center pt-3">
            <button
              onClick={open}
              className="btn_primary text-white p-2 px-10 rounded-md"
            >
              {loading ? (
                <div className="w-full h-full flex justify-center items-center">
                  <ClipLoader size={18} color="white" />
                </div>
              ) : (
                "Tanga igitekerezo"
              )}
            </button>
          </div>
        </form>
      </Modal>
      <div
        className={`w-full flex flex-col bg-white rounded p-8 items-center justify-center ${
          showUpload ? "gap-2" : "gap-8"
        } gap-8`}
      >
        <div className="flex flex-col justify-center items-center">
          <Link href="/">
            <Image src={logo} alt="" width={60} />
          </Link>
          <h3 className="font-bold text-[#001833] text-2xl">
            Tanga igitekerezo
          </h3>
        </div>
        <div className="w-full flex flex-col justify-center gap-2">
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-black">
              Hitamo aho ushaka kugeza Igitekerezo{" "}
              <span className="text-red-600">*</span>
            </label>
            <Select
              value={organisationCategory}
              onChange={(value: any) => setOrganisationCategory(value)}
              data={organisationCategories}
            />
            {organisationCategory === "Ikigo cya Leta" && (
              <div>
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-black">
                    Hitamo aho ushaka kugeza igitekerezo{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <Select
                    data={governmentOrgs}
                    onChange={(value: any) => setInstitution(value)}
                  />

                  <label className="font-semibold text-black">
                    Hitamo aho ikigo giherereye{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <Select
                    value={organisationLevel}
                    onChange={(value: any) => setOrganisationLevel(value)}
                    data={organisationLevels}
                  />
                </div>
                <SelectLevel
                  organisationCategory="Urwego Rw'Ibanze"
                  organisationLevel={organisationLevel}
                  setLevel={setLevel}
                />
              </div>
            )}
            {organisationCategory === "Urwego Rw'Ibanze" && (
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-black">
                  Hitamo {organisationCategory} ushaka kugeza igitekerezo{" "}
                  <span className="text-red-600">*</span>
                </label>
                <Select
                  value={organisationLevel}
                  onChange={(value: any) => setOrganisationLevel(value)}
                  data={organisationLevels}
                />
              </div>
            )}
            <SelectLevel
              organisationCategory={organisationCategory}
              organisationLevel={organisationLevel}
              setLevel={setLevel}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-black">
              igitekerezo <span className="text-red-600">*</span>
            </label>
            <textarea
              rows={2}
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="Igitekerezo"
              className="border-[#C3C3C3] border-2 rounded-md p-2"
              style={{ resize: "none" }}
            ></textarea>
          </div>
          <div className="flex items-center justify-center pt-3">
            <button
              onClick={open}
              className="btn_primary text-white p-2 px-10 rounded-md"
            >
              Komeza
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateSuggestionModel;
