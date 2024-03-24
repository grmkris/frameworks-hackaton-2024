import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Spinner = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <AiOutlineLoading3Quarters size={50} className="animate-spin" />
    </div>
  );
};
