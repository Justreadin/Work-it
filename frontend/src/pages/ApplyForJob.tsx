// import React, {useState, useEffect} from "react";
import Hero from "../protected/welcome/Hero";
import DangerWarning from "../protected/welcome/DangerWarning";
import Uniqueness from "../home/Uniqueness";
import Equip from "../home/Equip";
// import JobDetails from "../component/JobDetails";
import Opportunities from "../home/Opportunities";
// import { useParams } from "react-router-dom";
import ApplyModal from "../modals/ApplyModal";
const ApplyForJob: React.FC = () => {
  // const{id}=useParams()

  // const[isOpen, setIsOpem] = useState(true)
  // // useEffect(()=>{
  // //   if(isOpen){
  // //     document.body.style.overflow = "hidden"
  // //     document.body.style.touchAction = "none"
  // //   }
  // //   else{
  // //     document.body.style.overflow = "auto"
  // //     document.body.style.touchAction = "auto"
  // //   }
  // // },[isOpen])
  
  return (
    <>
      
    
    {/* {isOpen && <ApplyModal/}> */}
    <ApplyModal/>
      <div className="px-[5%]">
        <Hero />
        {/* <JobDetails id={id} /> */}
        <DangerWarning />
        <Opportunities />
        <Uniqueness />
        <Equip />
      </div>
    </>
  );
};

export default ApplyForJob;
