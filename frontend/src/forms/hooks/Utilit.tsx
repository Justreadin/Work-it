import { useEffect, useState } from "react";
import { PersonalInfoProp, EduProp } from "../../constant/constant.type";

export const useWorkerFormUtility = () => {
  //   const [personalInfor, setPersonalInfor] = useState<PersonalInfoProp>({
  //     firstname: "",
  //     surnname: "",
  //     number: "",
  //     country: "",
  //     city: "",
  //     dateOfBirth: "",
  //     gender: "",
  //     address: "",
  //     state: "",
  //     /*localGoverment: "",*/
  //   });
  //   const [education, setEducation] = useState<EduProp>({
  //     highestDegree: "",
  //     nameOfSchool: "",
  //     startDate: "",
  //     endDate: "",
  //     schooling: false,
  //     schoolState: "",
  //     schoolCountry: "",
  //   });

  const [saved_data, setSavedData] = useState({
    personalInfor: {
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
    },
    education: {
      highestDegree: "",
      nameOfSchool: "",
      startDate: "",
      endDate: "",
      schooling: false,
      schoolState: "",
      schoolCountry: "",
    },
  });

  useEffect(() => {
    const retrieve_data = () => {
      const saved_personal_info = localStorage.getItem("personalIfo");
      const saved_edu_info = localStorage.getItem("education");
      if (saved_personal_info && saved_edu_info) {
        let personal_information = JSON.parse(
          saved_personal_info
        ) as PersonalInfoProp;
        let education = JSON.parse(saved_edu_info) as EduProp;
        setSavedData((prev) => {
          return {
            ...prev,
            personalInfor: { ...personal_information },
            education: { ...education },
          };
        });
      }
    };

    retrieve_data();
  }, []);

  return{
    ...saved_data
  }
};
