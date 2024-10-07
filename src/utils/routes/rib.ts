"use client";
import { BiSolidDashboard } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { GiVote } from "react-icons/gi";
import { MdOutlineDashboard } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { LuSettings } from "react-icons/lu";

export const ribRoutes = [
  {
    icon: MdOutlineDashboard,
    activeIcon: BiSolidDashboard,
    name: "home",
    path: "/app/rib",
  },
  {
    icon: MdOutlineMessage,
    activeIcon: MdMessage,
    name: "problems",
    path: "/app/rib/problems",
  },
  {
    icon: FaRegCalendarAlt,
    activeIcon: FaCalendarAlt,
    name: "calendar",
    path: "/app/rib/calendar",
  },
  {
    icon: GiVote,
    activeIcon: GiVote,
    name: "suggestions",
    path: "/app/rib/suggestions",
  },
  {
    icon: FaRegCalendarCheck,
    activeIcon: BsCalendar2CheckFill,
    name: "events",
    path: "/app/rib/events",
  },
  {
    icon: LuSettings,
    activeIcon: IoSettings,
    name: "settings",
    path: "/app/rib/settings",
  },
];
