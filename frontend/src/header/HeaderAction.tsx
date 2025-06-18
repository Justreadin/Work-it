import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import BecomeAclientButton from "../ui/BecomeAclientButton";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

interface HeaderActionProps {
  showSearch?: boolean;
  showBackButton?: boolean; 
  searchPlaceholder?: string;
  clientActionText?: string;
  clientLink?: string;
  placeholderColor?: string;
  searchButton?: string;
  showLogin?: boolean;
  onSearchChange?: (value: string) => void;
}

const HeaderAction: React.FC<HeaderActionProps> = ({
  showSearch = false,
  showBackButton = false, 
  searchPlaceholder = "Search for opportunities",
  clientActionText = "Become a Client",
  placeholderColor = "text-dark_gray",
  searchButton = "border-2",
  clientLink = "/client",
  showLogin= true,
  onSearchChange,
}) => {
  return (
    <div className="flex items-center gap-8">
        {/* Back Button */}
      {showBackButton && (
        <Link to="/client" className="flex items-center gap-3 text-white hover:underline text-lg">
          <HiArrowLeft/>
          back to Website
        </Link>
      )}
      {showSearch ? (
        <div className={`${searchButton} flex items-center space-x-2 rounded-3xl border-gray-200 p-2.5 text-gray-300`}>
          <AiOutlineSearch className="h-5 w-5" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className={`${placeholderColor} border-none bg-transparent px-2 text-lg font-medium focus:outline-none`}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>
      ) : showLogin ? (
        <NavLink
          to="/login"
          className="rounded-3xl border border-customPurple bg-white_gray px-6 py-2.5 font-bold text-customPurple hover:border-white_gray hover:bg-customPurple hover:text-white_gray"
        >
          Login
        </NavLink>
      ): null}

      <BecomeAclientButton actionName={clientActionText} link={clientLink}  />
    </div>
  );
};

export default HeaderAction;