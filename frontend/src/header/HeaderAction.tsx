import React from "react";
import { NavLink } from "react-router-dom";
import BecomeAclientButton from "../ui/BecomeAclientButton";
import { useSelector } from "react-redux";
import { RootStore } from "../store/globalStor";
import JobSearch from "../protected/welcome/Jobs";

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
  clientActionText = "Become a Client",
  clientLink = "/client",
}) => {
  const auth = useSelector((state: RootStore)=> state.auth)
  return (
    <div className="flex items-center space-x-7">
      {auth.token !== ""  ? (
        <JobSearch header/>
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