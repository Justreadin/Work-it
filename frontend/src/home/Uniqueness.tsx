import React from "react"
import ourQuote from "../assets/Images/our quote 1 (1).png"
import image from "../assets/Images/Frame 45.png"
const Uniqueness:React.FC=()=>{
    return(
        <div className="mt-14 flex w-full flex-col items-center">
            <div className="relative flex w-full flex-col items-center sm:w-[70%]">
                <img className="absolute -top-[5.5rem] right-0" src={ourQuote} alt="Every great experience starts with a great spark" />
                <h2 className="w-full text-center text-3xl font-bold text-customPurple sm:text-xl">what set us apart</h2>
                <p className="mt-6 w-full text-center text-4xl font-normal text-dark_gray opacity-80">Stop Wishing and Make Monney From Different people</p>
            </div>
            <div className="mt-11 flex w-full justify-center">
                <img src={image} alt="" />
            </div>

        </div>
    )
}
export default Uniqueness