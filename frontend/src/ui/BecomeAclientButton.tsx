import { NavLink } from "react-router-dom"
import React from "react"
import "../index.css"
interface BtnProps {
  actionName: string;
  link: string;
  className?: string;
}

const BecomeAclientButton:React.FC<BtnProps>= ({ actionName, link, className}) => {
    return(
        <NavLink
        to={link}
        className={
          className ??
          "nonebg rounded-3xl border-2 border-transparent bg-dark_purple px-4 py-2.5 text-base font-bold text-white hover:border-dark_purple hover:bg-white_gray hover:text-dark_purple"}
      >
        {actionName}
      </NavLink>
    )
}
export default BecomeAclientButton