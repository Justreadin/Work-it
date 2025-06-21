import React, { useEffect, useState } from "react";
import "../index.css";
import { Gig } from "../type";
import { useGetGigList } from "../api/JobApi";
import { useSelector } from "react-redux";
import { RootStore } from "../store/globalStor";

const Opportunities: React.FC = () => {
  const token = useSelector((state: RootStore) => state.auth.token);
  const { getGigList } = useGetGigList(token);
  const [jobList, setJobList] = useState<Gig[]>([]);
  useEffect(() => {
    const getListing = async () => {
      const response = await getGigList();
      setJobList(response.data);
    };
    getListing();
  }, [token]);

  return (
    <div className="mt-6 text-center sm:text-left">
      <div>
        <h3 className="text-xl font-bold text-customPurple">
          Browse talent by category
        </h3>
        <p className="mt-6 text-4xl font-normal text-dark_gray">
          Looking for work? 
          <span className="text-customPurple underline">Browse jobs</span>
        </p>
      </div>
      <div className="mt-6 grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-6">
        {jobList.length !== 0 &&
          jobList.map((item, index) => {
            return (
              <div
                className="dropshadow justify-between space-y-5 rounded-lg bg-white_gray px-4 py-5 text-left sm:space-y-0"
                key={index}
              >
                <h3 className="text-3xl font-normal opacity-80 sm:text-xl">
                  {item.title}
                </h3>
                <p className="text-base text-dark_gray opacity-80">
                  {jobList.length}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Opportunities;
