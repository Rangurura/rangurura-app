"use client";
import React, { useState } from "react";
import logo from "@/assets/images/logo.png";
import phone from "@/assets/images/hero.png";
import Link from "next/link";
import menu from "@/assets/images/menu.png";
import closeImg from "@/assets/images/closeF.png";
import Image from "next/image";
import SwitchLanguages from "@/components/core/SwitchLanguage";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const menuLink = [
    { name: "home", link: "#home" },
    { name: "problems", link: "#qns" },
    { name: "contacts", link: "#contacts" },
    { name: "faq", link: "#faqs" },
    { name: "signin", link: "/login" },
    { name: "signup", link: "/register" },
  ];

  const { t, i18n } = useTranslation();

  return (
    <nav className="py-6 w-full bg-[#001833] flex flex-col relative" id="home">
      <div className="header bg-inherit w-full fixed top-0 z-50 px-6">
        <a href="#home" className="flex items-center gap-5">
          <Image src={logo} alt="" className={` cursor-pointer`} />
          <h3 className="text-white font-bold text-xl">RANGURURA</h3>
        </a>
        <div className="md:flex max-[1015px]:hidden items-center flex-row gap-6 p-3">
          {menuLink?.map((menu, i) => (
            <button
              key={i}
              className="homeButton text-white font-[600] hover:text-green-300"
            >
              <Link href={menu?.link}>{t(`website.navbar.${menu.name}`)}</Link>
            </button>
          ))}
          <Link
            href={"/problem"}
            className="flex items-center py-2 rounded font-bold bg-[#D9D9D9] text-[#001833] hover:text-white h-[40px] px-3 hover:bg-yellow-600"
          >
            {t("website.navbar.report_problem")}
          </Link>
          <SwitchLanguages color={"white"} />
        </div>
        <div
          onClick={() => setOpen(!open)}
          className={`z-[999] cursor-pointer ${
            open ? "text-gray-700" : "text-gray-100 cursor-pointer"
          } text-3xl md:hidden m-5`}
        >
          <Image src={menu} className="w-8 h-8" alt="" />
        </div>
        <div
          className={`md:hidden flex flex-col gap-6 p-3 bg-white top-0 duration-100 absolute top-6 right-1 w-2/3 ${
            open ? "flex flex-col" : "hidden"
          }`}
        >
          {menuLink?.map((menu, i) => (
            <button
              key={i}
              className="w-[86px] h-[26px] p-2 rounded font-bold text-[#001833] hover:text-[#36587e]"
            >
              <Link href={menu?.link}>{t(`website.navbar.${menu.name}`)}</Link>
            </button>
          ))}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 left-[-30px]"
          >
            <Image src={closeImg} className="w-5 h-5" alt="" />
          </button>
          <Link
            href={"/problem"}
            className="p-2 rounded font-bold bg-[#D9D9D9] text-[#001833] hover:bg-[#36587e]"
          >
            {t("website.navbar.report_problem")}
          </Link>
          <SwitchLanguages color={"white"} />
        </div>
      </div>
      <div className="search flex flex-row justify-center items-center md:py-1 py-6 mt-[7rem]">
        <div className="flex items-center justify-center relative left-11 p-4 cursor-pointer">
          <ion-icon name="search"></ion-icon>
        </div>
        <input
          type="text"
          placeholder="Search here..."
          className={`block py-3 px-9 rounded w-[538px] h-[45px] border-none focus:border-[#001833]`}
        />
      </div>
      <div className="flex flex-row justify-between px-[10%] md:pt-20 pt-1 gap-40">
        <div className="flex flex-col gap-5">
          <h3 className="text-white font-bold text-4xl">
            Welcome to Rangurura
          </h3>
          <div className="flex flex-col">
            <p className="text-white text-xl leading-[2rem] my-2">
              “Rangurura” is your direct channel to make your voice heard. We
              believe that every citizen's concerns andissues matter. Our
              platform empowers you to report problems, share feedback, and
              request assistance with ease.
            </p>
          </div>
          <Link
            href={"/register"}
            className=" flex items-center justify-center font-semibold bg-[#FAD201] text-[#001833] p-3 rounded-md w-[125px]"
          >
            Sign up
          </Link>
        </div>
        <div className="md:flex hidden md:w-[20%] w-30 min-w-[240px]">
          <Image src={phone} alt="" className="" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
