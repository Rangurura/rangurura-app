import { BiSolidDashboard } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { GiVote } from "react-icons/gi";
// import { IoMdNotificationsOutline } from "react-icons/io";

export const leaderRoutes = [
    {
        icon: BiSolidDashboard,
        name: "Ahabanza",
        path: "/app/leader"
    },
    {
        icon: IoPersonOutline,
        name: "Abayobozi",
        path: "/app/leader/leaders"
    },
    {
        icon: MdOutlineMessage,
        name: "Ibibazo",
        path: "/app/leader/problems"
    },
    {
        icon: FaCalendarAlt,
        name: "Ingengabihe",
        path: "/app/leader/calendar"
    },
    {
        icon: GiVote,
        name: "Ibitekerezo",
        path: "/app/leader/suggestions"
    },
    {
        icon: MdOutlineMessage,
        name: "Ganira",
        path: "/app/leader/chat"
    },
    {
        icon: FaRegCalendarCheck,
        name: "Events",
        path: "/app/leader/events"
    },
    {
        icon: IoSettings,
        name: "settings",
        path: "/app/leader/settings"
    }
]