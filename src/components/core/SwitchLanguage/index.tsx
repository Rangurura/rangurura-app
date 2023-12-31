import Image from "next/image";
import English from "@/assets/images/british.png"
import France from "@/assets/images/france.png"
import Rwanda from "@/assets/images/rwanda.png"
import { FiChevronDown } from "react-icons/fi";
import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

export default function SwitchLanguages({ color }: { color: any }) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["English"]));
  const languages = ["English", "Kinyarwanda", "French"];
  const flags = [English, Rwanda, France];


  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <Dropdown>
      <DropdownTrigger>
          <Button
            variant="flat"
            className={`capitalize flex items-center justify-center gap-4 text-[${color}] font-bold bg-[#ccc] rounded-lg p-2`}
          >
            <Image
              src={flags[languages.indexOf(selectedValue)]}
              alt=""
              width={24}
              height={24}
            />
            {selectedValue}
            <FiChevronDown />
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        className="px-5 py-2 bg-white"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
         {languages.map((lang, i) => {
            return (
              <DropdownItem
                key={lang}
                className={`${selectedKeys === new Set([lang]) ? "bg-black" : ""} flex items-center justify-center gap-4`}
              >
                {lang}
              </DropdownItem>
            );
          })}
        {/* <DropdownItem key="text">Text</DropdownItem>
        <DropdownItem key="number">Number</DropdownItem>
        <DropdownItem key="date">Date</DropdownItem>
        <DropdownItem key="single_date">Single Date</DropdownItem>
        <DropdownItem key="iteration">Iteration</DropdownItem> */}
        
      </DropdownMenu>
    </Dropdown>
  );
}
