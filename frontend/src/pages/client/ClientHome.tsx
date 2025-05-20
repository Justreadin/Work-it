import React from "react";
import Hero from "../../home/Hero";
import Opportunities from "../../home/Opportunities";
import Uniqueness from "../../home/Uniqueness";
import Equip from "../../home/Equip";
import BecomeAclientButton from "../../ui/BecomeAclientButton";
import leftImg from "../../assets/Images/clientImg.png";
import RoleTalentActions from "../../home/RoleTalentAction";
import TalentList from "../../home/TalentList";
// import Hero from "../protected/welcome/Hero";
const ClientHome: React.FC = () => {
  return (
    <>
      <div className="w-full px-[5%]">
        <Hero
          call="Did you know?"
          callSpanClassName="inline-block rotate-[-10deg] rounded bg-[#7A42FF] px-8 py-2 text-2xl font-bold text-white" 
          descript="You can increase your efficiency by "
          cent="30%"
          reason="by sourcing task"
          imageSrc={leftImg}
          showDescription={false}
          buttons={[
            <BecomeAclientButton key="post" actionName="Post a New Role " link="#" className="nonebg px-8nonebg rounded-3xl border-2 border-transparent bg-dark_purple px-12 py-2.5 text-base font-bold text-white hover:border-dark_purple hover:bg-white_gray hover:text-dark_purple" />
          ]}
        />
        <RoleTalentActions />
        <TalentList/>
        <Opportunities />
        <Uniqueness />
      </div>
      <Equip />
    </>
  );
};
export default ClientHome;
