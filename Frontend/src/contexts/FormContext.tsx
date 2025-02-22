import React, { createContext, useContext, useState } from "react";
import { EduProp, FillProp, PersonalInfoProp, ProviderProp} from "../constant/constant.type";


interface FormProp{
    education: EduProp,
    setEducation:  React.Dispatch<React.SetStateAction<EduProp>>,
    personalInfo: PersonalInfoProp,
    setPersonalInfor:React.Dispatch<React.SetStateAction<PersonalInfoProp>>
    filled: FillProp,
    setFilled: React.Dispatch<React.SetStateAction<FillProp>>
}

const FormContext = createContext<FormProp | null>(null);

const FormContextProvider: React.FC<ProviderProp> = ({ children }) => {
  const [education, setEducation] = useState<EduProp>({
    highestDegree: "",
    nameOfSchool: "",
    startDate: "",
    endDate: "",
    schooling: false,
    schoolState: "",
    schoolCountry: "",
  });

  const [personalInfo, setPersonalInfor] = useState<PersonalInfoProp>({
    firstname: "",
    surnname: "",
    number: "",
    country: "",
    city: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    state: "",
    localGoverment: "",
  });

  const[filled, setFilled] = useState<FillProp>({personalInfor: false, education: false, interest: false})

  return (
    <FormContext.Provider value={{education, setEducation, personalInfo, setPersonalInfor, filled, setFilled}}>{children}</FormContext.Provider>
  );
};
export default FormContextProvider;

export const useForm = ()=>useContext(FormContext)

