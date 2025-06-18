// Header.tsx
import HeaderAction from "./HeaderAction";
import Nav from "./Nav";
import logo from "../assets/Images/WORKIT LOGO.png";
import { useHeader } from "../contexts/HeaderContext";

interface HeaderProps {
  headerActionProps?: React.ComponentProps<typeof HeaderAction>;
  backgroundClass?: string;
  navTextColor?: string;
  imageLogo?: string;
  navActiveClasses?: string;
  showNav?: boolean;
  showNavComponent?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  headerActionProps,
  backgroundClass = "bg-white",
  navTextColor = "text-dark_gray",
  navActiveClasses = "text-dark_purple font-bold",
  imageLogo = logo,
  showNav = true,
  showNavComponent = true,
}) => {
  const holdState = useHeader();

  const handleDropDown = () => {
    holdState?.setHeaderState((prev) => ({
      ...prev,
      menu: !prev.menu,
    }));
  };

  return (
    <div
      className={`${backgroundClass} fixed z-50 flex w-full items-center justify-between px-[5%] py-4 shadow-md md:py-10`}
    >
      <div className="h-10 w-36 border-none">
        <img src={imageLogo} alt="logo icon" />
      </div>

      {showNav && (
        <>
          {showNavComponent && (
            <Nav textColor={navTextColor} activeClasses={navActiveClasses} />
          )}
          <div className="hidden md:block">
            <HeaderAction {...headerActionProps} />
          </div>
          <button
            onClick={handleDropDown}
            className="flex flex-col space-y-2 md:hidden"
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
        </>
      )}
    </div>
  );
};

export default Header;