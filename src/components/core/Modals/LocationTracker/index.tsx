"use client";
import { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { RiUserLocationFill } from "react-icons/ri";
import { FaArrowLeftLong } from "react-icons/fa6";
import LiveMap from "../../Maps";
import { useRouter } from "next/navigation";
type LocationType = {
  longitude: number;
  latitude: number;
}
interface Location {
  problem: any;
  location: LocationType;
}

const ViewMap = ({ setShowMap, location, phone }: { setShowMap: Function;location: any;phone: string }) => {
  const navigate = useRouter();
  return (
    <div className="w-full flex flex-col relative">
      <div className="w-full flex justify-start items-center pl-[10%] absolute left-4 top-5 ">
        <span
          className="px-5 py-4 cursor-pointer"
          onClick={() => setShowMap(false)}
        >
          <FaArrowLeftLong />
        </span>
      </div>
      <div className="w-full h-1/2 ">
        <LiveMap location={location} phone={phone}/>
      </div>
    </div>
  );
};
const ViewLocation = ({
  user,
  location,
  setShowMap,
}: {
  user: string;
  location: string;
  setShowMap: Function;
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-5">
      <RiUserLocationFill size={35} color="#000" />
      <h5 className="font-bold">{user} is located at {location}</h5>
      <button
        className="bg-[#20603D] py-3 px-[7rem] text-white font-bold rounded-lg"
        onClick={() => setShowMap(true)}
      >
        View Map
      </button>
    </div>
  );
};


const LocationTracker = ({ problem, location }: Location) => {
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const fetchLocationAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      return data.display_name; // this returns a formatted address
    } catch (error) {
      console.error("Error fetching location address:", error);
      return null;
    }
  };
  console.log("location", location);
  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchLocationAddress(location.latitude, location.longitude).then(setAddress);
      setTimeout(()=>{
        setLoading(false);
      },3000)
    }
  }, [location]);
  return (
    <div className="w-full h-[55vh] flex flex-col items-center gap-16">
      <h6 className="font-extrabold text-[120%]">
        Tracking Location of {problem?.phoneNumber}
      </h6>
      {loading ? (
        <span className="relative flex h-[10rem] w-[10rem] placeholder:items-center justify-center">
          <span className="animate-ping absolute inline-flex h-[60%] w-[60%] rounded-full bg-[#20603D] opacity-80 inset-y-0"></span>
          <span className="absolute z-50 bg-white flex items-center justify-center rounded-full h-[80%] w-[80%] border-2 inset-y-0 border-[#20603D] cursor-pointer">
            <RiUserLocationFill size={25} color="#20603D" />
          </span>
        </span>
      ) : showMap ? (
        <ViewMap setShowMap={setShowMap} phone={problem?.phoneNumber} location={location}/>
      ) : (
        <ViewLocation user={problem?.phoneNumber} location={address || "Unknown location"} setShowMap={setShowMap} />
      )}
    </div>
  );
};

export default LocationTracker