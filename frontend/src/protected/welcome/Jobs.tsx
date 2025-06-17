
import { FaSearch } from "react-icons/fa";
type Prop={
  header?: boolean
}
const JobSearch = ({header}:Prop) => {
  return (
    <div className={`w-full flex items-center ${!header? 'mt-14': 'mt-0'} px-1.5 md:space-x-6`}>
      <div className="border-2 flex items-center px-2 space-x-2 md:space-x-5 py-2.5 rounded-br-none rounded-tr-none md:rounded-3xl flex-1">
        <FaSearch className="text-gray-300" />
        <input
          type="text"
          name="serachword"
          placeholder="search for opportunities"
          className="w-full bg-white border-none text-dark_gray focus:outline-none"
        />
      </div>
      {
        !header && <button className=" px-2 md:px-11 border-transparent border-2 hover:border-dark_purple hover:bg-white hover:text-dark_purple py-2.5 md:rounded-3xl bg-dark_purple text-white_gray">Search</button>
      }
      
    </div>
  );
};
export default JobSearch;
