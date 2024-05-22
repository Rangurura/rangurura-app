// import { Report } from "@/typings";
// import { ApiEndpoint } from "@/constants/index";
// import * as React from "react";
// import { notifications } from "@mantine/notifications";
// import { ClipLoader } from "react-spinners";
// import { FaRegCheckCircle } from "react-icons/fa";
// import { RxCrossCircled } from "react-icons/rx";
// import { categories, organisationLevels } from "@/constants/Enums";
// import { Select } from "@mantine/core";

// const EditReport = ({ report, close }: { report: Report; close: () => void }) => {
//   const [loading, setLoading] = React.useState(false);
//   const [formData, setFormData] = React.useState({
//     description: report?.description || "",
//     name: report?.name || "",
//     location: report?.location || "",
//     organizationLevel: report?.organizationLevel || "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target;
//  {
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
    
//   };

//   const handleEditReport = () => {
//     setLoading(true);
//     ApiEndpoint.put(`/reports/update_report/${report.id}`, formData)
//       .then((res) => {
//         notifications.show({
//           title: "Edit report",
//           message: "Successfully Edited report!",
//           autoClose: 5000,
//           icon: <FaRegCheckCircle />,
//         });
//         close();
//       })
//       .catch((err) => {
//         notifications.show({
//           title: "Edit report",
//           message: "Error occurred when editing an report!",
//           color: "#FF555D",
//           autoClose: 5000,
//           icon: <RxCrossCircled />,
//         });
//       })
//       .finally(() => setLoading(false));
//   };

//   return (
//     <div className="w-full h-full flex flex-col gap-3 items-center">
//       <header className="w-full text-center font-extrabold text-lg">
//         Edit Report
//       </header>
//       <div className="w-full flex flex-col">
//         <div className="flex-row flex-1">
//           <label htmlFor="reportName" className="font-bold">
//             Name
//           </label>
//           <input
//             type="text"
//             className="sub_input"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </div>
//         <h2 className="mt-3 text-[90%] mb-[-0.71rem] font-bold">
//           Edit Description:
//         </h2>
//         <textarea
//           value={formData.description}
//           onChange={handleChange}
//           className="border border-[#ccc] outline outline-blue-500 caret-blue-500 my-3 p-2 text-justify rounded-lg text-[90%] bg-[#f1f6ff] resize-none"
//           name="description"
//         />
//         <div className="flex-col flex-1">
//           <label htmlFor="organisationLevel" className="font-bold">
//             Organisation Level
//           </label>
//           <Select
//             value={formData.organizationLevel}
//             onChange={(value: any) =>
//               setFormData((prevState) => ({
//                 ...prevState,
//                 organizationLevel: value,
//               }))
//             }
//             data={organisationLevels}
//           />
//         </div>
//         <div className="my-1">
//           <div className="flex-row flex-1">
//             <label htmlFor="location" className="font-bold">
//               Location
//             </label>
//             <input
//               type="text"
//               className="sub_input"
//               placeholder="Ibiro by'umurenge"
//               id="location"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <div className="w-full mt-5 flex justify-between md:px-[10%]">
//           <button
//             onClick={() => close()}
//             className="py-3 px-8 rounded-3xl flex items-center justify-center bg-[#ccc] text-black"
//           >
//             Cancel
//           </button>
//           <button
//             disabled={
//               report.description === formData.description ||
//               report.name === formData.name ||
//               report.location === formData.location ||
//               report.organizationLevel === formData.organizationLevel
//             }
//             onClick={handleEditReport}
//             className={`py-3 px-8 rounded-3xl flex items-center justify-center ${
//               report.description === formData.description ||
//               report.name === formData.name ||
//               report.location === formData.location ||
//               report.organizationLevel === formData.organizationLevel 
//                 ? "cursor-not-allowed"
//                 : ""
//             } bg-[#0075FF] text-white`}
//           >
//             {loading ? (
//               <div className="w-full h-full flex items-center justify-center">
//                 <ClipLoader size={24} color="white" />
//               </div>
//             ) : (
//               "Save"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// }

// export default EditReport ;


import { Report } from "@/typings";
import { ApiEndpoint } from "@/constants/index";
import * as React from "react";
import { notifications } from "@mantine/notifications";
import { ClipLoader } from "react-spinners";
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { categories, organisationLevels } from "@/constants/Enums";
import { Select } from "@mantine/core";
import SelectLevel from "../../Level";

interface EditReportProps {
  report: Report;
  close: () => void;
}

const EditReport: React.FC<EditReportProps> = ({ report, close }) => {
  const [loading, setLoading] = React.useState(false);
  const[level,setLevel]=React.useState("")
  const [formData, setFormData] = React.useState({
    description: report?.description || "",
    name: report?.name || "",
    location: report?.location || level,
    organizationLevel: report?.organizationLevel || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditReport = () => {
    setLoading(true);
    ApiEndpoint.put(`/reports/update_my_report/${report.id}`, formData)
      .then((res) => {
        notifications.show({
          title: "Edit report",
          message: "Successfully Edited report!",
          autoClose: 5000,
          icon: <FaRegCheckCircle />,
        });
        close();
      })
      .catch((err) => {
        notifications.show({
          title: "Edit report",
          message: "Error occurred when editing the report!",
          color: "#FF555D",
          autoClose: 5000,
          icon: <RxCrossCircled />,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 items-center">
      <header className="w-full text-center font-extrabold text-lg">
        Edit Report
      </header>
      <div className="w-full flex flex-col">
        <div className="flex-row flex-1">
          <label htmlFor="reportName" className="font-bold">
            Name
          </label>
          <input
            type="text"
            className="sub_input"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <h2 className="mt-3 text-[90%] mb-[-0.71rem] font-bold">
          Edit Description:
        </h2>
        <textarea
          value={formData.description}
          onChange={handleChange}
          className="border border-[#ccc] outline outline-blue-500 caret-blue-500 my-3 p-2 text-justify rounded-lg text-[90%] bg-[#f1f6ff] resize-none"
          name="description"
        />
        <div className="flex-col flex-1">
          <label htmlFor="organisationLevel" className="font-bold">
            Organisation Level
          </label>
          <Select
            value={formData.organizationLevel}
            onChange={(value: any) =>
              setFormData((prevState) => ({
                ...prevState,
                organizationLevel: value,
              }))
            }
            data={organisationLevels}
          />
        </div>
        <SelectLevel
              organisationCategory="Urwego Rw'Ibanze"
              organisationLevel={formData.organizationLevel}
              setLevel={setLevel}
            />
        <div className="w-full mt-5 flex justify-between md:px-[10%]">
          <button
            onClick={close}
            className="py-3 px-8 rounded-3xl flex items-center justify-center bg-[#ccc] text-black"
          >
            Cancel
          </button>
          <button
            disabled={
              report.description === formData.description &&
              report.name === formData.name &&
              report.location === formData.location &&
              report.organizationLevel === formData.organizationLevel
            }
            onClick={handleEditReport}
            className={`py-3 px-8 rounded-3xl flex items-center justify-center ${
              report.description === formData.description &&
              report.name === formData.name &&
              report.location === formData.location &&
              report.organizationLevel === formData.organizationLevel
                ? "cursor-not-allowed"
                : ""
            } bg-[#0075FF] text-white`}
          >
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <ClipLoader size={24} color="white" />
              </div>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReport;

