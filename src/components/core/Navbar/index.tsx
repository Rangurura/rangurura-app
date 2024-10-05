"use client";
import { CiSearch } from "react-icons/ci";
// import
import { VscSettings } from "react-icons/vsc";
import { IoNotifications } from "react-icons/io5";
import { GoPersonAdd } from "react-icons/go";
import { RiArrowDownSLine } from "react-icons/ri";
import Image from "next/image";
import { rem } from "@mantine/core";
import { Spotlight, SpotlightActionData, spotlight } from "@mantine/spotlight";
import {
  IconHome,
  IconDashboard,
  IconFileText,
  IconSearch,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import NewLeader from "@/components/NewLeader";
import person from "@/assets/images/blckprob.png";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Link from "next/link";
import RedirectionLoader from "@/components/RedirectionLoader";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { getMyProfile } from "@/utils/funcs/funcs";
import { notifications } from "@mantine/notifications";
import { FaRegCheckCircle } from "react-icons/fa";
import { Skeleton } from "@nextui-org/react";
import ProfileDropDown from "./ProfileDropdown";
interface Props {
  type: "citizen" | "leader" | "organisation";
}

const actions: SpotlightActionData[] = [
  {
    id: "home",
    label: "Home",
    description: "Get to home page",
    // onClick: () => console.log("Home"),
    leftSection: (
      <IconHome style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
    ),
  },
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Get full information about current system status",
    // onClick: () => console.log("Dashboard"),
    leftSection: (
      <IconDashboard style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
    ),
  },
  {
    id: "documentation",
    label: "Documentation",
    description: "Visit documentation to lean more about all features",
    // onClick: () => console.log("Documentation"),
    leftSection: (
      <IconFileText style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
    ),
  },
];

const Navbar = ({ type }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <div className="w-full h-[15vh] md:h-[10vh] flex flex-col md:flex-row items-center justify-between mt-[10vh] md:mt-0">
        <div className="w-full md:w-[49%] h-4/5 flex items-center gap-3 gap-1">
          <div className="w-[85%] h-4/5 relative">
            <input
              placeholder="Search here . . ."
              className="w-full h-full bg-white p-2 pl-8 rounded-md text-base outline-none"
            />
            <CiSearch size={20} className="absolute inset-y-0 right-3 top-5" />
          </div>
          <button
            className="w-[2.5rem] h-[2.5rem] rounded-lg flex items-center justify-center bg-[#001833]"
            onClick={spotlight.open}
          >
            <VscSettings
              color="white"
              size={18}
              className="font-extrabold cursor-pointer"
            />
          </button>
        </div>
        <div className="w-full md:w-[35%] h-4/5 flex items-center justify-center md:justify-end gap-5 mt-4 md:mt-0">
          <Link
            href={`/app/${type}/notifications`}
            className="w-[2.5rem] h-[2.5rem] rounded-lg flex items-center justify-center bg-[#001833]"
          >
            <IoNotifications
              color="white"
              size={18}
              className="font-extrabold"
            />
          </Link>
          {(type == "leader" || type == "organisation") && (
            <button
              onClick={open}
              className="w-[2.5rem] h-[2.5rem] rounded-lg flex items-center justify-center bg-[#FFF]"
            >
              <GoPersonAdd color="black" size={18} className="font-extrabold" />
            </button>
          )}
          <Link
            href={`/app/${type}/problems`}
            className="w-[2.5rem] h-[2.5rem] rounded-lg flex items-center justify-center bg-[#FFF]"
          >
            <Image src={person} alt="" className="w-6 h-6" />
          </Link>
          <ProfileDropDown type={type} />
        </div>
        <Spotlight
          actions={actions}
          nothingFound="Nothing found..."
          highlightQuery
          searchProps={{
            leftSection: (
              <IconSearch
                style={{ width: rem(20), height: rem(20) }}
                stroke={1.5}
              />
            ),
            placeholder: "Search...",
          }}
        />
        <Modal opened={opened} onClose={close} size={"lg"}>
          <NewLeader close={close} />
        </Modal>
      </div>
    </>
  );
};
export default Navbar;
