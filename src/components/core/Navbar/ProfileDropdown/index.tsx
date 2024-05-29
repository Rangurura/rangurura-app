import { MdDeleteForever } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import React, { useState } from "react";
import { Modal, Menu, rem } from "@mantine/core";
import { useRouter } from "next/navigation";
import { Skeleton } from "@nextui-org/react";
import Image from "next/image";
import { RiArrowDownSLine } from "react-icons/ri";
import { useDisclosure } from "@mantine/hooks";
import { setCookie } from "cookies-next";
import { notifications } from "@mantine/notifications";
import { ClipLoader } from "react-spinners";
type Profile = {
  imageUrl: string;
  cell: string;
  district: string;
  name: string;
  nationalId: string;
  phoneNumber: string;
  province: string;
  role: string;
  sector: string;
  verified: boolean;
  village: string;
};
type Props = {
  type: string;
  loading: boolean;
  profile: Profile;
};
import RedirectionLoader from "@/components/RedirectionLoader";
export default function ProfileDropDown({ type, profile, loading }: Props) {
  
  const [redLoad, setRedLoad] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useRouter();
  const logout = () => {
    setCookie("token", undefined);
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

  return (
    <>
      {loading ? (
        <Skeleton
          className={
            "md:w-3/5 h-12 border-2 border-[#ccc] flex items-center justify-evenly md:py-1 py-[0.2rem] px-1 gap-4 rounded-lg cursor-pointer"
          }
        />
      ) : (
        <Menu shadow="md" width={300}>
          <Menu.Target>
            <div className="md:w-3/5 border-2 border-[#ccc] flex items-center justify-evenly md:py-1 py-[0.2rem] px-1 gap-4 rounded-lg cursor-pointer">
              <Image
                src={profile?.imageUrl}
                alt=""
                className="w-14 h-14 rounded-[100%]"
                width={100}
                height={100}
              />
              <div className="flex-col hidden lg:flex">
                <h6 className="text-[11.4px] font-bold">{profile?.name}</h6>
                <p className="text-[11.4px] font-bold">
                  {(type == "leader" || type == "organisation") &&
                    profile?.district}
                </p>
              </div>
              <RiArrowDownSLine size={15} />
            </div>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>
              <p className="font-bold">
                Signed in as{" "}
                <span className="text-[#0075FF] text-right">
                  {profile?.name}
                </span>
              </p>
            </Menu.Item>

            <Menu.Item key="settings" className="hover:bg-[#ccc]">
              My Report
            </Menu.Item>
            <Menu.Item key="analytics" className="hover:bg-[#ccc]">
              General Report
            </Menu.Item>
            <Menu.Item key="system" className="hover:bg-[#ccc]">
              System Settings
            </Menu.Item>
            <Menu.Item key="help_and_feedback" className="hover:bg-[#ccc]">
              Help & Feedback
            </Menu.Item>
            <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>

            <Menu.Item
              onClick={open}
              color="red"
              leftSection={
                <MdDeleteForever style={{ width: rem(22), height: rem(22) }} />
              }
            >
              Log out
            </Menu.Item>
          </Menu.Dropdown>
          <Modal opened={opened} onClose={close}>
            <h5 className="w-full text-center">
              Are you sure you want to logout ?
            </h5>
            <div className="flex w-full items-center justify-between px-4 mt-10">
              <button
                onClick={close}
                className="py-3 px-6 rounded-lg flex items-center justify-center bg-[#ccc] text-black"
              >
                cancel
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
        </Menu>
      )}
      {redLoad && <RedirectionLoader />}
    </>
  );
}
