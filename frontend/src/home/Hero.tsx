import React from "react";
import leftImage from "../assets/Images/Group 4.png";
import "../index.css";
import BecomeAclientButton from "../ui/BecomeAclientButton";
import GetStarted from "../ui/GetSarted";

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-10 sm:gap-0 space-x-4">
      <div className="w-full md:w-1/2">
        <h1 className="text-dark_gray text-center w-full sm:text-left text-4xl sm:text-6xl">
          <span className="text-dark_purple font-bold">John!</span> Level Up
          your <span className="text-dark_purple font-bold">Experience</span>{" "}
          with no Experience at all
        </h1>
        <p className="text-xl text-center sm:text-left font-normal text-dark_gray mt-6 sm:mt-9">
          We have everybody in mind... irrespective of who you are or where
          you’re from. You can earn big
        </p>
        <div className="flex items-center space-x-6 mt-5">
          <GetStarted actionName="Get started" destination="/login" />
          <BecomeAclientButton />
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <img className="w-full" src={leftImage} alt="Hero Image" />
      </div>
    </div>
  );
};
export default Hero;
