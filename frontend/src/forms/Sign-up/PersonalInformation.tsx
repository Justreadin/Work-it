import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../contexts/FormContext";
import { PersonalInfoProp } from "../../constant/constant.type";
const PersonalInformation: React.FC = () => {
  const formState = useForm()
    const navigate = useNavigate()
    const inputRef = useRef<HTMLInputElement | null>(null)
    useEffect(()=>{
      inputRef.current?.focus()
    },[])
    
    const[personalInfor, setPersonalInfor] = useState<PersonalInfoProp>(
      { firstname: "", surnname: "", number: "", country: "", city: "", dateOfBirth:"", gender: "", address:"", state: "", localGoverment: ""
      }
    )
    const[err,setErr]=useState<PersonalInfoProp>({firstname: "",surnname: "",number: "",country: "",city: "",dateOfBirth:"",gender: "",address:"",state: "",localGoverment: ""})
    const handleNext = ()=>{
      console.log(personalInfor)
      let isFilled = Object.values(personalInfor).filter((item)=> item ==="")
      if(isFilled.length === 0){
        formState?.setPersonalInfor(personalInfor)
        formState?.setFilled((prev)=>{
          return({...prev, personalInfor: true})
        })
        navigate("/sign-upprofile/education")
      }
      else{
        let newError = {firstname: "",surnname: "",number: "",country: "",city: "",dateOfBirth:"",gender: "",address:"",state: "",localGoverment: ""}
        Object.keys(personalInfor).forEach((key)=>{
          let fieldKey = key as keyof PersonalInfoProp
          if(typeof personalInfor[fieldKey] === 'string' && personalInfor[fieldKey].trim() === ""){
            newError[fieldKey] = `${fieldKey.toLowerCase()} is required`
          }
        })
        setErr(newError)
       
      } 
    }

    const handleBack = ()=>{
        navigate("/login")
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=>{
      const{name, value}=e.target
      setPersonalInfor((prev)=>{
        return({...prev, [name]: value})
      })
      setErr((prev)=>{
        return({...prev, [name]: ""})
      })
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      let filled = Object.values(personalInfor).every((item)=> item !== "")
      if(formState?.personalInfo && filled){
        formState?.setPersonalInfor(personalInfor)
      }else{
        return
      }
    }



  return (
    <div className="w-full">
      <h2 className="text-lg text-customPurple font-bold opacity-80 text-center">
        Personal information
      </h2>
      <form onSubmit={(e)=>handleSubmit(e)} className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
        {/* Left form field */}
        <div>
            {/* First name */}
          <div className="w-full">
            <label className=" text-dark_gray opacity-80" htmlFor="mail">
              Surname: <span className="text-red-500 text-2xl">*</span>
              <br />
              <span className="text-xs text-red-500 font-semibold">{err.surnname}</span>
            </label>
            <input
              className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple p-3"
              type="text"
              ref={inputRef}
              onChange={(e)=> handleChange(e)}
              name="surnname"
              placeholder="Enter surname"
              required
            />
          </div>

          {/* Fisrt name */}
          <div className="w-full">
            <label className="text-dark_gray opacity-80" htmlFor="mail">
              First name: <span className="text-red-500 text-2xl">*</span>
              <br />
              <span className="text-xs text-red-500 font-semibold">{err.firstname}</span>
            </label>
            <input
              className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple p-3"
              type="text"
              name="firstname"
              onChange={(e)=> handleChange(e)}
              placeholder="Enter first name"
              required
            />
          </div>

          {/* Phone number */}
          <div className="w-full">
            <label className="text-dark_gray opacity-80" htmlFor="mail">
              Phone number: <span className="text-red-500 text-2xl">*</span>
              <br />
              <span className="text-xs text-red-500 font-semibold">{err.number}</span>
            </label>
            <input
              className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple p-3"
              type="number"
              onChange={(e)=> handleChange(e)}
              name="number"
              placeholder="+234"
              required
            />
          </div>

          

          {/* Country */}

          <div className="w-full">
            <label className="text-dark_gray opacity-80" htmlFor="mail">
              Country <span className="text-red-500 text-2xl">*</span>
              <br />
              <span className="text-xs text-red-500 font-semibold">{err.country}</span>
            </label>
            <select 
                name="country" 
                onChange={(e)=> handleChange(e)}
                className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple px-4 py-3"
              >
                <option className="text-dark_purple font-semibold" value="">--Select country</option>
                <option className="text-dark_purple font-semibold" value="male">Algeria</option>
                <option className="text-dark_purple font-semibold" value="female">Angola</option>
            </select>
          </div>

          {/* City */}

          <div className="w-full">
            <label className="text-dark_gray opacity-80" htmlFor="mail">
              City <span className="text-red-500 text-2xl">*</span>
              <br />
              <span className="text-xs text-red-500 font-semibold">{err.city}</span>
            </label>
            <select 
              name="city" 
              className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple px-4 py-3"
              onChange={(e)=> handleChange(e)}
              >
                <option className="text-dark_purple font-semibold" value="">--Select City</option>
                <option className="text-dark_purple font-semibold" value="male">New york</option>
                <option className="text-dark_purple font-semibold" value="female">Lagos</option>
            </select>
          </div>

        
        </div>
        {/* Left form field */}

        {/*Right form field */}
        <div className="w-full">
          
          <div className="w-full">
            <label className="text-dark_gray opacity-80" htmlFor="dateOfBirth">
              Date of birth: <span className="text-red-500 text-2xl">*</span>
              <br />
              <span className="text-xs text-red-500 font-semibold">{err.dateOfBirth}</span>
            </label>
            <input
              className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple p-3"
              type="date"
              onChange={(e)=> handleChange(e)}
              name="dateOfBirth"
              placeholder="Enter first name"
              required
            />
          </div>

          {/* Gender*/}
          <div className="w-full">
            <label className="text-dark_gray opacity-80" htmlFor="gender">
              Gender <span className="text-red-500 text-2xl">*</span>
              <br />
              <span className="text-xs text-red-500 font-semibold">{err.gender}</span>
            </label>
            <select 
                name="gender" 
                onChange={(e)=> handleChange(e)}
                className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple px-4 py-3"
              >
                <option className="text-dark_purple font-semibold" value="">--Select gender</option>
                <option className="text-dark_purple font-semibold" value="male">Male</option>
                <option className="text-dark_purple font-semibold" value="female">Female</option>
            </select>
          </div>

          {/* Address */}
          <div className="w-full">
            <label className="text-dark_gray opacity-80" htmlFor="address">
              Address <span className="text-red-500 text-2xl">*</span>
              <br />
              <span className="text-xs text-red-500 font-semibold">{err.address}</span>
            </label>
            <input
              className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple p-3"
              type="text"
              onChange={(e)=> handleChange(e)}
              name="address"
              placeholder="Ikeja, Lagos State, Nigeria"
              required
            />
          </div>

          {/* State */}
          <div>
            <label className="text-dark_gray opacity-80" htmlFor="state">
              State <span className="text-red-500 text-2xl">*</span>
              <br />
              <span className="text-xs text-red-500 font-semibold">{err.state}</span>
            </label>
            <select 
                name="state" 
                className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:border-gray-400 focus:outline-none px-4 py-3"
                onChange={(e)=> handleChange(e)}
                >
                <option className="text-dark_purple font-semibold" value="">--Select state</option>
                <option className="text-dark_purple font-semibold" value="male">Califonia</option>
                <option className="text-dark_purple font-semibold" value="female">Lagos</option>
            </select>
          </div>

          {/* LGA */}
           {/* LGA */}
           <div className="w-full">
            <label className="text-dark_gray opacity-80" htmlFor="localGovernment">
              LGA <span className="text-red-500 text-2xl"></span>
              <br />
              <span className="text-xs text-red-500 font-semibold">{err.localGoverment}</span>
            </label>
            <select 
                name="localGoverment" 
                className="w-full border-2 text-dark_gray font-semibold rounded-3xl focus:outline-customPurple px-4 py-3"
                onChange={(e)=> handleChange(e)}
                >
                <option className="text-dark_purple font-semibold" value="">--Select LGA</option>
                <option className="text-dark_purple font-semibold" value="male">North York</option>
                <option className="text-dark_purple font-semibold" value="female">Ikorodu</option>
            </select>
          </div>
        </div>
        {/*Right form field */}
        
      </form>
      <div className="flex justify-between items-center my-10 md:mt-20">
        <button 
            onClick={handleBack}
            className="bg-white_gray px-6 py-2 text-dark_purple rounded-3xl border-2 font-bold border-transparent hover:border-customPurple"
        >Back</button>
        <button 
          onClick={handleNext}
           className="bg-dark_purple py-2 px-8 rounded-3xl text-white font-bold border-2 border-transparent hover:bg-white_gray hover:text-dark_purple hover:border-dark_purple"
           >Next</button>
      </div>
    </div>
  );
};
export default PersonalInformation;
