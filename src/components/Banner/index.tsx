// import { useState, useEffect } from "react";
// import { getCookie, setCookie } from "cookies-next";
// import { IoClose } from "react-icons/io5";

// const Banner = () => {
//     const [showBanner, setShowBanner] = useState(true);

//     useEffect(() => {
//         const cookieValue = getCookie("showbanner");
//         if (cookieValue === "false") {
//             setShowBanner(false);
//         }
//     }, []);

//     const closeBanner = () => {
//         setCookie("showbanner", "false");
//         setShowBanner(false);
//     };

//     return (
//         <div className={`w-[99%] py-4 pl-3 flex flex-col gap-1 items-start justify-start text-justify fixed top-2 left-2 z-50 bg-[#5b9ae1] ${showBanner ? "" : "hidden"}`}>
//             <h1 className="font-bold text-[120%]">Application Migration in Progress 🚀</h1>
//             <h6>We're moving to a new server for better performance. Sorry for the inconvenience. Be back soon! 🛠️</h6>

//             <span className="py-2 px-2 absolute right-7 top-7 cursor-pointer" onClick={closeBanner}>
//                 <IoClose size={17}/>
//             </span>
//         </div>
//     );
// };

// export default Banner;

import { useState, useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const Banner = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const {t} = useTranslation();
        const cookieValue = getCookie("showbanner");
        if (!cookieValue) {
            setShowBanner(true);
        }
    }, []);

    const closeBanner = () => {
        setCookie("showbanner", "false");
        setShowBanner(false);
    };

    return (
        <div className={`banner ${showBanner ? "banner-show" : "banner-hide"}`}>
            <h1 className="font-bold text-[120%]">Application Migration in Progress 🚀</h1>
            <h6>We're moving to a new server for better performance. Sorry for the inconvenience. Be back soon! 🛠️</h6>

            <span className="py-2 px-2 absolute right-7 top-7 cursor-pointer" onClick={closeBanner}>
                <IoClose size={17}/>
            </span>
        </div>
    );
};

export default Banner;
