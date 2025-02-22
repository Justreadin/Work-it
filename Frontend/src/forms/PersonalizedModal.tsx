import React from "react";
import { NavLink } from "react-router-dom";
const PersonalizedModal: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen overflow-hidden bg-white">
      <div className="flex flex-col space-y-6 items-center relative w-[90%] md:w-[80%]">
        <div className="flex justify-end absolute -top-16 md:-top-32 w-full">
          <NavLink
            className="bg-white_gray text-dark_purple font-bold text-base rounded-3xl border-transparent border-2 hover:border-dark_purple px-8 py-2.5"
            to="/login"
          >
            Skip
          </NavLink>
        </div>
        <div className="flex flex-col items-center space-y-6 w-full md:w-[40%]">
          <h2 className="text-customPurple font-bold text-base opacity-80 w-full text-center">
            Welcome to *****
          </h2>
          <p className="text-dark_gray opacity-80 text-4xl font-normal w-full text-center">
            Are you ready to elevate your career?
          </p>
          <p className="text-base text-dark_gray font-normal opacity-50 w-full text-center">
            Now let’s personalize your experience
          </p>
          <NavLink className="bg-dark_purple py-2.5 px-10 text-white_gray font-bold border-transparent border-2 hover:bg-white_gray hover:text-dark_purple hover:border-dark_purple rounded-3xl" to="/avatarupload">Let's go</NavLink>
        </div>
      </div>
    </div>
  );
};
export default PersonalizedModal;
