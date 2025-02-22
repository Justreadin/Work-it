import React from "react";
import Hero from "../protected/welcome/Hero";
import DangerWarning from "../protected/welcome/DangerWarning";
import Uniqueness from "../home/Uniqueness";
import Equip from "../home/Equip";
import JobDetails from "../component/JobDetails";
import Opportunities from "../home/Opportunities";
import ApplyModal from "../component/ApplyModal";
// import { useParams } from "react-router-dom";
const ApplyForJob: React.FC = () => {
  // const{id}=useParams()
  return (
    <>
     <ApplyModal/>
      <div className="px-[5%]">
        <Hero />
        <JobDetails />
        <DangerWarning />
        <Opportunities />
        <Uniqueness />
        <Equip />
      </div>
    </>
  );
};

export default ApplyForJob;
