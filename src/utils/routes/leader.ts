"use client";
import { BiSolidDashboard } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { GiVote } from "react-icons/gi";

import { MdOutlineDashboard } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { LuSettings } from "react-icons/lu";

export const leaderRoutes = [
  {
    icon: MdOutlineDashboard,
    activeIcon: BiSolidDashboard,
    name: "Ahabanza",
    path: "/app/leader",
  },
  {
    icon: IoPersonOutline,
    activeIcon: IoPersonSharp,
    name: "Abayobozi",
    path: "/app/leader/leaders",
  },
  {
    icon: MdOutlineMessage,
    activeIcon: MdMessage,
    name: "Ibibazo",
    path: "/app/leader/problems",
  },
  {
    icon: FaRegCalendarAlt,
    activeIcon: FaCalendarAlt,
    name: "Ingengabihe",
    path: "/app/leader/calendar",
  },
  {
    icon: GiVote,
    activeIcon: GiVote,
    name: "Ibitekerezo",
    path: "/app/leader/suggestions",
  },
  {
    icon: MdOutlineMessage,
    activeIcon: MdMessage,
    name: "Ganira",
    path: "/app/leader/chat",
  },
  {
    icon: FaRegCalendarCheck,
    activeIcon: BsCalendar2CheckFill,
    name: "Announcements",
    path: "/app/leader/events",
  },
  {
    icon: LuSettings,
    activeIcon: IoSettings,
    name: "Igenamiterere",
    path: "/app/leader/settings",
  },
];
