"use client";

import React, { useState } from "react";
import logo from "@/assets/images/logo-dark (1).png";
import Link from "next/link";
import Image from "next/image";
import { Districts, Provinces, Sectors, Cells, Villages } from "rwanda";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const Register = () => {
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword,setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nationalId: "",
    password: "",
    cpassword: "",
    phoneNumber: "",
    province: "",
    district: "",
    sector: "",
    cell: "",
    village: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);

    // axios.post("http://192.168.1.101:5000/api/v1/users/register", formData)
    // .then(res=>{
    //     setLoading(false)
    //     if(res.data.status){
    //       localStorage.setItem("number", formData.phoneNumber)
    //       toast.success(res.data.data.data);
    //       setTimeout(()=> navigate.push("/register/verify"),3000);
    //     }
    //   })
    //   .catch((err:any)=>{
    //     setLoading(false)
    //     console.log("error occured: ", err)
    //   })
    setTimeout(() => {
      setLoading(false);
      navigate.push("/register/verify");
    }, 3000);
  };
  return (
    <section className="flex justify-center w-full bg-[#EEF3F9] h-full p-10">
      <div className="bg-white rounded-xl md:w-[60%] max-w-[550px] pb-10  w-full">
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
          Gufungura Konti
        </h3>
        <div className="w-full flex-col flex justify-center items-center">
          <div className="flex flex-row justify-center  md:w-[80%] w-full px-2 md:px-0 md:gap-10 gap-0 py-6">
            <div className="flex flex-col w-full">
              <div className="flex flex-row relative">
                <div className="text-yellow-400 bg-[#001833] w-[20px] h-[20px] flex items-center justify-center rounded-full z-50 ">
                  1
                </div>
                <div className="bg-[#001833] h-[5px]  w-full flex-1 absolute   rounded-md mt-2"></div>
              </div>
              <p className="text-xs md:block hidden">Info</p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="flex flex-row relative ">
                <div className="bg-[#001833]  w-full flex-1 h-[5px] rounded-md mt-2 "></div>
                <div className="text-white bg-[#001833] w-[20px] h-[20px] flex items-center justify-center rounded-full absolute right-0   top-0">
                  2
                </div>
              </div>
              <p className="text-xs text-right mt-2">Confirmation</p>
            </div>
          </div>
          <form
            className=" w-full flex flex-col gap-5 justify-center md:px-10 px-6 py-6"
            onSubmit={handleSubmit}
          >
            <div className="main_input">
              <div className="flex-col flex-1">
                <label htmlFor="amazina">Amazina</label>
                <input
                  type="text"
                  className="sub_input"
                  placeholder="Shyiramo Amazina"
                  id="amazina"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className="flex-col flex-1">
                <label htmlFor="numbero_indangamuntu">
                  Numero y'indangamuntu
                </label>
                <input
                  type="text"
                  className="sub_input"
                  placeholder="2345678"
                  id="numbero_indangamuntu"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
            </div>
            <div className="main_input">
              <div className="flex-col flex-1 ">
                <label htmlFor="numero_telefone">Numero ya telefone</label>
                <input
                  type="text"
                  className="sub_input"
                  placeholder="Isamaza sylvain"
                  id="numero_telefone"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              <div className="flex-col flex-1 ">
                <label htmlFor="intara">Intara</label>
                <select
                  name="province"
                  id="intara"
                  className="sub_input"
                  onChange={(e) => handleChange(e)}
                  required
                >
                  {/* <option></option> */}
                  {Provinces().map((province: string) => {
                    return <option value={province}>{province}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="main_input">
              <div className="flex-col flex-1 ">
                <label htmlFor="akarere">Akarere</label>
                <select
                  name="district"
                  id="akarere"
                  className={`sub_input`}
                  onChange={(e) => handleChange(e)}
                  required
                  // disabled={formData.province === ""}
                >
                  {/* <option></option> */}
                  {Districts(formData.province)?.map((district: string) => {
                    return <option value={district}>{district}</option>;
                  })}
                </select>
              </div>
              <div className="flex-col flex-1 ">
                <label htmlFor="umurenge">Umurenge</label>
                <select
                  name="sector"
                  id="umurenge"
                  className="sub_input"
                  onChange={(e) => handleChange(e)}
                  required
                >
                  {/* <option></option> */}
                  {Sectors(formData.province, formData.district)?.map(
                    (sector: string) => {
                      return <option value={sector}>{sector}</option>;
                    },
                  )}
                </select>
              </div>
            </div>
            <div className="main_input">
              <div className="flex-col flex-1 ">
                <label htmlFor="akagari">Akagari</label>
                <select
                  name="cell"
                  id="akagari"
                  className="sub_input"
                  onChange={(e) => handleChange(e)}
                  required
                >
                  {/* <option></option> */}
                  {Cells(
                    formData.province,
                    formData.district,
                    formData.sector,
                  )?.map((cell: string) => {
                    return <option value={cell}>{cell}</option>;
                  })}
                </select>
              </div>
              <div className="flex-col flex-1 ">
                <label htmlFor="umudugudu">Umudugudu</label>
                <select
                  name="village"
                  id="umudugudu"
                  className="sub_input"
                  onChange={(e) => handleChange(e)}
                  required
                >
                  {/* <option></option> */}
                  {Villages(
                    formData.province,
                    formData.district,
                    formData.sector,
                    formData.cell,
                  )?.map((village: string) => {
                    return <option value={village}>{village}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="main_input">
              <div className="flex-col flex-1">
                <label htmlFor="ijambo_banga">ijambo banga</label>
                <div className="w-full relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="sub_input"
                    placeholder="****************"
                    id="ijambo_banga"
                    name="password"
                    value={formData.password}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <span onClick={()=> setShowPassword(!showPassword)} className="absolute top-4 right-3 cursor-pointer">
                      {showPassword ? <FaEyeSlash/> : <FaEye/>}
                  </span>
                </div>
              </div>
              <div className="flex-col flex-1">
                <label htmlFor="kwemeza_ijambo_banga">
                  Kwemeza ijambo banga
                </label>
                <div className="w-full relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="sub_input"
                    placeholder="****************"
                    id="kwemeza_ijambo_banga"
                    name="cpassword"
                    value={formData.cpassword}
                    onChange={(e) => handleChange(e)}
                  />
                  <span onClick={()=> setShowConfirmPassword(!showConfirmPassword)} className="absolute top-4 right-3 cursor-pointer">
                      {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <input type="checkbox" name="ndemera" id="ndemera" required />
              <label htmlFor="ndemera">Ndemeza ko amakuru natanze ariyo</label>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="btn_primary py-2 rounded-md px-10 text-white"
              >
                {loading ? (
                  <div className="w-full flex items-center justify-center">
                    <ClipLoader size={18} color="white" />
                  </div>
                ) : (
                  "Gukomeza"
                )}
              </button>
            </div>
            <div className="flex items-center justify-center py-2">
              <div>
                <p>
                  Usanzwe ufite konti{" "}
                  <Link href="/login" className="text-[#368EF1]">
                    Injira
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>

        <div></div>
      </div>
    </section>
  );
};
export default Register;
