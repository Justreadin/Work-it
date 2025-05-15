
import HeaderWrapper from "../header/HeaderWrapper";
import Footer from "../home/Footer";
import { Outlet } from "react-router-dom";


const ClientLayout = () => {
  return (
    <main className="">
      <header>
         {/* Admin header will be here. Pass the right prop as you've modified the componenet */}
        <HeaderWrapper />
      </header>
      <Outlet />
      {/* you can remove the footer */}
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default ClientLayout;
