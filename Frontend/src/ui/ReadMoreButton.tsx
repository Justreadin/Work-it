import { NavLink } from "react-router-dom"

const ReadMoreButton = ()=>{
    return(
        <NavLink to="/readmore" className="py-2.5 px-4 bg-white_gray text-base hover:bg-dark_purple text-dark_purple hover:text-white_gray font-bold rounded-3xl">Read more</NavLink>
    )
}
export default ReadMoreButton 