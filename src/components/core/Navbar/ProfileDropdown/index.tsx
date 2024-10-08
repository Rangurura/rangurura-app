import React, { useEffect, useState } from "react";
import { HiDesktopComputer, HiDotsVertical } from "react-icons/hi";
import { MdPushPin, MdDeleteForever } from "react-icons/md";
import { FaEdit, FaRegCheckCircle } from "react-icons/fa";
import { LuMailCheck } from "react-icons/lu";
import { RiArrowDownSLine } from "react-icons/ri";
import { Modal, Menu, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { setCookie } from "cookies-next";
import { notifications } from "@mantine/notifications";
import { ClipLoader } from "react-spinners";
import { Skeleton } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import personImg from "@/assets/images/personImg.png";
import RedirectionLoader from "@/components/RedirectionLoader";
import { getMyProfile } from "@/utils/funcs/funcs";
import { LogoutIcon } from "../../Icons";

export default function ProfileDropDown({ type }: { type: string }) {
  console.log(type);
  const [redLoad, setRedLoad] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openedLogout, { open: openLogout, close: closeLogout }] =
    useDisclosure(false);
  const [openedReport, { open: openReport, close: closeReport }] =
    useDisclosure(false);
  const [profile, setProfile] = useState({
    imageUrl: "",
    cell: "",
    district: "",
    name: "",
    nationalId: "",
    phoneNumber: "",
    province: "",
    role: "",
    sector: "",
    verified: true,
    village: "",
    office: "",
  });

  const navigate = useRouter();

  useEffect(() => {
    getMyProfile()
      .then((data: any) => {
        console.log("User Profile in Navbar -->", data);
        setProfile(data.data);
        setLoading(false);
      })
      .catch((err: any) => {
        if (err.response.status == 401) {
          notifications.show({
            title: "",
            message:
              err?.response?.data?.error ||
              "Network Error Consider Refreshing The Page",
            color: "#FF555D",
            autoClose: 3000,
          });
        }
        console.log(err);
        setLoading(false);
      });
  }, []);

  const logout = () => {
    setCookie("token", undefined);
    closeLogout();
    setRedLoad(true);
    notifications.show({
      title: "Come Again 👋",
      message: "Successfully Logged out!",
      autoClose: 5000,
      icon: <FaRegCheckCircle />,
    });
    setLoadingLogout(true);
    navigate.push("/");
  };

  const handleReportClick = (path: string) => {
    navigate.push(path);
    closeReport();
  };
  return (
    <>
      {loading ? (
        <Skeleton
          className={
            "w-3/5 h-12 border-2 border-[#ccc] flex items-center justify-evenly md:py-1 py-[0.2rem] px-1 gap-4 rounded-lg cursor-pointer"
          }
        />
      ) : (
        <Menu shadow="md" width={300}>
          <Menu.Target>
            <div className="md:w-3/5 border-2 border-[#ccc] flex items-center justify-evenly md:py-1 py-[0.2rem] px-1 gap-4 rounded-lg cursor-pointer">
              <Image
                src={profile?.imageUrl || personImg}
                alt=""
                className="w-14 h-14 rounded-[100%]"
                width={100}
                height={100}
              />
              <div className="flex-col lg:flex">
                <h6 className="text-[11.4px] font-bold">
                  {profile?.name ?? profile.nationalId ?? "No username"}
                </h6>
                <p className="text-[11.4px] font-bold">
                  {(type === "leader" || type === "organisation") &&
                    profile?.role}
                </p>
              </div>
              <RiArrowDownSLine size={15} />
            </div>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>
              <p className="font-bold">
                Signed in as{" "}
                {profile?.name ?? profile.nationalId ?? "No username"}
              </p>
            </Menu.Item>

            {(type === "leader" || type === "organisation") && (
              <Menu.Item
                key="analytics"
                className="hover:bg-[#ccc]"
                onClick={() => handleReportClick(`/app/${type}/analytics`)}
              >
                General Report
              </Menu.Item>
            )}
            <Menu.Item
              onClick={() => navigate.push(`/app/${type}/settings`)}
              key="system"
              className="hover:bg-[#ccc]"
            >
              System Settings
            </Menu.Item>
            <Menu.Item key="help_and_feedback" className="hover:bg-[#ccc]">
              Help & Feedback
            </Menu.Item>
            <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>

            <Menu.Item
              onClick={openLogout}
              color="red"
              leftSection={
                <MdDeleteForever style={{ width: rem(22), height: rem(22) }} />
              }
            >
              Log out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}

      <Modal opened={openedLogout} onClose={closeLogout}>
        <div className="w-full flex justify-center mb-10 ">
          <LogoutIcon
            width={40}
            height={40}
            fontSize={50}
            style={{ rotate: "180" }}
          />
        </div>
        <h5 className="w-full text-center">Are you sure you want to logout?</h5>
        <div className="flex w-full items-center justify-between px-4 mt-10">
          <button
            onClick={closeLogout}
            className="py-3 px-6 rounded-lg flex items-center justify-center bg-[#ccc] text-black"
          >
            Cancel
          </button>
          <button
            onClick={logout}
            className="py-3 px-6 rounded-lg flex items-center justify-center bg-[#FF0000] text-white"
          >
            {loadingLogout ? (
              <div className="w-full h-full flex justify-center items-center">
                <ClipLoader size={20} color="white" />
              </div>
            ) : (
              "Logout"
            )}
          </button>
        </div>
      </Modal>

      {redLoad && <RedirectionLoader />}
    </>
  );
}
