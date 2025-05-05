import React from "react";
import Caution from "../../assets/Images/image (1).png";
const DangerWarning: React.FC = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#FF0000] w-full px-[5%] rounded-lg mt-20">
      <div className="space-y-6 text-white_gray font-bold w-full md:w-1/2 py-5 md:py-0">
        <p className="text-xl">NOTE</p>
        <h2 className="text-3xl md:text-4xl">We are strictly remote, report any physical meeting request</h2>
        <p className="text-xl">Don’t accept any physical meeting</p>
      </div>
      <div className="">
        <img src={Caution} alt="Caution Icon" />
      </div>
    </div>
  );
};
export default DangerWarning;
