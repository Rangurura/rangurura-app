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
import { useTranslation } from "react-i18next";
import { setCookie } from "cookies-next";
import { baseURL } from "@/constants";
import { notifications } from "@mantine/notifications";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [mismatchError, setMismatchError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [formData, setFormData] = useState({
    cell: "",
    district: "",
    nationalId: "",
    password: "",
    phoneNumber: "",
    province: "",
    sector: "",
    name: "",
    village: "",
    cpassword: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProvinceChange = (e: any) => {
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      province: value,
      district: "",
      sector: "",
      cell: "",
      village: "",
    }));
  };

  const handleDistrictChange = (e: any) => {
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      district: value,
      sector: "",
      cell: "",
      village: "",
    }));
  };

  const handleSectorChange = (e: any) => {
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      sector: value,
      cell: "",
      village: "",
    }));
  };

  const handleCellChange = (e: any) => {
    const value = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      cell: value,
      village: "",
    }));
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (formData.password !== formData.cpassword) {
      setError(true);
      setMismatchError("Passwords do not match");
      setLoading(false);
      return;
    } else {
      setError(false);
    }

    axios
      .post(`${baseURL}/users/register`, formData)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          notifications.show({
            title: "",
            message: res.data.data,
            type: "info",
            autoClose: 5000,
          });
          setLoading(false);
          setLoadingPage(true);
          navigate.push("/login");
          setCookie("phone", formData.phoneNumber);
        }
        if (!res.data.success) {
          notifications.show({
            title: "",
            message: res.data.error,
            type: "error",
            color: "#FF555D",
            autoClose: 5000,
          });
          setError(true);
          setLoading(false);
        }
      })
      .catch((err: any) => {
        notifications.show({
          title: "",
          message: err.response.data.error,
          type: "error",
          color: "#FF555D",
          autoClose: 5000,
        });
        setLoading(false);
        console.log("error occured: ", err);
      });
  };
  return (
    <section className="flex justify-center w-full bg-[#EEF3F9] h-full p-10 relative">
      <div className="bg-white rounded-xl md:w-[60%] max-w-[550px] pb-10 w-full">
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
          {t("signup.signup")}
        </h3>
        <div className="w-full flex-col flex justify-center items-center">
          <div className="flex flex-row justify-center md:w-[80%] w-full px-2 md:px-0 md:gap-10 gap-0 py-6">
            <div className="flex flex-col w-full">
              <div className="flex flex-row relative">
                <div className="text-yellow-400 bg-[#001833] w-[20px] h-[20px] flex items-center justify-center rounded-full z-50 ">
                  1
                </div>
                <div className="bg-[#001833] h-[5px] w-full flex-1 absolute rounded-md mt-2"></div>
              </div>
              <p className="text-xs md:block hidden">{t("signup.info")}</p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="flex flex-row relative ">
                <div className="bg-[#001833] w-full flex-1 h-[5px] rounded-md mt-2 "></div>
                <div className="text-white bg-[#001833] w-[20px] h-[20px] flex items-center justify-center rounded-full absolute right-0 top-0">
                  2
                </div>
              </div>
              <p className="text-xs text-right mt-2">
                {t("signup.confirmation")}
              </p>
            </div>
          </div>
          <form
            className="w-full flex flex-col gap-5 justify-center md:px-10 px-6 py-6"
            onSubmit={handleSubmit}
          >
            {mismatchError ? (
              <div className="w-[100%] py-4 border-l-4 border-l-[#FF0000] bg-[#c8353542] flex ">
                <h6 className="w-full text-center text-[90%] font-bold text-red-600">
                  {mismatchError}
                </h6>
              </div>
            ) : null}
            <div className="main_input">
              <div className="flex-col flex-1">
                <label htmlFor="amazina">{t("signup.name")}</label>
                <input
                  type="text"
                  className="sub_input"
                  placeholder={t("signup.name")}
                  id="amazina"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex-col flex-1">
                <label htmlFor="numbero_indangamuntu">{t("signup.id")}</label>
                <input
                  type="text"
                  className="sub_input"
                  placeholder="2345678"
                  id="numbero_indangamuntu"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleChange}
                  required
                  min={16}
                  minLength={16}
                  max={16}
                  maxLength={16}
                />
              </div>
            </div>
            <div className="main_input">
              <div className="flex-col flex-1">
                <label htmlFor="numero_telefone">{t("signup.phone")}</label>
                <input
                  type="text"
                  className="sub_input"
                  placeholder="Isamaza sylvain"
                  id="numero_telefone"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex-col flex-1">
                <label htmlFor="intara">{t("signup.province")}</label>
                <select
                  name="province"
                  id="intara"
                  className="sub_input"
                  onChange={handleProvinceChange}
                  value={formData.province}
                  required
                >
                  <option>Select</option>
                  {Provinces().map((province: string) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="main_input">
              <div className="flex-col flex-1">
                <label htmlFor="akarere">{t("signup.district")}</label>
                <select
                  name="district"
                  id="akarere"
                  className="sub_input"
                  onChange={handleDistrictChange}
                  value={formData.district}
                  required
                  disabled={!formData.province}
                >
                  <option>Select</option>
                  {Districts(formData.province)?.map((district: string) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-col flex-1">
                <label htmlFor="umurenge">{t("signup.sector")}</label>
                <select
                  name="sector"
                  id="umurenge"
                  className="sub_input"
                  onChange={handleSectorChange}
                  value={formData.sector}
                  required
                  disabled={!formData.district}
                >
                  <option>Select</option>
                  {Sectors(formData.province, formData.district)?.map(
                    (sector: string) => (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>
            <div className="main_input">
              <div className="flex-col flex-1">
                <label htmlFor="akagari">{t("signup.cell")}</label>
                <select
                  name="cell"
                  id="akagari"
                  className="sub_input"
                  onChange={handleCellChange}
                  value={formData.cell}
                  required
                  disabled={!formData.sector}
                >
                  <option>Select</option>
                  {Cells(
                    formData.province,
                    formData.district,
                    formData.sector,
                  )?.map((cell: string) => (
                    <option key={cell} value={cell}>
                      {cell}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-col flex-1">
                <label htmlFor="umudugudu">{t("signup.village")}</label>
                <select
                  name="village"
                  id="umudugudu"
                  className="sub_input"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      village: e.target.value,
                    }))
                  }
                  value={formData.village}
                  required
                  disabled={!formData.cell}
                >
                  <option>Select</option>
                  {Villages(
                    formData.province,
                    formData.district,
                    formData.sector,
                    formData.cell,
                  )?.map((village: string) => (
                    <option key={village} value={village}>
                      {village}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="main_input">
              <div className="flex-col flex-1">
                <label htmlFor="ijambo_banga">{t("signup.password")}</label>
                <div className="w-full relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="sub_input"
                    placeholder="****************"
                    id="ijambo_banga"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-4 right-3 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <div className="flex-col flex-1">
                <label htmlFor="kwemeza_ijambo_banga">
                  {t("signup.cpassword")}
                </label>
                <div className="w-full relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="sub_input"
                    placeholder="****************"
                    id="kwemeza_ijambo_banga"
                    name="cpassword"
                    value={formData.cpassword}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-4 right-3 cursor-pointer"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <input type="checkbox" name="ndemera" id="ndemera" required />
              <label htmlFor="ndemera">{t("signup.agree")}</label>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={loading}
                className="btn_primary py-2 rounded-md px-10 text-white"
              >
                {loading ? (
                  <div className="w-full flex items-center justify-center">
                    <ClipLoader size={18} color="white" />
                  </div>
                ) : (
                  t("signup.submit")
                )}
              </button>
            </div>
            <div className="flex items-center justify-center py-2">
              <div>
                <p>
                  {t("signup.ask")}{" "}
                  <Link href="/login" className="text-[#368EF1]">
                    {t("login.login")}
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      {loadingPage && (
        <div className="absolute top-0 w-full flex items-center justify-center">
          <ClipLoader size={18} color="white" />
        </div>
      )}
    </section>
  );
};

export default Register;
