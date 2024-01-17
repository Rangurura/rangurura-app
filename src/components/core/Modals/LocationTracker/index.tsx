import { FaPlay } from "react-icons/fa";
import { RiUserLocationFill } from "react-icons/ri";
interface Location {
  username: string;
  location: string;
}

const LocationTracker = ({ username, location }: Location) => {
  return (
    <div className="w-full h-[75vh] flex flex-col items-center gap-16">
      <h6 className="font-extrabold text-[120%]">
        Tracking Location of {username}
      </h6>

      <span className="relative flex h-[10rem] w-[10rem] flex items-center justify-center">
        <span className="animate-ping absolute inline-flex h-[60%] w-[60%] rounded-full bg-[#20603D] opacity-80"></span>
        <span className="absolute z-50 bg-white flex items-center justify-center rounded-full h-[80%] w-[80%] border-2 border-[#20603D] cursor-pointer">
          <span className="absolute z-50 bg-white flex items-center justify-center rounded-full h-[80%] w-[80%] border-2 border-[#20603D] cursor-pointer">
            <RiUserLocationFill size={25} color="#20603D" />
          </span>
        </span>
      </span>
    </div>
  );
};

export default LocationTracker;
