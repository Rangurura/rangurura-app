// "use client";
// import { notifications } from "@mantine/notifications";
// import { Modal } from "@nextui-org/react";
// import Link from "next/link";
// import React, { useState } from "react";
// import { FaRegCircleCheck } from "react-icons/fa6";
// import { IoClose } from "react-icons/io5";
// import logo from "../../../../assets/images/logo-dark.png";
// import upload from "../../../../assets/images/upload.svg";
// import Image from "next/image";
// import { useDisclosure } from "@mantine/hooks";

// function AppealDecision() {
//   const [opened, { open, close }] = useDisclosure(false);
//   const [selectedFile, setSelectedFile] = useState("");
//   const [fileName, setFileName] = useState("");
//   const [showUpload, setShowUpload] = useState(false);
//   const handleSelectedFile = (e: any) => {
//     const file = e.target.files[0];
//     setSelectedFile(file);
//     setFileName(file.name);
//     console.log(fileName);
//     setShowUpload(true);
//     notifications.show({
//       title: "Upload proof",
//       message: "Proof uploaded Successfully!",
//       type: "info",
//       autoClose: 5000,
//     });
//   };

//   return (
//     <div>
//       <button className="absolute top-6 right-4" onClick={close}>
//         <IoClose size={24} />
//       </button>
//       <div className="flex flex-col justify-center items-center">
//         <Link href="/">
//           <Image src={logo} alt="" width={50} />
//         </Link>
//         <h3 className="font-bold text-[#001833] text-2xl mb-4">
//           Appeal submission
//         </h3>
//       </div>
//       <div className="flex flex-col gap-1">
//         <label className="font-semibold text-black">
//           Appeal comment{" "}
//           <span className="text-red-600 text-sm">
//             * (Maximum Characters: 255)
//           </span>
//         </label>
//         <textarea
//           rows={2}
//           maxLength={255}
//           // value={desc}
//           // onChange={(e) => setDesc(e.target.value)}
//           placeholder="Description"
//           className="border-[#C3C3C3] border-2 rounded-md p-2"
//           style={{ resize: "none" }}
//         ></textarea>
//       </div>
//       <div className="w-full flex flex-col gap-1">
//         <label className="font-semibold text-black">Proof</label>
//         <div
//           className={`p-9 rounded-md border-2 ${
//             showUpload ? "border-[#294929]" : "border-[#C3C3C3]"
//           } w-full flex items-center ${
//             showUpload ? "bg-[#294929]" : ""
//           } justify-center`}
//         >
//           <label htmlFor="proof" className="cursor-pointer">
//             {showUpload ? (
//               <FaRegCircleCheck color="white" />
//             ) : (
//               <Image src={upload} className="w-6 h-6" alt=""></Image>
//             )}
//           </label>
//           <input
//             type="file"
//             id="proof"
//             // ref={fileInput}
//             className="hidden"
//             onChange={handleSelectedFile}
//           />
//         </div>
//         {showUpload ? (
//           <h6 className="w-full text-center font-bold text-[#001833]">
//             Uploaded {fileName} as Proof
//           </h6>
//         ) : (
//           <></>
//         )}
//       </div>
//       <div className="flex flex-col justify-center items-center">
//         <button
//           type="button"
//           className="bg-[#001833] w-[10rem] my-5 px-3 py-3 rounded-lg flex flex-col items-center justify-center text-white font-extrabold"
//         >
//           Appeal
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AppealDecision;

"use client";
import { notifications } from "@mantine/notifications";
import { Modal } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import logo from "../../../../assets/images/logo-dark.png";
import upload from "../../../../assets/images/upload.svg";
import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { ApiEndpoint } from "@/constants";

function AppealDecision({
  problemId,
  close,
  type,
}: {
  problemId: string;
  close: () => void;
  type: any;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [appealComment, setAppealComment] = useState("");

  const handleSelectedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      setShowUpload(true);
      notifications.show({
        title: "Upload proof",
        message: "Proof uploaded successfully!",
        type: "info",
        autoClose: 5000,
      });
    }
  };

  const handleSubmit = async () => {
    if (!appealComment || !selectedFile) {
      notifications.show({
        title: "Submission Error",
        message: "Please fill in all fields and upload proof.",
        color: "red",
      });
      return;
    }

    const formData = new FormData();
    formData.append("comment", appealComment);
    formData.append("proof", selectedFile);

    try {
      const response = ApiEndpoint.post("/appeals/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      notifications.show({
        title: "Success",
        message: "Your appeal has been submitted successfully!",
        color: "green",
      });
      close();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "There was an error submitting your appeal.",
        color: "red",
      });
      console.error(error);
    }
    close();
  };

  return (
    <div>
      <button className="absolute top-6 right-4" onClick={close}>
        <IoClose size={24} />
      </button>
      <div className="flex flex-col justify-center items-center">
        <Link href="/">
          <Image src={logo} alt="" width={50} />
        </Link>
        <h3 className="font-bold text-[#001833] text-2xl mb-4">
          Appeal submission
        </h3>
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-black">
          Appeal comment{" "}
          <span className="text-red-600 text-sm">
            * (Maximum Characters: 255)
          </span>
        </label>
        <textarea
          rows={2}
          maxLength={255}
          value={appealComment}
          onChange={(e) => setAppealComment(e.target.value)}
          placeholder="Description"
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
            onChange={handleSelectedFile}
          />
        </div>
        {showUpload ? (
          <h6 className="w-full text-center font-bold text-[#001833]">
            Uploaded {fileName} as Proof
          </h6>
        ) : null}
      </div>
      <div className="flex flex-col justify-center items-center">
        <button
          type="button"
          className="bg-[#001833] w-[10rem] my-5 px-3 py-3 rounded-lg flex flex-col items-center justify-center text-white font-extrabold"
          onClick={handleSubmit}
        >
          Appeal
        </button>
      </div>
    </div>
  );
}

export default AppealDecision;
