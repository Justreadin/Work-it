import { AiOutlineSearch } from "react-icons/ai";
import BecomeAclientButton from "../ui/BecomeAclientButton";
import clientImg from "../assets/Images/imageClient.png"
import AlertBanner from "./AlertBanner";

const talents = [
  {
    name: "James Johnson",
    title: "Virtual sales Ass.",
    startDate: "23 FEB 2024",
    endDate: "Present",
    phone: "08172827364",
    email: "jamesjohnson@gmail.com",
    avatar: clientImg, // Replace with actual image
  },
  // Duplicate for demo – normally fetched from backend
  {
    name: "James Johnson",
    title: "Virtual sales Ass.",
    startDate: "23 FEB 2024",
    endDate: "Present",
    phone: "08172827364",
    email: "jamesjohnson@gmail.com",
    avatar: clientImg,
  },
  {
    name: "James Johnson",
    title: "Virtual sales Ass.",
    startDate: "23 FEB 2024",
    endDate: "Present",
    phone: "08172827364",
    email: "jamesjohnson@gmail.com",
    avatar: clientImg,
  },
];

const TalentList = () => {
  return (
    <div className="mx-auto w-full space-y-8 py-10">
      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className={`flex w-full items-center space-x-2 rounded-3xl border border-gray-200 p-2.5 text-gray-300`}>
            <AiOutlineSearch className="h-5 w-5" />
            <input
              type="text"
              placeholder="Search for talent"
              className={`order-none bg-transparent px-2 text-lg font-medium focus:outline-none`}
              onChange={(e) => (e.target.value)}
            />
        </div>
        <BecomeAclientButton actionName="Search" link="#"/>
      </div>

      {/* Section Header */}
      <h2 className="text-xl font-bold uppercase text-[#763DFF]">
        Talents I Am Working With
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left text-white">
          <thead>
            <tr className="text-center text-sm font-medium text-gray-400">
              <th className="py-2">Name</th>
              <th className="py-2">Starting date</th>
              <th className="py-2">End Date</th>
              <th className="py-2">Phone no.</th>
              <th className="py-2">Email</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {talents.map((talent, index) => (
              <tr key={index} className="text-center text-gray-700">
                <td className="flex items-center gap-3 py-4">
                  <img
                    src={talent.avatar}
                    alt={talent.name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div >
                    <p className="font-bold text-black">{talent.name}</p>
                    <p className="text-sm text-gray-400">{talent.title}</p>
                  </div>
                </td>
                <td>{talent.startDate}</td>
                <td>{talent.endDate}</td>
                <td>{talent.phone}</td>
                <td>{talent.email}</td>
                <td>
                  <BecomeAclientButton actionName="message" link="#"/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alert Section */}
      <AlertBanner />
    </div>
  );
};

export default TalentList;