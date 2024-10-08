"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { leaderRoutes } from "@/utils/routes/leader";
import { usePathname, useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { MdAccountBox } from "react-icons/md";
import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import toast from "react-hot-toast";
import { Route } from "@/typings";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { setCookie } from "cookies-next";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { FaRegCheckCircle } from "react-icons/fa";
import RedirectionLoader from "@/components/RedirectionLoader";
import { LogoutIcon } from "../Icons";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

interface SidebarProps {
  routes: Route[];
  type: string;
}

const Sidebar: FC<SidebarProps> = ({ routes, type }) => {
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpenMenu, { toggle }] = useDisclosure(false);
  const [redLoad, setRedLoad] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();
  const path = usePathname();
  const isActive = (route: string): boolean => {
    if (path === route) return true;
    return false;
  };

  const logout = () => {
    setLoading(true);
    setRedLoad(true);
    setCookie("token", undefined);
    notifications.show({
      title: "Come Back Again 👋",
      message: "Successfully Logged Out!",
      autoClose: 5000,
      icon: <FaRegCheckCircle />,
    });
    navigate.push("/");
  };

  return (
    <div>
      {/* Mobile Header with Menu Button */}
      <div className="lg:fixed lg:w-full lg:items-end">
        <div className="w-full h-[10vh] flex justify-between items-center fixed top-0 md:hidden bg-[#021428] z-[9999] px-8">
          <Link href={"/"} className="w-full flex items-center gap-6">
            <Image src={logo} alt="Logo" />
          </Link>
          <button className="p-3" onClick={toggle}>
            {isOpenMenu ? (
              <IoMdClose size={20} color="white" />
            ) : (
              <FiMenu size={20} color="white" />
            )}
          </button>
        </div>
        {/* Mobile Sidebar */}
        {isOpenMenu && (
          <div
            className="w-full h-fit bg-[#021428] fixed top-0 left-0 z-[99999] flex flex-col items-start justify-start py-10 md:hidden"
            style={{ zIndex: 99999 }}
          >
            <button onClick={toggle} className="self-end p-4">
              <FiMenu size={20} color="white" />
            </button>
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`w-full py-5 px-10 flex items-center justify-start text-white gap-7 hover:bg-[#5dc58c6e] ${
                  isActive(route.path) ? "bg-[#20603D]" : "bg-transparent"
                }`}
                onClick={toggle}
              >
                {isActive(route.path) ? (
                  <route.activeIcon size={20} />
                ) : (
                  <route.icon size={20} />
                )}
                <h5 className={isActive(route.path) ? "font-bold" : ""}>
                  {t(`sidebar.${route.name}`)}
                </h5>
              </Link>
            ))}
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden h-full md:w-[19%] md:flex flex-col pt-12">
          <Link
            href={`/app/${type.toLowerCase()}`}
            className="w-full flex items-center gap-6 px-8"
          >
            <Image src={logo} alt="Logo" />
            <h4 className="text-white font-extrabold text-xl capitalize">
              RANGURURA
            </h4>
          </Link>

          <div className="w-full flex flex-col gap-0 mt-8">
            {routes.map((route: any) => (
              <Link
                key={route.path}
                href={route.path}
                className={`lg:w-full w-full md:w-[250px] py-5 flex items-center text-white gap-7 hover:bg-[#5dc58c6e] ${
                  isActive(route.path)
                    ? "border-l-[3px] border-l-[#FFF] bg-[#20603D] px-9"
                    : "px-10"
                }`}
              >
                {isActive(route.path) ? (
                  <route.activeIcon size={20} />
                ) : (
                  <route.icon size={20} />
                )}
                <h5 className={isActive(route.path) ? "font-bold" : ""}>
                  {t(`sidebar.${route.name}`)}
                </h5>
              </Link>
            ))}

            <Link
              href={
                type == "leader"
                  ? "/app/leader/profile"
                  : "/app/citizen/profile"
              }
              className={`w-full py-5 flex items-center  text-white gap-7 mt-[5rem] hover:bg-[#5dc58c6e] ${
                isActive("/app/leader/profile")
                  ? "border-l-[3px] border-l-[#FFF] bg-[#20603D] px-9"
                  : "px-10"
              }`}
            >
              <MdAccountBox size={20} />
              <h5>{t("sidebar.my_account")}</h5>
            </Link>

            <button
              onClick={open}
              className={`w-full py-5 flex items-center  text-white gap-7 px-10 hover:bg-red-500`}
            >
              <CiLogout size={20} />
              <h5>{t("sidebar.logout")}</h5>
            </button>

            <Modal opened={opened} onClose={close} size={"sm"}>
              <div className="w-full flex justify-center mb-10 ">
                <LogoutIcon
                  width={40}
                  height={40}
                  fontSize={50}
                  style={{ rotate: "180" }}
                />
              </div>
              <h5 className="w-full text-center">
                Are you sure you want to logout?
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
                  {loading ? (
                    <div className="w-full h-full flex justify-center items-center px-5">
                      <ClipLoader size={24} color="white" />
                    </div>
                  ) : (
                    "Logout"
                  )}
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>

      {redLoad && <RedirectionLoader />}
    </div>
  );
};

export default Sidebar;
