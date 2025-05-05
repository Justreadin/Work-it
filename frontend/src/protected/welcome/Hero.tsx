
import "../../index.css"
import React from "react";
import image from "../../assets/Images/Frame 725.png";
import alarm from "../../assets/Images/Frame 766.png";
import ReadMoreButton from "../../ui/ReadMoreButton";
const Hero: React.FC = () => {
  return (
    <div className="bg-customPurple space-y-10 lg:space-y-0 rounded-md flex flex-col md:flex-row herobg items-start justify-between py-8 px-[10%]">
      <div className="space-y-6 w-full md:w-[60%]">
        <h1 className="text-stone-50 w-full text-center lg:text-left space-y-3 font-naormal text-3xl md:text-6xl">
          Always stay updated with your profile picture
        </h1>
        <p className="text-stone-50 text-xl font-normal">
          First Impression matters a lot
        </p>
        <div className="flex justify-center md:block w-full">
           <ReadMoreButton/>
        </div>
      </div>
      <div className="relative">
        <img className="mt-7" src={image} alt="ilustration image" />
        <div className="absolute -right-6 -top-72 lg:-right-32 lg:-top-6">
          <img src={alarm} alt="notification icon" />
        </div>
      </div>
    </div>
  );
};
export default Hero;
