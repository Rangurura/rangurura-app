"use client";
import { CiSearch } from "react-icons/ci";
// import
import { VscSettings } from "react-icons/vsc";
import { IoNotifications } from "react-icons/io5";
import { GoPersonAdd } from "react-icons/go";
import { RiArrowDownSLine } from "react-icons/ri";
import personImg from "@/assets/images/personImg.png";
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

interface Props {
  type: "citizen" | "leader" | "organisation";
}

const actions: SpotlightActionData[] = [
  {
    id: "home",
    label: "Home",
    description: "Get to home page",
    onClick: () => console.log("Home"),
    leftSection: (
      <IconHome style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
    ),
  },
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Get full information about current system status",
    onClick: () => console.log("Dashboard"),
    leftSection: (
      <IconDashboard style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
    ),
  },
  {
    id: "documentation",
    label: "Documentation",
    description: "Visit documentation to lean more about all features",
    onClick: () => console.log("Documentation"),
    leftSection: (
      <IconFileText style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
    ),
  },
];

const Navbar = ({ type }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className="w-full h-[10vh] flex flex-col md:flex-row items-center justify-between">
      <div className="w-full md:w-[49%] h-4/5 flex items-center gap-1">
        <div className="w-[95%] h-[85%] relative">
          <input
            placeholder="Search here . . ."
            className="w-[90%] h-[100%] bg-white p-2 pl-8 rounded-md text-[80%] outline-none"
          />
          <CiSearch size={14} className=" absolute top-4 left-1" />
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
      <div className="w-full md:w-[35%] h-4/5 flex items-center justify-center md:justify-end gap-5">
        <button className="w-[2.5rem] h-[2.5rem] rounded-lg flex items-center justify-center bg-[#001833]">
          <IoNotifications color="white" size={18} className="font-extrabold" />
        </button>
        {(type == "leader" || type == "organisation") && (
          <button
            onClick={open}
            className="w-[2.5rem] h-[2.5rem] rounded-lg flex items-center justify-center bg-[#FFF]"
          >
            <GoPersonAdd color="black" size={18} className="font-extrabold" />
          </button>
        )}
        <Link href={`/app/${type}/problems`} className="w-[2.5rem] h-[2.5rem] rounded-lg flex items-center justify-center bg-[#FFF]">
          <Image src={person} alt="" className="w-6 h-6" />
        </Link>
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <div className="md:w-3/5 border-2 border-[#ccc] flex items-center justify-evenly py-2 px-2 gap-4 rounded-lg cursor-pointer">
              <Image
                src={personImg}
                alt=""
                className="w-10 h-10 rounded-[100%]"
              />

              <div className="flex-col hidden lg:flex">
                <h6 className="text-[11.4px] font-bold">Isamaza sylvain</h6>
                {(type == "leader" || type == "organisation") && (
                  <p className="text-[11.4px] font-bold">Kicukiro District</p>
                )}
              </div>
              <RiArrowDownSLine size={15} />
            </div>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="User Actions"
            variant="flat"
            className={"bg-white px-3 py-5"}
          >
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-bold">Signed in as Isamaza sylvain</p>
            </DropdownItem>
            <DropdownItem key="settings" className="hover:bg-[#ccc]">
              My Report
            </DropdownItem>
            <DropdownItem key="analytics" className="hover:bg-[#ccc]">
              General Report
            </DropdownItem>
            <DropdownItem key="system" className="hover:bg-[#ccc]">
              System Settings
            </DropdownItem>
            <DropdownItem key="help_and_feedback" className="hover:bg-[#ccc]">
              Help & Feedback
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              className="hover:bg-[#FF0000] hover:text-white"
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
        <NewLeader />
      </Modal>
    </div>
  );
};
export default Navbar;
