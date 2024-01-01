import Image from "next/image";
// import expandImg from "@/assets/maximize.png"
import { FaRegCheckSquare } from "react-icons/fa";
import { PiClockFill } from "react-icons/pi";
import { FaRegCalendar } from "react-icons/fa6";
import { GiVote } from "react-icons/gi";

const Activity = () => {
  return (
    <>
      <header className="w-full flex justify-between items-center my-3 mb-5 px-3">
        <h3 className="font-semibold text-[#242222]">Activity Overview</h3>
        {/* <Image src={expandImg} alt='' className='w-3 h-3 cursor-pointer'/> */}
      </header>

      <div className="w-full md:h-[80%] grid grid-cols-2 gap-y-4 gap-x-4 px-3">
        <div className="w-full h-full bg-[#00D56040] border-b-[2px] border-b-[#00D560] rounded-lg flex flex-col items-center justify-center">
          <FaRegCheckSquare size={18} />
          <h5 className="text-[#000] font-semibold mt-1">Solved problems</h5>
          <h4 className="text-[#000] font-extr text-[17px]">{20}</h4>
        </div>
        <div className="w-full md:h-full bg-[#F5292940] border-b-[2px] border-b-[#F52929] rounded-lg flex flex-col items-center justify-center">
          <PiClockFill size={20} />
          <h5 className="text-[#000] font-semibold mt-1">Unsolved problems</h5>
          <h4 className="text-[#000] font-extr text-[17px]">{32}</h4>
        </div>
        <div className="w-full md:h-full bg-[#00A1DE52] border-b-[2px] border-b-[#00A1DE] rounded-lg flex flex-col items-center justify-center">
          <FaRegCalendar size={18} />
          <h5 className="text-[#000] font-semibold mt-1">Events</h5>
          <h4 className="text-[#000] font-extr text-[17px]">{40}</h4>
        </div>
        <div className="w-full md:h-full bg-[#FAD20169] border-b-[2px] border-b-[#FAD201] rounded-lg flex flex-col items-center justify-center">
          <GiVote size={23} />
          <h5 className="text-[#000] font-semibold mt-1">suggestions</h5>
          <h4 className="text-[#000] font-extr text-[17px]">{20}</h4>
        </div>
      </div>
    </>
  );
};
export default Activity;
