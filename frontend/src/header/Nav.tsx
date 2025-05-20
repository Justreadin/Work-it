import React from "react";
import { NavLink } from "react-router-dom";
import { useHeader } from "../contexts/HeaderContext";
import BecomeAclientButton from "../ui/BecomeAclientButton";

interface NavProps {
  textColor?: string;
  activeClasses?: string;
  showMobileButtons?: boolean;
}

const Nav: React.FC<NavProps> = ({
  textColor = "text-dark_gray",
  activeClasses = "text-dark_purple font-bold",
  showMobileButtons = true,
}) => {
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
      location: "Contact",
      to: "/contact",
    },
  ];

  return (
    <div
      className={`${
        holdState?.headerState.menu
          ? "flex-col absolute top-16 left-0 w-full space-y-6 rounded-lg bg-inherit py-10"
          : "hidden"
      } md:flex h-11 items-center text-2xl duration-700 md:space-x-10`}
    >
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          className={({ isActive }) =>
            `${isActive ? activeClasses : `${textColor} font-normal`} ${
              holdState?.headerState.menu ? "block text-center" : ""
            }`
          }
        >
          {item.location}
        </NavLink>
      ))}

      {showMobileButtons && (
        <div className="flex flex-col items-center space-y-10 p-4 sm:hidden md:hidden">
          <BecomeAclientButton actionName="Become a Client" link="/client" />
          <NavLink
            to="/login"
            className="w-full rounded-3xl border border-customPurple bg-white_gray px-6 py-1.5 font-semibold text-customPurple hover:border-white_gray hover:bg-customPurple hover:text-white_gray"
          >
            Login
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Nav;