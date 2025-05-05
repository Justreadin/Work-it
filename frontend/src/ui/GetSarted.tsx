import React from "react"
import { NavLink } from "react-router-dom"

interface Prop{
    actionName: string,
    destination: string
}
const GetStarted:React.FC<Prop> = ({actionName, destination})=>{
    return(<NavLink
              to={destination}
              className="px-6 py-2.5 rounded-3xl bg-white_gray hover:bg-customPurple hover:border-white_gray hover:text-white_gray border-customPurple font-bold text-customPurple border"
            >{actionName}</NavLink>)
}
export default GetStarted 