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
      <div className="mt-28 flex w-full flex-col items-center justify-between space-y-12 border-b py-8 md:flex-row md:space-y-0">
        {/* Left Section */}
        <div className="flex flex-col gap-6">
          <button className="h-10 w-36 border-none bg-logo"></button>
          <p className="self-center text-base font-normal text-neutral-900 md:self-start">
            There’s always a room for everybody
          </p>
          <div className="flex items-center justify-between text-4xl text-customPurple">
            <FaLinkedin />
            <FaTwitter />
            <FaFacebook />
            <FaYoutube />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-12">
          <div className="flex flex-col space-y-4">
            <h3 className="text-base font-bold text-white">Nav</h3>
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
                className="text-base font-semibold text-dark_gray"
                key={index}
                to={item.detination}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-base font-bold text-customPurple">
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
                className="text-base font-semibold text-dark_gray"
                key={index}
                to={item.detination}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-base font-bold text-customPurple">
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
                className="text-base font-semibold text-dark_gray"
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
      <div className="my-4 flex items-center justify-between">
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
