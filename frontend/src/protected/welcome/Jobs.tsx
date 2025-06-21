
import { FaSearch } from "react-icons/fa";
type Prop={
  header?: boolean
  onSearchChange?: (value: string) => void;
}
const JobSearch = ({header, onSearchChange}:Prop) => {
  return (
    <div className={`w-full flex items-center ${!header? 'mt-14': 'mt-0'} px-1.5 md:space-x-6`}>
      <div className="flex flex-1 items-center space-x-2 rounded-br-none rounded-tr-none border-2 px-2 py-2.5 md:space-x-5 md:rounded-3xl">
        <FaSearch className="text-gray-300" />
        <input
          type="text"
          name="serachword"
          placeholder="search for opportunities"
          className="w-full border-none bg-white text-dark_gray focus:outline-none"
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>
      {
        !header && <button className="border-2 border-transparent bg-dark_purple px-2 py-2.5 text-white_gray hover:border-dark_purple hover:bg-white hover:text-dark_purple md:rounded-3xl md:px-11">Search</button>
      }
      
    </div>
  );
};
export default JobSearch;
