"use client";
import React, { useEffect, useState } from "react";
import logo from "@/assets/images/logo-dark (1).png";
import Link from "next/link";
import Image from "next/image";
import { ApiEndpoint } from "@/constants";
import { notifications } from "@mantine/notifications";
import { Select } from "@mantine/core";
import { getTranslatedData } from "@/constants/Enums";
import { Cells, Sectors, Districts, Provinces, Villages } from "rwanda";
import { ClipLoader } from "react-spinners";
import { FaRegCheckCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { getCookies } from "cookies-next";
import { RxCrossCircled } from "react-icons/rx";
import SelectLevel from "../core/Level";
import LeaderSelectLevel from "../core/Level/SelectLeader";

const NewLeader = ({ close }: { close: Function }) => {
  const {
    organisationLevels,
    leaderCategory,
    categories,
    organisationCategories,
    governmentOrgs,
    organizationLevels
  } = getTranslatedData();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [cell, setCell] = useState("");
  const [village, setVillage] = useState("");
  const [localLevels, setLocalLevels] = useState([]);
  const [organisationLevel, setOrganisationLevel] = useState("");
  const [category, setCategory] = useState("");
  const [leadCategory, setLeadCategory] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [assignLevel, setAssignLevel] = useState("");
  const [institution, setInstitution] = useState("");
  const [organisationCategory, setOrganisationCategory] = useState<string>("");
  const [level, setLevel] = useState("");
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
  useEffect(() => {
    const fetchData = async () => {
      const { token } = getCookies();
      if (token) {
        const decodedToken: any = jwtDecode(token);
        setUserRole(decodedToken.role);
        if (decodedToken.role === "ADMIN") {
          setOrganisationLevel("INTARA");
          const provinces = Provinces();
          setLocalLevels(provinces);
        } else if (decodedToken.role === "UMUYOBOZI") {
          try {
            const res = await ApiEndpoint.get(`/leaders/my_profile`);
            const leaderData = res?.data?.data?.leader;
            if (leaderData) {
              const { organizationLevel, location } = leaderData;
              setOrganisationLevel(
                organizationLevels[
                  organizationLevels.indexOf(organizationLevel) - 1
                ],
              );
              setLocation(location);
              let localLevels = [];
              switch (organizationLevel) {
                case "INTARA":
                  localLevels = Districts(location?.toLowerCase()); // Admin of province can only see districts
                  break;
                case "AKARERE":
                  localLevels = Sectors(location?.toLowerCase()); // District leader can only see sectors
                  break;
                case "UMURENGE":
                  localLevels = Cells(location?.toLowerCase()); // Sector leader can only see cells
                  break;
                case "AKAGARI":
                  localLevels = Villages(location?.toLowerCase()); // Cell leader can only see villages
                  break;
                case "UMUDUGUDU":
                  notifications.show({
                    title: "",
                    message: "You are not allowed to perform this action",
                    color: "#FF555D",
                    autoClose: 5000,
                    icon: <RxCrossCircled />,
                  });
                  return;
                default:
                  break;
              }
              setLocalLevels(localLevels);
            }
          } catch (error) {
            console.error("Error fetching UMUYOBOZI data:", error);
          }
        } else {
          notifications.show({
            title: "",
            message: "You are not allowed to perform this action",
            color: "#FF555D",
            autoClose: 5000,
            icon: <RxCrossCircled />,
          });
        }
      }
    };

    fetchData();
  }, []);

  const handleChange = async (e: any) => {
    const nationalId = e.target.value;
    try {
      setLoading(true);
      const res = await ApiEndpoint.post(`users/get_user_by_national_id`, {
        nationalId,
      });
      if (res?.data) {
        const userData = res.data?.data;
        if (userData?.role === "UMUTURAGE" || userData?.role === "UMUYOBOZI") {
          setNationalId(nationalId);
          setPhoneNumber(userData.phone);
          setCell(userData.cell);
          setDistrict(userData.district);
          setName(userData.realName);
          setProvince(userData.province);
          setSector(userData.sector);
          setVillage(userData.village);
        } else {
          setNationalId(nationalId);
          setIsModelOpen(true);
        }
      } else {
        console.log("No user found with the provided national ID");
      }
    } catch (err) {
      console.error("An error occurred", err);
    } finally {
      setLoading(false);
    }
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
  }

  const submit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const form = {
      category: category,
      cell: formData.cell,
      district: formData.district,
      location: level,
      name: name,
      nationalId: nationalId,
      organizationLevel: organisationLevel,
      phoneNumber: phoneNumber,
      province: formData.province,
      role: leadCategory,
      sector: formData.sector,
      village: formData.village,
      institutions: organisationCategory === "Ikigo cya Leta" ? institution : "LOCAL",
    };

    console.log("assign leader formdata --> ", form);

    ApiEndpoint.post("/leaders/addLeader", form)
      .then((res) => {
        console.log(res.data.data);
        notifications.show({
          title: "Assign Leader",
          message: "Leader Assigned successfully!",
          autoClose: 5000,
          icon: <FaRegCheckCircle />,
        });

        setCategory("");
        setLeadCategory("");
        setLocation("");
        close();
      })
      .catch((err: any) => {
        notifications.show({
          title: "",
          message: err.response?.data?.error ?? "Network Error",
          color: "#FF555D",
          autoClose: 5000,
          icon: <RxCrossCircled />,
        });
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-white rounded-xl w-full mt-[-2rem]">
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
          onSubmit={submit}
          className="w-full flex flex-col gap-5 justify-center md:px-10 px-6 pt-4"
        >
          <div className="main_input">
            <div className="flex-col flex-1">
              <label htmlFor="nationalId" className="font-bold">
                National ID
              </label>
              <input
                type="text"
                name="nationalId"
                placeholder="123456789123457"
                className="sub_input rounded-lg px-3"
                required
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="main_input">
            <div className="flex-col flex-1">
              <label htmlFor="category" className="font-bold">
                Categories
              </label>
              <Select
                data={categories}
                value={category}
                onChange={setCategory}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-black">
              Organisation Category <span className="text-red-600">*</span>
            </label>
            <Select
              value={organisationCategory}
              onChange={(value: any) => setOrganisationCategory(value)}
              data={organisationCategories}
            />
            {organisationCategory === "Ikigo cya Leta" && (
              <div>
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-black">
                    Urwego rw'umuyobozi <span className="text-red-600">*</span>
                  </label>
                  <Select
                    data={governmentOrgs}
                    onChange={(value: any) => setInstitution(value)}
                  />
                  <label className="font-semibold text-black">
                    Location <span className="text-red-600">*</span>
                  </label>
                  <Select
                    value={organisationLevel}
                    onChange={() => {}}
                    data={organisationLevels}
                    disabled={true}
                  />
                </div>
              </div>
            )}
            {organisationCategory === "Urwego Rw'Ibanze" && (
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-black">
                  Location <span className="text-red-600">*</span>
                </label>
                <Select
                  value={organisationLevel}
                  onChange={() => {}}
                  data={organisationLevels}
                  disabled={true}
                />
              </div>
            )}
            <LeaderSelectLevel
              SelectedLevel={organisationLevel}
              organisationCategory={organisationCategory}
              organisationLevel={organisationLevel}
              setLevel={setLevel}
            />
          </div>

          {/* Role Select */}
          <div className="main_input">
            <div className="flex-col flex-1">
              <label htmlFor="role" className="font-bold">
                Role
              </label>
              <Select
                data={leaderCategory}
                value={leadCategory}
                onChange={setLeadCategory}
              />
            </div>
          </div>

          {isModelOpen && (
            <div>
              <h2 className="">
                The user has no account in Rangurura so you will have to fill in
                additional information
              </h2>
              <div className="main_input">
                <div className="flex-col flex-1">
                  <label htmlFor="name" className="font-bold">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Isamaza Sylvin"
                    className="sub_input rounded-lg px-3"
                    required
                    onChange={(e: any) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="main_input">
                <div className="flex-col flex-1">
                  <label htmlFor="phone" className="font-bold">
                    Phone number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="+250788006677"
                    className="sub_input rounded-lg px-3"
                    required
                    onChange={(e: any) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="main_input">
              <div className="flex-col flex-1">
                <label htmlFor="intara">Province</label>
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
                <label htmlFor="akarere">District</label>
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
                <label htmlFor="umurenge">Sector</label>
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
                <label htmlFor="akagari">Cell</label>
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
                <label htmlFor="umudugudu">Village</label>
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
                <div className="flex-col flex-1 ">
                  <label htmlFor="umudugudu">Villages</label>
                  <select
                    name="village"
                    id="umudugudu"
                    className="sub_input"
                    onChange={(e: any) => setVillage(e.target.value)}
                    required
                  >
                    {province &&
                      district &&
                      sector &&
                      cell &&
                      Villages(province, district, sector, cell)?.map(
                        (village: string) => (
                          <option value={village}>{village}</option>
                        ),
                      )}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="btn_primary py-2 rounded-md px-10 text-white"
            >
              {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <ClipLoader size={20} color="white" />
                </div>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewLeader;
