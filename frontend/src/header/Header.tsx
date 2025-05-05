import HeaderAction from "./HeaderAction";
import Nav from "./Nav";
import { useHeader } from "../contexts/HeaderContext";

const Header = () => {
  const holdState = useHeader();
  const handleDroDown = () => {
    holdState?.setHeaderState((prev) => {
      return { ...prev, menu: !prev.menu };
    });

  };
  return (
    <div className="w-full px-[5%] flex justify-between bg-white items-center py-4 md:py-10 shadow-md fixed z-50">
      <div className="w-36 h-10 bg-logo border-none"></div>
      <Nav />
           <div className="hidden md:block">
      <HeaderAction />
      </div>
      <button
        onClick={handleDroDown}
        className="flex space-y-2 md:hidden flex-col"
      >
        <span
          className={`bg-customPurple h-1 w-10 rounded-2xl duration-500 ${
            holdState?.headerState.menu
              ? "translate-y-3 rotate-45"
              : "translate-y-0"
          }`}
        ></span>
        <span
          className={`bg-customPurple h-0.5 w-5 self-end rounded-2xl duration-500 ${
            holdState?.headerState.menu ? "hidden" : "inline"
          }`}
        ></span>
        <span
          className={`bg-customPurple h-1 w-10 rounded-2xl duration-500 ${
            holdState?.headerState.menu ? "-rotate-45" : "rotate-0"
          }`}
        ></span>
      </button>
    </div>
  );
};
export default Header;
