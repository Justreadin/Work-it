import React from "react";
import Hero from "../home/Hero"
import WhoWeAre from "../home/WhoWeAre";
import Opportunities from "../home/Opportunities";
import Uniqueness from "../home/Uniqueness";
import Equip from "../home/Equip";

// import Hero from "../protected/welcome/Hero";
const Home: React.FC = () => {
  return (
    
     <>
      <div className="px-[5%] w-full">
        <Hero />
        <WhoWeAre />
        <Opportunities />
        <Uniqueness />
      </div>
      <Equip />
     </>
    
  );
};
export default Home;
