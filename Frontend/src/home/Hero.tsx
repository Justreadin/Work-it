import React from "react";
import { motion } from "framer-motion";
import leftImage from "../assets/Images/Group 4.png";
import "../index.css";
import BecomeAclientButton from "../ui/BecomeAclientButton";
import GetStarted from "../ui/GetSarted";

const Hero: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-6 sm:px-10 md:px-16 bg-gradient-to-r from-[#f8f4ff] to-[#e3d1ff]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {/* Left Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight text-gray-800">
            <span className="text-dark_purple">John!</span> Level Up
            <br /> Your <span className="text-dark_purple">Experience</span>{" "}
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-2 rounded-lg">
              with no Experience
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600">
            We have everybody in mind... irrespective of who you are or where
            you’re from. You can earn big.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 mt-8">
            <GetStarted actionName="Get Started" destination="/login" />
            <BecomeAclientButton />
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          <div className="absolute -top-8 left-6 w-20 h-20 bg-purple-400 blur-2xl rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute -bottom-12 right-6 w-24 h-24 bg-indigo-400 blur-2xl rounded-full opacity-40 animate-pulse"></div>
          <img
            className="w-full max-w-lg mx-auto drop-shadow-xl"
            src={leftImage}
            alt="Hero Image"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
