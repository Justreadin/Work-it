import React from "react";
import "../index.css";
import { NavLink } from "react-router-dom";
import theGuy from "../assets/Images/image 7.png"
const Equip: React.FC = () => {
  return ( 
    <div className="ms:p-0 ms:px-24 equipbg ms:pt-32 mt-20 w-full p-[5%] md:py-0">
      <div className="flex flex-col-reverse items-center md:flex-row">
      <div className="flex-1 space-y-7 py-5 md:space-y-5">
        <h2 className="text-center text-3xl font-medium text-white md:text-left md:text-5xl">
          Take control and equip yourself for the big leagues
        </h2>
        <p className="text-3xl font-normal text-white opacity-80">
          Empower yourself with hand-on experience and what you need to find
          your bearing and position yourself confidently
        </p>
       <div className="mt-4">
       <NavLink
          to="/sign-up"
          className="mt-5 rounded-3xl border border-customPurple bg-white_gray px-6 py-2.5 font-bold text-customPurple"
        >
          Try it for free
        </NavLink>
       </div>
      </div>
      <div className="equipbgtwo w-full md:w-[45%]">
        <img src={theGuy} alt="" />
      </div>
      </div>
    </div>
  );
};
export default Equip;
