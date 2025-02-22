import { NavLink } from "react-router-dom"
import React from "react"
import "../index.css"
const BecomeAclientButton:React.FC=()=>{
    return(
        <NavLink
        to="/user/client"
        className="py-2.5 px-4 rounded-3xl bg-dark_purple hover:bg-white_gray border-2 border-transparent nonebg hover:border-dark_purple text-white hover:text-dark_purple font-bold text-base"
      >
        Become a client
      </NavLink>
    )
}
export default BecomeAclientButton