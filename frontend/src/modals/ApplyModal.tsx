import React, { useEffect, useState } from "react"
import "../index.css"
import { FaExclamationCircle } from "react-icons/fa"
const ApplyModal:React.FC= ()=>{
   
    const[defficit, setDefficit]=useState(false)
    useEffect(
        ()=>{
            setDefficit(false)
        },[]
    )
    return(
        <div className="w-full modalbg flex items-center justify-center max-h-screen fixed inset-0 z-50">
            <div className="flex flex-col items-center space-y-6 bg-white_gray px-10 rounded-md w-[90%] md:w-[461px] py-8">
                <h2 className={`text-center font-bold uppercase text-lg ${defficit ? 'text-[#FF0000' : 'text-customPurple'}`}>Great you wanna apply</h2>
                <p className="text-center text-base text-dark_gray opacity-80 font-normal">Are you sure you wanna apply? check the contract well before applying</p>
                <button className="block py-2.5 px-6 bg-dark_purple border-2 border-transparent hover:border-dark_purple hover:bg-white hover:text-dark_purple text-white font-bold rounded-3xl">
                    Apply {" "}
                    {
                        defficit && <FaExclamationCircle/>
                    }
                </button>
            </div>

        </div>
    )
}
export default ApplyModal