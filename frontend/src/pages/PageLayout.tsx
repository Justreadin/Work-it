import { Outlet } from "react-router-dom";
import HeaderWrapper from "../header/HeaderWrapper";
import Footer from "../home/Footer";
const PageLayout = () => {
  return (
    <>
      <header className="h-20 md:h-40">
        <HeaderWrapper />
      </header>
      <Outlet />
      <footer>
        <Footer />
      </footer>
    </>
  );
};
export default PageLayout;
