import React from "react";
import HeaderContextProvider from "../contexts/HeaderContext";
import Header from "./Header";

const HeaderWrapper: React.FC = () => {
  return (
    <HeaderContextProvider>
      <Header />
    </HeaderContextProvider>
  );
};
export default HeaderWrapper;
