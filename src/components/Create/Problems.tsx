// "use client";
// import { useRef, useState } from "react";
// import logo from "@/assets/images/logo-dark (1).png";
// import Link from "next/link";
// import Image from "next/image";
// import upload from "@/assets/images/upload.svg";
// import { Provinces, Sectors, Cells, Districts, Villages } from "rwanda";
// import { Modal, Select } from "@mantine/core";
// import SelectLevel from "@/components/core/Level";
// import toast from "react-hot-toast";
// import { FaRegCircleCheck } from "react-icons/fa6";
// import { useRouter } from "next/navigation";
// import { useDisclosure } from "@mantine/hooks";
// import { baseURL } from "@/constants";
// import { ClipLoader } from "react-spinners";
// import axios from "axios";
// import { getMyProfile } from "@/utils/funcs/funcs";
// import {
//   categories,
//   governmentOrgs,
//   organisationCategories,
//   organisationLevels,
// } from "@/constants/Enums";
// import { notifications } from "@mantine/notifications";
// import { FaRegCheckCircle } from "react-icons/fa";
// import { RxCrossCircled } from "react-icons/rx";

// const ReportProblemModel = ({ closeL }: { closeL: Function }) => {
//   const navigate = useRouter();
//   const [opened, { open, close }] = useDisclosure(false);
//   const [institution, setInstitution] = useState("");
//   const [organisationCategory, setOrganisationCategory] = useState<string>("");
//   const [organisationLevel, setOrganisationLevel] = useState("");
//   const [showUpload, setShowUpload] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [category, setCategory] = useState("");
//   const [fileName, setFileName] = useState("");
//   const [problem, setProblem] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [level, setLevel] = useState("");
//   const [nationalId, setNationalId] = useState("");

//   const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setOrganisationCategory(e.target.value);
//   };
//   const handleSelectedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//       setFileName(file.name);
//       console.log(file.name);
//       setShowUpload(true);
//       notifications.show({
//         title: "Upload proof",
//         message: "Successfully uploaded proof",
//         autoClose: 5000,
//         icon: <FaRegCheckCircle />,
//       });
//     }
//   };
//   const submitProblem = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = {
//       category: category,
//       ikibazo: problem,
//       urwego: organisationLevel.toUpperCase(),
//       phoneNumber: phoneNumber,
//       nationalId: nationalId,
//       institutions: institution || "LOCAL",
//       target: level,
//     };
//     console.log(formData);

//     const formResponse = new FormData();
//     getMyProfile()
//       .then((data) => {
//         console.log("Profile User", data?.data?.nationalId);
//         setNationalId(data?.data?.nationalId);
//         setPhoneNumber(data?.data?.phoneNumber);
//         formData.nationalId = data?.data?.nationalId;
//         formData.phoneNumber = data?.data?.phoneNumber;
//         if (selectedFile) {
//           formResponse.append("proof", selectedFile);
//         }
//         formResponse.append("record", "");
//         // formResponse.append("details", JSON.stringify(formData));
//         formResponse.append("details", JSON.stringify(formData));
//       })
//       .then(() => {
//         console.log(formData);
//         axios
//           .post(`${baseURL}/problems/create`, formResponse)
//           .then((response) => {
//             setLoading(false);
//             notifications.show({
//               title: "Report Problem",
//               message: response.data?.data?.message,
//               autoClose: 5000,
//               icon: <FaRegCheckCircle />,
//             });
//             console.log(response.data);
//             closeL();
//           })
//           .catch((err: any) => {
//             setLoading(false);
//             if (err.message === "Network Error") {
//               notifications.show({
//                 title: "Report Problem",
//                 message:
//                   "Request unable to reach our servers. Slow Network Connection Problem!",
//                 color: "#FF555D",
//                 autoClose: 5000,
//                 icon: <RxCrossCircled />,
//               });
//             } else {
//               setLoading(false);
//               notifications.show({
//                 title: "Report Problem",
//                 message:
//                   err.response?.data?.error ??
//                   "An Error Occurred! If it persists contact the support at support@rangurura.com",
//                 color: "#FF555D",
//                 autoClose: 5000,
//                 icon: <RxCrossCircled />,
//               });
//             }
//           });
//       });
//   };

//   return (
//     <section className="flex justify-center items-center w-full h-full">
//       <Modal
//         opened={opened}
//         onClose={close}
//         withCloseButton
//         closeOnClickOutside={false}
//       >
//         <form
//           onSubmit={submitProblem}
//           className="w-full flex flex-col justify-center py-5 pb-10 gap-2"
//         >
//           <div className="flex flex-col gap-1">
//             <label className="font-semibold text-black">
//               Hitamo Ubwoko bw'ikibazo cyawe{" "}
//               <span className="text-red-600">*</span>
//             </label>
//             <Select
//               value={category}
//               data={categories}
//               onChange={(e: any) => setCategory(e)}
//             />
//           </div>
//           <div className="flex items-center justify-center pt-3">
//             <button
//               onClick={open}
//               className="btn_primary text-white p-2 px-10 rounded-md"
//             >
//               {loading ? (
//                 <div className="w-full h-full flex justify-center items-center">
//                   <ClipLoader size={18} color="white" />
//                 </div>
//               ) : (
//                 "Tanga ikibazo"
//               )}
//             </button>
//           </div>
//         </form>
//       </Modal>
//       <div
//         className={`w-full flex flex-col bg-white rounded p-8 items-center justify-center ${
//           showUpload ? "gap-2" : "gap-8"
//         } gap-8`}
//       >
//         <div className="flex flex-col justify-center items-center">
//           <Link href="/">
//             <Image src={logo} alt="" width={60} />
//           </Link>
//           <h3 className="font-bold text-[#001833] text-2xl">Tanga ikibazo</h3>
//         </div>
//         <div className="w-full flex flex-col justify-center gap-2">
//           <div className="flex flex-col gap-1">
//             <label className="font-semibold text-black">
//               Hitamo aho ushaka kugeza Ikibazo{" "}
//               <span className="text-red-600">*</span>
//             </label>
//             <Select
//               value={organisationCategory}
//               onChange={(value: any) => setOrganisationCategory(value)}
//               data={organisationCategories}
//             />
//             {organisationCategory === "Ikigo cya Leta" && (
//               <div>
//                 <div className="flex flex-col gap-1">
//                   <label className="font-semibold text-black">
//                     Hitamo aho ushaka kugeza Ikibazo{" "}
//                     <span className="text-red-600">*</span>
//                   </label>
//                   <Select
//                     data={governmentOrgs}
//                     onChange={(value: any) => setInstitution(value)}
//                   />

//                   <label className="font-semibold text-black">
//                     Hitamo aho ikigo giherereye{" "}
//                     <span className="text-red-600">*</span>
//                   </label>
//                   <Select
//                     value={organisationLevel}
//                     onChange={(value: any) => setOrganisationLevel(value)}
//                     data={organisationLevels}
//                   />
//                 </div>
//                 <SelectLevel
//                   organisationCategory="Urwego Rw'Ibanze"
//                   organisationLevel={organisationLevel}
//                   setLevel={setLevel}
//                 />
//               </div>
//             )}
//             {organisationCategory === "Urwego Rw'Ibanze" && (
//               <div className="flex flex-col gap-1">
//                 <label className="font-semibold text-black">
//                   Hitamo {organisationCategory} ushaka kugeza Ikibazo{" "}
//                   <span className="text-red-600">*</span>
//                 </label>
//                 <Select
//                   value={organisationLevel}
//                   onChange={(value: any) => setOrganisationLevel(value)}
//                   data={organisationLevels}
//                 />
//               </div>
//             )}
//             <SelectLevel
//               organisationCategory={organisationCategory}
//               organisationLevel={organisationLevel}
//               setLevel={setLevel}
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <label className="font-semibold text-black">
//               Ikibazo <span className="text-red-600">*</span>
//             </label>
//             <textarea
//               rows={2}
//               value={problem}
//               onChange={(e) => setProblem(e.target.value)}
//               placeholder="Ikibazo"
//               className="border-[#C3C3C3] border-2 rounded-md p-2"
//               style={{ resize: "none" }}
//             ></textarea>
//           </div>
//           <div className="w-full flex flex-col gap-1">
//             <label className="font-semibold text-black">Proof</label>
//             <div
//               className={`p-9 rounded-md border-2 ${
//                 showUpload ? "border-[#294929]" : "border-[#C3C3C3]"
//               } w-full flex items-center ${
//                 showUpload ? "bg-[#294929]" : ""
//               } justify-center`}
//             >
//               <label htmlFor="proof" className="cursor-pointer">
//                 {showUpload ? (
//                   <FaRegCircleCheck color="white" />
//                 ) : (
//                   <Image src={upload} className="w-6 h-6" alt=""></Image>
//                 )}
//               </label>
//               <input
//                 type="file"
//                 id="proof"
//                 className="hidden"
//                 onChange={handleSelectedFile}
//               />
//             </div>
//             {showUpload ? (
//               <h6 className="w-full text-center font-bold text-[#001833]">
//                 Uploaded {fileName} as Proof
//               </h6>
//             ) : (
//               <></>
//             )}
//           </div>
//           <div className="flex items-center justify-center pt-3">
//             <button
//               onClick={open}
//               className="btn_primary text-white p-2 px-10 rounded-md"
//             >
//               Komeza
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReportProblemModel;

// "use client";
// import { useRef, useState } from "react";
// import logo from "@/assets/images/logo-dark (1).png";
// import Link from "next/link";
// import Image from "next/image";
// import upload from "@/assets/images/upload.svg";
// import { Provinces, Sectors, Cells, Districts, Villages } from "rwanda";
// import { Modal, Select } from "@mantine/core";
// import SelectLevel from "@/components/core/Level";
// import toast from "react-hot-toast";
// import { FaRegCircleCheck } from "react-icons/fa6";
// import { useRouter } from "next/navigation";
// import { useDisclosure } from "@mantine/hooks";
// import { baseURL } from "@/constants";
// import { ClipLoader } from "react-spinners";
// import axios from "axios";
// import {
//   categories,
//   governmentOrgs,
//   organisationCategories,
//   organisationLevels,
// } from "@/constants/Enums";
// import { notifications } from "@mantine/notifications";
// import { RxCrossCircled } from "react-icons/rx";
// import ProblemDirectionModal from "@/components/core/Modals/ProblemDirection";
// const orgLevels = ["AKAGARI", "UMURENGE", "AKARERE", "INTARA"];
// const ReportProblemModel = () => {
//   const navigate = useRouter();
//   const [opened, { open, close }] = useDisclosure(false);
//   const [organisationCategory, setOrganisationCategory] = useState<string>("");
//   const [organisationLevel, setOrganisationLevel] = useState("");
//   const [showUpload, setShowUpload] = useState(false);
//   const [showPrevUpload, setShowPrevUpload] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [selectedFile, setSelectedFile] = useState("");
//   const [selectedPrevFile, setSelectedPrevFile] = useState("");
//   const [category, setCategory] = useState("");
//   const [fileName, setFileName] = useState("");≠
//   const [prevFileName, setPrevFileName] = useState("");
//   const [problem, setProblem] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [level, setLevel] = useState("");
//   const [nationalId, setNationalId] = useState("");
//   const [previousLevel, setPreviousLevel] = useState("");
//   const [isOpenProbDirctn, { open: openProbDirctn, close: closeProbDirctn }] =
//     useDisclosure(true);
//   const handleSelectedFile = (e: any, name: string) => {
//     const file = e.target.files[0];
//     console.log(name);
//     if (name === "prevFile") {
//       setSelectedPrevFile(file);
//       setShowPrevUpload(true);
//       setPrevFileName(file.name);
//     } else {
//       setSelectedFile(file);
//       setFileName(file.name);
//       console.log(fileName);
//       setShowUpload(true);
//     }
//   };
//   const submitProblem = (e: any) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = {
//       category: category,
//       ikibazo: problem,
//       urwego: organisationLevel.toUpperCase(),
//       phoneNumber: phoneNumber,
//       nationalId: nationalId,
//       target: level,
//       prevLocation: previousLevel,
//       prevUrwego: orgLevels[orgLevels.indexOf(organisationLevel) - 1],
//     };
//     const formResponse = new FormData(); 
//     formResponse.append("proof", selectedFile);
//     formResponse.append("record", "");
//     formResponse.append("details", JSON.stringify(formData));
//     formResponse.append("documents", selectedPrevFile);
//     console.log(formResponse, selectedFile);
//     axios
//       .post(`${baseURL}/problems/create`, formResponse)\
//       .then((response) => {
//         // toast.success(response.data?.data?.message);

//         notifications.show({
//           title: "Report Problem",
//           message: response.data?.data?.message,
//           autoClose: 5000,
//         });
//         console.log(response.data);
//         setOrganisationLevel("");
//         setOrganisationCategory("");
//         setLevel("");
//         setProblem("");
//         setShowUpload(false);
//         setSelectedFile("");
//         close();
//       })
//       .catch((err: any) => {
//         if (err.message === "Network Error") {
//           notifications.show({
//             title: "Report Problem",
//             message:
//               "Request unable to reach our servers. Slow Network Connection Problem!",
//             color: "#FF555D",
//             autoClose: 5000,
//             icon: <RxCrossCircled />,
//           });
//         } else {
//           notifications.show({
//             title: "Report Problem Error",
//             message:
//               err.response?.data?.error ??
//               "An Error Occurred! If it persists contact the support at support@rangurura.com",
//             color: "#FF555D",
//             autoClose: 5000,
//             icon: <RxCrossCircled />,
//           });
//         }
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <section className="flex rounded-lg py-20 justify-center items-center w-screen min-h-screen bg-[#EEF3F9]">
//       <Modal
//         opened={opened}
//         onClose={close}
//         withCloseButton
//         closeOnClickOutside={false}
//       >
//         <form
//           onSubmit={submitProblem}
//           className="w-full flex flex-col justify-center py-5 pb-10 gap-2"
//         >
//           <div className="flex flex-col gap-1">
//             <label className="font-semibold text-black">
//               Hitamo Ubwoko bw'ikibazo cyawe{" "}
//               <span className="text-red-600">*</span>
//             </label>
//             <Select
//               value={category}
//               data={categories}
//               onChange={(e: any) => setCategory(e)}
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <label className="font-semibold text-black">
//               Nimero y'Indangamuntu <span className="text-red-600">*</span>
//             </label>
//             <input
//               value={nationalId}
//               onChange={(e) => setNationalId(e.target.value)}
//               placeholder="Nimero y'Indangamuntu"
//               className="border-[#C3C3C3] border-2 rounded-md p-2"
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <label className="font-semibold text-black">
//               Nimero ya Telephone <span className="text-red-600">*</span>
//             </label>
//             <input
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               placeholder="Nimero ya telephone"
//               className="border-[#C3C3C3] border-2 rounded-md p-2"
//             />
//           </div>

//           <div className="flex items-center justify-center pt-3">
//             <button
//               onClick={open}
//               className="btn_primary text-white p-2 px-10 rounded-md"
//             >
//               {loading ? (
//                 <div className="w-full h-full flex justify-center items-center">
//                   <ClipLoader size={18} color="white" />
//                 </div>
//               ) : (
//                 "Tanga ikibazo"
//               )}
//             </button>
//           </div>
//         </form>
//       </Modal>
//       <div
//         className={`flex flex-col bg-white rounded p-8 items-center justify-center ${
//           showUpload ? "gap-2" : "gap-8"
//         } gap-8 w-[90%] md:w-[35%]`}
//       >
//         <div className="flex flex-col justify-center items-center">
//           <Link href="/">
//             <Image src={logo} alt="" width={60} />
//           </Link>
//           <h3 className="font-bold text-[#001833] text-2xl">Tanga ikibazo</h3>
//         </div>
//         <div className="w-full flex flex-col justify-center gap-2">
//           <div className="flex flex-col gap-1 space-y-2">
//             <label className="font-semibold text-black">
//               Hitamo aho ushaka kugeza Ikibazo{" "}
//               <span className="text-red-600">*</span>
//             </label>
//             <Select
//               value={organisationCategory}
//               onChange={(value: any) => setOrganisationCategory(value)}
//               data={organisationCategories}
//             />
//             {organisationCategory === "Ikigo cya Leta" && (
//               <div className="flex flex-col gap-1">
//                 <label className="font-semibold text-black">
//                   Hitamo aho ushaka kugeza Ikibazo{" "}
//                   <span className="text-red-600">*</span>
//                 </label>
//                 <Select data={governmentOrgs} />
//               </div>
//             )}
//             {organisationCategory === "Urwego Rw'Ibanze" && (
//               <div className="w-full">
//                 <div className="flex flex-col gap-1">
//                   <label className="font-semibold text-black">
//                     Hitamo {organisationCategory} ushaka kugeza Ikibazo{" "}
//                     <span className="text-red-600">*</span>
//                   </label>
//                   <Select
//                     value={organisationLevel}
//                     onChange={(value: any) => setOrganisationLevel(value)}
//                     data={organisationLevels}
//                   />
//                 </div>
//               </div>
//             )}
//             <SelectLevel
//               organisationCategory={organisationCategory}
//               organisationLevel={organisationLevel}
//               setLevel={setLevel}
//             />

//             <div className="space-y-2">
//               {organisationLevel &&
//                 organisationLevel.toLowerCase() !== "akagari" && (
//                   <div className="w-full flex flex-col gap-1 mb-2">
//                     <label className="font-semibold text-black">
//                       Upload a proof that this was previously reported to{" "}
//                       {orgLevels[orgLevels.indexOf(organisationLevel) - 1]}
//                     </label>
//                     <div
//                       className={`p-9 rounded-md border-2 ${
//                         showPrevUpload ? "border-[#294929]" : "border-[#C3C3C3]"
//                       } w-full flex items-center ${
//                         showPrevUpload ? "bg-[#294929]" : ""
//                       } justify-center`}
//                     >
//                       <label htmlFor="prevProof" className="cursor-pointer">
//                         {showPrevUpload ? (
//                           <FaRegCircleCheck color="white" />
//                         ) : (
//                           <Image
//                             src={upload}
//                             className="w-6 h-6"
//                             alt=""
//                           ></Image>
//                         )}
//                       </label>
//                       <input
//                         type="file"
//                         id="prevProof"
//                         className="hidden"
//                         onChange={(e: any) => handleSelectedFile(e, "prevFile")}
//                       />
//                     </div>
//                     {showPrevUpload ? (
//                       <h6 className="w-full text-center font-bold text-[#001833]">
//                         Uploaded {prevFileName} as Proof
//                       </h6>
//                     ) : (
//                       <></>
//                     )}
//                   </div>
//                 )}
//               <SelectLevel
//                 label={`Hitamo ${
//                   orgLevels[orgLevels.indexOf(organisationLevel) - 1]
//                 } wari wagejejeho ikibazo cyawe mbere`}
//                 organisationCategory={organisationCategory}
//                 organisationLevel={
//                   orgLevels[orgLevels.indexOf(organisationLevel) - 1]
//                 }
//                 setLevel={setPreviousLevel}
//               />
//             </div>
//           </div>
//           <div className="flex flex-col gap-1">
//             <label className="font-semibold text-black">
//               Ikibazo{" "}
//               <span className="text-red-600 text-sm">
//                 * (Maximum Characters: 255)
//               </span>
//             </label>
//             <textarea
//               rows={2}
//               maxLength={255}
//               value={problem}
//               onChange={(e) => setProblem(e.target.value)}
//               placeholder="Ikibazo"
//               className="border-[#C3C3C3] border-2 rounded-md p-2"
//               style={{ resize: "none" }}
//             ></textarea>
//           </div>
//           <div className="w-full flex flex-col gap-1">
//             <label className="font-semibold text-black">Proof</label>
//             <div
//               className={`p-9 rounded-md border-2 ${
//                 showUpload ? "border-[#294929]" : "border-[#C3C3C3]"
//               } w-full flex items-center ${
//                 showUpload ? "bg-[#294929]" : ""
//               } justify-center`}
//             >
//               <label htmlFor="proof" className="cursor-pointer">
//                 {showUpload ? (
//                   <FaRegCircleCheck color="white" />
//                 ) : (
//                   <Image src={upload} className="w-6 h-6" alt=""></Image>
//                 )}
//               </label>
//               <input
//                 type="file"
//                 id="proof"
//                 className="hidden"
//                 onChange={(e: any) => handleSelectedFile(e, "proof")}
//               />
//             </div>
//             {showUpload ? (
//               <h6 className="w-full text-center font-bold text-[#001833]">
//                 Uploaded {fileName} as Proof
//               </h6>
//             ) : (
//               <></>
//             )}
//           </div>
//           <div className="flex items-center justify-center pt-3">
//             <button
//               onClick={open}
//               className="btn_primary text-white p-2 px-10 rounded-md"
//             >
//               Komeza
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* <ProblemDirectionModal isOpen={isOpenProbDirctn} close={closeProbDirctn} /> */}
//     </section>
//   );
// };

// export default ReportProblemModel;
"use client";
import { useRef, useState, useEffect } from "react";
import logo from "@/assets/images/logo-dark (1).png";
import Link from "next/link";
import Image from "next/image";
import upload from "@/assets/images/upload.svg";
import { Provinces, Sectors, Cells, Districts, Villages } from "rwanda";
import { Modal, Select } from "@mantine/core";
import SelectLevel from "@/components/core/Level";
import toast from "react-hot-toast";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { baseURL } from "@/constants";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import {
  categories,
  governmentOrgs,
  organisationCategories,
  organisationLevels,
} from "@/constants/Enums";
import { notifications } from "@mantine/notifications";
import { RxCrossCircled } from "react-icons/rx";
import ProblemDirectionModal from "@/components/core/Modals/ProblemDirection";
import { getMyProfile } from "@/utils/funcs/funcs";

const orgLevels = ["AKAGARI", "UMURENGE", "AKARERE", "INTARA"];

const ReportProblemModel = () => {
  const navigate = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [organisationCategory, setOrganisationCategory] = useState<string>("");
  const [organisationLevel, setOrganisationLevel] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [showPrevUpload, setShowPrevUpload] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedPrevFile, setSelectedPrevFile] = useState("");
  const [category, setCategory] = useState("");
  const [fileName, setFileName] = useState("");
  const [prevFileName, setPrevFileName] = useState("");
  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [previousLevel, setPreviousLevel] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationError, setLocationError] = useState<string>("");

  useEffect(() => {
    // Capture user location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {

          //testing the accuracy of the data

          // const nyabihuCoordinates = { latitude: -1.6778, longitude: 29.5631 };
          // console.log("Latitude:", position.coords.latitude, "Longitude:", position.coords.longitude);
          // setLatitude(nyabihuCoordinates.latitude);
          // setLongitude(nyabihuCoordinates.longitude);
          
          console.log("Latitude:", position.coords.latitude, "Longitude:", position.coords.longitude);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setLocationError("Unable to access location. Please enable location services.");
          console.error(error);
        },
        {
          timeout: 50000, // 5 seconds timeout
          maximumAge: 10000, // accept only position, that are not older than 10 seconds
          enableHighAccuracy: true // high accuracy
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
    }
  }, []);

  useEffect(() => {
    getMyProfile().then((data) => {
      setNationalId(data?.data?.nationalId || "");
      setPhoneNumber(data?.data?.phoneNumber || "");
    });
  }, []);

  const handleSelectedFile = (e: any, name: string) => {
    const file = e.target.files[0];
    if (name === "prevFile") {
      setSelectedPrevFile(file);
      setShowPrevUpload(true);
      setPrevFileName(file.name);
    } else {
      setSelectedFile(file);
      setFileName(file.name);
      setShowUpload(true);
    }
  };

  const submitProblem = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      category: category,
      latitude: latitude, // Add latitude
      longitude: longitude, // Add longitude
      ikibazo: problem,
      urwego: organisationLevel.toUpperCase(),
      phoneNumber: phoneNumber,
      nationalId: nationalId,
      target: level,
      prevLocation: previousLevel,
      prevUrwego: orgLevels[orgLevels.indexOf(organisationLevel) - 1],
    };

    const formResponse = new FormData();
    formResponse.append("proof", selectedFile);
    formResponse.append("record", "");
    formResponse.append("details", JSON.stringify(formData));
    formResponse.append("documents", selectedPrevFile);

    axios
      .post(`${baseURL}/problems/create`, formResponse)
      .then((response) => {
        notifications.show({
          title: "Report Problem",
          message: response.data?.data?.message,
          autoClose: 5000,
        });
        setOrganisationLevel("");
        setOrganisationCategory("");
        setLevel("");
        setProblem("");
        setShowUpload(false);
        setSelectedFile("");
        close();
      })
      .catch((err: any) => {
        const errorMessage =
          err.message === "Network Error"
            ? "Request unable to reach our servers. Slow Network Connection Problem!"
            : err.response?.data?.error ??
              "An Error Occurred! If it persists contact support.";
        notifications.show({
          title: "Report Problem Error",
          message: errorMessage,
          color: "#FF555D",
          autoClose: 5000,
          icon: <RxCrossCircled />,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="flex justify-center items-center w-full h-full">
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton
        closeOnClickOutside={false}
      >
        <form
          onSubmit={submitProblem}
          className="w-full flex flex-col justify-center py-5 pb-10 gap-2"
        >
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-black">
              Hitamo Ubwoko bw'ikibazo cyawe{" "}
              <span className="text-red-600">*</span>
            </label>
            <Select
              value={category}
              data={categories}
              onChange={(e: any) => setCategory(e)}
            />
          </div>
          <div className="flex items-center justify-center pt-3">
            <button
              onClick={open}
              className="btn_primary text-white p-2 px-10 rounded-md"
            >
              {loading ? (
                <div className="w-full h-full flex justify-center items-center">
                  <ClipLoader size={18} color="white" />
                </div>
              ) : (
                "Tanga ikibazo"
              )}
            </button>
          </div>
        </form>
      </Modal>
      <div
        className={`flex flex-col bg-white rounded p-8 items-center justify-center ${
          showUpload ? "gap-2" : "gap-8"
        } gap-8 w-full`}
      >
        <div className="flex flex-col justify-center items-center">
          <Link href="/">
            <Image src={logo} alt="" width={60} />
          </Link>
          <h3 className="font-bold text-[#001833] text-2xl">Tanga ikibazo</h3>
        </div>
        <div className="w-full flex flex-col justify-center gap-2">
          <div className="flex flex-col gap-1 space-y-2">
            <label className="font-semibold text-black">
              Hitamo aho ushaka kugeza Ikibazo{" "}
              <span className="text-red-600">*</span>
            </label>
            <Select
              value={organisationCategory}
              onChange={(value: any) => setOrganisationCategory(value)}
              data={organisationCategories}
            />
            {organisationCategory === "Ikigo cya Leta" && (
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-black">
                  Hitamo aho ushaka kugeza Ikibazo{" "}
                  <span className="text-red-600">*</span>
                </label>
                <Select data={governmentOrgs} />
              </div>
            )}
            {organisationCategory === "Urwego Rw'Ibanze" && (
              <div className="w-full">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-black">
                    Hitamo {organisationCategory} ushaka kugeza Ikibazo{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <Select
                    value={organisationLevel}
                    onChange={(value: any) => setOrganisationLevel(value)}
                    data={organisationLevels}
                  />
                </div>
              </div>
            )}
            <SelectLevel
              organisationCategory={organisationCategory}
              organisationLevel={organisationLevel}
              setLevel={setLevel}
            />

            <div className="space-y-2">
              {organisationLevel &&
                organisationLevel.toLowerCase() !== "akagari" && (
                  <div className="w-full flex flex-col gap-1 mb-2">
                    <label className="font-semibold text-black">
                      Upload a proof that this was previously reported to{" "}
                      {orgLevels[orgLevels.indexOf(organisationLevel) - 1]}
                    </label>
                    <div
                      className={`p-9 rounded-md border-2 ${
                        showPrevUpload ? "border-[#294929]" : "border-[#C3C3C3]"
                      } w-full flex items-center ${
                        showPrevUpload ? "bg-[#294929]" : ""
                      } justify-center`}
                    >
                      <label htmlFor="prevProof" className="cursor-pointer">
                        {showPrevUpload ? (
                          <FaRegCircleCheck color="white" />
                        ) : (
                          <Image
                            src={upload}
                            className="w-6 h-6"
                            alt=""
                          ></Image>
                        )}
                      </label>
                      <input
                        type="file"
                        id="prevProof"
                        className="hidden"
                        onChange={(e: any) => handleSelectedFile(e, "prevFile")}
                      />
                    </div>
                    {showPrevUpload ? (
                      <h6 className="w-full text-center font-bold text-[#001833]">
                        Uploaded {prevFileName} as Proof
                      </h6>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
              <SelectLevel
                label={`Hitamo ${
                  orgLevels[orgLevels.indexOf(organisationLevel) - 1]
                } wari wagejejeho ikibazo cyawe mbere`}
                organisationCategory={organisationCategory}
                organisationLevel={
                  orgLevels[orgLevels.indexOf(organisationLevel) - 1]
                }
                setLevel={setPreviousLevel}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-black">
              Ikibazo{" "}
              <span className="text-red-600 text-sm">
                * (Maximum Characters: 255)
              </span>
            </label>
            <textarea
              rows={2}
              maxLength={255}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Ikibazo"
              className="border-[#C3C3C3] border-2 rounded-md p-2"
              style={{ resize: "none" }}
            ></textarea>
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="font-semibold text-black">Proof</label>
            <div
              className={`p-9 rounded-md border-2 ${
                showUpload ? "border-[#294929]" : "border-[#C3C3C3]"
              } w-full flex items-center ${
                showUpload ? "bg-[#294929]" : ""
              } justify-center`}
            >
              <label htmlFor="proof" className="cursor-pointer">
                {showUpload ? (
                  <FaRegCircleCheck color="white" />
                ) : (
                  <Image src={upload} className="w-6 h-6" alt=""></Image>
                )}
              </label>
              <input
                type="file"
                id="proof"
                className="hidden"
                onChange={(e: any) => handleSelectedFile(e, "proof")}
              />
            </div>
            {showUpload ? (
              <h6 className="w-full text-center font-bold text-[#001833]">
                Uploaded {fileName} as Proof
              </h6>
            ) : (
              <></>
            )}
          </div>
          <div className="flex items-center justify-center pt-3">
            <button
              onClick={open}
              className="btn_primary text-white p-2 px-10 rounded-md"
            >
              Komeza
            </button>
          </div>
        </div>
      </div>
      {/* <ProblemDirectionModal isOpen={isOpenProbDirctn} close={closeProbDirctn} /> */}
      {locationError && <p className="text-red-600">{locationError}</p>}
    </section>
  );
};

export default ReportProblemModel;