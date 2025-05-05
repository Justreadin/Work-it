import React from "react";
import FormNavButtons from "./FormNavButtons";
import { useNavigate } from "react-router-dom";
const Interest: React.FC = () => {
    const navigate = useNavigate()
    const handleBack=()=>{
        navigate("/sign-upprofile/education")
    }
    const handleNext = ()=>{
        navigate("/avatarupload")
    }

  return (
    <div className="w-full md:w-[70%] pb-[5%]">
      <h2 className="text-lg text-customPurple font-bold opacity-80 text-center">
        Interest
      </h2>
      <FormNavButtons
        handleBack={handleBack} 
        handleNext={handleNext}
      />
    </div>
  );
};
export default Interest;
