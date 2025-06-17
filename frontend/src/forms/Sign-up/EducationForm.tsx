import React, { useEffect, useRef } from "react";
import useEduForm from "../hooks/UseEdducationForm";
const EducationForm: React.FC = () => {

  // const[education, setEducation]=useState<EduProp>(
  //   {highestDegree: "",nameOfSchool:"",startDate: "",endDate:"",schooling: false,schoolState:"",schoolCountry: ""}
  // )

  //const[error,setErr]=useState<EduErrorProp>({highestDegree: "",nameOfSchool:"",startDate: "",endDate:"",schooling: false,schoolState:"",schoolCountry: "" })

  const selectRef = useRef<HTMLSelectElement | null>(null)
  useEffect(
    ()=>{
      selectRef.current?.focus()
    },[]

    
  )

  const {education,
    error,
    handleChange,
    handleBack,
    handleSubmit,
    location,
    status,
    handleNext}= useEduForm()

  return (
    <div className="w-full md:w-[70%] pb-[5%]">
      <h2 className="text-lg text-customPurple font-bold opacity-80 text-center">
        Educational Background
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        {/* Highest degree*/}
        <div className="w-full md:w-1/2 ">
          <label className="text-dark_gray opacity-80" htmlFor="highesstDegree">
            Highest degree {" "}
            <span className="text-xs text-red-500 font-semibold">{error.highestDegree}</span>
          </label>
          <select
            name="highestDegree"
            ref={selectRef}
            value={education.highestDegree}
            onChange={(e)=>handleChange(e)}
            className="w-full border-2  focus:outline-customPurple px-5 py-3 rounded-3xl"
          >
            <option className="text-dark_purple font-semibold" value="">
              --Selec Higest Degree--
            </option>
            {["Phd", "M.sc", "B.sc", "B.eng", "HND", "OND", "College"].map(
              (item, index) => (
                <option
                  key={index}
                  className="text-dark_purple font-semibold px-9"
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>
        </div>

        {/* Name of school */}
        <div className="mt-4 w-full">
          <label className="text-dark_gray opacity-80"> Name of school </label> {" "}
          <span className="text-xs text-red-500 font-semibold">{error.nameOfSchool}</span>
          <input
            type="text"
            name="nameOfSchool"
            value={education.nameOfSchool}
            className="w-full px-4 py-3 border-2 border-gray-400 rounded-3xl focus:outline-customPurple"
            onChange={(e) => handleChange(e)}
            placeholder="Type in the name of your school here"
          />
        </div>

        <div className="w-full flex flex-col my-6 md:flex-row md:items-center md:space-x-5">
          {/* Start Date */}
          <div className="w-full">
            <label className="text-dark_gray opacity-80" htmlFor="startDate">
              Start date {" "}
              <span className="text-xs text-red-500 my-10 font-semibold">{error.startDate}</span>
            </label><br />
            
            <input
              className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple p-3"
              type="Date"
              name="startDate"
              value={education.startDate}
              onChange={(e)=>handleChange(e)}
              placeholder="_ _/_ _/_ _"
              required
            />
          </div>

          {/* End date */}
          <div className="w-full">
            <label className="text-dark_gray opacity-80" htmlFor="endDate">
              End date {" "}<span className="text-xs text-red-500 my-10 font-semibold">{error.endDate}</span>
            </label><br />
            
            <input
              className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple p-3"
              type="date"
              value={education.endDate}
              name="endDate"
              onChange={(e)=>handleChange(e)}
              placeholder="_ _/_ _/_ _"
              required
            />
            <br />
          </div>
        </div>

        {/* Still schooling */}
        <div className="">
          <span className="text-xs text-red-500 font-semibold">{error.schooling}</span>{" "}<br/>
          <span className="text-dark_gray opacity-80 mr-4">I am still schooling</span>{" "}
          
          <input
            type="checkbox"
            name="schooling"
            value={education.schooling? "chedcked": "unchecked"}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="w-full flex flex-col my-6 md:flex-row md:items-center md:space-x-5">
          {/* State */}
          <div className="w-full">
            <label className="text-dark_gray opacity-80" htmlFor="schoolState">
              State: {" "}
              <span className="text-xs text-red-500 font-semibold">{error.schoolState}</span>
            </label>
            <select
              name="schoolState"
              value={education.schoolState}
              onChange={(e)=>handleChange(e)}
              className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple px-4 py-3"
            >
              <option className="text-dark_purple font-semibold" value="">
                --Select state
              </option>
              {
                !status.loadingStates && location.states.length !== 0 && location.states.map((item)=>
                <option value={item.isoCode}>{item.name}</option>)
              }
            </select>
          </div>

          {/* Country */}

          <div className="w-full my-6 md:my-0">
            <label className="text-dark_gray opacity-80" htmlFor="schoolCountry">Country
              {" "}
            <span className="text-xs text-red-500 font-semibold">{error.schoolCountry}</span>
            </label>
            <select
              name="schoolCountry"
              value={education.schoolCountry}
              onChange={(e)=>handleChange(e)}
              className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple px-4 py-3"
            >
              <option className="text-dark_purple font-semibold" value="">
                --Select Country
              </option>
              { status.loadingCountries && (<option value="">Loading...</option>)}
              {
                !status.loadingCountries && location.countries.length > 0 && location.countries.map((item)=>
                  <option key = {item.isoCode} value={item.name}>{item.name}</option>
                )
              }
            </select>
          </div>
        </div>
      </form>
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
    </div>
  );
};
export default EducationForm;
