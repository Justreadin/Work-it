import React from "react";
import { NavLink } from "react-router-dom";
import { useHeader } from "../contexts/HeaderContext";
import BecomeAclientButton from "../ui/BecomeAclientButton";
const Nav: React.FC = () => {
  const holdState = useHeader();

  const navItems = [
    {
      location: "Home",
      to: "/home",
    },
    {
      location: "How it works",
      to: "/how-it-works",
    },
    {
      location: "About",
      to: "/about",
    },
    {
      location: "Contacts",
      to: "/contact",
    },
  ];
  return (
    // <div className="flex flex-col md:flex-row items-center">
    <div
      className={`${
        holdState?.headerState.menu
          ? "flex-col h-auto absolute  py-10 space-y-6 w-full top-16  rounded-lg left-0"
          : "hidden"
      } md:flex items-center md:space-x-10 h-11 text-2xl bg-white duration-700`}
    >
      {navItems.map((item, index) => {
        return (
          <NavLink
            key={index}
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-dark_purple font-bold"
                  : "text-dark_gray font-normal"
              } ${holdState?.headerState.menu ? "block text-center" : ""}`
            }
            to={item.to}
          >
            {item.location}
          </NavLink>
        );
      })}

      <div className="flex flex-col items-center space-y-10  md:hidden sm:hidden p-4">
        <BecomeAclientButton />
        <button  className="px-6 w-full py-1.5 rounded-3xl bg-white_gray hover:bg-customPurple hover:border-white_gray hover:text-white_gray border-customPurple font-semibold text-customPurple border">
        <NavLink
          to="/login"
        >
          Login
        </NavLink>
        </button>
      </div>
    </div>

    // </div>
  );
};
export default Nav;
