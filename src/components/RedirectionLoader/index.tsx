import { ClipLoader } from "react-spinners";

const RedirectionLoader = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 flex flex-col gap-3 items-center justify-center bg-[#9e9d9dd6] z-[1001]">
      <h4 className="text-xl text-white text-center">Redirecting ...</h4>
      <ClipLoader size={30} color="#ccc" />
    </div>
  );
};

export default RedirectionLoader;
