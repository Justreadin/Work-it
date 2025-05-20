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
}

const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ headerActionProps, backgroundClass, navTextColor, navActiveClasses, imageLogo }) => {
  return (
    <HeaderContextProvider>
      <Header headerActionProps={headerActionProps} backgroundClass={backgroundClass} navTextColor={navTextColor}
      navActiveClasses={navActiveClasses} imageLogo={imageLogo} />
    </HeaderContextProvider>
  );
};

export default HeaderWrapper;
