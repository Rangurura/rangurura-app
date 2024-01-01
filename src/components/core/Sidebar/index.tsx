"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { leaderRoutes } from "@/utils/routes/leader";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const path = usePathname();
  const isActive = (route: string): boolean => {
    if (path === route) return true;
    return false;
  };
  return (
    <div className="hidden h-full md:w-[19%] md:flex flex-col pt-12">
      <div className="w-full flex items-center gap-6 px-8">
        <Image src={logo} alt="" />
        <h4 className="text-white font-extrabold text-xl capitalize">
          RANGURURA
        </h4>
      </div>

      <div className="w-full flex flex-col gap-0 mt-8">
        {leaderRoutes.map((route) => {
          return (
            <Link
              href={route.path}
              className={`w-full py-5 flex items-center  text-white gap-7 ${
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
                {route.name}
              </h5>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Sidebar;
