"use client";
import React, { useState } from "react";
import logo from "@/assets/images/logo-dark (1).png";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoMdLogIn } from "react-icons/io";
const Login = () => {
  const navigate = useRouter()
  const [loading, setLoading] = useState(false)
  const login = (e:any)=>{
    e.preventDefault()
    toast.success("Logged in successfully",{
      position:"top-right",
      icon: <IoMdLogIn/>
    })

    setTimeout(()=> navigate.push("/app/leader"),3000)
  }
  return (
    <section
      className="flex justify-center items-center bg-[#EEF3F9] h-screen p-10"
      id="login"
    >
      <div className="bg-white p-7 rounded-xl w-full md:w-[60%] max-w-[450px]">
        <div className="flex justify-center cursor-pointer">
          <Link href="/">
            <Image src={logo} alt="Logo" width={40} height={40} />
          </Link>
        </div>
        <h3 className="text-[#001833] font-bold text-2xl text-center">
          Injira
        </h3>
        <form className="flex flex-col justify-center py-6 gap-4" onSubmit={login}>
          <div className="flex flex-col gap-3">
            <p className="text-[#001833] text-base font-semibold">
              Numero y'indangamuntu
            </p>
            <input
              type="text"
              placeholder="123456789123457"
              className="sub_input  rounded-lg px-3"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[#001833] text-base font-semibold ">
              Umubare w'ibanga
            </p>
            <div className=" flex flex-row  justify-start relative">
              <input
                type={"password"}
                placeholder="*************"
                className=" sub_input rounded-lg"
                required
              />
            </div>
          </div>
          <p className="text-end">
            <a href="#" className="text-cyan-600 no-underline">
              wibagiwe ijambobanga?
            </a>
          </p>
          <div className="flex flex-col items-center justify-center gap-3 py-2 font-semibold text-base">
            <button type="submit" className="btn_primary text-white py-3 px-4 w-28 rounded-lg">
              Kwinjira
            </button>
            <p className="text-[#717070] font-medium">
              Ni ubwambere uje?
              <span className="text-cyan-600 ml-2">
                <Link href="/register">Kora konti</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
