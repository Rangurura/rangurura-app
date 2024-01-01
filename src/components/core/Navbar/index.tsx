"use client"
import { CiSearch } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";
import { IoNotifications } from "react-icons/io5";
import { GoPersonAdd } from "react-icons/go";
import { RiArrowDownSLine } from "react-icons/ri";
import personImg from "@/assets/images/personImg.png"
import Image from "next/image";

const Navbar = ()=>{
    return(
        <div className="w-full h-[10vh] flex items-center justify-between">
            <div className="w-[49%] h-4/5 flex items-center gap-1">
                <div className="w-[95%] h-[85%] relative">
                    <input placeholder="Search here . . ." className="w-[90%] h-[100%] bg-white p-2 pl-8 rounded-md text-[80%] outline-none"/>
                    <CiSearch size={14} className=" absolute top-4 left-1"/>
                </div>
                <button className="w-[2.5rem] h-[2.5rem] rounded-lg flex items-center justify-center bg-[#001833]">
                    <VscSettings color="white" size={18} className="font-extrabold cursor-pointer"/>
                </button>
            </div>
            <div className="w-[35%] h-4/5 flex items-center gap-5">
                <button className="w-[2.5rem] h-[2.5rem] rounded-lg flex items-center justify-center bg-[#001833]">
                    <IoNotifications color="white" size={18} className="font-extrabold"/>
                </button>
                <button className="w-[2.5rem] h-[2.5rem] rounded-lg flex items-center justify-center bg-[#FFF]">
                    <GoPersonAdd color="black" size={18} className="font-extrabold"/>
                </button>
                <button className="w-[2.5rem] h-[2.5rem] rounded-lg flex items-center justify-center bg-[#FFF]">
                    <VscSettings color="black" size={18} className="font-extrabold"/>
                </button>
                <div className="w-3/5 border-2 border-[#ccc] flex items-center justify-evenly py-2 px-2 gap-4 rounded-lg"> 
                    <Image src={personImg} alt="" className="w-8 h-8 rounded-[100%]"/>

                    <div className="flex-col hidden lg:flex">
                        <h6 className="text-[10px] font-bold">Isamaza sylvain</h6>
                        <p className="text-[10px] font-bold">Ministry of health</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar