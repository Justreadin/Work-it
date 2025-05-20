// import React from "react";
// import leftImage from "../assets/Images/Group 4.png";
// import "../index.css";
// import BecomeAclientButton from "../ui/BecomeAclientButton";
// import GetStarted from "../ui/GetSarted";

// const Hero: React.FC = () => {
//   return (
//     <div className="flex flex-col-reverse items-center gap-10 space-x-4 sm:gap-0 md:flex-row">
//       <div className="w-full md:w-1/2">
//         <h1 className="w-full text-center text-4xl text-dark_gray sm:text-left sm:text-6xl">
//           <span className="font-bold text-dark_purple">John!</span> Level Up
//           your <span className="font-bold text-dark_purple">Experience</span>{" "}
//           with no Experience at all
//         </h1>
//         <p className="mt-6 text-center text-xl font-normal text-dark_gray sm:mt-9 sm:text-left">
//           We have everybody in mind... irrespective of who you are or where
//           you’re from. You can earn big
//         </p>
//         <div className="mt-5 flex items-center space-x-6">
//           <GetStarted actionName="Get started" destination="/login" />
//           <BecomeAclientButton />
//         </div>
//       </div>
//       <div className="w-full md:w-1/2">
//         <img className="w-full" src={leftImage} alt="Hero Image" />
//       </div>
//     </div>
//   );
// };
// export default Hero;

import React from "react";
import leftImage from "../assets/Images/Group 4.png";
import "../index.css";
import BecomeAclientButton from "../ui/BecomeAclientButton";
import GetStarted from "../ui/GetSarted";

interface HeroProps {
  call: string;
  descript: string;
  cent: string | number;
  reason: string;
  showDescription?: boolean;
  buttons?: React.ReactNode[];
  className?: string;
  imageSrc?: string;

  // Custom classNames
  headingClassName?: string;
  callSpanClassName?: string;
  centSpanClassName?: string;
  descriptionClassName?: string;
  buttonContainerClassName?: string;
}

const Hero: React.FC<HeroProps> = ({
  call,
  descript,
  cent,
  reason,
  showDescription = true,
  buttons = [
    <GetStarted key="get-started" actionName="Get started" destination="/login" />,
    <BecomeAclientButton link="/user/clent" actionName="Become a client" key="become-client" />
  ],
  className = "", imageSrc = leftImage, headingClassName="w-full text-center text-xl text-dark_gray sm:text-left sm:text-6xl",
  callSpanClassName = "font-bold text-dark_purple",
  centSpanClassName = "font-bold text-dark_purple",
  descriptionClassName = "mt-6 text-center text-xl font-normal text-dark_gray sm:mt-9 sm:text-left",
  buttonContainerClassName = "mt-5 flex items-center space-x-6",
}) => {
  return (
    <div className={`flex flex-col-reverse items-center gap-10 sm:gap-0 md:flex-row ${className}`}>
      <div className="w-full md:w-1/2">
        <h1 className={headingClassName}>
          <span className={callSpanClassName}>{call}</span> <br /> {descript}
          <span className={centSpanClassName}>{cent}</span> {reason}
        </h1>

        {showDescription && (
          <p className={descriptionClassName}>
            We have everybody in mind... irrespective of who you are or where
            you’re from. You can earn big
          </p>
        )}

        {buttons.length > 0 && (
          <div className={buttonContainerClassName}>
            {buttons.map((btn, idx) => (
              <React.Fragment key={idx}>{btn}</React.Fragment>
            ))}
          </div>
        )}
      </div>

      <div className="w-full md:w-1/2">
        <img className="w-full" src={imageSrc} alt="Hero Image" />
      </div>
    </div>
  );
};

export default Hero;

