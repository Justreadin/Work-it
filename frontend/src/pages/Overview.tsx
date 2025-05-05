import React from "react";
import Hero from "../protected/welcome/Hero";
import JobSearch from "../protected/welcome/Jobs";
import JobList from "../protected/welcome/JobList";
import Uniqueness from "../home/Uniqueness";
import Equip from "../home/Equip";
import DangerWarning from "../protected/welcome/DangerWarning";
const Overview: React.FC = () => {
  return (
    <>
      <div className="px-[5%]">
        <Hero />
        <JobSearch />
        <JobList />
        <DangerWarning/>
      </div>
      <Uniqueness />
      <Equip />
    </>
  );
};
export default Overview;
