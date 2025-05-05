import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaCheckCircle, FaClock } from "react-icons/fa";
import nairaHash from "../assets/Images/Vector.png";
interface Prop{
  id: string | undefined
}
const JobDetails: React.FC<Prop> = ({id}) => {
  interface Job {
    title: string;
    description: string;
    number: number;
    price: number;
    completedescription: string;
    location: string;
  }

  // This is the id to filter thr job clicked
  console.log(id)

  const [jobList, setJobList] = useState<Job[]>([]);
  const job: Job = {
    title: " LinkedIn Assistant for just replying messages",
    description:
      "If you love building connections and keeping conversations flowing, read on. We’re a growing team that values authentic engagement, and we need someone to help manage our LinkedIn inbox. You’ll be the go-to person for replying to messages, keeping our conversations professional yet personable, and ensuring no opportunity slips through the crack...",
    completedescription:
      "If you love building connections and keeping conversations flowing, read on. We’re a growing team that values authentic engagement, and we need someone to help manage our LinkedIn inbox. You’ll be the go-to person for replying to messages, keeping our conversations professional yet personable, and ensuring no opportunity slips through the crack If you lovebuilding connections and keeping conversations flowing, read on. We’re a growing team that values authentic engagement, and we need someone to help manage our LinkedIn inbox. You’ll be the go-to person for replying to messages, keeping our conversations professional yet personable, and ensuring no opportunity slips through the crack",
    price: 8000,
    number: 30,
    location: "Lagos",
  };

  const createList = (arr: Job) => {
    let list = [];
    for (let i = 0; i < 1; i++) {
      list.push(arr);
    }
    setJobList(list);
  };

  useEffect(() => {
    createList(job);
  }, []);

  const duties = [
    [
      "Calling",
      "Replying emails",
      "Checking emails",
      "Posting online",
      "Excerpt design",
    ],
    [
      "Commenting under post",
      "Checking notifications",
      "Booking Appointments",
      "Content writing",
      "Reminder",
    ],
    [
      "Joining my calls",
      "Taking Minutes",
      "Forwarding inboxes",
      "Proof Reading",
    ],
  ];

  return (
    <div className="mt-20">
      {jobList.map((item: Job, index: number) => (
        <div key={index} className="mt-6 bg-gray-100 p-4">
          <div className="flex justify-between">
            <div className="w-1/2">
              <p className="text-5xl text-dark_gray opacity-80">{item.title}</p>
            </div>
            <div className="flex flex-col items-end justify-between text-dark_gray opacity-80">
              <div className="flex items-center space-x-2.5 text-4xl">
                <img src={nairaHash} alt="Naira icon" />
                <span>{item.price}</span>
              </div>
              <p className="text-xl">posted 19mins ago</p>
            </div>
          </div>

          <div className="border-b-4 border-gray-300 w-full space-y-6 py-5 mb-6">
            <p className="text-dark_gray opacity-80 text-xl font-normal">
              {item.description}
            </p>
            <p className="text-dark_gray opacity-80 text-xl font-normal">
              {item.completedescription}
            </p>
          </div>

          <div className="">
            <h3 className="text-xl font-bold text-dark_gray opacity-80">
              CONTRACT
            </h3>
            <div className="flex space-x-20 mt-6">
              {duties.map((items, index) => {
                return (
                  <ul key={index} className="space-y-6">
                    {items.map((item, idx) => {
                      return (
                        <li
                          key={idx}
                          className="flex space-x-5 selection:text-xl text-dark_gray opacity-80"
                        >
                          <FaCheckCircle />
                          <span>{item}</span>
                        </li>
                      );
                    })}
                  </ul>
                );
              })}
            </div>
            <div className="flex items-center bg-gray-200 space-x-4 border-l-8 p-4 my-6 border-dark_purple border-b-4 border-b-gray-400">
              <div className="bg-[#D9D9D9] h-8 w-8 rounded-sm"></div>
              <p className="text-xl text-customPurple opacity-80">
                This is the contract definition of this job... Please dont do
                more than this if you get employed. Report any client trying to
                bridge the contract{" "}
              </p>
            </div>
          </div>

          <div className="flex justify-between">
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

            <div className="flex h-fit space-x-4 text-dark_gray opacity-80 items-center text-xl">
              <div>
                <FaClock />
              </div>
              <p>3 Months</p>
            </div>

            <div>
              <p className="text-dark_gray opacity-80 flex text-3xl">
                <FaMapMarkerAlt />
                <span>{item.location}</span>
              </p>
            </div>
          </div>

          <div className="w-full flex justify-between px-5 mt-10 items-center">
            <p className="text-xl text-customPurple font-bold mt-6">
              Number of workers needed:{" "}
              <span className="font-normal">{item.number}</span>
            </p>
            <div className="space-y-2">
              <p className="text-base text-dark_gray opacity-80">
                Application deadline
              </p>
              <p className="text-basse font-bold text-customPurple">
                12hr : 09mins : 45sec
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center mt-16">
            <button className="py-3 px-16 bg-dark_purple border-2 border-transparent hover:border-dark_purple hover:bg-white hover:text-dark_purple text-white font-bold rounded-3xl">
              Apply
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobDetails;
