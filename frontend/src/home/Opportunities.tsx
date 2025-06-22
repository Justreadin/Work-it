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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getListing = async () => {
      try {
        const response = await getGigList();
        console.log("Gig list response:", response.data);
        // Ensure data is an array before setting it
        if (Array.isArray(response.data)) {
          setJobList(response.data);
        } else {
          console.warn("Unexpected response format:", response.data);
          setJobList([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Failed to fetch gig list:", error);
        setJobList([]);
      } finally {
        setLoading(false);
      }
    };
    getListing();
  }, [token]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading jobs...</div>;
  }

  return (
      <div className="mt-6 text-center sm:text-left">
        <div>
          <h3 className="text-xl font-bold text-customPurple">
            Browse talent by category
          </h3>
          <p className="mt-6 text-4xl font-normal text-dark_gray">
            Looking for work?{" "}
            <span className="text-customPurple underline">Browse jobs</span>
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-6">
          {jobList.length > 0 ? (
              jobList.map((item, index) => (
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
              ))
          ) : (
              <p className="col-span-full text-gray-500">No jobs found.</p>
          )}
        </div>
      </div>
  );
};

export default Opportunities;
