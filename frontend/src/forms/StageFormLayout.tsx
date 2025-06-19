import React, { useCallback, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useForm } from "../contexts/FormContext";
const StageFormLayout: React.FC = () => {
  const formState = useForm();
  const location = useLocation();

  const updated_location_state = useCallback(() => {
    if (!formState) return;
    const saved_personal_info = localStorage.getItem("personalIfo");
    const saved_edu_info = localStorage.getItem("education");
    const saved_interest = localStorage.getItem("interest");
    const s = () => {
      return location.pathname === "/sign-upprofile/interest" && saved_edu_info
        ? true
        : false;
    };

    const is_personal_filled_or_location =
      location.pathname === "/sign-upprofile" || saved_personal_info
        ? true
        : false;
    const is_education_location_or_filled_and_location_interest =
      location.pathname === "/sign-upprofile/education" || s();
    const is_interest_location_or_filled =
      location.pathname === "/sign-upprofile/interest" || saved_interest
        ? true
        : false;
    const new_location_status = {
      personalInfor: is_personal_filled_or_location,
      education: is_education_location_or_filled_and_location_interest,
      interest: is_interest_location_or_filled,
    };

    formState.setFilled(new_location_status)

  }, [location.pathname]);


  useEffect(() => {
    updated_location_state()
  }, [updated_location_state]);

  
  return (
    <div className="flex flex-col items-center px-[5%] md:px-[10%] py-10 w-full h-screen bg-white">
      <div className="w-full md:w-auto flex items-center space-x-3 lg:space-x-6 px-4">
        <button
          className={`${
            formState?.filled.personalInfor
              ? "bg-dark_purple text-white"
              : "bg-white_gray text-dark_purple"
          } w-12 h-12  border-none rounded-full  text-xs md:text-base font-bold`}
        >
          1
        </button>
        <hr className="border-2 border-dark_purple w-1/3 md:w-36" />
        <button
          className={`${
            formState?.filled.education
              ? "bg-dark_purple text-white"
              : "bg-white_gray text-dark_purple"
          } w-12 h-12 border-none rounded-full text-xs md:text-base font-bold`}
        >
          2
        </button>
        <hr className="border-2 border-dark_purple  w-1/3 md:w-36" />
        <button
          className={`${
            formState?.filled.interest
              ? "bg-dark_purple text-white"
              : "bg-white_gray text-dark_purple"
          } w-12 h-12 border-none rounded-full text-xs md:text-base font-bold`}
        >
          3
        </button>
      </div>
      <div className="flex justify-end w-full">
        <NavLink
          className="bg-white_gray text-dark_purple mt-4 font-bold text-base rounded-3xl border-transparent border-2 hover:border-dark_purple px-8 py-2.5"
          to="/login"
        >
          Skip
        </NavLink>
      </div>
      <div className="flex flex-col items-center w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default StageFormLayout;
