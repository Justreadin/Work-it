import React from "react"
import ourQuote from "../assets/Images/our quote 1 (1).png"
import image from "../assets/Images/Frame 45.png"
const Uniqueness:React.FC=()=>{
    return(
        <div className="mt-48 flex flex-col items-center w-full">
            <div className="flex flex-col items-center w-full sm:w-[70%] relative">
                <img className="absolute -top-36 right-0" src={ourQuote} alt="Every great experience starts with a great spark" />
                <h2 className="font-bold text-center text-3xl sm:text-xl text-customPurple w-full">what set us apart</h2>
                <p className="opacity-80 text-dark_gray text-4xl font-normal mt-6 text-center w-full">Stop Wishing and Make Monney From Different people</p>
            </div>
            <div className="flex justify-center w-full mt-11">
                <img src={image} alt="" />
            </div>

        </div>
    )
}
export default Uniqueness