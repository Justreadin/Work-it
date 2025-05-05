import React from "react"
interface NavFunctions{
    handleBack: ()=>void,
    handleNext: ()=>void
}
const FormNavButtons:React.FC<NavFunctions>=({handleBack, handleNext})=>{
    return(
        <div className="flex justify-between items-center mt-20">
        <button
          onClick={handleBack}
          className="bg-white_gray px-6 py-2 text-dark_purple rounded-3xl border-2 font-bold border-transparent hover:border-customPurple"
        >
          Back
        </button>
        <button
            onClick={handleNext}
          className="bg-dark_purple py-2 px-8 rounded-3xl text-white font-bold border-2 border-transparent hover:bg-white_gray hover:text-dark_purple hover:border-dark_purple"
        >
          Next
        </button>
      </div>
    )
}
export default FormNavButtons