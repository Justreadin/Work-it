import React, { useEffect, useState } from "react";
import nairaHash from "../../assets/Images/Vector.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const JobList: React.FC = () => {
  interface Job {
    title: string;
    description: string;
    number: number;
    id: string,
    price: number;
    location: string
  }
  interface similarJob {
    title: string;
    description: string;
    number: number;
    price: number;
    location: string
  }
  const navigate = useNavigate()

  const [jobList, setJobList] = useState<Job[]>([]);
  const job = {
    title: " LinkedIn Assistant for just replying messages",
    description:
    "If you love building connections and keeping conversations flowing, read on. We’re a growing team that values authentic engagement, and we need someone to help manage our LinkedIn inbox. You’ll be the go-to person for replying to messages, keeping our conversations professional yet personable, and ensuring no opportunity slips through the crack...",
    price: 8000,
    number: 30,
    location: "Lagos"
  };

  const createList = (arr: similarJob) => {
    let list = [];
    for (let i = 0; i < 6; i++) {

      list.push({...arr, id:  `${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,});
    }
    setJobList(list);
  };


  useEffect(() => {
    createList(job);
  }, []);

  console.log(jobList)

  const handleClick = (id: string)=>{
    navigate(`/gigs/details/${id}`)
  }

  if (jobList.length === 0) {
    return <div>No job</div>;
  }

  return (
    <div className="w-full mt-20">
      <h1 className="text-customPurple text-center md:text-left text-3xl font-bold">
        Recently uploaded
      </h1>
      <p className="text-xl text-dark_gray text-center md:text-left opacity-80 mt-6">
        Browse jobs that match your experience to a client's hiring preferences.
        Ordered by most relevant.
      </p>

      {/* Job Listing Mapping starts here */}

      {jobList.map((item:Job) => (
        <div key={item.id} onClick={()=>handleClick(item.id)} className="mt-6 bg-gray-100 p-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="w-full md:w-1/2">
              <p className="text-3xl md:text-5xl text-dark_gray opacity-80">{item.title}</p>
            </div>
            <div className="flex space-y-9 md:space-y-0 md:flex-col items-end justify-between text-dark_gray opacity-80">
              <div className="flex items-center space-x-2.5 text-3xl md:text-4xl">
                <img src={nairaHash} alt="Naira icon" />
                <span>{item.price}</span>
              </div>
              <p className="text-xl">posted 19mins ago</p>
            </div>
          </div>

          <p className="text-dark_gray opacity-80 text-xl font-normal my-9">
            {item.description}
          </p>

          <div className="flex flex-wrap md:flex-nowrap items-center justify-between">
            <div className="">
              <div className="grid grid-cols-2 gap-4 md:flex md:items-center md:space-x-5">
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

              <p className="text-xl text-customPurple font-bold mt-6">
                Number of workers needed:{" "}
                <span className="font-normal">{item.number}</span>
              </p>
            </div>

            <div className="w-full md:w-auto mt-6 md:mt-0">
              <p className="text-dark_gray w-full opacity-80 flex justify-between md:flex-col md:items-end text-3xl">
                <FaMapMarkerAlt />
                <span>{item.location}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default JobList;
