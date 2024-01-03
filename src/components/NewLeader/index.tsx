import React, { useState } from "react";
import logo from "@/assets/images/logo-dark (1).png";
import Link from "next/link";
import Image from "next/image";

const NewLeader = () => {
  return (
      <div className="bg-white rounded-xl h-full w-full mt-[-2rem]">
        <div className="flex justify-center cursor-pointer">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              width={40}
              height={40}
              className="mt-8"
            />
          </Link>
        </div>
        <h3 className="text-[#001833] font-bold text-2xl text-center">
          Register Leader
        </h3>
        <div className="w-full flex-col flex justify-center items-center">
          <form
            className=" w-full flex flex-col gap-5 justify-center md:px-10 px-6 pt-4"
          >
            <div className="main_input">
              <div className="flex-col flex-1">
                <label htmlFor="id" className="font-bold">Numero y'indangamuntu</label>
                <input
                  type="number"
                  className="sub_input"
                  placeholder="19842389734859"
                  id="id"
                  name="id"
                />
              </div>
            </div>
            <div className="main_input">
              <div className="flex-col flex-1 ">
                <label htmlFor="intara" className="font-bold">Organisation level</label>
                <select
                  name="intara"
                  id="intara"
                  className="sub_input"
                >
                </select>
              </div>
            </div>
            <div className="main_input">
              <div className="flex-col flex-1 ">
                <label htmlFor="akarere" className="font-bold">Categories</label>
                <select
                  name="akarere"
                  id="akarere"
                  className="sub_input"
                >
                </select>
              </div>
            </div>
            <div className="main_input">
              <div className="flex-col flex-1 ">
                <label htmlFor="akagari" className="font-bold">Role</label>
                <select
                  name="akagari"
                  id="akagari"
                  className="sub_input"
                >
                </select>
              </div>
            </div>
            <div className="main_input">
              <div className="flex-col flex-1 ">
                <label htmlFor="umudugudu" className="font-bold">Location</label>
                <select
                  name="umudugudu"
                  id="umudugudu"
                  className="sub_input"
                >
                </select>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button type="button" className="btn_primary py-2 rounded-md px-10 text-white">
                Grant
              </button>
            </div>
          </form>
        </div>

        <div></div>
      </div>
  );
};
export default NewLeader;
