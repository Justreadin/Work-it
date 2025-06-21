import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaCheckCircle, FaClock } from "react-icons/fa";
import nairaHash from "../assets/Images/Vector.png";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../store/globalStor";
import { useGetGig } from "../api/JobApi";
import { Gig } from "../type";
import { toastActions } from "../store/toastSlice";
import  { SectionLoader } from "../ui/LoadingSpinner";
import { gigAction } from "../store/gigSlice";

interface Prop {
  id: string | undefined;
}
const JobDetails: React.FC<Prop> = ({ id }) => {
  const token = useSelector((state: RootStore) => state.auth.token);
  const { getGigById } = useGetGig(id as string, token);
  const [gig, setGig] = useState<Gig>();
  const dispatch = useDispatch();

  useEffect(() => {
    const getGig = async () => {
      try {
        const response = await getGigById();
        setGig(response.data);
      } catch (err) {
        if (err instanceof Error) {
          dispatch(
            toastActions.showToast({ success: false, message: err?.message })
          );
        } else {
          dispatch(
            toastActions.showToast({
              success: false,
              message: "Unknown error occoured",
            })
          );
        }
      }
    };
    getGig();
  }, [id, token]);


  return (
    <div className="mt-20">
      {gig && (
        <div className="mt-6 bg-gray-100 p-4">
          {/* top content */}
          <div className="flex justify-between">
            <div className="w-1/2">
              <p className="text2xl md:text-3xl text-dark_gray opacity-80">
                {gig.title}
              </p>
            </div>
            <div className="flex flex-col items-end justify-between text-dark_gray opacity-80">
              <div className="flex items-center space-x-2.5 text-4xl">
                <img src={nairaHash} alt="Naira icon" />
                <span className="text-2xl md:text-3xl">{gig.price}</span>
              </div>
              <p className="text-xl">posted 19 mins ago</p>
            </div>
          </div>

          {/* Job seacription */}
          <div className="border-b-4 border-gray-300 w-full  py-5 mb-6">
            <h2 className="textxl uppercase text-dark_gray font-bold mb-3">
              Job Description
            </h2>
            <div className="space-y-5 text-dark_gray opacity-80 text-lg md:text-base font-normal">
              {gig.description}
            </div>
          </div>
          {/* end of job description */}

          {/* Contract section */}
          <div className="">
            <h3 className="text-xl font-bold text-dark_gray">CONTRACT</h3>
            <div className="flex space-x-20 mt-6">
              {
                <ul className="grid grid-cols-1 md:grid-cols-4">
                  {gig.contract.map((item, idx) => {
                    return (
                      <li
                        key={idx}
                        className="flex space-x-5 text-xl md:text-lg text-dark_gray opacity-80"
                      >
                        <FaCheckCircle />
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              }
            </div>

            {/* contract footer starts here */}
            <div className="flex items-center bg-gray-200 space-x-4 border-l-4 p-4 my-6 border-dark_purple border-b-2 border-b-gray-400">
              <div className="bg-[#D9D9D9] h-8 w-8 rounded-sm"></div>
              <p className="text-lg text-customPurple opacity-80">
                This is the contract definition of this job... Please dont do
                more than this if you get employed. Report any client trying to
                bridge the contract{" "}
              </p>
            </div>
            {/* contract footer ends here */}
          </div>

          {/* Second to the last  */}
          <div className="flex justify-between">
            {/* left part  starts here*/}
            <div className="">
              <div className="flex items-center space-x-5">
                {["LinkedIn", "Communication", "Assistant", "Lagos"].map(
                  (item, index) => {
                    return (
                      <button
                        key={index}
                        className="p-4 py-2 bg-gray-400 text-dark_gray opacity-80 text-base rounded-3xl"
                      >
                        {item}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
            {/* left parts ends here */}

            <div className="flex h-fit space-x-4 text-dark_gray opacity-80 items-center text-xl">
              <div>
                <FaClock />
              </div>
              <p>3 Months</p>
            </div>

            <div>
              <p className="text-dark_gray opacity-80 flex gap-2 items-center text-xl md:text-lg">
                <FaMapMarkerAlt />
                <span>{gig.location}</span>
              </p>
            </div>
          </div>

          <div className="w-full flex justify-between px-5 mt-10 items-center">
            <p className="text-xl text-customPurple font-bold mt-6">
              Number of workers needed: <span className="font-normal">{}</span>
            </p>
            <div className="space-y-2 text-base">
              <p className="text-dark_gray opacity-80">Application deadline</p>
              <p className="font-bold text-customPurple">
                12hr : 09mins : 45sec
              </p>
            </div>
          </div>
          {/* Apply Button container */}
          <div className="w-full flex justify-center mt-16">
            <button
              onClick={()=> dispatch(gigAction.openApplyModal())}
              className="py-2 px-16 bg-dark_purple border-2 border-transparent hover:border-dark_purple hover:bg-white hover:text-dark_purple text-white font-bold rounded-full"
            >
              Apply
            </button>
          </div>
        </div>
      )}
      {!gig && (
        <div className="flex items-center w-full">
          <SectionLoader/>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
