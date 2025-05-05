import React from "react";
import {
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaYoutube
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Footer: React.FC = () => {
  return (
    <div className="w-full px-[5%]">

        {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center space-y-12 md:space-y-0 justify-between border-b mt-48 py-8 w-full">
        {/* Left Section */}
        <div className="flex flex-col gap-6">
          <button className="w-36 h-10 bg-logo border-none"></button>
          <p className="text-base self-center md:self-start font-normal text-neutral-900">
            There’s always a room for everybody
          </p>
          <div className="flex items-center text-customPurple justify-between text-4xl">
            <FaLinkedin />
            <FaTwitter />
            <FaFacebook />
            <FaYoutube />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-12">
          <div className="flex flex-col space-y-4">
            <h3 className="text-base text-white font-bold">Nav</h3>
            {[
              {
                name: "Home",
                detination: "/",
              },
              {
                name: "About Us",
                detination: "/about-us",
              },
              {
                name: "Contact Us",
                detination: "/contact-us",
              },
            ].map((item, index) => (
              <NavLink
                className="text-base text-dark_gray font-semibold"
                key={index}
                to={item.detination}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-base text-customPurple font-bold">
              Our Features
            </h3>
            {[
              {
                name: "Efficiency",
                detination: "/",
              },
              {
                name: "Solution",
                detination: "/",
              },
              {
                name: "update",
                detination: "/",
              },
            ].map((item, index) => (
              <NavLink
                className="text-base text-dark_gray font-semibold"
                key={index}
                to={item.detination}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-base text-customPurple font-bold">
              Our Features
            </h3>

            {[
              {
                name: "Twitter",
                detination: "/",
              },
              {
                name: "Instagram",
                detination: "/",
              },
              {
                name: "Threads",
                detination: "/",
              },
            ].map((item, index) => (
              <NavLink
                className="text-base text-dark_gray font-semibold"
                key={index}
                to={item.detination}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      {/* Bottom section */}
      <div className="flex items-center justify-between my-4">
        <div className="text-xs text-[#71717A]">
            <span>&copy; All right reserved 2024</span>
        </div>
        <div className="flex items-center space-x-4">
            {
                ["Terms", "Privacy"].map((item, index)=>{
                    return(<NavLink className="text-sm font-normal text-[#18181B]" key={index} to="/">{item}</NavLink>)
                })
            }
        </div>

      </div>
    </div>
  );
};
export default Footer;
