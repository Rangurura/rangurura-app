import Image from "next/image"
import { GoPerson } from "react-icons/go";
import { SlLocationPin } from "react-icons/sl";

const Leader = ({profile}:any)=>{
    return(
        <div className="w-full md:h-[85%] rounded-lg flex flex-col items-center gap-2 bg-white justify-start px-3 pt-2">
            <Image src={profile.image} alt="" className="w-full h-[50%] rounded-lg "/>
            <h6 className="text-left w-full font-bold text-black">{profile.name}</h6>
            <h6 className="text-left w-full font-bold text-black flex gap-3 items-center">
                <GoPerson/>
                {profile.position}
            </h6>
            <h6 className="text-left w-full font-bold text-black flex gap-3 items-center">
                <SlLocationPin/>
                {profile.address.district}
            </h6>

            <div className="w-full flex justify-between items-center">
                <button type="button" className="self-start bg-[#0075FF] rounded-lg py-2 px-3 text-white">Message</button>
                <button type="button" className="self-start bg-[#20603D] rounded-lg py-2 px-3 text-white">Profile</button>
            </div>
        </div>
    )
}

export default Leader