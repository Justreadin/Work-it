// HeaderWrapper.tsx
import React from "react";
import HeaderContextProvider from "../contexts/HeaderContext";
import Header from "./Header";
import HeaderAction from "./HeaderAction";

interface HeaderWrapperProps {
  headerActionProps?: React.ComponentProps<typeof HeaderAction>;
  backgroundClass?: string;
  navTextColor?: string;
  imageLogo?: string
  navActiveClasses?: string;
  showNav?: boolean; // <-- new
  showNavComponent?: boolean;
}

const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ headerActionProps, backgroundClass, navTextColor, navActiveClasses, imageLogo, showNav = true, showNavComponent = true}) => {
  return (
    <HeaderContextProvider>
      <Header headerActionProps={headerActionProps} backgroundClass={backgroundClass} navTextColor={navTextColor}
      navActiveClasses={navActiveClasses} imageLogo={imageLogo} showNav={showNav} showNavComponent={showNavComponent} />
    </HeaderContextProvider>
  );
};

export default HeaderWrapper;
