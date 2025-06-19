import React from "react";
import FormNavButtons from "./FormNavButtons";
import { interest } from "./data";
import { MdOutlineClose } from "react-icons/md";
import { useInterest } from "../hooks/UseInterest";

const Interest: React.FC = () => {
  const {handleChange, handleBack, handleNext, interests, setInterests, error  }= useInterest()

  return (
    <div className="w-full max-w-4xl pb-[5%] space-y-6 px-[5%] md:px-0">
      <h2 className="text-lg text-customPurple font-bold opacity-80 text-center">
        Interest
      </h2>
      <form className="grid md:grid-cols-4 space-y-4">
        {interest.map((item) => (
          <div key={item} className="flex gap-3 items-center">
            <input
              onChange={(e) => handleChange(e)}
              id={item}
              checked={interests.interest.includes(item)}
              type="checkbox"
            />
            <span>{item}</span>
          </div>
        ))}
      </form>

      {/* inerest error */}
      <span className="text-base font-semibold text-red-500 space-y-4">{error.interest}</span>

      <div className="space-y-4">
        <h2 className="text-xl font-bold uppercase">My Skills</h2>
        <div className="flex flex-col w-full">
          <span className="text-base font-semibold text-red-500 space-y-4">{error.skills}</span>
          <input
            name="skill"
            value={interests.skill}
            onChange={(e) => handleChange(e)}
            placeholder="start typing and press enter to add"
            onKeyDown={(e) => {
              if (e.key === "Enter" && interests.skill.trim() !== "") {
                setInterests((prev) => {
                  if (!prev.skills.includes(prev.skill.trim())) {
                    return {
                      ...prev,
                      skills: [...prev.skills, prev.skill.trim()],
                      skill: "",
                    };
                  }
                  return { ...prev, skill: "" };
                });
              }
            }}
            type="text"
            className="p-2 text-black border-2 border-gray-300 text-base w-full md:w-1/2"
          />
        </div>
        <div className="flex items-center flex-wrap gap-4 w-full ">
          {interests.skills.length !== 0 &&
            interests.skills.map((item) => (
              <div
                key={item}
                className="bg-gray-300 text-dark_gray rounded-full py-2 px-3 min-w-fit flex items-center gap-2"
              >
                <span>{item}</span>
                <button
                  onClick={() => {
                    setInterests((prev) => {
                      return {
                        ...prev,
                        skills: prev.skills.filter((val) => val !== item),
                      };
                    });
                  }}
                  className="bg-white rounded-full border-none text-2xl"
                >
                  <MdOutlineClose />
                </button>
              </div>
            ))}
        </div>
      </div>
      <p className="text-base text-red-500">{error.post}</p>
      <FormNavButtons handleBack={handleBack} handleNext={handleNext} />
    </div>
  );
};
export default Interest;
