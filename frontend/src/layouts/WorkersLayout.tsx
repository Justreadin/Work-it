import { Navigate, Outlet } from "react-router-dom";
import Footer from "../home/Footer";
import HeaderWrapper from "../header/HeaderWrapper";
import { useSelector } from "react-redux";
import { RootStore } from "../store/globalStor";

const allowedRole = import.meta.env.VITE_WORKER;

{/* workers layout: Every route under this layout is protected. token and correct role code is required*/}
const WorkersLayout = () => {
  const { token, role } = useSelector((state: RootStore) => state.auth);
  return (
    <>
      {token !== "" && role === allowedRole ? (
        <main>
          <header>
            <HeaderWrapper />
          </header>
          <Outlet />
          <footer>
            <Footer />
          </footer>
        </main>
      ) : (
        <Navigate to="/home" />
      )}
    </>
  );
};

export default WorkersLayout;
