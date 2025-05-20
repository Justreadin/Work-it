import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import BecomeAclientButton from "../ui/BecomeAclientButton";

interface HeaderActionProps {
  showSearch?: boolean;
  searchPlaceholder?: string;
  clientActionText?: string;
  clientLink?: string;
  placeholderColor?: string;
  searchButton?: string;
  onSearchChange?: (value: string) => void;
}

const HeaderAction: React.FC<HeaderActionProps> = ({
  showSearch = false,
  searchPlaceholder = "Search for opportunities",
  clientActionText = "Become a Client",
  placeholderColor = "text-dark_gray",
  searchButton = "border-2",
  clientLink = "/client",
  onSearchChange,
}) => {
  return (
    <div className="flex items-center space-x-7">
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
      ) : (
        <NavLink
          to="/login"
          className="rounded-3xl border border-customPurple bg-white_gray px-6 py-2.5 font-bold text-customPurple hover:border-white_gray hover:bg-customPurple hover:text-white_gray"
        >
          Login
        </NavLink>
      )}

      <BecomeAclientButton actionName={clientActionText} link={clientLink} />
    </div>
  );
};

export default HeaderAction;