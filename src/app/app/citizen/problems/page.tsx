"use client";
import ReportProblemModel from "@/components/Create/Problems";
import ProblemsTable from "@/components/core/Tables/Problems";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { ApiEndpoint } from "@/constants";
import { TfiReload } from "react-icons/tfi";
import { useTranslation } from "react-i18next";
const Page = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [problemsData, setProblemsData] = useState([]);
  const refetchData = async () => {
    setLoading(true);
    try {
      const response = await ApiEndpoint.get("/problems/my/asked");
      console.log("problems ", response);
      if (response.data?.data?.message) {
        setProblemsData([]);
      } else {
        setProblemsData(response?.data?.data);
      }
    } catch (err) {
      console.error("Error fetching problems:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    ApiEndpoint.get("/problems/my/asked")
      .then((res) => {
        console.log(res.data?.data);
        if (res.data?.data?.message) {
          setProblemsData([]);
        } else {
          setProblemsData(res.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="w-full h-screen flex items-center justify-between mt-4">
      <div className="w-full h-full">
        <div className="w-full flex items-start md:items-center justify-between">
          <h1 className="text-[1.5rem] font-extrabold">
            {t("website.navbar.problems")}
          </h1>
          <div className="flex flex-row gap-4">
            <button
              type="button"
              className="bg-[#20603D] flex items-center gap-2 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md"
              onClick={refetchData}
            >
              <TfiReload />
              {t("citizen.refresh")}
            </button>
            <button
              type="button"
              onClick={open}
              className="bg-[#20603D] w-[15rem] px-3 py-3 rounded-lg flex items-center justify-center text-white font-extrabold"
            >
              {t("website.navbar.report_problem")}
            </button>
          </div>
        </div>
        <div className="w-full h-[85%]">
          <ProblemsTable data={problemsData} loading={loading} />
        </div>
        <Modal
          opened={opened}
          onClose={close}
          closeOnClickOutside={false}
          className="overflow-y-hidden relative"
          size={"xl"}
          withCloseButton={false}
        >
          <button className="absolute top-6 right-4" onClick={close}>
            <IoClose size={24} />
          </button>
          <ReportProblemModel />
        </Modal>
      </div>
    </div>
  );
};

export default Page;
