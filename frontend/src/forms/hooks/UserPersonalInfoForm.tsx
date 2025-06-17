import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../contexts/FormContext";
import { PersonalInfoProp } from "../../constant/constant.type";
import { useLocationSelection } from "../hooks/UseLocationSelecvtion";

export const usePersonalInfoForm = () => {
  const { location,status, selectedLocation ,setSelectedLocation} = useLocationSelection();
    const formState = useForm();
  const [personalInfor, setPersonalInfor] = useState<PersonalInfoProp>({
    firstname: "",
    surnname: "",
    number: "",
    country: "",
    city: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    state: "",
    /*localGoverment: "",*/
  });
  const [err, setErr] = useState<PersonalInfoProp>({
    firstname: "",
    surnname: "",
    number: "",
    country: "",
    city: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    state: "",
   /* localGoverment: "",*/
  });

  useEffect(()=>{
    const retrievProgress = ()=>{
      let retrrievedInfo = localStorage.getItem("personalIfo")
      if(retrrievedInfo){
        const progess = JSON.parse(retrrievedInfo) as PersonalInfoProp
        setPersonalInfor(progess)
      }
    }
    retrievProgress()
  },  [])

  console.log(personalInfor)
  const navigate = useNavigate()

   const handleChange = (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => {
      console.log(personalInfor)
      const { name, value } = e.target;
      if (name === "country") {
        const selectedCountry = location.countries.find(
          (c) => c.isoCode === value
        );
        if (selectedCountry) {
          setPersonalInfor((prev) => {
            return { ...prev, country: selectedCountry.name };
          });
          setSelectedLocation((prev) => {
            return { ...prev, country: selectedCountry };
          });
        }
      } else if (name === "state") {
        
        const selecetedState = location.states.find(
          (item) => item.isoCode === value
        );
        if (selecetedState) {
          setPersonalInfor((prev) => {
            return { ...prev, state: selecetedState.name };
          });
          setSelectedLocation((prev) => {
            return { ...prev, state: selecetedState };
          });
        }
        else{
          console.log(value)
            setPersonalInfor((prev)=>{
                return{...prev, state: value}
            })
            
        }

      } else if (name === "city") {
        const selectedCity = location.cities.find(
          (item) => item.stateCode === value
        );
        if (selectedCity) {
          setPersonalInfor((prev) => {
            return { ...prev, city: selectedCity.name };
          });
          setSelectedLocation((prev)=>{
            return{...prev, city: selectedCity}
          })
        }
        else{
            setPersonalInfor((prev)=> {
                return {...prev, [name]: value}
            })
        }
      } else {
        setPersonalInfor((prev) => {
          return { ...prev, [name]: value };
        });
        setErr((prev) => {
          return { ...prev, [name]: "" };
        });
      }
    };

  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let filled = Object.values(personalInfor).every((item) => item !== "");
      if (formState?.personalInfo && filled) {
        formState?.setPersonalInfor(personalInfor);
      } else {
        return;
      }
    };

     const handleNext = () => {
        console.log(personalInfor);
        let isFilled = Object.values(personalInfor).filter((item) => item === "");
        if (isFilled.length === 0) {
          formState?.setPersonalInfor(personalInfor);
          formState?.setFilled((prev) => {
            return { ...prev, personalInfor: true };
          });
          localStorage.setItem("personalIfo", JSON.stringify(personalInfor))
          navigate("/sign-upprofile/education");
        } else {
          let newError = {
            firstname: "",
            surnname: "",
            number: "",
            country: "",
            city: "",
            dateOfBirth: "",
            gender: "",
            address: "",
            state: "",
            /*localGoverment: "",*/
          };
          Object.keys(personalInfor).forEach((key) => {
            let fieldKey = key as keyof PersonalInfoProp;
            if (
              typeof personalInfor[fieldKey] === "string" &&
              personalInfor[fieldKey].trim() === ""
            ) {
              newError[fieldKey] = `${fieldKey.toLowerCase()} is required`;
            }
          });
          setErr(newError);
        }
      };

     

    const handleBack = () => {
        navigate("/login");
      };

    return{
        handleSubmit,
        handleChange,
        err,
        handleBack,
        handleNext,
        status,
        location,
        selectedLocation,
        personalInfor
    }
};
