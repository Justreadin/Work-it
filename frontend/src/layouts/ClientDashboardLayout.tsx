// import HeaderWrapper from "../header/HeaderWrapper";
// import { Outlet } from "react-router-dom";
// import clientLogo from "../assets/Images/logo.png";

// const ClientDashboardLayout = () => {
//   return (
//     <main>
//       <header className="h-20 md:h-28">
//         <HeaderWrapper
//           backgroundClass="bg-customPurple"
//           navTextColor="text-white"
//           imageLogo={clientLogo}
//           showNav={false} // <-- hide nav in dashboard
//           headerActionProps={{
//             showBackButton: true,
//             clientActionText: "Contact us",
//             clientLink: "/hire",
//   }}
// />

//       </header>

//       <section className="min-h-screen bg-white">
//         <Outlet />
//       </section>
//     </main>
//   );
// };

// export default ClientDashboardLayout;

import { Outlet } from "react-router-dom";
import HeaderWrapper from "../header/HeaderWrapper";
import clientLogo from "../assets/Images/logo.png";
import Nav from "../header/Nav";
import { AiOutlineSearch } from "react-icons/ai";

const ClientDashboardLayout = () => {
  return (
    <main className="min-h-screen bg-[#F0ECFF]">
      <header className="h-20 md:h-28">
        <HeaderWrapper
          backgroundClass="bg-customPurple"
          navTextColor="text-white"
          imageLogo={clientLogo}
          showNavComponent={false}
          showNav={true} // Hide main nav inside dashboard
          headerActionProps={{
            showBackButton: true, 
            clientActionText: "Contact us",  // Change CTA label
            clientLink: "/hire",             // Route for CTA button
          }}
        />

        <div className="py-[5rem]"></div>
            <div
              className={`fixed z-50 flex w-full items-center justify-between bg-customPurple px-[5%] py-4 shadow-md md:py-5`}
            >
            <Nav isDashboard activeClasses="text-dark_purple font-bold" textColor="text-white" />
            <div className={`searchButton flex items-center space-x-2 rounded-3xl border-gray-200 bg-[#f9f9f933] p-2.5 text-gray-300`}>
                <AiOutlineSearch className="h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for talent"
                  className={`border-none bg-transparent px-2 text-lg font-medium text-dark_gray focus:outline-none`}
                  // onChange={(e) => onSearchChange?.(e.target.value)}
                />
            </div>
          </div>
      </header>

      <section className="px-4 py-8 md:px-20">
        <Outlet />
      </section>
    </main>
  );
};

export default ClientDashboardLayout;
