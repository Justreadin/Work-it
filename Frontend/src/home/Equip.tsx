import React from "react";
import "../index.css";
import { NavLink } from "react-router-dom";
import theGuy from "../assets/Images/image 7.png"
const Equip: React.FC = () => {
  return ( 
    <div className=" w-full p-[5%] md:py-0 ms:p-0 ms:px-24 equipbg ms:pt-32 mt-20 md:mt-48">
      <div className="flex flex-col-reverse md:flex-row items-center">
      <div className="flex-1 space-y-7 md:space-y-5 py-5">
        <h2 className="text-white font-medium text-3xl md:text-7xl text-center md:text-left">
          Take control and equip yourself for the big leagues
        </h2>
        <p className="text-white text-3xl font-normal opacity-80">
          Empower yourself with hand-on experience and what you need to find
          your bearing and position yourself confidently
        </p>
       <div className="mt-4">
       <NavLink
          to="/sign-up"
          className="px-6 py-2.5 rounded-3xl mt-5 bg-white_gray border-customPurple font-bold text-customPurple border"
        >
          Try it for free
        </NavLink>
       </div>
      </div>
      <div className="w-full md:w-[45%] equipbgtwo">
        <img src={theGuy} alt="" />
      </div>
      </div>
    </div>
  );
};
export default Equip;
