import React from "react";
import { NavLink, Link } from "react-router-dom";
import BecomeAclientButton from "../ui/BecomeAclientButton";
import { HiArrowLeft } from "react-icons/hi";
import { RootStore } from "../store/globalStor";
import JobSearch from "../protected/welcome/Jobs";
import { useSelector } from "react-redux";

interface HeaderActionProps {
  showSearch?: boolean;
  showBackButton?: boolean;
  clientActionText?: string;
  clientLink?: string;
  searchButton?: string;
}

const HeaderAction: React.FC<HeaderActionProps> = ({
  // showSearch = false,
  showBackButton = false,
  clientActionText = "Become a Client",
  clientLink = "/client",
}) => {
  const auth = useSelector((state: RootStore) => state.auth);

  return (
    <div className="flex items-center gap-8">
      {/* Show Back Button and BecomeAclientButton if showBackButton is true */}

      <>
        {showBackButton && (
          <Link
            to="/client"
            className="flex items-center gap-3 text-lg text-white hover:underline"
          >
            <HiArrowLeft />
            back to Website
          </Link>
        )}

        <BecomeAclientButton actionName={clientActionText} link={clientLink} />
      </>

      {/* Show JobSearch or Login button only if showSearch is true */}

      <div className="flex items-center space-x-7">
        {auth.token !== "" ? (
          <JobSearch header />
        ) : (
          <NavLink
            to="/login"
            className="rounded-3xl border border-customPurple bg-white_gray px-6 py-2.5 font-bold text-customPurple hover:border-white_gray hover:bg-customPurple hover:text-white_gray"
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default HeaderAction;
