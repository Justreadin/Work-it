import React from "react"
import quotes from "../assets/Images/“.png"
import rightImage from "../assets/Images/Group 5.png"
import ourQuote from "../assets/Images/our quote 1 (1).png"
import "../index.css"
import ReadMoreButton from "../ui/ReadMoreButton"


const WhoWeAre:React.FC = ()=>{
    return(
        <div className="flex flex-col gap-36 sm:gap-0 sm:flex-row  items-center justify-between mt-20">
            <div>
                <img src={rightImage} alt="who we are image" />
            </div>
            <div className="text-customPurple text-center sm:text-left mt-6 text-2xl sm:text-xl  font-bold w-full sm:w-[45%] relative">
                <img className="absolute -top-40 right-16 z-10" src={ourQuote}/>
                <h2>Abdul do you want to know Who We are?</h2>
                <div className="w-full bg-white_gray border-l-customPurple border-l-4 px-12 py-9 relative">
                    <img src={quotes} className="absolute left-4 top-7" alt="quotes icon" />
                    <p className="text-xl font-normal text-customPurple">We believe every great experience starts with a spark. We help people maximize their interests, and provide that spark for growth, and lifelong earning.</p>
                    <img src={quotes} className="absolute bottom-10 right-3"  alt="quotes icon" />
                </div>
                <p className="mt-6 text-xl text-dark_gray font-normal">We are a community-driven platform dedicated to connecting people through their unique interests. Our mission is to create a space where individuals can learn, grow, and collaborate in real life engagements despite the odds</p>
                <div className="mt-6">
                    <ReadMoreButton/>
                </div>
            </div>
        </div>
    )
}
export default WhoWeAre