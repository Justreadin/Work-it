// RoleTalentActions.tsx
import { BiBarChartAlt2 } from "react-icons/bi";
import postImg from "../assets/Images/Secure.png";
import searchImg from "../assets/Images/Researching-pana 1.png";
import { AiOutlinePlus, AiOutlineUsergroupAdd } from "react-icons/ai";
// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const RoleTalentActions = () => {
  return (
    <div className="mx-auto mt-8 w-full overflow-hidden rounded-[2rem] text-white shadow-lg">
      {/* Top section */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Post a New Role */}
        <div className="flex flex-col-reverse items-center gap-4 bg-[#3D00A0] px-6 md:flex-row md:justify-end md:gap-12">
          <div className="flex gap-3 space-y-2 text-center md:text-left">
            <h3 className="text-lg font-semibold">Post a New Role</h3>
            <AiOutlinePlus className="mx-auto md:mx-0" />
          </div>
          <img src={postImg} alt="Post a role" className="w-20 object-contain md:mt-0 md:w-24" />
        </div>

        {/* Search a Talent */}
        <div className="flex flex-col-reverse items-center justify-center gap-4 bg-[#FFE600] px-6 text-[#3D00A0] md:flex-row md:justify-end md:gap-12">
          <div className="flex gap-3 space-y-2 text-center md:text-left">
            <h3 className="text-lg font-semibold">Search a talent</h3>
            <AiOutlineUsergroupAdd className="mx-auto md:mx-0" />
          </div>
          <img src={searchImg} alt="Search talent" className="mt-4 w-20 md:mt-0 md:w-20" />
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col items-center justify-center gap-2 bg-[#763DFF] py-5 text-center text-lg font-bold tracking-wide text-white md:flex-row">
        <NavLink to="/dashboard" >GO TO DASHBOARD</NavLink>
        <BiBarChartAlt2 className="h-5 w-5" />
      </div>
    </div>
  );
};

export default RoleTalentActions;