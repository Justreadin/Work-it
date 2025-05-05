import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "../../index.css";
const PhotoUpload: React.FC = () => {
    const navigate= useNavigate()
    const[image,setImage]=useState<File|null | undefined>(null)
    const[avatar, setAvatar] = useState<string | null>(null)

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const file =e.target.files?.[0]
        if(file){
          let objectUrl  = URL.createObjectURL(file)
           setAvatar(objectUrl)
        }
        
        setImage(file)
    }
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        navigate("/gigs")
        if(!image){
            return
        }else{
            try{
                const formData = new FormData()
                formData.append('image', image)
                // Then the formData can be sent to the back end
                navigate("/gigs")
            }
            catch(err){
                alert(err)
            }
        }
        
    }
        
  return (
    <div className="flex items-center justify-center h-screen w-full ">
      <div className="relative w-full p-5">
        <div className="absolute -top-3 md:top-0 right-[10%]">
          <NavLink
            to="/login"
            className="py-2.5 px-6 rounded-3xl bg-white_gray text-dark_purple font-bold"
          >
            Skip
          </NavLink>
        </div>
        <h2 className="text-lg  text-customPurple font-bold opacity-80 text-center">
          WELCOME<span>JAMES</span> to ****
        </h2>
        <p className="text-dark_gray mt-6 opacity-80 text-center text-xl md:text-4xl">
          our gift for you to make it
        </p>

        <div className="flex flex-col items-center">
          <ul className="space-y-6 my-6">
            {[
              "Upload a professional Picture... Clients judge by what they see",
              "Opportunities come up every second, always stay updated",
              "Update your interest to fit in what you can do easily, to avoid struggle",
            ].map((item, index) => {
              return (
                <li key={index} className="flex items-center space-x-4">
                  <FaCheckCircle className="text-customPurple" />
                  <span className="text-base text-dark_gray opacity-80">
                    {item}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="ringbg w-56 rounded-full h-56 mx-auto relative flex justify-center">
         {avatar &&  <img src={avatar} alt="user-image" className="absolute h-full w-full rounded-full" />}
          <form onSubmit={(e)=>handleSubmit(e)} className="absolute top-32 w-full">
            {!avatar && <label htmlFor="image" className="px-4 w-full block py-2 hover:cursor-pointer rounded-3xl font-bold bg-white_gray border-dark_purple border-2 text-dark_purple">upload profile picture</label>}
            <input type="file" 
               name="image"
               id="image"
               onChange={(e)=>handleChange(e)}
               className="hidden w-full"
               placeholder=""
            />
            <button className="text-dark_purple w-full opacity-80 hover:cursor-pointer text-center mt-6 py-2 font-bold text-base">Let's Go</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default PhotoUpload;
