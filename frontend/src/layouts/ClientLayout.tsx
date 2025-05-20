
import HeaderWrapper from "../header/HeaderWrapper";
import Footer from "../home/Footer";
import { Outlet } from "react-router-dom";
import clientLogo from "../assets/Images/logo.png"

const ClientLayout = () => {
  return (
    <main className="">
      <header className="h-20 md:h-40">
         {/* Admin header will be here. Pass the right prop as you've modified the componenet */}
        <HeaderWrapper
          backgroundClass="bg-customPurple"
          headerActionProps={{
            showSearch: true,
            searchPlaceholder: "Search for talent",
            clientActionText: "Contact us",
            clientLink: "/hire",
            searchButton: "border-none bg-[#f9f9f933]",
            placeholderColor: "placeholder:text-gray-300"
          }}
          navTextColor="text-[#f9f9f9]"
          imageLogo={clientLogo}
          navActiveClasses="text-dark_purple font-bold rounded-full"
        />
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
