import React from "react";
import frame3 from "../../assets/Frames/Frame 3.png";
import frame4 from "../../assets/Frames/Frame 4.png";
import frame5 from "../../assets/Frames/Frame 5.png";
import heart from "../../assets/images/heart.png";
import Image from "next/image";
import ubumweIcon from "@/assets/images/Handshake.png";
import idIcon from "@/assets/images/prob.png";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";

const Problem = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  const { t, i18n } = useTranslation();
  return (
    <section>
      <div className="bg-white md:h-[70vh] text-black flex flex-col gap-10 items-center p-10 pt-5">
        <h3 className="max-[420px]:text-[30px] font-bold text-[2.4rem] text-[#000000]">
          {t("problem_section.feat_prob")}
        </h3>
        <p className="text-center">{t("problem_section.prob_desc")}</p>
        {/* flex flex-col md:flex-row gap-5 justify-center items-center w-fit md:overflow-auto overflow-hidden */}
        {/* <div className="slider-container w-[95vw]  gap-3 h-[20vh] px-10"> */}
        <div className="flex flex-col md:flex-row gap-5 justify-center items-center w-fit md:overflow-auto overflow-hidden">
          {/* <Slider {...settings}> */}
          <div className="p-4 py-6 border-[1px] rounded-[10px] bg-[#F0F0F0] mr-2">
            <p className="text-[80%]">{t("problem_section.test1")}</p>
            <div className="flex flex-row items-center mt-4">
              <Image
                src={"/assets/images/heart.png"}
                className="w-8 h-8 my-2 "
                alt=""
                width={100}
                height={100}
              />
              <h6 className="font-bold px-4">
                {t("problem_section.case_test1")}
              </h6>
            </div>
          </div>
          <div className="p-4 py-6 border-[1px] rounded-[10px] bg-[#F0F0F0]">
            <p className="text-[80%]">{t("problem_section.test2")}</p>
            <div className="flex flex-row items-center mt-4">
              <Image
                src={"/assets/images/prob.png"}
                className="w-8 h-8 my-2 "
                alt=""
                width={100}
                height={100}
              />
              <h6 className="font-bold px-4">
                {t("problem_section.case_test2")}
              </h6>
            </div>
          </div>
          <div className="p-4 py-6 border-[1px] rounded-[10px] bg-[#F0F0F0]">
            <p className="text-[80%]">{t("problem_section.test3")}</p>
            <div className="flex flex-row items-center mt-4">
              <Image
                src={"/assets/images/Handshake.png"}
                className="w-8 h-8 my-2 "
                alt=""
                width={100}
                height={100}
              />
              <h6 className="font-bold px-4">
                {t("problem_section.case_test3")}
              </h6>
            </div>
          </div>
          <div className="swiper-pagination"></div>
          {/* </Slider> */}
        </div>
      </div>
    </section>
  );
};

export default Problem;
