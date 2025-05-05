import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import BecomeAclientButton from "../ui/BecomeAclientButton"
const HeaderAction: React.FC = () => {
  const status = false;

  return (
    <div className="flex items-center space-x-7">
      {status ? (
        <div className="flex items-center border-2 border-gray-200 text-gray-300 rounded-3xl p-2.5 space-x-2">
          <AiOutlineSearch className="w-5 h-5" />
          <input
            type="text"
            className="text-dark_gray text-lg font-medium border-none px-2"
            placeholder="Search for opportunities"
          />
        </div>
      ) : (
        <NavLink
          to="/login"
          className="px-6 py-2.5 rounded-3xl bg-white_gray hover:bg-customPurple hover:border-white_gray hover:text-white_gray border-customPurple font-bold text-customPurple border"
        >
          Login
        </NavLink>
      )}
      <BecomeAclientButton/>
      
    </div>
  );
};
export default HeaderAction;
