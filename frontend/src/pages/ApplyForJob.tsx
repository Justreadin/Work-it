// import React, {useState, useEffect} from "react";
import Hero from "../protected/welcome/Hero";
import DangerWarning from "../protected/welcome/DangerWarning";
import Uniqueness from "../home/Uniqueness";
import Equip from "../home/Equip";
import JobDetails from "../components/JobDetails";
import Opportunities from "../home/Opportunities";
import { useParams} from "react-router-dom";
import ApplyModal from "../modals/ApplyModal";
import { useSelector } from "react-redux";
import { RootStore } from "../store/globalStor";
const ApplyForJob: React.FC = () => {

  const{id}=useParams()
  const {apply_modal_status} = useSelector((state: RootStore)=> state.gig)
  
  return (
    <>
    {
      apply_modal_status && <ApplyModal/>
    }
      <div className="px-[5%]">
        <Hero />
        <JobDetails id={id} />
        <DangerWarning />
        <Opportunities />
        <Uniqueness />
        <Equip />
      </div>
    </>
  );
};

export default ApplyForJob;
